addEventListener('click', (event) => {
  const playerPosition = {
    x: frontendPlayers[socket.id].x,
    y: frontendPlayers[socket.id].y,
  };
  const angle = Math.atan2(
    event.clientY * window.devicePixelRatio - playerPosition.y,
    event.clientX * window.devicePixelRatio - playerPosition.x
  );
  // const velocity = {
  //   x: Math.cos(angle) * 10,
  //   y: Math.sin(angle) * 10,
  // };

  socket.emit('shoot', {
    x: playerPosition.x,
    y: playerPosition.y,
    angle,
  });
  // frontendProjectiles.push(
  //   new Projectile({
  //     x: playerPosition.x,
  //     y: playerPosition.y,
  //     radius: 5,
  //     color: 'white',
  //     velocity,
  //   })
  // );
});
