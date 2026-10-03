/* =========================================================
   BIKO.COM - Campo Mourão
   Dados de exemplo + lógica do site (ainda sem back-end).
   Avaliações, denúncias e cadastros ficam no navegador (localStorage).
   ========================================================= */

const CATEGORIAS = [
    { nome: "Corte de grama", icone: "🌱" },
    { nome: "Jardinagem", icone: "🌿" },
    { nome: "Limpeza", icone: "🧼" },
    { nome: "Diarista", icone: "🧹" },
    { nome: "Pintura", icone: "🎨" },
    { nome: "Pedreiro", icone: "🧱" },
    { nome: "Eletricista", icone: "💡" },
    { nome: "Encanador", icone: "🚰" },
    { nome: "Marceneiro", icone: "🪚" },
    { nome: "Mudanças", icone: "🚚" },
    { nome: "Reparos em geral", icone: "🔧" },
    { nome: "Montagem de móveis", icone: "🪑" }
];
const iconeDe = nome => (CATEGORIAS.find(c => c.nome === nome) || {}).icone || "🛠️";

const BAIRROS = ["Centro", "Jardim Lar Paraná", "Jardim Tropical", "Vila Urupês", "Jardim Itália", "Jardim Gralha Azul"];

/* plano: "destaque" = pagante (aparece no topo). desde = data de cadastro. */
const PRESTADORES_BASE = [
    {
        id: 1, nome: "Carlos Silva", categorias: ["Corte de grama", "Jardinagem"], bairro: "Centro",
        desde: "2025-03-10", plano: "destaque", disponivel: true, whatsapp: "5544999990001",
        bio: "Mais de 10 anos cuidando de jardins e gramados em Campo Mourão. Levo meu próprio equipamento e atendo quintais, terrenos e chácaras.",
        servicos: [
            { nome: "Corte de grama (até 200 m²)", desc: "Roçadeira e acabamento nas bordas", preco: 70 },
            { nome: "Corte de grama (terreno grande)", desc: "Terrenos acima de 200 m²", preco: 150 },
            { nome: "Poda e jardinagem", desc: "Poda de arbustos e limpeza de canteiros", preco: 100 }
        ],
        habilidades: ["Roçadeira", "Poda", "Paisagismo", "Limpeza de terrenos"]
    },
    {
        id: 2, nome: "Maria das Graças", categorias: ["Diarista", "Limpeza"], bairro: "Jardim Lar Paraná",
        desde: "2025-08-22", plano: "destaque", disponivel: true, whatsapp: "5544999990002",
        bio: "Limpeza residencial e pós-obra com capricho. Trabalho com dias fixos ou diárias avulsas.",
        servicos: [
            { nome: "Diária de limpeza", desc: "8 horas, casa ou apartamento", preco: 150 },
            { nome: "Limpeza pós-obra", desc: "Remoção de resíduos e limpeza pesada", preco: 250 }
        ],
        habilidades: ["Limpeza pesada", "Organização", "Passar roupa"]
    },
    {
        id: 3, nome: "João Pedro Almeida", categorias: ["Pintura", "Reparos em geral"], bairro: "Jardim Tropical",
        desde: "2024-11-05", plano: "gratis", disponivel: false, whatsapp: "5544999990003",
        bio: "Pintor residencial e comercial. Também faço pequenos reparos de reboco e massa corrida.",
        servicos: [
            { nome: "Pintura de cômodo", desc: "Parede e teto, mão de obra", preco: 350 },
            { nome: "Pintura de casa completa", desc: "Interna e externa, sob orçamento", preco: 1500 },
            { nome: "Massa corrida", desc: "Preparação de paredes", preco: 200 }
        ],
        habilidades: ["Pintura interna", "Pintura externa", "Textura", "Massa corrida"]
    },
    {
        id: 4, nome: "Roberto Machado", categorias: ["Eletricista"], bairro: "Vila Urupês",
        desde: "2025-01-18", plano: "gratis", disponivel: true, whatsapp: "5544999990004",
        bio: "Instalação de tomadas, chuveiros, ventiladores e quadros de energia. Atendo emergências.",
        servicos: [
            { nome: "Instalação de chuveiro", desc: "Com ou sem troca de fiação", preco: 100 },
            { nome: "Troca de tomadas e interruptores", desc: "Valor por ponto", preco: 40 },
            { nome: "Visita técnica", desc: "Diagnóstico de problemas elétricos", preco: 80 }
        ],
        habilidades: ["Instalações", "Quadro de energia", "Emergência"]
    },
    {
        id: 5, nome: "Anderson Souza", categorias: ["Encanador", "Reparos em geral"], bairro: "Jardim Itália",
        desde: "2025-06-02", plano: "gratis", disponivel: true, whatsapp: "5544999990005",
        bio: "Vazamentos, troca de torneiras, caixa d'água e desentupimento.",
        servicos: [
            { nome: "Conserto de vazamento", desc: "Torneiras, canos e registros", preco: 90 },
            { nome: "Desentupimento", desc: "Pia, vaso e ralos", preco: 120 }
        ],
        habilidades: ["Vazamentos", "Caixa d'água", "Desentupimento"]
    },
    {
        id: 6, nome: "Edson Ferreira", categorias: ["Pedreiro", "Reparos em geral"], bairro: "Jardim Gralha Azul",
        desde: "2024-09-14", plano: "gratis", disponivel: false, whatsapp: "5544999990006",
        bio: "Muros, calçadas, pisos e pequenas reformas. Orçamento sem compromisso.",
        servicos: [
            { nome: "Diária de pedreiro", desc: "Mão de obra, 8 horas", preco: 220 },
            { nome: "Assentamento de piso", desc: "Valor por m²", preco: 35 }
        ],
        habilidades: ["Alvenaria", "Pisos", "Reboco", "Calçadas"]
    },
    {
        id: 7, nome: "Luciana Prado", categorias: ["Montagem de móveis", "Reparos em geral"], bairro: "Centro",
        desde: "2026-02-01", plano: "gratis", disponivel: true, whatsapp: "5544999990007",
        bio: "Montagem e desmontagem de guarda-roupas, cozinhas e estantes. Pontual e cuidadosa.",
        servicos: [
            { nome: "Montagem de guarda-roupa", desc: "Até 6 portas", preco: 150 },
            { nome: "Montagem de móvel pequeno", desc: "Estantes, racks e criados", preco: 60 }
        ],
        habilidades: ["Guarda-roupas", "Cozinhas", "Painéis de TV"]
    },
    {
        id: 8, nome: "Marcos Vinícius", categorias: ["Mudanças"], bairro: "Jardim Lar Paraná",
        desde: "2025-10-30", plano: "gratis", disponivel: true, whatsapp: "5544999990008",
        bio: "Fretes e mudanças dentro de Campo Mourão e região, com ajudantes.",
        servicos: [
            { nome: "Frete pequeno", desc: "Itens avulsos na cidade", preco: 80 },
            { nome: "Mudança residencial", desc: "Caminhão + 2 ajudantes", preco: 400 }
        ],
        habilidades: ["Caminhão baú", "Ajudantes", "Embalagem"]
    }
];

