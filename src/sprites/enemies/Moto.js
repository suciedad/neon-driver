import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.height = 96
    this.width = 42
    this.speed = 0
    this.enemyPosition = "center"

    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.immovable = true
    this.anchor.setTo(0.5)

    this.body.velocity.y = 200
  }

  update () {

    if (this.position.y > this.game.height+50) {
      this.parentGroup.remove(this)
    }
  }
}
