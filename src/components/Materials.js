const THREE = require("three");
global.THREE = THREE;


export const GlassMaterial = new THREE.MeshPhysicalMaterial({
    //transmission:1,
    //thickness:0.4,
    color: new THREE.Color('#000').convertSRGBToLinear(),
    //roughness: 0,
    //clearcoat: .40,
    //clearcoatRoughness: 0.2,
      metalness: .9,
      roughness: .05,
      envMapIntensity: 0.29,
      clearcoat: .51,
      transparent: true,
      // transmission: .95,
      opacity: .25,
      reflectivity: 0.2,
      refractionRatio: 0.3985,
      ior: 0.9,
      side: THREE.BackSide,
  });

