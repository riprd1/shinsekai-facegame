(function () {
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function drawStarShape(ctx, radius) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 5;
      const outerX = Math.cos(angle) * radius;
      const outerY = Math.sin(angle) * radius;
      const innerAngle = angle + Math.PI / 5;
      const innerX = Math.cos(innerAngle) * radius * 0.45;
      const innerY = Math.sin(innerAngle) * radius * 0.45;

      if (i === 0) {
        ctx.moveTo(outerX, outerY);
      } else {
        ctx.lineTo(outerX, outerY);
      }

      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
  }

  function drawStar(ctx, x, y, radius, color, alpha = 1, rotation = 0, blur = 8) {
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
        return ["star","sparkle","star","sparkle","star","sparkle","star","sparkle"];
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
      drawStar(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "heart") {
      drawHeart(ctx, x, y - size * 0.45, size * 1.05, color, alpha, blur);
      return;
    }

    drawSparkle(ctx, x, y, size, color, alpha, rotation, blur);
  }

  function drawInnerGlow(ctx, x, y, r, meta) {
    const gradient = ctx.createRadialGradient(x, y, r * 0.38, x, y, r * 0.98);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.72, "rgba(255,255,255,0)");
    gradient.addColorStop(0.9, meta.glow.replace(/0?\.\d+\)/, "0.16)"));
    gradient.addColorStop(1, meta.glow.replace(/0?\.\d+\)/, "0.28)"));

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
    ctx.arc(x, y, r - 1.4, 0, Math.PI * 2);
    ctx.strokeStyle = meta.color;
    ctx.lineWidth = Math.max(2.6, r * 0.085);
    ctx.shadowColor = meta.glow;
    ctx.shadowBlur = meta.rank === "SSR" ? 16 : meta.rank === "SR" ? 13 : 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r - 3.8, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.38)";
    ctx.lineWidth = Math.max(0.9, r * 0.025);
    ctx.stroke();

    ctx.restore();
  }

  function drawNormalDecorations(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const pattern = getFrameDecorationPattern(body.frameName);
    const count = pattern.length;
    const ringRadius = r * 0.8;

    for (let i = 0; i < count; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / count);
      const wobble = Math.sin(time * 0.0008 + i * 1.7) * 0.035;
      const angle = baseAngle + wobble;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;
      const type = pattern[i];

      let decoSize = Math.max(2.8, r * 0.085);
      if (type === "heart") decoSize = Math.max(3.3, r * 0.102);
      if (type === "star") decoSize = Math.max(3.2, r * 0.096);
      if (type === "sparkle") decoSize = Math.max(2.7, r * 0.082);

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
        7
      );
    }
  }

  function drawStarGlowSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const count = 8;
    const ringRadius = r * 0.82;

    for (let i = 0; i < count; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / count);
      const angle = baseAngle + Math.sin(time * 0.00055 + i * 0.9) * 0.05;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;

      const twinkle = 0.62 + 0.38 * ((Math.sin(time * 0.0032 + i * 1.9) + 1) / 2);
      const starSize = Math.max(3.8, r * 0.108) * (0.92 + Math.sin(time * 0.002 + i * 1.2) * 0.08);
      const starRotation = time * 0.0009 + i * 0.55;

      if (i % 2 === 0) {
        drawStar(ctx, dx, dy, starSize, meta.color, twinkle, starRotation, 10);
      } else {
        drawSparkle(ctx, dx, dy, starSize * 0.9, meta.color, twinkle * 0.9, -starRotation, 9);
      }

      const subPhase = Math.sin(time * 0.0048 + i * 2.73);
      if (subPhase > 0.55) {
        const subAngle = angle + 0.22;
        const sx = x + Math.cos(subAngle) * (ringRadius - r * 0.08);
        const sy = y + Math.sin(subAngle) * (ringRadius - r * 0.08);
        const sAlpha = clamp((subPhase - 0.55) / 0.45, 0, 1) * 0.9;
        drawSparkle(
          ctx,
          sx,
          sy,
          Math.max(1.8, r * 0.05),
          "rgba(255,255,255,0.95)",
          sAlpha,
          time * 0.0013,
          8
        );
      }
    }
  }

  function drawAuroraBand(ctx, x, y, innerR, outerR, startAngle, endAngle, colorA, colorB, alpha) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, outerR, startAngle, endAngle);
    ctx.arc(x, y, innerR, endAngle, startAngle, true);
    ctx.closePath();

    const gx = x + Math.cos((startAngle + endAngle) / 2) * outerR;
    const gy = y + Math.sin((startAngle + endAngle) / 2) * outerR;
    const gradient = ctx.createLinearGradient(x, y, gx, gy);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(0.55, colorB);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.globalAlpha = alpha;
    ctx.fillStyle = gradient;
    ctx.shadowColor = colorB;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
  }

  function drawAuroraSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const hueBase = (time * 0.012) % 360;
    const bands = [
      { speed: 0.00033, width: 0.64, len: 1.05, hue: hueBase + 0 },
      { speed: -0.00027, width: 0.58, len: 0.92, hue: hueBase + 38 },
      { speed: 0.00041, width: 0.68, len: 1.18, hue: hueBase + 92 },
      { speed: -0.00022, width: 0.52, len: 0.88, hue: hueBase + 150 }
    ];

    bands.forEach((band, i) => {
      const center = time * band.speed + i * 1.4;
      const startAngle = center - band.len * 0.5;
      const endAngle = center + band.len * 0.5;
      const outerR = r - 1.8;
      const innerR = outerR - Math.max(4.5, r * (0.16 + i * 0.01));

      const hue1 = (band.hue + Math.sin(time * 0.0011 + i) * 18 + 360) % 360;
      const hue2 = (band.hue + 46 + Math.cos(time * 0.0009 + i * 1.7) * 22 + 360) % 360;

      const colorA = `hsla(${hue1}, 90%, 72%, 0.00)`;
      const colorB = `hsla(${hue2}, 95%, 70%, 0.34)`;

      drawAuroraBand(
        ctx,
        x,
        y,
        innerR,
        outerR,
        startAngle,
        endAngle,
        colorA,
        colorB,
        0.9
      );
    });

    const sparkleCount = 6;
    const sparkleRadius = r * 0.78;

    for (let i = 0; i < sparkleCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / sparkleCount) + time * 0.00022;
      const sx = x + Math.cos(angle) * sparkleRadius;
      const sy = y + Math.sin(angle) * sparkleRadius;
      const alpha = clamp(0.25 + ((Math.sin(time * 0.002 + i * 1.8) + 1) / 2) * 0.42, 0.18, 0.72);

      drawSparkle(
        ctx,
        sx,
        sy,
        Math.max(1.9, r * 0.052),
        "rgba(230,255,255,0.9)",
        alpha,
        time * 0.0008,
        7
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

    if (t > 720) return;

    const progress = t / 720;
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

    const streakLen = r * 1.8;
    const streakWidth = Math.max(5, r * 0.34);

    const x1 = cx - ny * streakWidth - nx * streakLen;
    const y1 = cy + nx * streakWidth - ny * streakLen;
    const x2 = cx + ny * streakWidth + nx * streakLen;
    const y2 = cy - nx * streakWidth + ny * streakLen;

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.42, "rgba(255,255,255,0.08)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.72)");
    gradient.addColorStop(0.58, "rgba(255,245,200,0.28)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.globalAlpha = Math.sin(progress * Math.PI);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = streakWidth;
    ctx.shadowColor = "rgba(255,255,255,0.55)";
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
