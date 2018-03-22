import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.speed       = 0
    this.carPosition = "center"
    this.isMoving    = false

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5)

    // Register control keys
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    // Waiting for player push 'space'
    this.leftKey.onDown.add(this.moveLeft, this);
    this.rightKey.onDown.add(this.moveRight, this);
  }

  moveLeft () {
    if (!this.isMoving && this.carPosition !== "left") {
      this.isMoving = true
      if (this.carPosition === "right") {
        this.carPosition = "center"
        var xCoord = 325
      } else if (this.carPosition === "center") {
        this.carPosition = "left"
        var xCoord = 187
      }
      let tween = this.game.add.tween(this).to({ x: xCoord }, 800, Phaser.Easing.Quartic.Out, true)

      tween.onComplete.add(() => { this.isMoving = false }, this)
    }
  }
  moveRight () {
    if (!this.isMoving && this.carPosition !== "right") {
      this.isMoving = true
      if (this.carPosition === "left") {
        this.carPosition = "center"
        var xCoord = 325
      } else if (this.carPosition === "center") {
        this.carPosition = "right"
        var xCoord = 460
      }
      let tween = this.game.add.tween(this).to({ x: xCoord }, 800, Phaser.Easing.Quartic.Out, true)

      tween.onComplete.add(() => {
        this.isMoving = false
      }, this)
    }
  }

  update () {

  }
}
