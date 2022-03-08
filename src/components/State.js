
import { proxy, useProxy } from "valtio"

export const State = proxy({
    current: null,
    props: {
      transmission: .5,
      roughness: 0.5,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    },
  })