const AVALIACOES_INICIAIS = [
    { prestadorId: 1, autor: "Fernanda L.", nota: 5, texto: "Pontual e deixou o quintal impecável.", servico: "Corte de grama (até 200 m²)", preco: 70, tags: ["Entrega no prazo", "Qualidade"], data: "2026-08-12" },
    { prestadorId: 1, autor: "Paulo R.", nota: 5, texto: "Ótimo serviço, recomendo!", servico: "Corte de grama (até 200 m²)", preco: 80, tags: ["Recomendo"], data: "2026-07-03" },
    { prestadorId: 1, autor: "Sandra M.", nota: 4, texto: "Bom trabalho, só atrasou um pouco.", servico: "Poda e jardinagem", preco: 110, tags: ["Qualidade"], data: "2026-05-20" },
    { prestadorId: 2, autor: "Cláudia B.", nota: 5, texto: "Casa cheirosa e organizada. Super confiável.", servico: "Diária de limpeza", preco: 150, tags: ["Confiança", "Qualidade"], data: "2026-09-01" },
    { prestadorId: 2, autor: "Ricardo T.", nota: 5, texto: "Faço limpeza com ela toda semana.", servico: "Diária de limpeza", preco: 160, tags: ["Recomendo"], data: "2026-08-15" },
    { prestadorId: 3, autor: "Alice P.", nota: 4, texto: "Pintura de dois quartos ficou ótima.", servico: "Pintura de cômodo", preco: 330, tags: ["Qualidade"], data: "2026-06-11" },
    { prestadorId: 4, autor: "Gustavo H.", nota: 5, texto: "Resolveu o problema do quadro de luz rapidinho.", servico: "Visita técnica", preco: 90, tags: ["Entrega no prazo"], data: "2026-09-10" },
    { prestadorId: 4, autor: "Helena C.", nota: 4, texto: "Educado e honesto no orçamento.", servico: "Instalação de chuveiro", preco: 110, tags: ["Preço justo"], data: "2026-04-02" },
    { prestadorId: 5, autor: "Tiago N.", nota: 3, texto: "Resolveu, mas demorou para chegar.", servico: "Conserto de vazamento", preco: 100, tags: [], data: "2026-07-25" },
    { prestadorId: 6, autor: "Beatriz O.", nota: 5, texto: "Fez o muro da casa, ficou perfeito.", servico: "Diária de pedreiro", preco: 240, tags: ["Qualidade", "Recomendo"], data: "2026-03-17" }
];

