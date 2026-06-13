// ─── HORÁRIOS ─────────────────────────────────────────────
const horarios = [
  { dia: 'Domingo',  abre: null,    fecha: null,    fechado: true },
  { dia: 'Segunda',  abre: '10:00', fecha: '20:00' },
  { dia: 'Terça',    abre: '10:00', fecha: '20:00' },
  { dia: 'Quarta',   abre: '10:00', fecha: '20:00' },
  { dia: 'Quinta',   abre: '10:00', fecha: '20:00' },
  { dia: 'Sexta',    abre: '10:00', fecha: '20:00' },
  { dia: 'Sábado',   abre: '10:00', fecha: '18:00' },
];

function getProximoDiaUtil(diaAtualIdx) {
  for (let i = 1; i <= 7; i++) {
    const nextIdx = (diaAtualIdx + i) % 7;
    const h = horarios[nextIdx];
    if (!h.fechado) {
      if (i === 1) return 'amanhã';
      return `${h.dia === 'Sábado' ? 'no Sábado' : `na ${h.dia}`}`;
    }
  }
  return 'em breve';
}

function renderHorarios() {
  const now       = new Date();
  const diaSemana = now.getDay();
  const horaAtual = now.getHours() * 60 + now.getMinutes();
  const diasOrdem = [1, 2, 3, 4, 5, 6, 0];
  const grid      = document.getElementById('horariosGrid');
  if (!grid) return;
  grid.innerHTML = '';

  diasOrdem.forEach(idx => {
    const h      = horarios[idx];
    const isHoje = idx === diaSemana;

    const card = document.createElement('div');
    card.className = 'horario-card' + (isHoje ? ' hoje' : '');

    if (h.fechado) {
      card.innerHTML = `
        <div><span class="dia-nome">${h.dia}${isHoje ? '<span class="hoje-badge">Hoje</span>' : ''}</span></div>
        <span class="horario-hora" style="color:#e74c3c;">Fechado</span>
      `;
      grid.appendChild(card);
      if (isHoje) {
        const bar = document.querySelector('.status-bar');
        const txt = document.getElementById('statusText');
        if (bar && txt) {
          bar.className = 'status-bar status-closed';
          txt.textContent = `Fechado hoje · Voltamos ${getProximoDiaUtil(idx)}`;
        }
      }
      return;
    }

    const [aH, aM] = h.abre.split(':').map(Number);
    const [fH, fM] = h.fecha.split(':').map(Number);
    const abreMin  = aH * 60 + aM;
    const fechaMin = fH * 60 + fM;
    const aberto   = isHoje && horaAtual >= abreMin && horaAtual < fechaMin;

    card.innerHTML = `
      <div><span class="dia-nome">${h.dia}${isHoje ? '<span class="hoje-badge">Hoje</span>' : ''}</span></div>
      <span class="horario-hora">${h.abre} – ${h.fecha}</span>
    `;
    grid.appendChild(card);

    if (isHoje) {
      const bar = document.querySelector('.status-bar');
      const txt = document.getElementById('statusText');
      if (bar && txt) {
        if (aberto) {
          bar.className = 'status-bar status-open';
          txt.textContent = `Aberto agora · Fechamos às ${h.fecha}`;
        } else if (horaAtual < abreMin) {
          bar.className = 'status-bar status-closed';
          txt.textContent = `Fechado · Abrimos hoje às ${h.abre}`;
        } else {
          bar.className = 'status-bar status-closed';
          txt.textContent = `Fechado · Voltamos ${getProximoDiaUtil(idx)}`;
        }
      }
    }
  });
}

