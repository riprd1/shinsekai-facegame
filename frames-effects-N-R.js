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

  function drawHeartPinkSpecial(ctx, body, meta, time, core) {
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
      const alphaMain = core.clamp(0.2 + pulse * 0.95, 0.14, 1);
      const alphaSub = core.clamp(
        0.08 + ((Math.sin(time * 0.0028 + i * 2.37 + 0.7) + 1) / 2) * 0.8,
        0.05,
        0.88
      );

      const mainSize = Math.max(4.3, r * 0.145) * (0.94 + pulse * 0.14);
      const subSize = mainSize * 0.58;

      core.drawHeart(ctx, dx, dy - mainSize * 0.42, mainSize, meta.color, alphaMain, 10);

      const offsetAngle = angle + 0.22;
      const sx = dx + Math.cos(offsetAngle) * (mainSize * 0.22);
      const sy = dy + Math.sin(offsetAngle) * (mainSize * 0.12);

      core.drawHeart(ctx, sx, sy - subSize * 0.4, subSize, palePink, alphaSub, 8);
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
    ctx.shadowColor = "rgba(255,255,255,0.55)";
    ctx.shadowBlur = blur;

    const len = size * 1.45;
    const shaftH = size * 0.34;
    const endR = size * 0.28;
    const round = shaftH * 0.45;
    const offset = len * 0.42;

    ctx.fillStyle = "rgba(255,250,236,0.98)";

    ctx.beginPath();
    ctx.moveTo(-len * 0.5 + round, -shaftH * 0.5);
    ctx.lineTo(len * 0.5 - round, -shaftH * 0.5);
    ctx.quadraticCurveTo(len * 0.5, -shaftH * 0.5, len * 0.5, -shaftH * 0.5 + round);
    ctx.lineTo(len * 0.5, shaftH * 0.5 - round);
    ctx.quadraticCurveTo(len * 0.5, shaftH * 0.5, len * 0.5 - round, shaftH * 0.5);
    ctx.lineTo(-len * 0.5 + round, shaftH * 0.5);
    ctx.quadraticCurveTo(-len * 0.5, shaftH * 0.5, -len * 0.5, shaftH * 0.5 - round);
    ctx.lineTo(-len * 0.5, -shaftH * 0.5 + round);
    ctx.quadraticCurveTo(-len * 0.5, -shaftH * 0.5, -len * 0.5 + round, -shaftH * 0.5);
    ctx.closePath();
    ctx.fill();

    function drawEnd(sign) {
      const ex = sign * offset;

      ctx.beginPath();
      ctx.arc(ex - sign * endR * 0.35, -endR * 0.72, endR, 0, Math.PI * 2);
      ctx.arc(ex + sign * endR * 0.35, -endR * 0.72, endR, 0, Math.PI * 2);
      ctx.arc(ex - sign * endR * 0.35, endR * 0.72, endR, 0, Math.PI * 2);
      ctx.arc(ex + sign * endR * 0.35, endR * 0.72, endR, 0, Math.PI * 2);
      ctx.fill();
    }

    drawEnd(-1);
    drawEnd(1);

    ctx.strokeStyle = "rgba(170,150,130,0.28)";
    ctx.lineWidth = Math.max(0.8, size * 0.07);
    ctx.beginPath();
    ctx.moveTo(-len * 0.24, 0);
    ctx.lineTo(len * 0.24, 0);
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

    const walkRadius = r * 0.66;
    const centerPathRadius = r * 0.54;
    const stepCount = 8;
    const cycleMs = 2200;
    const phase = (time % cycleMs) / cycleMs;
    const stride = (Math.PI * 2) / stepCount;
    const baseAngle = -Math.PI * 0.9 + phase * Math.PI * 2;

    for (let i = 0; i < stepCount; i++) {
      const a = baseAngle + i * stride;
      const side = i % 2 === 0 ? -1 : 1;
      const inward = 1 - (i / (stepCount - 1)) * 0.22;
      const px = x + Math.cos(a) * centerPathRadius * inward + Math.cos(a + Math.PI / 2) * (r * 0.12 * side);
      const py = y + Math.sin(a) * centerPathRadius * inward + Math.sin(a + Math.PI / 2) * (r * 0.12 * side);

      const normalizedIndex = (i + phase * stepCount) % stepCount;
      const life = 1 - (normalizedIndex / stepCount);
      const alpha = core.clamp(0.16 + life * 0.8, 0.14, 0.95);
      const size = Math.max(3.4, r * 0.11) * (0.9 + life * 0.16);
      const rot = a + Math.PI / 2 + side * 0.22;

      core.drawPawPrint(
        ctx,
        px,
        py,
        size,
        i % 3 === 0 ? "rgba(70,42,30,0.95)" : "rgba(26,20,18,0.98)",
        alpha,
        rot,
        5
      );
    }

    const boneCount = 3;
    for (let i = 0; i < boneCount; i++) {
      const fallPhase = ((time * (0.00016 + i * 0.00003)) + i * 0.31) % 1;
      const bx = x - r * 0.55 + i * r * 0.52 + Math.sin(fallPhase * Math.PI * 2 + i) * (r * 0.12);
      const by = y - r * 1.05 + fallPhase * (r * 2.1);
      const alpha = core.clamp(0.08 + Math.sin(fallPhase * Math.PI) * 0.46, 0.06, 0.5);
      const boneSize = Math.max(2.8, r * 0.082);

      drawBoneIllustration(
        ctx,
        bx,
        by,
        boneSize,
        alpha,
        Math.sin(time * 0.0012 + i) * 0.24,
        6
      );
    }
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

    if (body.frameName === "ハートピンク" || body.frameName === "ピンクフレーム") {
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
