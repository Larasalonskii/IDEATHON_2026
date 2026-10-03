const CATS = [["Corte de grama", "🌱"], ["Jardinagem", "🌿"], ["Limpeza", "🧼"], ["Diarista", "🧹"], ["Pintura", "🎨"], ["Pedreiro", "🧱"], ["Eletricista", "💡"], ["Encanador", "🚰"], ["Marceneiro", "🪚"], ["Mudanças", "🚚"], ["Reparos em geral", "🔧"], ["Montagem de móveis", "🪑"]];
const BAIRROS = ["Centro", "Jardim Lar Paraná", "Jardim Tropical", "Vila Urupês", "Jardim Itália", "Jardim Gralha Azul"];
const BASE = [
    { id: 1, nome: "Carlos Silva", cats: ["Corte de grama", "Jardinagem"], bairro: "Centro", desde: "2025-03-10", dest: 1, on: 1, wpp: "5544999990001", bio: "Mais de 10 anos cuidando de jardins e gramados em Campo Mourão. Levo meu próprio equipamento.", sv: [["Corte de grama (até 200 m²)", 70], ["Terreno grande", 150], ["Poda e jardinagem", 100]] },
    { id: 2, nome: "Maria das Graças", cats: ["Diarista", "Limpeza"], bairro: "Jardim Lar Paraná", desde: "2025-08-22", dest: 1, on: 1, wpp: "5544999990002", bio: "Limpeza residencial e pós-obra com capricho. Dias fixos ou diárias avulsas.", sv: [["Diária de limpeza (8h)", 150], ["Limpeza pós-obra", 250]] },
    { id: 3, nome: "João Pedro Almeida", cats: ["Pintura", "Reparos em geral"], bairro: "Jardim Tropical", desde: "2024-11-05", dest: 0, on: 0, wpp: "5544999990003", bio: "Pintor residencial e comercial. Também faço reboco e massa corrida.", sv: [["Pintura de cômodo", 350], ["Casa completa (orçamento)", 1500], ["Massa corrida", 200]] },
    { id: 4, nome: "Roberto Machado", cats: ["Eletricista"], bairro: "Vila Urupês", desde: "2025-01-18", dest: 0, on: 1, wpp: "5544999990004", bio: "Tomadas, chuveiros, ventiladores e quadros de energia. Atendo emergências.", sv: [["Instalação de chuveiro", 100], ["Troca de tomada (por ponto)", 40], ["Visita técnica", 80]] },
    { id: 5, nome: "Anderson Souza", cats: ["Encanador", "Reparos em geral"], bairro: "Jardim Itália", desde: "2025-06-02", dest: 0, on: 1, wpp: "5544999990005", bio: "Vazamentos, troca de torneiras, caixa d'água e desentupimento.", sv: [["Conserto de vazamento", 90], ["Desentupimento", 120]] },
    { id: 6, nome: "Edson Ferreira", cats: ["Pedreiro"], bairro: "Jardim Gralha Azul", desde: "2024-09-14", dest: 0, on: 0, wpp: "5544999990006", bio: "Muros, calçadas, pisos e pequenas reformas. Orçamento sem compromisso.", sv: [["Diária de pedreiro", 220], ["Assentamento de piso (m²)", 35]] },
    { id: 7, nome: "Luciana Prado", cats: ["Montagem de móveis"], bairro: "Centro", desde: "2026-02-01", dest: 0, on: 1, wpp: "5544999990007", bio: "Montagem de guarda-roupas, cozinhas e estantes. Pontual e cuidadosa.", sv: [["Guarda-roupa (até 6 portas)", 150], ["Móvel pequeno", 60]] },
    { id: 8, nome: "Marcos Vinícius", cats: ["Mudanças"], bairro: "Jardim Lar Paraná", desde: "2025-10-30", dest: 0, on: 1, wpp: "5544999990008", bio: "Fretes e mudanças em Campo Mourão e região, com ajudantes.", sv: [["Frete pequeno", 80], ["Mudança residencial", 400]] }];
