/* ============================================================
   MONTHSARY LANDING PAGE — script.js
   ============================================================ */

/* ============================================================
   DATA
   ============================================================ */

const CAROUSEL_ITEMS = [
  {
    img: 'img/aqua-planet.JPG',
    gradient: 'linear-gradient(135deg, #f4a7b9 0%, #c9b8e8 100%)',
    emoji: '🌊',
    title: 'Our First Swimming',
    date: 'December 27',
    memo: 'Kabado niyan siya sa mga rides, pero nakapag-picture kasama ang baby niya.'
  },
  {
    img: 'img/azure.JPG',
    gradient: 'linear-gradient(135deg, #fce4ec 0%, #f06292 100%)',
    emoji: '🛏️',
    title: 'Our First Staycation',
    date: 'January 7',
    memo: 'Kahit super mahal ang nagastos natin babii, super saya and sulit ang araw natin na to!!'
  },
  {
    img: 'img/first-valentine.JPG',
    gradient: 'linear-gradient(135deg, #c9b8e8 0%, #7c4dff 60%, #2a1a2e 100%)',
    emoji: '✨',
    title: 'Our First Valentine Celebration',
    date: 'February 14',
    memo: 'Kahit na stressing ang grab during valentine, we celebrated our valentines with a smile and enjoyment.'
  },
  {
    img: 'img/baguio-mirror.JPG',
    gradient: 'linear-gradient(135deg, #f5efe6 0%, #f4a7b9 100%)',
    emoji: '🗺️',
    title: 'Our First Baguio Trip',
    date: 'February 28',
    memo: 'Our very first mirror shot in baguio, ito ang first photobooth picture na maayos natin.'
  },
  {
    img: 'img/coffee-date.JPG',
    gradient: 'linear-gradient(135deg, #ffd1dc 0%, #c9b8e8 100%)',
    emoji: '☕',
    title: 'Coffee Date in Baguio',
    date: 'February 28',
    memo: 'Coffee Date sa ibang lugar was a memorable experience babii, ulitin natin to ulit sa susunodd!!'
  },
  {
    img: 'img/family.JPEG',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    emoji: '🌊',
    title: 'Our Second Swimming Together',
    date: 'April 4',
    memo: 'Super saya kong comfortable kang nakikipag-bond dito babii.'
  },
  {
    img: 'img/graduation.jpg',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    emoji: '🌊',
    title: 'Your baby did it!',
    date: 'April 29',
    memo: 'The day you have a Professional IT, ikaw na next year niyan my future Nursing.'
  },
];

const FLIPCARD_ITEMS = [
  {
    img: 'img/photobooth-baguio.JPG',
    gradient: 'linear-gradient(135deg, #f4a7b9, #c9b8e8)',
    emoji: '💌',
    frontLabel: 'Very First Photobooth that we\'ve take in Baguio',
    backIcon: '🌟',
    backTitle: 'My Answered Prayer',
    backText: 'I didn\'t know it then, but meeting you was the best thing that ever happened to me. Everything after felt like a gift.'
  },
  {
    img: 'img/valentine-flowers.JPG',
    gradient: 'linear-gradient(135deg, #c9b8e8, #7c4dff)',
    emoji: '🍽️',
    frontLabel: 'Favorite Date',
    backIcon: '🥂',
    backTitle: 'A Picture that worth to remember',
    backText: 'Our very first valentine celebration as a couple, kahit na buking mga surprises and gifts ko, it\'s still worth it to celebrate our day. '
  },
  {
    img: 'img/valentine-photobooth.JPG',
    gradient: 'linear-gradient(135deg, #fce4ec, #f4a7b9)',
    emoji: '😂',
    frontLabel: 'I know ayaw mo ang picture na ito babii, pero ilalagay ko siya hehe',
    backIcon: '😅',
    backTitle: 'Still Makes Me Smile',
    backText: 'I know na ayaw mo ang picture na ito since sinasabi mong "ang panget ko diyan" pero hindi babii, you\'re beautiful kahit anong angle sa picture yan PS. sana hindi ka magalit hehehe.'
  },
  {
    img: 'img/grad-pic.JPEG',
    gradient: 'linear-gradient(135deg, #f5efe6, #c9b8e8)',
    emoji: '💛',
    frontLabel: 'I did it babii!! Ikaw na ang next niyan po',
    backIcon: '🙏',
    backTitle: 'Thank You For Everything',
    backText: 'Thank you for making ordinary days feel magical. Every laugh, every support, every conversation — with you, everything becomes something I\'ll treasure.'
  },
  {
    img: 'img/atokk.JPG',
    gradient: 'linear-gradient(135deg, #e8f5e9, #a8edea)',
    emoji: '🔭',
    frontLabel: 'Future Dreams',
    backIcon: '👣',
    backTitle: 'Everything Ahead of Us',
    backText: 'There are so many places I want to go, so many memories I want to make — and I want every single one of them to be with you.'
  },
];

