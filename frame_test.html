<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Frame Test</title>

<script src="https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js"></script>

<style>
:root{
  --bg:#050B4A;
  --panel:rgba(255,255,255,0.08);
  --panel-border:rgba(103,154,255,0.35);
  --text:#ffffff;
  --text-sub:#d8e3ff;
}

*{
  box-sizing:border-box;
  -webkit-tap-highlight-color:transparent;
}

body{
  margin:0;
  font-family:sans-serif;
  color:var(--text);
  background:
    linear-gradient(rgba(5,11,74,0.88), rgba(5,11,74,0.94)),
    url("https://i.imgur.com/b8qJMXj.jpeg") center/cover no-repeat fixed;
}

.page{
  max-width:1100px;
  margin:0 auto;
  padding:20px 14px 32px;
}

h1{
  margin:0 0 14px;
  font-size:28px;
  text-align:center;
}

.top-note{
  text-align:center;
  color:var(--text-sub);
  font-size:14px;
  line-height:1.7;
  margin:0 0 18px;
}

.layout{
  display:flex;
  gap:18px;
  align-items:flex-start;
  justify-content:center;
  flex-wrap:wrap;
}

.panel{
  width:320px;
  background:var(--panel);
  border:1px solid var(--panel-border);
  border-radius:18px;
  padding:16px;
  backdrop-filter:blur(10px);
  box-shadow:0 12px 28px rgba(0,0,0,0.2);
}

.panel h2{
  margin:0 0 12px;
  font-size:18px;
}

.field{
  margin-bottom:14px;
  text-align:left;
}

.field:last-child{
  margin-bottom:0;
}

.label{
  display:block;
  font-size:13px;
  color:var(--text-sub);
  margin-bottom:6px;
}

select,
input[type="range"],
input[type="text"]{
  width:100%;
}

select,
input[type="text"]{
  border:none;
  border-radius:10px;
  padding:10px 12px;
  background:rgba(255,255,255,0.1);
  color:#fff;
  outline:none;
}

select option{
  color:#000;
}

.range-row{
  display:flex;
  align-items:center;
  gap:10px;
}

.range-row input[type="range"]{
  flex:1;
}

.range-val{
  width:56px;
  text-align:right;
  font-size:13px;
  color:#fff;
}