const TAGS_AVALIACAO = ["Entrega no prazo", "Boa comunicação", "Qualidade", "Preço justo", "Recomendo", "Confiança"];
const ROTULOS_NOTA = ["", "Ruim", "Poderia ser melhor", "Bom", "Muito bom", "Excelente!"];

/* ---------------- Armazenamento local ---------------- */
const store = {
    get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } }
};
let avaliacoes = store.get("biko_avaliacoes_v2", null);
if (!avaliacoes) { avaliacoes = AVALIACOES_INICIAIS; store.set("biko_avaliacoes_v2", avaliacoes); }
let denuncias = store.get("biko_denuncias_v2", []);
let extras = store.get("biko_prestadores_extra_v2", []);
const todos = () => PRESTADORES_BASE.concat(extras);

/* ---------------- Utilidades ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const brl = n => Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const iniciais = nome => nome.split(" ").filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase();
const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function stars(n) {
    const full = Math.round(n);
    return `<span class="stars" aria-label="${n.toFixed(1)} de 5">${"★".repeat(full)}<span class="off">${"★".repeat(5 - full)}</span></span>`;
}
const media = arr => arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : null;

function stats(p) {
    const av = avaliacoes.filter(a => a.prestadorId === p.id);
    const precos = av.filter(a => a.preco > 0).map(a => a.preco);
    const aPartirDe = Math.min(...p.servicos.map(s => s.preco));
    return {
        av, qtd: av.length, nota: media(av.map(a => a.nota)) || 0,
        preco: media(precos), precoQtd: precos.length, aPartirDe
    };
}

function tempoCadastro(iso) {
    const ini = new Date(iso + "T00:00:00"), hoje = new Date();
    const meses = (hoje.getFullYear() - ini.getFullYear()) * 12 + (hoje.getMonth() - ini.getMonth());
    if (meses < 1) return "Novo";
    if (meses < 12) return meses + (meses === 1 ? " mês" : " meses");
    const anos = Math.floor(meses / 12), r = meses % 12;
    return anos + (anos === 1 ? " ano" : " anos") + (r ? ` e ${r}m` : "");
}
function haQuanto(iso) {
    const d = Math.floor((Date.now() - new Date(iso + "T00:00:00")) / 864e5);
    if (d < 1) return "hoje";
    if (d < 7) return `há ${d} ${d === 1 ? "dia" : "dias"}`;
    if (d < 30) { const s = Math.floor(d / 7); return `há ${s} ${s === 1 ? "semana" : "semanas"}`; }
    if (d < 365) { const m = Math.floor(d / 30); return `há ${m} ${m === 1 ? "mês" : "meses"}`; }
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
}

function showToast(msg, tipo = "") {
    const t = document.createElement("div");
    t.className = "toast " + tipo; t.textContent = msg;
    $("#toasts").appendChild(t);
    setTimeout(() => t.remove(), 3200);
}
function openModal(html) {
    $("#modal-root").innerHTML = `<div class="modal-overlay" id="overlay"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`;
    $("#overlay").addEventListener("click", e => { if (e.target.id === "overlay") closeModal(); });
}
function closeModal() { $("#modal-root").innerHTML = ""; }

/* ---------------- Filtros / busca ---------------- */
const F = { q: "", cat: "", bairro: "", preco: 1000, nota: 0, disp: false, sort: "relevance" };

