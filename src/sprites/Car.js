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
    // if (!this.isMoving && this.carPosition !== "left") {
    //   this.isMoving = true
    //   this.body.velocity.x = -220
    //   this.game.time.events.add(600, function () {
    //     this.body.velocity.x = 0
    //     this.isMoving = false
    //     if (this.carPosition === "right") {
    //       this.carPosition = "center"
    //     } else if (this.carPosition === "center") {
    //       this.carPosition = "left"
    //     }
    //   }, this)
    // }
    if (!this.isMoving && this.carPosition !== "left") {
      this.isMoving = true
      if (this.carPosition === "right") {
        this.game.physics.arcade.moveToXY(this, 320, this.position.y, 180)
      } else if (this.carPosition === "center") {
        this.game.physics.arcade.moveToXY(this, 200, this.position.y, 180)
      }
    }
    this.dir = "l"
  }
  moveRight () {
    // if (!this.isMoving && this.carPosition !== "right") {
    //   this.isMoving = true
    //   this.body.velocity.x = 220
    //   this.game.time.events.add(600, function () {
    //     this.body.velocity.x = 0
    //     this.isMoving = false
    //     if (this.carPosition === "left") {
    //       this.carPosition = "center"
    //     } else if (this.carPosition === "center") {
    //       this.carPosition = "right"
    //     }
    //   }, this)
    // }
    if (!this.isMoving && this.carPosition !== "right") {
      this.isMoving = true
      if (this.carPosition === "left") {
        this.game.physics.arcade.moveToXY(this, 320, this.position.y, 180)
      } else if (this.carPosition === "center") {
        this.game.physics.arcade.moveToXY(this, 450, this.position.y, 180)
      }
    }
    this.dir = "r"
  }

  update () {
    if (this.isMoving && this.carPosition === "center") {
      if (this.dir === "l") {
        if (this.position.x <= 190) {
          this.body.velocity.x = 0
          this.isMoving = false
          this.carPosition = "left"
        }
      }
      if (this.dir === "r") {
        if (this.position.x >= 450) {
          this.body.velocity.x = 0
          this.isMoving = false
          this.carPosition = "right"
        }
      }
    }
    if (this.isMoving && this.carPosition === "left") {
      if (this.dir === "r") {
        if (this.position.x >= 320) {
          this.body.velocity.x = 0
          this.isMoving = false
          this.carPosition = "center"
        }
      }
    }
    if (this.isMoving && this.carPosition === "right") {
      if (this.dir === "l") {
        if (this.position.x <= 320) {
          this.body.velocity.x = 0
          this.isMoving = false
          this.carPosition = "center"
        }
      }
    }
  }
}
