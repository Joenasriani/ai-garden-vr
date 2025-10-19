export class SoundManager {
    constructor(camera, scene){
        this.camera = camera;
        this.scene = scene;
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
    }

    playEffect(pos, file, volume=0.5){
        const sound = new THREE.PositionalAudio(this.listener);
        this.audioLoader.load(file, buffer=>{
            sound.setBuffer(buffer);
            sound.setRefDistance(1);
            sound.setVolume(volume);
            sound.play();
        });
        const dummy = new THREE.Object3D();
        dummy.position.copy(pos);
        dummy.add(sound);
        this.scene.add(dummy);
    }
}