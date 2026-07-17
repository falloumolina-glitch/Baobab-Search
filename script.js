const YOUTUBE_KEY = "COLLE_TA_CLE_ICI";
let currentQuery = '';

const translations = {
  fr: {dir:"ltr",set_title:"Paramètres",set_account_title:"1. Compte et Synchronisation",set_account_info:"Gestion du Compte",set_sync:"Synchronisation",set_devices:"Gestion des appareils",set_lang_title:"2. Langues et Région",set_lang_display:"Langue d'affichage",set_lang_second:"Langues secondaires",set_region:"Région et Fuseau horaire",set_security_title:"3. Sécurité et Confidentialité",set_2fa:"Validation en deux étapes 2FA",set_bio:"Authentification biométrique",set_perms:"Autorisations",set_remote_wipe:"Effacement à distance",set_antimalware:"Scan Anti-Malware",set_activity:"Activité et Historique",set_pref_title:"4. Préférences d'Utilisation",set_access:"Accessibilité",set_theme:"Thème",set_notif:"Notifications",set_storage:"Préférences de stockage",set_bar:"Position de la barre",set_save_btn:"Enregistrer",saveMsg:"✓ Paramètres enregistrés!",set_back_btn:"← Retour à l'accueil",placeholder:"Recher sur Baobab..."},
  en: {dir:"ltr",set_title:"Settings",set_account_title:"1. Account & Sync",set_account_info:"Account Management",set_sync:"Synchronization",set_devices:"Device Management",set_lang_title:"2. Languages & Region",set_lang_display:"Display Language",set_lang_second:"Secondary Languages",set_region:"Region & Timezone",set_security_title:"3. Security & Privacy",set_2fa:"Two-Factor Authentication 2FA",set_bio:"Biometric Authentication",set_perms:"Permissions",set_remote_wipe:"Remote Wipe",set_antimalware:"Anti-Malware Scan",set_activity:"Activity & History",set_pref_title:"4. Usage Preferences",set_access:"Accessibility",set_theme:"Theme",set_notif:"Notifications",set_storage:"Storage Preferences",set_bar:"Bar Position",set_save_btn:"Save",saveMsg:"✓ Settings saved!",set_back_btn:"← Back to Home",placeholder:"Search on Baobab..."},
  es: {dir:"ltr",set_title:"Configuración",set_account_title:"1. Cuenta y Sincronización",set_account_info:"Gestión de Cuenta",set_sync:"Sincronización",set_devices:"Gestión de Dispositivos",set_lang_title:"2. Idiomas y Región",set_lang_display:"Idioma de visualización",set_lang_second:"Idiomas secundarios",set_region:"Región y Zona Horaria",set_security_title:"3. Seguridad y Privacidad",set_2fa:"Autenticación de dos factores",set_bio:"Autenticación biométrica",set_perms:"Permisos",set_remote_wipe:"Borrado remoto",set_antimalware:"Escaneo Anti-Malware",set_activity:"Actividad e Historial",set_pref_title:"4. Preferencias de Uso",set_access:"Accesibilidad",set_theme:"Tema",set_notif:"Notificaciones",set_storage:"Preferencias de almacenamiento",set_bar:"Posición de la barra",set_save_btn:"Guardar",saveMsg:"✓ ¡Configuración guardada!",set_back_btn:"← Volver al inicio",placeholder:"Buscar en Baobab..."},
  ar: {dir:"rtl",set_title:"الإعدادات",set_account_title:"1. الحساب والمزامنة",set_account_info:"إدارة الحساب",set_sync:"المزامنة",set_devices:"إدارة الأجهزة",set_lang_title:"2. اللغات والمنطقة",set_lang_display:"لغة العرض",set_lang_second:"اللغات الثانوية",set_region:"المنطقة والمنطقة الزمنية",set_security_title:"3. الأمان والخصوصية",set_2fa:"المصادقة الثنائية",set_bio:"المصادقة البيومترية",set_perms:"الأذونات",set_remote_wipe:"المسح عن بعد",set_antimalware:"فحص البرامج الضارة",set_activity:"النشاط والسجل",set_pref_title:"4. تفضيلات الاستخدام",set_access:"إمكانية الوصول",set_theme:"السمة",set_notif:"الإشعارات",set_storage:"تفضيلات التخزين",set_bar:"موضع الشريط",set_save_btn:"حفظ",saveMsg:"✓ تم حفظ الإعدادات!",set_back_btn:"العودة إلى الصفحة الرئيسية →",placeholder:"ابحث في Baobab..."},
  ru: {dir:"ltr",set_title:"Настройки",set_account_title:"1. Аккаунт и Синхронизация",set_account_info:"Управление аккаунтом",set_sync:"Синхронизация",set_devices:"Управление устройствами",set_lang_title:"2. Языки и Регион",set_lang_display:"Язык интерфейса",set_lang_second:"Второстепенные языки",set_region:"Регион и Часовой пояс",set_security_title:"3. Безопасность",set_2fa:"Двухфакторная аутентификация",set_bio:"Биометрия",set_perms:"Разрешения",set_remote_wipe:"Удаленное стирание",set_antimalware:"Антивирус",set_activity:"Активность и История",set_pref_title:"4. Настройки",set_access:"Доступность",set_theme:"Тема",set_notif:"Уведомления",set_storage:"Хранилище",set_bar:"Положение панели",set_save_btn:"Сохранить",saveMsg:"✓ Настройки сохранены!",set_back_btn:"← На главную",placeholder:"Поиск в Baobab..."},
  de: {dir:"ltr",set_title:"Einstellungen",set_account_title:"1. Konto & Synchronisation",set_account_info:"Kontoverwaltung",set_sync:"Synchronisierung",set_devices:"Geräteverwaltung",set_lang_title:"2. Sprachen & Region",set_lang_display:"Anzeigesprache",set_lang_second:"Zusätzliche Sprachen",set_region:"Region & Zeitzone",set_security_title:"3. Sicherheit",set_2fa:"Zwei-Faktor-Authentifizierung",set_bio:"Biometrische Authentifizierung",set_perms:"Berechtigungen",set_remote_wipe:"Fernlöschung",set_antimalware:"Anti-Malware Scan",set_activity:"Aktivität & Verlauf",set_pref_title:"4. Nutzungseinstellungen",set_access:"Barrierefreiheit",set_theme:"Thema",set_notif:"Benachrichtigungen",set_storage:"Speichereinstellungen",set_bar:"Position der Leiste",set_save_btn:"Speichern",saveMsg:"✓ Einstellungen gespeichert!",set_back_btn:"← Zurück",placeholder:"Auf Baobab suchen..."},
  it: {dir:"ltr",set_title:"Impostazioni",set_account_title:"1. Account e Sincronizzazione",set_account_info:"Gestione Account",set_sync:"Sincronizzazione",set_devices:"Gestione Dispositivi",set_lang_title:"2. Lingue e Regione",set_lang_display:"Lingua di visualizzazione",set_lang_second:"Lingue secondarie",set_region:"Regione e Fuso Orario",set_security_title:"3. Sicurezza",set_2fa:"Autenticazione a due fattori",set_bio:"Autenticazione biometrica",set_perms:"Autorizzazioni",set_remote_wipe:"Cancellazione remota",set_antimalware:"Scansione Anti-Malware",set_activity:"Attività e Cronologia",set_pref_title:"4. Preferenze",set_access:"Accessibilità",set_theme:"Tema",set_notif:"Notifiche",set_storage:"Preferenze di archiviazione",set_bar:"Posizione barra",set_save_btn:"Salva",saveMsg:"✓ Impostazioni salvate!",set_back_btn:"← Torna",placeholder:"Cerca su Baobab..."},
  pt: {dir:"ltr",set_title:"Configurações",set_account_title:"1. Conta e Sincronização",set_account_info:"Gestão da Conta",set_sync:"Sincronização",set_devices:"Gestão de Dispositivos",set_lang_title:"2. Idiomas e Região",set_lang_display:"Idioma de exibição",set_lang_second:"Idiomas secundários",set_region:"Região e Fuso Horário",set_security_title:"3. Segurança",set_2fa:"Autenticação de dois fatores",set_bio:"Autenticação biométrica",set_perms:"Permissões",set_remote_wipe:"Limpeza remota",set_antimalware:"Antivírus",set_activity:"Atividade e Histórico",set_pref_title:"4. Preferências",set_access:"Acessibilidade",set_theme:"Tema",set_notif:"Notificações",set_storage:"Preferências de armazenamento",set_bar:"Posição da barra",set_save_btn:"Salvar",saveMsg:"✓ Configurações salvas!",set_back_btn:"← Voltar",placeholder:"Pesquisar no Baobab..."},
  "pt-BR": {dir:"ltr",set_title:"Configurações",set_account_title:"1. Conta e Sincronização",set_account_info:"Gestão da Conta",set_sync:"Sincronização",set_devices:"Gestão de Dispositivos",set_lang_title:"2. Idiomas e Região",set_lang_display:"Idioma de exibição",set_lang_second:"Idiomas secundários",set_region:"Região e Fuso Horário",set_security_title:"3. Segurança",set_2fa:"Autenticação de dois fatores",set_bio:"Autenticação biométrica",set_perms:"Permissões",set_remote_wipe:"Limpeza remota",set_antimalware:"Antivírus",set_activity:"Atividade e Histórico",set_pref_title:"4. Preferências",set_access:"Acessibilidade",set_theme:"Tema",set_notif:"Notificações",set_storage:"Preferências de armazenamento",set_bar:"Posição da barra",set_save_btn:"Salvar",saveMsg:"✓ Configurações salvas!",set_back_btn:"← Voltar",placeholder:"Pesquisar no Baobab..."},
  nl: {dir:"ltr",set_title:"Instellingen",set_account_title:"1. Account en Synchronisatie",set_account_info:"Accountbeheer",set_sync:"Synchronisatie",set_devices:"Apparaatbeheer",set_lang_title:"2. Talen en Regio",set_lang_display:"Weergavetaal",set_lang_second:"Secundaire talen",set_region:"Regio en Tijdzone",set_security_title:"3. Beveiliging",set_2fa:"Tweestapsverificatie",set_bio:"Biometrische authenticatie",set_perms:"Machtigingen",set_remote_wipe:"Op afstand wissen",set_antimalware:"Anti-malware scan",set_activity:"Activiteit en Geschiedenis",set_pref_title:"4. Gebruiksinstellingen",set_access:"Toegankelijkheid",set_theme:"Thema",set_notif:"Meldingen",set_storage:"Opslagvoorkeuren",set_bar:"Balkpositie",set_save_btn:"Opslaan",saveMsg:"✓ Instellingen opgeslagen!",set_back_btn:"← Terug",placeholder:"Zoeken op Baobab..."},
  wo: {dir:"ltr",set_title:"Réglages",set_account_title:"1. Akount ak Denc",set_account_info:"Jëfandikoo Akount",set_sync:"Dencandoo",set_devices:"Jëfandikoo Telefòn",set_lang_title:"2. Làkk ak Dëkk",set_lang_display:"Làkk bu feeñ",set_lang_second:"Làkk yu beneen",set_region:"Dëkk ak Waxtu",set_security_title:"3. Sutura",set_2fa:"Sutura ñaari bépp",set_bio:"Sutura làkku",set_perms:"Jëfandikoo",set_remote_wipe:"Soppi bu sore",set_antimalware:"Xool Virus",set_activity:"Jëf ak Tariku",set_pref_title:"4. Sago yu Jëf",set_access:"Joxe ay ndimbal",set_theme:"Dëmm",set_notif:"Bataxal",set_storage:"Denc",set_bar:"Tof bi",set_save_btn:"Denc",saveMsg:"✓ Denc na!",set_back_btn:"← Dellu",placeholder:"Seet ci Baobab..."}
};

