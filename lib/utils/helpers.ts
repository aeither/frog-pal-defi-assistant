export function roundToTwoDecimals(num: number) {
  return Math.round(num * 100) / 100;
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval > 1 ? 's' : ''} ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval > 1 ? 's' : ''} ago`;
  }
  return `${Math.floor(seconds)} second${seconds !== 1 ? 's' : ''} ago`;
}

export function truncateString(str: string, maxLength: number = 6): string {
  if (str.length <= maxLength) {
    return str; // Return the original string if it's shorter than or equal to maxLength
  }
  return `${str.slice(0, maxLength)}...`; // Return the truncated string with "..."
}