.btns{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

button{
  padding:10px 14px;
  border:none;
  border-radius:10px;
  background:linear-gradient(180deg,#2680ff,#1356cc);
  color:#fff;
  cursor:pointer;
  box-shadow:0 8px 20px rgba(10,37,130,0.3);
}

button:hover{
  opacity:0.95;
}

.viewer-wrap{
  width:420px;
  height:620px;
  position:relative;
}

#viewer{
  width:420px;
  height:620px;
  position:relative;
  overflow:hidden;
  border-radius:20px;
  border:3px solid #3aa7ff;
  background:
    radial-gradient(circle at top, rgba(86,187,255,0.22), transparent 25%),
    linear-gradient(180deg,#09145f 0%,#071050 40%,#03083b 100%);
  box-shadow:0 18px 40px rgba(0,0,0,0.28);
}

#viewer canvas{
  display:block;
}

.preview-label{
  margin-top:10px;
  text-align:center;
  font-size:14px;
  color:var(--text-sub);
}

.preview-card{
  margin-top:14px;
  display:flex;
  justify-content:center;
  gap:12px;
  flex-wrap:wrap;
}

.preview-mini{
  width:76px;
  text-align:center;
  font-size:12px;
  color:#fff;
}

.preview-mini img{
  width:58px;
  height:58px;
  border-radius:50%;
  object-fit:cover;
  object-position:center;
  border:2px solid rgba(145,201,255,0.55);
  background:#fff;
  display:block;
  margin:0 auto 6px;
}

.notice{
  margin-top:12px;
  font-size:12px;
  color:var(--text-sub);
  line-height:1.7;
}

.status{
  margin-top:12px;
  min-height:20px;
  font-size:12px;
  color:#fff;
  line-height:1.6;
}

.bg-dark #viewer{
  background:
    radial-gradient(circle at top, rgba(144,81,255,0.15), transparent 25%),
    linear-gradient(180deg,#14081f 0%,#0c0718 40%,#04030c 100%);
  border-color:#8b63ff;
}

.bg-light #viewer{
  background:
    radial-gradient(circle at top, rgba(255,255,255,0.45), transparent 20%),
    linear-gradient(180deg,#b9d8ff 0%,#9ec5ff 42%,#7db0ff 100%);
  border-color:#6ba7ff;
}

.bg-pink #viewer{
  background:
    radial-gradient(circle at top, rgba(255,214,240,0.34), transparent 22%),
    linear-gradient(180deg,#68205f 0%,#4c1246 40%,#2a0826 100%);
  border-color:#ff95d2;
}

@media (max-width:520px){
  .viewer-wrap,
  #viewer{
    width:360px;
    height:560px;
  }

  .panel{
    width:100%;
    max-width:420px;
  }
}
</style>
</head>
<body>
<div class="page">
  <h1>フレーム確認用テストページ</h1>
  <p class="top-note">
    frames.js の見た目確認専用ページです。<br>
    フレーム、サイズ、背景、画像を切り替えてその場で動作確認できます。
  </p>

  <div class="layout">
    <div class="panel">
      <h2>テスト設定</h2>

      <div class="field">
        <label class="label" for="frameSelect">フレーム</label>
        <select id="frameSelect"></select>
      </div>

      <div class="field">
        <label class="label" for="imageSelect">画像</label>
        <select id="imageSelect"></select>
      </div>

      <div class="field">
        <label class="label" for="sizeRange">サイズ</label>
        <div class="range-row">
          <input id="sizeRange" type="range" min="20" max="88" step="1" value="58">
          <div id="sizeVal" class="range-val">58</div>
        </div>
      </div>

      <div class="field">
        <label class="label" for="bgSelect">背景</label>
        <select id="bgSelect">
          <option value="default">通常ブルー</option>
          <option value="dark">ダーク</option>
          <option value="light">ライト</option>
          <option value="pink">ピンク</option>
        </select>
      </div>

      <div class="field">
        <label class="label" for="customImage">画像URLを直接入力</label>
        <input id="customImage" type="text" placeholder="https://...">
      </div>

      <div class="field">
        <div class="btns">
          <button id="applyCustomBtn">画像URLを反映</button>
          <button id="resetBtn">初期化</button>
          <button id="toggleSpinBtn">回転ON/OFF</button>
        </div>
      </div>

      <div class="notice">
        ・frames.js の特殊演出がそのまま反映されます。<br>
        ・実ゲームに近い見え方で確認できます。<br>
        ・フレーム追加後はこのページで先に確認すると楽です。
      </div>

      <div class="status" id="status"></div>
    </div>

    <div>
      <div class="viewer-wrap" id="viewerWrap">
        <div id="viewer"></div>
      </div>
      <div class="preview-label" id="frameDesc">フレーム説明</div>

      <div class="preview-card">
        <div class="preview-mini">
          <img id="miniPreview" src="" alt="mini preview">
          <div id="miniName">preview</div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="frames.js"></script>
<script>
const { Engine, Render, Runner, World, Bodies, Body, Composite } = Matter;

const FRAME_MASTER = {
  "ピンクフレーム": {
    rank: "N",
    icons: "♡",
    color: "#ff8fc7",
    glow: "rgba(255,143,199,0.45)",
    desc: "やさしいピンクの定番フレーム"
  },
  "ゴールドフレーム": {
    rank: "R",
    icons: "★",
    color: "#ffd54f",
    glow: "rgba(255,213,79,0.48)",
    desc: "高級感のあるゴールドフレーム"
  },
  "ミントフレーム": {
    rank: "N",
    icons: "♡",
    color: "#72f2d0",
    glow: "rgba(114,242,208,0.42)",
    desc: "爽やかなミントカラーのフレーム"
  },
  "パープルフレーム": {
    rank: "R",
    icons: "★",
    color: "#b78cff",
    glow: "rgba(183,140,255,0.45)",
    desc: "クールな雰囲気のパープルフレーム"
  },
  "スターグロウ": {
    rank: "SR",
    icons: "★✨",
    color: "#ffe680",
    glow: "rgba(255,230,128,0.55)",
    desc: "星がきらめく人気フレーム"
  },
  "オーロラライン": {
    rank: "SR",
    icons: "✨",
    color: "#8fe7ff",
    glow: "rgba(143,231,255,0.55)",
    desc: "オーロラの光をまとったフレーム"
  },
  "ハートピンク": {
    rank: "R",
    icons: "♡♡",
    color: "#ff6fb0",
    glow: "rgba(255,111,176,0.48)",
    desc: "ハート感たっぷりのキュート系"
  },
  "スカイブルー": {
    rank: "N",
    icons: "♡",
    color: "#73c7ff",
    glow: "rgba(115,199,255,0.42)",
    desc: "すっきり見やすいブルーフレーム"
  },
  "ネオンパープル": {
    rank: "SR",
    icons: "★✨",
    color: "#d16dff",
    glow: "rgba(209,109,255,0.6)",
    desc: "ネオン感の強い映えるフレーム"
  },
  "シャイニーゴールド": {
    rank: "SSR",
    icons: "★✨♡",
    color: "#fff1a6",
    glow: "rgba(255,241,166,0.68)",
    desc: "特別感のある豪華フレーム"
  },
  "クリスタルフレーム": {
    rank: "SR",
    icons: "💎",
    color: "#bff3ff",
    glow: "rgba(191,243,255,0.58)",
    desc: "氷みたいに透き通るクリスタルフレーム"
  },
  "リボンレース": {
    rank: "R",
    icons: "🎀",
    color: "#ffc3df",
    glow: "rgba(255,195,223,0.52)",
    desc: "リボンとレースが上品に光るフレーム"
  },
  "バタフライフレーム": {
    rank: "SR",
    icons: "🦋",
    color: "#a9c8ff",
    glow: "rgba(169,200,255,0.54)",
    desc: "蝶がふわっと羽ばたく幻想フレーム"
  },
  "ダークムーン": {
    rank: "SR",
    icons: "🌙",
    color: "#b78cff",
    glow: "rgba(103,48,143,0.42)",
    desc: "三日月と紫黒のもやが妖しく揺れる"
  },
  "ギャラクシー": {
    rank: "SSR",
    icons: "🌌",
    color: "#8ea7ff",
    glow: "rgba(142,167,255,0.58)",
    desc: "青紫の宇宙がゆっくり回るフレーム"
  },
  "キャンディ": {
    rank: "R",
    icons: "🍬",
    color: "#ff9fd6",
    glow: "rgba(255,159,214,0.5)",
    desc: "パステルに弾けるポップなキャンディフレーム"
  }
};