function listaFiltrada() {
    const q = norm(F.q);
    const lista = todos().map(p => ({ p, s: stats(p) }))
        .filter(({ p }) => !F.cat || p.categorias.includes(F.cat))
        .filter(({ p }) => !F.bairro || p.bairro === F.bairro)
        .filter(({ p }) => !F.disp || p.disponivel)
        .filter(({ s }) => s.nota >= F.nota)
        .filter(({ s }) => F.preco >= 1000 || (s.preco || s.aPartirDe) <= F.preco)
        .filter(({ p }) => !q || norm(p.nome).includes(q) || norm(p.bio).includes(q) ||
            p.categorias.some(c => norm(c).includes(q)) || p.servicos.some(sv => norm(sv.nome).includes(q) || norm(sv.desc).includes(q)));

    const cmp = {
        relevance: (a, b) => b.s.nota - a.s.nota || b.s.qtd - a.s.qtd,
        rating: (a, b) => b.s.nota - a.s.nota || b.s.qtd - a.s.qtd,
        reviews: (a, b) => b.s.qtd - a.s.qtd,
        "price-asc": (a, b) => (a.s.preco || a.s.aPartirDe) - (b.s.preco || b.s.aPartirDe),
        newest: (a, b) => a.p.desde.localeCompare(b.p.desde)
    }[F.sort];
    // Plano Destaque sempre vem primeiro; dentro de cada grupo vale a ordenação escolhida.
    return lista.sort((a, b) => (b.p.plano === "destaque") - (a.p.plano === "destaque") || cmp(a, b));
}

function cardHTML({ p, s }) {
    const dest = p.plano === "destaque";
    return `
  <article class="card ${dest ? "featured" : ""}" data-id="${p.id}" tabindex="0" role="link" aria-label="Ver perfil de ${esc(p.nome)}">
    ${dest ? '<span class="badge-top">★ EM DESTAQUE</span>' : ""}
    <div class="card-head">
      <div class="avatar">${iniciais(p.nome)}</div>
      <div>
        <h3>${esc(p.nome)}</h3>
        <div class="loc">📍 ${esc(p.bairro)} · Campo Mourão</div>
      </div>
    </div>
    <div class="tags">${p.categorias.map(c => `<span class="tag">${iconeDe(c)} ${esc(c)}</span>`).join("")}</div>
    <div class="rating-line">
      ${s.qtd ? `${stars(s.nota)} <b>${s.nota.toFixed(1)}</b> (${s.qtd})` : "Sem avaliações ainda"}
      ${p.disponivel ? '<span class="online">🟢 Disponível hoje</span>' : ""}
    </div>
    <div class="card-meta"><span>🗓️ ${tempoCadastro(p.desde)} no Biko</span></div>
    <div class="card-foot">
      <div class="price"><small>${s.preco ? `preço médio (${s.precoQtd} ${s.precoQtd === 1 ? "relato" : "relatos"})` : "a partir de"}</small><strong>${brl(s.preco || s.aPartirDe)}</strong></div>
      <span class="btn btn-secondary btn-sm">Ver perfil</span>
    </div>
  </article>`;
}

function bindCards(container) {
    const go = e => { const c = e.target.closest(".card"); if (c) location.hash = "#/prestador/" + c.dataset.id; };
    container.onclick = go;
    container.onkeydown = e => { if (e.key === "Enter") go(e); };
}

function preencherSelects() {
    const optCat = (primeira) => `<option value="">${primeira}</option>` + CATEGORIAS.map(c => `<option value="${esc(c.nome)}">${c.icone} ${esc(c.nome)}</option>`).join("");
    const optBairro = (primeira) => (primeira ? `<option value="">${primeira}</option>` : "") + BAIRROS.map(b => `<option>${esc(b)}</option>`).join("");
    $("#f-cat").innerHTML = optCat("Todos os serviços");
    $("#f-bairro").innerHTML = optBairro("Todos os bairros");
    $("#hero-bairro").innerHTML = optBairro("Todos os bairros");
    $("#c-cat").innerHTML = CATEGORIAS.map(c => `<option>${esc(c.nome)}</option>`).join("");
    $("#c-bairro").innerHTML = optBairro("");
    $("#footer-cats").innerHTML = "<h4>Serviços</h4>" + CATEGORIAS.slice(0, 5).map(c => `<a data-cat="${esc(c.nome)}">${esc(c.nome)}</a>`).join("");
}

