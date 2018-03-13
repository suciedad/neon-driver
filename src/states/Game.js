/* globals __DEV__ */
import Phaser from 'phaser'
import Car from '../sprites/Car'
import Road from '../sprites/Road'
import Truck from '../sprites/Truck'
import Moto from '../sprites/Moto'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.enemies = game.add.group()
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
      y: this.game.height - 100,
      asset: 'car'
    })
    this.game.add.existing(this.car)

    game.time.events.repeat(Phaser.Timer.SECOND * 2, Infinity, () => {
      let pos = this.roadsPositions[game.rnd.between(0, 2)]
      console.warn(pos);
      this.createEnemy(pos)
    }, this);

    this.game.world.bringToTop(this.enemies)
  }

  collisionHandler() {
    console.warn(123);
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
        y: 0,
        asset: 'enemy'
      })
    }
    if (randomKey === 1) {
      return new Moto({
        game: this.game,
        x: pos,
        y: 0,
        asset: 'car'
      })
    }
  }

  update() {
    game.physics.arcade.overlap(this.car, this.enemies, this.collisionHandler, null, this);
  }

  render() {
    if (__DEV__) {
      ;
    }
  }
}
