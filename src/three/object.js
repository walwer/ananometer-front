import {
    MeshStandardMaterial,
    Mesh,
    Color,
    TextureLoader, BoxGeometry, MeshBasicMaterial, MeshPhongMaterial,
} from "three";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

export default function createObject(url, rotate) {

    return new Promise((resolve, reject) => {
        const loader = new OBJLoader();
        const material = new MeshStandardMaterial({
            color: 'white',
            emissive: 'white',
            roughness: 0.5,
            emissiveIntensity: 0.1,
        })

        loader.load(
            url,

            function (object) {
                let frame = 0;
                object.tick = (delta) => {
                    if (rotate) {
                        frame += 0.02 * window.animationSpeed;
                    }

                    object.rotation.set(180, -frame, 0)
                };
                object.receiveShadow = true;
                object.castShadow = true;
                object.traverse((child) => {
                    if (child instanceof Mesh) {
                        child.material = material;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                object.scale.set(0.05, 0.05, 0.05)

                resolve(object)

            },
            // called when loading is in progresses
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {

                console.log('An error happened', error);

            }
        );
    })

}