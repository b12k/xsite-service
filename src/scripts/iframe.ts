let uuid = localStorage.getItem('u');
if (!uuid) {
  uuid = crypto.randomUUID();
  localStorage.setItem('u', uuid);
}
const checked = localStorage.getItem('checked');

window.parent.postMessage({ uuid }, '*');

window.addEventListener('message', (event: MessageEvent<{ checked?: string }>) => {
  if (event.data.checked) localStorage.setItem('checked', event.data.checked);
})
