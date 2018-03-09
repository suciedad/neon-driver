/* globals __DEV__ */
import Phaser from 'phaser'
import Car from '../sprites/Car'
import Road from '../sprites/Road'
import Enemy from '../sprites/Enemy'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.roadsPositions = [this.world.centerY - 150, this.world.centerY, this.world.centerY + 150]

    // Arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.road = new Road({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'road'
    })
    this.game.add.existing(this.road)

    this.car = new Car({
      game: this.game,
      x: this.world.centerX,
      y: this.game.height - 80,
      asset: 'mushroom'
    })
    this.game.add.existing(this.car)

    game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, () => {
      let pos = this.roadsPositions[game.rnd.between(0, 2)]
      console.warn(pos);
      this.createEnemy(pos)
    }, this);
  }

  collisionHandler() {
    console.warn(123);
  }

  createEnemy(pos) {
    this.enemy = new Enemy({
      game: this.game,
      x: pos,
      y: 0,
      asset: 'enemy'
    })
    this.game.add.existing(this.enemy)
  }

  update() {
    game.physics.arcade.collide(this.car, this.enemy, this.collisionHandler, null, this);
  }

  render() {
    if (__DEV__) {
      ;
    }
  }
}
