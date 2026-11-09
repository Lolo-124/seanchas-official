if (matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
  const SIZE = 16;
  const LIFE = 1200;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position: fixed; inset: 0; z-index: 50; pointer-events: none";
  document.body.append(canvas);

  const ctx = canvas.getContext("2d");
  const color = getComputedStyle(document.body).getPropertyValue("--trail");
  let squares = [];

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize);

  addEventListener("mousemove", (e) => {
    const x = Math.floor(e.clientX / SIZE) * SIZE;
    const y = Math.floor(e.clientY / SIZE) * SIZE;
    const last = squares[squares.length - 1];
    if (!last || last.x !== x || last.y !== y) squares.push({ x, y, time: Date.now() });
  });

  function draw() {
    const now = Date.now();
    squares = squares.filter((s) => now - s.time < LIFE);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    for (const s of squares) {
      ctx.globalAlpha = 0.5 * (1 - (now - s.time) / LIFE);
      ctx.fillRect(s.x, s.y, SIZE, SIZE);
    }
    requestAnimationFrame(draw);
  }
  draw();
}
