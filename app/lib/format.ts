// SQLite stores timestamps as "YYYY-MM-DD HH:MM:SS" in UTC.
export function formatDate(sqlTimestamp: string): string {
  const date = new Date(sqlTimestamp.replace(' ', 'T') + 'Z');
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Phnom_Penh' });
}
