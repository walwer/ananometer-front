import { createCamera } from "./camera.js";
import { createLights } from "./light.js";
import { createScene } from "./scene.js";
import { createRenderer } from "./renderer.js";
import createObject from "./object.js";
import { Loop } from "./loop.js";
import { Resizer } from "./resizer.js";
import {BoxGeometry, Mesh, MeshBasicMaterial} from 'three'

// These variables are module-scoped: we cannot access them
// from outside the module.
let camera;
let renderer;
let scene;
let loop;

class World {
    constructor(container) {
        // Instances of camera, scene, and renderer
        camera = createCamera();
        scene = createScene(0xe9eef2);
        renderer = createRenderer();
        // Initialize Loop
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        // Light Instance, with optional light helper
        const { light, lightHelper } = createLights("white");
        loop.updatables.push(light);
        loop.updatables.push(camera);
        scene.add(light);
        this.runAsyncProcess();
        const resizer = new Resizer(container, camera, renderer);
        resizer.onResize = () => {
            this.render();
        };
    }
    
    async runAsyncProcess() {
        let model = await createObject('/ananometer_rotor.obj', true);
        loop.updatables.push(model);
        scene.add(model)
        
        let model2 = await createObject('/ananometer_stator.obj', false);
        loop.updatables.push(model2);
        scene.add(model2)
        console.log(scene);
    }
    render() {
        // Draw a single frame
        renderer.render(scene, camera);
        
    }
    // Animation handlers
    start() {
        loop.start();
    }
    stop() {
        loop.stop();
    }
}
  export { World };