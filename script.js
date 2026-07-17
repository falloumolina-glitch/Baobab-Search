const YOUTUBE_KEY = "COLLE_TA_CLE_ICI";
let currentTab = 'all';
let currentQuery = '';

const translations = {
  fr: { dir:"ltr", title:"Paramètres", langDisplay:"Langue d'affichage", langResults:"Langue des résultats", region:"Région géographique", period:"Période", verbatim:"Recherche exacte Verbatim", hist:"Enregistrer l'historique Web", pers:"Personnalisation des résultats", safe:"Filtrage SafeSearch", bar:"Position de la barre", auto:"Saisie semi-automatique", tab:"Ouvrir dans un nouvel onglet", voice:"Recherche vocale", theme:"Thème", legal:"Légal", privacy:"Politique de confidentialité", terms:"Conditions d'utilisation", save:"Enregistrer", saved:"✓ Paramètres enregistrés!", back:"← Retour à l'accueil", all:"Tous", images:"Images", videos:"Vidéos", news:"Actualités", ai:"✨ Résumé IA par Baobab", searchPlaceholder:"Recher sur Baobab..." },
  en: { dir:"ltr", title:"Settings", langDisplay:"Display Language", langResults:"Results Language", region:"Region", period:"Time", verbatim:"Exact Verbatim Search", hist:"Save Web History", pers:"Personalize Results", safe:"SafeSearch Filter", bar:"Bar Position", auto:"Autocomplete", tab:"Open in new tab", voice:"Voice Search", theme:"Theme", legal:"Legal", privacy:"Privacy Policy", terms:"Terms of Service", save:"Save", saved:"✓ Settings saved!", back:"← Back to Home", all:"All", images:"Images", videos:"Videos", news:"News", ai:"✨ AI Summary by Baobab", searchPlaceholder:"Search on Baobab..." },
  es: { dir:"ltr", title:"Configuración", langDisplay:"Idioma de visualización", langResults:"Idioma de resultados", region:"Región", period:"Periodo", verbatim:"Búsqueda exacta", hist:"Guardar historial web", pers:"Personalizar resultados", safe:"Filtro SafeSearch", bar:"Posición de la barra", auto:"Autocompletar", tab:"Abrir en pestaña nueva", voice:"Búsqueda por voz", theme:"Tema", legal:"Legal", privacy:"Política de privacidad", terms:"Términos de servicio", save:"Guardar", saved:"✓ ¡Configuración guardada!", back:"← Volver al inicio", all:"Todo", images:"Imágenes", videos:"Vídeos", news:"Noticias", ai:"✨ Resumen IA por Baobab", searchPlaceholder:"Buscar en Baobab..." },
  ru: { dir:"ltr", title:"Настройки", langDisplay:"Язык интерфейса", langResults:"Язык результатов", region:"Регион", period:"Период", verbatim:"Точный поиск", hist:"Сохранять историю", pers:"Персонализация", safe:"Фильтр SafeSearch", bar:"Положение панели", auto:"Автодополнение", tab:"Открывать в новой вкладке", voice:"Голосовой поиск", theme:"Тема", legal:"Правовая информация", privacy:"Политика конфиденциальности", terms:"Условия использования", save:"Сохранить", saved:"✓ Настройки сохранены!", back:"← На главную", all:"Все", images:"Картинки", videos:"Видео", news:"Новости", ai:"✨ ИИ-сводка от Baobab", searchPlaceholder:"Поиск в Baobab..." },
  de: { dir:"ltr", title:"Einstellungen", langDisplay:"Anzeigesprache", langResults:"Ergebnisprache", region:"Region", period:"Zeitraum", verbatim:"Exakte Suche", hist:"Webverlauf speichern", pers:"Ergebnisse personalisieren", safe:"SafeSearch Filter", bar:"Position der Leiste", auto:"Autocomplete", tab:"In neuem Tab öffnen", voice:"Sprachsuche", theme:"Thema", legal:"Rechtliches", privacy:"Datenschutz", terms:"Nutzungsbedingungen", save:"Speichern", saved:"✓ Einstellungen gespeichert!", back:"← Zurück zur Startseite", all:"Alle", images:"Bilder", videos:"Videos", news:"Nachrichten", ai:"✨ KI-Zusammenfassung von Baobab", searchPlaceholder:"Auf Baobab suchen..." },
  it: { dir:"ltr", title:"Impostazioni", langDisplay:"Lingua di visualizzazione", langResults:"Lingua dei risultati", region:"Regione", period:"Periodo", verbatim:"Ricerca esatta", hist:"Salva cronologia web", pers:"Personalizza risultati", safe:"Filtro SafeSearch", bar:"Posizione barra", auto:"Completamento automatico", tab:"Apri in nuova scheda", voice:"Ricerca vocale", theme:"Tema", legal:"Legale", privacy:"Informativa sulla privacy", terms:"Termini di servizio", save:"Salva", saved:"✓ Impostazioni salvate!", back:"← Torna alla home", all:"Tutto", images:"Immagini", videos:"Video", news:"Notizie", ai:"✨ Riepilogo IA di Baobab", searchPlaceholder:"Cerca su Baobab..." },
  pt: { dir:"ltr", title:"Configurações", langDisplay:"Idioma de exibição", langResults:"Idioma dos resultados", region:"Região", period:"Período", verbatim:"Pesquisa exata", hist:"Salvar histórico da web", pers:"Personalizar resultados", safe:"Filtro SafeSearch", bar:"Posição da barra", auto:"Preenchimento automático", tab:"Abrir em nova aba", voice:"Pesquisa por voz", theme:"Tema", legal:"Legal", privacy:"Política de privacidade", terms:"Termos de serviço", save:"Salvar", saved:"✓ Configurações salvas!", back:"← Voltar para início", all:"Tudo", images:"Imagens", videos:"Vídeos", news:"Notícias", ai:"✨ Resumo IA da Baobab", searchPlaceholder:"Pesquisar no Baobab..." },
  "pt-BR": { dir:"ltr", title:"Configurações", langDisplay:"Idioma de exibição", langResults:"Idioma dos resultados", region:"Região", period:"Período", verbatim:"Pesquisa exata", hist:"Salvar histórico da web", pers:"Personalizar resultados", safe:"Filtro SafeSearch", bar:"Posição da barra", auto:"Preenchimento automático", tab:"Abrir em nova aba", voice:"Pesquisa por voz", theme:"Tema", legal:"Legal", privacy:"Política de privacidade", terms:"Termos de serviço", save:"Salvar", saved:"✓ Configurações salvas!", back:"← Voltar para início", all:"Tudo", images:"Imagens", videos:"Vídeos", news:"Notícias", ai:"✨ Resumo IA da Baobab", searchPlaceholder:"Pesquisar no Baobab..." },
  nl: { dir:"ltr", title:"Instellingen", langDisplay:"Weergavetaal", langResults:"Resultaat taal", region:"Regio", period:"Periode", verbatim:"Exacte zoekopdracht", hist:"Webgeschiedenis opslaan", pers:"Resultaten personaliseren", safe:"SafeSearch-filter", bar:"Balkpositie", auto:"Automatisch aanvullen", tab:"Openen in nieuw tabblad", voice:"Spraakzoekopdracht", theme:"Thema", legal:"Juridisch", privacy:"Privacybeleid", terms:"Gebruiksvoorwaarden", save:"Opslaan", saved:"✓ Instellingen opgeslagen!", back:"← Terug naar start", all:"Alles", images:"Afbeeldingen", videos:"Video's", news:"Nieuws", ai:"✨ AI-samenvatting door Baobab", searchPlaceholder:"Zoeken op Baobab..." },
  ar: { dir:"rtl", title:"الإعدادات", langDisplay:"لغة العرض", langResults:"لغة النتائج", region:"المنطقة الجغرافية", period:"الفترة الزمنية", verbatim:"بحث حرفي", hist:"حفظ سجل الويب", pers:"تخصيص النتائج", safe:"فلتر البحث الآمن", bar:"موضع الشريط", auto:"الإكمال التلقائي", tab:"فتح في علامة تبويب جديدة", voice:"البحث الصوتي", theme:"السمة", legal:"قانوني", privacy:"سياسة الخصوصية", terms:"شروط الاستخدام", save:"حفظ", saved:"✓ تم حفظ الإعدادات!", back:"العودة إلى الصفحة الرئيسية →", all:"الكل", images:"الصور", videos:"الفيديوهات", news:"الأخبار", ai:"✨ ملخص الذكاء الاصطناعي من Baobab", searchPlaceholder:"ابحث في Baobab..." },
  wo: { dir:"ltr", title:"Réglages", langDisplay:"Làkk bu feeñ", langResults:"Làkku nataal yi", region:"Dëkk", period:"Jamono", verbatim:"Seet bu leer", hist:"Denc nataal yi", pers:"Nataal yi ci sa bopp", safe:"SafeSearch", bar:"Tof bi", auto:"Bindu automatic", tab:"Ubbi ci wendu bees", voice:"Seet ci kàddu", theme:"Dëmm", legal:"Digi", privacy:"Tèral bu nekk", terms:"Ndigal yu jëfe", save:"Denc", saved:"✓ Réglages bi denc na!", back:"← Dellu fàttaliku", all:"Lépp", images:"Nataal", videos:"Video", news:"Laj", ai:"✨ AI bi Baobab", searchPlaceholder:"Seet ci Baobab..." }
};

