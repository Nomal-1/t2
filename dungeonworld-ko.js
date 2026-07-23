Hooks.on('babele.init', () => {
  if (game.babele) {
    game.babele.register({
      module: 'dungeonworld-ko',
      lang: 'ko',
      dir: 'compendium'
    });
  }
});

// 태그 칩(예: Close, Precise) 표시 전용 한글화.
// system.tags 데이터 자체는 건드리지 않고(관통/피해/장갑무시 계산은 항상 원본 영어 기준),
// 렌더링된 화면의 텍스트만 바꿔치기한다.
const DW_TAG_MAP = {
  'amorphous': '부정형',
  'applied': '투여',
  'awkward': '거추장스러움',
  'cautious': '조심스러움',
  'close': '한걸음',
  'clumsy': '불편',
  'construct': '인공물',
  'dangerous': '위험',
  'devious': '음흉',
  'divine': '신성',
  'far': '장거리',
  'forceful': '괴력',
  'group': '소집단',
  'hand': '반걸음',
  'hoarder': '보물지기',
  'horde': '대집단',
  'huge': '거대',
  'ignores armor': '장갑 무시',
  'intelligent': '지능적',
  'large': '큼',
  'magical': '마법적',
  'messy': '파괴적',
  'near': '중거리',
  'organized': '조직적',
  'planar': '이계',
  'precise': '정밀',
  'ration': '식량',
  'reach': '몇걸음',
  'reload': '재장전',
  'requires': '필요',
  'requires dwarf': '필요 (드워프)',
  'slow': '느림',
  'small': '작음',
  'solitary': '외톨이',
  'stealthy': '은밀',
  'stun': '충격',
  'terrifying': '끔찍함',
  'thrown': '투척',
  'tiny': '매우 작음',
  'touch': '접촉',
  'two-handed': '양손',
  'worn': '착용'
};

function translateTagDisplay(value) {
  const trimmed = value.trim();
  const low = trimmed.toLowerCase();

  if (DW_TAG_MAP[low]) return DW_TAG_MAP[low];

  let m;
  if ((m = low.match(/^\+?(\d+)\s*armor$/))) return `장갑 ${low.startsWith('+') ? '+' : ''}${m[1]}`;
  if ((m = low.match(/^(\d+)\s*piercing$|^piercing\s*(\d+)$/))) return `관통 ${m[1] || m[2]}`;
  if ((m = low.match(/^\+(\d+)\s*damage$|^damage\s*\+(\d+)$/))) return `피해 +${m[1] || m[2]}`;
  if ((m = low.match(/^(\d+)\s*ammo$/))) return `발수 ${m[1]}`;
  if ((m = low.match(/^(\d+)\s*coins?$/))) return `${m[1]}닢`;
  if ((m = low.match(/^(\d+)\s*uses?$/))) return `${m[1]}회분`;

  return null;
}

function applyTagDisplayTranslation(html) {
  html.find('.tags > .tag').each((i, el) => {
    const $el = $(el);
    const translated = translateTagDisplay($el.text());
    if (translated) $el.text(translated);
  });
}

Hooks.on('renderDwActorSheet', (app, html) => applyTagDisplayTranslation(html));
Hooks.on('renderDwActorNpcSheet', (app, html) => applyTagDisplayTranslation(html));
Hooks.on('renderDialog', (app, html) => applyTagDisplayTranslation(html));
Hooks.on('renderChatMessage', (app, html) => applyTagDisplayTranslation(html));

function generateTokenImageFilenames(name, ext) {
  const variants = [
    '-token', '_token', 'token', '(token)', '[token]', 
    '%20-%20token', '%20_%20token', '%20token', '%20(token)', '%20[token]',
    '-Token', '_Token', 'Token', '(Token)', '[Token]', 
    '%20-%20Token', '%20_%20Token', '%20Token', '%20(Token)', '%20[Token]'
  ];

  return variants.map(variant => `${name}${variant}.${ext}`);
}

async function fileExists(filePath) {
  const basePath = filePath.split('/').slice(0, -1).join('/');
  try {
    const result = await FilePicker.browse('data', basePath);
    return result.files.includes(filePath);
  } catch (error) {
    return false;
  }
}

async function getTokenImagePath(actorImgPath) {
  const imgParts = actorImgPath.split('/');
  const fileName = imgParts.pop();
  const [name, ext] = fileName.split('.');
  const basePath = imgParts.join('/');

  const possibleFilenames = generateTokenImageFilenames(name, ext);

  const fileChecks = possibleFilenames.map(async (tokenFileName) => {
    const tokenImgPath = `${basePath}/${tokenFileName}`;
    return await fileExists(tokenImgPath) ? tokenImgPath : null;
  });

  const results = await Promise.all(fileChecks);
  const tokenImgPath = results.find(path => path !== null);

  return tokenImgPath || actorImgPath;
}

Hooks.on("updateActor", async (actor, data, options, userId) => {
  try {
    if (data.img) {
      const tokenImg = await getTokenImagePath(data.img);

      await actor.prototypeToken.update({ "texture.src": tokenImg });

      const tokens = actor.getActiveTokens(true);
      for (let token of tokens) {
        await token.document.update({ "texture.src": tokenImg });
      }
    }
  } catch (error) {
    console.error('Error in updateActor hook:', error);
  }
});