const TEST_IMAGES = [
  {
    name: "テスト画像A",
    url: "https://i.imgur.com/zODWDAC.png"
  },
  {
    name: "テスト画像B",
    url: "https://i.imgur.com/x52sjzD.png"
  },
  {
    name: "テスト画像C",
    url: "https://i.imgur.com/zODWDAC.png"
  },
  {
    name: "テスト画像D",
    url: "https://i.imgur.com/x52sjzD.png"
  }
];

const viewerWrap = document.getElementById("viewerWrap");
const viewerEl = document.getElementById("viewer");
const frameSelect = document.getElementById("frameSelect");
const imageSelect = document.getElementById("imageSelect");
const sizeRange = document.getElementById("sizeRange");
const sizeVal = document.getElementById("sizeVal");
const bgSelect = document.getElementById("bgSelect");
const customImage = document.getElementById("customImage");
const applyCustomBtn = document.getElementById("applyCustomBtn");
const resetBtn = document.getElementById("resetBtn");
const toggleSpinBtn = document.getElementById("toggleSpinBtn");
const frameDesc = document.getElementById("frameDesc");
const miniPreview = document.getElementById("miniPreview");
const miniName = document.getElementById("miniName");
const statusEl = document.getElementById("status");

Object.keys(FRAME_MASTER).forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  frameSelect.appendChild(option);
});

TEST_IMAGES.forEach(item => {
  const option = document.createElement("option");
  option.value = item.url;
  option.textContent = item.name;
  imageSelect.appendChild(option);
});

const WIDTH = window.innerWidth <= 520 ? 360 : 420;
const HEIGHT = window.innerWidth <= 520 ? 560 : 620;

viewerWrap.style.width = WIDTH + "px";
viewerWrap.style.height = HEIGHT + "px";
viewerEl.style.width = WIDTH + "px";
viewerEl.style.height = HEIGHT + "px";

const engine = Engine.create();
const world = engine.world;

const render = Render.create({
  element: viewerEl,
  engine,
  options: {
    width: WIDTH,
    height: HEIGHT,
    wireframes: false,
    background: "transparent",
    pixelRatio: window.devicePixelRatio || 1
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

const wall = 60;
World.add(world, [
  Bodies.rectangle(WIDTH / 2, HEIGHT + wall / 2, WIDTH, wall, { isStatic: true, render: { visible:false } }),
  Bodies.rectangle(-wall / 2, HEIGHT / 2, wall, HEIGHT, { isStatic: true, render: { visible:false } }),
  Bodies.rectangle(WIDTH + wall / 2, HEIGHT / 2, wall, HEIGHT, { isStatic: true, render: { visible:false } })
]);

function getFrameMeta(frameName){
  return FRAME_MASTER[frameName] || null;
}

if (window.FaceGameFrames && typeof FaceGameFrames.attachFrameRenderer === "function") {
  FaceGameFrames.attachFrameRenderer(render, world, Composite, getFrameMeta);
} else {
  statusEl.textContent = "frames.js の読み込みに失敗しています。";
}

let previewBody = null;
let spinEnabled = false;
let currentImageMeta = { width: 512, height: 512 };

function setStatus(text) {
  statusEl.textContent = text || "";
}

function loadImageMeta(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      resolve({
        url,
        width: img.naturalWidth || 512,
        height: img.naturalHeight || 512
      });
    };

    img.onerror = () => {
      reject(new Error("画像の読み込みに失敗しました"));
    };

    img.src = url;
  });
}

