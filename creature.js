import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

export class Creature {
    constructor(scene, position = new THREE.Vector3(0,1,-0.5)) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.group.position.copy(position);

        // body
        const bodyGeom = new THREE.SphereGeometry(0.3,16,16);
        const bodyMat = new THREE.MeshStandardMaterial({color:0xFF6B6B, emissive:0xFFAAAA, roughness:0.7});
        this.body = new THREE.Mesh(bodyGeom, bodyMat);
        this.group.add(this.body);

        // eyes
        const eyeGeom = new THREE.SphereGeometry(0.05,8,8);
        const eyeMat = new THREE.MeshStandardMaterial({color:0xffffff, emissive:0x444444});
        this.leftEye = new THREE.Mesh(eyeGeom, eyeMat);
        this.rightEye = new THREE.Mesh(eyeGeom, eyeMat);
        this.leftEye.position.set(-0.12,0.08,0.26);
        this.rightEye.position.set(0.12,0.08,0.26);
        this.group.add(this.leftEye,this.rightEye);

        // mouth
        const mouthGeom = new THREE.CylinderGeometry(0.08,0.08,0.02,12);
        const mouthMat = new THREE.MeshStandardMaterial({color:0x000000});
        this.mouth = new THREE.Mesh(mouthGeom, mouthMat);
        this.mouth.rotation.x = Math.PI/2;
        this.mouth.position.set(0,-0.05,0.26);
        this.group.add(this.mouth);

        scene.add(this.group);

        // animation state
        this.happyTimer = 0;
        this.scaleBase = 1;

        // ambient sparkly particles
        this.ambientParticles = [];
        this.ambientParticleCount = 25;
        for(let i=0;i<this.ambientParticleCount;i++){
            const g = new THREE.SphereGeometry(0.03,6,6);
            const m = new THREE.MeshBasicMaterial({color:0xFFD93D, transparent:true, opacity:0.7});
            const p = new THREE.Mesh(g,m);
            p.position.set((Math.random()-0.5)*0.6,Math.random()*0.5+0.6,(Math.random()-0.5)*0.6);
            p.velocity = new THREE.Vector3((Math.random()-0.5)*0.02,(Math.random()-0.5)*0.02,(Math.random()-0.5)*0.02);
            this.group.add(p);
            this.ambientParticles.push(p);
        }
    }

    react(type='happy'){
        if(type==='happy') this.happyTimer = 1.0;
    }

    update(delta){
        // bounce animation
        if(this.happyTimer>0){
            this.group.scale.set(
                this.scaleBase + Math.sin(this.happyTimer*Math.PI*2)*0.15,
                this.scaleBase + Math.sin(this.happyTimer*Math.PI*2)*0.15,
                this.scaleBase + Math.sin(this.happyTimer*Math.PI*2)*0.15
            );
            this.happyTimer -= delta;
            if(this.happyTimer<0) this.happyTimer=0;
        } else {
            this.group.scale.set(this.scaleBase,this.scaleBase,this.scaleBase);
        }

        // blink eyes
        const blinkSpeed = 1.2;
        const scaleY = 1 - 0.2*Math.sin(performance.now()/1000*blinkSpeed);
        this.leftEye.scale.y = scaleY;
        this.rightEye.scale.y = scaleY;

        // ambient particles
        this.ambientParticles.forEach(p=>{
            p.position.add(p.velocity);
            if(Math.abs(p.position.x)>0.5) p.velocity.x*=-1;
            if(p.position.y<0.6 || p.position.y>1.1) p.velocity.y*=-1;
            if(Math.abs(p.position.z)>0.5) p.velocity.z*=-1;
        });
    }
}