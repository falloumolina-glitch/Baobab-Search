const $ = s => document.querySelector(s);
function showPage(id) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); $(`#${id}`).classList.add('active'); }
function goHome() { showPage('home'); loadHistory(); }
function showSuggestions() { $('#suggestions').classList.remove('hidden'); loadHistory(); }
function liveSuggest() {}

function selectSuggest(text) {
  $('#searchInput').value = text;
  search();
}

function search() {
  let q = $('#searchInput')?.value || $('#searchInput2')?.value;
  if(!q) return;
  $('#searchInput2').value = q;
  saveHistory(q);
  showPage('results');
  $('#resultsList').innerHTML = `
  <div class="result-card">
    <div class="url">wikipedia.org › wiki › ${q.replace(' ', '_')}</div>
    <a class="title">Résultat pour <b>${q}</b> - Baobab Search</a>
    <div class="desc">Voici les informations concernant <b>${q}</b>. L'histoire du <b>Sénégal</b> s'étend sur plusieurs millénaires...</div>
  </div>`;
}

function startVoice() { alert('Recherche vocale bientôt disponible'); }
function startImageSearch() { alert('Recherche par image bientôt disponible'); }

function saveHistory(q) { 
  if(!$('#saveActivity')?.checked) return;
  let h = JSON.parse(localStorage.getItem('hist') || '[]');
  localStorage.setItem('hist', JSON.stringify([q, ...h.filter(x => x !== q)].slice(0,5)));
  loadHistory();
}
function loadHistory() {
  let h = JSON.parse(localStorage.getItem('hist') || '[]');
  $('#historyList').innerHTML = h.map(i => `<div class="item" onclick="selectSuggest('${i}')">${i}</div>`).join('');
}
function clearHistory() { localStorage.removeItem('hist'); loadHistory(); alert('Historique effacé'); }
function setTheme(t) { 
  if(t === 'system') t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t); 
}
function setFontSize(s) { document.body.style.fontSize = s; }

// Fermer suggestions en cliquant dehors
document.addEventListener('click', (e) => {
  if(!e.target.closest('.search-bar') && !e.target.closest('.suggestions')) {
    $('#suggestions').classList.add('hidden');
  }
})

goHome();
