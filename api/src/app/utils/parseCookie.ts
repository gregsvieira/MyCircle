export function parseCookie(cookie: string) {
  const cookieParsed = cookie.split('=')[1];

  return cookieParsed;
}
