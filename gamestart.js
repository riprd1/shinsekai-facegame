const members =
  JSON.parse(localStorage.getItem("selectedMembers")) ||
  JSON.parse(localStorage.getItem("members")) ||
  [];

if (!members.length) {
  location.href = "index.html";
}

const {Engine,Render,Runner,World,Bodies,Events,Composite,Body} = Matter;

const GAME_WIDTH = window.innerWidth <= 520 ? 360 : 420;
const GAME_HEIGHT = window.innerWidth <= 520 ? 560 : 620;
const wall = 60;
const DROP_Y = 60;
const GAME_OVER_LINE_Y = 110;
const GAME_OVER_HOLD_MS = 1200;
const SIZE = [20,24,28,32,37,43,50,58,67,77,88];

const SCORE_TABLE = {
  1: 2,
  2: 3,
  3: 5,
  4: 8,
  5: 12,
  6: 18,
  7: 26,
  8: 38,
  9: 55,
  10: 80,
  11: 120
};

const SPECIAL_CHARACTERS = [
  {
    key: "facegame_special_unlock_1",
    name: "仲宗根 梨乃",
    img: "https://i.imgur.com/zODWDAC.png",
    need: 1
  },
  {
    key: "facegame_special_unlock_2",
    name: "ディーンフジオカ",
    img: "https://i.imgur.com/x52sjzD.png",
    need: 2
  }
];

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
  }
};

const bgm = document.getElementById("bgm");
const gameEl = document.getElementById("game");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");
const finalMaxLevelEl = document.getElementById("finalMaxLevel");
const nextImgEl = document.getElementById("nextImg");
const nextNameEl = document.getElementById("nextName");
const selectedMembersEl = document.getElementById("selectedMembers");
const selectedMembersWrapEl = document.getElementById("selectedMembersWrap");
const levelToggleBtn = document.getElementById("levelToggle");
const dropGuideEl = document.getElementById("dropGuide");
const dropGhostEl = document.getElementById("dropGhost");
const dropGhostImgEl = document.getElementById("dropGhostImg");
const effectsEl = document.getElementById("effects");
const gameOverOverlayEl = document.getElementById("gameOverOverlay");
const gameoverCardEl = document.getElementById("gameoverCard");
const gameoverActionsEl = document.getElementById("gameoverActions");
const unlockOverlayEl = document.getElementById("unlockOverlay");
const unlockImgEl = document.getElementById("unlockImg");
const unlockNameEl = document.getElementById("unlockName");
const skinRewardOverlayEl = document.getElementById("skinRewardOverlay");
const skinRewardListEl = document.getElementById("skinRewardList");
const skinRewardResultEl = document.getElementById("skinRewardResult");
const skinRewardCloseBtn = document.getElementById("skinRewardCloseBtn");
const settingsBtn = document.getElementById("settings");
const panelEl = document.getElementById("panel");
const bgmVolEl = document.getElementById("bgmVol");
const seVolEl = document.getElementById("seVol");
const bgmValEl = document.getElementById("bgmVal");
const seValEl = document.getElementById("seVal");
const lineEl = document.getElementById("line");

document.querySelector(".game-wrap").style.width = `${GAME_WIDTH}px`;
document.querySelector(".game-wrap").style.height = `${GAME_HEIGHT}px`;
gameEl.style.width = `${GAME_WIDTH}px`;
gameEl.style.height = `${GAME_HEIGHT}px`;
lineEl.style.top = `${GAME_OVER_LINE_Y}px`;

function displayName(name){
  return name.split("(")[0].trim();
}

function getSelectImg(member){
  return member.selectImg || member.img;
}

function getGameImg(member){
  return member.gameImg || member.img;
}

function getEquippedFrames(){
  return JSON.parse(localStorage.getItem("facegame_equipped_frames") || "{}");
}

function getFrameMeta(frameName){
  return FRAME_MASTER[frameName] || null;
}

function getEquippedFrameName(memberName){
  const equipped = getEquippedFrames();
  return equipped[memberName] || "";
}

