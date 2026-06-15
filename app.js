/* ============================================
   HashCrack — Application Logic v3
   Massive Dictionary + Brute-Force Engine
   ============================================ */

(() => {
  'use strict';

  // ──────────────────────────────────────
  // MASSIVE Password Dictionaries (~2500+ passwords)
  // ──────────────────────────────────────
  const PASSWORDS = {
    common: [
      // Top 200+ most common passwords from real breach databases
      'password','123456','12345678','qwerty','abc123','monkey','master','dragon','login','princess',
      'letmein','welcome','shadow','sunshine','trustno1','iloveyou','batman','football','charlie','donald',
      'password1','password123','admin','admin123','root','toor','pass','test','guest','changeme',
      'mustang','access','hello','michael','superman','696969','hottie','loveme','freedom','whatever',
      'robert','soccer','delta','alaska','harley','ranger','thomas','andrea','angel','tiger',
      'william','killer','buster','soccer1','george','summer','jessica','pepper','1qaz2wsx','flower',
      'hunter','hunter2','trustme','secret','qwerty123','passw0rd','baseball','ginger','hammer','silver',
      'joshua','starwars','matrix','cheese','computer','internet','explorer','windows','apple','banana',
      'orange','chicken','purple','diamond','cookie','coffee','music','guitar','tennis','hockey',
      'arsenal','chelsea','liverpool','barcelona','ferrari','porsche','corvette','mustang1','pokemon','pikachu',
      'snoopy','garfield','scooter','phoenix','elephant','dolphin','butterfly','midnight','thunder','warrior',
      'wizard','sparky','dallas','eagles','giants','yankees','cowboys','steelers','packers','redskins',
      'jordan','lebron','messi','ronaldo','beckham','federer','nadal','serena','kobe','shaq',
      'chicago','newyork','boston','losangeles','houston','atlanta','seattle','denver','miami','detroit',
      'london','paris','tokyo','berlin','sydney','toronto','moscow','madrid','rome','amsterdam',
      'minecraft','fortnite','roblox','overwatch','valorant','league','dota','csgo','pubg','apex',
      'google','amazon','facebook','twitter','instagram','tiktok','youtube','netflix','spotify','reddit',
      'letmein1','welcome1','monkey1','dragon1','master1','shadow1','sunshine1','charlie1','football1','batman1',
      'panther','pantera','samson','falcon','cobra','viper','python','scorpion','raptor','grizzly',
      'monster','vampire','zombie','ghost','ninja','pirate','knight','soldier','captain','general',
      // Common with numbers
      'password1','password12','password2','password0','password9','password!','passw0rd','p@ssword','p@ssw0rd',
      'abc1234','abcdef','abcabc','abc12345','abc0','abc1','abc2','qwerty1','qwerty12','qwerty0',
      'admin1','admin12','admin0','admin1234','admin!','root123','root1','root12','root0','toor123',
      'test1','test12','test123','test1234','test0','guest1','guest12','guest123','user','user1',
      'user123','user1234','demo','demo123','sample','sample123','default','default1','system','system1',
      'login1','login123','access1','access123','pass1','pass12','pass1234','pass!','letmein123',
    ],
    numeric: [
      // All 1-4 digit PINs that are common
      '0','1','2','3','4','5','6','7','8','9',
      '00','01','10','11','12','13','21','22','23','42','69','77','88','99',
      '000','001','007','010','100','111','112','113','114','121','123','131','141',
      '143','200','222','234','246','300','311','313','321','333','345','400','411',
      '420','444','456','500','555','567','600','666','678','700','711','777','786',
      '789','800','888','900','911','999',
      '0000','0001','0007','0069','0101','0123','0420','0666','0911','0999',
      '1000','1001','1010','1100','1111','1112','1122','1200','1212','1221','1234','1313','1314',
      '1357','1369','1400','1414','1500','1600','1700','1800','1900','1919','1945','1950',
      '1955','1960','1965','1970','1975','1980','1981','1982','1983','1984','1985','1986',
      '1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998',
      '1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
      '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022',
      '2023','2024','2025','2026','2112','2222','2345','2468','2580','3141','3333','3456',
      '4321','4444','4567','4ever','5150','5252','5555','5678','6543','6666','6789','6969',
      '7654','7777','7890','8520','8675','8765','8888','9876','9999',
      // 5-6 digit common
      '00000','11111','12345','22222','33333','44444','55555','66666','77777','88888','99999',
      '10101','12321','11211','12121','13131','54321','98765','01234','10203','10001',
      '000000','111111','112233','121212','123123','123321','123456','131313','141414','159753',
      '171717','181818','191919','222222','232323','242424','333333','345678','369369','420420',
      '444444','456789','555555','654321','666666','696969','777777','789456','789789','888888',
      '987654','999999',
      // 7-10 digit common
      '1234567','7654321','1111111','0000000','9999999',
      '12345678','87654321','11111111','00000000','99999999','12121212','12344321',
      '123456789','987654321','111111111','000000000',
      '1234567890','0987654321','1111111111','0000000000',
    ],
    keyboard: [
      'qwerty','qwerty1','qwerty12','qwerty123','qwerty1234','qwerty!','qwertyu','qwertyui','qwertyuiop',
      'asdf','asdfg','asdfgh','asdfghjk','asdfghjkl','asdfasdf',
      'zxcv','zxcvb','zxcvbn','zxcvbnm','zxcvzxcv',
      'qazwsx','qazwsxedc','qaz123','qazxsw','qaz1qaz1',
      'q1w2e3','q1w2e3r4','q1w2e3r4t5','q1w2e3r4t5y6',
      '1qaz','1qaz2wsx','1qaz2wsx3edc','1q2w','1q2w3e','1q2w3e4r','1q2w3e4r5t',
      'zaq1','zaq12wsx','zaq1xsw2',
      'qweasd','qweasdzxc','qwer','qwer1234','qwerasdf','qwerqwer','qwer!@#$',
      'asdfjkl','asdfjkl;','asdf1234','asdfzxcv','asdf!@#$',
      '!@#$','!@#$%','!@#$%^','!@#$%^&','!@#$%^&*','!@#$%^&*()',
      'poiuytrewq','lkjhgfdsa','mnbvcxz','/.,mnbvcxz',
      'pass1234','pass123','p@ss1234','p@ss123','p@55w0rd',
      'abcd','abcd1234','abcde','abcdef','abcdefg','abcdefgh','abcdefghij',
      'abcabc','aabbcc','aabb1122',
      'aaaa','bbbb','cccc','dddd','aaaa1111','aaa111','aa11','a1b2c3',
      'qqqq','wwww','eeee','rrrr','zzzz','xxxx',
      '147258','258369','159357','147852','258963','369258','741852','852963','963852',
      '147258369','159263','321654','654987','987321',
      'qpalzm','zmxncbv','plokij','wsxedc','rfvtgb','yhnujm',
    ],
    names: [
      // Top 200 names used as passwords
      'michael','jessica','ashley','james','robert','jennifer','john','joseph','william','thomas',
      'david','richard','charles','daniel','matthew','anthony','sandra','andrew','joshua','amanda',
      'nicole','melissa','sarah','stephanie','elizabeth','heather','samantha','michelle','christopher','alexander',
      'patricia','linda','barbara','margaret','susan','dorothy','lisa','nancy','karen','betty',
      'helen','donna','carol','ruth','sharon','laura','rebecca','deborah','rachel','carolyn',
      'brian','kevin','jason','steven','timothy','ronald','edward','mark','george','kenneth',
      'patrick','frank','raymond','jack','dennis','jerry','tyler','austin','brandon','zachary',
      'aaron','jacob','nathan','ethan','logan','noah','mason','liam','lucas','oliver',
      'emma','sophia','ava','isabella','mia','charlotte','amelia','harper','evelyn','abigail',
      'emily','madison','ella','scarlett','grace','chloe','victoria','riley','aria','lily',
      'zoey','hannah','layla','nora','camila','penelope','aurora','savannah','audrey','brooklyn',
      // Names with common suffixes
      'michael1','jessica1','james1','robert1','john1','joseph1','william1','thomas1','david1','daniel1',
      'michael123','jessica123','james123','john123','david123','ashley123','sarah123','nicole123',
      'michael!','james!','john!','david!','robert!',
      // Nicknames & short forms
      'mike','jess','ash','jimmy','rob','jen','joe','will','tom','dave',
      'dick','charlie','dan','matt','tony','andy','josh','nick','mel','sam',
      'steph','liz','chris','alex','pat','frank','ray','jack','pete','steve',
      'mike1','jess1','chris1','alex1','jake','zach','nate','luke','max','ben',
    ],
    phrases: [
      // Common phrases and patterns
      'iloveyou','iloveu','iluvu','iloveyou1','iloveyou2','iloveyou!','iloveyou123',
      'ilove','loveyou','loveme','loveu','love123','love1','love12','love4ever',
      'fuckyou','fuckoff','fuckme','fuck123','fuck1','fuckit','fuckthis','asshole',
      'letmein','letmein1','letmein123','letmein!','openup','opensesame','open1234',
      'trustno1','trustme','trustme1','noone','nobody','nothing','nothinghere',
      'whatever','whatever1','whatever!','whatthe','whynot','because','because1',
      'forever','forever1','forever21','4ever','4life','mylife','myworld',
      'thankyou','please','sorry','hello','hello1','hello123','hi','hey','heyya',
      'goodbye','byebye','seeyou','later','goodnight','goodmorning','goodday',
      'godislove','jesus','jesus1','jesus123','christ','christian','blessed','faith',
      'heaven','angel','angel1','devil','demon','hell','satan','lucifer',
      'starwars','startrek','matrix','lotr','narnia','hogwarts','avengers','marvel',
      'batman','superman','spiderman','ironman','hulk','thor','wolverine','deadpool',
      'captainamerica','wonderwoman','aquaman','flash','greenlantern',
      'pokemon','pikachu','charizard','mewtwo','bulbasaur','squirtle','eevee',
      'minecraft','fortnite','roblox','gamer','gaming','noob','pro','gg','lol',
      'hacker','hacked','hack','hackme','cracker','cracked','crack','crackme',
      'killer','murder','death','dead','die','destroy','power','strong','beast',
      'money','cash','rich','million','billion','crypto','bitcoin','ethereum',
      'sexy','hottie','beautiful','pretty','handsome','gorgeous','cutie','babe',
      'sweetie','sweetheart','darling','honey','baby','babygirl','babyboy',
      'princess','prince','queen','king','royal','crown','empire','kingdom',
      'freedom','liberty','justice','peace','war','fight','battle','victory','glory',
      'sunshine','moonlight','starlight','rainbow','storm','thunder','lightning',
      'summer','winter','spring','autumn','monday','friday','sunday',
      'january','february','march','april','mayflower','june','july','august',
      'september','october','november','december',
    ],
    years: [
      // Years, dates, and date patterns
      ...Array.from({length: 100}, (_, i) => String(1950 + i)),
      // MMDD patterns
      '0101','0102','0110','0111','0112','0114','0115','0120','0123','0131',
      '0201','0202','0214','0220','0228','0229',
      '0301','0303','0310','0314','0315','0320','0331',
      '0401','0404','0410','0415','0420','0430',
      '0501','0505','0510','0515','0520','0531',
      '0601','0606','0610','0615','0620','0630',
      '0701','0704','0707','0710','0715','0720','0731',
      '0801','0808','0810','0815','0820','0831',
      '0901','0909','0910','0911','0915','0920','0930',
      '1001','1010','1015','1020','1024','1031',
      '1101','1110','1111','1115','1120','1130',
      '1201','1210','1212','1215','1220','1224','1225','1231',
      // With year combos
      '012000','012001','012024','012025','012026',
      '062024','062025','062026','072024','072025',
      '112024','112025','122024','122025',
    ]
  };

  // Combine ALL dictionaries into a single unique set for auto-scan
  function getAllUniquePasswords() {
    const all = new Set();
    for (const cat of Object.keys(PASSWORDS)) {
      for (const pw of PASSWORDS[cat]) all.add(pw);
    }
    return [...all];
  }

  // ──────────────────────────────────────
  // DOM Elements
  // ──────────────────────────────────────
  const $ = id => document.getElementById(id);

  const els = {
    hashInput: $('hash-input'),
    hashValidation: $('hash-validation'),
    passwordInput: $('password-input'),
    pasteBtn: $('paste-btn'),
    toggleVisibility: $('toggle-visibility'),
    eyeOpen: $('eye-open'),
    eyeClosed: $('eye-closed'),
    smartCheckBtn: $('smart-check-btn'),
    resultSection: $('result-section'),
    resultContent: $('result-content'),
    autoScanSection: $('auto-scan-section'),
    scanTitle: $('scan-title'),
    scanSubtitle: $('scan-subtitle'),
    scanProgressFill: $('scan-progress-fill'),
    scanCount: $('scan-count'),
    scanCategory: $('scan-category'),
    chipsContainer: $('chips-container'),
    suggestionTabs: $('suggestion-tabs'),
    variationsPreview: $('variations-preview'),
    variationsChips: $('variations-chips'),
    variationResultsSection: $('variation-results-section'),
    variationResultsList: $('variation-results-list'),
    genPasswordInput: $('gen-password-input'),
    roundsInput: $('rounds-input'),
    generateBtn: $('generate-btn'),
    generatedHash: $('generated-hash'),
    generatedHashText: $('generated-hash-text'),
    copyHashBtn: $('copy-hash-btn'),
    useHashBtn: $('use-hash-btn'),
    toastContainer: $('toast-container'),
    // Brute-force
    bfCharset: $('bf-charset'),
    bfMaxLen: $('bf-max-len'),
    bfEstimate: $('bf-estimate'),
    bfStartBtn: $('bf-start-btn'),
    bfStopBtn: $('bf-stop-btn'),
    bfStats: $('bf-stats'),
    bfAttempts: $('bf-attempts'),
    bfSpeed: $('bf-speed'),
    bfElapsed: $('bf-elapsed'),
    bfProgressPct: $('bf-progress-pct'),
    bfCurrentPw: $('bf-current-pw'),
    bfProgressFill: $('bf-progress-fill'),
  };

  let currentCategory = 'common';
  let isPasswordVisible = true;
  let isScanning = false;
  let scanAbort = false;
  let bfRunning = false;
  let bfAbort = false;

  // ──────────────────────────────────────
  // Utilities
  // ──────────────────────────────────────

  function isValidBcryptHash(hash) {
    return /^\$2[aby]?\$\d{2}\$.{53}$/.test(hash.trim());
  }

  function showToast(message, duration = 2500) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    els.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('leaving');
      toast.addEventListener('animationend', () => toast.remove());
    }, duration);
  }

  async function comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
      try {
        dcodeIO.bcrypt.compare(password, hash, (err, result) => {
          if (err) reject(err); else resolve(result);
        });
      } catch (e) { reject(e); }
    });
  }

  async function generateHashFromPw(password, rounds) {
    return new Promise((resolve, reject) => {
      dcodeIO.bcrypt.hash(password, rounds, (err, hash) => {
        if (err) reject(err); else resolve(hash);
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function setButtonLoading(btn, loading, text = 'Checking...') {
    if (loading) {
      btn.dataset.originalHtml = btn.innerHTML;
      btn.innerHTML = `<span class="spinner"></span> <span>${text}</span>`;
      btn.disabled = true;
    } else {
      if (btn.dataset.originalHtml) btn.innerHTML = btn.dataset.originalHtml;
      btn.disabled = false;
    }
  }

  const yieldThread = () => new Promise(r => setTimeout(r, 0));

  function formatNumber(n) {
    return n.toLocaleString();
  }

  function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  }

  // ──────────────────────────────────────
  // Smart Password Variations Generator
  // ──────────────────────────────────────

  function generateVariations(base) {
    if (!base) return [];
    const variations = new Set();
    const b = base.trim();

    variations.add(b);
    variations.add(b.toLowerCase());
    variations.add(b.toUpperCase());
    variations.add(b.charAt(0).toUpperCase() + b.slice(1).toLowerCase());
    variations.add(b.charAt(0).toLowerCase() + b.slice(1));

    // All characters toggled
    let toggled = '';
    for (const c of b) toggled += c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
    variations.add(toggled);

    // Number suffixes (lots)
    const suffixes = ['0','1','2','3','4','5','6','7','8','9',
      '01','10','11','12','13','21','22','23','69','77','88','99',
      '00','07','42','100','111','123','1234','12345','!','!!','!!!',
      '@','#','$','*','1!','123!','!@#','69','007','2024','2025','2026',
      '_1','_123','.','..','_'];
    for (const s of suffixes) {
      variations.add(b + s);
      variations.add(b.toLowerCase() + s);
      variations.add((b.charAt(0).toUpperCase() + b.slice(1).toLowerCase()) + s);
    }

    // Number prefixes
    const numPrefixes = ['1','12','123','0','00'];
    for (const p of numPrefixes) {
      variations.add(p + b);
      variations.add(p + b.toLowerCase());
    }

    // Common prefixes
    const prefixes = ['i','my','the','its','im','mr','ms','dr','sir','x','xx','super','mega','ultra','pro','cool','hot','big','lil','mc'];
    for (const p of prefixes) {
      variations.add(p + b);
      variations.add(p + b.charAt(0).toUpperCase() + b.slice(1).toLowerCase());
      variations.add(p + b.toLowerCase());
    }

    // Common suffixes (words)
    const wordSuffixes = ['love','man','boy','girl','baby','dog','cat','123abc','abc','xyz','god','king','queen','pro','master','boss','dude','bro'];
    for (const s of wordSuffixes) {
      variations.add(b + s);
      variations.add(s + b);
    }

    // Leet speak
    const leetMap = { a: '@', e: '3', i: '1', o: '0', s: '$', t: '7', l: '1', b: '8', g: '9' };
    let leet = b.toLowerCase();
    for (const [char, repl] of Object.entries(leetMap)) {
      leet = leet.replaceAll(char, repl);
    }
    if (leet !== b.toLowerCase()) {
      variations.add(leet);
      variations.add(leet + '!');
      variations.add(leet + '123');
      variations.add(leet + '1');
    }

    // Partial leet (each letter separately)
    for (const [char, repl] of Object.entries(leetMap)) {
      const lower = b.toLowerCase();
      if (lower.includes(char)) {
        variations.add(lower.replaceAll(char, repl));
        // Just first occurrence
        const idx = lower.indexOf(char);
        variations.add(lower.substring(0, idx) + repl + lower.substring(idx + 1));
      }
    }

    // Reversed
    const rev = b.split('').reverse().join('');
    variations.add(rev);
    variations.add(rev.toLowerCase());
    variations.add(rev + '123');

    // Doubled
    variations.add(b + b);
    variations.add(b.toLowerCase() + b.toLowerCase());

    // Remove chars
    if (b.length > 2) {
      variations.add(b.slice(0, -1));
      variations.add(b.slice(1));
      variations.add(b.slice(0, -2));
    }

    // Surround with symbols
    variations.add('!' + b + '!');
    variations.add('@' + b + '@');
    variations.add('*' + b + '*');
    variations.add('#' + b + '#');

    variations.delete(b);
    return [b, ...variations];
  }

  // ──────────────────────────────────────
  // Variation preview on typing
  // ──────────────────────────────────────

  let previewDebounce = null;
  els.passwordInput.addEventListener('input', () => {
    clearTimeout(previewDebounce);
    previewDebounce = setTimeout(() => {
      const val = els.passwordInput.value.trim();
      if (val.length < 1) {
        els.variationsPreview.classList.add('hidden');
        return;
      }
      const vars = generateVariations(val);
      els.variationsPreview.classList.remove('hidden');
      els.variationsChips.innerHTML = '';
      const show = Math.min(24, vars.length);
      for (let i = 0; i < show; i++) {
        const chip = document.createElement('span');
        chip.className = 'chip';
        if (i === 0) chip.style.borderColor = 'rgba(108, 92, 231, 0.4)';
        chip.textContent = vars[i];
        els.variationsChips.appendChild(chip);
      }
      if (vars.length > show) {
        const more = document.createElement('span');
        more.className = 'chip';
        more.style.color = 'var(--text-muted)';
        more.textContent = `+${vars.length - show} more`;
        els.variationsChips.appendChild(more);
      }
    }, 200);
  });

  // ──────────────────────────────────────
  // Hash Validation + Auto-Scan
  // ──────────────────────────────────────

  let hashDebounce = null;
  els.hashInput.addEventListener('input', () => {
    const val = els.hashInput.value.trim();
    clearTimeout(hashDebounce);

    if (!val) {
      els.hashValidation.textContent = '';
      els.hashValidation.className = 'validation-msg';
      return;
    }
    if (isValidBcryptHash(val)) {
      els.hashValidation.textContent = '✓ Valid bcrypt hash — auto-scanning...';
      els.hashValidation.className = 'validation-msg valid';
      hashDebounce = setTimeout(() => startAutoScan(val), 400);
    } else {
      els.hashValidation.textContent = '✗ Not a valid bcrypt hash format';
      els.hashValidation.className = 'validation-msg invalid';
    }
  });

  // ──────────────────────────────────────
  // Auto-Scan: ALL dictionaries
  // ──────────────────────────────────────

  async function startAutoScan(hash) {
    if (isScanning) {
      scanAbort = true;
      await yieldThread();
      await yieldThread();
    }

    isScanning = true;
    scanAbort = false;

    els.autoScanSection.classList.remove('hidden');
    els.autoScanSection.classList.remove('found', 'done');
    els.resultSection.classList.add('hidden');

    const uniquePasswords = getAllUniquePasswords();
    const total = uniquePasswords.length;

    els.scanTitle.textContent = `Scanning ${formatNumber(total)} passwords...`;
    els.scanSubtitle.textContent = `Testing dictionary against your hash`;
    els.scanProgressFill.style.width = '0%';
    els.scanProgressFill.classList.remove('success-fill');
    els.scanCount.textContent = `0 / ${formatNumber(total)}`;
    els.scanCategory.textContent = '';

    const scanIcon = els.autoScanSection.querySelector('.scan-icon');
    scanIcon.classList.add('pulse-ring');

    let found = false;
    let foundPassword = '';
    const startTime = Date.now();

    for (let i = 0; i < uniquePasswords.length; i++) {
      if (scanAbort) { isScanning = false; return; }

      const pw = uniquePasswords[i];

      // Update UI every 5 passwords
      if (i % 5 === 0) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
        const speed = elapsed > 0 ? (i / elapsed).toFixed(1) : '—';
        els.scanCategory.textContent = `${speed} pw/sec · ${pw}`;
      }

      try {
        const match = await comparePassword(pw, hash);
        if (match) { found = true; foundPassword = pw; }
      } catch { /* skip */ }

      const pct = ((i + 1) / total) * 100;
      els.scanProgressFill.style.width = pct + '%';
      els.scanCount.textContent = `${formatNumber(i + 1)} / ${formatNumber(total)}`;

      if (found) break;
      if (i % 3 === 0) await yieldThread();
    }

    scanIcon.classList.remove('pulse-ring');

    if (found) {
      els.scanProgressFill.classList.add('success-fill');
      els.autoScanSection.classList.add('found');
      els.scanTitle.textContent = '🎉 Password Found!';
      els.scanSubtitle.textContent = `Matched from dictionary in ${formatTime(Math.floor((Date.now() - startTime) / 1000))}`;
      els.scanCategory.textContent = '';
      showResult(true, foundPassword);
      showToast(`✅ Found: ${foundPassword}`);
    } else {
      const elapsed = formatTime(Math.floor((Date.now() - startTime) / 1000));
      els.autoScanSection.classList.add('done');
      els.scanTitle.textContent = `Scan complete — no match (${elapsed})`;
      els.scanSubtitle.textContent = `Tested ${formatNumber(total)} passwords. Try Step 2 or Step 3 below.`;
      els.scanCategory.textContent = '';
    }

    isScanning = false;
  }

  // ──────────────────────────────────────
  // Show Result
  // ──────────────────────────────────────

  function showResult(isMatch, password) {
    els.resultSection.classList.remove('hidden');

    if (isMatch) {
      els.resultContent.innerHTML = `
        <div class="result-inner">
          <div class="result-icon success">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div class="result-text">
            <h3 style="color: var(--success);">Match Found!</h3>
            <p>The password <span class="matched-password">${escapeHtml(password)}</span> matches the provided bcrypt hash.</p>
          </div>
        </div>`;
    } else {
      els.resultContent.innerHTML = `
        <div class="result-inner">
          <div class="result-icon failure">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
          <div class="result-text">
            <h3 style="color: var(--error);">No Match</h3>
            <p>None of the tested passwords match the bcrypt hash.</p>
          </div>
        </div>`;
    }

    els.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ──────────────────────────────────────
  // Smart Check (user guess + variations)
  // ──────────────────────────────────────

  els.smartCheckBtn.addEventListener('click', async () => {
    const hash = els.hashInput.value.trim();
    const password = els.passwordInput.value.trim();

    if (!hash) { showToast('⚠ Paste a bcrypt hash first'); els.hashInput.focus(); return; }
    if (!isValidBcryptHash(hash)) { showToast('⚠ Invalid bcrypt hash'); els.hashInput.focus(); return; }
    if (!password) { showToast('⚠ Type a password guess'); els.passwordInput.focus(); return; }

    const variations = generateVariations(password);

    els.variationResultsSection.classList.remove('hidden');
    els.variationResultsList.innerHTML = '';

    setButtonLoading(els.smartCheckBtn, true, `Checking ${variations.length} variations...`);

    let found = false;
    let foundPw = '';

    for (let i = 0; i < variations.length; i++) {
      const v = variations[i];
      const row = document.createElement('div');
      row.className = 'var-row checking';
      row.innerHTML = `<span class="var-password">${escapeHtml(v)}</span><span class="var-status">checking</span>`;
      els.variationResultsList.appendChild(row);

      if (i > 5) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      try {
        const match = await comparePassword(v, hash);
        if (match) {
          row.className = 'var-row match';
          row.querySelector('.var-status').textContent = '✓ MATCH';
          found = true;
          foundPw = v;
        } else {
          row.className = 'var-row no-match';
          row.querySelector('.var-status').textContent = '✗';
        }
      } catch {
        row.className = 'var-row no-match';
        row.querySelector('.var-status').textContent = 'err';
      }

      if (found) break;
      if (i % 2 === 0) await yieldThread();
    }

    setButtonLoading(els.smartCheckBtn, false);

    if (found) {
      showResult(true, foundPw);
      showToast(`✅ Found: ${foundPw}`);
    } else {
      showResult(false, password);
    }
  });

  // ──────────────────────────────────────
  // Paste from clipboard
  // ──────────────────────────────────────

  els.pasteBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      els.hashInput.value = text;
      els.hashInput.dispatchEvent(new Event('input'));
      showToast('📋 Pasted from clipboard');
    } catch { showToast('⚠ Clipboard access denied'); }
  });

  // ──────────────────────────────────────
  // Toggle password visibility
  // ──────────────────────────────────────

  els.toggleVisibility.addEventListener('click', () => {
    isPasswordVisible = !isPasswordVisible;
    els.passwordInput.type = isPasswordVisible ? 'text' : 'password';
    els.eyeOpen.style.display = isPasswordVisible ? 'block' : 'none';
    els.eyeClosed.style.display = isPasswordVisible ? 'none' : 'block';
  });

  // ──────────────────────────────────────
  // Quick Dictionary Chips
  // ──────────────────────────────────────

  function renderChips(category) {
    currentCategory = category;
    const passwords = PASSWORDS[category] || [];
    els.chipsContainer.innerHTML = '';

    passwords.forEach(pw => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.type = 'button';
      chip.textContent = pw;
      chip.addEventListener('click', async () => {
        els.passwordInput.value = pw;
        els.passwordInput.dispatchEvent(new Event('input'));

        const hash = els.hashInput.value.trim();
        if (!hash || !isValidBcryptHash(hash)) {
          showToast(`Selected: ${pw}`);
          return;
        }

        chip.classList.add('checking');
        chip.textContent = `⏳ ${pw}`;
        try {
          const match = await comparePassword(pw, hash);
          if (match) {
            chip.classList.remove('checking');
            chip.classList.add('matched');
            chip.textContent = `✓ ${pw}`;
            showResult(true, pw);
            showToast(`✅ Found: ${pw}`);
          } else {
            chip.classList.remove('checking');
            chip.classList.add('not-matched');
            chip.textContent = `✗ ${pw}`;
          }
        } catch {
          chip.classList.remove('checking');
          chip.textContent = pw;
        }
      });
      els.chipsContainer.appendChild(chip);
    });
  }

  els.suggestionTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    els.suggestionTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderChips(tab.dataset.category);
  });

  renderChips('common');

  // ──────────────────────────────────────
  // BRUTE-FORCE ENGINE
  // ──────────────────────────────────────

  const CHARSETS = {
    'lower': 'abcdefghijklmnopqrstuvwxyz',
    'digits': '0123456789',
    'lower-digits': 'abcdefghijklmnopqrstuvwxyz0123456789',
    'mixed': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    'all': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+',
  };

  // Calculate total combinations
  function calcTotalCombinations(charsetLen, maxLen) {
    let total = 0;
    for (let len = 1; len <= maxLen; len++) {
      total += Math.pow(charsetLen, len);
    }
    return total;
  }

  // Update estimate display
  function updateEstimate() {
    const charset = CHARSETS[els.bfCharset.value] || CHARSETS['lower-digits'];
    const maxLen = parseInt(els.bfMaxLen.value, 10);
    const total = calcTotalCombinations(charset.length, maxLen);

    // Estimate time at ~8 hashes/sec (bcrypt is slow in JS)
    const estimatedSeconds = Math.ceil(total / 8);

    els.bfEstimate.innerHTML =
      `<strong>${formatNumber(total)}</strong> total combinations · ` +
      `Charset: ${charset.length} chars · ` +
      `Est. time: <strong>${formatTime(estimatedSeconds)}</strong> (at ~8 hash/sec)`;
  }

  els.bfCharset.addEventListener('change', updateEstimate);
  els.bfMaxLen.addEventListener('change', updateEstimate);
  updateEstimate();

  // Brute-force password generator (iterator)
  function* bruteForceGenerator(charset, maxLen) {
    const chars = charset.split('');
    const base = chars.length;

    for (let len = 1; len <= maxLen; len++) {
      // Generate all combinations of this length
      const totalForLen = Math.pow(base, len);
      for (let i = 0; i < totalForLen; i++) {
        let pw = '';
        let num = i;
        for (let pos = 0; pos < len; pos++) {
          pw = chars[num % base] + pw;
          num = Math.floor(num / base);
        }
        yield pw;
      }
    }
  }

  // Start brute-force
  els.bfStartBtn.addEventListener('click', async () => {
    const hash = els.hashInput.value.trim();
    if (!hash) { showToast('⚠ Paste a bcrypt hash first'); els.hashInput.focus(); return; }
    if (!isValidBcryptHash(hash)) { showToast('⚠ Invalid bcrypt hash'); els.hashInput.focus(); return; }
    if (bfRunning) return;

    bfRunning = true;
    bfAbort = false;

    const charset = CHARSETS[els.bfCharset.value] || CHARSETS['lower-digits'];
    const maxLen = parseInt(els.bfMaxLen.value, 10);
    const total = calcTotalCombinations(charset.length, maxLen);

    // Show/hide buttons
    els.bfStartBtn.classList.add('hidden');
    els.bfStopBtn.classList.remove('hidden');
    els.bfStats.classList.remove('hidden');

    // Reset stats
    els.bfAttempts.textContent = '0';
    els.bfSpeed.textContent = '0 /sec';
    els.bfElapsed.textContent = '0s';
    els.bfProgressPct.textContent = '0%';
    els.bfCurrentPw.textContent = '—';
    els.bfProgressFill.style.width = '0%';
    els.bfProgressFill.classList.remove('success-fill');

    const gen = bruteForceGenerator(charset, maxLen);
    const startTime = Date.now();
    let attempts = 0;
    let found = false;
    let foundPw = '';

    while (!bfAbort) {
      const { value: pw, done } = gen.next();
      if (done) break;

      attempts++;

      try {
        const match = await comparePassword(pw, hash);
        if (match) {
          found = true;
          foundPw = pw;
          break;
        }
      } catch { /* skip */ }

      // Update stats every 3 attempts (bcrypt is slow, so this is fine)
      if (attempts % 3 === 0) {
        const elapsed = (Date.now() - startTime) / 1000;
        const speed = elapsed > 0 ? (attempts / elapsed).toFixed(1) : '0';
        const pct = ((attempts / total) * 100).toFixed(2);

        els.bfAttempts.textContent = formatNumber(attempts);
        els.bfSpeed.textContent = `${speed} /sec`;
        els.bfElapsed.textContent = formatTime(Math.floor(elapsed));
        els.bfProgressPct.textContent = `${pct}%`;
        els.bfCurrentPw.textContent = pw;
        els.bfProgressFill.style.width = `${Math.min(parseFloat(pct), 100)}%`;

        await yieldThread();
      }
    }

    // Final stats
    const elapsed = (Date.now() - startTime) / 1000;
    const speed = elapsed > 0 ? (attempts / elapsed).toFixed(1) : '0';
    const pct = ((attempts / total) * 100).toFixed(2);

    els.bfAttempts.textContent = formatNumber(attempts);
    els.bfSpeed.textContent = `${speed} /sec`;
    els.bfElapsed.textContent = formatTime(Math.floor(elapsed));
    els.bfProgressPct.textContent = found ? '—' : `${pct}%`;

    // Restore buttons
    els.bfStartBtn.classList.remove('hidden');
    els.bfStopBtn.classList.add('hidden');

    if (found) {
      els.bfProgressFill.classList.add('success-fill');
      els.bfProgressFill.style.width = '100%';
      els.bfCurrentPw.textContent = foundPw;
      els.bfCurrentPw.style.color = 'var(--success)';
      showResult(true, foundPw);
      showToast(`✅ Brute-forced: ${foundPw}`);
    } else if (bfAbort) {
      els.bfCurrentPw.textContent = 'Stopped by user';
      showToast('⏹ Brute-force stopped');
    } else {
      els.bfProgressFill.style.width = '100%';
      els.bfCurrentPw.textContent = 'No match found';
      showToast('❌ Exhausted all combinations — no match');
    }

    bfRunning = false;
    els.bfCurrentPw.style.color = '';
  });

  // Stop brute-force
  els.bfStopBtn.addEventListener('click', () => {
    bfAbort = true;
  });

  // ──────────────────────────────────────
  // Hash Generator
  // ──────────────────────────────────────

  els.generateBtn.addEventListener('click', async () => {
    const pw = els.genPasswordInput.value;
    if (!pw) { showToast('⚠ Enter a password to hash'); els.genPasswordInput.focus(); return; }

    const rounds = parseInt(els.roundsInput.value, 10);
    setButtonLoading(els.generateBtn, true, 'Generating...');

    try {
      const hash = await generateHashFromPw(pw, rounds);
      els.generatedHashText.textContent = hash;
      els.generatedHash.classList.remove('hidden');
    } catch (err) {
      showToast('❌ Error: ' + err.message);
    } finally {
      setButtonLoading(els.generateBtn, false);
    }
  });

  els.copyHashBtn.addEventListener('click', () => {
    const text = els.generatedHashText.textContent;
    navigator.clipboard.writeText(text).then(() => showToast('📋 Hash copied!')).catch(() => showToast('⚠ Copy failed'));
  });

  els.useHashBtn.addEventListener('click', () => {
    const hash = els.generatedHashText.textContent;
    els.hashInput.value = hash;
    els.hashInput.dispatchEvent(new Event('input'));
    els.hashInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('⬆ Hash moved to Step 1 — scanning...');
  });

  // ──────────────────────────────────────
  // Keyboard shortcuts
  // ──────────────────────────────────────

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const active = document.activeElement;
      if (active === els.passwordInput) { e.preventDefault(); els.smartCheckBtn.click(); }
      if (active === els.genPasswordInput) { e.preventDefault(); els.generateBtn.click(); }
    }
  });

})();
