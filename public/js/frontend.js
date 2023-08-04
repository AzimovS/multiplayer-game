const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const socket = io();

const scoreEl = document.querySelector('#scoreEl');

const devicePixelRatio = window.devicePixelRatio || 1;

canvas.width = innerWidth * devicePixelRatio;
canvas.height = innerHeight * devicePixelRatio;

const x = canvas.width / 2;
const y = canvas.height / 2;

const frontendPlayers = {};

socket.on('updatePlayers', (backendPlayers) => {
  for (const id in backendPlayers) {
    const backendPlayer = backendPlayers[id];

    if (!frontendPlayers[id]) {
      frontendPlayers[id] = new Player({
        x: backendPlayer.x,
        y: backendPlayer.y,
        radius: 10,
        color: backendPlayer.color,
      });
    } else {
      frontendPlayers[id].x = backendPlayer.x
      frontendPlayers[id].y = backendPlayer.y
    }
  }

  for (const id in frontendPlayers) {
    if (!backendPlayers[id]) {
      delete frontendPlayers[id];
    }
  }
});

let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (const id in frontendPlayers) {
    const frontendPlayer = frontendPlayers[id];
    frontendPlayer.draw();
  }
}

animate();

window.addEventListener('keydown', (event) => {
  if (!frontendPlayers[socket.id]) return;
  switch (event.code) {
    case 'KeyW':
      frontendPlayers[socket.id].y -= 5;
      socket.emit('keydown', 'KeyW');
      break;
    case 'KeyA':
      frontendPlayers[socket.id].x -= 5;
      socket.emit('keydown', 'KeyA');
      break;
    case 'KeyS':
      frontendPlayers[socket.id].y += 5;
      socket.emit('keydown', 'KeyS');
      break;
    case 'KeyD':
      frontendPlayers[socket.id].x += 5;
      socket.emit('keydown', 'KeyD');
      break;
  }
});