function calcSpriteScale(radius, imageMeta) {
  const longestSide = Math.max(imageMeta.width || 512, imageMeta.height || 512);
  const scale = (radius * 2 * 0.92) / longestSide;
  return {
    xScale: scale,
    yScale: scale
  };
}

function removePreviewBody(){
  if (previewBody) {
    World.remove(world, previewBody);
    previewBody = null;
  }
}

async function createPreviewBody() {
  removePreviewBody();

  const radius = Number(sizeRange.value);
  const frameName = frameSelect.value;
  const imageUrl = imageSelect.value;

  if (!imageUrl) {
    setStatus("画像URLがありません。");
    return;
  }

  setStatus("画像を読み込み中...");

  try {
    currentImageMeta = await loadImageMeta(imageUrl);
  } catch (error) {
    setStatus("画像の読み込みに失敗しました。URLを確認してください。");
    frameDesc.textContent = "画像の読み込みに失敗しました";
    miniPreview.removeAttribute("src");
    miniName.textContent = frameName;
    return;
  }

  const scale = calcSpriteScale(radius, currentImageMeta);

  previewBody = Bodies.circle(WIDTH / 2, HEIGHT / 2, radius, {
    isStatic: true,
    restitution: 0,
    friction: 0,
    frictionAir: 0,
    render: {
      sprite: {
        texture: imageUrl,
        xScale: scale.xScale,
        yScale: scale.yScale
      }
    }
  });

  previewBody.member = { name: "preview" };
  previewBody.frameName = frameName;
  previewBody.evoIndex = 0;

  World.add(world, previewBody);

  const meta = getFrameMeta(frameName);
  frameDesc.textContent = meta
    ? `${frameName} ｜ ${meta.rank} ｜ ${meta.desc}`
    : frameName;

  miniPreview.src = imageUrl;
  miniName.textContent = frameName;
  miniPreview.style.borderColor = meta ? meta.color : "rgba(145,201,255,0.55)";
  miniPreview.style.boxShadow = meta ? `0 0 10px ${meta.glow}` : "none";

  setStatus("表示中");
}

function updateBackgroundMode() {
  document.body.classList.remove("bg-dark", "bg-light", "bg-pink");

  if (bgSelect.value === "dark") {
    document.body.classList.add("bg-dark");
  } else if (bgSelect.value === "light") {
    document.body.classList.add("bg-light");
  } else if (bgSelect.value === "pink") {
    document.body.classList.add("bg-pink");
  }
}

frameSelect.addEventListener("change", () => {
  createPreviewBody();
});

imageSelect.addEventListener("change", () => {
  createPreviewBody();
});

sizeRange.addEventListener("input", () => {
  sizeVal.textContent = sizeRange.value;
  createPreviewBody();
});

bgSelect.addEventListener("change", updateBackgroundMode);

applyCustomBtn.addEventListener("click", async () => {
  const value = customImage.value.trim();
  if (!value) {
    setStatus("画像URLを入力してください。");
    return;
  }

  setStatus("カスタム画像を確認中...");

  try {
    await loadImageMeta(value);
  } catch (error) {
    setStatus("カスタム画像の読み込みに失敗しました。");
    return;
  }

  let existing = [...imageSelect.options].find(opt => opt.value === value);

  if (!existing) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = "カスタム画像";
    imageSelect.appendChild(option);
    existing = option;
  }

  imageSelect.value = value;
  createPreviewBody();
});

resetBtn.addEventListener("click", () => {
  frameSelect.value = "スターグロウ";
  imageSelect.value = TEST_IMAGES[0].url;
  sizeRange.value = "58";
  sizeVal.textContent = "58";
  bgSelect.value = "default";
  customImage.value = "";
  updateBackgroundMode();
  createPreviewBody();
});

toggleSpinBtn.addEventListener("click", () => {
  spinEnabled = !spinEnabled;
  setStatus(spinEnabled ? "回転ON" : "回転OFF");
});

(function animate(){
  if (previewBody && spinEnabled) {
    Body.rotate(previewBody, 0.01);
  }
  requestAnimationFrame(animate);
})();

frameSelect.value = "スターグロウ";
imageSelect.value = TEST_IMAGES[0].url;
sizeRange.value = "58";
sizeVal.textContent = "58";
bgSelect.value = "default";

updateBackgroundMode();
createPreviewBody();
</script>
</body>
</html>
