const categories = ["All", ...new Set(SERVER_DATA.map(m => m.category))];
const filters = document.getElementById("filters");
const grid = document.getElementById("modGrid");
const search = document.getElementById("searchInput");
const empty = document.getElementById("emptyState");
let active = "All";
document.getElementById("modCount").textContent = String(SERVER_DATA.length).padStart(2,"0");
categories.forEach((category, i) => {
  const b = document.createElement("button");
  b.className = "filter-btn" + (i===0 ? " active" : "");
  b.textContent = category;
  b.addEventListener("click", () => {
    active = category;
    filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));
    renderMods();
  });
  filters.appendChild(b);
});
function renderMods(){
  const q = search.value.trim().toLowerCase();
  const shown = SERVER_DATA.filter(m => (active==="All" || m.category===active) &&
    [m.name,m.category,m.description,m.status,...m.features].join(" ").toLowerCase().includes(q));
  grid.innerHTML = "";
  shown.forEach((m) => {
    const card = document.createElement("article");
    card.className = "mod-card";
    card.tabIndex = 0;
    card.setAttribute("role","button");
    card.setAttribute("aria-label",`Read about ${m.name}`);
    card.innerHTML = `<div class="mod-top"><span class="mod-category">${escapeHtml(m.category)}</span><span class="mod-status">${escapeHtml(m.status)}</span></div><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.description)}</p><div class="mod-foot">${escapeHtml(m.version)} · VIEW ENTRY ↗</div>`;
    card.addEventListener("click",()=>openMod(m));
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openMod(m)}});
    grid.appendChild(card);
  });
  empty.hidden = shown.length>0;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
const modal=document.getElementById("modal");
function openMod(m){
  document.getElementById("modalCategory").textContent=m.category.toUpperCase()+" / "+m.status.toUpperCase();
  document.getElementById("modalTitle").textContent=m.name;
  document.getElementById("modalVersion").textContent=m.version;
  document.getElementById("modalDescription").textContent=m.description;
  const ul=document.getElementById("modalFeatures");ul.innerHTML="";
  m.features.forEach(f=>{const li=document.createElement("li");li.textContent=f;ul.appendChild(li)});
  const links=document.getElementById("modalLinks");links.innerHTML="";
  m.links.forEach(([label,url])=>{const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noreferrer";a.textContent=label.toUpperCase()+" ↗";links.appendChild(a)});
  modal.hidden=false;document.body.style.overflow="hidden";document.getElementById("modalClose").focus();
}
function closeModal(){modal.hidden=true;document.body.style.overflow=""}
document.getElementById("modalClose").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
search.addEventListener("input",renderMods);
const bossGrid=document.getElementById("bossGrid");
BOSS_DATA.forEach((b,i)=>{
 const el=document.createElement("article");el.className="boss-card";
 el.innerHTML=`<div class="boss-icon">✦</div><small>ENCOUNTER 0${i+1} · ${escapeHtml(b.source.toUpperCase())}</small><h3>${escapeHtml(b.name)}</h3><p>${escapeHtml(b.note)}</p>`;
 bossGrid.appendChild(el);
});
const menu=document.getElementById("menuToggle"),nav=document.getElementById("nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
renderMods();

// Ranked compendium: categories are data-driven and the source basis is always visible.
const rankingTabs=document.getElementById("rankingTabs");
const rankingRows=document.getElementById("rankingRows");
const rankingBasis=document.getElementById("rankingBasis");
const rankingOrder=["weapons","armor","tools","ores","accessories","magic","bosses","mobs","world"];
const rankingLabels={weapons:"Weapons",armor:"Armor",tools:"Tools",ores:"Ores",accessories:"Accessories",magic:"Magic",bosses:"Bosses",mobs:"Mobs",world:"World"};
let activeRanking="weapons";
function renderRanking(){
 rankingTabs.innerHTML="";
 rankingOrder.forEach(key=>{const b=document.createElement("button");b.className="rank-tab"+(key===activeRanking?" active":"");b.textContent=rankingLabels[key];b.addEventListener("click",()=>{activeRanking=key;renderRanking()});rankingTabs.appendChild(b)});
 const group=RANKING_DATA[activeRanking];rankingBasis.textContent=group.basis;rankingRows.innerHTML="";
 if(!group.entries.length){const tr=document.createElement("tr");tr.innerHTML=`<td colspan="4" class="rank-empty"><span>✧</span><b>${escapeHtml(group.label)} catalogue pending verification</b><small>This category is reserved in the guide, but no unsupported ranking has been published.</small></td>`;rankingRows.appendChild(tr);return}
 group.entries.forEach(([name,rank,stat,note])=>{const tr=document.createElement("tr");tr.innerHTML=`<td><span class="rank-number">${escapeHtml(rank)}</span></td><td><b>${escapeHtml(name)}</b></td><td>${escapeHtml(stat)}</td><td>${escapeHtml(note)}</td>`;rankingRows.appendChild(tr)});
}
renderRanking();