function syncFiltrosUI() {
    $("#f-q").value = F.q; $("#f-cat").value = F.cat; $("#f-bairro").value = F.bairro;
    $("#f-preco").value = F.preco; $("#f-nota").value = F.nota; $("#f-disp").checked = F.disp; $("#f-sort").value = F.sort;
    atualizarPrecoLabel();
}
function atualizarPrecoLabel() {
    const v = Number($("#f-preco").value);
    $("#price-val").textContent = v >= 1000 ? "Qualquer preço" : "Até " + brl(v);
}
function applyFilters() {
    F.q = $("#f-q").value.trim(); F.cat = $("#f-cat").value; F.bairro = $("#f-bairro").value;
    F.preco = Number($("#f-preco").value); F.nota = Number($("#f-nota").value);
    F.disp = $("#f-disp").checked; F.sort = $("#f-sort").value;
    renderBusca();
}
function resetFilters() {
    Object.assign(F, { q: "", cat: "", bairro: "", preco: 1000, nota: 0, disp: false, sort: "relevance" });
    syncFiltrosUI(); renderBusca();
}
function renderBusca() {
    const l = listaFiltrada();
    $("#results-count").innerHTML = `<strong>${l.length} ${l.length === 1 ? "prestador" : "prestadores"}</strong> encontrado${l.length === 1 ? "" : "s"}${F.cat ? " em " + esc(F.cat) : ""}`;
    $("#search-grid").innerHTML = l.length ? l.map(cardHTML).join("")
        : `<div class="empty"><h3>Nenhum prestador encontrado</h3><p>Tente outro serviço, bairro ou limpe os filtros.</p></div>`;
}

/* ---------------- Home ---------------- */
function irParaBusca(parcial) {
    Object.assign(F, { q: "", cat: "", bairro: "", preco: 1000, nota: 0, disp: false, sort: "relevance" }, parcial);
    if (location.hash === "#/buscar") rota(); else location.hash = "#/buscar";
}
function doSearch() {
    irParaBusca({ q: $("#hero-input").value.trim(), bairro: $("#hero-bairro").value });
}

function renderHome() {
    const lista = todos();
    $("#st-prest").textContent = lista.length;
    $("#st-av").textContent = avaliacoes.length;

    $("#hero-tags").innerHTML = ["Corte de grama", "Diarista", "Pintura", "Eletricista", "Encanador"]
        .map(c => `<span class="hero-tag" data-cat="${esc(c)}">${iconeDe(c)} ${esc(c)}</span>`).join("");

    $("#cats-grid").innerHTML = CATEGORIAS.map(c => {
        const n = lista.filter(p => p.categorias.includes(c.nome)).length;
        return `<div class="cat-card" data-cat="${esc(c.nome)}"><div class="cat-icon">${c.icone}</div><div class="cat-name">${esc(c.nome)}</div><div class="cat-count">${n} ${n === 1 ? "prestador" : "prestadores"}</div></div>`;
    }).join("");

    const dest = lista.filter(p => p.plano === "destaque").map(p => ({ p, s: stats(p) })).sort((a, b) => b.s.nota - a.s.nota);
    $("#home-destaques").innerHTML = dest.length ? dest.map(cardHTML).join("") : `<div class="empty"><p>Em breve.</p></div>`;
    bindCards($("#home-destaques"));

    $("#bairros-wrap").innerHTML = BAIRROS.map(b => {
        const n = lista.filter(p => p.bairro === b).length;
        return `<button class="bairro-pill" data-bairro="${esc(b)}">📍 ${esc(b)}<small>${n}</small></button>`;
    }).join("");
}

/* ---------------- Perfil ---------------- */
let notaSel = 0, tagsSel = new Set();

