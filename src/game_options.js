import config from './config'

var roadWidth = 400

export default {
  road: {
    width: roadWidth,
    positions: {
      left:   (config.gameWidth / 2) - (roadWidth/3),
      center: config.gameWidth/2,
      right:  (config.gameWidth / 2) + (roadWidth/3)
    }
  },
  car: {
    turnSpeed: 500
  }
}