function t(k){ const lang = getSettings().uiLanguage; return translations?.[k] || translations['fr'][k]; }

function getSettings() {
  return {
    uiLanguage: localStorage.getItem('uiLanguage') || 'fr',
    resultsLanguage: localStorage.getItem('resultsLanguage') || 'any',
    region: localStorage.getItem('region') || 'sn',
    timeFilter: localStorage.getItem('timeFilter') || 'any',
    verbatim: localStorage.getItem('verbatim') === 'true',
    saveHistory: localStorage.getItem('saveHistory')!== 'false',
    personalization: localStorage.getItem('personalization') === 'true',
    safeSearch: localStorage.getItem('safeSearch') || 'off',
    barPosition: localStorage.getItem('barPosition') || 'top',
    autocomplete: localStorage.getItem('autocomplete')!== 'false',
    openNewTab: localStorage.getItem('openNewTab') === 'true',
    voiceSearch: localStorage.getItem('voiceSearch')!== 'false',
    theme: localStorage.getItem('theme') || 'system'
  }
}

function saveSettings() {
  localStorage.setItem('uiLanguage', document.getElementById('uiLanguage').value);
  localStorage.setItem('resultsLanguage', document.getElementById('resultsLanguage').value);
  localStorage.setItem('region', document.getElementById('region').value);
  localStorage.setItem('timeFilter', document.getElementById('timeFilter').value);
  localStorage.setItem('verbatim', document.getElementById('verbatim').checked);
  localStorage.setItem('saveHistory', document.getElementById('saveHistory').checked);
  localStorage.setItem('personalization', document.getElementById('personalization').checked);
  localStorage.setItem('safeSearch', document.getElementById('safeSearch').value);
  localStorage.setItem('barPosition', document.getElementById('barPosition').value);
  localStorage.setItem('autocomplete', document.getElementById('autocomplete').checked);
  localStorage.setItem('openNewTab', document.getElementById('openNewTab').checked);
  localStorage.setItem('voiceSearch', document.getElementById('voiceSearch').checked);
  localStorage.setItem('theme', document.getElementById('theme').value);
  applyTranslations();
  applyTheme();
  applyBarPosition();
  document.getElementById('saveMsg').innerText = t('saved');
  document.getElementById('saveMsg').classList.remove('hidden');
  setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000);
}

