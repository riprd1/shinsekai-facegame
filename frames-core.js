(function () {
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function alphaColor(base, alpha) {
    if (!base) return `rgba(255,255,255,${alpha})`;

    if (base.startsWith("rgba(")) {
      const parts = base.replace("rgba(", "").replace(")", "").split(",");
      return `rgba(${parts[0].trim()}, ${parts[1].trim()}, ${parts[2].trim()}, ${alpha})`;
    }

    if (base.startsWith("rgb(")) {
      const parts = base.replace("rgb(", "").replace(")", "").split(",");
      return `rgba(${parts[0].trim()}, ${parts[1].trim()}, ${parts[2].trim()}, ${alpha})`;
    }

    return base;
  }

  function hashSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function seededRandom(seed) {
    let s = seed >>> 0;
    return function () {
      s = Math.imul(1664525, s) + 1013904223;
      return ((s >>> 0) / 4294967296);
    };
  }

  function drawStarShape(ctx, radius) {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 4;
      const outerX = Math.cos(angle) * radius;
      const outerY = Math.sin(angle) * radius;
      const innerAngle = angle + Math.PI / 4;
      const innerX = Math.cos(innerAngle) * radius * 0.22;
      const innerY = Math.sin(innerAngle) * radius * 0.22;

      if (i === 0) {
        ctx.moveTo(outerX, outerY);
      } else {
        ctx.lineTo(outerX, outerY);
      }
      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
  }

  function drawSoftDiamondStar(ctx, x, y, radius, color, alpha = 1, rotation = 0, blur = 10) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    drawStarShape(ctx, radius);
    ctx.fill();
    ctx.restore();
  }

  function drawTinyTwinkle(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, size * 0.16);
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.stroke();

    ctx.lineWidth = Math.max(0.8, size * 0.1);
    ctx.beginPath();
    ctx.moveTo(-size * 0.45, -size * 0.45);
    ctx.lineTo(size * 0.45, size * 0.45);
    ctx.moveTo(size * 0.45, -size * 0.45);
    ctx.lineTo(-size * 0.45, size * 0.45);
    ctx.stroke();

    ctx.restore();
  }

  function drawHeart(ctx, x, y, size, color, alpha = 1, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(0, size * 0.3);
    ctx.bezierCurveTo(0, 0, -size * 0.5, 0, -size * 0.5, size * 0.3);
    ctx.bezierCurveTo(-size * 0.5, size * 0.6, 0, size * 0.85, 0, size);
    ctx.bezierCurveTo(0, size * 0.85, size * 0.5, size * 0.6, size * 0.5, size * 0.3);
    ctx.bezierCurveTo(size * 0.5, 0, 0, 0, 0, size * 0.3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.fill();
    ctx.restore();
  }

  function drawSparkle(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1.1, size * 0.22);
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.stroke();

    ctx.lineWidth = Math.max(0.8, size * 0.1);
    ctx.beginPath();
    ctx.moveTo(-size * 0.45, -size * 0.45);
    ctx.lineTo(size * 0.45, size * 0.45);
    ctx.moveTo(size * 0.45, -size * 0.45);
    ctx.lineTo(-size * 0.45, size * 0.45);
    ctx.stroke();

    ctx.restore();
  }

  function drawDiamond(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 10) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.72, -size * 0.18);
    ctx.lineTo(size * 0.46, size * 0.86);
    ctx.lineTo(-size * 0.46, size * 0.86);
    ctx.lineTo(-size * 0.72, -size * 0.18);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size * 0.86);
    ctx.moveTo(-size * 0.72, -size * 0.18);
    ctx.lineTo(size * 0.72, -size * 0.18);
    ctx.moveTo(-size * 0.24, size * 0.2);
    ctx.lineTo(0, -size * 0.18);
    ctx.lineTo(size * 0.24, size * 0.2);
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = Math.max(0.8, size * 0.08);
    ctx.stroke();

    ctx.restore();
  }

  function drawCircleCandy(ctx, x, y, size, colorA, colorB, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(-size * 0.3, -size * 0.3, size * 0.1, 0, 0, size);
    grad.addColorStop(0, colorA);
    grad.addColorStop(1, colorB);
    ctx.fillStyle = grad;
    ctx.shadowColor = colorB;
    ctx.shadowBlur = blur;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.9, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = Math.max(0.8, size * 0.14);
    ctx.stroke();

    ctx.restore();
  }

  function drawBow(ctx, x, y, size, color, alpha = 1, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.ellipse(-size * 0.45, 0, size * 0.42, size * 0.28, -0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(size * 0.45, 0, size * 0.42, size * 0.28, 0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-size * 0.12, size * 0.18);
    ctx.lineTo(-size * 0.32, size * 0.62);
    ctx.lineTo(-size * 0.02, size * 0.36);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(size * 0.12, size * 0.18);
    ctx.lineTo(size * 0.32, size * 0.62);
    ctx.lineTo(size * 0.02, size * 0.36);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawButterfly(ctx, x, y, size, colorA, colorB, wingOpen = 1, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    const spread = clamp(wingOpen, 0.2, 1.2);

    ctx.fillStyle = colorA;
    ctx.shadowColor = colorB;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.ellipse(-size * 0.42 * spread, -size * 0.1, size * 0.34, size * 0.26, -0.7, 0, Math.PI * 2);
    ctx.ellipse(size * 0.42 * spread, -size * 0.1, size * 0.34, size * 0.26, 0.7, 0, Math.PI * 2);
    ctx.ellipse(-size * 0.33 * spread, size * 0.26, size * 0.26, size * 0.18, -0.35, 0, Math.PI * 2);
    ctx.ellipse(size * 0.33 * spread, size * 0.26, size * 0.18, size * 0.26, 0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.42)";
    ctx.lineWidth = Math.max(0.8, size * 0.06);
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.5);
    ctx.lineTo(0, size * 0.58);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.42);
    ctx.quadraticCurveTo(-size * 0.12, -size * 0.68, -size * 0.22, -size * 0.82);
    ctx.moveTo(0, -size * 0.42);
    ctx.quadraticCurveTo(size * 0.12, -size * 0.68, size * 0.22, -size * 0.82);
    ctx.stroke();

    ctx.restore();
  }

  function drawCrescentMoon(ctx, x, y, size, color, shadowColor, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.arc(size * 0.42, -size * 0.1, size * 0.88, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawCrown(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 10) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    const grad = ctx.createLinearGradient(0, -size * 1.1, 0, size * 0.9);
    grad.addColorStop(0, "rgba(255,250,205,1)");
    grad.addColorStop(0.25, "rgba(255,230,120,1)");
    grad.addColorStop(0.58, color);
    grad.addColorStop(1, "rgba(176,116,16,1)");

    ctx.fillStyle = grad;
    ctx.shadowColor = "rgba(255,220,90,0.95)";
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(-size * 1.02, size * 0.34);
    ctx.lineTo(-size * 0.82, -size * 0.18);
    ctx.lineTo(-size * 0.48, size * 0.02);
    ctx.lineTo(-size * 0.16, -size * 0.44);
    ctx.lineTo(0, size * 0.02);
    ctx.lineTo(size * 0.16, -size * 0.52);
    ctx.lineTo(size * 0.48, size * 0.02);
    ctx.lineTo(size * 0.82, -size * 0.18);
    ctx.lineTo(size * 1.02, size * 0.34);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(-size * 1.06, size * 0.26, size * 2.12, size * 0.42, size * 0.12);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,249,212,0.9)";
    ctx.lineWidth = Math.max(0.9, size * 0.08);
    ctx.beginPath();
    ctx.moveTo(-size * 0.88, size * 0.26);
    ctx.lineTo(-size * 0.7, -size * 0.1);
    ctx.lineTo(-size * 0.38, size * 0.08);
    ctx.lineTo(-size * 0.14, -size * 0.28);
    ctx.lineTo(0, size * 0.08);
    ctx.lineTo(size * 0.14, -size * 0.36);
    ctx.lineTo(size * 0.38, size * 0.08);
    ctx.lineTo(size * 0.7, -size * 0.1);
    ctx.lineTo(size * 0.88, size * 0.26);
    ctx.stroke();

    ctx.restore();
  }

  function drawRose(ctx, x, y, size, petalColor, centerColor, alpha = 1, rotation = 0, blur = 10) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = petalColor;
    ctx.shadowBlur = blur;

    for (let i = 0; i < 7; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / 7);
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.28, size * 0.3, size * 0.48, 0, 0, Math.PI * 2);
      ctx.fillStyle = petalColor;
      ctx.fill();
      ctx.restore();
    }

    for (let i = 0; i < 5; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / 5 + 0.35);
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.12, size * 0.22, size * 0.32, 0, 0, Math.PI * 2);
      ctx.fillStyle = centerColor;
      ctx.fill();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,235,245,0.95)";
    ctx.fill();
    ctx.restore();
  }

  function drawPetal(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.75, -size * 0.45, size * 0.7, size * 0.45, 0, size);
    ctx.bezierCurveTo(-size * 0.7, size * 0.45, -size * 0.75, -size * 0.45, 0, -size);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.7);
    ctx.quadraticCurveTo(size * 0.14, 0, 0, size * 0.62);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = Math.max(0.8, size * 0.08);
    ctx.stroke();

    ctx.restore();
  }

  function drawWing(ctx, x, y, size, color, alpha = 1, rotation = 0, flip = 1, blur = 12) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flip, 1);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size * 0.15, -size * 0.8, size * 0.86, -size * 0.92, size * 1.02, -size * 0.2);
    ctx.bezierCurveTo(size * 0.94, size * 0.2, size * 0.55, size * 0.78, 0, size * 0.98);
    ctx.bezierCurveTo(size * 0.16, size * 0.36, size * 0.12, size * 0.18, 0, 0);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -size, size, size);
    grad.addColorStop(0, "rgba(255,255,255,0.98)");
    grad.addColorStop(0.55, color);
    grad.addColorStop(1, "rgba(220,235,255,0.86)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = Math.max(1, size * 0.08);
    ctx.beginPath();
    ctx.moveTo(size * 0.08, -size * 0.05);
    ctx.quadraticCurveTo(size * 0.4, -size * 0.42, size * 0.86, -size * 0.12);
    ctx.moveTo(size * 0.02, size * 0.2);
    ctx.quadraticCurveTo(size * 0.36, size * 0.08, size * 0.72, size * 0.42);
    ctx.stroke();

    ctx.restore();
  }

  function drawSnowflake(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, size * 0.12);
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / 6);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -size * 0.56);
      ctx.lineTo(size * 0.16, -size * 0.36);
      ctx.moveTo(0, -size * 0.56);
      ctx.lineTo(-size * 0.16, -size * 0.36);
      ctx.moveTo(0, size * 0.56);
      ctx.lineTo(size * 0.16, size * 0.36);
      ctx.moveTo(0, size * 0.56);
      ctx.lineTo(-size * 0.16, size * 0.36);
      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();
  }

  function drawPawPrint(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.ellipse(0, size * 0.18, size * 0.42, size * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(-size * 0.36, -size * 0.28, size * 0.16, size * 0.2, -0.25, 0, Math.PI * 2);
    ctx.ellipse(-size * 0.1, -size * 0.44, size * 0.16, size * 0.22, -0.08, 0, Math.PI * 2);
    ctx.ellipse(size * 0.16, -size * 0.44, size * 0.16, size * 0.22, 0.08, 0, Math.PI * 2);
    ctx.ellipse(size * 0.42, -size * 0.28, size * 0.16, size * 0.2, 0.25, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawShootingStar(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 12) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    const tailGrad = ctx.createLinearGradient(-size * 1.9, 0, size * 0.45, 0);
    tailGrad.addColorStop(0, "rgba(255,255,255,0)");
    tailGrad.addColorStop(0.45, alphaColor(color, 0.18));
    tailGrad.addColorStop(0.78, alphaColor(color, 0.62));
    tailGrad.addColorStop(1, "rgba(255,255,255,0.96)");

    ctx.strokeStyle = tailGrad;
    ctx.lineWidth = Math.max(1.7, size * 0.2);
    ctx.lineCap = "round";
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.beginPath();
    ctx.moveTo(-size * 1.9, 0);
    ctx.lineTo(size * 0.28, 0);
    ctx.stroke();

    drawSoftDiamondStar(ctx, size * 0.38, 0, size * 0.42, "rgba(255,255,255,0.98)", alpha, 0.3, blur);
    ctx.restore();
  }

  function drawInnerGlow(ctx, x, y, r, meta) {
    const gradient = ctx.createRadialGradient(x, y, r * 0.34, x, y, r * 0.98);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.7, "rgba(255,255,255,0)");
    gradient.addColorStop(0.88, alphaColor(meta.glow, 0.12));
    gradient.addColorStop(1, alphaColor(meta.glow, 0.26));

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.98, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  }

  function drawBaseRing(ctx, x, y, r, meta) {
    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, r - 1.2, 0, Math.PI * 2);
    ctx.strokeStyle = meta.color;
    ctx.lineWidth = Math.max(2.8, r * 0.095);
    ctx.shadowColor = meta.glow;
    ctx.shadowBlur = meta.rank === "SSR" ? 18 : meta.rank === "SR" ? 15 : 12;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r - 4.2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.32)";
    ctx.lineWidth = Math.max(0.9, r * 0.026);
    ctx.stroke();

    ctx.restore();
  }

  window.FaceGameFramesCore = {
    clamp,
    alphaColor,
    hashSeed,
    seededRandom,
    drawStarShape,
    drawSoftDiamondStar,
    drawTinyTwinkle,
    drawHeart,
    drawSparkle,
    drawDiamond,
    drawCircleCandy,
    drawBow,
    drawButterfly,
    drawCrescentMoon,
    drawCrown,
    drawRose,
    drawPetal,
    drawWing,
    drawSnowflake,
    drawPawPrint,
    drawShootingStar,
    drawInnerGlow,
    drawBaseRing
  };

  window.FaceGameFrames = {
    attachFrameRenderer(render, world, Composite, getFrameMeta) {
      Events.on(render, "afterRender", () => {
        const ctx = render.context;
        const bodies = Composite.allBodies(world).filter(body => !body.isStatic && body.member);
        const now = performance.now();

        bodies.forEach(body => {
          if (
            window.FaceGameFrameEffects &&
            typeof window.FaceGameFrameEffects.drawFrameForBody === "function"
          ) {
            window.FaceGameFrameEffects.drawFrameForBody(
              ctx,
              body,
              getFrameMeta,
              now,
              window.FaceGameFramesCore
            );
          }
        });
      });
    }
  };
})();