function applyFrameToImgElement(imgEl, frameName){
  if (!imgEl) return;

  imgEl.style.borderWidth = "2px";
  imgEl.style.borderStyle = "solid";
  imgEl.style.borderColor = "rgba(145,201,255,0.35)";
  imgEl.style.boxShadow = "none";
  imgEl.style.filter = "none";

  const meta = getFrameMeta(frameName);
  if (!meta) return;

  imgEl.style.borderColor = meta.color;
  imgEl.style.boxShadow = `0 0 8px ${meta.glow}`;
  imgEl.style.filter = "none";

  if (meta.rank === "SR") {
    imgEl.style.boxShadow = `0 0 10px ${meta.glow}`;
  }

  if (meta.rank === "SSR") {
    imgEl.style.boxShadow = `0 0 12px ${meta.glow}`;
  }
}

function applyFrameToGhost(frameName){
  const meta = getFrameMeta(frameName);

  dropGhostEl.style.border = "2px solid rgba(143,211,255,0.45)";
  dropGhostEl.style.boxShadow = "0 8px 20px rgba(25,45,120,0.18)";
  dropGhostEl.style.background = "rgba(255,255,255,0.04)";
  dropGhostEl.style.filter = "none";

  if (!meta) return;

  dropGhostEl.style.border = `2px solid ${meta.color}`;
  dropGhostEl.style.boxShadow = `0 8px 20px rgba(25,45,120,0.16), 0 0 10px ${meta.glow}`;

  if (meta.rank === "SR") {
    dropGhostEl.style.boxShadow = `0 8px 20px rgba(25,45,120,0.16), 0 0 12px ${meta.glow}`;
  }

  if (meta.rank === "SSR") {
    dropGhostEl.style.boxShadow = `0 8px 20px rgba(25,45,120,0.16), 0 0 14px ${meta.glow}`;
  }
}

function renderSelectedMembers() {
  selectedMembersEl.innerHTML = members.map((m, index) => `
    <div class="selected-mini">
      <img id="selectedMemberImg_${index}" src="${getSelectImg(m)}" alt="${displayName(m.name)}">
      <div>Lv${index + 1}</div>
      <div>${displayName(m.name)}</div>
    </div>
  `).join("");

  members.forEach((m, index) => {
    const imgEl = document.getElementById(`selectedMemberImg_${index}`);
    const frameName = getEquippedFrameName(m.name);
    applyFrameToImgElement(imgEl, frameName);
  });
}

renderSelectedMembers();

levelToggleBtn.addEventListener("click", () => {
  selectedMembersWrapEl.classList.toggle("hidden");

  if (selectedMembersWrapEl.classList.contains("hidden")) {
    levelToggleBtn.textContent = "▶ レベル表";
  } else {
    levelToggleBtn.textContent = "▼ レベル表";
  }
});

const engine = Engine.create();
const world = engine.world;

