import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.speed = 0
    this.enemyPosition = "center"

    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    this.anchor.setTo(0.5)

  }

  update () {
    this.body.velocity.y = 100
  }
}
