
import { proxy, useProxy } from "valtio"

export const State = proxy({
    current: null,
    props: {
      transmission: .5,
      roughness: 0.5,
    },
    scale: {
      x: 100,
      y: 100,
      z: 100
    },
    panelPos: {
        x: 1.35
    }
  })