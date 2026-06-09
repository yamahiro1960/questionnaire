(function () {
  const form = document.getElementById('entryForm');
  const status = document.getElementById('status');
  const submitBtn = document.getElementById('submitBtn');

  const config = window.APP_CONFIG || {};
  const supabaseUrl = String(config.supabaseUrl || '').trim().replace(/\/$/, '');
  const supabaseAnonKey = String(config.supabaseAnonKey || '').trim();
  const table = String(config.supabaseTable || 'event_applications').trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    setStatus('config.js に SUPABASE URL/ANON KEY を設定してください。', false);
    submitBtn.disabled = true;
    return;
  }

  const client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const payload = {
      organization: form.organization.value.trim(),
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      attendees: Number(form.attendees.value),
      message: form.message.value.trim(),
      submitted_at: new Date().toISOString()
    };

    const validationError = validatePayload(payload);
    if (validationError) {
      setStatus(validationError, false);
      return;
    }

    setBusy(true);
    try {
      const { error } = await client.from(table).insert([payload]);
      if (error) {
        throw error;
      }

      form.reset();
      setStatus('お申し込みを受け付けました。ありがとうございます。', true);
    } catch (error) {
      const message = error && error.message ? error.message : '送信に失敗しました。';
      setStatus('送信に失敗しました: ' + message, false);
    } finally {
      setBusy(false);
    }
  });

  function setBusy(isBusy) {
    submitBtn.disabled = isBusy;
    submitBtn.textContent = isBusy ? '送信中...' : '申し込む';
  }

  function setStatus(message, ok) {
    status.textContent = message;
    status.className = ok ? 'status ok' : 'status ng';
  }

  function validatePayload(payload) {
    if (!payload.organization) {
      return '所属団体・組織名は必須です。';
    }
    if (!payload.name) {
      return '氏名は必須です。';
    }
    if (!payload.email) {
      return 'メールアドレスは必須です。';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return 'メールアドレスの形式が正しくありません。';
    }
    if (!Number.isInteger(payload.attendees) || payload.attendees <= 0) {
      return '参加人数は1以上の整数で入力してください。';
    }
    return '';
  }
})();