function applyTranslations() {
  const lang = getSettings().uiLanguage;
  const tr = translations;
  document.documentElement.lang = lang;
  document.documentElement.dir = tr.dir; // ICI POUR ARABE RTL

  // PARAMETRES
  document.querySelector('#settingsPage h2').innerText = tr.title;
  document.querySelectorAll('#settingsPage h3')[0].innerText = "1. " + tr.langDisplay;
  document.querySelectorAll('#settingsPage label span')[0].innerText = tr.langDisplay;
  document.querySelectorAll('#settingsPage label span')[1].innerText = tr.langResults;
  document.querySelectorAll('#settingsPage label span')[2].innerText = tr.region;
  document.querySelectorAll('#settingsPage h3')[1].innerText = "2. " + tr.period;
  document.querySelectorAll('#settingsPage label span')[3].innerText = tr.verbatim;
  document.querySelectorAll('#settingsPage h3')[2].innerText = "3. " + "Confidentialité";
  document.querySelectorAll('#settingsPage label span')[4].innerText = tr.hist;
  document.querySelectorAll('#settingsPage label span')[5].innerText = tr.pers;
  document.querySelectorAll('#settingsPage label span')[6].innerText = tr.safe;
  document.querySelectorAll('#settingsPage h3')[3].innerText = "4. Interface";
  document.querySelectorAll('#settingsPage label span')[7].innerText = tr.bar;
  document.querySelectorAll('#settingsPage label span')[8].innerText = tr.auto;
  document.querySelectorAll('#settingsPage label span')[9].innerText = tr.tab;
  document.querySelectorAll('#settingsPage label span')[10].innerText = tr.voice;
  document.querySelectorAll('#settingsPage label span')[11].innerText = tr.theme;
  document.querySelectorAll('#settingsPage h3')[4].innerText = "5. " + tr.legal;
  document.querySelectorAll('#settingsPage button')[2].innerText = tr.privacy;
  document.querySelectorAll('#settingsPage button')[3].innerText = tr.terms;
  document.querySelector('#settingsPage button.bg-gradient-to-r').innerText = tr.save;
  document.querySelector('#settingsPage button.text-blue-600').innerText = tr.back;

  // HOME + RESULTATS
  if(document.getElementById('searchInput')) document.getElementById('searchInput').placeholder = tr.searchPlaceholder;
  if(document.getElementById('tab-all')) document.getElementById('tab-all').innerText = tr.all;
  if(document.getElementById('tab-images')) document.getElementById('tab-images').innerText = tr.images;
  if(document.getElementById('tab-videos')) document.getElementById('tab-videos').innerText = tr.videos;
  if(document.getElementById('tab-news')) document.getElementById('tab-news').innerText = tr.news;
  if(document.querySelector('#aiSummary p.font-semibold')) document.querySelector('#aiSummary p.font-semibold').innerText = tr.ai;
}

