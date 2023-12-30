import { WebGLRenderer } from "three";

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });

    // Turn on the physically correct lighting model.
    renderer.physicallyCorrectLights = true;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    return renderer;
}

export { createRenderer };