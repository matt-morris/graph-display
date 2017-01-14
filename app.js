let canvas = document.querySelector('#app');

let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

canvas.width = width;
canvas.height = height;

let ctx = canvas.getContext('2d');

let frameRate = 0;

let nodes = [];
for (let i = 0; i < 37; i++) {
  nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, dx: (0.5 - Math.random()) * (Math.random() * 2), dy: (0.5 - Math.random()) * (Math.random() * 2) });
}

let distance = (p1, p2) => {
  return Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2);
};

let circle = (x, y, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = r;
  ctx.strokeStyle = '#333';
  ctx.stroke();
};

let line = (x1, y1, x2, y2, lineWidth) => {
  lineWidth = lineWidth || 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.stroke();
};

let draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (n in nodes) {
    n = nodes[n];
    if (Math.random() > 0.85 && n.dx > 0.5 && n.dx < 5) {
      n.dx += (0.5 - Math.random());
    }
    if (Math.random() > 0.85 && n.dy > 0.5 && n.dy < 5) {
      n.dy += (0.5 - Math.random());
    }
    if (n.x > canvas.height) { n.x = 0; }
    if (n.x < 0) { n.x = canvas.height; }
    if (n.y > canvas.width) { n.y = 0; }
    if (n.y < 0) { n.y = canvas.width; }
    n.x += n.dx;
    n.y += n.dy;
    circle(n.x, n.y, 3);
    for (nn in nodes) {
      nn = nodes[nn];
      if (n === nn) break;
      if (distance(n, nn) < 250) {
        let w = Math.max(Math.min(2.5 - distance(n, nn) / 100, 4), 0.1);
        line(n.x, n.y, nn.x, nn.y, w);
      }
    }
  }
  frameRate += 1;
  window.requestAnimationFrame(draw);
};

setInterval(() => {
  console.log('frame rate:', frameRate);
  frameRate = 0;
}, 1000)

draw();