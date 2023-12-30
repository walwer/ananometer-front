import { Color, Scene, Fog } from 'three';

function createScene(color) {
    const scene = new Scene();

    scene.background = new Color(color);
    scene.receiveShadow = true
    
    scene.fog = new Fog( 0xffffff, 5, 25 );

    return scene;
}

export { createScene };