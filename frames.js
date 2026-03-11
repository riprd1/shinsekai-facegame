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

  function drawSoftDiamondStar(ctx, radius) {
    drawStarShape(ctx, radius);
  }

  function drawSoftDiamondStarAt(ctx, x, y, radius, color, alpha = 1, rotation = 0, blur = 10) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    drawSoftDiamondStar(ctx, radius);
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

    const grad = ctx.createLinearGradient(0, -size, 0, size);
    grad.addColorStop(0, "rgba(255,250,195,1)");
    grad.addColorStop(0.45, color);
    grad.addColorStop(1, "rgba(194,126,22,1)");

    ctx.fillStyle = grad;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(-size, size * 0.42);
    ctx.lineTo(-size * 0.72, -size * 0.25);
    ctx.lineTo(-size * 0.28, size * 0.02);
    ctx.lineTo(0, -size * 0.58);
    ctx.lineTo(size * 0.28, size * 0.02);
    ctx.lineTo(size * 0.72, -size * 0.25);
    ctx.lineTo(size, size * 0.42);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(-size * 1.02, size * 0.3, size * 2.04, size * 0.38, size * 0.12);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath();
    ctx.arc(0, -size * 0.58, size * 0.12, 0, Math.PI * 2);
    ctx.arc(-size * 0.72, -size * 0.25, size * 0.1, 0, Math.PI * 2);
    ctx.arc(size * 0.72, -size * 0.25, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawRose(ctx, x, y, size, petalColor, centerColor, alpha = 1, rotation = 0, blur = 10) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = petalColor;
    ctx.shadowBlur = blur;

    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / 6);
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.28, size * 0.3, size * 0.46, 0, 0, Math.PI * 2);
      ctx.fillStyle = petalColor;
      ctx.fill();
      ctx.restore();
    }

    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / 4 + 0.3);
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.14, size * 0.22, size * 0.32, 0, 0, Math.PI * 2);
      ctx.fillStyle = centerColor;
      ctx.fill();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.14, 0, Math.PI * 2);
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

    const tailGrad = ctx.createLinearGradient(-size * 1.8, 0, size * 0.4, 0);
    tailGrad.addColorStop(0, "rgba(255,255,255,0)");
    tailGrad.addColorStop(0.45, alphaColor(color, 0.18));
    tailGrad.addColorStop(0.78, alphaColor(color, 0.62));
    tailGrad.addColorStop(1, "rgba(255,255,255,0.95)");

    ctx.strokeStyle = tailGrad;
    ctx.lineWidth = Math.max(1.6, size * 0.18);
    ctx.lineCap = "round";
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.beginPath();
    ctx.moveTo(-size * 1.8, 0);
    ctx.lineTo(size * 0.28, 0);
    ctx.stroke();

    drawSoftDiamondStarAt(ctx, size * 0.38, 0, size * 0.42, "rgba(255,255,255,0.98)", alpha, 0.3, blur);
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
      case "キャンディ":
        return ["candy","heart","candy","heart","candy","heart","candy","heart"];
      case "クラウン":
        return ["crown","sparkle","starSmall","crown","sparkle","starSmall"];
      case "ダークローズ":
        return ["rose","sparkle","rose","sparkle","rose","sparkle"];
      case "流れ星":
        return ["shootingStar","starSmall","shootingStar","starSmall","shootingStar","starSmall"];
      case "桜":
        return ["petal","petal","sparkle","petal","petal","sparkle","petal","petal"];
      case "天使のはね":
        return ["wing","sparkle","wing","sparkle","wing","sparkle"];
      case "雪結晶":
        return ["snowflake","sparkle","snowflake","sparkle","snowflake","sparkle"];
      case "犬のあしあと":
        return ["paw","paw","sparkle","paw","paw","sparkle","paw","sparkle"];
      default:
        return ["sparkle","sparkle","sparkle","sparkle","sparkle","sparkle"];
    }
  }

  function drawDecorationByType(ctx, type, x, y, size, color, alpha, rotation, blur) {
    if (type === "star") {
      drawSoftDiamondStarAt(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "heart") {
      drawHeart(ctx, x, y - size * 0.45, size * 1.05, color, alpha, blur);
      return;
    }

    if (type === "starLarge") {
      drawSoftDiamondStarAt(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "starSmall") {
      drawTinyTwinkle(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "diamond") {
      drawDiamond(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "lace") {
      drawCircleCandy(ctx, x, y, size * 0.36, "rgba(255,255,255,0.95)", "rgba(255,230,244,0.9)", alpha, rotation, blur);
      return;
    }

    if (type === "ribbon") {
      drawBow(ctx, x, y, size, color, alpha, blur);
      return;
    }

    if (type === "butterfly") {
      drawButterfly(ctx, x, y, size, color, "rgba(255,255,255,0.72)", 0.9, alpha, rotation, blur);
      return;
    }

    if (type === "moon") {
      drawCrescentMoon(ctx, x, y, size * 0.72, color, color, alpha, rotation, blur);
      return;
    }

    if (type === "orbit") {
      drawCircleCandy(ctx, x, y, size * 0.42, "rgba(210,220,255,0.95)", color, alpha, rotation, blur);
      return;
    }

    if (type === "candy") {
      drawCircleCandy(ctx, x, y, size * 0.5, "rgba(255,255,255,0.96)", color, alpha, rotation, blur);
      return;
    }

    if (type === "crown") {
      drawCrown(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "rose") {
      drawRose(ctx, x, y, size, color, "rgba(255,210,225,0.95)", alpha, rotation, blur);
      return;
    }

    if (type === "petal") {
      drawPetal(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "wing") {
      drawWing(ctx, x, y, size, color, alpha, rotation, 1, blur);
      return;
    }

    if (type === "snowflake") {
      drawSnowflake(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "paw") {
      drawPawPrint(ctx, x, y, size, color, alpha, rotation, blur);
      return;
    }

    if (type === "shootingStar") {
      drawShootingStar(ctx, x, y, size, color, alpha, rotation, blur);
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

  function drawOrnateGoldRing(ctx, x, y, r) {
    ctx.save();

    const outer = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    outer.addColorStop(0, "rgba(255,248,205,0.98)");
    outer.addColorStop(0.28, "rgba(255,220,110,0.98)");
    outer.addColorStop(0.56, "rgba(196,132,30,0.98)");
    outer.addColorStop(0.78, "rgba(255,232,150,0.98)");
    outer.addColorStop(1, "rgba(255,245,205,0.98)");

    ctx.beginPath();
    ctx.arc(x, y, r - 0.8, 0, Math.PI * 2);
    ctx.strokeStyle = outer;
    ctx.lineWidth = Math.max(4, r * 0.13);
    ctx.shadowColor = "rgba(255,215,110,0.62)";
    ctx.shadowBlur = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r - 5.2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(120,72,12,0.55)";
    ctx.lineWidth = Math.max(1.2, r * 0.034);
    ctx.stroke();

    const beadCount = 18;
    const beadRadius = r * 0.88;
    for (let i = 0; i < beadCount; i++) {
      const angle = -Math.PI / 2 + (Math.PI * 2 * i / beadCount);
      const bx = x + Math.cos(angle) * beadRadius;
      const by = y + Math.sin(angle) * beadRadius;
      const bead = ctx.createRadialGradient(bx - 0.8, by - 0.8, 0.4, bx, by, Math.max(1.2, r * 0.04));
      bead.addColorStop(0, "rgba(255,255,235,0.95)");
      bead.addColorStop(0.55, "rgba(255,222,120,0.95)");
      bead.addColorStop(1, "rgba(181,118,26,0.95)");

      ctx.beginPath();
      ctx.arc(bx, by, Math.max(1.6, r * 0.036), 0, Math.PI * 2);
      ctx.fillStyle = bead;
      ctx.fill();
    }

    ctx.restore();
  }

  function drawLeafSpark(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 8) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(size * 0.72, -size * 0.28, size * 0.28, size);
    ctx.quadraticCurveTo(0, size * 0.62, -size * 0.28, size);
    ctx.quadraticCurveTo(-size * 0.72, -size * 0.28, 0, -size);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -size, 0, size);
    grad.addColorStop(0, "rgba(255,255,255,0.98)");
    grad.addColorStop(0.4, color);
    grad.addColorStop(1, alphaColor(color, 0.55));
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.restore();
  }

  function drawFeather(ctx, x, y, size, color, alpha = 1, rotation = 0, blur = 10) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.72, -size * 0.62, size * 0.65, size * 0.12, 0, size);
    ctx.bezierCurveTo(-size * 0.44, size * 0.35, -size * 0.56, -size * 0.36, 0, -size);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -size, 0, size);
    grad.addColorStop(0, "rgba(255,255,255,0.98)");
    grad.addColorStop(0.45, color);
    grad.addColorStop(1, "rgba(210,225,245,0.78)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.64)";
    ctx.lineWidth = Math.max(0.8, size * 0.08);
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.92);
    ctx.lineTo(0, size * 0.76);
    ctx.stroke();

    ctx.restore();
  }

  function drawThornVineSegment(ctx, x1, y1, x2, y2, stemColor, thornColor, alpha = 1, blur = 6) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = stemColor;
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.shadowColor = stemColor;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const mx = (x1 + x2) * 0.5;
    const my = (y1 + y2) * 0.5;
    const ang = Math.atan2(y2 - y1, x2 - x1);

    ctx.fillStyle = thornColor;

    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(ang + Math.PI * 0.35);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(6, -2.4);
    ctx.lineTo(1.2, 3.6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(mx + Math.cos(ang) * 8, my + Math.sin(ang) * 8);
    ctx.rotate(ang - Math.PI * 0.32);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5.2, -2);
    ctx.lineTo(0.8, 3.1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  function drawGem(ctx, x, y, size, fillColor, alpha = 1, rotation = 0, blur = 10) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = fillColor;
    ctx.shadowBlur = blur;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.72, -size * 0.16);
    ctx.lineTo(size * 0.38, size * 0.8);
    ctx.lineTo(-size * 0.38, size * 0.8);
    ctx.lineTo(-size * 0.72, -size * 0.16);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -size, 0, size);
    grad.addColorStop(0, "rgba(255,255,255,0.96)");
    grad.addColorStop(0.18, fillColor);
    grad.addColorStop(1, alphaColor(fillColor, 0.68));
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = Math.max(0.7, size * 0.08);
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
      drawSoftDiamondStarAt(ctx, dx, dy, radius, color, alpha, rotation, 12);
    }

    for (let i = 0; i < smallCount; i++) {
      const baseAngle = (-Math.PI / 2) + (Math.PI * 2 * i / smallCount) + 0.18;
      const angle = baseAngle + Math.sin(time * 0.0009 + i * 1.83) * 0.06;
      const dx = x + Math.cos(angle) * smallRingRadius;
      const dy = y + Math.sin(angle) * smallRingRadius;

      const alpha = clamp(0.22 + ((Math.sin(time * 0.0022 + i * 2.31) + 1) / 2) * 0.5, 0.16, 0.72);
      const size = Math.max(2.2, r * 0.078) * (0.9 + Math.sin(time * 0.0028 + i) * 0.08);
      const rotation = -time * 0.001 + i * 0.36;

      drawTinyTwinkle(ctx, dx, dy, size, smallWhite, alpha, rotation, 9);
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

  function drawCrystalSpecial(ctx, body, meta, time) {
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
      const alpha = clamp(0.38 + shine * 0.54, 0.24, 1);
      const size = Math.max(4.2, r * 0.142) * (0.92 + pulse * 0.16);
      const rotation = Math.PI / 4 + time * 0.0006 + i * 0.5;

      drawDiamond(ctx, dx, dy, size, "rgba(210,248,255,0.95)", alpha, rotation, 12);

      const twinkleAlpha = clamp(0.24 + pulse * 0.48, 0.18, 0.72);
      drawTinyTwinkle(
        ctx,
        dx + Math.cos(angle + 0.3) * (size * 0.2),
        dy + Math.sin(angle + 0.3) * (size * 0.2),
        Math.max(1.8, r * 0.06),
        "rgba(255,255,255,0.9)",
        twinkleAlpha,
        time * 0.0012,
        9
      );
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

  function drawRibbonLaceSpecial(ctx, body, meta, time) {
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
      const alpha = clamp(0.34 + ((Math.sin(time * 0.0018 + i * 0.92) + 1) / 2) * 0.44, 0.22, 0.82);

      drawCircleCandy(ctx, dx, dy, Math.max(1.7, r * 0.05), "rgba(255,255,255,0.96)", laceColor, alpha, 0, 6);
    }

    const ribbonAngles = [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6];
    ribbonAngles.forEach((angle, i) => {
      const dx = x + Math.cos(angle) * (r * 0.82);
      const dy = y + Math.sin(angle) * (r * 0.82);
      const pulse = (Math.sin(time * 0.0019 + i * 2.1) + 1) / 2;
      const alpha = clamp(0.42 + pulse * 0.48, 0.28, 0.92);
      const size = Math.max(4.4, r * 0.15) * (0.94 + pulse * 0.12);

      drawBow(ctx, dx, dy, size, ribbonColor, alpha, 10);
    });
  }

  function drawButterflySpecial(ctx, body, meta, time) {
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
      const alpha = clamp(0.46 + ((Math.sin(time * 0.0016 + i * 2.3) + 1) / 2) * 0.42, 0.3, 0.9);
      const size = Math.max(4.2, r * 0.145) * (0.95 + Math.sin(time * 0.0014 + i) * 0.08);
      const rotation = Math.sin(time * 0.0008 + i * 1.2) * 0.18;

      drawButterfly(ctx, dx, dy, size, bf.tint, "rgba(255,255,255,0.8)", flap, alpha, rotation, 10);
    });

    for (let i = 0; i < 5; i++) {
      const angle = time * 0.00025 + i * 1.26;
      const sx = x + Math.cos(angle) * (r * 0.72);
      const sy = y + Math.sin(angle) * (r * 0.72);
      const alpha = clamp(0.18 + ((Math.sin(time * 0.0022 + i * 1.4) + 1) / 2) * 0.35, 0.12, 0.52);

      drawTinyTwinkle(ctx, sx, sy, Math.max(1.6, r * 0.05), "rgba(230,245,255,0.95)", alpha, 0, 7);
    }
  }

  function drawDarkMoonSpecial(ctx, body, meta, time) {
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
      const alpha = clamp(0.46 + ((Math.sin(time * 0.0014 + i * 2.2) + 1) / 2) * 0.42, 0.28, 0.9);
      const size = Math.max(4.3, r * 0.14);

      drawCrescentMoon(ctx, dx, dy, size, "#dbc4ff", "rgba(183,140,255,0.72)", alpha, angle + 0.6, 10);
    });

    for (let i = 0; i < 6; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 6) + time * 0.00016;
      const sx = x + Math.cos(angle) * (r * 0.77);
      const sy = y + Math.sin(angle) * (r * 0.77);
      const alpha = clamp(0.16 + ((Math.sin(time * 0.0025 + i * 1.8) + 1) / 2) * 0.48, 0.08, 0.7);

      drawTinyTwinkle(ctx, sx, sy, Math.max(1.6, r * 0.052), "rgba(240,225,255,0.95)", alpha, 0, 8);
    }
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

      drawAuroraRibbon(
        ctx,
        x,
        y,
        outerR,
        innerR,
        start - bandLen * 0.5,
        start + bandLen * 0.5,
        colors,
        0.72,
        12
      );
    }

    const dustCount = 10;
    for (let i = 0; i < dustCount; i++) {
      const angle = time * 0.00028 + i * 0.63;
      const radius = r * (0.46 + (i % 4) * 0.09);
      const px = x + Math.cos(angle + i * 0.45) * radius;
      const py = y + Math.sin(angle + i * 0.45) * radius;
      const alpha = clamp(0.14 + ((Math.sin(time * 0.002 + i * 1.3) + 1) / 2) * 0.46, 0.08, 0.62);

      drawCircleCandy(
        ctx,
        px,
        py,
        Math.max(1.4, r * 0.038),
        "rgba(255,255,255,0.95)",
        "rgba(180,205,255,0.9)",
        alpha,
        0,
        6
      );
    }

    const streakCount = 3;
    for (let i = 0; i < streakCount; i++) {
      const phase = ((time * (0.0002 + i * 0.00005)) + i * 0.35) % 1;
      const angle = -Math.PI / 4 + i * 0.38;
      const dist = (phase * 2 - 1) * (r * 0.95);

      const sx = x + Math.cos(angle) * dist;
      const sy = y + Math.sin(angle) * dist;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.95, 0, Math.PI * 2);
      ctx.clip();

      const grad = ctx.createLinearGradient(
        sx - r * 0.35,
        sy - r * 0.15,
        sx + r * 0.35,
        sy + r * 0.15
      );
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.5, "rgba(235,240,255,0.7)");
      grad.addColorStop(1, "rgba(255,255,255,0)");

      ctx.globalAlpha = 0.42;
      ctx.strokeStyle = grad;
      ctx.lineWidth = Math.max(2.2, r * 0.08);
      ctx.shadowColor = "rgba(190,210,255,0.48)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(sx - r * 0.3, sy - r * 0.12);
      ctx.lineTo(sx + r * 0.3, sy + r * 0.12);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawCandySpecial(ctx, body, meta, time) {
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
      const alpha = clamp(0.38 + pulse * 0.52, 0.2, 0.9);

      if (i % 2 === 0) {
        drawCircleCandy(
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
        drawHeart(
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

  function drawCrownSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    drawOrnateGoldRing(ctx, x, y, r);

    const crownPulse = (Math.sin(time * 0.0018) + 1) / 2;
    const crownSize = Math.max(6.2, r * 0.23) * (0.96 + crownPulse * 0.08);
    const crownX = x;
    const crownY = y - r * 0.88;

    drawCrown(
      ctx,
      crownX,
      crownY,
      crownSize,
      "rgba(255,214,92,0.98)",
      0.96,
      Math.sin(time * 0.00045) * 0.05,
      14
    );

    const gems = [
      { angle: -Math.PI / 2 + 0.78, color: "rgba(226,34,76,0.98)", size: 0.11 },
      { angle: -Math.PI / 2 + 1.34, color: "rgba(35,135,255,0.98)", size: 0.105 },
      { angle: -Math.PI / 2 + 2.02, color: "rgba(35,210,125,0.98)", size: 0.108 },
      { angle: -Math.PI / 2 + 2.7, color: "rgba(240,248,255,0.98)", size: 0.102 },
      { angle: -Math.PI / 2 - 0.78, color: "rgba(226,34,76,0.98)", size: 0.11 },
      { angle: -Math.PI / 2 - 1.34, color: "rgba(35,135,255,0.98)", size: 0.105 },
      { angle: -Math.PI / 2 - 2.02, color: "rgba(35,210,125,0.98)", size: 0.108 },
      { angle: -Math.PI / 2 - 2.7, color: "rgba(240,248,255,0.98)", size: 0.102 }
    ];

    gems.forEach((gem, i) => {
      const jitter = Math.sin(time * 0.0012 + i * 1.4) * 0.045;
      const angle = gem.angle + jitter;
      const gx = x + Math.cos(angle) * (r * 0.8);
      const gy = y + Math.sin(angle) * (r * 0.8);
      const alpha = clamp(0.5 + ((Math.sin(time * 0.0021 + i * 1.7) + 1) / 2) * 0.42, 0.34, 0.92);

      drawGem(
        ctx,
        gx,
        gy,
        Math.max(3.6, r * gem.size),
        gem.color,
        alpha,
        time * 0.0006 + i * 0.28,
        10
      );

      drawTinyTwinkle(
        ctx,
        gx + Math.cos(angle) * (r * 0.035),
        gy - Math.sin(angle) * (r * 0.035),
        Math.max(1.6, r * 0.048),
        "rgba(255,255,255,0.95)",
        clamp(alpha * 0.8, 0.2, 0.8),
        time * 0.0008,
        7
      );
    });
  }

  function drawDarkRoseSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const vinePoints = [
      { x: x + r * 0.92, y: y + r * 0.58 },
      { x: x + r * 0.58, y: y + r * 0.78 },
      { x: x + r * 0.18, y: y + r * 0.88 },
      { x: x - r * 0.18, y: y + r * 0.84 },
      { x: x - r * 0.52, y: y + r * 0.38 },
      { x: x - r * 0.8, y: y - r * 0.06 },
      { x: x - r * 0.74, y: y - r * 0.48 }
    ];

    for (let i = 0; i < vinePoints.length - 1; i++) {
      drawThornVineSegment(
        ctx,
        vinePoints[i].x,
        vinePoints[i].y,
        vinePoints[i + 1].x,
        vinePoints[i + 1].y,
        "rgba(71,25,32,0.95)",
        "rgba(38,10,14,0.95)",
        0.92,
        5
      );
    }

    const roses = [
      { x: x + r * 0.84, y: y + r * 0.54, size: 0.17 },
      { x: x + r * 0.22, y: y + r * 0.9, size: 0.15 },
      { x: x - r * 0.56, y: y + r * 0.48, size: 0.16 },
      { x: x - r * 0.78, y: y - r * 0.05, size: 0.14 }
    ];

    roses.forEach((rose, i) => {
      const bloom = (Math.sin(time * 0.0015 + i * 1.3) + 1) / 2;
      drawRose(
        ctx,
        rose.x,
        rose.y,
        Math.max(4.8, r * rose.size) * (0.95 + bloom * 0.08),
        "rgba(138,20,56,0.98)",
        "rgba(232,112,150,0.88)",
        0.96,
        Math.sin(time * 0.00055 + i) * 0.14,
        12
      );
    });

    for (let i = 0; i < 5; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 5) + Math.sin(time * 0.0006 + i) * 0.07;
      const sx = x + Math.cos(angle) * (r * 0.78);
      const sy = y + Math.sin(angle) * (r * 0.78);
      const alpha = clamp(0.16 + ((Math.sin(time * 0.0019 + i * 1.7) + 1) / 2) * 0.26, 0.08, 0.42);
      drawTinyTwinkle(ctx, sx, sy, Math.max(1.3, r * 0.04), "rgba(255,210,220,0.86)", alpha, time * 0.0006, 5);
    }
  }

  function drawShootingStarSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const starCount = 5;
    const orbitR = r * 0.88;
    for (let i = 0; i < starCount; i++) {
      const phase = ((time * (0.00018 + i * 0.000025)) + i * 0.213) % 1;
      const angleBase = (i * 2.27) + Math.sin(time * 0.0004 + i) * 0.4;
      const sx = x + Math.cos(angleBase) * (orbitR * (0.45 + phase * 0.7));
      const sy = y + Math.sin(angleBase * 1.13 + phase * 5.2) * (orbitR * 0.88);

      const direction = Math.atan2(
        Math.sin(time * 0.0009 + i * 2.1),
        Math.cos(time * 0.0011 + i * 1.7)
      );

      const alpha = clamp(0.32 + Math.sin(phase * Math.PI) * 0.6, 0.2, 0.92);
      const size = Math.max(3.8, r * 0.13) * (0.92 + Math.sin(time * 0.0016 + i) * 0.12);

      drawShootingStar(ctx, sx, sy, size, meta.color, alpha, direction, 12);
    }

    for (let i = 0; i < 7; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 7) + Math.sin(time * 0.00055 + i) * 0.14;
      const tx = x + Math.cos(angle) * (r * 0.82);
      const ty = y + Math.sin(angle) * (r * 0.82);
      const alpha = clamp(0.16 + ((Math.sin(time * 0.0021 + i * 1.8) + 1) / 2) * 0.42, 0.1, 0.58);

      drawTinyTwinkle(ctx, tx, ty, Math.max(1.6, r * 0.052), "rgba(255,255,255,0.96)", alpha, time * 0.001, 8);
    }
  }

  function drawSakuraSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const fallingCount = 11;
    for (let i = 0; i < fallingCount; i++) {
      const phase = ((time * (0.00016 + i * 0.00002)) + i * 0.11) % 1;
      const drift = Math.sin(phase * Math.PI * 2 + i * 0.9) * (r * 0.42);
      const px = x + drift;
      const py = y - r * 0.95 + phase * (r * 1.95);
      const rot = phase * 4.8 + i * 0.65;
      const alpha = clamp(0.18 + Math.sin(phase * Math.PI) * 0.68, 0.1, 0.9);

      drawPetal(
        ctx,
        px,
        py,
        Math.max(2.8, r * 0.095),
        i % 2 === 0 ? "rgba(255,198,224,0.96)" : "rgba(255,226,238,0.96)",
        alpha,
        rot,
        8
      );
    }

    const ringCount = 5;
    for (let i = 0; i < ringCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / ringCount) + Math.sin(time * 0.0007 + i) * 0.08;
      const px = x + Math.cos(angle) * (r * 0.82);
      const py = y + Math.sin(angle) * (r * 0.82);
      const alpha = clamp(0.28 + ((Math.sin(time * 0.0018 + i * 1.4) + 1) / 2) * 0.42, 0.18, 0.74);

      drawPetal(
        ctx,
        px,
        py,
        Math.max(3.4, r * 0.118),
        "rgba(255,206,230,0.94)",
        alpha,
        angle + Math.sin(time * 0.0015 + i) * 0.28,
        7
      );
    }
  }

  function drawAngelWingSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const wingSize = Math.max(6.2, r * 0.23);
    const flap = Math.sin(time * 0.0021) * 0.09;

    drawWing(ctx, x - r * 0.82, y + r * 0.02, wingSize, "rgba(243,248,255,0.98)", 0.9, -0.22 + flap, 1, 15);
    drawWing(ctx, x + r * 0.82, y + r * 0.02, wingSize, "rgba(243,248,255,0.98)", 0.9, 0.22 - flap, -1, 15);

    const haloY = y - r * 1.02;
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.ellipse(x, haloY, r * 0.42, r * 0.16, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,236,160,0.98)";
    ctx.lineWidth = Math.max(2.4, r * 0.085);
    ctx.shadowColor = "rgba(255,236,160,0.95)";
    ctx.shadowBlur = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(x, haloY, r * 0.28, r * 0.095, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,250,220,0.92)";
    ctx.lineWidth = Math.max(1.1, r * 0.04);
    ctx.stroke();
    ctx.restore();

    const featherCount = 8;
    for (let i = 0; i < featherCount; i++) {
      const phase = ((time * (0.00018 + i * 0.000018)) + i * 0.13) % 1;
      const side = i % 2 === 0 ? -1 : 1;
      const px = x + side * (r * (0.45 + 0.32 * phase));
      const py = y - r * 0.72 + phase * (r * 1.5);
      const rot = side * (-0.35 + phase * 0.8) + Math.sin(time * 0.0012 + i) * 0.15;
      const alpha = clamp(0.15 + Math.sin(phase * Math.PI) * 0.58, 0.08, 0.76);

      drawFeather(ctx, px, py, Math.max(2.8, r * 0.085), "rgba(245,250,255,0.96)", alpha, rot, 10);
    }

    for (let i = 0; i < 6; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 6) + time * 0.00016;
      const sx = x + Math.cos(angle) * (r * 0.82);
      const sy = y + Math.sin(angle) * (r * 0.82);
      const alpha = clamp(0.2 + ((Math.sin(time * 0.0022 + i * 1.7) + 1) / 2) * 0.36, 0.14, 0.56);

      drawTinyTwinkle(ctx, sx, sy, Math.max(1.8, r * 0.058), "rgba(255,252,238,0.96)", alpha, time * 0.0008, 8);
    }
  }

  function drawSnowCrystalSpecial(ctx, body, meta, time) {
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
      const alpha = clamp(0.34 + pulse * 0.58, 0.22, 0.96);
      const size = Math.max(4.2, r * 0.145) * (0.92 + pulse * 0.16);

      drawSnowflake(ctx, dx, dy, size, "rgba(226,247,255,0.98)", alpha, time * 0.00035 + i * 0.12, 10);
    }

    for (let i = 0; i < 10; i++) {
      const phase = ((time * (0.00016 + i * 0.00002)) + i * 0.13) % 1;
      const sx = x - r * 0.8 + phase * (r * 1.6);
      const sy = y - r * 0.95 + ((i % 5) * r * 0.38);

      drawCircleCandy(
        ctx,
        sx,
        sy,
        Math.max(1.3, r * 0.035),
        "rgba(255,255,255,0.96)",
        "rgba(210,240,255,0.9)",
        clamp(0.06 + Math.sin(phase * Math.PI) * 0.36, 0.04, 0.42),
        0,
        5
      );
    }
  }

  function drawDogPawSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r - 0.8, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(16,16,16,0.98)";
    ctx.lineWidth = Math.max(3.8, r * 0.12);
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, r - 5.1, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = Math.max(1.1, r * 0.032);
    ctx.stroke();
    ctx.restore();

    const pawCount = 8;
    for (let i = 0; i < pawCount; i++) {
      const phase = ((time * (0.00016 + (i % 3) * 0.000025)) + i * 0.17) % 1;
      const angle = phase * Math.PI * 2 + i * 0.42;
      const walkR = r * (0.78 + Math.sin(time * 0.0007 + i) * 0.04);
      const dx = x + Math.cos(angle) * walkR;
      const dy = y + Math.sin(angle * 1.08 + i * 0.22) * (walkR * 0.96);
      const size = Math.max(3.1, r * (i % 2 === 0 ? 0.105 : 0.082));
      const color = i % 2 === 0 ? "rgba(16,16,16,0.96)" : "rgba(255,255,255,0.92)";
      const alpha = i % 2 === 0 ? 0.86 : 0.78;

      drawPawPrint(
        ctx,
        dx,
        dy,
        size,
        color,
        alpha,
        angle + Math.PI / 2,
        i % 2 === 0 ? 7 : 5
      );
    }
  }

  function drawShinyGoldSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    drawOrnateGoldRing(ctx, x, y, r);

    const sparkCount = 15;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / sparkCount) + Math.sin(time * 0.00045 + i) * 0.08;
      const radius = r * (0.72 + (i % 3) * 0.06);
      const sx = x + Math.cos(angle) * radius;
      const sy = y + Math.sin(angle) * radius;
      const alpha = clamp(0.26 + ((Math.sin(time * 0.0021 + i * 1.23) + 1) / 2) * 0.58, 0.18, 0.84);

      if (i % 3 === 0) {
        drawSparkle(ctx, sx, sy, Math.max(2.7, r * 0.082), "rgba(255,248,212,0.98)", alpha, time * 0.0006 + i, 10);
      } else if (i % 3 === 1) {
        drawTinyTwinkle(ctx, sx, sy, Math.max(1.8, r * 0.056), "rgba(255,255,255,0.98)", alpha, time * 0.0008 + i, 8);
      } else {
        drawLeafSpark(ctx, sx, sy, Math.max(1.9, r * 0.06), "rgba(255,232,150,0.95)", alpha, time * 0.0005 + i, 8);
      }
    }
  }

  function drawCrownFramePattern(ctx, x, y, r, time) {
    const beadCount = 10;
    for (let i = 0; i < beadCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / beadCount) + Math.sin(time * 0.0006 + i) * 0.03;
      const px = x + Math.cos(angle) * (r * 0.88);
      const py = y + Math.sin(angle) * (r * 0.88);
      ctx.beginPath();
      ctx.arc(px, py, Math.max(1.6, r * 0.032), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,226,120,0.92)";
      ctx.fill();
    }
  }

  function drawFrameForBody(ctx, body, getFrameMeta, time) {
    if (!body.frameName) return;

    const meta = getFrameMeta(body.frameName);
    if (!meta) return;

    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    drawInnerGlow(ctx, x, y, r, meta);

    if (body.frameName === "クラウン") {
      drawOrnateGoldRing(ctx, x, y, r);
      drawCrownFramePattern(ctx, x, y, r, time);
    } else if (body.frameName === "シャイニーゴールド") {
      drawOrnateGoldRing(ctx, x, y, r);
    } else if (body.frameName === "犬のあしあと") {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r - 1.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(18,18,18,0.98)";
      ctx.lineWidth = Math.max(3.2, r * 0.11);
      ctx.shadowColor = "rgba(0,0,0,0.42)";
      ctx.shadowBlur = 9;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r - 4.6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = Math.max(0.8, r * 0.024);
      ctx.stroke();
      ctx.restore();
    } else {
      drawBaseRing(ctx, x, y, r, meta);
    }

    if (body.frameName === "スターグロウ") {
      drawStarGlowSpecial(ctx, body, meta, time);
    } else if (body.frameName === "オーロラライン") {
      drawAuroraSpecial(ctx, body, meta, time);
    } else if (body.frameName === "ハートピンク" || body.frameName === "ピンクフレーム") {
      drawHeartPinkSpecial(ctx, body, meta, time);
    } else if (body.frameName === "クリスタルフレーム") {
      drawCrystalSpecial(ctx, body, meta, time);
    } else if (body.frameName === "リボンレース") {
      drawRibbonLaceSpecial(ctx, body, meta, time);
    } else if (body.frameName === "バタフライフレーム") {
      drawButterflySpecial(ctx, body, meta, time);
    } else if (body.frameName === "ダークムーン") {
      drawDarkMoonSpecial(ctx, body, meta, time);
    } else if (body.frameName === "ギャラクシー") {
      drawGalaxySpecial(ctx, body, meta, time);
    } else if (body.frameName === "キャンディ") {
      drawCandySpecial(ctx, body, meta, time);
    } else if (body.frameName === "クラウン") {
      drawCrownSpecial(ctx, body, meta, time);
    } else if (body.frameName === "ダークローズ") {
      drawDarkRoseSpecial(ctx, body, meta, time);
    } else if (body.frameName === "流れ星") {
      drawShootingStarSpecial(ctx, body, meta, time);
    } else if (body.frameName === "桜") {
      drawSakuraSpecial(ctx, body, meta, time);
    } else if (body.frameName === "天使のはね") {
      drawAngelWingSpecial(ctx, body, meta, time);
    } else if (body.frameName === "雪結晶") {
      drawSnowCrystalSpecial(ctx, body, meta, time);
    } else if (body.frameName === "犬のあしあと") {
      drawDogPawSpecial(ctx, body, meta, time);
    } else if (body.frameName === "シャイニーゴールド") {
      drawShinyGoldSpecial(ctx, body, meta, time);
    } else {
      drawNormalDecorations(ctx, body, meta, time);
    }
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
