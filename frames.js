(function () {
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
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
    ctx.lineWidth = Math.max(1.2, size * 0.22);
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.moveTo(-size * 0.68, -size * 0.68);
    ctx.lineTo(size * 0.68, size * 0.68);
    ctx.moveTo(size * 0.68, -size * 0.68);
    ctx.lineTo(-size * 0.68, size * 0.68);
    ctx.stroke();
    ctx.restore();
  }

  function getFrameDecorationPattern(frameName) {
    switch (frameName) {
      case "スターグロウ":
        return ["starLarge","starSmall","starLarge","starSmall","starLarge","starSmall","starLarge","starSmall"];
      case "ゴールドフレーム":
        return ["star","star","star","star","star","star"];
      case "ネオンパープル":
        return ["star","sparkle","star","sparkle","star","sparkle","star","sparkle"];
      case "シャイニーゴールド":
        return ["star","heart","sparkle","star","heart","sparkle","star","heart"];
      case "ハートピンク":
        return ["heart","heart","heart","heart","heart","heart","heart","heart"];
      case "ピンクフレーム":
        return ["heart","sparkle","heart","sparkle","heart","sparkle"];
      case "オーロラライン":
        return ["sparkle","sparkle","sparkle","sparkle","sparkle","sparkle","sparkle","sparkle"];
      case "ミントフレーム":
        return ["heart","sparkle","heart","sparkle","heart","sparkle"];
      case "スカイブルー":
        return ["sparkle","heart","sparkle","heart","sparkle","heart"];
      case "パープルフレーム":
        return ["star","heart","star","heart","star","heart"];
      default:
        return ["sparkle","sparkle","sparkle","sparkle","sparkle","sparkle"];
    }
  }

  function drawDecorationByType(ctx, type, x, y, size, color, alpha, rotation, blur) {
    if (type === "star") {
      drawSoftDiamondStar(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "heart") {
      drawHeart(ctx, x, y - size * 0.45, size * 1.05, color, alpha, blur);
      return;
    }

    if (type === "starLarge") {
      drawSoftDiamondStar(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "starSmall") {
      drawTinyTwinkle(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    drawSparkle(ctx, x, y, size, color, alpha, rotation, blur);
  }

  function alphaColor(base, alpha) {
    if (base.startsWith("rgba(")) {
      return base.replace(/rgba\(([^)]+),\s*[\d.]+\)/, "rgba($1, " + alpha + ")");
    }

    if (base.startsWith("rgb(")) {
      return base.replace("rgb(", "rgba(").replace(")", ", " + alpha + ")");
    }

    return base;
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

  function drawNormalDecorations(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const pattern = getFrameDecorationPattern(body.frameName);
    const count = pattern.length;
    const ringRadius = r * 0.82;

    for (let i = 0; i < count; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / count);
      const wobble = Math.sin(time * 0.0008 + i * 1.7) * 0.035;
      const angle = baseAngle + wobble;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;
      const type = pattern[i];

      let decoSize = Math.max(3.2, r * 0.11);
      if (type === "heart") decoSize = Math.max(3.8, r * 0.132);
      if (type === "star") decoSize = Math.max(3.6, r * 0.126);
      if (type === "sparkle") decoSize = Math.max(3.0, r * 0.105);

      const sizePulse = 1 + Math.sin(time * 0.0012 + i * 1.33) * 0.06;
      const alpha = clamp(0.76 + Math.sin(time * 0.0011 + i * 0.95) * 0.18, 0.42, 1);
      const rotation = time * 0.00035 + i * 0.22;

      drawDecorationByType(
        ctx,
        type,
        dx,
        dy,
        decoSize * sizePulse,
        meta.color,
        alpha,
        rotation,
        8
      );
    }
  }

  function drawHeartPinkSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const count = 8;
    const ringRadius = r * 0.82;
    const palePink = "rgba(255,210,235,0.96)";

    for (let i = 0; i < count; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / count);
      const wobble = Math.sin(time * 0.0007 + i * 1.35) * 0.04;
      const angle = baseAngle + wobble;

      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;

      const pulse = (Math.sin(time * 0.0022 + i * 1.91) + 1) / 2;
      const alphaMain = clamp(0.2 + pulse * 0.95, 0.14, 1);
      const alphaSub = clamp(0.08 + ((Math.sin(time * 0.0028 + i * 2.37 + 0.7) + 1) / 2) * 0.8, 0.05, 0.88);

      const mainSize = Math.max(4.3, r * 0.145) * (0.94 + pulse * 0.14);
      const subSize = mainSize * 0.58;

      drawHeart(ctx, dx, dy - mainSize * 0.42, mainSize, meta.color, alphaMain, 10);

      const offsetAngle = angle + 0.22;
      const sx = dx + Math.cos(offsetAngle) * (mainSize * 0.22);
      const sy = dy + Math.sin(offsetAngle) * (mainSize * 0.12);

      drawHeart(ctx, sx, sy - subSize * 0.4, subSize, palePink, alphaSub, 8);
    }
  }

  function drawStarGlowSpecial(ctx, body, meta, time) {
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
      const alpha = clamp(0.48 + pulse * 0.52, 0.34, 1);
      const radius = Math.max(4.6, r * 0.16) * (0.9 + pulse * 0.14);
      const rotation = time * 0.0007 + i * 0.7;

      const color = i % 2 === 0 ? bigYellow : bigYellow2;
      drawSoftDiamondStar(ctx, dx, dy, radius, color, alpha, rotation, 12);
    }

    for (let i = 0; i < smallCount; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / smallCount) + 0.18;
      const angle = baseAngle + Math.sin(time * 0.0009 + i * 1.83) * 0.06;
      const dx = x + Math.cos(angle) * smallRingRadius;
      const dy = y + Math.sin(angle) * smallRingRadius;

      const blink = Math.sin(time * 0.0046 + i * 2.31);
      const alpha = blink > 0.15 ? clamp((blink - 0.15) / 0.85, 0, 1) * 0.95 : 0.02;
      const size = Math.max(2.2, r * 0.078) * (0.9 + Math.sin(time * 0.0028 + i) * 0.08);
      const rotation = -time * 0.001 + i * 0.36;

      drawTinyTwinkle(ctx, dx, dy, size, smallWhite, alpha, rotation, 9);

      const subBlink = Math.sin(time * 0.006 + i * 3.17 + 0.6);
      if (subBlink > 0.62) {
        const sx = dx + Math.cos(angle + 0.28) * (r * 0.08);
        const sy = dy + Math.sin(angle + 0.28) * (r * 0.08);
        const sAlpha = clamp((subBlink - 0.62) / 0.38, 0, 1) * 0.72;

        drawTinyTwinkle(
          ctx,
          sx,
          sy,
          Math.max(1.4, r * 0.05),
          "rgba(255,250,225,0.9)",
          sAlpha,
          time * 0.0012,
          7
        );
      }
    }
  }

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
    gradient.addColorStop(0.55, colors[2]);
    gradient.addColorStop(0.82, colors[3]);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.globalAlpha = alpha;
    ctx.fillStyle = gradient;
    ctx.shadowColor = colors[2];
    ctx.shadowBlur = blur;
    ctx.fill();

    ctx.restore();
  }

  function drawAuroraSpecial(ctx, body, meta, time) {
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

      drawAuroraRibbon(
        ctx,
        x,
        y,
        outerR,
        innerR,
        startAngle,
        endAngle,
        colors,
        band.alpha,
        14
      );
    });

    const neonSparkCount = 5;
    const neonRadius = r * 0.79;

    for (let i = 0; i < neonSparkCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / neonSparkCount) + time * 0.00024;
      const sx = x + Math.cos(angle) * neonRadius;
      const sy = y + Math.sin(angle) * neonRadius;
      const alpha = clamp(0.16 + ((Math.sin(time * 0.0024 + i * 1.8) + 1) / 2) * 0.46, 0.12, 0.68);

      drawTinyTwinkle(
        ctx,
        sx,
        sy,
        Math.max(1.9, r * 0.06),
        "rgba(220,255,255,0.96)",
        alpha,
        time * 0.0009,
        8
      );
    }
  }

  function drawSSRStreak(ctx, body, meta, time) {
    if (meta.rank !== "SSR") return;

    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const cycle = 3200;
    const t = time % cycle;

    if (t > 760) return;

    const progress = t / 760;
    const centerOffset = (progress * 2 - 1) * (r * 1.7);
    const angle = -Math.PI / 4;
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);

    const cx = x + nx * centerOffset;
    const cy = y + ny * centerOffset;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.96, 0, Math.PI * 2);
    ctx.clip();

    const streakLen = r * 1.9;
    const streakWidth = Math.max(5.6, r * 0.36);

    const x1 = cx - ny * streakWidth - nx * streakLen;
    const y1 = cy + nx * streakWidth - ny * streakLen;
    const x2 = cx + ny * streakWidth + nx * streakLen;
    const y2 = cy - nx * streakWidth + ny * streakLen;

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.08)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.76)");
    gradient.addColorStop(0.58, "rgba(255,245,200,0.32)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.globalAlpha = Math.sin(progress * Math.PI);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = streakWidth;
    ctx.shadowColor = "rgba(255,255,255,0.58)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.restore();
  }

  function drawFrameForBody(ctx, body, getFrameMeta, time) {
    if (!body.frameName) return;

    const meta = getFrameMeta(body.frameName);
    if (!meta) return;

    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    drawInnerGlow(ctx, x, y, r, meta);
    drawBaseRing(ctx, x, y, r, meta);

    if (body.frameName === "スターグロウ") {
      drawStarGlowSpecial(ctx, body, meta, time);
    } else if (body.frameName === "オーロラライン") {
      drawAuroraSpecial(ctx, body, meta, time);
    } else if (body.frameName === "ハートピンク" || body.frameName === "ピンクフレーム") {
      drawHeartPinkSpecial(ctx, body, meta, time);
    } else {
      drawNormalDecorations(ctx, body, meta, time);
    }

    drawSSRStreak(ctx, body, meta, time);
  }

  function attachFrameRenderer(render, world, Composite, getFrameMeta) {
    Events.on(render, "afterRender", () => {
      const ctx = render.context;
      const bodies = Composite.allBodies(world).filter(body => !body.isStatic && body.member);
      const now = performance.now();

      bodies.forEach(body => {
        drawFrameForBody(ctx, body, getFrameMeta, now);
      });
    });
  }

  window.FaceGameFrames = {
    attachFrameRenderer
  };
})();
