import { Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
  }).format(date);
}

export function truncateName(text, maxLength) {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.split(' ').slice(0, maxLength).join(' ');
  }
  return text;
}

export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.split(' ').slice(0, maxLength).join(' ') + '...';
  }
  return text;
}