const TIMELINE_ITEMS = [
  {
    date: 'Day One',
    title: 'First Conversation',
    desc: 'A simple "hello by" that opened a door to us.'
  },
  {
    date: 'Week Two',
    title: 'First Date',
    desc: 'Butterflies, warm coffee, and the feeling that time was moving both too fast, hindi natin alam kung saan tayo after natin gumala for costumes and after natin mag centro kaya we decided to watch nalang sa cine.'
  },
  {
    date: 'Week Two',
    title: 'First Photobooth Together',
    desc: 'Captured wonderful smile of yours, completely candid — my favorite photo of all time.'
  },
  {
    date: 'One Month Later',
    title: 'Spending time everyday was a butterflies in my stomach',
    desc: 'One month of learning you, laughing with you, and knowing about YOU was a wonderful experience.'
  },
  {
    date: 'June 12, 2025',
    title: 'First meeting sa family mo',
    desc: 'Kahit na day before akong pumunta ng bahay, kahit na kabado ako nung kapunta ko, kahit na nakikisabay ako sa biruan nina tito and nina ate during that day. It is a special day for us dahil dito natin malalaman if approve ako kari tito and kari ate.'
  },
  {
    date:  'October 23, 2025',
    title: 'The day na sinagot mo ako (hindi ko makakalimutan to babii hehe)',
    desc:  'The day na nakuha ko ang sagot mong "yes" babiii, super saya ko and alam kong namumula ako during that day and kahit na natae ako non. I would say na super saya ko sa time na yon dahil ikaw ang answered prayer koo, super saya ko mag mula ngayon dahil it feels like everything feels perfect in our relationship babii.'
  },
];

const LETTER_TEXT = `No matter how busy life gets, I'll always be grateful that I met someone who brings peace, happiness, and comfort into my life. You make the ordinary feel extraordinary just by being in it. Every small moment — a look, coffee date, bahay date, a laughter, a situation or a problem, a gift every moment is worth to hold forever. Tulad ng sinabi ko sayo babii, every situation we may encounter, aayusin natin yan together, magkalayo man tayo or nasa iisang bahay tayo babii you're other half is always here to support, to help and to lift you up everyday babii. Dahil you deserve to experience this treatment babii, what I've said earlier the word "perfect" I really mean it babii, ang perfect ng relationship natin wherein pinagtutulungan natin ang ano mang bagay, support each others back and the care, love, laughter is super perfect babii. Kaya thank you for choosing me, every single day na hanggang ngayon super thankful akong nakuha ko ang sagot mong "yes" nung October 23 hehehe. Here's to all the beautiful moments still ahead of us. I hope nagustuhan mo babii, more picture kukuhanin natin babii to make it as our memories! Ipapakita natin ang website na ito sa anak natin babiii para makita niya ang milestone natin every month, every journey natin every month, and every moment natin every month.`;

/* ============================================================
   PARTICLE CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H, particles = [];

  const COLORS = ['rgba(244,167,185,', 'rgba(201,184,232,', 'rgba(255,255,255,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 2 + 0.5,
      dx:    (Math.random() - 0.5) * 0.3,
      dy:   -(Math.random() * 0.4 + 0.1),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 90 }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.y < -10)   p.y = H + 10;
      if (p.x < -10)   p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

/* ============================================================
   FLOATING HEARTS (HERO)
   ============================================================ */
