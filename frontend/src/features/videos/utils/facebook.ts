/**
 * Generates Facebook official video player iframe URL.
 */
export function getFacebookEmbedUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  const fullUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://')
    ? trimmed
    : `https://${trimmed}`;

  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    fullUrl,
  )}&show_text=false&t=0`;
}
