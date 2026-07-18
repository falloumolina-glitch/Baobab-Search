function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function goHome() { showPage('home'); }

function search(e) {
  e.preventDefault();
  let q = document.getElementById('searchInput').value;
  if(!q) return;
  saveHistory(q);
  showPage('results');
  loadResults(q);
}

function quickSearch(term) {
  document.getElementById('searchInput').value = term;
  search(new Event('submit'));
}

function loadResults(q) {
  document.getElementById('resultsList').innerHTML = `
    <div class="result">
      <a class="title" href="#">Wikipédia - Histoire du Sénégal</a>
      <div class="url">wikipedia.org › wiki › Histoire_du_Sénégal</div>
      <div class="desc">Informations sur l'histoire du Sénégal depuis les premiers royaumes jusqu'à l'indépendance en 1960...</div>
    </div>
    <div class="result">
      <a class="title" href="#">Résultat pour: ${q}</a>
      <div class="url">exemple.com › ${q.replace(' ','-')}</div>
      <div class="desc">Ceci est un exemple de description pour ta recherche sur Baobab Search.</div>
    </div>
  `;
}

function filter(type) {
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function saveHistory(q) {
  let h = JSON.parse(localStorage.getItem('hist') || '[]');
  h = [q, ...h.filter(x => x !== q)].slice(0,10);
  localStorage.setItem('hist', JSON.stringify(h));
}
function clearHistory() { localStorage.removeItem('hist'); alert('Historique effacé'); }

// Charger thème au démarrage
document.addEventListener('DOMContentLoaded', () => {
  document.body.className = localStorage.getItem('theme') || 'light';
});