const render = Render.create({
  element: gameEl,
  engine: engine,
  options: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    wireframes: false,
    background: "transparent",
    pixelRatio: window.devicePixelRatio || 1
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

const ground = Bodies.rectangle(GAME_WIDTH / 2, GAME_HEIGHT + wall / 2, GAME_WIDTH, wall, { isStatic: true });
const left = Bodies.rectangle(-wall / 2, GAME_HEIGHT / 2, wall, GAME_HEIGHT, { isStatic: true });
const right = Bodies.rectangle(GAME_WIDTH + wall / 2, GAME_HEIGHT / 2, wall, GAME_HEIGHT, { isStatic: true });

World.add(world, [ground, left, right]);

let score = 0;
let next = createNext();
let canDrop = true;
let aimX = GAME_WIDTH / 2;
let overLineStart = null;
let isGameOver = false;
let isTouchDragging = false;
let lv11CreatedThisRun = 0;
let maxLevelReachedThisRun = 0;
let validPlayCountedThisRun = false;
let rewardAnimating = false;

const imageSizeMap = new Map();

function getTodayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function hashString(str){
  let h = 0;
  for(let i = 0; i < str.length; i++){
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function seededShuffle(array, seed){
  const arr = [...array];
  let s = seed || 1;
  function rand(){
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  }
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const MISSION_POOL = [
  { id:"score120", text:"Score 120達成", type:"score", target:120 },
  { id:"score200", text:"Score 200達成", type:"score", target:200 },
  { id:"score320", text:"Score 320達成", type:"score", target:320 },
  { id:"lv6", text:"Lv.6を作成", type:"level", target:6 },
  { id:"lv7", text:"Lv.7を作成", type:"level", target:7 },
  { id:"lv8", text:"Lv.8を作成", type:"level", target:8 },
  { id:"play3", text:"Lv.5到達を3回達成", type:"validPlay", target:3 },
  { id:"play5", text:"Lv.5到達を5回達成", type:"validPlay", target:5 }
];

function buildDailyMissionState() {
  const today = getTodayKey();
  const saved = JSON.parse(localStorage.getItem("facegame_daily_mission_state") || "null");

  if (saved && saved.date === today) {
    return saved;
  }

  const shuffled = seededShuffle(MISSION_POOL, hashString(today));
  const selected = shuffled.slice(0, 3).map(m => ({
    id: m.id,
    text: m.text,
    type: m.type,
    target: m.target,
    done: false
  }));

  const state = {
    date: today,
    missions: selected,
    rewardClaimed: false,
    dailyValidPlayCount: 0
  };

  localStorage.setItem("facegame_daily_mission_state", JSON.stringify(state));
  return state;
}

let dailyMissionState = buildDailyMissionState();

function saveDailyMissionState() {
  localStorage.setItem("facegame_daily_mission_state", JSON.stringify(dailyMissionState));
}

function updateMissionProgress() {
  let changed = false;

  dailyMissionState.missions.forEach(m => {
    if (m.done) return;

    if (m.type === "score" && score >= m.target) {
      m.done = true;
      changed = true;
    }

    if (m.type === "level" && maxLevelReachedThisRun >= m.target) {
      m.done = true;
      changed = true;
    }

    if (m.type === "validPlay" && dailyMissionState.dailyValidPlayCount >= m.target) {
      m.done = true;
      changed = true;
    }
  });

  if (changed) {
    saveDailyMissionState();
  }
}

function registerValidPlayIfNeeded(level) {
  if (level >= 5 && !validPlayCountedThisRun) {
    validPlayCountedThisRun = true;
    dailyMissionState.dailyValidPlayCount += 1;
    saveDailyMissionState();
    updateMissionProgress();
  }
}

function updateMaxLevel(level) {
  if (level > maxLevelReachedThisRun) {
    maxLevelReachedThisRun = level;
    updateMissionProgress();
  }
}

function showSkinRewardOverlay(rewards) {
  rewardAnimating = true;
  skinRewardOverlayEl.style.display = "flex";
  skinRewardCloseBtn.disabled = true;
  skinRewardListEl.innerHTML = `
    <div class="skin-reward-item">？？？</div>
    <div class="skin-reward-item">？？？</div>
    <div class="skin-reward-item">？？？</div>
  `;
  skinRewardResultEl.textContent = "";

  const itemEls = [...skinRewardListEl.querySelectorAll(".skin-reward-item")];

  rewards.forEach((name, index) => {
    setTimeout(() => {
      itemEls[index].textContent = `・${name}`;
      itemEls[index].classList.add("revealed");
    }, 650 + index * 500);
  });

  setTimeout(() => {
    skinRewardResultEl.innerHTML = `・${rewards[0]}<br>・${rewards[1]}<br>・${rewards[2]}<br><br>のスキンが手に入りました。`;
    skinRewardCloseBtn.disabled = false;
    rewardAnimating = false;
  }, 2300);
}

skinRewardCloseBtn.addEventListener("click", () => {
  if (rewardAnimating) return;
  skinRewardOverlayEl.style.display = "none";
});

skinRewardOverlayEl.addEventListener("click", e => {
  if (e.target === skinRewardOverlayEl && !rewardAnimating) {
    skinRewardOverlayEl.style.display = "none";
  }
});

function preloadImages() {
  return Promise.all(members.map(m => new Promise(resolve => {
    const targetImg = getGameImg(m);
    const img = new Image();
    img.onload = () => {
      imageSizeMap.set(targetImg, {
        width: img.naturalWidth || 512,
        height: img.naturalHeight || 512
      });
      resolve();
    };
    img.onerror = () => {
      imageSizeMap.set(targetImg, { width: 512, height: 512 });
      resolve();
    };
    img.src = targetImg;
  })));
}

function getUniformScale(imgUrl, diameter) {
  const meta = imageSizeMap.get(imgUrl) || { width: 512, height: 512 };
  const longestSide = Math.max(meta.width, meta.height);
  const scale = (diameter * 0.92) / longestSide;
  return { xScale: scale, yScale: scale };
}

function createNext() {
  const maxStartIndex = Math.min(2, members.length - 1);
  const evoIndex = Math.floor(Math.random() * (maxStartIndex + 1));
  return {
    member: members[evoIndex],
    level: evoIndex,
    evoIndex: evoIndex
  };
}

function updateNext() {
  const frameName = getEquippedFrameName(next.member.name);

  nextImgEl.src = getGameImg(next.member);
  nextNameEl.textContent = `Lv${next.evoIndex + 1} ${displayName(next.member.name)}`;
  dropGhostImgEl.src = getGameImg(next.member);

  const previewBase = 88;
  const actualSize = SIZE[next.evoIndex] * 2;
  const previewScale = Math.min(actualSize / previewBase, 1);

  dropGhostImgEl.style.transform = `scale(${previewScale})`;

  applyFrameToImgElement(nextImgEl, frameName);
  applyFrameToGhost(frameName);

  updateGhostPosition();
}

function updateGhostPosition() {
  dropGhostEl.style.left = `${aimX}px`;
}

function getSafeX(rawX) {
  const radius = SIZE[next.evoIndex];
  return Math.max(radius + 8, Math.min(rawX, GAME_WIDTH - radius - 8));
}

function addScoreByNextIndex(nextIndex){
  const level = nextIndex + 1;
  const gained = SCORE_TABLE[level] || 0;
  score += gained;
  scoreEl.textContent = score;
  finalScoreEl.textContent = score;
  updateMissionProgress();
  return gained;
}

function showUnlockPopup(character){
  unlockImgEl.src = character.img;
  unlockNameEl.textContent = character.name;
  unlockOverlayEl.style.display = "flex";
}

function closeUnlockPopup(){
  unlockOverlayEl.style.display = "none";
}

function checkSpecialUnlock() {
  for (const character of SPECIAL_CHARACTERS) {
    const alreadyUnlocked = localStorage.getItem(character.key) === "true";
    if (!alreadyUnlocked && lv11CreatedThisRun >= character.need) {
      localStorage.setItem(character.key, "true");
      showUnlockPopup(character);
      break;
    }
  }
}

function spawn(x) {
  if (!canDrop || isGameOver) return;

  const safeX = getSafeX(x);
  const r = SIZE[next.evoIndex];
  const gameImg = getGameImg(next.member);
  const scale = getUniformScale(gameImg, r * 2);
  const frameName = getEquippedFrameName(next.member.name);

  const body = Bodies.circle(safeX, DROP_Y, r, {
    restitution: 0.15,
    friction: 0.2,
    frictionAir: 0.01,
    render: {
      sprite: {
        texture: gameImg,
        xScale: scale.xScale,
        yScale: scale.yScale
      }
    }
  });

  body.member = next.member;
  body.level = next.evoIndex;
  body.evoIndex = next.evoIndex;
  body.isMerging = false;
  body.frameName = frameName;

  World.add(world, body);

  updateMaxLevel(next.evoIndex + 1);
  registerValidPlayIfNeeded(next.evoIndex + 1);

  canDrop = false;
  setTimeout(() => canDrop = true, 320);

  next = createNext();
  updateNext();
}

function mergeEffect(x, y, r, name, nextIndex, isMax = false) {
  const burst = document.createElement("div");
  burst.className = `merge-burst${isMax ? " max" : ""}`;
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  burst.style.width = `${Math.min(r * 2.4, 180)}px`;
  burst.style.height = `${Math.min(r * 2.4, 180)}px`;

  const text = document.createElement("div");
  text.className = `merge-text${isMax ? " max" : ""}`;
  text.style.left = `${x}px`;
  text.style.top = `${y}px`;
  text.textContent = isMax ? "✨ MAX LEVEL ✨" : `Lv${nextIndex + 1} ${displayName(name)}`;

  effectsEl.appendChild(burst);
  effectsEl.appendChild(text);

  setTimeout(() => burst.remove(), 450);
  setTimeout(() => text.remove(), 850);
}

function drawStar(ctx, x, y, radius, color) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / 5;
    const outerX = x + Math.cos(angle) * radius;
    const outerY = y + Math.sin(angle) * radius;
    const innerAngle = angle + Math.PI / 5;
    const innerX = x + Math.cos(innerAngle) * radius * 0.45;
    const innerY = y + Math.sin(innerAngle) * radius * 0.45;
    if (i === 0) {
      ctx.moveTo(outerX, outerY);
    } else {
      ctx.lineTo(outerX, outerY);
    }
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.fill();
  ctx.restore();
}

function drawHeart(ctx, x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
  ctx.bezierCurveTo(x - size * 0.5, y + size * 0.6, x, y + size * 0.85, x, y + size);
  ctx.bezierCurveTo(x, y + size * 0.85, x + size * 0.5, y + size * 0.6, x + size * 0.5, y + size * 0.3);
  ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.fill();
  ctx.restore();
}

function drawSparkle(ctx, x, y, size, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.moveTo(x - size * 0.7, y - size * 0.7);
  ctx.lineTo(x + size * 0.7, y + size * 0.7);
  ctx.moveTo(x + size * 0.7, y - size * 0.7);
  ctx.lineTo(x - size * 0.7, y + size * 0.7);
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

function drawDecorationByType(ctx, type, x, y, size, color) {
  if (type === "star") {
    drawStar(ctx, x, y, size, color);
    return;
  }
  if (type === "heart") {
    drawHeart(ctx, x, y - size * 0.45, size * 1.05, color);
    return;
  }
  drawSparkle(ctx, x, y, size, color);
}

function drawFrameForBody(ctx, body) {
  if (!body.frameName) return;

  const meta = getFrameMeta(body.frameName);
  if (!meta) return;

  const x = body.position.x;
  const y = body.position.y;
  const r = body.circleRadius || SIZE[body.evoIndex] || 20;

  ctx.save();

  const ringWidth = Math.max(2.2, r * 0.09);
  const ringRadius = r - ringWidth * 0.18;

  ctx.beginPath();
  ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
  ctx.strokeStyle = meta.color;
  ctx.lineWidth = ringWidth;
  ctx.shadowColor = meta.glow;
  ctx.shadowBlur = meta.rank === "SSR" ? 16 : meta.rank === "SR" ? 12 : 8;
  ctx.stroke();

  const grad = ctx.createRadialGradient(
    x, y, r * 0.5,
    x, y, r * 0.98
  );
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(0.72, meta.glow);
  grad.addColorStop(1, "rgba(0,0,0,0)");

  ctx.beginPath();
  ctx.arc(x, y, r * 0.98, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  const pattern = getFrameDecorationPattern(body.frameName);
  const count = pattern.length;
  const decoRingRadius = r * 0.8;

  for (let i = 0; i < count; i++) {
    const angle = (-Math.PI / 2) + (Math.PI * 2 * i / count);
    const dx = x + Math.cos(angle) * decoRingRadius;
    const dy = y + Math.sin(angle) * decoRingRadius;
    const type = pattern[i];

    let decoSize = Math.max(3.2, r * 0.12);

    if (type === "heart") decoSize = Math.max(3.8, r * 0.14);
    if (type === "star") decoSize = Math.max(3.6, r * 0.135);
    if (type === "sparkle") decoSize = Math.max(3.0, r * 0.115);

    if (meta.rank === "SSR") decoSize *= 1.12;
    if (meta.rank === "SR") decoSize *= 1.06;

    drawDecorationByType(ctx, type, dx, dy, decoSize, meta.color);
  }

  ctx.restore();
}

Events.on(render, "afterRender", () => {
  const ctx = render.context;
  const bodies = Composite.allBodies(world).filter(body => !body.isStatic && body.member);

  bodies.forEach(body => {
    drawFrameForBody(ctx, body);
  });
});

let audioCtx = null;
let bgmGain = null;
let seGain = null;
let bgmStarted = false;
let bgmLoop = null;

let bgmVolume = Number(localStorage.getItem("facegame_bgm_volume") || 60);
let seVolume = Number(localStorage.getItem("facegame_se_volume") || 80);

bgmVolEl.value = bgmVolume;
seVolEl.value = seVolume;
bgmValEl.textContent = `${bgmVolume}%`;
seValEl.textContent = `${seVolume}%`;

if (bgm) {
  bgm.volume = bgmVolume / 100;
  bgm.loop = true;
}

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    bgmGain = audioCtx.createGain();
    seGain = audioCtx.createGain();
    bgmGain.gain.value = bgmVolume / 100;
    seGain.gain.value = seVolume / 100;
    bgmGain.connect(audioCtx.destination);
    seGain.connect(audioCtx.destination);
  }
}

async function unlockAudio() {
  ensureAudio();
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
  startBgm();
}

function tone(freq, duration, type = "triangle", volume = 0.1, when = 0, bus = "se") {
  ensureAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const start = audioCtx.currentTime + when;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(bus === "bgm" ? bgmGain : seGain);
  osc.start(start);
  osc.stop(start + duration);
}

function playMergeSound(level) {
  if (seVolume <= 0) return;
  const base = 360 + level * 45;
  tone(base, 0.08, "triangle", 0.6);
  tone(base * 1.16, 0.12, "triangle", 0.5, 0.05);
}

function playMaxSound() {
  if (seVolume <= 0) return;
  tone(784, 0.12, "triangle", 0.75);
  tone(988, 0.16, "triangle", 0.68, 0.08);
  tone(1175, 0.22, "triangle", 0.62, 0.18);
}

function playGameOverSound() {
  if (seVolume <= 0) return;
  tone(330, 0.18, "sawtooth", 0.5);
  tone(250, 0.2, "sawtooth", 0.45, 0.13);
  tone(180, 0.26, "sawtooth", 0.4, 0.28);
}

function playBgmPhrase() {
  if (bgmVolume <= 0) return;
  const melody = [392, 523.25, 587.33, 523.25, 659.25, 587.33, 523.25, 392];
  melody.forEach((f, i) => tone(f, i === 7 ? 0.28 : 0.18, "triangle", 0.08, i * 0.24, "bgm"));
  [130.81, 146.83, 174.61, 146.83].forEach((f, i) => tone(f, 0.36, "sine", 0.05, i * 0.48, "bgm"));
}

function startBgm() {
  if (bgm) {
    bgm.volume = bgmVolume / 100;

    if (bgmVolume <= 0) {
      bgm.pause();
      bgm.currentTime = 0;
      bgmStarted = false;
      return;
    }

    if (!bgmStarted) {
      bgm.play().then(() => {
        bgmStarted = true;
      }).catch(() => {
        bgmStarted = false;
      });
    }
    return;
  }

  if (bgmStarted) return;
  if (bgmVolume <= 0) return;

  bgmStarted = true;
  playBgmPhrase();
  bgmLoop = setInterval(playBgmPhrase, 2000);
}

bgmVolEl.oninput = async e => {
  bgmVolume = Number(e.target.value);
  bgmValEl.textContent = `${bgmVolume}%`;
  localStorage.setItem("facegame_bgm_volume", String(bgmVolume));

  if (bgm) {
    bgm.volume = bgmVolume / 100;

    if (bgmVolume <= 0) {
      bgm.pause();
      bgm.currentTime = 0;
      bgmStarted = false;
    } else {
      await unlockAudio();
      if (bgm.paused) {
        bgm.play().then(() => {
          bgmStarted = true;
        }).catch(() => {
          bgmStarted = false;
        });
      }
    }
    return;
  }

  await unlockAudio();
  if (bgmGain) bgmGain.gain.value = bgmVolume / 100;
};

seVolEl.oninput = async e => {
  await unlockAudio();
  seVolume = Number(e.target.value);
  seGain.gain.value = seVolume / 100;
  seValEl.textContent = `${seVolume}%`;
  localStorage.setItem("facegame_se_volume", String(seVolume));
};

settingsBtn.onclick = async e => {
  e.stopPropagation();
  await unlockAudio();
  panelEl.style.display = panelEl.style.display === "block" ? "none" : "block";
};

document.addEventListener("click", e => {
  if (!panelEl.contains(e.target) && e.target !== settingsBtn) {
    panelEl.style.display = "none";
  }
});

document.getElementById("backBtn").onclick = () => {
  location.href = "index.html";
};

document.getElementById("restartBtn").onclick = async () => {
  await unlockAudio();
  restart();
};

document.getElementById("retryBtn").onclick = async () => {
  await unlockAudio();
  restart();
};

document.getElementById("backTitleBtn").onclick = () => {
  location.href = "index.html";
};

document.getElementById("shareBtn").onclick = () => {
  const text = `Score: ${score}
Max Lv: ${maxLevelReachedThisRun}

日プ新世界 Face Gameをプレイ！
https://riprd1.github.io/shinsekai-facegame/`;
  const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
};

document.getElementById("unlockCloseBtn").onclick = () => {
  closeUnlockPopup();
};

unlockOverlayEl.addEventListener("click", e => {
  if (e.target === unlockOverlayEl) {
    closeUnlockPopup();
  }
});

function showGameOverUI() {
  finalScoreEl.textContent = score;
  finalMaxLevelEl.textContent = maxLevelReachedThisRun;
  gameOverOverlayEl.style.display = "flex";
  gameoverCardEl.classList.remove("show");
  gameoverActionsEl.classList.remove("show");
  void gameoverCardEl.offsetWidth;
  gameoverCardEl.classList.add("show");
  setTimeout(() => {
    gameoverActionsEl.classList.add("show");
  }, 360);
}

function restart() {
  Composite.allBodies(world).forEach(body => {
    if (!body.isStatic) World.remove(world, body);
  });

  score = 0;
  lv11CreatedThisRun = 0;
  maxLevelReachedThisRun = 0;
  validPlayCountedThisRun = false;
  scoreEl.textContent = "0";
  finalScoreEl.textContent = "0";
  finalMaxLevelEl.textContent = "0";
  overLineStart = null;
  isGameOver = false;
  lineEl.classList.remove("danger");
  gameOverOverlayEl.style.display = "none";
  unlockOverlayEl.style.display = "none";
  effectsEl.innerHTML = "";
  next = createNext();
  updateNext();
  updateMissionProgress();
}

gameEl.addEventListener("mousemove", e => {
  if (isGameOver) return;
  dropGuideEl.classList.add("active");
  const rect = gameEl.getBoundingClientRect();
  aimX = getSafeX(e.clientX - rect.left);
  updateGhostPosition();
});

gameEl.addEventListener("mouseenter", () => {
  if (!isGameOver) dropGuideEl.classList.add("active");
});

gameEl.addEventListener("mouseleave", () => {
  if (!isTouchDragging) dropGuideEl.classList.remove("active");
});

gameEl.addEventListener("click", async e => {
  if (isTouchDragging || isGameOver) return;
  await unlockAudio();
  const rect = gameEl.getBoundingClientRect();
  aimX = getSafeX(e.clientX - rect.left);
  updateGhostPosition();
  spawn(aimX);
});

gameEl.addEventListener("touchstart", async e => {
  if (isGameOver) return;
  await unlockAudio();
  isTouchDragging = true;
  dropGuideEl.classList.add("active");
  const rect = gameEl.getBoundingClientRect();
  aimX = getSafeX(e.touches[0].clientX - rect.left);
  updateGhostPosition();
}, { passive:true });

gameEl.addEventListener("touchmove", e => {
  if (!isTouchDragging || isGameOver) return;
  const rect = gameEl.getBoundingClientRect();
  aimX = getSafeX(e.touches[0].clientX - rect.left);
  updateGhostPosition();
}, { passive:true });

gameEl.addEventListener("touchend", () => {
  if (!isTouchDragging || isGameOver) return;
  isTouchDragging = false;
  spawn(aimX);
  dropGuideEl.classList.remove("active");
}, { passive:true });

Events.on(engine, "collisionStart", async event => {
  if (isGameOver) return;

  for (const pair of event.pairs) {
    const a = pair.bodyA;
    const b = pair.bodyB;

    if (!a.member || !b.member) continue;
    if (a.isMerging || b.isMerging) continue;
    if (a.evoIndex !== b.evoIndex) continue;

    a.isMerging = true;
    b.isMerging = true;

    const x = (a.position.x + b.position.x) / 2;
    const y = (a.position.y + b.position.y) / 2;
    const nextIndex = a.evoIndex + 1;

    World.remove(world, a);
    World.remove(world, b);

    if (nextIndex >= members.length) {
      lv11CreatedThisRun += 1;
      updateMaxLevel(members.length);
      addScoreByNextIndex(nextIndex - 1);
      mergeEffect(x, y, 88, "MAX", nextIndex, true);
      playMaxSound();
      checkSpecialUnlock();
      continue;
    }

    const newMember = members[nextIndex];
    const r = SIZE[nextIndex];
    const newGameImg = getGameImg(newMember);
    const scale = getUniformScale(newGameImg, r * 2);
    const frameName = getEquippedFrameName(newMember.name);

    const body = Bodies.circle(x, y, r, {
      restitution: 0.12,
      friction: 0.16,
      frictionAir: 0.01,
      render: {
        sprite: {
          texture: newGameImg,
          xScale: scale.xScale,
          yScale: scale.yScale
        }
      }
    });

    body.member = newMember;
    body.level = nextIndex;
    body.evoIndex = nextIndex;
    body.isMerging = false;
    body.frameName = frameName;

    World.add(world, body);

    Body.setVelocity(body, {
      x: ((a.velocity.x || 0) + (b.velocity.x || 0)) * 0.12,
      y: Math.min(((a.velocity.y || 0) + (b.velocity.y || 0)) * 0.12, 0.5)
    });

    addScoreByNextIndex(nextIndex);
    mergeEffect(x, y, r, newMember.name, nextIndex, false);
    playMergeSound(nextIndex + 1);
    updateMaxLevel(nextIndex + 1);
    registerValidPlayIfNeeded(nextIndex + 1);

    if (nextIndex === members.length - 1) {
      lv11CreatedThisRun += 1;
      checkSpecialUnlock();
    }
  }
});

function checkGameOver() {
  if (isGameOver) return;

  const bodies = Composite.allBodies(world).filter(body => !body.isStatic && body.member);

  const touching = bodies.some(body => {
    const radius = SIZE[body.evoIndex] || body.circleRadius || 0;
    return (body.position.y - radius) <= GAME_OVER_LINE_Y;
  });

  if (touching) {
    lineEl.classList.add("danger");

    if (!overLineStart) {
      overLineStart = performance.now();
    } else if (performance.now() - overLineStart >= GAME_OVER_HOLD_MS) {
      isGameOver = true;
      showGameOverUI();
      playGameOverSound();
    }
  } else {
    overLineStart = null;
    lineEl.classList.remove("danger");
  }
}

(function loop() {
  checkGameOver();
  requestAnimationFrame(loop);
})();

document.addEventListener("contextmenu", e => {
  e.preventDefault();
});

document.addEventListener("selectstart", e => {
  e.preventDefault();
});

preloadImages().then(() => {
  renderSelectedMembers();
  updateNext();
  updateGhostPosition();
  updateMissionProgress();
});
