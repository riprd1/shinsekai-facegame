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

    drawSoftDiamondStar(ctx, size * 0.38, 0, size * 0.42, "rgba(255,255,255,0.98)", alpha, 0.3, blur);
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

      if (pulse > 0.82) {
        drawTinyTwinkle(
          ctx,
          dx + Math.cos(angle + 0.3) * (size * 0.2),
          dy + Math.sin(angle + 0.3) * (size * 0.2),
          Math.max(1.8, r * 0.06),
          "rgba(255,255,255,0.95)",
          clamp((pulse - 0.82) / 0.18, 0, 1),
          time * 0.0012,
          9
        );
      }
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
    const crownAngles = [-Math.PI / 2, Math.PI * 0.16, Math.PI * 0.84];
    const crownRadius = r * 0.82;

    crownAngles.forEach((angle, i) => {
      const dx = x + Math.cos(angle) * crownRadius;
      const dy = y + Math.sin(angle) * crownRadius;
      const pulse = (Math.sin(time * 0.002 + i * 2.1) + 1) / 2;
      const alpha = clamp(0.45 + pulse * 0.45, 0.28, 0.9);
      const size = Math.max(4.5, r * 0.15) * (0.94 + pulse * 0.12);

      drawCrown(ctx, dx, dy, size, meta.color, alpha, Math.sin(time * 0.0007 + i) * 0.12, 10);
    });

    for (let i = 0; i < 6; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 6) + time * 0.00018;
      const sx = x + Math.cos(angle) * (r * 0.75);
      const sy = y + Math.sin(angle) * (r * 0.75);
      const alpha = clamp(0.18 + ((Math.sin(time * 0.0032 + i * 1.3) + 1) / 2) * 0.48, 0.12, 0.68);
      drawTinyTwinkle(ctx, sx, sy, Math.max(1.8, r * 0.058), "rgba(255,244,190,0.98)", alpha, time * 0.0008, 8);
    }
  }

  function drawDarkRoseSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;
    const roseRadius = r * 0.8;

    for (let i = 0; i < 4; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 4) + Math.sin(time * 0.0007 + i) * 0.05;
      const dx = x + Math.cos(angle) * roseRadius;
      const dy = y + Math.sin(angle) * roseRadius;
      const pulse = (Math.sin(time * 0.0019 + i * 1.6) + 1) / 2;
      const alpha = clamp(0.34 + pulse * 0.56, 0.24, 0.92);
      const size = Math.max(4.4, r * 0.152) * (0.94 + pulse * 0.12);

      drawRose(ctx, dx, dy, size, "rgba(92,14,42,0.96)", "rgba(185,40,90,0.9)", alpha, time * 0.0005 + i * 0.4, 12);
    }

    for (let i = 0; i < 8; i++) {
      const angle = time * 0.00014 + i * 0.78;
      const px = x + Math.cos(angle) * (r * (0.52 + (i % 3) * 0.1));
      const py = y + Math.sin(angle) * (r * (0.52 + (i % 3) * 0.1));
      const alpha = clamp(0.08 + ((Math.sin(time * 0.0018 + i * 1.9) + 1) / 2) * 0.18, 0.06, 0.28);

      drawCircleCandy(ctx, px, py, Math.max(1.6, r * 0.046), "rgba(255,145,190,0.7)", "rgba(70,0,25,0.55)", alpha, 0, 6);
    }
  }

  function drawShootingStarSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const starCount = 4;
    for (let i = 0; i < starCount; i++) {
      const phase = ((time * (0.00023 + i * 0.00004)) + i * 0.27) % 1;
      const angle = -Math.PI / 4 + i * 0.22;
      const distance = (phase * 2 - 1) * (r * 1.05);
      const sx = x + Math.cos(angle) * distance;
      const sy = y + Math.sin(angle) * distance;
      const alpha = clamp(Math.sin(phase * Math.PI) * 0.92, 0.12, 0.92);

      drawShootingStar(ctx, sx, sy, Math.max(4.2, r * 0.14), meta.color, alpha, angle, 12);
    }

    for (let i = 0; i < 7; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 7);
      const tx = x + Math.cos(angle) * (r * 0.8);
      const ty = y + Math.sin(angle) * (r * 0.8);
      const alpha = clamp(0.1 + ((Math.sin(time * 0.0038 + i * 1.8) + 1) / 2) * 0.6, 0.08, 0.78);

      drawTinyTwinkle(ctx, tx, ty, Math.max(1.8, r * 0.058), "rgba(255,255,255,0.98)", alpha, time * 0.001, 8);
    }
  }

  function drawSakuraSpecial(ctx, body, meta, time) {
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
      const alpha = clamp(0.34 + ((Math.sin(time * 0.0024 + i * 1.86) + 1) / 2) * 0.54, 0.22, 0.94);

      drawPetal(
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

      drawPetal(
        ctx,
        px,
        py,
        Math.max(2.4, r * 0.09),
        "rgba(255,205,228,0.9)",
        clamp(0.08 + Math.sin(phase * Math.PI) * 0.42, 0.06, 0.46),
        phase * 3 + i,
        6
      );
    }
  }

  function drawAngelWingSpecial(ctx, body, meta, time) {
    const x = body.position.x;
    const y = body.position.y;
    const r = body.circleRadius || 20;

    const wingSize = Math.max(5.4, r * 0.2);
    const flap = Math.sin(time * 0.0021) * 0.08;

    drawWing(ctx, x - r * 0.8, y, wingSize, "rgba(240,248,255,0.96)", 0.82, -0.2 + flap, 1, 14);
    drawWing(ctx, x + r * 0.8, y, wingSize, "rgba(240,248,255,0.96)", 0.82, 0.2 - flap, -1, 14);

    const haloY = y - r * 0.88;
    ctx.save();
    ctx.globalAlpha = 0.78;
    ctx.beginPath();
    ctx.ellipse(x, haloY, r * 0.32, r * 0.12, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,233,165,0.96)";
    ctx.lineWidth = Math.max(2, r * 0.08);
    ctx.shadowColor = "rgba(255,233,165,0.9)";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.restore();

    for (let i = 0; i < 6; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / 6) + time * 0.0002;
      const sx = x + Math.cos(angle) * (r * 0.82);
      const sy = y + Math.sin(angle) * (r * 0.82);
      const alpha = clamp(0.16 + ((Math.sin(time * 0.003 + i * 1.7) + 1) / 2) * 0.62, 0.14, 0.82);

      drawTinyTwinkle(ctx, sx, sy, Math.max(2.1, r * 0.068), "rgba(255,252,238,0.98)", alpha, time * 0.0009, 9);
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
    const pawCount = 6;
    const ringRadius = r * 0.8;

    for (let i = 0; i < pawCount; i++) {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * i / pawCount) + Math.sin(time * 0.0007 + i) * 0.04;
      const dx = x + Math.cos(angle) * ringRadius;
      const dy = y + Math.sin(angle) * ringRadius;
      const alpha = clamp(0.3 + ((Math.sin(time * 0.002 + i * 1.4) + 1) / 2) * 0.54, 0.2, 0.86);

      drawPawPrint(
        ctx,
        dx,
        dy,
        Math.max(4.0, r * 0.135),
        i % 2 === 0 ? "rgba(255,230,240,0.96)" : "rgba(255,188,214,0.94)",
        alpha,
        angle + Math.PI / 2,
        8
      );
    }

    for (let i = 0; i < 4; i++) {
      const phase = ((time * (0.00018 + i * 0.00003)) + i * 0.22) % 1;
      const px = x - r * 0.72 + phase * (r * 1.35);
      const py = y + r * 0.58 - Math.sin(phase * Math.PI) * (r * 0.18) + (i % 2) * r * 0.08;

      drawPawPrint(
        ctx,
        px,
        py,
        Math.max(2.6, r * 0.09),
        "rgba(255,210,228,0.72)",
        clamp(0.08 + Math.sin(phase * Math.PI) * 0.28, 0.06, 0.34),
        0.2,
        5
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
