export class Progression {
    constructor(scene, particleManager, soundManager){
        this.scene = scene;
        this.particleManager = particleManager;
        this.soundManager = soundManager;
        this.xp = 0;
        this.level = 1;
        this.nextLevelXP = 20;
        this.badges = [];
    }

    addXP(amount, pos){
        this.xp += amount;
        this.particleManager.spawnParticles(pos, 0xFFD93D, 15);
        this.soundManager.playEffect(pos, 'audio/feed_seed.mp3', 0.7);
        this.checkLevelUp(pos);
    }

    checkLevelUp(pos){
        if(this.xp >= this.nextLevelXP){
            this.level++;
            this.nextLevelXP += this.level*20;
            this.spawnBadge(pos);
            this.soundManager.playEffect(pos, 'audio/train_card.mp3', 0.9);
        }
    }

    spawnBadge(pos){
        const g = new THREE.SphereGeometry(0.08,12,12);
        const m = new THREE.MeshStandardMaterial({color:0x6BCB77, emissive:0x44FF44});
        const badge = new THREE.Mesh(g,m);
        badge.position.copy(pos);
        badge.position.y += 0.3;
        this.scene.add(badge);
        this.badges.push({mesh:badge, timer:3}); // badge disappears after 3s
    }

    update(delta){
        this.badges.forEach((b,i)=>{
            b.mesh.position.y += delta*0.1; // float upward
            b.timer -= delta;
            if(b.timer<=0){
                this.scene.remove(b.mesh);
                this.badges.splice(i,1);
            }
        });
    }
}