(function initHearts() {
  const container = document.getElementById('hearts-container');
  const SYMBOLS   = ['♥', '♡', '✦', '✿'];

  function spawnHeart() {
    const el = document.createElement('span');
    el.classList.add('heart');
    el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const left     = Math.random() * 100;
    const size     = Math.random() * 16 + 10;
    const duration = Math.random() * 10 + 8;
    const delay    = Math.random() * 6;
    const color    = Math.random() > 0.5 ? '#f4a7b9' : '#c9b8e8';

    el.style.cssText = `
      left: ${left}%;
      bottom: -20px;
      font-size: ${size}px;
      color: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(el);
    setTimeout(() => el.remove(), (duration + delay) * 1000);
  }

  // Initial burst
  for (let i = 0; i < 12; i++) spawnHeart();
  setInterval(spawnHeart, 1200);
})();

/* ============================================================
   CAROUSEL
   ============================================================ */
(function initCarousel() {
  const track    = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const btnPrev  = document.getElementById('carousel-prev');
  const btnNext  = document.getElementById('carousel-next');
  const container = track.parentElement;

  let current   = 0;
  let autoTimer = null;

  const isMobile = () => window.innerWidth <= 768;

  // Build cards
  CAROUSEL_ITEMS.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'carousel-card' + (i === 0 ? ' active' : '');
    card.innerHTML = `
      <div class="carousel-card__img-wrap">
        <img
          src="${item.img}"
          alt="${item.title}"
          loading="lazy"
          onerror="this.style.display='none';this.parentElement.style.background='${item.gradient}'"
        />
      </div>
      <div class="carousel-card__caption">
        <p class="carousel-card__date">${item.date}</p>
        <p class="carousel-card__title">${item.title}</p>
        <p class="carousel-card__memo">${item.memo}</p>
      </div>
    `;
    track.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      if (isMobile()) scrollToCard(i);
      else goTo(i);
    });
    dotsWrap.appendChild(dot);
  });

  const cards = track.querySelectorAll('.carousel-card');
  const dots  = dotsWrap.querySelectorAll('.carousel-dot');

  /* ---- Desktop: JS transform ---- */
  function getCardWidth() {
    return cards[0].offsetWidth + 24;
  }

  function goTo(index) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
    const offset = current * getCardWidth() - (container.offsetWidth / 2 - getCardWidth() / 2);
    track.style.transform = `translateX(-${Math.max(0, offset)}px)`;
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  btnNext.addEventListener('click', () => { clearInterval(autoTimer); next(); resetAuto(); });
  btnPrev.addEventListener('click', () => { clearInterval(autoTimer); prev(); resetAuto(); });

  function resetAuto() {
    autoTimer = setInterval(() => { if (!isMobile()) next(); }, 4000);
  }

  /* ---- Mobile: native scroll snap ---- */
  function scrollToCard(index) {
    const card = cards[index];
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
  }

  // Update dots on mobile scroll
  container.addEventListener('scroll', () => {
    if (!isMobile()) return;
    const scrollLeft = container.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - 20 - scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    if (closest !== current) {
      dots[current].classList.remove('active');
      cards[current].classList.remove('active');
      current = closest;
      dots[current].classList.add('active');
      cards[current].classList.add('active');
    }
  }, { passive: true });

  resetAuto();
})();

/* ============================================================
   FLIP CARDS
   ============================================================ */
(function initFlipCards() {
  const grid = document.getElementById('flipcard-grid');

  FLIPCARD_ITEMS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-card__inner">
        <div class="flip-card__front">
          <img
            class="flip-card__front-img"
            src="${item.img}"
            alt="${item.frontLabel}"
            loading="lazy"
            onerror="this.style.display='none';this.parentElement.style.background='${item.gradient}'"
          />
          <div class="flip-card__front-overlay">
            <span class="flip-card__front-label">${item.frontLabel}</span>
          </div>
        </div>
        <div class="flip-card__back">
          <div class="flip-card__back-icon">${item.backIcon}</div>
          <p class="flip-card__back-title">${item.backTitle}</p>
          <p class="flip-card__back-text">${item.backText}</p>
        </div>
      </div>
    `;

    // Mobile: click to flip
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
  });
})();

/* ============================================================
   TIMELINE
   ============================================================ */
(function initTimeline() {
  const list = document.getElementById('timeline-list');

  TIMELINE_ITEMS.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item reveal';
    el.innerHTML = `
      <div class="timeline-item__content">
        <p class="timeline-item__date">${item.date}</p>
        <h3 class="timeline-item__title">${item.title}</h3>
        <p class="timeline-item__desc">${item.desc}</p>
      </div>
      <div class="timeline-item__dot"></div>
      <div style="flex:1"></div>
    `;
    list.appendChild(el);
  });
})();

/* ============================================================
   TYPEWRITER — LOVE LETTER
   ============================================================ */
(function initTypewriter() {
  const el      = document.getElementById('letter-text');
  let charIndex = 0;
  let started   = false;

  function type() {
    if (charIndex < LETTER_TEXT.length) {
      el.textContent += LETTER_TEXT[charIndex++];
      setTimeout(type, 28);
    } else {
      el.classList.add('done');
    }
  }

  // Start when letter section enters viewport
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      setTimeout(type, 600);
    }
  }, { threshold: 0.3 });

  const section = document.getElementById('letter');
  if (section) observer.observe(section);
})();

