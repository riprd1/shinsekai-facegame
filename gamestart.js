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
  1: 10,
  2: 20,
  3: 40,
  4: 80,
  5: 160,
  6: 320,
  7: 640,
  8: 1280,
  9: 2560,
  10: 5120
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

const gameEl = document.getElementById("game");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");
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
const unlockOverlayEl = document.getElementById("unlockOverlay");
const unlockImgEl = document.getElementById("unlockImg");
const unlockNameEl = document.getElementById("unlockName");
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

selectedMembersEl.innerHTML = members.map((m, index) => `
  <div class="selected-mini">
    <img src="${getSelectImg(m)}" alt="${displayName(m.name)}">
    <div>Lv${index + 1}</div>
    <div>${displayName(m.name)}</div>
  </div>
`).join("");

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

const imageSizeMap = new Map();

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
  nextImgEl.src = getGameImg(next.member);
  nextNameEl.textContent = `Lv${next.evoIndex + 1} ${displayName(next.member.name)}`;
  dropGhostImgEl.src = getGameImg(next.member);

  const previewBase = 88;
  const actualSize = SIZE[next.evoIndex] * 2;
  const previewScale = Math.min(actualSize / previewBase, 1);

  dropGhostImgEl.style.transform = `scale(${previewScale})`;

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
  const gained = SCORE_TABLE[nextIndex] || 0;
  score += gained;
  scoreEl.textContent = score;
  finalScoreEl.textContent = score;
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

  World.add(world, body);

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
  const base = 360 + level * 55;
  tone(base, 0.08, "triangle", 0.6);
  tone(base * 1.18, 0.12, "triangle", 0.5, 0.05);
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
  if (bgmStarted) return;
  bgmStarted = true;
  playBgmPhrase();
  bgmLoop = setInterval(playBgmPhrase, 2000);
}

bgmVolEl.oninput = async e => {
  await unlockAudio();
  bgmVolume = Number(e.target.value);
  bgmGain.gain.value = bgmVolume / 100;
  bgmValEl.textContent = `${bgmVolume}%`;
  localStorage.setItem("facegame_bgm_volume", String(bgmVolume));
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

document.getElementById("unlockCloseBtn").onclick = () => {
  closeUnlockPopup();
};

unlockOverlayEl.addEventListener("click", e => {
  if (e.target === unlockOverlayEl) {
    closeUnlockPopup();
  }
});

function restart() {
  Composite.allBodies(world).forEach(body => {
    if (!body.isStatic) World.remove(world, body);
  });

  score = 0;
  lv11CreatedThisRun = 0;
  scoreEl.textContent = "0";
  finalScoreEl.textContent = "0";
  overLineStart = null;
  isGameOver = false;
  lineEl.classList.remove("danger");
  gameOverOverlayEl.style.display = "none";
  unlockOverlayEl.style.display = "none";
  effectsEl.innerHTML = "";
  next = createNext();
  updateNext();
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
      addScoreByNextIndex(nextIndex);
      mergeEffect(x, y, 88, "MAX", nextIndex, true);
      playMaxSound();
      continue;
    }

    const newMember = members[nextIndex];
    const r = SIZE[nextIndex];
    const newGameImg = getGameImg(newMember);
    const scale = getUniformScale(newGameImg, r * 2);

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

    World.add(world, body);

    Body.setVelocity(body, {
      x: ((a.velocity.x || 0) + (b.velocity.x || 0)) * 0.12,
      y: Math.min(((a.velocity.y || 0) + (b.velocity.y || 0)) * 0.12, 0.5)
    });

    addScoreByNextIndex(nextIndex);
    mergeEffect(x, y, r, newMember.name, nextIndex, false);
    playMergeSound(nextIndex);

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
      gameOverOverlayEl.style.display = "flex";
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
  updateNext();
  updateGhostPosition();
});
