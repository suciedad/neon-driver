/* globals __DEV__ */
import Phaser from 'phaser'
import go     from '../game_options'
import Car    from '../sprites/Car'
import Coin   from '../sprites/Coin'
import Road   from '../sprites/Road'
import Truck  from '../sprites/enemies/Truck'
import Moto   from '../sprites/enemies/Moto'
import Scores from '../components/Scores';

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.enemies = game.add.group()
    this.coins   = game.add.group()
    this.roadsPositions = [go.road.positions.left, go.road.positions.center, go.road.positions.right]

    this.scores = new Scores(game)
    this.scores.init()

    // Arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.road = new Road(this.game, this.world)
    this.road.init()

    this.car = new Car({
      game: this.game,
      x: this.world.centerX,
      y: this.game.height - 85,
      asset: 'car'
    })
    this.game.add.existing(this.car)

    game.time.events.repeat(Phaser.Timer.SECOND * 3, Infinity, () => {
      let pos = this.roadsPositions[game.rnd.between(0, 2)]
      this.createEnemy(pos)
    }, this);
    game.time.events.repeat(Phaser.Timer.SECOND * 1, Infinity, () => {
      let pos = this.roadsPositions[game.rnd.between(0, 2)]
      this.createCoins(pos)
    }, this);

    this.game.world.bringToTop(this.enemies)
    this.game.world.bringToTop(this.coins)
  }

  collisionHandler() {
    // this.gameOver()
  }
  pickCoin(spriteA, spriteB) {
    spriteB.kill()
    this.scores.increase()
  }

  createCoins(pos) {
    let coin = new Coin({
      game: this.game,
      x: pos,
      y: 0,
      asset: 'coin'
    })

    this.game.add.existing(coin)
    this.coins.add(coin)
    coin.parentGroup = this.coins
  }

  createEnemy(pos) {
    let enemy = this.generateRandomEnemy(pos)

    this.game.add.existing(enemy)
    this.enemies.add(enemy)
    enemy.parentGroup = this.enemies
  }
  generateRandomEnemy(pos) {
    let enemy
    let randomKey = game.rnd.between(0, 1)
    if (randomKey === 0) {
      return new Truck({
        game: this.game,
        x: pos,
        y: -201,
        asset: 'truck'
      })
    }
    if (randomKey === 1) {
      return new Moto({
        game: this.game,
        x: pos,
        y: -96,
        asset: 'moto'
      })
    }
  }

  gameOver () {
    // Game Over
    let style = { font: "bold 48px Arial", fill: "#f28cba" }
    let gameOverText = game.add.text(this.world.centerX, this.world.centerY, "GAY OVER", style)
    gameOverText.anchor.x = 0.5
    gameOverText.anchor.y = 0.5
    this.game.paused = true
    this.game.input.onDown.add(() => {
      this.game.paused = false
      this.state.restart()
    }, this)
  }

  update() {
    game.physics.arcade.overlap(this.car, this.enemies, this.collisionHandler, null, this);
    game.physics.arcade.overlap(this.car, this.coins, this.pickCoin, null, this);

    if (this.road.chunks.bottom.y >= (this.world.centerY + this.game.height + 100)) {
      this.road.addChunk()
      this.game.world.bringToTop(this.enemies)
      this.game.world.bringToTop(this.coins)
      this.game.world.bringToTop(this.car)
    }
  }

  render() {
    if (__DEV__) {
      ;
    }
  }
}
