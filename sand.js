const data = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];
function draw() {
  for (let y = 0; y < data.length; y++) {
    console.log(data[y]);
  }
  console.log();
  console.log();
}
function loop() {
  let y = data.length - 1;
  let moved = false;
  while (y > 0) {
    let x = data[y].length - 1;
    while (x >= 0) {
      if (data[y - 1][x] === 1) {
        if (data[y][x] === 0) {
          data[y][x] = 1;
          data[y - 1][x] = 0;
          moved = true;
        } else if (data[y][x - 1] === 0) {
          data[y][x - 1] = 1;
          data[y - 1][x] = 0;
          moved = true;
        } else if (data[y][x + 1] === 0) {
          data[y][x + 1] = 1;
          data[y - 1][x] = 0;
          moved = true;
        }
      }
      x--;
    }
    y--;
  }
  if (moved) {
    draw();
    loop();
  }
}
loop();
