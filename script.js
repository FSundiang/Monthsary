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
    img: 'img/graduation-1.jpg',
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