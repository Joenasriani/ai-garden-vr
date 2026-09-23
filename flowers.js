import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

const PETAL_COLORS = [0x9B59B6, 0xA855F7, 0x8B5CF6, 0xC084FC, 0x7C3AED, 0xBB77EE];

export class FlowerManager {
    constructor(scene) {
        this.scene = scene;
        this.flowers = [];
        this._createFlowers();
    }

    _createFlowers() {
        // 20 flowers spread around the field perimeter with some variation
        const count = 20;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 1.8 + Math.random() * 0.8;
            const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.4;
            const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.4;
            const scale = 0.7 + Math.random() * 0.7;
            this._createFlower(new THREE.Vector3(x, 0, z), scale);
        }

        // A few extra clusters near corners for density
        const extras = [
            new THREE.Vector3( 1.2, 0,  1.2),
            new THREE.Vector3(-1.2, 0,  1.2),
            new THREE.Vector3( 1.2, 0, -1.2),
            new THREE.Vector3(-1.2, 0, -1.2),
        ];
        extras.forEach(pos => {
            for (let j = 0; j < 3; j++) {
                const offset = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.5,
                    0,
                    (Math.random() - 0.5) * 0.5
                );
                this._createFlower(pos.clone().add(offset), 0.6 + Math.random() * 0.5);
            }
        });
    }

    _createFlower(position, scale = 1) {
        const group = new THREE.Group();
        group.position.copy(position);

        // Stem
        const stemGeom = new THREE.CylinderGeometry(0.015 * scale, 0.022 * scale, 0.38 * scale, 8);
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x2E8B22, roughness: 0.85 });
        const stem = new THREE.Mesh(stemGeom, stemMat);
        stem.position.y = 0.19 * scale;
        group.add(stem);

        // Leaves (two small oval leaves partway up the stem)
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x3CB371, side: THREE.DoubleSide, roughness: 0.7 });
        [-1, 1].forEach(side => {
            const leafGeom = new THREE.PlaneGeometry(0.08 * scale, 0.04 * scale);
            const leaf = new THREE.Mesh(leafGeom, leafMat);
            leaf.position.set(side * 0.055 * scale, 0.18 * scale, 0);
            leaf.rotation.z = side * 0.5;
            leaf.rotation.y = Math.PI / 4;
            group.add(leaf);
        });

        // Petals – 7 petals arranged in a ring
        const petalColor = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
        const petalMat = new THREE.MeshStandardMaterial({
            color: petalColor,
            emissive: petalColor,
            emissiveIntensity: 0.18,
            roughness: 0.45,
        });
        const petalCount = 7;
        for (let i = 0; i < petalCount; i++) {
            const a = (i / petalCount) * Math.PI * 2;
            const petalGeom = new THREE.SphereGeometry(0.075 * scale, 8, 6);
            const petal = new THREE.Mesh(petalGeom, petalMat);
            // Squash into an oval petal shape
            petal.scale.set(0.55, 1.25, 0.4);
            petal.position.set(
                Math.cos(a) * 0.095 * scale,
                0.38 * scale,
                Math.sin(a) * 0.095 * scale
            );
            petal.rotation.y = -a;
            group.add(petal);
        }

        // Flower center (golden)
        const centerGeom = new THREE.SphereGeometry(0.052 * scale, 10, 10);
        const centerMat = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            emissive: 0xFFAA00,
            emissiveIntensity: 0.35,
            roughness: 0.4,
        });
        const center = new THREE.Mesh(centerGeom, centerMat);
        center.position.y = 0.38 * scale;
        group.add(center);

        this.scene.add(group);
        this.flowers.push({ group, swayOffset: Math.random() * Math.PI * 2 });
    }

    update() {
        const t = performance.now() / 1000;
        this.flowers.forEach(f => {
            // Gentle breeze sway
            f.group.rotation.z = Math.sin(t * 0.7 + f.swayOffset) * 0.07;
            f.group.rotation.x = Math.cos(t * 0.5 + f.swayOffset) * 0.04;
        });
    }
}
