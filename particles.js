import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

export class ParticleManager {
    constructor(scene){
        this.scene = scene;
        this.particles = [];
    }

    spawnParticles(pos, color=0xFFD93D, count=20){
        for(let i=0;i<count;i++){
            const g = new THREE.SphereGeometry(0.02,6,6);
            const m = new THREE.MeshBasicMaterial({color});
            const p = new THREE.Mesh(g,m);
            p.position.copy(pos);
            p.velocity = new THREE.Vector3((Math.random()-0.5)*0.05, Math.random()*0.05, (Math.random()-0.5)*0.05);
            p.life = 1.0;
            this.scene.add(p);
            this.particles.push(p);
        }
    }

    update(delta){
        this.particles.forEach((p,i)=>{
            p.position.add(p.velocity);
            p.life -= delta;
            if(p.life<=0){
                this.scene.remove(p);
                this.particles.splice(i,1);
            }
        });
    }
}