const AV0 = [[1, "Fernanda L.", 5, "Pontual e deixou o quintal impecável.", 70, "2026-08-12"], [1, "Paulo R.", 5, "Ótimo serviço, recomendo!", 80, "2026-07-03"], [1, "Sandra M.", 4, "Bom trabalho, só atrasou um pouco.", 110, "2026-05-20"], [2, "Cláudia B.", 5, "Casa cheirosa e organizada. Super confiável.", 150, "2026-09-01"], [2, "Ricardo T.", 5, "Faço limpeza com ela toda semana.", 160, "2026-08-15"], [3, "Alice P.", 4, "Pintura de dois quartos ficou ótima.", 330, "2026-06-11"], [4, "Gustavo H.", 5, "Resolveu o problema do quadro de luz rapidinho.", 90, "2026-09-10"], [4, "Helena C.", 4, "Educado e honesto no orçamento.", 110, "2026-04-02"], [5, "Bruno A.", 5, "Resolveu o vazamento no mesmo dia.", 95, "2026-09-20"], [7, "Teresa G.", 5, "Montou tudo em uma tarde.", 150, "2026-09-14"], [8, "Daniel O.", 4, "Cuidou bem dos móveis.", 420, "2026-08-30"]].map(a => ({ pid: a[0], autor: a[1], nota: a[2], texto: a[3], preco: a[4], data: a[5] }));
const COR = ["#EFB909", "#E95B23", "#f4d27a", "#f08a5d", "#9ad1c1", "#c9b6f0"];
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const R = n => "R$ " + Math.round(n).toLocaleString("pt-BR");
let S = { avs: [], provs: [], den: [], fav: [], work: [] };
try { S = Object.assign(S, JSON.parse(localStorage.getItem("biko") || "{}")) } catch (e) { }
const save = () => { try { localStorage.setItem("biko", JSON.stringify(S)) } catch (e) { } };
const provs = () => BASE.concat(S.provs);
const avsOf = id => AV0.concat(S.avs).filter(a => a.pid === id);
const nota = id => { const a = avsOf(id); return a.length ? a.reduce((s, x) => s + x.nota, 0) / a.length : 0 };
const medio = p => { const a = avsOf(p.id); const v = a.length ? a.map(x => x.preco) : p.sv.map(x => x[1]); return v.reduce((s, x) => s + x, 0) / v.length };
const tempo = d => { const m = Math.max(1, Math.round((Date.now() - new Date(d)) / 2.63e9)); return m < 12 ? m + (m > 1 ? " meses" : " mês") : Math.floor(m / 12) + (m < 24 ? " ano" : " anos") };
const SK = ["#f1c9a5", "#e0a97c", "#c68642", "#8d5524", "#f3d3b8", "#d9a074"], HR = ["#2b1d14", "#4a2c17", "#0f0f0f", "#7a5230", "#b8b2a8", "#5b3a22"], SH = ["#E95B23", "#EFB909", "#1c4357", "#3fb67a", "#8a6bd1", "#d94b6a"], BG = ["#143444", "#1c4357", "#244e63"], FEM = [2, 7];
function av(p, s) {
    if (p.foto) return `<img class="ph" src="${p.foto}" style="width:${s}px;height:${s}px" alt="">`; const i = p.id, f = FEM.includes(i), sk = SK[i % 6], hr = HR[(i * 2) % 6];
    return `<svg class="ph" viewBox="0 0 100 100" width="${s}" height="${s}" role="img" aria-label="${esc(p.nome)}"><rect width="100" height="100" fill="${BG[i % 3]}"/>${f ? `<path d="M28 46c-2-26 12-34 22-34s24 8 22 34c0 14 4 24 6 30H22c2-6 6-16 6-30z" fill="${hr}"/>` : ""}<path d="M12 100c0-24 17-36 38-36s38 12 38 36z" fill="${SH[(i + 1) % 6]}"/><rect x="43" y="52" width="14" height="16" rx="6" fill="${sk}"/><ellipse cx="50" cy="40" rx="17" ry="20" fill="${sk}"/>${f ? `<path d="M32 40c0-16 8-22 18-22s18 6 18 22c-6-6-10-14-18-14s-12 8-18 14z" fill="${hr}"/>` : `<path d="M32 38c-2-18 10-24 18-24s20 6 18 24c-4-8-10-12-18-12s-14 4-18 12z" fill="${hr}"/>`}<circle cx="43" cy="42" r="1.8" fill="#222"/><circle cx="57" cy="42" r="1.8" fill="#222"/><path d="M43 50q7 5 14 0" stroke="#7a3b2a" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`
}
function pic(f, z = 220) { return new Promise(r => { if (!f) return r(); const fr = new FileReader(); fr.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"), m = Math.min(im.width, im.height); c.width = c.height = z; c.getContext("2d").drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, z, z); r(c.toDataURL("image/jpeg", .8)) }; im.onerror = () => r(); im.src = fr.result }; fr.readAsDataURL(f) }) }
const HAB = { 1: ["Roçadeira", "Poda", "Paisagismo", "Limpeza de terrenos"], 2: ["Limpeza pesada", "Organização", "Passar roupa"], 3: ["Pintura interna", "Pintura externa", "Textura", "Massa corrida"], 4: ["Instalações", "Quadro de energia", "Emergência"], 5: ["Vazamentos", "Caixa d'água", "Desentupimento"], 6: ["Alvenaria", "Pisos", "Reboco", "Calçadas"], 7: ["Guarda-roupas", "Cozinhas", "Painéis de TV"], 8: ["Caminhão baú", "Ajudantes", "Embalagem"] };
const I = { flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>', star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>', heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>', pin: '<path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>', chat: '<path d="M4 5h16v11H9l-5 4z"/>', wpp: '<path d="M5 19l1.3-4A8 8 0 1 1 9 17.7z"/>' };
const ic = n => `<svg viewBox="0 0 24 24">${I[n]}</svg>`;
const scene = (e, a, b) => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="120" height="120" fill="url(#g)"/><text x="60" y="78" font-size="54" text-anchor="middle">${e}</text></svg>`);
const WK = { 1: [["🌱", "#3fb67a", "#1f6f46", "Quintal depois do corte"], ["🌿", "#6fcf97", "#2a7d4f", "Poda de cerca viva"]], 2: [["🧼", "#7fd1e8", "#2a7a9a", "Sala pós-obra"], ["🧹", "#f4d27a", "#c98f12", "Cozinha organizada"]], 3: [["🎨", "#f08a5d", "#b8401a", "Sala pintada"], ["🖌️", "#9ad1c1", "#2f7d6a", "Quarto em dois tons"]], 4: [["💡", "#f4d27a", "#c98f12", "Quadro de luz novo"], ["🔌", "#c9b6f0", "#6a4fb3", "Tomadas trocadas"]], 5: [["🚰", "#7fd1e8", "#2a7a9a", "Torneira trocada"], ["🔧", "#9fb3c0", "#4a6578", "Reparo de cano"]], 6: [["🧱", "#e0a97c", "#9a5a2b", "Muro novo"], ["🏗️", "#f4d27a", "#c98f12", "Piso assentado"]], 7: [["🪑", "#e0a97c", "#9a5a2b", "Guarda-roupa montado"], ["📺", "#9fb3c0", "#4a6578", "Painel de TV"]], 8: [["🚚", "#f08a5d", "#b8401a", "Mudança concluída"], ["📦", "#e0a97c", "#9a5a2b", "Embalagem de móveis"]] };
AV0[0].fotos = [scene("🌱", "#3fb67a", "#1f6f46")]; AV0[3].fotos = [scene("🧼", "#7fd1e8", "#2a7a9a")]; AV0[5].fotos = [scene("🎨", "#f08a5d", "#b8401a"), scene("🖌️", "#9ad1c1", "#2f7d6a")]; AV0[6].fotos = [scene("💡", "#f4d27a", "#c98f12")];
const works = id => (WK[id] || []).map(x => ({ img: scene(x[0], x[1], x[2]), leg: x[3] })).concat(S.work.filter(x => x.pid === id));
const zoom = s => { $("#lbi").src = s; $("#lb").classList.add("on") }; $("#lb").onclick = () => $("#lb").classList.remove("on");
function wk() {
    const e = $("#wk"); if (!S.provs.length) { e.innerHTML = '<h2 style="margin-top:26px">Fotos dos seus trabalhos</h2><div class="empty">Crie seu perfil acima para postar fotos dos serviços que você já fez.</div>'; return }
    e.innerHTML = `<h2 style="margin-top:26px">Postar foto de trabalho</h2><label for="w-p">Seu perfil</label><select class="f" id="w-p">${S.provs.map(p => `<option value="${p.id}">${esc(p.nome)}</option>`).join("")}</select><label for="w-f">Foto</label><input class="f" type="file" accept="image/*" id="w-f"><label for="w-l">Legenda</label><input class="f" id="w-l" placeholder="Ex: Quintal depois do corte"><button class="btn" style="width:100%;margin-top:18px" id="w-ok">Postar foto</button>`;
    $("#w-ok").onclick = async () => { const img = await pic($("#w-f").files[0], 560); if (!img) return toast("Escolha uma foto do seu trabalho"); S.work.push({ pid: +$("#w-p").value, img, leg: $("#w-l").value.trim() || "Trabalho realizado", data: Date.now() }); save(); wk(); toast("Foto postada no seu perfil") }
}
const F = { q: "", cat: "", bairro: "", min: 0 };
function toast(t) { const e = $("#toast"); e.textContent = t; e.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove("on"), 2400) }
function tab(t) { $$(".screen:not(#splash)").forEach(s => s.classList.toggle("on", s.id === t)); $$("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.t === t)); $("#tabs").style.display = "flex" }
function chips() { $("#chips").innerHTML = [["", "Todos"]].concat(CATS.map(c => [c[0], c[1] + " " + c[0]])).map(c => `<button class="chip${F.cat === c[0] ? " on" : ""}" data-c="${esc(c[0])}">${esc(c[1])}</button>`).join("") }
function list() {
    const q = F.q.toLowerCase();
    const r = provs().filter(p => (!F.cat || p.cats.includes(F.cat)) && (!F.bairro || p.bairro === F.bairro) && nota(p.id) >= F.min && (!q || (p.nome + p.cats.join(" ") + p.sv.map(s => s[0]).join(" ")).toLowerCase().includes(q)))
        .sort((a, b) => b.dest - a.dest || b.on - a.on || nota(b.id) - nota(a.id));
    $("#list").innerHTML = `<h2>${F.cat || "Prestadores"}<small>${r.length} ${r.length === 1 ? "encontrado" : "encontrados"}</small></h2>` + (r.length ? r.map(p => { const n = nota(p.id), c = avsOf(p.id).length; return `<button class="row${p.dest ? " dest" : ""}" data-p="${p.id}"><div class="av">${av(p, 58)}</div><div class="info"><div class="nm">${esc(p.nome)}${p.dest ? '<span class="tag">Destaque</span>' : ""}</div><div class="sv">${esc(p.cats.join(" · "))} — ${esc(p.bairro)}</div><div class="meta"><span><span class="star">★</span> ${n ? n.toFixed(1) : "Novo"}${c ? ` <span class="off">(${c})</span>` : ""}</span>${p.on ? "" : '<span class="off">Sem agenda</span>'}</div></div></button>` }).join("") : `<div class="empty"><b>Ninguém por aqui ainda</b>Tente outro serviço ou bairro, ou limpe os filtros.</div>`);
}
function detail(id) {
    const p = provs().find(x => x.id === id), a = avsOf(id).sort((x, y) => y.data.localeCompare(x.data)), n = nota(id), fav = S.fav.includes(id), d = $("#det");
    const w = works(id), cnt = k => a.filter(x => x.nota === k).length;
    d.innerHTML = `<div class="topr"><button class="ib" id="bk" aria-label="Voltar"><svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg></button><span></span><button class="ib" id="rp2" aria-label="Denunciar perfil">${ic("flag")}</button></div>
 <div class="scroll"><div class="hero"><div class="av" style="width:104px;height:104px;border-radius:34px;margin:0 auto 12px">${av(p, 104)}</div><h1>${esc(p.nome)}</h1><p>${esc(p.cats.join(" · "))}</p>${p.dest ? '<span class="tag" style="display:inline-block;margin-top:8px">Destaque</span>' : ""}${p.on ? '<p style="color:var(--ok);margin-top:6px">● Disponível para novos serviços</p>' : '<p style="margin-top:6px">● Agenda cheia no momento</p>'}</div>
 <div class="acts"><button class="act st" id="rv"><i>${ic("star")}</i>Avaliar</button><button class="act${fav ? " on" : ""}" id="fv"><i>${ic("heart")}</i>${fav ? "Salvo" : "Salvar"}</button><button class="act rd" id="rp"><i>${ic("flag")}</i>Denunciar</button></div>
 <div class="stats"><div><b><span class="star">★</span> ${n ? n.toFixed(1) : "Novo"}</b><small>${a.length} avaliações</small></div><div><b>${tempo(p.desde)}</b><small>no Biko</small></div></div>
 <h2>Sobre</h2><p class="bio">${esc(p.bio)}</p>
 <div class="sk">${(HAB[p.id] || p.cats).map(h => `<span>${esc(h)}</span>`).join("")}</div>
 <h2>Informações</h2><div class="inf"><div class="ic">${ic("pin")}</div><div><small>Bairro</small>${esc(p.bairro)}, Campo Mourão</div></div><div class="inf"><div class="ic">${ic("clock")}</div><div><small>Horário</small>Seg a sáb, 7h às 18h</div></div><div class="inf"><div class="ic">${ic("cash")}</div><div><small>Pagamento</small>Combinado direto com o prestador</div></div><div class="inf"><div class="ic">${ic("chat")}</div><div><small>Contato</small>Pelo WhatsApp, fora do app</div></div>
 <h2 style="margin-top:22px">Trabalhos realizados<small>fotos postadas por ${esc(p.nome.split(" ")[0])}</small></h2>${w.length ? `<div class="gal">${w.map(x => `<figure><img src="${x.img}" alt="${esc(x.leg)}"><figcaption>${esc(x.leg)}</figcaption></figure>`).join("")}</div>` : '<div class="empty">Ainda sem fotos de trabalhos.</div>'}<h2 style="margin-top:22px">Serviços</h2>${p.sv.map(s => `<div class="srv"><span>${esc(s[0])}</span></div>`).join("")}
 <h2 style="margin-top:22px">Avaliações<small>${a.length} no total</small></h2>
 <div class="sum"><div class="big"><b>${n ? n.toFixed(1) : "—"}</b><span class="star">${"★".repeat(Math.round(n))}</span><br><small>${a.length} avaliações</small></div><div class="dist">${[5, 4, 3, 2, 1].map(k => `<div>${k}★<i><u style="width:${a.length ? cnt(k) / a.length * 100 : 0}%"></u></i>${cnt(k)}</div>`).join("")}</div></div>
 ${a.length ? a.map(v => `<div class="rev"><div class="h"><span class="who"><span class="av" style="background:${COR[v.autor.length % 6]}!important;display:grid;place-items:center;color:var(--navy);font-weight:900">${esc(v.autor[0])}</span><span>${esc(v.autor)}<br><small>${v.data.split("-").reverse().join("/")}</small></span></span><span><span class="star">${"★".repeat(v.nota)}</span></span></div>${esc(v.texto)}${v.fotos && v.fotos.length ? `<div class="shots">${v.fotos.map(f => `<img src="${f}" alt="Foto do serviço">`).join("")}</div>` : ""}</div>`).join("") : '<div class="empty"><b>Ainda sem avaliações</b>Contratou? Seja o primeiro a avaliar.</div>'}
 <button class="btn sec" style="width:100%;margin-top:14px" id="rv2">Escrever avaliação</button></div>
 <div class="bar"><button class="btn" id="wp">${ic("wpp")}Chamar no WhatsApp</button></div>`;
    d.classList.add("on"); $("#tabs").style.display = "none";
    $("#bk").onclick = () => { d.classList.remove("on"); $("#tabs").style.display = "flex" };
    $("#wp").onclick = () => window.open("https://wa.me/" + p.wpp + "?text=" + encodeURIComponent("Olá " + p.nome.split(" ")[0] + ", te encontrei no Biko. Você faz " + p.cats[0].toLowerCase() + "?"), "_blank");
    $("#rv").onclick = $("#rv2").onclick = () => review(p); $("#rp").onclick = $("#rp2").onclick = () => report(p);
    d.onclick = e => { if (e.target.matches(".shots img,.gal img")) zoom(e.target.src) }; $("#fv").onclick = () => { S.fav = fav ? S.fav.filter(x => x !== id) : S.fav.concat(id); save(); detail(id); toast(fav ? "Removido dos salvos" : "Prestador salvo") };
}
function sheet(h) { $("#sheet").innerHTML = h; $("#ov").classList.add("on") }
const closeSheet = () => $("#ov").classList.remove("on");
function review(p) {
    let st = 0;
    sheet(`<h3>Avaliar ${esc(p.nome)}</h3><div class="stars" id="st">${[1, 2, 3, 4, 5].map(i => `<button data-s="${i}" aria-label="${i} estrelas">★</button>`).join("")}</div>
 <label for="r-f">Fotos do serviço (opcional, até 3)</label><input class="f" type="file" accept="image/*" multiple id="r-f"><label for="r-t">Como foi?</label><textarea class="f" id="r-t"></textarea>
 <button class="btn" style="width:100%;margin-top:18px" id="r-ok">Enviar avaliação</button>`);
    $("#st").onclick = e => { const b = e.target.closest("button"); if (!b) return; st = +b.dataset.s; $$("#st button").forEach((x, i) => x.classList.toggle("on", i < st)) };
    $("#r-ok").onclick = async () => {
        const fotos = []; for (const f of [...$("#r-f").files].slice(0, 3)) { const x = await pic(f, 480); x && fotos.push(x) } const t = $("#r-t").value.trim(); if (!st || !t) return toast("Escolha as estrelas e conte como foi");
        S.avs.push({ fotos, pid: p.id, autor: "Você", nota: st, texto: t, data: new Date().toISOString().slice(0, 10) }); save(); closeSheet(); detail(p.id); list(); toast("Avaliação publicada")
    }
}
function report(p) {
    sheet(`<h3>Denunciar ${esc(p.nome)}</h3><label for="d-m">Motivo</label><select class="f" id="d-m"><option>Golpe ou cobrança indevida</option><option>Perfil falso</option><option>Serviço mal feito</option><option>Comportamento inadequado</option></select>
 <label for="d-t">Detalhes</label><textarea class="f" id="d-t"></textarea><button class="btn" style="width:100%;margin-top:18px" id="d-ok">Enviar denúncia</button>`);
    $("#d-ok").onclick = () => { S.den.push({ pid: p.id, motivo: $("#d-m").value, texto: $("#d-t").value, data: Date.now() }); save(); closeSheet(); toast("Denúncia enviada para análise") }
}
function filtros() {
    sheet(`<h3>Filtros</h3><label for="x-b">Bairro</label><select class="f" id="x-b"><option value="">Todos os bairros</option>${BAIRROS.map(b => `<option${F.bairro === b ? " selected" : ""}>${b}</option>`).join("")}</select>
 <label for="x-n">Avaliação mínima</label><select class="f" id="x-n">${[[0, "Qualquer nota"], [4, "4,0 ou mais"], [4.5, "4,5 ou mais"]].map(o => `<option value="${o[0]}"${F.min === o[0] ? " selected" : ""}>${o[1]}</option>`).join("")}</select>
 <div style="display:flex;gap:10px;margin-top:18px"><button class="btn sec" id="x-c">Limpar</button><button class="btn" id="x-ok" style="flex:2">Ver resultados</button></div>`);
    $("#x-c").onclick = () => { F.bairro = ""; F.min = 0; closeSheet(); list() }; $("#x-ok").onclick = () => { F.bairro = $("#x-b").value; F.min = +$("#x-n").value; closeSheet(); list() }
}
$("#fbtn").onclick = filtros; $("#ov").onclick = e => { if (e.target.id === "ov") closeSheet() };
$("#q").oninput = e => { F.q = e.target.value; list() };
$("#chips").onclick = e => { const b = e.target.closest("button"); if (!b) return; F.cat = b.dataset.c; chips(); list() };
$("#list").onclick = e => { const b = e.target.closest("[data-p]"); if (b) detail(+b.dataset.p) };
$("#tabs").onclick = e => { const b = e.target.closest("button"); if (b) tab(b.dataset.t) };
$("#catgrid").innerHTML = CATS.map(c => `<button class="cat" data-c="${c[0]}"><span>${c[1]}</span>${c[0]}<small>${provs().filter(p => p.cats.includes(c[0])).length} prestadores</small></button>`).join("");
$("#catgrid").onclick = e => { const b = e.target.closest("button"); if (!b) return; F.cat = b.dataset.c; chips(); list(); tab("home") };
$("#a-s").innerHTML = CATS.map(c => `<option>${c[0]}</option>`).join(""); $("#a-b").innerHTML = BAIRROS.map(b => `<option>${b}</option>`).join("");
$("#dest").onclick = () => toast("Em breve: fale com a equipe do Biko para entrar no topo");
$("#a-ok").onclick = async () => {
    const foto = await pic($("#a-f").files[0]); const n = $("#a-n").value.trim(), w = $("#a-w").value.replace(/\D/g, ""); if (!n || w.length < 10) return toast("Preencha seu nome e um WhatsApp com DDD");
    const s = $("#a-s").value; S.provs.push({ foto, id: 100 + S.provs.length, nome: n, cats: [s], bairro: $("#a-b").value, desde: new Date().toISOString().slice(0, 10), dest: 0, on: 1, wpp: "55" + w, bio: "Atendo em Campo Mourão. Chame no WhatsApp para combinar valor e horário.", sv: [[s, 0]] }); save();
    $("#a-n").value = $("#a-w").value = $("#a-f").value = ""; wk(); list(); tab("home"); toast("Perfil criado! Você já aparece na lista")
};
chips(); list(); wk(); tab("home"); $("#tabs").style.display = "none";
$$(".screen:not(#splash)").forEach(s => s.classList.remove("on"));
