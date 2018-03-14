import Phaser from 'phaser'

export default class Scores {
  constructor (game) {
    this.value = 0
    this.textTemplate = `scores: ${this.value}`
  }

  _redrawScores() {
    this.text.setText(`scores: ${this.value}`)
  }
  
  increase(val) {
    if (val === undefined) {
      this.value++
    } else {
      this.value += val
    }
    this._redrawScores()
  }

  init() {
    let style = { font: "bold 24px Arial", fill: "#333" }
    this.text = game.add.text(0, 0, this.textTemplate, style)
  }
}