function renderPerfil(id) {
    const p = todos().find(x => x.id === id);
    if (!p) { location.hash = "#/"; return; }
    const s = stats(p);
    notaSel = 0; tagsSel = new Set();
    const msg = encodeURIComponent(`Olá ${p.nome}! Vi seu perfil no Biko e gostaria de um orçamento.`);
    const dist = [5, 4, 3, 2, 1].map(n => {
        const c = s.av.filter(a => a.nota === n).length;
        return { n, pct: s.qtd ? Math.round(c / s.qtd * 100) : 0 };
    });
    const tiles = ["linear-gradient(135deg,#0b2545,#1d4678)", "linear-gradient(135deg,#ff7a1a,#ffb067)", "linear-gradient(135deg,#13315c,#ff7a1a)"];

    $("#profile-root").innerHTML = `
    <a href="#/buscar" class="back">← Voltar para a lista</a>
    <div class="profile-hero"><div class="profile-avatar">${iniciais(p.nome)}</div></div>

    <div class="profile-id">
      ${p.plano === "destaque" ? '<span class="badge-destaque">★ EM DESTAQUE</span>' : ""}
      <div class="profile-name">${esc(p.nome)}</div>
      <div class="profile-title">${p.categorias.map(c => iconeDe(c) + " " + esc(c)).join(" · ")}</div>
      <div class="profile-badges">
        <span>📍 ${esc(p.bairro)}, Campo Mourão</span>
        ${s.qtd ? `<span>${stars(s.nota)} <b style="color:var(--text)">${s.nota.toFixed(1)}</b> (${s.qtd} ${s.qtd === 1 ? "avaliação" : "avaliações"})</span>` : "<span>Sem avaliações ainda</span>"}
        ${p.disponivel ? '<span class="online">🟢 Disponível hoje</span>' : ""}
      </div>
    </div>

    <div class="profile-content">
      <div>
        <div class="card-box"><h3>👤 Sobre</h3><p class="bio">${esc(p.bio)}</p></div>

        <div class="card-box">
          <h3>🛠️ Serviços e preços</h3>
          ${p.servicos.map(sv => {
        const rel = avaliacoes.filter(a => a.prestadorId === p.id && a.servico === sv.nome && a.preco > 0).map(a => a.preco);
        const m = media(rel);
        return `<div class="service-item">
              <div><strong>${esc(sv.nome)}</strong><p>${esc(sv.desc)}</p></div>
              <div class="service-price"><strong>${brl(m || sv.preco)}</strong><small>${m ? `média de ${rel.length} ${rel.length === 1 ? "cliente" : "clientes"}` : "a partir de"}</small></div>
            </div>`;
    }).join("")}
        </div>

        <div class="card-box">
          <h3>🖼️ Trabalhos realizados</h3>
          <div class="portfolio-grid">
            ${[0, 1, 2].map(i => `<div class="portfolio-item" style="background:${tiles[i]}">${iconeDe(p.categorias[i % p.categorias.length])}</div>`).join("")}
          </div>
          <p class="portfolio-note">Imagens ilustrativas. Em breve o prestador poderá enviar fotos reais dos seus trabalhos.</p>
        </div>

        <div class="card-box" id="reviews-section">
          <h3>⭐ Avaliações (${s.qtd})</h3>
          ${s.qtd ? `
          <div class="reviews-header">
            <div class="reviews-summary">
              <div class="avg-score">${s.nota.toFixed(1)}</div>
              ${stars(s.nota)}
              <div class="avg-total">${s.qtd} ${s.qtd === 1 ? "avaliação" : "avaliações"}</div>
            </div>
            <div class="rating-breakdown">
              ${dist.map(d => `<div class="rating-bar-row"><span>${d.n}★</span><div class="rating-bar-bg"><div class="rating-bar-fill" style="width:${d.pct}%"></div></div><span>${d.pct}%</span></div>`).join("")}
            </div>
          </div>
          ${s.av.slice().sort((a, b) => b.data.localeCompare(a.data)).map(a => `
            <div class="review-item">
              <div class="review-header">
                <div class="review-avatar">${esc(a.autor[0].toUpperCase())}</div>
                <div><div class="review-name">${esc(a.autor)}</div>${stars(a.nota)}</div>
                <div class="review-date">${haQuanto(a.data)}</div>
              </div>
              <p class="review-text">${esc(a.texto)}</p>
              <div class="review-meta">
                ${a.servico ? `<span class="paid">${esc(a.servico)}</span>` : ""}
                ${a.preco ? `<span class="paid">Pagou ${brl(a.preco)}</span>` : ""}
                ${(a.tags || []).map(t => `<span>${esc(t)}</span>`).join("")}
              </div>
            </div>`).join("")}
          ` : "<p class='loc'>Ninguém avaliou ainda. Seja o primeiro!</p>"}

          <form class="review-form-box" id="form-av" novalidate>
            <h4>✍️ Contratou este prestador? Deixe sua avaliação</h4>
            <p class="loc" style="margin-bottom:10px">Como foi sua experiência?</p>
            <div class="star-selector" id="star-selector">${[1, 2, 3, 4, 5].map(n => `<span data-val="${n}" role="button" aria-label="${n} estrelas">⭐</span>`).join("")}</div>
            <div id="star-label"></div>
            <div class="form-row">
              <div class="form-group"><label for="av-nome">Seu nome</label><input class="field" id="av-nome" maxlength="40" placeholder="Ex: Ana S."></div>
              <div class="form-group"><label for="av-servico">Serviço contratado</label>
                <select class="field" id="av-servico">${p.servicos.map(sv => `<option>${esc(sv.nome)}</option>`).join("")}</select></div>
            </div>
            <div class="form-group"><label for="av-preco">Quanto você pagou? (opcional)</label>
              <input class="field" id="av-preco" type="number" min="0" step="1" placeholder="R$">
              <div class="form-hint">Esse valor entra no cálculo do preço médio do prestador.</div></div>
            <label style="font-weight:700;font-size:.85rem;color:var(--navy-2);display:block;margin-bottom:7px">O que você quer destacar?</label>
            <div class="review-categories" id="rev-tags">${TAGS_AVALIACAO.map(t => `<span class="rev-cat" data-tag="${esc(t)}">${esc(t)}</span>`).join("")}</div>
            <textarea class="field" id="av-texto" rows="3" maxlength="400" placeholder="Conte como foi o serviço..."></textarea>
            <div class="char-count"><span id="char-count">0</span>/400</div>
            <button class="btn btn-primary" type="submit">⭐ Publicar avaliação</button>
          </form>
        </div>
      </div>

      <aside class="profile-sidebar">
        <div class="stat-grid">
          <div class="stat-box hl"><strong>${brl(s.preco || s.aPartirDe)}</strong><span>${s.preco ? `preço médio · ${s.precoQtd} ${s.precoQtd === 1 ? "relato" : "relatos"}` : "a partir de (sem relatos ainda)"}</span></div>
          <div class="stat-box"><strong>${s.qtd}</strong><span>${s.qtd === 1 ? "avaliação" : "avaliações"}</span></div>
          <div class="stat-box"><strong>${tempoCadastro(p.desde)}</strong><span>de cadastro</span></div>
        </div>
        <div class="card-box">
          <a class="btn btn-whats btn-block btn-lg" target="_blank" rel="noopener" href="https://wa.me/${p.whatsapp}?text=${msg}">💬 Chamar no WhatsApp</a>
          <p class="contact-note">Combine valor, dia e horário direto com o prestador. O Biko não intermedeia pagamentos.</p>
          <button class="btn btn-ghost btn-block btn-sm" id="btn-denunciar">🚩 Denunciar este perfil</button>
        </div>
        <div class="card-box">
          <h3>🏷️ Habilidades</h3>
          <div class="skills-wrap">${(p.habilidades || p.categorias).map(h => `<span class="skill-chip">${esc(h)}</span>`).join("")}</div>
        </div>
      </aside>
    </div>`;

    // estrelas
    const sel = $("#star-selector");
    const pintar = n => $$("span", sel).forEach(sp => sp.classList.toggle("on", Number(sp.dataset.val) <= n));
    sel.addEventListener("click", e => { const sp = e.target.closest("span"); if (!sp) return; notaSel = Number(sp.dataset.val); pintar(notaSel); $("#star-label").textContent = ROTULOS_NOTA[notaSel]; });
    sel.addEventListener("mouseover", e => { const sp = e.target.closest("span"); if (sp) pintar(Number(sp.dataset.val)); });
    sel.addEventListener("mouseleave", () => pintar(notaSel));

    $("#rev-tags").addEventListener("click", e => {
        const t = e.target.closest(".rev-cat"); if (!t) return;
        t.classList.toggle("on");
        tagsSel.has(t.dataset.tag) ? tagsSel.delete(t.dataset.tag) : tagsSel.add(t.dataset.tag);
    });
    $("#av-texto").addEventListener("input", e => { $("#char-count").textContent = e.target.value.length; });

    $("#form-av").addEventListener("submit", e => {
        e.preventDefault();
        const nome = $("#av-nome").value.trim(), texto = $("#av-texto").value.trim();
        if (!notaSel) return showToast("Escolha uma nota de 1 a 5 estrelas.", "warning");
        if (!nome || !texto) return showToast("Preencha seu nome e um comentário.", "warning");
        avaliacoes.push({
            prestadorId: p.id, autor: nome, nota: notaSel, texto, servico: $("#av-servico").value,
            preco: Number($("#av-preco").value) || 0, tags: [...tagsSel], data: new Date().toISOString().slice(0, 10)
        });
        store.set("biko_avaliacoes_v2", avaliacoes);
        showToast("Avaliação publicada. Obrigado!", "success");
        renderPerfil(p.id);
        $("#reviews-section").scrollIntoView({ behavior: "smooth" });
    });

    $("#btn-denunciar").addEventListener("click", () => abrirDenuncia(p));
}