/* ============================================================
   MUSIC PLAYER
   ============================================================ */
(function initMusicPlayer() {
  const toggle  = document.getElementById('music-toggle');
  const icon    = document.getElementById('music-icon');
  const vinyl   = document.getElementById('vinyl');
  const audio   = document.getElementById('bg-music');

  let playing = false;

  toggle.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      vinyl.classList.remove('spinning');
      icon.textContent = '▶';
    } else {
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          vinyl.classList.add('spinning');
          icon.textContent = '⏸';
        }).catch(() => {
          // No audio src — gracefully do nothing
        });
      }
      vinyl.classList.add('spinning');
      icon.textContent = '⏸';
    }
    playing = !playing;
  });
})();

/* ============================================================
   ENDING — STARS
   ============================================================ */
(function initStars() {
  const container = document.getElementById('ending-stars');
  const COUNT     = 80;

  for (let i = 0; i < COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size   = Math.random() * 3 + 1;
    const left   = Math.random() * 100;
    const top    = Math.random() * 100;
    const dur    = Math.random() * 3 + 2;
    const delay  = Math.random() * 4;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: ${top}%;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(star);
  }

  // CTA interaction
  document.getElementById('ending-cta').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   INTERSECTION OBSERVER — SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  // Observe all .reveal elements (added dynamically, use MutationObserver to catch them)
  function observeAll() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  observeAll();

  // Also observe section headers
  document.querySelectorAll('.section__header, .flip-card, .carousel-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

/* ============================================================
   PARALLAX HERO (subtle)
   ============================================================ */
(function initParallax() {
  const hero = document.getElementById('hero');
  const overlay = hero.querySelector('.hero__bg-overlay');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      overlay.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
})();
/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
(function initCountdown() {
  // ── Set your anniversary / start date here ──
  const START = new Date('2025-10-23T00:00:00');

  const elYears   = document.getElementById('ct-years');
  const elMonths  = document.getElementById('ct-months');
  const elDays    = document.getElementById('ct-days');
  const elHours   = document.getElementById('ct-hours');
  const elMins    = document.getElementById('ct-minutes');
  const elSecs    = document.getElementById('ct-seconds');
  const elTotal   = document.getElementById('ct-total-days');
  const elMile    = document.getElementById('ct-next-milestone');

  if (!elYears) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick(el, val) {
    const str = pad(val);
    if (el.textContent !== str) {
      el.textContent = str;
      el.classList.remove('tick');
      // Force reflow then re-add for animation
      void el.offsetWidth;
      el.classList.add('tick');
      setTimeout(() => el.classList.remove('tick'), 260);
    }
  }

  function getNextMilestone(totalDays) {
    // Milestones: every 100 days, every anniversary year
    const milestones = [];
    for (let i = 100; i <= totalDays + 400; i += 100) milestones.push(i);
    for (let y = 1; y <= 10; y++) milestones.push(y * 365);
    milestones.sort((a, b) => a - b);
    const next = milestones.find(m => m > totalDays);
    if (!next) return null;
    return { days: next - totalDays, label: next % 365 === 0 ? `${next / 365} year${next / 365 > 1 ? 's' : ''} together` : `${next} days together` };
  }

  function update() {
    const now   = new Date();
    const diff  = now - START;      // ms

    if (diff < 0) {
      // Relationship hasn't started yet according to dates — show zeroes
      [elYears, elMonths, elDays, elHours, elMins, elSecs].forEach(el => el.textContent = '00');
      elTotal.textContent = '0 days together';
      elMile.textContent  = 'The story begins soon ✨';
      return;
    }

    // Total days (floor)
    const totalDays = Math.floor(diff / 86400000);

    // Years / remaining months / remaining days
    const s   = START;
    const n   = now;
    let years = n.getFullYear() - s.getFullYear();
    let months = n.getMonth() - s.getMonth();
    let days  = n.getDate() - s.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prev = new Date(n.getFullYear(), n.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) { years--; months += 12; }

    // Hours / minutes / seconds from the ms remainder
    const msInDay = diff % 86400000;
    const hours   = Math.floor(msInDay / 3600000);
    const minutes = Math.floor((msInDay % 3600000) / 60000);
    const seconds = Math.floor((msInDay % 60000) / 1000);

    tick(elYears,  years);
    tick(elMonths, months);
    tick(elDays,   days);
    tick(elHours,  hours);
    tick(elMins,   minutes);
    tick(elSecs,   seconds);

    // Pills
    elTotal.textContent = `${totalDays.toLocaleString()} days together`;

    const mile = getNextMilestone(totalDays);
    if (mile) {
      elMile.textContent = `${mile.days} day${mile.days !== 1 ? 's' : ''} to ${mile.label}`;
    }
  }

  update();
  setInterval(update, 1000);
})();

/* ============================================================
   SCRATCH CARD
   ============================================================ */
(function initScratchCard() {
  const wrap    = document.querySelector('.scratch-card-wrap');
  const canvas  = document.getElementById('scratch-canvas');
  const ctx     = canvas.getContext('2d');
  const hint    = document.getElementById('scratch-hint');
  const doneBanner = document.getElementById('scratch-done');
  const resetBtn   = document.getElementById('scratch-reset');
  const reveal  = document.getElementById('scratch-reveal');
  const overlay = reveal.querySelector('.scratch-reveal__overlay');

  // Texture colors to mimic the deep-rose fabric look from the screenshot
  const COVER_COLOR = '#9b1a3c'; // deep rose/crimson — matches screenshot

  let isDrawing   = false;
  let hasStarted  = false;
  let isComplete  = false;
  let checkTimer  = null;

  /* ── Setup ── */
  function setupCanvas() {
    const rect = wrap.getBoundingClientRect();
    canvas.width  = rect.width  || 340;
    canvas.height = rect.height || 480;

    // Fill with cover color
    ctx.fillStyle = COVER_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle noise/texture overlay
    addTextureNoise();

    // Reset state
    isComplete = false;
    hasStarted = false;
    hint.classList.remove('hidden');
    doneBanner.classList.remove('visible');
    overlay.classList.remove('visible');
  }

  // Draw subtle dot-noise texture like the fabric in the screenshot
  function addTextureNoise() {
    ctx.save();
    for (let i = 0; i < canvas.width * canvas.height * 0.004; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.2;
      const alpha = Math.random() * 0.18;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }
    ctx.restore();
  }

  /* ── Drawing ── */
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY
    };
  }

  function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault();

    if (!hasStarted) {
      hasStarted = true;
      hint.classList.add('hidden');
    }

    const pos = getPos(e);

    // Use destination-out to erase the cover, revealing image beneath
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();

    // Slightly larger brush on touch
    const radius = e.touches ? 38 : 30;

    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Add soft feathered edge
    const grad = ctx.createRadialGradient(pos.x, pos.y, radius * 0.4, pos.x, pos.y, radius);
    grad.addColorStop(0,   'rgba(0,0,0,1)');
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';

    // Throttle coverage check
    clearTimeout(checkTimer);
    checkTimer = setTimeout(checkCoverage, 120);
  }

  /* ── Coverage Check ── */
  function checkCoverage() {
    if (isComplete) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let cleared = 0;
    // Sample every 4th pixel for perf
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] < 128) cleared++;
    }
    const total = (data.length / 16);
    const pct   = cleared / total;

    if (pct > 0.55) { // 55% cleared → fully reveal
      completeReveal();
    }
  }

  function completeReveal() {
    isComplete = true;
    // Fade out remaining cover
    let alpha = 1;
    const fade = setInterval(() => {
      alpha -= 0.06;
      if (alpha <= 0) {
        alpha = 0;
        clearInterval(fade);
        canvas.style.display = 'none';
        doneBanner.classList.add('visible');
        overlay.classList.add('visible');
      }
      ctx.globalAlpha = alpha;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = COVER_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      addTextureNoise();
      ctx.globalAlpha = 1;
    }, 30);
  }

  /* ── Event Listeners ── */
  canvas.addEventListener('mousedown',  e => { isDrawing = true; scratch(e); });
  canvas.addEventListener('mousemove',  e => { if (isDrawing) scratch(e); });
  canvas.addEventListener('mouseup',    () => { isDrawing = false; });
  canvas.addEventListener('mouseleave', () => { isDrawing = false; });

  canvas.addEventListener('touchstart', e => { isDrawing = true; scratch(e); }, { passive: false });
  canvas.addEventListener('touchmove',  e => { if (isDrawing) scratch(e); },   { passive: false });
  canvas.addEventListener('touchend',   () => { isDrawing = false; });

  /* ── Reset ── */
  resetBtn.addEventListener('click', () => {
    canvas.style.display = 'block';
    setupCanvas();
  });

  /* ── Init on load ── */
  // Wait for wrap to have dimensions
  if (wrap.getBoundingClientRect().width > 0) {
    setupCanvas();
  } else {
    window.addEventListener('load', setupCanvas);
  }
})();
