/* globals __DEV__ */
import Phaser from 'phaser'
import Car from '../sprites/Car'
import Road from '../sprites/Road'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.road = new Road({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'road'
    })
    this.game.add.existing(this.road)

    this.mushroom = new Car({
      game: this.game,
      x: this.world.centerX,
      y: this.game.height - 80,
      asset: 'mushroom'
    })
    this.game.add.existing(this.mushroom)
  }

  render() {
    if (__DEV__) {
      ;
    }
  }
}