function abrirDenuncia(p) {
    openModal(`
    <button class="modal-close" onclick="closeModal()" aria-label="Fechar">✕</button>
    <h3>🚩 Denunciar ${esc(p.nome)}</h3>
    <form id="form-den" novalidate>
      <div class="form-group"><label for="den-motivo">Motivo</label>
        <select class="field" id="den-motivo">
          <option value="">Selecione...</option>
          <option>Golpe ou fraude</option><option>Serviço não realizado</option>
          <option>Comportamento inadequado</option><option>Perfil falso</option>
          <option>Informações incorretas</option><option>Outro</option>
        </select></div>
      <div class="form-group"><label for="den-det">O que aconteceu?</label>
        <textarea class="field" id="den-det" rows="4" maxlength="500" placeholder="Descreva com o máximo de detalhes possível."></textarea></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Enviar denúncia</button>
      </div>
    </form>`);
    $("#form-den").addEventListener("submit", e => {
        e.preventDefault();
        const motivo = $("#den-motivo").value, detalhe = $("#den-det").value.trim();
        if (!motivo || !detalhe) return showToast("Informe o motivo e os detalhes.", "warning");
        denuncias.push({ prestadorId: p.id, motivo, detalhe, data: new Date().toISOString() });
        store.set("biko_denuncias_v2", denuncias);
        closeModal();
        showToast("Denúncia recebida. Nossa equipe vai analisar.", "success");
    });
}

