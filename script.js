/*
 * Thing is a the basic drawable entity on the canvas
 */
class Thing {
  constructor(x, y, size, canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    // position on cavas
    this.x = x;
    this.y = y;

    this.size = size;
  }

  // update cycle called every draw loop
  update() {
  }

  render() {
    this.ctx.fillStyle = 'orange';
    this.ctx.strokeStyle = 'orange';
    // "- this.size / 2" draws at the center of Thing, instead of start at top left
    // this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    const dir = Math.random() < 0.5;
    // const fromx = dir ? this.x : this.x + this.size;
    // const tox = dir ? this.x + this.size : this.x;
    // let fromy = this.y;
    // let toy = this.y + this.size;
    // const fromx = dir ? this.x : this.x + this.size;
    // const tox = dir ? this.x + this.size : this.x;

    // const fromy = this.y;
    // const toy = this.y + this.size;

    let fromx, fromy, tox, toy;
    if (dir) {
      [fromx, tox] = [this.x, this.x + this.size];
      [fromy, toy] = [this.y + this.size/2, this.y + this.size/2];
    } else {
      [fromx, tox] = [this.x + this.size/2, this.x + this.size/2];
      [fromy, toy] = [this.y, this.y + this.size];
    }

    this.ctx.beginPath();
    this.ctx.moveTo(fromx, fromy);
    this.ctx.lineTo(tox, toy);
    this.ctx.stroke();
  }
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
 * Rendering base.
 *
 * draw draws the canvas and its elements
 *
 * setup is a one time call to select the canvas DOM element
 * and start a loop 30 times / second.
 */
const draw = (canvas, ctx, things) => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (thing of things) {
    thing.render();
  }
}

const setup = () => {
  // get canvas from DOM
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  // constants
  const canvasSize = canvas.width;
  const elSize = canvas.width / 20;
  const elRow = canvasSize / elSize;

  // draw();
  // generate some Things
  const count = elRow**2;
  const things = [];
  for (var i = 0; i < count; i++) {
    things.push(new Thing(Math.floor(i%elRow) * elSize, Math.floor(i/elRow) * elSize, elSize, canvas, ctx));
  }

  draw(canvas, ctx, things);

  // setup the rendering loop
  // window.setInterval(() => {
  //   draw(canvas, ctx, things)
  // }, 1000/60)

  // listener for mouse click
  // canvas.addEventListener('click', evt => {
  //   handleMouseClick(evt, canvas)
  // })
}

setup()

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

