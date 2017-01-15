let getParam = (key) => {
  let result = new RegExp(key + '=([^&]*)', 'i').exec(window.location.search);
  return result && unescape(result[1]) || '';
};

let canvas = document.querySelector('#app');

let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

canvas.width = width;
canvas.height = height;

let range = Math.max(width, height, 750) / 5;

let nodeCount = parseInt(getParam('nodes')) || Math.ceil(width * height / 15000);

let ctx = canvas.getContext('2d');

let frameRate = 0;

let nodes = [];
for (let i = 0; i < nodeCount; i++) {
  nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, dx: (0.5 - Math.random()) * (Math.random() * 2), dy: (0.5 - Math.random()) * (Math.random() * 2) });
}

let distance = (p1, p2) => {
  return Math.hypot((p2.x - p1.x), (p2.y - p1.y));
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
  ctx.clearRect(0, 0, width, height);
  for (n in nodes) {
    n = nodes[n];
    if (Math.random() > 0.85 && n.dx > 0.5 && n.dx < 5) {
      n.dx += (0.5 - Math.random());
    }
    if (Math.random() > 0.85 && n.dy > 0.5 && n.dy < 5) {
      n.dy += (0.5 - Math.random());
    }
    if (n.x > width + range) { n.x = -range; }
    if (n.x < -range) { n.x = width + range; }
    if (n.y > height + range) { n.y = -range; }
    if (n.y < -range) { n.y = height + range; }
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