// ─── EQUIPE ───────────────────────────────────────────────
// Para adicionar foto real: troque foto: null por foto: 'imagens/nome-artista.jpg'
// Para adicionar Instagram: troque insta: null por insta: 'https://instagram.com/handle'
const equipe = [
  {
    nome: 'André Silva',
    titulo: 'Fundador · Especialista Blackwork',
    bio: 'Mais de 8 anos de traço. Criador do studio, referência em blackwork geométrico e tribal na região.',
    tags: ['Blackwork', 'Geométrico', 'Tribal'],
    foto: null,       // troque por: 'imagens/andre.jpg'
    insta: null,      // troque por: 'https://instagram.com/andreink'
    whatsapp: '5592900000001',
  },
  {
    nome: 'Camila Rocha',
    titulo: 'Fine Line & Aquarela',
    bio: 'Delicadeza no traço, precisão nos detalhes. Especialista em florais, mandalas e aquarela.',
    tags: ['Fine Line', 'Aquarela', 'Floral'],
    foto: null,
    insta: null,
    whatsapp: '5592900000002',
  },
  {
    nome: 'Lucas Mendes',
    titulo: 'Realismo P&B e Colorido',
    bio: 'Realismo é compromisso com o detalhe. Retratos, animais e cenas que parecem fotografia na pele.',
    tags: ['Realismo', 'Retrato', 'Colorido'],
    foto: null,
    insta: null,
    whatsapp: '5592900000003',
  },
  {
    nome: 'Tatiana Luz',
    titulo: 'Oriental & Neo-tradicional',
    bio: 'Influências do oriente encontram o traço moderno. Carpas, flores de cerejeira e composições autorais.',
    tags: ['Oriental', 'Neo-trad', 'Colorido'],
    foto: null,
    insta: null,
    whatsapp: '5592900000004',
  },
  {
    nome: 'Rafael Costa',
    titulo: 'Piercer Profissional',
    bio: 'Especialista em perfurações corporais com foco em segurança, higiene e estética. Orelha, nariz, septo, umbigo e muito mais — com joias de titânio e aço cirúrgico.',
    tags: ['Piercing', 'Titânio', 'Joias Corporais'],
    tipoProfissional: 'piercing', // identifica visualmente no badge
    foto: null,       // troque por: 'imagens/rafael.jpg'
    insta: null,      // troque por: 'https://instagram.com/rafaelpierce'
    whatsapp: '5592900000005',
  },
];

// SVG de pessoa placeholder
const avatarSVG = (iniciais) => `
  <div class="artista-avatar">${iniciais}</div>
`;

// Ícone Instagram SVG
const igIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="2" y="2" width="20" height="20" rx="5"/>
  <circle cx="12" cy="12" r="4"/>
  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
</svg>`;

// Ícone WhatsApp SVG
const waIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>`;

