import {PerspectiveCamera, Vector3} from 'three';

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

function createCamera() {
    const camera = new PerspectiveCamera(
        25, // FOV = Field Of View
        1, // Aspect ratio (dummy value)
        0.1, // Near clipping plane
        1000, // Far clipping plane
    );

    // Move the camera back so we can view the scene
    //      x y  z
    camera.position.set(0, -10, 100);
    camera.rotation.x = 0.6
    camera.tick = (delta) => {
        camera.position.z = lerp(camera.position.z, 13, 0.05)
    };

    return camera;
}

export {createCamera};