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
const rankingOrder=["weapons","simplySwords","armor","tools","ores","mythicMetals","betterEnd","artifacts","accessories","magic","bosses","adventureZ","mobs","world"].filter(key=>RANKING_DATA[key]);
const rankingLabels={weapons:"Vanilla Weapons",simplySwords:"Simply Swords",armor:"Armor",tools:"Tools",ores:"Vanilla Ores",mythicMetals:"Mythic Metals",betterEnd:"BetterEnd",artifacts:"Artifacts",accessories:"Accessories",magic:"Magic & Spells",bosses:"Bosses",adventureZ:"AdventureZ",mobs:"Mobs",world:"World"};
let activeRanking="weapons";
let MOD_IMAGE_MAP = {};

// Exact image paths are supplied by the original Simply Swords JAR model/texture audit.
// Missing entries intentionally remain text-only; no substitute image is invented.
const WEAPON_IMAGE_MAP = {
  "Twisted Blade":"assets/weapons/simply-swords/twisted_blade.png",
  "Chomp'olotl":"assets/weapons/simply-swords/chompolotl.png",
  "Tempest":"assets/weapons/simply-swords/tempest.png",
  "Enigma":"assets/weapons/simply-swords/enigma.png",
  "Ribboncleaver":"assets/weapons/simply-swords/ribboncleaver.png",
  "Awakened Lichblade":"assets/weapons/simply-swords/awakened_lichblade.png",
  "Slumbering Lichblade":"assets/weapons/simply-swords/slumbering_lichblade.png",
  "Waking Lichblade":"assets/weapons/simply-swords/waking_lichblade.png",
  "Flamewind":"assets/weapons/simply-swords/flamewind.png",
  "Ionbound Stormscale":"assets/weapons/simply-swords/ionbound_stormscale.png",
  "Stormscale":"assets/weapons/simply-swords/stormscale.png",
  "Soul Pyre":"assets/weapons/simply-swords/soulpyre.png",
  "Caelestis":"assets/weapons/simply-swords/caelestis.png",
  "Dawnquiver":"assets/weapons/simply-swords/dawnquiver.png",
  "Riftmane":"assets/weapons/simply-swords/riftmane.png",
  "Waxweaver":"assets/weapons/simply-swords/waxweaver.png",
  "Bloodwake":"assets/weapons/simply-swords/bloodwake.png",
  "Wraithfang":"assets/weapons/simply-swords/wraithfang.png",
  "Wraithmaw":"assets/weapons/simply-swords/wraithmaw.png",
  "Brimstone Claymore":"assets/weapons/simply-swords/brimstone_claymore.png",
  "The Devourer":"assets/weapons/simply-swords/the_devourer.png",
  "The Watcher":"assets/weapons/simply-swords/watcher_claymore.png",
  "Dormant Relic":"assets/weapons/simply-swords/dormant_relic.png",
  "Emberblade":"assets/weapons/simply-swords/emberblade.png",
  "Harbinger":"assets/weapons/simply-swords/harbinger.png",
  "Righteous Relic":"assets/weapons/simply-swords/righteous_relic.png",
  "Soulrender":"assets/weapons/simply-swords/soulrender.png",
  "Soulstalker":"assets/weapons/simply-swords/soulstalker.png",
  "Stormbringer":"assets/weapons/simply-swords/stormbringer.png",
  "Sunfire":"assets/weapons/simply-swords/sunfire.png",
  "Tainted Relic":"assets/weapons/simply-swords/tainted_relic.png",
  "Emberlash":"assets/weapons/simply-swords/emberlash.png",
  "Soulstealer":"assets/weapons/simply-swords/soulstealer.png",
  "Magispear":"assets/weapons/simply-swords/magispear.png",
  "Decaying Relic":"assets/weapons/simply-swords/decaying_relic.png",
  "Magiscythe":"assets/weapons/simply-swords/magiscythe.png",
  "Shadowsting":"assets/weapons/simply-swords/shadowsting.png",
  "Watching Warglaive":"assets/weapons/simply-swords/watching_warglaive.png",
  "Arcanethyst":"assets/weapons/simply-swords/arcanethyst.png",
  "Icewhisper":"assets/weapons/simply-swords/icewhisper.png",
  "Thunderbrand":"assets/weapons/simply-swords/thunderbrand.png",
  "Dreadwhisper":"assets/weapons/simply-swords/dreadwhisper.png",
  "Magiblade":"assets/weapons/simply-swords/magiblade.png",
  "Star's Edge":"assets/weapons/simply-swords/stars_edge.png",
  "Storm's Edge":"assets/weapons/simply-swords/storms_edge.png",
  "Whisperwind":"assets/weapons/simply-swords/whisperwind.png",
  "Gloampiercer":"assets/weapons/simply-swords/gloampiercer.png",
  "Livyatan":"assets/weapons/simply-swords/livyatan.png",
  "Molten Edge":"assets/weapons/simply-swords/molten_edge.png",
  "Wickpiercer":"assets/weapons/simply-swords/wickpiercer.png",
  "Bramblethorn":"assets/weapons/simply-swords/bramblethorn.png"
};

function renderRanking(){
 rankingTabs.innerHTML="";
 rankingOrder.forEach(key=>{const b=document.createElement("button");b.className="rank-tab"+(key===activeRanking?" active":"");b.textContent=rankingLabels[key]||key;b.addEventListener("click",()=>{activeRanking=key;renderRanking()});rankingTabs.appendChild(b)});
 const group=RANKING_DATA[activeRanking];
 if(!group){rankingBasis.textContent="No ranking data is available for this category.";rankingRows.innerHTML="";return}
 rankingBasis.textContent=group.basis||"Comparison basis not supplied.";rankingRows.innerHTML="";
 if(!group.entries || !group.entries.length){const tr=document.createElement("tr");tr.innerHTML=`<td colspan="4" class="rank-empty"><span>✧</span><b>${escapeHtml(group.label||activeRanking)} catalogue pending verification</b><small>This category is reserved in the guide, but no unsupported ranking has been published.</small></td>`;rankingRows.appendChild(tr);return}
 group.entries.forEach(([name,rank,stat,note])=>{
   const tr=document.createElement("tr");
   const rankCell=document.createElement("td");
   const rankBadge=document.createElement("span");
   rankBadge.className="rank-number";rankBadge.textContent=rank;rankCell.appendChild(rankBadge);
   const nameCell=document.createElement("td");
   const imagePath=activeRanking==="simplySwords" ? WEAPON_IMAGE_MAP[name] : ((MOD_IMAGE_MAP[activeRanking] || {})[name] || null);
   if(imagePath){
     const img=document.createElement("img");
     img.className="rank-item-image";img.src=imagePath;img.alt="";img.loading="lazy";img.decoding="async";
     img.addEventListener("error",()=>img.remove(),{once:true});
     nameCell.appendChild(img);
   }
   const itemName=document.createElement("b");itemName.textContent=name;nameCell.appendChild(itemName);
   const statCell=document.createElement("td");statCell.textContent=stat;
   const noteCell=document.createElement("td");noteCell.textContent=note;
   tr.append(rankCell,nameCell,statCell,noteCell);rankingRows.appendChild(tr);
 });
}
renderRanking();

// Load mapped mod item icons. The dedicated Simply Swords map above stays untouched.
fetch("mod-image-map.json")
 .then(response=>{if(!response.ok)throw new Error("Image map failed to load: "+response.status);return response.json()})
 .then(imageMap=>{MOD_IMAGE_MAP=imageMap||{};renderRanking()})
 .catch(error=>console.error("Could not load mod item images:",error));