function t(k){ const lang=getSettings().uiLanguage; return translations[lang]?.[k] || translations['fr'][k]; }

function getSettings() {
  return {
    uiLanguage: localStorage.getItem('uiLanguage') || 'fr',
    secondaryLanguages: JSON.parse(localStorage.getItem('secondaryLanguages') || '[]'),
    region: localStorage.getItem('region') || 'sn',
    twoFA: localStorage.getItem('twoFA') === 'true',
    biometric: localStorage.getItem('biometric') === 'true',
    remoteWipe: localStorage.getItem('remoteWipe') === 'true',
    antiMalware: localStorage.getItem('antiMalware')!== 'false',
    theme: localStorage.getItem('theme') || 'system',
    barPosition: localStorage.getItem('barPosition') || 'top'
  }
}

function saveSettings() {
  localStorage.setItem('uiLanguage', document.getElementById('uiLanguage').value);
  localStorage.setItem('region', document.getElementById('region').value);
  localStorage.setItem('theme', document.getElementById('theme').value);
  localStorage.setItem('barPosition', document.getElementById('barPosition').value);
  localStorage.setItem('twoFA', document.getElementById('twoFA').checked);
  localStorage.setItem('biometric', document.getElementById('biometric').checked);
  localStorage.setItem('remoteWipe', document.getElementById('remoteWipe').checked);
  localStorage.setItem('antiMalware', document.getElementById('antiMalware').checked);
  const secLang = Array.from(document.getElementById('secondaryLanguages').selectedOptions).map(o => o.value);
  localStorage.setItem('secondaryLanguages', JSON.stringify(secLang));
  applyTranslations(); applyTheme(); applyBarPosition();
  document.getElementById('saveMsg').innerText = t('saveMsg'); document.getElementById('saveMsg').classList.remove('hidden'); setTimeout(() => document.getElementById('saveMsg').classList.add('hidden'), 2000);
}

