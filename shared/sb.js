(function () {
  window.aiProcess = window.aiProcess || {};
  window.raon = window.raon || {}; // 기존 페이지 호환용

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error('[AI PROCESS] supabase-js not loaded. Include supabase.min.js before shared/sb.js');
    return;
  }

  const url = window.AI_PROCESS_SUPABASE_URL;
  const key = window.AI_PROCESS_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('[AI PROCESS] Missing AI_PROCESS_SUPABASE_URL / AI_PROCESS_SUPABASE_ANON_KEY in shared/config.js');
    return;
  }

  const client = window.supabase.createClient(url, key, {
    auth: { persistSession: false },
    realtime: { params: { eventsPerSecond: 10 } },
  });

  window.aiProcess.sb = function () {
    return client;
  };

  // 기존 코드가 window.raon.sb()를 호출해도 동작하도록 유지
  window.raon.sb = function () {
    return client;
  };

  console.log('[AI PROCESS] Supabase client ready:', url);
})();
