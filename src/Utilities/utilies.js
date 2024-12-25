import {Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('window');

export function formatDate(dateStr) {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
    }).format(date);
  }
  