function applyTranslations() {
  const tr = translations[getSettings().uiLanguage];
  document.documentElement.lang = getSettings().uiLanguage;
  document.documentElement.dir = tr.dir;
  for(let key in tr) { if(document.getElementById(key)) document.getElementById(key).innerText = tr[key]; }
  if(document.getElementById('searchInput')) document.getElementById('searchInput').placeholder = tr.placeholder;
}

function applyTheme() {
  const theme = getSettings().theme;
  if(theme === 'system') { document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches); }
  else { document.documentElement.classList.toggle('dark', theme === 'dark'); }
}

function applyBarPosition() {
  const s = getSettings();
  if(s.barPosition === 'bottom') { document.getElementById('topBar').classList.add('hidden'); document.getElementById('bottomBar').classList.remove('hidden'); }
  else { document.getElementById('topBar').classList.remove('hidden'); document.getElementById('bottomBar').classList.add('hidden'); }
}

function showPage(pageId) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); document.getElementById(pageId).classList.add('active'); window.scrollTo(0,0); }

function search(event) {
  if(event) event.preventDefault();
  let query = document.getElementById('searchInput')?.value || document.getElementById('searchInputResults').value;
  if(!query) return;
  currentQuery = query;
  document.getElementById('searchInputResults').value = query;
  showPage('resultsPage');
  document.getElementById('resultCount').innerText = `Résultats pour "${query}"`;
  document.getElementById('resultsList').innerHTML = `<div><a href="#" class="text-xl text-blue-700 hover:underline">${query}</a></div>`;
}

