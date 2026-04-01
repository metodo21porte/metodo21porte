/* ── Numerology helpers ───────────────────────────────── */

function reduceToSingle(n) {
  let x = Math.abs(Math.round(n));
  while (x > 9) x = String(x).split('').reduce((a,b) => a + Number(b), 0);
  return x || 1;
}

function letterValue(ch) {
  const c = ch.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const i = 'abcdefghijklmnopqrstuvwxyz'.indexOf(c);
  return i >= 0 ? i + 1 : 0;
}

function calcDestiny(birthDate) {
  const digits = birthDate.replace(/-/g,'').split('').map(Number);
  return reduceToSingle(digits.reduce((a,b) => a+b, 0));
}

function calcSoul(name) {
  const vowels = name.toLowerCase().match(/[aeiouàèéìòù]/g) || [];
  const total  = vowels.reduce((s,ch) => s + letterValue(ch), 0);
  return reduceToSingle(total || 6);
}

function calcPersonalYear(birthDate, year) {
  const parts = birthDate.split('-');
  const d = parseInt(parts[2], 10);
  const m = parseInt(parts[1], 10);
  const digits = [...String(d), ...String(m), ...String(year)].map(Number);
  return reduceToSingle(digits.reduce((a,b) => a+b, 0));
}

function calcZodiac(birthDate) {
  const parts = birthDate.split('-');
  const mmdd  = parts[1] + '-' + parts[2];
  let sign = SIGNS.find(s => {
    if (s.start > s.end) return mmdd >= s.start || mmdd <= s.end;
    return mmdd >= s.start && mmdd <= s.end;
  });
  return sign || SIGNS[2];
}

function calcTaoKi(birthDate) {
  const year   = parseInt(birthDate.split('-')[0], 10);
  const number = (year % 9) || 9;
  return { number, ...TAO_KI[number] };
}

function getPlaceElement(place) {
  const vowel = (place.toLowerCase().match(/[aeiou]/) || ['a'])[0];
  return PLACE_EL[vowel] || 'Acqua';
}

/* ── Door helpers ─────────────────────────────────────── */

function getMainDoor(destiny, soul) {
  const id = ((destiny + soul - 1) % 21) + 1;
  return DOORS.find(d => d.id === id) || DOORS[0];
}

function getSecondaryDoors(destiny, soul, year) {
  const ids = [
    destiny,
    ((soul   + 3 - 1) % 21) + 1,
    ((year   + 6 - 1) % 21) + 1,
  ];
  return ids.map(id => DOORS.find(d => d.id === id)).filter(Boolean);
}

function getUniqueDoors(candidates, max) {
  const seen = new Set();
  const out  = [];
  for (const d of candidates) {
    if (!seen.has(d.id)) { seen.add(d.id); out.push(d); }
    if (out.length === max) break;
  }
  return out;
}

/* ── Generate ─────────────────────────────────────────── */

function generatePersonal(userData) {
  const destiny    = calcDestiny(userData.birthDate);
  const soul       = calcSoul(userData.name);
  const year       = calcPersonalYear(userData.birthDate, new Date().getFullYear());
  const zodiac     = calcZodiac(userData.birthDate);
  const taoKi      = calcTaoKi(userData.birthDate);
  const mainDoor   = getMainDoor(destiny, soul);
  const secondaryDoors = getUniqueDoors(getSecondaryDoors(destiny, soul, year), 4);

  return {
    user: userData,
    tarotZero: {
      title: 'Il Viandante',
      text:  'Tu sei il Viandante del tuo percorso. Non sei una definizione fissa. Sei un essere in evoluzione. Le Porte rappresentano le tappe del tuo cammino.',
    },
    mainDoor,
    secondaryDoors,
    symbolicElement: getPlaceElement(userData.birthPlace || 'a'),
    numbers: { destiny, soul, year },
    zodiac,
    taoKi,
  };
}

/* ── WhatsApp messages ────────────────────────────────── */

function waPersonalMsg(r) {
  return encodeURIComponent(
    `🌟 RICHIESTA PERSONAL EVOLUTIVO COMPLETO — 30€\n\n` +
    `👤 Nome: ${r.user.name}\n` +
    `📅 Data: ${r.user.birthDate}\n` +
    `🕐 Ora: ${r.user.birthTime || 'non inserita'}\n` +
    `📍 Luogo: ${r.user.birthPlace || 'non inserito'}\n` +
    `🚪 Porta principale: ${r.mainDoor.id} – ${r.mainDoor.name}\n\n` +
    `Ho già pagato su PayPal! Sono pronta per il mio Personal 💜`
  );
}

