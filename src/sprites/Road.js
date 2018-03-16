import Phaser from 'phaser'
import RoadChunk from './RoadChunk'

export default class Road {
  constructor(game, world) {
    this.game = game
    this.world = world
    this.chunks = {
      top: undefined,
      middle: undefined,
      bottom: undefined
    }
  }

  _generateChunk () {
    let roadChunk = new RoadChunk({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'road'
    })
    this.game.add.existing(roadChunk)

    return roadChunk
  }

  addChunk () {
    this.chunks.bottom.kill()
    this.chunks.bottom = this.chunks.middle
    this.chunks.middle = this.chunks.top
    this.chunks.top = this._generateChunk()
    this.chunks.top.position.y = this.chunks.middle.position.y - this.game.height
    console.warn(this.chunks.middle)
  }
  init() {
    this.chunks.top    = this._generateChunk()
    this.chunks.middle = this._generateChunk()
    this.chunks.bottom = this._generateChunk()

    this.chunks.top.position.y    = this.world.centerY - this.game.height
    this.chunks.bottom.position.y = this.world.centerY + this.game.height
  }
}