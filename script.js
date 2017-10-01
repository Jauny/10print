/*
 * Print is a the basic drawable entity on the canvas
 */
class Print {
  constructor({x, y, size, random = 0.5, canvas, ctx}) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.random = random;

    // position on cavas
    this.x = x;
    this.y = y;

    this.size = size || 20;
  }

  dir() {
    return Math.random() < this.random;
  }

  // update cycle called every draw loop
  update() {
    console.log('update not implemented');
  }

  render() {
    console.error('render has to be implement by sub class');
    // this.ctx.fillStyle = 'orange';
    // this.ctx.strokeStyle = 'orange';
    // // "- this.size / 2" draws at the center of Thing, instead of start at top left
    // // this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    // const dir = Math.random() < 0.5;
    // // const fromx = dir ? this.x : this.x + this.size;
    // // const tox = dir ? this.x + this.size : this.x;
    // // let fromy = this.y;
    // // let toy = this.y + this.size;
    // // const fromx = dir ? this.x : this.x + this.size;
    // // const tox = dir ? this.x + this.size : this.x;

    // // const fromy = this.y;
    // // const toy = this.y + this.size;

    // let fromx, fromy, tox, toy;
    // if (dir) {
    //   [fromx, tox] = [this.x, this.x + this.size];
    //   [fromy, toy] = [this.y + this.size/2, this.y + this.size/2];
    // } else {
    //   [fromx, tox] = [this.x + this.size/2, this.x + this.size/2];
    //   [fromy, toy] = [this.y, this.y + this.size];
    // }

    // this.ctx.beginPath();
    // this.ctx.moveTo(fromx, fromy);
    // this.ctx.lineTo(tox, toy);
    // this.ctx.stroke();
  }
}

class TenPrint extends Print {
  constructor(opts) {
    super(opts);
  }

  render() {
    this.ctx.strokeStyle = 'orange';
    let [startx, starty] = [0, 0];
    let count = 0;

    while (true) {
      count++;
      this.ctx.beginPath();
      if (this.dir()) {
        this.ctx.moveTo(startx, starty);
        this.ctx.lineTo(startx + this.size, starty + this.size);
      } else {
        this.ctx.moveTo(startx + this.size, starty);
        this.ctx.lineTo(startx, starty + this.size);
      }
      this.ctx.stroke();
      this.ctx.closePath();

      startx += this.size;
      if (startx > this.canvas.width) {
        startx = 0;
        starty += this.size;
      }
      if (starty > this.canvas.height) {
        return;
      }
    }
  }
}

class HayePrint extends Print {
  constructor(opts) {
    super(opts);
  }

  render() {
    this.ctx.strokeStyle = 'orange';
    let [startx, starty] = [0, 0];

    while (true) {
      this.ctx.beginPath();
      if (this.dir()) {
        this.ctx.moveTo(startx + this.size/2, starty);
        this.ctx.lineTo(startx + this.size/2, starty + this.size);
      } else {
        this.ctx.moveTo(startx, starty + this.size/2);
        this.ctx.lineTo(startx + this.size, starty + this.size/2);
      }
      this.ctx.stroke();
      this.ctx.closePath();

      startx += this.size;
      if (startx > this.canvas.width) {
        startx = 0;
        starty += this.size;
      }
      if (starty > this.canvas.height) {
        return;
      }
    }
  }
}

class BubblePrint extends Print {
  constructor(opts) {
    super(opts);
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
    this.ctx.strokeStyle = 'orange';
    let [startx, starty] = [0, 0];

    while (true) {
      this.ctx.beginPath();

      if (this.dir()) {
        this.renderTop(startx + this.size / 2, starty + this.size / 2)
      } else if (this.dir()) {
        this.renderBot(startx + this.size / 2, starty + this.size / 2)
      } else if (this.dir()) {
        this.renderLeft(startx + this.size / 2, starty + this.size / 2)
      } else {
        this.renderRight(startx + this.size / 2, starty + this.size / 2)
      }

      this.ctx.stroke();
      this.ctx.closePath();

      startx += this.size;
      if (startx > this.canvas.width) {
        startx = 0;
        starty += this.size;
      }
      if (starty > this.canvas.height) {
        return;
      }
    }
  }
}

class TrianglePrint extends Print {
  constructor(opts) {
    super(opts);
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
    this.ctx.strokeStyle = 'orange';
    let [startx, starty] = [0, 0];

    while (true) {
      this.ctx.beginPath();

      if (this.dir()) {
        this.renderTop(startx, starty)
      } else if (this.dir()) {
        this.renderBot(startx, starty)
      } else if (this.dir()) {
        this.renderLeft(startx, starty)
      } else {
        this.renderRight(startx, starty)
      }

      this.ctx.stroke();
      this.ctx.closePath();

      startx += this.size;
      if (startx > this.canvas.width) {
        startx = 0;
        starty += this.size;
      }
      if (starty > this.canvas.height) {
        return;
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
  const canvasSize = canvas.width;
  const size = canvas.width / 20;
  const print = new type({
    x: 0, y: 0, size, canvas, ctx
  })

  draw(canvas, ctx, print);

  // setup the rendering loop
  // window.setInterval(() => {
  //   draw(canvas, ctx, things)
  // }, 1000/60)

  // listener for mouse click
  // canvas.addEventListener('click', evt => {
  //   handleMouseClick(evt, canvas)
  // })
}
setup(TenPrint)

const prints = {
  ten: TenPrint,
  haye: HayePrint,
  bubble: BubblePrint,
  triangle: TrianglePrint
};
const form = document.getElementById('form')
form.onchange = (event) => {
  setup(prints[event.target.value])
}




/*
 * Some basic helper functions
 */
// getMousePos returns {x, y} position of mouse cursor
const getMousePos = (evt, canvas) => {
  const rect = canvas.getBoundingClientRect();
  return {
    y: evt.clientY - rect.top,
    x: evt.clientX - rect.left
  }
}

const handleMouseClick = (evt, canvas) => {
  const mousePos = getMousePos(evt, canvas);
  console.log(`mouseX: ${mousePos.x}, mouseY: ${mousePos.y}`);
};

/*
 * Cheat sheet
 *
 * Setup Colors
 * ------------
 * ctx.fillStyle = css color | gradient | pattern
 * ctx.strokeStyle = css color | gradient | pattern
 *
 * Setup Shapes
 * ------------
 * ctx.rect(x, y, width, height)          // can use ctx.fillRect to directly fill a rect
 * ctx.arc(x, y, r, startAngle, endAngle) // 0, Math.PI*2 for full circle
 *
 * Setup text
 * ----------
 * ctx.font = '30px Arial'
 * ctx.testAlign = 'center'
 * ctx.fillText('text', x, y)
 * ctx.strokeText('text', x, y)
 *
 * Draw
 * ----
 * ctx.beginPath()
 * ctx.moveTo(x, y) // move cursor without drawing
 * ctx.lineTo(x, y) // declare a line to
 * ctx.stroke()     // actually draw lines previously declared
 * ctx.fill()       // fill what was previously declared
 *
 */

