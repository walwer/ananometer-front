import {
    MeshStandardMaterial,
    Mesh,
    Color,
    TextureLoader, BoxGeometry, MeshBasicMaterial, MeshPhongMaterial,
} from "three";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

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
                let speed = 0;
                object.tick = (delta) => {
                    if (rotate) {
                        speed = lerp(speed, window.animationSpeed, 0.04);
                        frame += 0.02 * speed;
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