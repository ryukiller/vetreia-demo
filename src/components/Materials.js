const THREE = require("three");
global.THREE = THREE;


export const GlassMaterial = new THREE.MeshPhysicalMaterial({
    //transmission:1,
    //thickness:0.4,
    color: new THREE.Color('#f0f9ff').convertSRGBToLinear(),
    //roughness: 0,
    //clearcoat: .40,
    //clearcoatRoughness: 0.2,
      metalness: .9,
      roughness: .05,
      envMapIntensity: 0.29,
      clearcoat: .51,
      transparent: true,
      // transmission: .95,
      opacity: .22,
      reflectivity: 0.2,
      refractionRatio: 0.3985,
      ior: 2.33,
      side: THREE.BackSide,
  });

  // export const GlassMaterial = new THREE.MeshPhysicalMaterial({
  //     transmission:1,
  //     metalness: 0,
  //     roughness: 0,
  //     ior: 2.33,
  //     color: new THREE.Color('#eee').convertSRGBToLinear(),
  // });
  // export const GlassMaterial2 = new THREE.MeshPhysicalMaterial({
  //     transmission:1,
  //     metalness: 0,
  //     roughness: 0,
  //     ior: 2.33,
  //     color: new THREE.Color('#fff').convertSRGBToLinear(),
  // });

  export const GlassMaterial2 = new THREE.MeshPhysicalMaterial({
    //transmission:1,
    //thickness:0.4,
    color: new THREE.Color('#fff').convertSRGBToLinear(),
    //roughness: 0,
    //clearcoat: .40,
    //clearcoatRoughness: 0.2,
      metalness: .9,
      roughness: .05,
      envMapIntensity: 0.29,
      clearcoat: .51,
      transparent: true,
      // transmission: .95,
      opacity: .2,
      reflectivity: 0.2,
      refractionRatio: 0.3985,
      ior: 2.33,
      side: THREE.BackSide,
  });

  export const GlassMaterial3 = new THREE.MeshPhysicalMaterial({
    //transmission:1,
    //thickness:0.4,
    color: new THREE.Color('#333').convertSRGBToLinear(),
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

  export const GlassMaterial4 = new THREE.MeshPhysicalMaterial({
    //transmission:1,
    //thickness:0.4,
    color: new THREE.Color('#0531c0').convertSRGBToLinear(),
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

  export const GlassMaterial5 = new THREE.MeshPhysicalMaterial({
    attach:"material",
    color: new THREE.Color('#fff').convertSRGBToLinear(),
    metalness:0,
    roughness:0,
    transmission:0.9,
    clearcoat:1,
    clearcoatRoughness:0,
    reflectivity:1,
    refractionRatio:0.98
  });

