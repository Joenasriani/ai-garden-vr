import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

export class HelperCreature {
    constructor(scene, position = new THREE.Vector3(), color=0x6BCB77) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.group.position.copy(position);

        // body
        const bodyGeom = new THREE.SphereGeometry(0.1,12,12);
        const bodyMat = new THREE.MeshStandardMaterial({color, emissive:0x444444, roughness:0.8});
        this.body = new THREE.Mesh(bodyGeom, bodyMat);
        this.group.add(this.body);

        // wings
        const wingGeom = new THREE.PlaneGeometry(0.08,0.04);
        const wingMat = new THREE.MeshStandardMaterial({color, side:THREE.DoubleSide});
        this.leftWing = new THREE.Mesh(wingGeom, wingMat);
        this.rightWing = new THREE.Mesh(wingGeom, wingMat);
        this.leftWing.position.set(-0.08,0.05,0);
        this.rightWing.position.set(0.08,0.05,0);
        this.group.add(this.leftWing, this.rightWing);

        scene.add(this.group);

        this.velocity = new THREE.Vector3((Math.random()-0.5)*0.01,0,(Math.random()-0.5)*0.01);
        this.hoverAngle = Math.random()*Math.PI*2;
    }

    update(delta, playerPos){
        this.hoverAngle += delta;
        this.group.position.add(this.velocity);
        this.group.position.y = 0.5 + Math.sin(this.hoverAngle*2)*0.05;

        // boundary bounce
        const limit = 2;
        ['x','z'].forEach(axis=>{
            if(Math.abs(this.group.position[axis])>limit) this.velocity[axis]*=-1;
        });

        // react to player
        const dist = this.group.position.distanceTo(playerPos);
        if(dist<0.7){
            this.leftWing.rotation.z = Math.sin(this.hoverAngle*20)*0.5;
            this.rightWing.rotation.z = -Math.sin(this.hoverAngle*20)*0.5;
        } else {
            this.leftWing.rotation.z = Math.sin(this.hoverAngle*5)*0.2;
            this.rightWing.rotation.z = -Math.sin(this.hoverAngle*5)*0.2;
        }
    }
}