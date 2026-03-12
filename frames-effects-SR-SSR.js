(function () {
  const previousEffects =
    window.FaceGameFrameEffects &&
    typeof window.FaceGameFrameEffects.drawFrameForBody === "function"
      ? window.FaceGameFrameEffects
      : null;

  function drawAuroraRibbon(ctx, x, y, outerR, innerR, startAngle, endAngle, colors, alpha, blur) {
    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, outerR, startAngle, endAngle);
    ctx.arc(x, y, innerR, endAngle, startAngle, true);
    ctx.closePath();

    const mid = (startAngle + endAngle) / 2;
    const gx1 = x + Math.cos(mid) * innerR;
    const gy1 = y + Math.sin(mid) * innerR;
    const gx2 = x + Math.cos(mid) * outerR;
    const gy2 = y + Math.sin(mid) * outerR;

    const gradient = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.28, colors[1]);
    gradient.addColorStop(0.58, colors[2]);
    gradient.addColorStop(0.84, colors[3]);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.globalAlpha = alpha;
    ctx.fillStyle = gradient;
    ctx.shadowColor = colors[2];
    ctx.shadowBlur = blur;
    ctx.fill();

    ctx.restore();
  }

  function drawDetailedCrown(ctx, x, y, size, alpha, sway) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(sway);
    ctx.globalAlpha = alpha;

    const grad = ctx.createLinearGradient(0, -size * 1.2, 0, size);
    grad.addColorStop(0, "rgba(255,252,220,1)");
    grad.addColorStop(0.18, "rgba(255,236,145,1)");
    grad.addColorStop(0.52, "rgba(255,201,58,1)");
    grad.addColorStop(1, "rgba(170,98,0,1)");

    ctx.shadowColor = "rgba(255,214,90,0.95)";
    ctx.shadowBlur = size * 0.55;
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(-size * 1.04, size * 0.34);
    ctx.lineTo(-size * 0.9, -size * 0.08);
    ctx.lineTo(-size * 0.6, size * 0.04);
    ctx.lineTo(-size * 0.34, -size * 0.52);
    ctx.lineTo(-size * 0.12, size * 0.02);
    ctx.lineTo(0, -size * 0.86);
    ctx.lineTo(size * 0.12, size * 0.02);
    ctx.lineTo(size * 0.34, -size * 0.52);
    ctx.lineTo(size * 0.6, size * 0.04);
    ctx.lineTo(size * 0.9, -size * 0.08);
    ctx.lineTo(size * 1.04, size * 0.34);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(-size * 1.08, size * 0.22, size * 2.16, size * 0.48, size * 0.16);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,248,212,0.95)";
    ctx.lineWidth = Math.max(1, size * 0.08);
    ctx.beginPath();
    ctx.moveTo(-size * 0.95, size * 0.24);
    ctx.lineTo(-size * 0.82, -size * 0.02);
    ctx.lineTo(-size * 0.56, size * 0.1);
    ctx.lineTo(-size * 0.32, -size * 0.38);
    ctx.lineTo(-size * 0.1, size * 0.08);
    ctx.lineTo(0, -size * 0.68);
    ctx.lineTo(size * 0.1, size * 0.08);
    ctx.lineTo(size * 0.32, -size * 0.38);
    ctx.lineTo(size * 0.56, size * 0.1);
    ctx.lineTo(size * 0.82, -size * 0.02);
    ctx.lineTo(size * 0.95, size * 0.24);
    ctx.stroke();

    const jewels = [
      { x: -size * 0.34, y: -size * 0.2, r: size * 0.11, c1: "rgba(255,255,255,0.98)", c2: "rgba(255,120,210,0.95)" },
      { x: 0, y: -size * 0.54, r: size * 0.14, c1: "rgba(255,255,255,1)", c2: "rgba(255,245,165,0.98)" },
      { x: size * 0.34, y: -size * 0.2, r: size * 0.11, c1: "rgba(255,255,255,0.98)", c2: "rgba(130,210,255,0.95)" }
    ];

    jewels.forEach(j => {
      const rg = ctx.createRadialGradient(j.x - j.r * 0.3, j.y - j.r * 0.3, j.r * 0.1, j.x, j.y, j.r);
      rg.addColorStop(0, j.c1);
      rg.addColorStop(1, j.c2);
      ctx.beginPath();
      ctx.arc(j.x, j.y, j.r, 0, Math.PI * 2);
      ctx.fillStyle = rg;
      ctx.shadowColor = j.c2;
      ctx.shadowBlur = j.r * 2.2;
      ctx.fill();
    });

    ctx.restore();
  }

  function drawRoseBloom(ctx, x, y, size, bloom, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    const outerCount = 8;
    const innerCount = 6;
    const open = 0.48 + bloom * 0.68;

    for (let i = 0; i < outerCount; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / outerCount);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        size * 0.12,
        -size * 0.16,
        size * 0.52 * open,
        -size * 0.62 * open,
        0,
        -size * 0.98 * open
      );
      ctx.bezierCurveTo(
        -size * 0.52 * open,
        -size * 0.62 * open,
        -size * 0.12,
        -size * 0.16,
        0,
        0
      );
      ctx.closePath();
      ctx.fillStyle = "rgba(98,16,48,0.98)";
      ctx.shadowColor = "rgba(150,34,78,0.55)";
      ctx.shadowBlur = size * 0.28;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -size * 0.1);
      ctx.quadraticCurveTo(size * 0.12, -size * 0.38, 0, -size * 0.74 * open);
      ctx.strokeStyle = "rgba(176,78,116,0.34)";
      ctx.lineWidth = Math.max(0.7, size * 0.05);
      ctx.stroke();
      ctx.restore();
    }

    for (let i = 0; i < innerCount; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / innerCount + 0.25);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        size * 0.08,
        -size * 0.12,
        size * 0.28 * open,
        -size * 0.44 * open,
        0,
        -size * 0.62 * open
      );
      ctx.bezierCurveTo(
        -size * 0.28 * open,
        -size * 0.44 * open,
        -size * 0.08,
        -size * 0.12,
        0,
        0
      );
      ctx.closePath();
      ctx.fillStyle = "rgba(135,28,66,0.98)";
      ctx.fill();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(248,208,225,0.92)";
    ctx.fill();

    ctx.restore();
  }

  function drawRosePetalParticle(ctx, x, y, size, color, alpha, rotation, blur, core) {
    core.drawPetal(ctx, x, y, size, color, alpha, rotation, blur);
  }

  function drawTwistedVine(ctx, points, width, baseColor, glowColor) {
    ctx.save();
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = width * 1.5;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const mx = (prev.x + curr.x) * 0.5;
      const my = (prev.y + curr.y) * 0.5;
      ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
    }

    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();

    ctx.strokeStyle = "rgba(86,22,40,0.95)";
    ctx.lineWidth = Math.max(0.8, width * 0.42);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const mx = (prev.x + curr.x) * 0.5;
      const my = (prev.y + curr.y) * 0.5;
      ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();

    for (let i = 1; i < points.length - 1; i++) {
      const a = points[i - 1];
      const b = points[i];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.max(1, Math.hypot(dx, dy));
      const nx = -dy / len;
      const ny = dx / len;
      const dir = i % 2 === 0 ? 1 : -1;
      const thornLen = width * (0.9 + (i % 3) * 0.18);

      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x + nx * thornLen * dir, b.y + ny * thornLen * dir);
      ctx.strokeStyle = "rgba(46,10,22,0.98)";
      ctx.lineWidth = Math.max(0.8, width * 0.36);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawLeaf(ctx, px, py, size, angle, alpha) {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size * 0.28, -size * 0.28, size * 0.92, -size * 0.22, size, 0);
    ctx.bezierCurveTo(size * 0.92, size * 0.22, size * 0.28, size * 0.28, 0, 0);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -size * 0.3, size, size * 0.3);
    grad.addColorStop(0, "rgba(58,32,32,0.92)");
    grad.addColorStop(1, "rgba(22,12,16,0.95)");
    ctx.fillStyle = grad;
    ctx.shadowColor = "rgba(124,38,68,0.22)";
    ctx.shadowBlur = size * 0.4;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size * 0.86, 0);
    ctx.strokeStyle = "rgba(110,62,72,0.35)";
    ctx.lineWidth = Math.max(0.8, size * 0.06);
    ctx.stroke();

    ctx.restore();
  }

  function drawStarGlowSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const bigCount = 5;
    const smallCount = 8;
    const bigRingRadius = r * 0.82;
    const smallRingRadius = r * 0.76;

    const bigYellow = "#ffe680";
    const bigYellow2 = "#ffd84d";
    const smallWhite = "rgba(255,255,255,0.96)";

    for (let i = 0; i < bigCount; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / bigCount);
      const angle = baseAngle + Math.sin(time * 0.00055 + i * 1.05) * 0.08;
      const dx = x + Math.cos(angle) * bigRingRadius;
      const dy = y + Math.sin(angle) * bigRingRadius;

      const pulse = (Math.sin(time * 0.0021 + i * 1.6) + 1) / 2;
      const alpha = core.clamp(0.48 + pulse * 0.52, 0.34, 1);
      const radius = Math.max(4.6, r * 0.16) * (0.9 + pulse * 0.14);
      const rotation = time * 0.0007 + i * 0.7;

      const color = i % 2 === 0 ? bigYellow : bigYellow2;
      core.drawSoftDiamondStar(ctx, dx, dy, radius, color, alpha, rotation, 12);
    }

    for (let i = 0; i < smallCount; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / smallCount) + 0.18;
      const angle = baseAngle + Math.sin(time * 0.0009 + i * 1.83) * 0.06;
      const dx = x + Math.cos(angle) * smallRingRadius;
      const dy = y + Math.sin(angle) * smallRingRadius;

      const blink = Math.sin(time * 0.0046 + i * 2.31);
      const alpha = blink > 0.15 ? core.clamp((blink - 0.15) / 0.85, 0, 1) * 0.95 : 0.02;
      const size = Math.max(2.2, r * 0.078) * (0.9 + Math.sin(time * 0.0028 + i) * 0.08);
      const rotation = -time * 0.001 + i * 0.36;

      core.drawTinyTwinkle(ctx, dx, dy, size, smallWhite, alpha, rotation, 9);
    }
  }

  function drawAuroraSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const hueBase = (time * 0.02) % 360;
    const bands = [
      { speed: 0.00042, len: 1.24, thickness: 0.16, shift: 0.0, alpha: 0.82 },
      { speed: -0.00031, len: 1.06, thickness: 0.14, shift: 46, alpha: 0.72 },
      { speed: 0.00054, len: 1.36, thickness: 0.18, shift: 104, alpha: 0.68 },
      { speed: -0.00024, len: 0.96, thickness: 0.13, shift: 168, alpha: 0.62 }
    ];

    bands.forEach((band, i) => {
      const center = time * band.speed + i * 1.38;
      const startAngle = center - band.len * 0.5;
      const endAngle = center + band.len * 0.5;

      const outerR = r - 1.4 - i * 0.45;
      const innerR = outerR - Math.max(4.8, r * band.thickness);

      const hue1 = (hueBase + band.shift + Math.sin(time * 0.0012 + i) * 24 + 360) % 360;
      const hue2 = (hue1 + 34 + Math.cos(time * 0.0015 + i * 0.9) * 18 + 360) % 360;
      const hue3 = (hue1 + 78 + Math.sin(time * 0.0011 + i * 1.3) * 22 + 360) % 360;

      const colors = [
        `hsla(${hue1}, 100%, 60%, 0.00)`,
        `hsla(${hue1}, 100%, 68%, 0.22)`,
        `hsla(${hue2}, 100%, 72%, 0.52)`,
        `hsla(${hue3}, 100%, 76%, 0.22)`
      ];

      drawAuroraRibbon(ctx, x, y, outerR, innerR, startAngle, endAngle, colors, band.alpha, 14);
    });

    for (let i = 0; i < 6; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 6) + Math.sin(time * 0.0008 + i) * 0.08;
      const dx = x + Math.cos(angle) * (r * 0.72);
      const dy = y + Math.sin(angle) * (r * 0.72);
      const alpha = core.clamp(0.16 + (Math.sin(time * 0.002 + i * 1.6) + 1) * 0.22, 0.08, 0.45);
      core.drawTinyTwinkle(ctx, dx, dy, Math.max(1.6, r * 0.05), "rgba(255,255,255,0.9)", alpha, i * 0.3, 7);
    }
  }

  function drawNeonPurpleSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const bands = [
      { speed: 0.0007, len: 1.5, alpha: 0.92, outerOffset: 0 },
      { speed: -0.00052, len: 1.14, alpha: 0.78, outerOffset: 0.9 },
      { speed: 0.00088, len: 1.02, alpha: 0.62, outerOffset: 1.8 }
    ];

    bands.forEach((band, i) => {
      const center = time * band.speed + i * 1.72;
      const startAngle = center - band.len * 0.5;
      const endAngle = center + band.len * 0.5;

      const outerR = r - 1.2 - band.outerOffset;
      const innerR = outerR - Math.max(4.6, r * 0.16);

      const colors = [
        "rgba(255,80,220,0)",
        "rgba(255,80,220,0.32)",
        "rgba(210,70,255,0.88)",
        "rgba(120,70,255,0.34)"
      ];

      drawAuroraRibbon(ctx, x, y, outerR, innerR, startAngle, endAngle, colors, band.alpha, 16);
    });

    const seed = core.hashSeed(`${Math.round(x)}-${Math.round(y)}-neon`);
    const rand = core.seededRandom(seed);
    const sparkleCount = 13;

    for (let i = 0; i < sparkleCount; i++) {
      const angle = rand() * Math.PI * 2 + Math.sin(time * 0.00018 + i) * 0.08;
      const radius = (0.12 + rand() * 0.68) * r;
      const sx = x + Math.cos(angle) * radius;
      const sy = y + Math.sin(angle) * radius;

      const blinkSpeed = 0.0012 + rand() * 0.0022;
      const blink = (Math.sin(time * blinkSpeed + i * 2.3 + rand() * 6) + 1) / 2;
      const hueMix = (Math.sin(time * 0.0015 + i * 1.1) + 1) / 2;
      const color = hueMix > 0.5 ? "rgba(255,80,220,0.98)" : "rgba(150,70,255,0.98)";
      const alpha = core.clamp(0.06 + blink * 0.82, 0.04, 0.9);

      if (rand() > 0.45) {
        core.drawSoftDiamondStar(
          ctx,
          sx,
          sy,
          Math.max(1.8, r * (0.045 + rand() * 0.03)) * (0.9 + blink * 0.24),
          color,
          alpha,
          Math.PI / 4 + i * 0.2,
          10
        );
      } else {
        core.drawTinyTwinkle(
          ctx,
          sx,
          sy,
          Math.max(1.4, r * (0.035 + rand() * 0.022)) * (0.9 + blink * 0.18),
          "rgba(255,255,255,0.92)",
          alpha,
          time * 0.0006 + i * 0.1,
          7
        );
      }
    }
  }

  function drawShinyGoldSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const starCount = 7;
    for (let i = 0; i < starCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / starCount) + Math.sin(time * 0.0009 + i) * 0.05;
      const dx = x + Math.cos(angle) * (r * 0.79);
      const dy = y + Math.sin(angle) * (r * 0.79);
      const pulse = (Math.sin(time * 0.0024 + i * 1.7) + 1) / 2;

      core.drawSoftDiamondStar(
        ctx,
        dx,
        dy,
        Math.max(3.2, r * 0.11) * (0.94 + pulse * 0.18),
        i % 2 === 0 ? "rgba(255,236,130,0.98)" : "rgba(255,255,255,0.96)",
        core.clamp(0.34 + pulse * 0.56, 0.2, 0.96),
        time * 0.00055 + i * 0.4,
        11
      );
    }

    for (let i = 0; i < 3; i++) {
      const phase = ((time * (0.00016 + i * 0.00004)) + i * 0.22) % 1;
      const px = x - r * 0.7 + phase * (r * 1.4);
      const py = y - r * 0.7 + phase * (r * 1.4);

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.93, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = "rgba(255,250,210,0.22)";
      ctx.lineWidth = Math.max(4, r * 0.18);
      ctx.shadowColor = "rgba(255,232,122,0.38)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(px - r * 0.5, py + r * 0.24);
      ctx.lineTo(px + r * 0.24, py - r * 0.5);
      ctx.stroke();

      ctx.restore();
    }
  }

  function drawCrystalSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const count = 7;
    const ringRadius = r * 0.81;

    for (let i = 0; i < count; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / count) + Math.sin(time * 0.0008 + i) * 0.04;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;

      const shine = (Math.sin(time * 0.002 + i * 1.64) + 1) / 2;
      const pulse = (Math.sin(time * 0.0036 + i * 2.1) + 1) / 2;
      const alpha = core.clamp(0.38 + shine * 0.54, 0.24, 1);
      const size = Math.max(4.2, r * 0.142) * (0.92 + pulse * 0.16);
      const rotation = Math.PI / 4 + time * 0.0006 + i * 0.5;

      core.drawDiamond(ctx, dx, dy, size, "rgba(210,248,255,0.95)", alpha, rotation, 12);
    }

    ctx.save();
    const gloss = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    gloss.addColorStop(0, "rgba(255,255,255,0)");
    gloss.addColorStop(0.35, "rgba(230,250,255,0.08)");
    gloss.addColorStop(0.5, "rgba(255,255,255,0.18)");
    gloss.addColorStop(0.65, "rgba(180,230,255,0.06)");
    gloss.addColorStop(1, "rgba(255,255,255,0)");

    ctx.beginPath();
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.clip();
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = gloss;
    ctx.lineWidth = Math.max(6, r * 0.32);
    ctx.shadowColor = "rgba(220,245,255,0.4)";
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(x - r * 0.9, y + r * 0.3);
    ctx.lineTo(x + r * 0.75, y - r * 0.65);
    ctx.stroke();
    ctx.restore();
  }

  function drawRibbonLaceSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const laceCount = 12;
    const laceRadius = r * 0.83;
    const laceColor = "rgba(255,245,252,0.95)";
    const ribbonColor = meta.color;

    for (let i = 0; i < laceCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / laceCount);
      const dx = x + Math.cos(angle) * laceRadius;
      const dy = y + Math.sin(angle) * laceRadius;
      const alpha = core.clamp(0.34 + ((Math.sin(time * 0.0018 + i * 0.92) + 1) / 2) * 0.44, 0.22, 0.82);

      core.drawCircleCandy(ctx, dx, dy, Math.max(1.7, r * 0.05), "rgba(255,255,255,0.96)", laceColor, alpha, 0, 6);
    }

    const ribbonAngles = [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6];
    ribbonAngles.forEach((angle, i) => {
      const dx = x + Math.cos(angle) * (r * 0.82);
      const dy = y + Math.sin(angle) * (r * 0.82);
      const pulse = (Math.sin(time * 0.0019 + i * 2.1) + 1) / 2;
      const alpha = core.clamp(0.42 + pulse * 0.48, 0.28, 0.92);
      const size = Math.max(4.4, r * 0.15) * (0.94 + pulse * 0.12);

      core.drawBow(ctx, dx, dy, size, ribbonColor, alpha, 10);
    });
  }

  function drawButterflySpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const butterflies = [
      { angle: -Math.PI / 2, speed: 0.0022, radius: r * 0.8, tint: "#a98cff" },
      { angle: Math.PI * 0.2, speed: 0.0018, radius: r * 0.76, tint: "#8fd8ff" },
      { angle: Math.PI * 1.1, speed: 0.0025, radius: r * 0.78, tint: "#c3b3ff" }
    ];

    butterflies.forEach((bf, i) => {
      const angle = bf.angle + Math.sin(time * 0.0007 + i) * 0.1;
      const dx = x + Math.cos(angle) * bf.radius;
      const dy = y + Math.sin(angle) * bf.radius;
      const flap = 0.55 + ((Math.sin(time * bf.speed + i * 1.9) + 1) / 2) * 0.9;
      const alpha = core.clamp(0.46 + ((Math.sin(time * 0.0016 + i * 2.3) + 1) / 2) * 0.42, 0.3, 0.9);
      const size = Math.max(4.2, r * 0.145) * (0.95 + Math.sin(time * 0.0014 + i) * 0.08);
      const rotation = Math.sin(time * 0.0008 + i * 1.2) * 0.18;

      core.drawButterfly(ctx, dx, dy, size, bf.tint, "rgba(255,255,255,0.8)", flap, alpha, rotation, 10);
    });
  }

  function drawDarkMoonSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    for (let i = 0; i < 3; i++) {
      const angle = time * (0.00018 + i * 0.00004) + i * 2.1;
      const cx = x + Math.cos(angle) * (r * 0.22);
      const cy = y + Math.sin(angle) * (r * 0.22);
      const grad = ctx.createRadialGradient(cx, cy, r * 0.08, x, y, r * (0.72 + i * 0.08));
      grad.addColorStop(0, `rgba(120,70,170,${0.18 - i * 0.03})`);
      grad.addColorStop(0.65, `rgba(55,25,85,${0.12 - i * 0.02})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.95, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    const moonAngles = [-Math.PI / 2, Math.PI * 0.72];
    moonAngles.forEach((angle, i) => {
      const dx = x + Math.cos(angle) * (r * 0.8);
      const dy = y + Math.sin(angle) * (r * 0.8);
      const alpha = core.clamp(0.46 + ((Math.sin(time * 0.0014 + i * 2.2) + 1) / 2) * 0.42, 0.28, 0.9);
      const size = Math.max(4.3, r * 0.14);

      core.drawCrescentMoon(ctx, dx, dy, size, "#dbc4ff", "rgba(183,140,255,0.72)", alpha, angle + 0.6, 10);
    });
  }

  function drawGalaxySpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const hueBase = 220 + Math.sin(time * 0.0004) * 18;
    const arms = 3;

    for (let arm = 0; arm < arms; arm++) {
      const start = time * (0.00022 + arm * 0.00003) + arm * (Math.PI * 2 / arms);
      const bandLen = 1.25;
      const outerR = r - 1.6;
      const innerR = outerR - Math.max(4.6, r * 0.16);

      const colors = [
        `hsla(${hueBase + arm * 16}, 95%, 58%, 0)`,
        `hsla(${hueBase + 24 + arm * 10}, 100%, 68%, 0.22)`,
        `hsla(${hueBase + 58 + arm * 18}, 100%, 74%, 0.52)`,
        `hsla(${hueBase + 92 + arm * 12}, 100%, 76%, 0.16)`
      ];

      drawAuroraRibbon(ctx, x, y, outerR, innerR, start - bandLen * 0.5, start + bandLen * 0.5, colors, 0.72, 12);
    }

    for (let i = 0; i < 7; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 7) + time * 0.00018;
      const dx = x + Math.cos(angle) * (r * 0.72);
      const dy = y + Math.sin(angle) * (r * 0.72);
      const pulse = (Math.sin(time * 0.002 + i * 1.7) + 1) / 2;

      core.drawTinyTwinkle(
        ctx,
        dx,
        dy,
        Math.max(1.4, r * 0.045) * (0.92 + pulse * 0.18),
        i % 2 === 0 ? "rgba(255,255,255,0.96)" : "rgba(175,210,255,0.94)",
        core.clamp(0.18 + pulse * 0.62, 0.08, 0.9),
        i * 0.2,
        8
      );
    }
  }

  function drawCrownSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r - 1.3, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,223,98,0.98)";
    ctx.lineWidth = Math.max(3, r * 0.1);
    ctx.shadowColor = "rgba(255,221,110,0.85)";
    ctx.shadowBlur = 18;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r - 4.8, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,247,205,0.42)";
    ctx.lineWidth = Math.max(1, r * 0.024);
    ctx.stroke();
    ctx.restore();

    const crownX = x;
    const crownY = y - r * 0.98;
    const crownSize = Math.max(6.8, r * 0.245);
    const sway = Math.sin(time * 0.00045) * 0.02;

    drawDetailedCrown(ctx, crownX, crownY, crownSize, 1, sway);

    const sparkleCount = 11;
    for (let i = 0; i < sparkleCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / sparkleCount) + Math.sin(time * 0.00055 + i) * 0.12;
      const radius = i % 3 === 0 ? r * 0.84 : r * (0.62 + (i % 2) * 0.12);
      const sx = x + Math.cos(angle) * radius;
      const sy = y + Math.sin(angle) * radius;
      const pulse = (Math.sin(time * (0.0018 + (i % 4) * 0.0003) + i * 1.7) + 1) / 2;

      if (i % 2 === 0) {
        core.drawSoftDiamondStar(
          ctx,
          sx,
          sy,
          Math.max(2.2, r * 0.072) * (0.94 + pulse * 0.24),
          i % 4 === 0 ? "rgba(255,255,255,0.98)" : "rgba(255,232,122,0.98)",
          core.clamp(0.22 + pulse * 0.72, 0.12, 0.98),
          Math.PI / 4 + i * 0.22,
          12
        );
      } else {
        core.drawTinyTwinkle(
          ctx,
          sx,
          sy,
          Math.max(1.6, r * 0.05) * (0.95 + pulse * 0.2),
          "rgba(255,250,215,0.96)",
          core.clamp(0.14 + pulse * 0.64, 0.08, 0.9),
          time * 0.00045 + i * 0.2,
          8
        );
      }
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.93, 0, Math.PI * 2);
    ctx.clip();
    const sweep = (time * 0.00055) % 2;
    const sweepX = x - r * 1.2 + sweep * r * 2.4;
    const grad = ctx.createLinearGradient(sweepX - r * 0.3, y - r, sweepX + r * 0.3, y + r);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.5, "rgba(255,249,210,0.26)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(5, r * 0.22);
    ctx.shadowColor = "rgba(255,236,160,0.26)";
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(sweepX - r * 0.46, y + r * 0.46);
    ctx.lineTo(sweepX + r * 0.46, y - r * 0.46);
    ctx.stroke();
    ctx.restore();
  }

  function drawDarkRoseSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    function p(ax, ay) {
      return { x: x + ax * r, y: y + ay * r };
    }

    const leftVine = [
      p(-0.92, -0.92),
      p(-1.02, -0.62),
      p(-0.98, -0.18),
      p(-0.92, 0.22),
      p(-0.74, 0.6),
      p(-0.42, 0.92),
      p(-0.06, 1.04)
    ];

    const bottomVine = [
      p(-0.28, 1.02),
      p(0.02, 1.08),
      p(0.34, 1.04),
      p(0.68, 0.94),
      p(0.92, 0.78)
    ];

    const rightTopVine = [
      p(0.26, -1.04),
      p(0.66, -0.98),
      p(0.96, -0.82),
      p(1.04, -0.44),
      p(0.92, -0.08),
      p(0.72, 0.2)
    ];

    const rightLowerVine = [
      p(0.78, 0.18),
      p(0.98, 0.44),
      p(0.94, 0.72),
      p(0.76, 0.98)
    ];

    drawTwistedVine(ctx, leftVine, Math.max(2.2, r * 0.086), "rgba(66,14,28,0.98)", "rgba(126,28,54,0.22)");
    drawTwistedVine(ctx, bottomVine, Math.max(2.0, r * 0.078), "rgba(60,12,26,0.98)", "rgba(126,28,54,0.18)");
    drawTwistedVine(ctx, rightTopVine, Math.max(2.2, r * 0.086), "rgba(66,14,28,0.98)", "rgba(126,28,54,0.22)");
    drawTwistedVine(ctx, rightLowerVine, Math.max(2.0, r * 0.078), "rgba(60,12,26,0.98)", "rgba(126,28,54,0.18)");

    drawLeaf(ctx, x - r * 0.86, y + r * 0.1, Math.max(4.2, r * 0.11), -1.88, 0.7);
    drawLeaf(ctx, x - r * 0.64, y + r * 0.66, Math.max(4.4, r * 0.12), -0.82, 0.72);
    drawLeaf(ctx, x + r * 0.88, y - r * 0.16, Math.max(4.2, r * 0.11), 2.2, 0.68);
    drawLeaf(ctx, x + r * 0.72, y + r * 0.72, Math.max(4.4, r * 0.12), 1.08, 0.74);

    const roses = [
      { x: x - r * 0.95, y: y - r * 0.56, seed: 11, rot: -0.14, size: r * 0.17 },
      { x: x - r * 0.88, y: y + r * 0.06, seed: 21, rot: 0.16, size: r * 0.165 },
      { x: x - r * 0.62, y: y + r * 0.72, seed: 31, rot: -0.22, size: r * 0.17 },
      { x: x + r * 0.8, y: y - r * 0.8, seed: 41, rot: 0.12, size: r * 0.18 },
      { x: x + r * 0.98, y: y - r * 0.22, seed: 51, rot: -0.16, size: r * 0.17 },
      { x: x + r * 0.82, y: y + r * 0.72, seed: 61, rot: 0.18, size: r * 0.17 }
    ];

    roses.forEach((rose) => {
      const cycle = (Math.sin(time * 0.00125 + rose.seed) + 1) / 2;
      const bloom = Math.pow(cycle, 1.25);
      const alpha = core.clamp(0.14 + bloom * 0.88, 0.08, 1);
      const size = Math.max(4.6, rose.size * (0.58 + bloom * 0.62));

      drawRoseBloom(ctx, rose.x, rose.y, size, bloom, alpha, rose.rot);
    });

    const petalSeed = core.seededRandom(core.hashSeed(`${Math.round(x)}-${Math.round(y)}-darkrose-petals`));
    const petalCount = 7;

    for (let i = 0; i < petalCount; i++) {
      const phase = ((time * (0.00016 + i * 0.000025)) + petalSeed() * 0.98 + i * 0.11) % 1;
      const swing = Math.sin(phase * Math.PI * 2 + i * 1.7) * (r * 0.18);
      const px = x - r * 0.5 + (petalSeed() * r) + swing;
      const py = y - r * 0.9 + phase * (r * 2.05);
      const size = Math.max(2.4, r * (0.07 + petalSeed() * 0.03));
      const alpha = core.clamp(0.08 + Math.sin(phase * Math.PI) * 0.52, 0.05, 0.56);
      const rotation = phase * 5.2 + petalSeed() * 3;

      drawRosePetalParticle(
        ctx,
        px,
        py,
        size,
        i % 2 === 0 ? "rgba(120,22,58,0.94)" : "rgba(170,64,104,0.92)",
        alpha,
        rotation,
        7,
        core
      );
    }
  }

  function drawShootingStarSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const lanes = [
      { sx: -0.72, sy: 0.18, angle: -0.92, speed: 0.00024, offset: 0.08 },
      { sx: -0.18, sy: -0.72, angle: 0.46, speed: 0.0002, offset: 0.34 },
      { sx: 0.7, sy: -0.14, angle: 2.4, speed: 0.00023, offset: 0.58 },
      { sx: 0.12, sy: 0.74, angle: -2.24, speed: 0.00019, offset: 0.82 }
    ];

    lanes.forEach((lane) => {
      const phase = ((time * lane.speed) + lane.offset) % 1;
      const nx = Math.cos(lane.angle);
      const ny = Math.sin(lane.angle);

      const startX = x + lane.sx * r;
      const startY = y + lane.sy * r;
      const travel = phase * (r * 0.88);

      const starX = startX + nx * travel;
      const starY = startY + ny * travel;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.97, 0, Math.PI * 2);
      ctx.clip();

      core.drawSoftDiamondStar(
        ctx,
        startX,
        startY,
        Math.max(1.8, r * 0.05),
        "rgba(255,250,225,0.98)",
        0.72,
        0,
        7
      );

      core.drawShootingStar(
        ctx,
        starX,
        starY,
        Math.max(4.6, r * 0.145),
        "rgba(255,236,165,0.98)",
        core.clamp(0.28 + Math.sin(phase * Math.PI) * 0.62, 0.22, 0.94),
        lane.angle,
        12
      );

      ctx.restore();
    });
  }

  function drawAngelWingSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const wingSize = Math.max(5.8, r * 0.22);
    const flap = Math.sin(time * 0.0016) * 0.08;

    core.drawWing(ctx, x - r * 0.82, y + r * 0.02, wingSize, "rgba(245,250,255,0.98)", 0.9, -0.28 + flap, 1, 14);
    core.drawWing(ctx, x + r * 0.82, y + r * 0.02, wingSize, "rgba(245,250,255,0.98)", 0.9, 0.28 - flap, -1, 14);

    const haloY = y - r * 1.06;
    ctx.save();
    ctx.globalAlpha = 0.88;
    ctx.beginPath();
    ctx.ellipse(x, haloY, r * 0.42, r * 0.14, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,236,160,0.98)";
    ctx.lineWidth = Math.max(2.4, r * 0.09);
    ctx.shadowColor = "rgba(255,236,160,0.95)";
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.restore();

    for (let i = 0; i < 7; i++) {
      const phase = ((time * (0.00015 + i * 0.00002)) + i * 0.17) % 1;
      const fx = x - r * 0.55 + ((i % 3) * r * 0.34) + Math.sin(phase * Math.PI * 2 + i) * (r * 0.08);
      const fy = y - r * 0.4 + phase * (r * 1.12);

      core.drawPetal(
        ctx,
        fx,
        fy,
        Math.max(2.3, r * 0.075),
        "rgba(255,255,255,0.94)",
        core.clamp(0.08 + Math.sin(phase * Math.PI) * 0.34, 0.06, 0.4),
        -0.3 + phase * 0.6,
        7
      );
    }
  }

  function drawSnowCrystalSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const count = 6;
    const ringRadius = r * 0.81;

    for (let i = 0; i < count; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / count);
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;
      const pulse = (Math.sin(time * 0.0021 + i * 1.9) + 1) / 2;
      const alpha = core.clamp(0.34 + pulse * 0.58, 0.22, 0.96);
      const size = Math.max(4.2, r * 0.145) * (0.92 + pulse * 0.16);

      core.drawSnowflake(ctx, dx, dy, size, "rgba(226,247,255,0.98)", alpha, time * 0.00035 + i * 0.12, 10);
    }
  }

  function drawFrameForBody(ctx, body, getFrameMeta, time, core) {
    if (!body.frameName) {
      if (previousEffects) {
        previousEffects.drawFrameForBody(ctx, body, getFrameMeta, time, core);
      }
      return;
    }

    const meta = getFrameMeta(body.frameName);
    if (!meta) {
      if (previousEffects) {
        previousEffects.drawFrameForBody(ctx, body, getFrameMeta, time, core);
      }
      return;
    }

    const handled =
      body.frameName === "スターグロウ" ||
      body.frameName === "オーロラライン" ||
      body.frameName === "ネオンパープル" ||
      body.frameName === "シャイニーゴールド" ||
      body.frameName === "クリスタルフレーム" ||
      body.frameName === "リボンレース" ||
      body.frameName === "バタフライフレーム" ||
      body.frameName === "ダークムーン" ||
      body.frameName === "ギャラクシー" ||
      body.frameName === "クラウン" ||
      body.frameName === "ダークローズ" ||
      body.frameName === "流れ星" ||
      body.frameName === "天使のはね" ||
      body.frameName === "雪結晶";

    if (!handled) {
      if (previousEffects) {
        previousEffects.drawFrameForBody(ctx, body, getFrameMeta, time, core);
      }
      return;
    }

    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    core.drawInnerGlow(ctx, x, y, r, meta);
    core.drawBaseRing(ctx, x, y, r, meta);

    if (body.frameName === "スターグロウ") {
      drawStarGlowSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "オーロラライン") {
      drawAuroraSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "ネオンパープル") {
      drawNeonPurpleSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "シャイニーゴールド") {
      drawShinyGoldSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "クリスタルフレーム") {
      drawCrystalSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "リボンレース") {
      drawRibbonLaceSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "バタフライフレーム") {
      drawButterflySpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "ダークムーン") {
      drawDarkMoonSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "ギャラクシー") {
      drawGalaxySpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "クラウン") {
      drawCrownSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "ダークローズ") {
      drawDarkRoseSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "流れ星") {
      drawShootingStarSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "天使のはね") {
      drawAngelWingSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "雪結晶") {
      drawSnowCrystalSpecial(ctx, body, meta, time, core);
    }
  }

  window.FaceGameFrameEffects = {
    drawFrameForBody
  };
})();