function waSinastriaMsg(r) {
  return encodeURIComponent(
    `🌟 RICHIESTA SINASTRIA DI COPPIA — 60€\n\n` +
    `👤 Nome: ${r.user.name}\n` +
    `📅 Data: ${r.user.birthDate}\n` +
    `🕐 Ora: ${r.user.birthTime || 'non inserita'}\n` +
    `📍 Luogo: ${r.user.birthPlace || 'non inserito'}\n` +
    `🚪 Porta principale: ${r.mainDoor.id} – ${r.mainDoor.name}\n\n` +
    `Ho già pagato su PayPal! Sono pronta per la Sinastria di coppia 💜`
  );
}

/* ── Render result ────────────────────────────────────── */

function doorCardHTML(label, door) {
  return `
    <div class="r-card">
      <div class="r-eyebrow">${label}</div>
      <div class="r-title">${door.name}</div>
      <div class="r-tarot">Tarocco collegato: ${door.tarot}</div>
      <p class="r-text" style="margin-bottom:.5rem">
        <span class="luce">Luce:</span> ${door.light}<br/>
        <span class="ombra">Ombra:</span> ${door.shadow}
      </p>
      <div class="r-key"><strong>✨ Chiave evolutiva</strong>${door.key}</div>
    </div>`;
}

