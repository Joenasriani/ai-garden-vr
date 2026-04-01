import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { VRButton } from 'https://unpkg.com/three@0.152.2/examples/jsm/webxr/VRButton.js';
import { AISim } from './ai_sim.js';
import { Creature } from './creature.js';
import { HelperCreature } from './helpers.js';
import { SoundManager } from './sounds.js';
import { ParticleManager } from './particles.js';
import { Progression } from './progression.js';
import { FlowerManager } from './flowers.js';

let camera, scene, renderer;
let ai, creature, helpers=[], soundManager, particleManager, progression, flowerManager;
let seedsGroup = new THREE.Group();
let cardsGroup = new THREE.Group();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.set(0,1.6,1);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    light.position.set(0,1,0);
    scene.add(light);

    // AI Simulation
    ai = new AISim();

    // Managers
    soundManager = new SoundManager(camera, scene);
    particleManager = new ParticleManager(scene);
    progression = new Progression(scene, particleManager, soundManager);

    // Creature
    creature = new Creature(scene);

    // Helpers
    const helperColors = [0x6BCB77,0xFFD93D,0xFF6B6B];
    for(let i=0;i<6;i++){
        const pos = new THREE.Vector3((Math.random()-0.5)*3,0.5,(Math.random()-0.5)*3);
        helpers.push(new HelperCreature(scene,pos,helperColors[i%3]));
    }

    // Ground plane
    const groundGeom = new THREE.PlaneGeometry(10, 10);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x4a7c2f, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Purple flowers around the field
    flowerManager = new FlowerManager(scene);

    // Groups
    scene.add(seedsGroup);
    scene.add(cardsGroup);

    // Ambient background sound
    soundManager.playEffect(new THREE.Vector3(0,0,0), 'audio/ambient_garden.mp3', 0.2);
}

function render(){
    const delta = renderer.xr.isPresenting ? renderer.xr.getFrame().deltaTime/1000 : 0.016;
    particleManager.update(delta);
    creature.update(delta);
    flowerManager.update(delta);

    const playerPos = new THREE.Vector3();
    camera.getWorldPosition(playerPos);
    helpers.forEach(h => h.update(delta, playerPos));
    progression.update(delta);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(render);

init();

// Example interaction function (replace with VR controller input)
window.addEventListener('keydown', e=>{
    if(e.key === 'f'){ // feed seed
        const worldPos = new THREE.Vector3(0,1,-0.5);
        progression.addXP(5, worldPos);
        creature.react('happy');
        particleManager.spawnParticles(worldPos, 0xFFD93D, 20);
        soundManager.playEffect(worldPos,'audio/feed_seed.mp3',0.8);
    }
    if(e.key === 't'){ // train card
        const worldPos = new THREE.Vector3(0,1,-0.5);
        progression.addXP(10, worldPos);
        creature.react('happy');
        particleManager.spawnParticles(worldPos, 0x6BCB77, 20);
        soundManager.playEffect(worldPos,'audio/train_card.mp3',0.9);
    }
});