function applyTheme() { const theme = getSettings().theme; if(theme === 'system') { document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches); } else { document.documentElement.classList.toggle('dark', theme === 'dark'); } }
function applyBarPosition() { const pos = getSettings().barPosition; if(pos === 'bottom') { document.getElementById('topBar').classList.add('hidden'); document.getElementById('bottomBar').classList.remove('hidden'); } else { document.getElementById('topBar').classList.remove('hidden'); document.getElementById('bottomBar').classList.add('hidden'); } }
function showPage(pageId) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); document.getElementById(pageId).classList.add('active'); window.scrollTo(0,0); }
function switchTab(tab) { currentTab = tab; document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('border-blue-600', 'text-blue-600', 'font-semibold')); document.getElementById(`tab-${tab}`).classList.add('border-blue-600', 'text-blue-600', 'font-semibold'); if(currentQuery) search(); }
function startVoice(iconId) { if(!getSettings().voiceSearch) return; const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SpeechRecognition) return; let recognition = new SpeechRecognition(); recognition.lang = getSettings().uiLanguage; document.getElementById(iconId).classList.add('text-red-500', 'animate-pulse'); recognition.onresult = (event) => { document.getElementById('searchInput').value = event.results[0][0].transcript; search(); }; recognition.onend = () => document.getElementById(iconId).classList.remove('text-red-500', 'animate-pulse'); recognition.start(); }
function buildSearchUrl(query) { const s = getSettings(); let url = `https://www.google.com/search?q=${encodeURIComponent(query)}`; if(s.resultsLanguage!== 'any') url += `&lr=lang_${s.resultsLanguage}`; if(s.region!== 'world') url += `&gl=${s.region}`; if(currentTab === 'images') url += `&tbm=isch`; if(currentTab === 'videos') url += `&tbm=vid`; if(currentTab === 'news') url += `&tbm=nws`; return url; }
function search(event) { if(event) event.preventDefault(); let query = document.getElementById('searchInput')?.value || document.getElementById('searchInputResults').value; if(!query) return; const s = getSettings(); currentQuery = query; document.getElementById('searchInputResults').value = query; showPage('resultsPage'); document.getElementById('resultCount').innerText = `${t('all')}: "${query}"`; document.getElementById('aiText').innerText = `${t('ai')}: ${query}`; const searchUrl = buildSearchUrl(query); const target = s.openNewTab? '_blank' : '_self'; let html = ''; for(let i=1; i<=5; i++) { html += `<div><a href="${searchUrl}" target="${target}" class="text-xl text-blue-700 hover:underline">${query} - ${t('all')} ${i}</a><p class="text-sm text-green-700">baobab.com/resultat-${i}</p></div>`; } document.getElementById('resultsList').innerHTML = html; }

document.addEventListener('DOMContentLoaded', () => { const s = getSettings(); document.getElementById('uiLanguage').value = s.uiLanguage; document.getElementById('resultsLanguage').value = s.resultsLanguage; document.getElementById('region').value = s.region; applyTranslations(); applyTheme(); applyBarPosition(); });
