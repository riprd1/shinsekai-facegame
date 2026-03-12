(function () {
  function getFrameDecorationPattern(frameName) {
    switch (frameName) {
      case "ゴールドフレーム":
        return ["star","star","star","star","star","star"];
      case "ハートピンク":
        return ["heart","heart","heart","heart","heart","heart","heart","heart"];
      case "ピンクフレーム":
        return ["heart","sparkle","heart","sparkle","heart","sparkle"];
      case "ミントフレーム":
        return ["heart","sparkle","heart","sparkle","heart","sparkle"];
      case "スカイブルー":
        return ["sparkle","heart","sparkle","heart","sparkle","heart"];
      case "パープルフレーム":
        return ["star","heart","star","heart","star","heart"];
      case "キャンディ":
        return ["candy","heart","candy","heart","candy","heart","candy","heart"];
      case "桜":
        return ["petal","petal","sparkle","petal","petal","sparkle","petal","petal"];
      case "犬のあしあと":
        return ["paw","paw","sparkle","paw","paw","sparkle","paw","sparkle"];
      default:
        return ["sparkle","sparkle","sparkle","sparkle","sparkle","sparkle"];
    }
  }

  function drawDecorationByType(ctx, type, x, y, size, color, alpha, rotation, blur, core) {
    if (type === "star" || type === "starLarge") {
      core.drawSoftDiamondStar(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "heart") {
      core.drawHeart(ctx, x, y - size * 0.45, size * 1.05, color, alpha, blur);
      return;
    }

    if (type === "starSmall") {
      core.drawTinyTwinkle(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "diamond") {
      core.drawDiamond(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "lace") {
      core.drawCircleCandy(
        ctx,
        x,
        y,
        size * 0.36,
        "rgba(255,255,255,0.95)",
        "rgba(255,230,244,0.9)",
        alpha,
        rotation,
        blur
      );
      return;
    }

    if (type === "ribbon") {
      core.drawBow(ctx, x, y, size, color, alpha, blur);
      return;
    }

    if (type === "butterfly") {
      core.drawButterfly(ctx, x, y, size, color, "rgba(255,255,255,0.72)", 0.9, alpha, rotation, blur);
      return;
    }

    if (type === "moon") {
      core.drawCrescentMoon(ctx, x, y, size * 0.72, color, color, alpha, rotation, blur);
      return;
    }

    if (type === "orbit") {
      core.drawCircleCandy(ctx, x, y, size * 0.42, "rgba(210,220,255,0.95)", color, alpha, rotation, blur);
      return;
    }

    if (type === "candy") {
      core.drawCircleCandy(ctx, x, y, size * 0.5, "rgba(255,255,255,0.96)", color, alpha, rotation, blur);
      return;
    }

    if (type === "crown") {
      core.drawCrown(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "rose") {
      core.drawRose(ctx, x, y, size, color, "rgba(255,210,225,0.95)", alpha, rotation, blur);
      return;
    }

    if (type === "petal") {
      core.drawPetal(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "wing") {
      core.drawWing(ctx, x, y, size, color, alpha, rotation, 1, blur);
      return;
    }

    if (type === "snowflake") {
      core.drawSnowflake(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "paw") {
      core.drawPawPrint(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "shootingStar") {
      core.drawShootingStar(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    core.drawSparkle(ctx, x, y, size, color, alpha, rotation, blur);
  }

  function drawNormalDecorations(ctx, body, meta, time, core) {
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
      if (type === "diamond") decoSize = Math.max(3.8, r * 0.13);
      if (type === "ribbon") decoSize = Math.max(4.2, r * 0.14);
      if (type === "lace") decoSize = Math.max(3.0, r * 0.1);
      if (type === "butterfly") decoSize = Math.max(4.2, r * 0.14);
      if (type === "moon") decoSize = Math.max(4.0, r * 0.135);
      if (type === "orbit") decoSize = Math.max(3.4, r * 0.115);
      if (type === "candy") decoSize = Math.max(3.8, r * 0.125);
      if (type === "crown") decoSize = Math.max(4.2, r * 0.15);
      if (type === "rose") decoSize = Math.max(4.0, r * 0.145);
      if (type === "petal") decoSize = Math.max(3.6, r * 0.13);
      if (type === "wing") decoSize = Math.max(4.6, r * 0.155);
      if (type === "snowflake") decoSize = Math.max(3.8, r * 0.135);
      if (type === "paw") decoSize = Math.max(3.7, r * 0.128);
      if (type === "shootingStar") decoSize = Math.max(4.0, r * 0.14);

      const sizePulse = 1 + Math.sin(time * 0.0012 + i * 1.33) * 0.06;
      const alpha = core.clamp(0.76 + Math.sin(time * 0.0011 + i * 0.95) * 0.18, 0.42, 1);
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
        8,
        core
      );
    }
  }

  function drawPinkFrameSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const count = 6;
    const ringRadius = r * 0.8;

    for (let i = 0; i < count; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / count);
      const wobble = Math.sin(time * 0.0008 + i * 1.2) * 0.03;
      const angle = baseAngle + wobble;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;

      const pulse = (Math.sin(time * 0.0019 + i * 1.5) + 1) / 2;
      const alphaHeart = core.clamp(0.22 + pulse * 0.45, 0.18, 0.7);
      const alphaSpark = core.clamp(0.28 + pulse * 0.42, 0.2, 0.72);

      if (i % 2 === 0) {
        const heartSize = Math.max(3.7, r * 0.12) * (0.94 + pulse * 0.08);
        core.drawHeart(
          ctx,
          dx,
          dy - heartSize * 0.38,
          heartSize,
          "rgba(255,182,214,0.96)",
          alphaHeart,
          8
        );
      } else {
        const sparkSize = Math.max(2.6, r * 0.09) * (0.92 + pulse * 0.12);
        core.drawTinyTwinkle(
          ctx,
          dx,
          dy,
          sparkSize,
          "rgba(255,240,248,0.95)",
          alphaSpark,
          time * 0.0005 + i * 0.3,
          7
        );
      }
    }
  }

  function drawHeartPinkSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const count = 10;
    const ringRadius = r * 0.82;

    for (let i = 0; i < count; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / count);
      const wobble = Math.sin(time * 0.001 + i * 1.4) * 0.05;
      const angle = baseAngle + wobble;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;

      const pulse = (Math.sin(time * 0.0026 + i * 1.8) + 1) / 2;
      const alphaMain = core.clamp(0.38 + pulse * 0.58, 0.26, 0.96);
      const alphaSub = core.clamp(0.18 + pulse * 0.42, 0.14, 0.7);

      const mainSize = Math.max(4.4, r * 0.15) * (0.96 + pulse * 0.14);
      const subSize = mainSize * 0.56;

      core.drawHeart(
        ctx,
        dx,
        dy - mainSize * 0.42,
        mainSize,
        "rgba(255,105,176,0.98)",
        alphaMain,
        11
      );

      const offsetAngle = angle + 0.24;
      const sx = dx + Math.cos(offsetAngle) * (mainSize * 0.18);
      const sy = dy + Math.sin(offsetAngle) * (mainSize * 0.08);

      core.drawHeart(
        ctx,
        sx,
        sy - subSize * 0.38,
        subSize,
        "rgba(255,210,232,0.95)",
        alphaSub,
        8
      );
    }

    for (let i = 0; i < 4; i++) {
      const phase = ((time * (0.00022 + i * 0.00003)) + i * 0.2) % 1;
      const px = x + Math.sin(phase * Math.PI * 2 + i) * (r * 0.42);
      const py = y - r * 0.65 + phase * (r * 1.25);

      core.drawTinyTwinkle(
        ctx,
        px,
        py,
        Math.max(2.1, r * 0.07),
        "rgba(255,245,250,0.9)",
        core.clamp(0.08 + Math.sin(phase * Math.PI) * 0.36, 0.06, 0.42),
        phase * 4 + i,
        6
      );
    }
  }

  function drawCandySpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const count = 8;
    const ringRadius = r * 0.81;
    const candyColors = [
      "rgba(255,170,215,0.95)",
      "rgba(255,205,120,0.95)",
      "rgba(180,235,255,0.95)",
      "rgba(210,190,255,0.95)"
    ];

    for (let i = 0; i < count; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / count) + Math.sin(time * 0.0008 + i) * 0.04;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;

      const pulse = (Math.sin(time * 0.0026 + i * 1.4) + 1) / 2;
      const alpha = core.clamp(0.38 + pulse * 0.52, 0.2, 0.9);

      if (i % 2 === 0) {
        core.drawCircleCandy(
          ctx,
          dx,
          dy,
          Math.max(3.2, r * 0.11),
          "rgba(255,255,255,0.96)",
          candyColors[i % candyColors.length],
          alpha,
          time * 0.0008 + i,
          8
        );
      } else {
        const heartColor = i % 3 === 0 ? "rgba(255,190,220,0.96)" : "rgba(255,140,200,0.96)";
        core.drawHeart(
          ctx,
          dx,
          dy - Math.max(3.3, r * 0.11) * 0.4,
          Math.max(4.2, r * 0.14),
          heartColor,
          alpha,
          8
        );
      }
    }
  }

  function drawSakuraSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const petalCount = 9;
    const ringRadius = r * 0.81;

    for (let i = 0; i < petalCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / petalCount) + Math.sin(time * 0.00075 + i) * 0.05;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;
      const flutter = Math.sin(time * 0.0022 + i * 1.46) * 0.22;
      const alpha = core.clamp(0.34 + ((Math.sin(time * 0.0024 + i * 1.86) + 1) / 2) * 0.54, 0.22, 0.94);

      core.drawPetal(
        ctx,
        dx,
        dy,
        Math.max(3.8, r * 0.135),
        i % 2 === 0 ? "rgba(255,188,220,0.96)" : "rgba(255,214,232,0.96)",
        alpha,
        angle + flutter,
        9
      );
    }

    for (let i = 0; i < 5; i++) {
      const phase = ((time * (0.00018 + i * 0.00003)) + i * 0.22) % 1;
      const px = x + Math.sin(phase * Math.PI * 2 + i) * (r * 0.55);
      const py = y - r * 0.8 + phase * (r * 1.6);

      core.drawPetal(
        ctx,
        px,
        py,
        Math.max(2.4, r * 0.09),
        "rgba(255,205,228,0.9)",
        core.clamp(0.08 + Math.sin(phase * Math.PI) * 0.42, 0.06, 0.46),
        phase * 3 + i,
        6
      );
    }
  }

  function drawBoneIllustration(ctx, x, y, size, alpha, rotation, blur) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    const len = size * 1.9;
    const shaftH = size * 0.55;
    const ball = size * 0.45;

    ctx.shadowColor = "rgba(255,255,255,0.9)";
    ctx.shadowBlur = blur + 4;

    const grad = ctx.createLinearGradient(0, -size, 0, size);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.5, "#f6efe2");
    grad.addColorStop(1, "#e6d7b8");

    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.roundRect(-len * 0.5, -shaftH * 0.5, len, shaftH, shaftH * 0.5);
    ctx.fill();

    function boneEnd(sign) {
      const ex = sign * len * 0.45;

      ctx.beginPath();
      ctx.arc(ex - sign * ball * 0.6, -ball * 0.6, ball, 0, Math.PI * 2);
      ctx.arc(ex + sign * ball * 0.6, -ball * 0.6, ball, 0, Math.PI * 2);
      ctx.arc(ex - sign * ball * 0.6, ball * 0.6, ball, 0, Math.PI * 2);
      ctx.arc(ex + sign * ball * 0.6, ball * 0.6, ball, 0, Math.PI * 2);
      ctx.fill();
    }

    boneEnd(-1);
    boneEnd(1);

    ctx.strokeStyle = "rgba(160,130,90,0.45)";
    ctx.lineWidth = size * 0.08;

    ctx.beginPath();
    ctx.moveTo(-len * 0.22, 0);
    ctx.lineTo(len * 0.22, 0);
    ctx.stroke();

    ctx.restore();
  }

  function drawDogPawSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r - 1.4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(60,34,26,0.95)";
    ctx.lineWidth = Math.max(2.5, r * 0.09);
    ctx.shadowColor = "rgba(50,25,15,0.28)";
    ctx.shadowBlur = 8;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r - 5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,245,235,0.2)";
    ctx.lineWidth = Math.max(0.9, r * 0.022);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.clip();

    const stepCount = 6;
    const cycleMs = 2100;
    const phase = (time % cycleMs) / cycleMs;

    const startX = x - r * 0.48;
    const startY = y + r * 0.42;
    const endX = x + r * 0.38;
    const endY = y - r * 0.38;

    for (let i = 0; i < stepCount; i++) {
      let t = phase - i * 0.16;
      while (t < 0) t += 1;

      const life = 1 - i / stepCount;
      const px = startX + (endX - startX) * t;
      const py = startY + (endY - startY) * t + (i % 2 === 0 ? -r * 0.055 : r * 0.055);

      const alpha = core.clamp((0.04 + life * 0.96) * (i === 0 ? 1 : 0.82), 0.06, 0.98);
      const size = Math.max(3.8, r * 0.12) * (i === 0 ? 1.04 : (0.9 + life * 0.08));
      const rot = i % 2 === 0 ? -0.42 : 0.28;

      core.drawPawPrint(
        ctx,
        px,
        py,
        size,
        i === 0 ? "rgba(28,20,18,0.99)" : "rgba(70,42,30,0.94)",
        alpha,
        rot,
        i === 0 ? 6 : 4
      );
    }

    const boneCount = 2;
    for (let i = 0; i < boneCount; i++) {
      const fallPhase = ((time * (0.00016 + i * 0.00003)) + i * 0.43) % 1;
      const bx = x - r * 0.28 + i * r * 0.38 + Math.sin(fallPhase * Math.PI * 2 + i) * (r * 0.08);
      const by = y - r * 1.02 + fallPhase * (r * 1.95);
      const alpha = core.clamp(0.18 + Math.sin(fallPhase * Math.PI) * 0.62, 0.16, 0.8);
      const boneSize = Math.max(3.4, r * 0.1);

      drawBoneIllustration(
        ctx,
        bx,
        by,
        boneSize,
        alpha,
        Math.sin(time * 0.0011 + i) * 0.16,
        8
      );
    }

    ctx.restore();
  }

  function drawFrameForBody(ctx, body, getFrameMeta, time, core) {
    if (!body.frameName) return;

    const meta = getFrameMeta(body.frameName);
    if (!meta) return;

    const allowedRanks = { N: true, R: true };
    if (!allowedRanks[meta.rank]) return;

    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    core.drawInnerGlow(ctx, x, y, r, meta);
    core.drawBaseRing(ctx, x, y, r, meta);

    if (body.frameName === "ピンクフレーム") {
      drawPinkFrameSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "ハートピンク") {
      drawHeartPinkSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "キャンディ") {
      drawCandySpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "桜") {
      drawSakuraSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "犬のあしあと") {
      drawDogPawSpecial(ctx, body, meta, time, core);
    } else {
      drawNormalDecorations(ctx, body, meta, time, core);
    }
  }

  window.FaceGameFrameEffects = {
    drawFrameForBody
  };
})();
