(function () {
  const EFFECT_IMAGE_URLS = {
    ribbonTop: "https://i.imgur.com/mC0rYAE.png",
    ribbonFrame: "https://i.imgur.com/9LrmdG2.png",
    ribbonDrop: "https://i.imgur.com/araNgq2.png",
    butterflyA: "https://i.imgur.com/XXc9TRN.png",
    butterflyB: "https://i.imgur.com/fzZpqV9.png",
    darkMoonFrame: "https://i.imgur.com/bk5LrCk.png",
    crystalFrame: "https://i.imgur.com/UPBZsEK.png",
    darkRoseFrame: "https://i.imgur.com/20C7gSN.png"
  };

  const effectImageCache = {};

  function getEffectImage(url) {
    if (!url) return null;
    if (effectImageCache[url]) return effectImageCache[url];

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = url;
    effectImageCache[url] = img;
    return img;
  }

  function drawEffectImage(ctx, img, x, y, width, height, alpha = 1, rotation = 0) {
    if (!img || !img.complete || !img.naturalWidth || !img.naturalHeight) return;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
  }

  function drawClippedCircleImage(ctx, img, x, y, r, alpha = 1, scale = 1.08, rotation = 0) {
    if (!img || !img.complete || !img.naturalWidth || !img.naturalHeight) return;

    const size = r * 2 * scale;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 1.02, 0, Math.PI * 2);
    ctx.clip();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function drawSoftCloud(ctx, x, y, w, h, color, alpha, blur) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.ellipse(x - w * 0.18, y, w * 0.2, h * 0.24, 0, 0, Math.PI * 2);
    ctx.ellipse(x, y - h * 0.06, w * 0.26, h * 0.3, 0, 0, Math.PI * 2);
    ctx.ellipse(x + w * 0.2, y, w * 0.22, h * 0.26, 0, 0, Math.PI * 2);
    ctx.ellipse(x, y + h * 0.12, w * 0.42, h * 0.22, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
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

  function getFrameDecorationPattern(frameName) {
    switch (frameName) {
      case "スターグロウ":
        return ["starLarge","starSmall","starLarge","starSmall","starLarge","starSmall","starLarge","starSmall"];
      case "ネオンパープル":
        return ["star","sparkle","star","sparkle","star","sparkle","star","sparkle"];
      case "シャイニーゴールド":
        return ["star","heart","sparkle","star","heart","sparkle","star","heart"];
      case "オーロラライン":
        return ["sparkle","sparkle","sparkle","sparkle","sparkle","sparkle","sparkle","sparkle"];
      case "クリスタルフレーム":
        return ["diamond","diamond","sparkle","diamond","diamond","sparkle"];
      case "リボンレース":
        return ["lace","ribbon","lace","lace","ribbon","lace","lace","ribbon"];
      case "バタフライフレーム":
        return ["sparkle","butterfly","sparkle","butterfly","sparkle","butterfly"];
      case "ダークムーン":
        return ["moon","starSmall","sparkle","starSmall","moon","sparkle"];
      case "ギャラクシー":
        return ["orbit","orbit","starSmall","orbit","starSmall","orbit","starSmall","orbit"];
      case "クラウン":
        return ["sparkle","star","sparkle","starSmall","sparkle","star","sparkle","starSmall"];
      case "ダークローズ":
        return ["rose","sparkle","rose","sparkle","rose","sparkle"];
      case "流れ星":
        return ["shootingStar","starSmall","shootingStar","starSmall","shootingStar","starSmall"];
      case "天使のはね":
        return ["wing","sparkle","wing","sparkle","wing","sparkle"];
      case "雪結晶":
        return ["snowflake","sparkle","snowflake","sparkle","snowflake","sparkle"];
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

      drawAuroraRibbon(ctx, x, y, outerR, innerR, startAngle, endAngle, colors, band.alpha, 14);
    });
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
    const sparkleCount = 12;

    for (let i = 0; i < sparkleCount; i++) {
      const angle = rand() * Math.PI * 2 + Math.sin(time * 0.00018 + i) * 0.08;
      const radius = (0.18 + rand() * 0.62) * r;
      const sx = x + Math.cos(angle) * radius;
      const sy = y + Math.sin(angle) * radius;

      const blinkSpeed = 0.0012 + rand() * 0.0022;
      const blink = (Math.sin(time * blinkSpeed + i * 2.3 + rand() * 6) + 1) / 2;
      const hueMix = (Math.sin(time * 0.0015 + i * 1.1) + 1) / 2;
      const color = hueMix > 0.5 ? "rgba(255,80,220,0.98)" : "rgba(150,70,255,0.98)";
      const alpha = core.clamp(0.06 + blink * 0.78, 0.05, 0.84);

      if (rand() > 0.45) {
        core.drawSoftDiamondStar(
          ctx,
          sx,
          sy,
          Math.max(1.8, r * (0.045 + rand() * 0.03)) * (0.9 + blink * 0.2),
          color,
          alpha,
          Math.PI / 4 + i * 0.2,
          9
        );
      } else {
        core.drawTinyTwinkle(
          ctx,
          sx,
          sy,
          Math.max(1.4, r * (0.035 + rand() * 0.022)) * (0.9 + blink * 0.15),
          "rgba(255,255,255,0.9)",
          alpha,
          time * 0.0006 + i * 0.1,
          7
        );
      }
    }
  }

  function drawCrystalSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const crystalFrameImg = getEffectImage(EFFECT_IMAGE_URLS.crystalFrame);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.clip();

    const seed = core.hashSeed(`crystal-${Math.round(x)}-${Math.round(y)}`);
    const rand = core.seededRandom(seed);
    const sparkleCount = 20;

    for (let i = 0; i < sparkleCount; i++) {
      const angle = rand() * Math.PI * 2;
      const radius = r * (0.08 + rand() * 0.72);
      const sx = x + Math.cos(angle) * radius;
      const sy = y + Math.sin(angle) * radius;

      const blink = (Math.sin(time * (0.0012 + rand() * 0.0022) + i * 2.17 + rand() * 6) + 1) / 2;
      const alpha = core.clamp(0.02 + blink * (0.28 + rand() * 0.5), 0.02, 0.94);
      const size = Math.max(1.8, r * (0.03 + rand() * 0.055)) * (0.92 + blink * 0.18);
      const colorPick = i % 3;

      let color = "rgba(255,255,255,0.98)";
      if (colorPick === 1) color = "rgba(214,247,255,0.98)";
      if (colorPick === 2) color = "rgba(196,241,255,0.96)";

      if (i % 4 === 0) {
        core.drawSoftDiamondStar(ctx, sx, sy, size, color, alpha, Math.PI / 4 + i * 0.13, 12);
      } else if (i % 3 === 0) {
        core.drawTinyTwinkle(ctx, sx, sy, size * 0.95, color, alpha, time * 0.00045 + i * 0.22, 10);
      } else {
        core.drawSparkle(ctx, sx, sy, size * 0.82, color, alpha * 0.78, i * 0.19, 8);
      }
    }

    for (let i = 0; i < 4; i++) {
      const glossPhase = ((time * (0.00016 + i * 0.00003)) + i * 0.23) % 1;
      const gx = x - r * 1.05 + glossPhase * (r * 2.1);
      const gy = y - r * 0.78 + i * r * 0.42;

      const gloss = ctx.createLinearGradient(gx - r * 0.18, gy - r * 0.18, gx + r * 0.22, gy + r * 0.22);
      gloss.addColorStop(0, "rgba(255,255,255,0)");
      gloss.addColorStop(0.45, "rgba(255,255,255,0.05)");
      gloss.addColorStop(0.55, "rgba(232,250,255,0.55)");
      gloss.addColorStop(0.7, "rgba(255,255,255,0.08)");
      gloss.addColorStop(1, "rgba(255,255,255,0)");

      ctx.save();
      ctx.globalAlpha = 0.72;
      ctx.strokeStyle = gloss;
      ctx.lineWidth = Math.max(2.4, r * 0.09);
      ctx.shadowColor = "rgba(214,247,255,0.7)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(gx - r * 0.2, gy + r * 0.16);
      ctx.lineTo(gx + r * 0.16, gy - r * 0.16);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();

    drawClippedCircleImage(ctx, crystalFrameImg, x, y, r, 0.98, 1.12, 0);
  }

  function drawRibbonLaceSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const ribbonFrameImg = getEffectImage(EFFECT_IMAGE_URLS.ribbonFrame);
    const ribbonTopImg = getEffectImage(EFFECT_IMAGE_URLS.ribbonTop);
    const ribbonDropImg = getEffectImage(EFFECT_IMAGE_URLS.ribbonDrop);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.84, 0, Math.PI * 2);
    ctx.clip();

    const dropCount = 3;
    for (let i = 0; i < dropCount; i++) {
      const phase = ((time * (0.00018 + i * 0.00002)) + i * 0.27) % 1;
      const dx = x - r * 0.44 + i * r * 0.42 + Math.sin(phase * Math.PI * 2 + i) * (r * 0.06);
      const dy = y - r * 0.9 + phase * (r * 1.9);
      const alpha = core.clamp(0.14 + Math.sin(phase * Math.PI) * 0.7, 0.08, 0.88);
      const size = Math.max(8, r * 0.34) * (0.92 + Math.sin(time * 0.0014 + i) * 0.05);

      drawEffectImage(ctx, ribbonDropImg, dx, dy, size, size, alpha, Math.sin(time * 0.001 + i) * 0.08);
    }

    for (let i = 0; i < 7; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 7) + Math.sin(time * 0.00075 + i) * 0.04;
      const hx = x + Math.cos(angle) * (r * (0.46 + (i % 2) * 0.12));
      const hy = y + Math.sin(angle) * (r * (0.42 + (i % 2) * 0.1));
      const pulse = (Math.sin(time * 0.0023 + i * 1.5) + 1) / 2;
      const alpha = core.clamp(0.02 + pulse * 0.42, 0.02, 0.44);
      const heartColor = i % 2 === 0 ? "rgba(255,196,220,0.96)" : "rgba(255,220,235,0.96)";
      const heartSize = Math.max(2.6, r * 0.085) * (0.92 + pulse * 0.16);

      core.drawHeart(ctx, hx, hy - heartSize * 0.4, heartSize, heartColor, alpha, 8);
    }

    ctx.restore();

    drawEffectImage(ctx, ribbonFrameImg, x - r * 0.10, y, r * 2.34, r * 2.34, 1, 0);

    const ribbonW = Math.max(30, r * 1.9);
    const ribbonH = ribbonW * 0.48;
    const ribbonY = y - r * 0.98 + Math.sin(time * 0.0015) * (r * 0.02);
    drawEffectImage(ctx, ribbonTopImg, x - r * 0.08, ribbonY, ribbonW, ribbonH, 1, Math.sin(time * 0.0011) * 0.02);
  }

  function drawButterflySpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const butterflyImgA = getEffectImage(EFFECT_IMAGE_URLS.butterflyA);
    const butterflyImgB = getEffectImage(EFFECT_IMAGE_URLS.butterflyB);

    const bands = [
      { speed: 0.00054, len: 1.36, alpha: 0.78, outerOffset: 0.2 },
      { speed: -0.00038, len: 1.18, alpha: 0.64, outerOffset: 0.85 },
      { speed: 0.00062, len: 0.96, alpha: 0.58, outerOffset: 1.45 }
    ];

    bands.forEach((band, i) => {
      const center = time * band.speed + i * 1.92;
      const startAngle = center - band.len * 0.5;
      const endAngle = center + band.len * 0.5;

      const outerR = r - 1.1 - band.outerOffset;
      const innerR = outerR - Math.max(4.5, r * 0.155);

      const colors = [
        "rgba(122,211,255,0)",
        "rgba(122,211,255,0.24)",
        i % 2 === 0 ? "rgba(179,140,255,0.84)" : "rgba(122,255,213,0.82)",
        "rgba(255,158,216,0.24)"
      ];

      drawAuroraRibbon(ctx, x, y, outerR, innerR, startAngle, endAngle, colors, band.alpha, 16);
    });

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.clip();

    const butterflies = [
      {
        img: butterflyImgA,
        baseAngle: -Math.PI / 2,
        orbitR: r * 0.56,
        speed: 0.00074,
        wobble: 0.12,
        flapSpeed: 0.0024,
        size: r * 0.52
      },
      {
        img: butterflyImgB,
        baseAngle: Math.PI * 0.35,
        orbitR: r * 0.5,
        speed: -0.00058,
        wobble: 0.14,
        flapSpeed: 0.0021,
        size: r * 0.48
      }
    ];

    butterflies.forEach((bf, i) => {
      const angle = bf.baseAngle + time * bf.speed + Math.sin(time * 0.001 + i * 2.1) * bf.wobble;
      const bobY = Math.sin(time * 0.0019 + i * 1.8) * (r * 0.05);
      const bx = x + Math.cos(angle) * bf.orbitR;
      const by = y + Math.sin(angle) * bf.orbitR + bobY;
      const flap = 0.94 + Math.sin(time * bf.flapSpeed + i * 1.7) * 0.08;
      const alpha = 0.96;
      const rot = angle + Math.PI / 2 + Math.sin(time * 0.0013 + i) * 0.12;

      drawEffectImage(
        ctx,
        bf.img,
        bx,
        by,
        bf.size * flap,
        bf.size * 0.88,
        alpha,
        rot
      );
    });

    for (let i = 0; i < 8; i++) {
      const phase = ((time * (0.00018 + i * 0.000015)) + i * 0.16) % 1;
      const sx = x - r * 0.62 + phase * (r * 1.24);
      const sy = y - r * 0.42 + Math.sin(phase * Math.PI * 2 + i) * (r * 0.28);
      const alpha = core.clamp(0.04 + Math.sin(phase * Math.PI) * 0.28, 0.03, 0.32);

      core.drawTinyTwinkle(
        ctx,
        sx,
        sy,
        Math.max(1.8, r * 0.05),
        i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(214,247,255,0.9)",
        alpha,
        time * 0.0005 + i * 0.15,
        7
      );
    }

    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r - 1.5, 0, Math.PI * 2);
    const borderGrad = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    borderGrad.addColorStop(0, "#7ad3ff");
    borderGrad.addColorStop(0.33, "#b38cff");
    borderGrad.addColorStop(0.66, "#7affd5");
    borderGrad.addColorStop(1, "#ff9ed8");
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = Math.max(2.6, r * 0.09);
    ctx.shadowColor = "rgba(190,160,255,0.42)";
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.restore();
  }

  function drawDarkMoonSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const darkMoonImg = getEffectImage(EFFECT_IMAGE_URLS.darkMoonFrame);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.82, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < 3; i++) {
      const angle = time * (0.00018 + i * 0.00004) + i * 2.1;
      const cx = x + Math.cos(angle) * (r * 0.22);
      const cy = y + Math.sin(angle) * (r * 0.22);
      const grad = ctx.createRadialGradient(cx, cy, r * 0.08, x, y, r * (0.72 + i * 0.08));
      grad.addColorStop(0, `rgba(120,70,170,${0.16 - i * 0.03})`);
      grad.addColorStop(0.65, `rgba(55,25,85,${0.1 - i * 0.02})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.95, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    const cloudConfigs = [
      { speed: 0.000045, offset: 0.12, yMul: -0.24, width: 0.72, alpha: 0.48 },
      { speed: 0.000038, offset: 0.48, yMul: 0.02, width: 0.62, alpha: 0.42 },
      { speed: 0.000052, offset: 0.76, yMul: 0.28, width: 0.78, alpha: 0.36 }
    ];

    cloudConfigs.forEach((cloud, i) => {
      const phase = ((time * cloud.speed) + cloud.offset) % 1;
      const cx = x - r * 1.1 + phase * (r * 2.3);
      const cy = y + r * cloud.yMul + Math.sin(time * 0.0007 + i * 1.8) * (r * 0.03);
      const fade = Math.sin(phase * Math.PI);
      const alpha = cloud.alpha * core.clamp(fade, 0.08, 1);

      drawSoftCloud(
        ctx,
        cx,
        cy,
        r * cloud.width,
        r * 0.28,
        i % 2 === 0 ? "rgba(122,120,168,0.96)" : "rgba(143,140,196,0.94)",
        alpha,
        10
      );
    });

    for (let i = 0; i < 5; i++) {
      const angle = (-Math.PI / 2) + i * 1.2 + Math.sin(time * 0.0008 + i) * 0.04;
      const sx = x + Math.cos(angle) * (r * (0.36 + (i % 2) * 0.14));
      const sy = y + Math.sin(angle) * (r * (0.34 + (i % 2) * 0.12));
      const alpha = core.clamp(0.04 + ((Math.sin(time * 0.002 + i * 2.1) + 1) / 2) * 0.22, 0.04, 0.24);

      core.drawTinyTwinkle(
        ctx,
        sx,
        sy,
        Math.max(1.5, r * 0.042),
        "rgba(235,230,255,0.9)",
        alpha,
        time * 0.00045 + i * 0.14,
        6
      );
    }

    ctx.restore();

    drawEffectImage(ctx, darkMoonImg, x - r * 0.13, y, r * 2.60, r * 2.45, 1, 0);
  }

  function drawGalaxySpecial(ctx, body, meta, time) {
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
  }

  function drawSuperSparkleCluster(ctx, x, y, r, time, core) {
    const count = 20;

    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count + Math.sin(time * 0.0005 + i) * 0.06;
      const rr = r * (0.68 + (i % 4) * 0.08);
      const sx = x + Math.cos(a) * rr;
      const sy = y + Math.sin(a) * rr;

      const blink = (Math.sin(time * 0.004 + i * 1.7) + 1) / 2;
      const alpha = core.clamp(0.18 + blink * 0.82, 0.14, 0.98);

      if (i % 3 === 0) {
        core.drawSoftDiamondStar(
          ctx,
          sx,
          sy,
          Math.max(2.2, r * 0.068) * (0.92 + blink * 0.24),
          i % 2 === 0 ? "rgba(255,221,110,0.98)" : "rgba(255,246,210,0.98)",
          alpha,
          Math.PI / 4 + i * 0.1,
          12
        );
      } else {
        core.drawTinyTwinkle(
          ctx,
          sx,
          sy,
          Math.max(1.8, r * 0.052) * (0.92 + blink * 0.18),
          i % 2 === 0 ? "rgba(255,238,180,0.98)" : "rgba(255,255,255,0.98)",
          alpha,
          time * 0.0006 + i * 0.22,
          9
        );
      }
    }

    for (let i = 0; i < 12; i++) {
      const phase = ((time * (0.00022 + i * 0.000015)) + i * 0.13) % 1;
      const a = phase * Math.PI * 2 + i * 0.38;
      const rr = r * (0.32 + (i % 5) * 0.08);
      const sx = x + Math.cos(a) * rr;
      const sy = y + Math.sin(a) * rr;

      core.drawSoftDiamondStar(
        ctx,
        sx,
        sy,
        Math.max(1.4, r * 0.038),
        "rgba(255,255,255,0.9)",
        core.clamp(0.08 + Math.sin(phase * Math.PI) * 0.42, 0.06, 0.46),
        a,
        6
      );
    }
  }

  function drawCrownSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r - 1.4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,221,92,0.98)";
    ctx.lineWidth = Math.max(2.8, r * 0.095);
    ctx.shadowColor = "rgba(255,219,110,0.8)";
    ctx.shadowBlur = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r - 5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,247,215,0.45)";
    ctx.lineWidth = Math.max(1, r * 0.024);
    ctx.stroke();
    ctx.restore();

    drawSuperSparkleCluster(ctx, x, y, r, time, core);
  }

  function drawDarkRoseSpecial(ctx, body, meta, time, core) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const darkRoseImg = getEffectImage(EFFECT_IMAGE_URLS.darkRoseFrame);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.82, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < 8; i++) {
      const phase = ((time * (0.00017 + i * 0.000014)) + i * 0.13) % 1;
      const px = x - r * 0.72 + (i % 4) * r * 0.48 + Math.sin(phase * Math.PI * 2 + i) * (r * 0.06);
      const py = y - r * 0.96 + phase * (r * 2.0);

      core.drawPetal(
        ctx,
        px,
        py,
        Math.max(2.4, r * 0.08),
        i % 2 === 0 ? "rgba(92,8,34,0.9)" : "rgba(128,18,48,0.82)",
        core.clamp(0.08 + Math.sin(phase * Math.PI) * 0.34, 0.06, 0.38),
        phase * 3 + i,
        7
      );
    }

    for (let i = 0; i < 6; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 6) + Math.sin(time * 0.0008 + i) * 0.04;
      const sx = x + Math.cos(angle) * (r * 0.52);
      const sy = y + Math.sin(angle) * (r * 0.5);
      const alpha = core.clamp(0.04 + ((Math.sin(time * 0.0017 + i * 1.9) + 1) / 2) * 0.2, 0.03, 0.22);

      core.drawTinyTwinkle(
        ctx,
        sx,
        sy,
        Math.max(1.6, r * 0.045),
        "rgba(255,228,235,0.86)",
        alpha,
        time * 0.00035 + i * 0.1,
        6
      );
    }

    ctx.restore();

    drawEffectImage(ctx, darkRoseImg, x, y, r * 2.62, r * 2.42, 1, 0);
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
    if (!body.frameName) return;

    const meta = getFrameMeta(body.frameName);
    if (!meta) return;

    const allowedRanks = { SR: true, SSR: true };
    if (!allowedRanks[meta.rank]) return;

    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    core.drawInnerGlow(ctx, x, y, r, meta);
    core.drawBaseRing(ctx, x, y, r, meta);

    if (body.frameName === "スターグロウ") {
      drawStarGlowSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "オーロラライン") {
      drawAuroraSpecial(ctx, body, meta, time);
    } else if (body.frameName === "ネオンパープル") {
      drawNeonPurpleSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "クリスタルフレーム") {
      drawCrystalSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "リボンレース") {
      drawRibbonLaceSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "バタフライフレーム") {
      drawButterflySpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "ダークムーン") {
      drawDarkMoonSpecial(ctx, body, meta, time, core);
    } else if (body.frameName === "ギャラクシー") {
      drawGalaxySpecial(ctx, body, meta, time);
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
    } else {
      drawNormalDecorations(ctx, body, meta, time, core);
    }
  }

  window.FaceGameFrameEffects = {
    drawFrameForBody
  };
})();
