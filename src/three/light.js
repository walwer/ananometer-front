import {
    DirectionalLight,
    DirectionalLightHelper, HemisphereLight, HemisphereLightHelper, PointLight, PointLightHelper,
} from "three";
function createLights(color) {
    const light = new DirectionalLight('white', 2);
    const lightHelper = new DirectionalLightHelper(light, 10);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.position.set(-5, -5, 30);
    light.tick = (delta) => {

    };
    return { light, lightHelper };
}
  export { createLights };