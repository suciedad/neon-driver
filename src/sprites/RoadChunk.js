import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)

    this.maxSpeed = 15
  }

  update () {
    let acc = this.game.time.totalElapsedSeconds()
    if (acc >= this.maxSpeed) acc = this.maxSpeed
    this.position.y += acc
  }
}