function startVoice(iconId) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert('Voix non supportée');
  const recognition = new SpeechRecognition();
  recognition.lang = getSettings().uiLanguage + '-FR';
  document.getElementById(iconId).classList.add('text-red-500');
  recognition.onresult = (event) => { document.getElementById('searchInput').value = event.results[0][0].transcript; search(); };
  recognition.onend = () => document.getElementById(iconId).classList.remove('text-red-500');
  recognition.start();
}

// CHARGEMENT AU DEMARRAGE
document.addEventListener('DOMContentLoaded', () => {
  const s = getSettings();
  if(document.getElementById('uiLanguage')) document.getElementById('uiLanguage').value = s.uiLanguage;
  if(document.getElementById('region')) document.getElementById('region').value = s.region;
  if(document.getElementById('theme')) document.getElementById('theme').value = s.theme;
  if(document.getElementById('barPosition')) document.getElementById('barPosition').value = s.barPosition;
  if(document.getElementById('twoFA')) document.getElementById('twoFA').checked = s.twoFA;
  if(document.getElementById('biometric')) document.getElementById('biometric').checked = s.biometric;
  if(document.getElementById('remoteWipe')) document.getElementById('remoteWipe').checked = s.remoteWipe;
  if(document.getElementById('antiMalware')) document.getElementById('antiMalware').checked = s.antiMalware;

  const secSelect = document.getElementById('secondaryLanguages');
  if(secSelect) {
    Array.from(secSelect.options).forEach(option => {
      option.selected = s.secondaryLanguages.includes(option.value);
    });
  }

  applyTranslations();
  applyTheme();
  applyBarPosition();
});
