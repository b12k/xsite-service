const searchParams = new URLSearchParams(window.location.search);
const to = searchParams.get('to');
const action = searchParams.get('action');

if (to) {
  let uuid = localStorage.getItem('u');
  if (action === 'delete' ) {
    localStorage.removeItem('u');
  }
  if (!uuid) {
    uuid = crypto.randomUUID();
    localStorage.setItem('u', uuid);
  }
  const redirectTo = new URL(to);
  redirectTo.searchParams.set('uuid', uuid)
  window.location.href = redirectTo.toString();
}