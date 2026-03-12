(function () {
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

    const wineDark = "rgba(38,0,10,0.98)";
    const wineDeep = "rgba(58,4,18,0.98)";
    const wineGlow = "rgba(90,10,30,0.3)";
    const petalDark = "rgba(48,0,12,0.98)";
    const petalMid = "rgba(82,6,26,0.94)";
    const petalLight = "rgba(128,18,48,0.7)";

    function drawVine(points, width, alpha) {
      ctx.save();
      ctx.strokeStyle = alpha > 0.9 ? wineDark : wineDeep;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = wineGlow;
      ctx.shadowBlur = 6;
      ctx.globalAlpha = alpha;

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
        const tlen = width * (0.9 + (i % 2) * 0.3);

        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(
          b.x + nx * tlen * (i % 2 === 0 ? 1 : -1),
          b.y + ny * tlen * (i % 2 === 0 ? 1 : -1)
        );
        ctx.stroke();
      }

      ctx.restore();
    }

    function p(ax, ay) {
      return { x: x + ax * r, y: y + ay * r };
    }

    const sway = Math.sin(time * 0.00075) * 0.04;

    const leftArc = [
      p(-0.92, -0.9 + sway),
      p(-1.04, -0.5),
      p(-1.02, -0.08),
      p(-0.92, 0.28),
      p(-0.74, 0.62),
      p(-0.46, 0.9),
      p(-0.08, 1.04)
    ];

    const bottomArc = [
      p(-0.18, 1.02),
      p(0.14, 1.1),
      p(0.48, 1.02),
      p(0.84, 0.86)
    ];

    const rightArc = [
      p(0.38, -1.04),
      p(0.74, -0.98),
      p(1.0, -0.78),
      p(1.04, -0.44),
      p(0.92, -0.12),
      p(0.72, 0.18),
      p(0.84, 0.66)
    ];

    drawVine(leftArc, Math.max(2.3, r * 0.088), 0.98);
    drawVine(bottomArc, Math.max(2.1, r * 0.08), 0.96);
    drawVine(rightArc, Math.max(2.3, r * 0.088), 0.98);

    function drawLeaf(px, py, size, angle, alpha, flip) {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      ctx.scale(flip ? -1 : 1, 1);
      ctx.globalAlpha = alpha;
      ctx.shadowColor = wineGlow;
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size * 0.45, -size * 0.4, size * 0.95, -size * 0.12, size * 1.05, 0);
      ctx.bezierCurveTo(size * 0.95, size * 0.12, size * 0.45, size * 0.4, 0, 0);
      ctx.closePath();
      ctx.fillStyle = "rgba(32,8,14,0.96)";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size * 0.82, 0);
      ctx.strokeStyle = "rgba(92,24,40,0.28)";
      ctx.lineWidth = Math.max(0.8, size * 0.07);
      ctx.stroke();

      ctx.restore();
    }

    drawLeaf(x - r * 0.9, y - r * 0.12, Math.max(4.4, r * 0.12), -1.9, 0.72, false);
    drawLeaf(x - r * 0.72, y + r * 0.52, Math.max(4.8, r * 0.13), -0.9, 0.74, false);
    drawLeaf(x + r * 0.84, y - r * 0.28, Math.max(4.4, r * 0.12), 2.2, 0.72, true);
    drawLeaf(x + r * 0.74, y + r * 0.58, Math.max(4.8, r * 0.13), 1.02, 0.74, true);
    drawLeaf(x + r * 0.56, y - r * 0.9, Math.max(4.1, r * 0.11), 0.2, 0.68, true);

    const roses = [
      { x: x - r * 0.96, y: y - r * 0.5, seed: 11, rot: -0.22, size: 0.18 },
      { x: x - r * 0.84, y: y + r * 0.02, seed: 21, rot: 0.14, size: 0.17 },
      { x: x - r * 0.6, y: y + r * 0.72, seed: 31, rot: -0.24, size: 0.18 },
      { x: x + r * 0.82, y: y - r * 0.78, seed: 41, rot: 0.12, size: 0.17 },
      { x: x + r * 0.98, y: y - r * 0.2, seed: 51, rot: -0.16, size: 0.18 },
      { x: x + r * 0.78, y: y + r * 0.74, seed: 61, rot: 0.18, size: 0.17 },
      { x: x + r * 0.08, y: y + r * 1.03, seed: 71, rot: 0.05, size: 0.16 }
    ];

    roses.forEach((rose, idx) => {
      const bloom = (Math.sin(time * 0.0012 + rose.seed) + 1) / 2;
      const pop = bloom > 0.48 ? Math.pow((bloom - 0.48) / 0.52, 0.74) : 0;
      const alpha = core.clamp(pop, 0, 1) * 0.98;
      const size = Math.max(4.8, r * rose.size) * (0.6 + pop * 0.52);

      if (alpha > 0.02) {
        core.drawRose(
          ctx,
          rose.x,
          rose.y,
          size,
          idx % 2 === 0 ? petalDark : petalMid,
          petalLight,
          alpha,
          rose.rot,
          12
        );
      }
    });

    for (let i = 0; i < 10; i++) {
      const phase = ((time * (0.00017 + i * 0.000016)) + i * 0.11) % 1;
      const px = x - r * 0.8 + (i % 5) * r * 0.38 + Math.sin(phase * Math.PI * 2 + i) * (r * 0.06);
      const py = y - r * 1.0 + phase * (r * 2.2);

      core.drawPetal(
        ctx,
        px,
        py,
        Math.max(2.3, r * 0.078),
        i % 2 === 0 ? "rgba(72,4,20,0.92)" : "rgba(102,12,34,0.86)",
        core.clamp(0.08 + Math.sin(phase * Math.PI) * 0.36, 0.06, 0.42),
        phase * 3.1 + i,
        7
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
