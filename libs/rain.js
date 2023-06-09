const canvas = document.querySelector('.rain');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const randomNum = (max, min = 0) => {
  return Math.floor(Math.random() * max + min);
};

class RainDrops {
  constructor(x, y, endy, velocity, opacity) {
    this.x = x;
    this.y = y;
    this.endy = endy;
    this.velocity = velocity;
    this.opacity = opacity;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y - this.endy);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
    ctx.stroke();
  }

  update() {
    let rainEnd = window.innerHeight + 100;
    if (this.y >= rainEnd) {
      this.y = this.endy - 100;
    } else {
      this.y = this.y + this.velocity;
    }
    this.draw();
  }
}

const rainArray = [];

for (let i = 0; i < 140; i++) {
  let rainXLocation = randomNum(window.innerWidth, 1);
  let rainYLocation = Math.random() * -500;
  let randomRainHeight = randomNum(10, 2);
  let randomSpeed = randomNum(20, 0.2);
  let randomOpacity = Math.random() * 0.55;
  rainArray.push(
    new RainDrops(
      rainXLocation,
      rainYLocation,
      randomRainHeight,
      randomSpeed,
      randomOpacity
    )
  );
}

const animateRain = () => {
  requestAnimationFrame(animateRain);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < rainArray.length; i++) {
    rainArray[i].update();
  }
};

animateRain();