function renderEquipe() {
  const grid = document.getElementById('equipeGrid');
  if (!grid) return;
  grid.innerHTML = '';

  equipe.forEach(a => {
    const iniciais = a.nome.split(' ').map(p => p[0]).slice(0, 2).join('');
    const tagsBadge = a.tags[0];
    const isPiercer = a.tipoProfissional === 'piercing';
    const badgeClass = isPiercer ? 'artista-badge artista-badge--piercing' : 'artista-badge';
    const ctaTexto   = isPiercer ? `Agendar com ${a.nome.split(' ')[0]}` : `Falar com ${a.nome.split(' ')[0]}`;
    const ctaMsg     = isPiercer
      ? `Olá%20${encodeURIComponent(a.nome.split(' ')[0])}!%20Vi%20o%20site%20e%20quero%20agendar%20um%20piercing`
      : `Olá%20${encodeURIComponent(a.nome.split(' ')[0])}!%20Vi%20o%20site%20e%20quero%20fazer%20um%20orçamento`;

    const fotoHTML = a.foto
      ? `<img src="${a.foto}" alt="${a.nome}">`
      : avatarSVG(iniciais);

    const socialLinks = [];
    if (a.insta) socialLinks.push(`<a href="${a.insta}" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram de ${a.nome}">${igIcon}</a>`);
    socialLinks.push(`<a href="https://wa.me/${a.whatsapp}?text=${ctaMsg}" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp de ${a.nome}">${waIcon}</a>`);

    const card = document.createElement('div');
    card.className = isPiercer ? 'artista-card artista-card--piercing' : 'artista-card';
    card.innerHTML = `
      <div class="artista-foto">
        ${fotoHTML}
        <span class="${badgeClass}">${tagsBadge}</span>
        <div class="artista-social">${socialLinks.join('')}</div>
      </div>
      <div class="artista-info">
        <div class="artista-nome">${a.nome}</div>
        <div class="artista-titulo ${isPiercer ? 'artista-titulo--piercing' : ''}">${a.titulo}</div>
        <p class="artista-bio">${a.bio}</p>
        <div class="artista-tags">
          ${a.tags.map(t => `<span class="artista-tag">${t}</span>`).join('')}
        </div>
        <div class="artista-cta">
          <a href="https://wa.me/${a.whatsapp}?text=${ctaMsg}" target="_blank" rel="noopener noreferrer" class="btn ${isPiercer ? 'btn-ghost btn-ghost--piercing' : 'btn-ghost'}">
            ${ctaTexto}
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ─── PORTFÓLIO / ESTILOS ──────────────────────────────────
const iconBlackwork = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="28" stroke="currentColor" stroke-width="1.5"/>
  <path d="M40 12 L40 68 M12 40 L68 40 M19 19 L61 61 M61 19 L19 61" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <circle cx="40" cy="40" r="8" stroke="currentColor" stroke-width="1.5"/>
</svg>`;

const iconFineline = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 60 C 30 20, 50 20, 60 60" stroke="currentColor" stroke-width="0.8"/>
  <path d="M25 50 C 35 25, 45 25, 55 50" stroke="currentColor" stroke-width="0.5" opacity="0.5"/>
  <path d="M40 18 L 40 62" stroke="currentColor" stroke-width="0.8"/>
  <circle cx="40" cy="16" r="2" fill="currentColor" opacity="0.5"/>
</svg>`;

const iconRealismo = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="18" y="18" width="44" height="44" rx="2" stroke="currentColor" stroke-width="1"/>
  <path d="M18 50 L35 35 L48 46 L58 36 L62 40" stroke="currentColor" stroke-width="1" opacity="0.6"/>
  <circle cx="30" cy="30" r="5" stroke="currentColor" stroke-width="0.8"/>
</svg>`;

const iconAquarela = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 55 Q 30 20, 40 25 Q 50 30, 45 55 Q 40 70, 35 60 Q 30 50, 20 55Z" stroke="currentColor" stroke-width="0.8" opacity="0.7"/>
  <path d="M40 25 Q 55 15, 62 35 Q 68 50, 55 55" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
</svg>`;

const iconOriental = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 15 C 20 25, 15 45, 25 55 C 35 65, 55 60, 60 45 C 65 30, 55 15, 40 15Z" stroke="currentColor" stroke-width="0.8" opacity="0.6"/>
  <path d="M30 50 C 35 30, 50 28, 52 42" stroke="currentColor" stroke-width="0.6" opacity="0.5"/>
  <circle cx="40" cy="38" r="4" stroke="currentColor" stroke-width="0.8"/>
</svg>`;
const iconPiercing = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 40 20 A 20 20 0 1 1 32 56.5" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.8"/>
  <circle cx="40" cy="57" r="4" stroke="currentColor" stroke-width="0.8" fill="none"/>
  <path d="M 48 26 A 13 13 0 0 1 53 43" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
</svg>`;

// Para adicionar foto real: troque img: null por img: 'imagens/portfolio/nome.jpg'
// O campo artista associa o trabalho a um membro da equipe (opcional)
const portfolio = [
  { nome: 'Mandala Geométrica',  cat: 'blackwork', icon: iconBlackwork, img: null, artista: 'André Silva',   desc: 'Simetria perfeita, preto sólido e traço limpo.',       preco: 'A partir de R$ 250' },
  { nome: 'Tribal Polinésio',    cat: 'blackwork', icon: iconBlackwork, img: null, artista: 'André Silva',   desc: 'Padrões inspirados em culturas ancestrais do Pacífico.', preco: 'A partir de R$ 200' },
  { nome: 'Floral Fino',         cat: 'fineline',  icon: iconFineline,  img: null, artista: 'Camila Rocha',  desc: 'Rosas e folhagem em traço ultrafino e delicado.',        preco: 'A partir de R$ 160' },
  { nome: 'Constelação',         cat: 'fineline',  icon: iconFineline,  img: null, artista: 'Camila Rocha',  desc: 'Mapas estelares e signos em linhas precisas.',           preco: 'A partir de R$ 140' },
  { nome: 'Retrato P&B',         cat: 'realismo',  icon: iconRealismo,  img: null, artista: 'Lucas Mendes',  desc: 'Retratos fotorrealistas em escala de cinza.',            preco: 'A partir de R$ 400' },
  { nome: 'Animal Realista',     cat: 'realismo',  icon: iconRealismo,  img: null, artista: 'Lucas Mendes',  desc: 'Lobos, leões e aves com detalhes impressionantes.',      preco: 'A partir de R$ 350' },
  { nome: 'Aquarela Floral',     cat: 'aquarela',  icon: iconAquarela,  img: null, artista: 'Camila Rocha',  desc: 'Manchas livres de cor que simulam aquarela em papel.',   preco: 'A partir de R$ 280' },
  { nome: 'Carpa Koi',           cat: 'oriental',  icon: iconOriental,  img: null, artista: 'Tatiana Luz',   desc: 'Símbolo de perseverança em estilo japonês tradicional.', preco: 'A partir de R$ 320' },
  { nome: 'Sakura Neo-trad',     cat: 'oriental',  icon: iconOriental,  img: null, artista: 'Tatiana Luz',   desc: 'Flores de cerejeira com traço moderno e cor vibrante.',  preco: 'A partir de R$ 300' },
    { nome: 'Nostril Argola Titânio',     cat: 'piercing',  icon: iconPiercing,  img: null, artista: 'Rafael Costa',   desc: 'Perfuração com joia clássica em titânio de alta qualidade.',  preco: 'A partir de R$ 120' },
];

function renderProdutos() {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;
  grid.innerHTML = '';

  portfolio.forEach(p => {
    const card = document.createElement('div');
    card.className   = 'produto-card visible';
    card.dataset.cat = p.cat;

    const imgHTML = p.img
      ? `<img src="${p.img}" alt="${p.nome}" class="produto-img-foto">`
      : `<div class="produto-img-placeholder">${p.icon}<span class="style-label-bg">${p.nome}</span></div>`;

    card.innerHTML = `
      <div class="produto-img">${imgHTML}</div>
      <div class="produto-info">
        <div class="produto-nome">${p.nome}</div>
        ${p.artista ? `<div class="produto-artista">por ${p.artista}</div>` : ''}
        <div class="produto-desc">${p.desc}</div>
        <div class="produto-preco">${p.preco}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filtrar(cat, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.produto-card').forEach(card => {
    card.classList.toggle('visible', cat === 'todos' || card.dataset.cat === cat);
  });
}

// ─── NAV & EVENTOS ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHorarios();
  renderEquipe();
  renderProdutos();

  const nav        = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');
  const menuClose  = document.getElementById('menuClose');

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile  = window.innerWidth <= 700;
    if (!nav) return;

    nav.classList.toggle('shrink', scrollTop > 50);

    if (!isMobile) {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        nav.classList.add('scroll-down');
        nav.classList.remove('scroll-up');
      } else {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
      }
    }
    lastScrollTop = Math.max(0, scrollTop);
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  if (menuClose && menuToggle && navLinks) {
    menuClose.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle && menuToggle.classList.remove('active');
      navLinks   && navLinks.classList.remove('active');
    });
  });
});
