/*
 * Print is a the basic drawable entity on the canvas
 */
class Print {
  constructor({x, y, size, random = 0.5, canvas, ctx}) {
    this.canvas = canvas
    this.ctx = ctx
    this.random = random

    // position on cavas
    this.x = x
    this.y = y

    this.size = size || 20
  }

  dir() {
    return Math.random() < this.random
  }

  render() {
    console.error('render has to be implement by sub class')
  }
}

class TenPrint extends Print {
  constructor(opts) {
    super(opts)
  }

  render() {
    this.ctx.strokeStyle = 'orange'
    let [startx, starty] = [0, 0]
    let count = 0

    while (true) {
      count++
      this.ctx.beginPath()
      if (this.dir()) {
        this.ctx.moveTo(startx, starty)
        this.ctx.lineTo(startx + this.size, starty + this.size)
      } else {
        this.ctx.moveTo(startx + this.size, starty)
        this.ctx.lineTo(startx, starty + this.size)
      }
      this.ctx.stroke()
      this.ctx.closePath()

      startx += this.size
      if (startx > this.canvas.width) {
        startx = 0
        starty += this.size
      }
      if (starty > this.canvas.height) {
        return
      }
    }
  }
}

class HayePrint extends Print {
  constructor(opts) {
    super(opts)
  }

  render() {
    this.ctx.strokeStyle = 'orange'
    let [startx, starty] = [0, 0]

    while (true) {
      this.ctx.beginPath()
      if (this.dir()) {
        this.ctx.moveTo(startx + this.size/2, starty)
        this.ctx.lineTo(startx + this.size/2, starty + this.size)
      } else {
        this.ctx.moveTo(startx, starty + this.size/2)
        this.ctx.lineTo(startx + this.size, starty + this.size/2)
      }
      this.ctx.stroke()
      this.ctx.closePath()

      startx += this.size
      if (startx > this.canvas.width) {
        startx = 0
        starty += this.size
      }
      if (starty > this.canvas.height) {
        return
      }
    }
  }
}

class BubblePrint extends Print {
  constructor(opts) {
    super(opts)
  }

  renderLeft(x, y) {
    this.ctx.arc(x - this.size / 2, y, this.size / 2, -Math.PI / 2, Math.PI / 2)
  }

  renderRight(x, y) {
    this.ctx.arc(x + this.size / 2, y, this.size / 2, -Math.PI / 2, Math.PI / 2, true)
  }

  renderTop(x, y) {
    this.ctx.arc(x, y - this.size / 2, this.size / 2, 0, Math.PI)
  }

  renderBot(x, y) {
    this.ctx.arc(x, y + this.size / 2, this.size / 2, 0, Math.PI, true)
  }

  render() {
    this.ctx.strokeStyle = 'orange'
    let [startx, starty] = [0, 0]

    while (true) {
      this.ctx.beginPath()

      if (this.dir()) {
        this.renderTop(startx + this.size / 2, starty + this.size / 2)
      } else if (this.dir()) {
        this.renderBot(startx + this.size / 2, starty + this.size / 2)
      } else if (this.dir()) {
        this.renderLeft(startx + this.size / 2, starty + this.size / 2)
      } else {
        this.renderRight(startx + this.size / 2, starty + this.size / 2)
      }

      this.ctx.stroke()
      this.ctx.closePath()

      startx += this.size
      if (startx > this.canvas.width) {
        startx = 0
        starty += this.size
      }
      if (starty > this.canvas.height) {
        return
      }
    }
  }
}

class TrianglePrint extends Print {
  constructor(opts) {
    super(opts)
  }

  renderLeft(x, y) {
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x + this.size / 2, y + this.size / 2)
    this.ctx.lineTo(x, y + this.size)
  }

  renderRight(x, y) {
    this.ctx.moveTo(x + this.size, y)
    this.ctx.lineTo(x + this.size / 2, y + this.size / 2)
    this.ctx.lineTo(x + this.size, y + this.size)
  }

  renderTop(x, y) {
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x + this.size / 2, y + this.size / 2)
    this.ctx.lineTo(x + this.size, y)
  }

  renderBot(x, y) {
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x + this.size / 2, y + this.size / 2)
    this.ctx.lineTo(x, y + this.size)
  }

  render() {
    this.ctx.strokeStyle = 'orange'
    let [startx, starty] = [0, 0]

    while (true) {
      this.ctx.beginPath()

      if (this.dir()) {
        this.renderTop(startx, starty)
      } else if (this.dir()) {
        this.renderBot(startx, starty)
      } else if (this.dir()) {
        this.renderLeft(startx, starty)
      } else {
        this.renderRight(startx, starty)
      }

      this.ctx.stroke()
      this.ctx.closePath()

      startx += this.size
      if (startx > this.canvas.width) {
        startx = 0
        starty += this.size
      }
      if (starty > this.canvas.height) {
        return
      }
    }
  }
}

/*
 * Rendering base.
 *
 * draw draws the canvas and its elements
 *
 * setup is a one time call to select the canvas DOM element
 * and start a loop 30 times / second.
 */
const draw = (canvas, ctx, print) => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  print.render()
}

const setup = (type) => {
  // get canvas from DOM
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  // constants
  const canvasSize = canvas.width
  const size = canvas.width / 20
  const print = new type({
    x: 0, y: 0, size, canvas, ctx
  })

  draw(canvas, ctx, print)
}
setup(TenPrint)

let TYPE = TenPrint
const prints = {
  ten: TenPrint,
  haye: HayePrint,
  bubble: BubblePrint,
  triangle: TrianglePrint
}
const form = document.getElementById('form')
form.onchange = (event) => {
  TYPE = prints[event.target.value]
}
form.onsubmit = (event) => {
  event.preventDefault()
  setup(TYPE)
}
