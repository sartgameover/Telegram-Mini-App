(() => {
  const app = window.Telegram?.WebApp;
  app?.ready();
  app?.expand();
  const hint = document.querySelector('#hint');
  function submit(data) {
    if (!app) {
      hint.textContent = 'Открой страницу из Telegram через кнопку бота.';
      return;
    }
    app.sendData(JSON.stringify(data));
  }
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => submit({action: button.dataset.action}));
  });
  document.querySelector('#send').addEventListener('click', () => {
    const raw = document.querySelector('#chat').value.trim();
    const text = document.querySelector('#message').value.trim();
    if (!/^-?\d+$/.test(raw) || !text) {
      hint.textContent = 'Введи числовой ID чата и текст сообщения.';
      return;
    }
    submit({action: 'send', chat_id: Number(raw), text});
  });
})();
