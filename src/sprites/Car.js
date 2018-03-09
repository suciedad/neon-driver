import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.speed = 0
    this.carPosition = "center"

    this.anchor.setTo(0.5)
  }

  update () {
    
  }
}
