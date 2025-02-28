import 'server-only';

export async function getIP() {
  const response = await fetch('https://api.ipify.org');
  return response.text();
}