function renderResult(r) {
  const d = r.numbers;
  const destinyData = DESTINY[d.destiny] || DESTINY[1];
  const soulText    = SOUL[d.soul]       || SOUL[1];
  const yearData    = YEAR_TEXTS[d.year] || YEAR_TEXTS[1];
  const now         = new Date();

  const timelineParts = [0,1,2].map(i => {
    const n  = ((d.year + i - 1) % 9) + 1;
    const yt = YEAR_TEXTS[n] || YEAR_TEXTS[1];
    const mo = MONTHS[(now.getMonth() + i) % 12];
    return `
      <div class="timeline-item">
        <strong>${mo} — ${yt[0]}</strong>
        <div class="tl-desc">${yt[1]}</div>
        <div class="tl-key">✨ ${yt[2]}</div>
      </div>`;
  }).join('');

  const secondaryHTML = r.secondaryDoors.map((door, i) => {
    const labels = ['Prima energia attiva','Seconda energia attiva','Terza energia attiva','Quarta energia attiva'];
    return doorCardHTML(labels[i] || `Energia ${i+1}`, door);
  }).join('');

  return `
    <!-- Header -->
    <div class="result-header">
      <div class="badge">✦ IL TUO PERSONAL EVOLUTIVO ✦</div>
      <div class="user-name">${r.user.name.toUpperCase()}</div>
      <div class="meta">${r.user.birthDate}${r.user.birthTime ? ' · ' + r.user.birthTime : ''}${r.user.birthPlace ? ' · ' + r.user.birthPlace : ''}</div>
    </div>

    <!-- Tarocco 0 -->
    <div class="r-card">
      <div class="r-eyebrow">☆ Tarocco 0 — ${r.tarotZero.title}</div>
      <p class="r-text" style="margin-bottom:.75rem">${r.tarotZero.text}</p>
      <p style="font-size:.9rem;font-style:italic;color:var(--primary)">✨ Tu non sei la Porta… sei colui che la attraversa.</p>
    </div>

    <!-- Porta principale -->
    ${doorCardHTML('Porta Principale', r.mainDoor)}

    <!-- Energie attive -->
    <div class="r-card">
      <div class="section-title">Le tue energie attive</div>
      ${secondaryHTML}
    </div>

    <!-- Codici numerici -->
    <div class="r-card">
      <div class="section-title">I tuoi codici numerici</div>
      <div class="r-grid">
        <div class="r-cell">
          <h4>Numero del Destino</h4>
          <div class="num">${d.destiny}</div>
          <p style="font-weight:600;color:var(--fg);margin-bottom:.2rem">${destinyData.title}</p>
          <p>${destinyData.text}</p>
        </div>
        <div class="r-cell">
          <h4>Numero dell'Anima</h4>
          <div class="num" style="color:var(--accent)">${d.soul}</div>
          <p>${soulText}</p>
        </div>
        <div class="r-cell">
          <h4>Anno Personale ${now.getFullYear()}</h4>
          <div class="num" style="color:var(--gold)">${d.year}</div>
          <p style="font-weight:600;color:var(--fg);margin-bottom:.2rem">${yearData[0]}</p>
          <p>${yearData[1]}</p>
        </div>
        <div class="r-cell">
          <h4>Elemento simbolico</h4>
          <div class="num" style="font-size:1.5rem;padding-top:.4rem">${r.symbolicElement === 'Fuoco' ? '🔥' : r.symbolicElement === 'Acqua' ? '💧' : r.symbolicElement === 'Aria' ? '🌬' : r.symbolicElement === 'Etere' ? '✨' : '🌍'}</div>
          <p>${r.symbolicElement}</p>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="r-card">
      <div class="section-title">Timeline — prossimi 3 mesi</div>
      <p style="font-size:.75rem;color:var(--muted);margin-bottom:1rem">Anteprima basata sul tuo Anno Personale ${d.year}</p>
      ${timelineParts}
    </div>

    <!-- Astrologia -->
    <div class="r-card">
      <div class="section-title">Astrologia</div>
      <div class="r-eyebrow">${r.zodiac.element}</div>
      <div class="r-title" style="margin-bottom:.5rem">${r.zodiac.name}</div>
      <p class="r-text">${r.zodiac.text}</p>
    </div>

    <!-- Tao Ki -->
    <div class="r-card">
      <div class="section-title">Tao Ki — 9 Stelle</div>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.75rem">
        <span style="font-family:var(--font-display);font-size:3rem;color:var(--accent);opacity:.7;line-height:1">${r.taoKi.number}</span>
        <div>
          <div class="r-eyebrow">${r.taoKi.element}</div>
          <div class="r-title" style="font-size:1.2rem">${r.taoKi.title}</div>
        </div>
      </div>
      <p class="r-text" style="margin-bottom:.4rem">${r.taoKi.text}</p>
      <p style="font-size:.8rem;color:var(--accent);font-style:italic">✦ Direzione: ${r.taoKi.direction}</p>
    </div>

    <!-- Upgrade / CTA -->
    <div class="upgrade-wrap">
      <div class="upgrade-header">
        <p>Hai visto la tua soglia iniziale.</p>
        <p>Il Personal Evolutivo completo approfondisce il disegno del tuo percorso.</p>
      </div>

      <div class="offers-grid">
        <div class="offer-col">
          <div class="offer-label">🔮 Personal Evolutivo</div>
          <div class="offer-price green">30€</div>
          <a class="cta-link paypal" href="${PAYPAL_PERSONAL}" target="_blank">Paga con PayPal</a>
          <a class="cta-link whatsapp" id="waPersonalBtn" href="#" target="_blank">Scrivimi su WhatsApp</a>
        </div>
        <div class="offer-col">
          <div class="offer-label">💞 Sinastria di Coppia</div>
          <div class="offer-price violet">60€</div>
          <a class="cta-link paypal" href="${PAYPAL_SINASTRIA}" target="_blank">Paga con PayPal</a>
          <a class="cta-link whatsapp" id="waSinastriaBtn" href="#" target="_blank">Scrivimi su WhatsApp</a>
        </div>
      </div>
    </div>`;
}

/* ── DOM init ─────────────────────────────────────────── */

(function() {
  const form        = document.getElementById('personalForm');
  const formSection = document.getElementById('formSection');
  const resultSec   = document.getElementById('resultSection');
  const resultCont  = document.getElementById('resultContent');
  const backBtn     = document.getElementById('backBtn');

  let currentResult = null;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const userData = {
      name:       document.getElementById('name').value.trim(),
      birthDate:  document.getElementById('birthDate').value,
      birthTime:  document.getElementById('birthTime').value,
      birthPlace: document.getElementById('birthPlace').value.trim(),
    };

    if (!userData.name || !userData.birthDate) return;

    currentResult = generatePersonal(userData);
    resultCont.innerHTML = renderResult(currentResult);

    // Wire WA links (set href directly on the anchor)
    document.getElementById('waPersonalBtn').href  = `https://wa.me/${WHATSAPP_NUM}?text=${waPersonalMsg(currentResult)}`;
    document.getElementById('waSinastriaBtn').href = `https://wa.me/${WHATSAPP_NUM}?text=${waSinastriaMsg(currentResult)}`;

    formSection.classList.add('hidden');
    resultSec.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  backBtn.addEventListener('click', function() {
    resultSec.classList.add('hidden');
    formSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Fade-in observer ─────────────────────────────────── */
(function() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });
})();