/* ---------------- Cadastro de prestador ---------------- */
function cadastrar(e) {
    e.preventDefault();
    const nome = $("#c-nome").value.trim(), whats = $("#c-whats").value.replace(/\D/g, "");
    const cat = $("#c-cat").value, preco = Number($("#c-preco").value);
    const svc = $("#c-svc").value.trim(), bio = $("#c-bio").value.trim();
    if (!nome || whats.length < 10 || !preco || !svc) return showToast("Preencha nome, WhatsApp com DDD, preço e descrição.", "warning");
    const novo = {
        id: 1000 + extras.length + 1, nome, categorias: [cat], bairro: $("#c-bairro").value,
        desde: new Date().toISOString().slice(0, 10), plano: "gratis", disponivel: true,
        whatsapp: whats.startsWith("55") ? whats : "55" + whats,
        bio: bio || "Prestador de serviços em Campo Mourão.",
        servicos: [{ nome: cat, desc: svc, preco }], habilidades: [cat]
    };
    extras.push(novo); store.set("biko_prestadores_extra_v2", extras);
    e.target.reset();
    showToast("Perfil criado! Veja como ele aparece.", "success");
    location.hash = "#/prestador/" + novo.id;
}

/* ---------------- Rotas ---------------- */
function showPage(id) {
    $$(".page").forEach(p => p.classList.toggle("active", p.id === "page-" + id));
    window.scrollTo(0, 0);
}
function rota() {
    closeModal();
    const h = location.hash || "#/";
    const m = h.match(/^#\/prestador\/(\d+)/);
    if (m) { showPage("profile"); return renderPerfil(Number(m[1])); }
    if (h.startsWith("#/buscar")) { showPage("search"); syncFiltrosUI(); return renderBusca(); }
    if (h.startsWith("#/anunciar")) return showPage("anunciar");
    showPage("home"); renderHome();
}

function scrollParaSecao(id) {
    const go = () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
    if (!$("#page-" + (id === "form-cadastro" ? "anunciar" : "home")).classList.contains("active")) {
        location.hash = id === "form-cadastro" ? "#/anunciar" : "#/"; setTimeout(go, 80);
    } else go();
}

/* ---------------- Inicialização ---------------- */
preencherSelects();
$("#f-preco").addEventListener("input", atualizarPrecoLabel);
$("#f-q").addEventListener("keydown", e => { if (e.key === "Enter") applyFilters(); });
bindCards($("#search-grid"));
$("#form-prest").addEventListener("submit", cadastrar);

document.addEventListener("click", e => {
    const cat = e.target.closest("[data-cat]");
    if (cat) { e.preventDefault(); return irParaBusca({ cat: cat.dataset.cat }); }
    const bai = e.target.closest("[data-bairro]");
    if (bai) return irParaBusca({ bairro: bai.dataset.bairro });
    const sc = e.target.closest("[data-scroll]");
    if (sc) { e.preventDefault(); scrollParaSecao(sc.dataset.scroll); }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
window.addEventListener("hashchange", rota);
rota();