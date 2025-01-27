import { Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');
import CryptoJS from 'react-native-crypto-js';

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

export const generateKey = (mobileNumber, username, aadharNumber, userId) => {
  const aadhar_number = String(aadharNumber)
  const mobileStart = mobileNumber.slice(0, 4);
  const mobileEnd = mobileNumber.slice(-4);
  const usernamePart = username.slice(0, 3);
  const aadharPart =aadhar_number.slice(0, 6);
  const userIdPart = userId.slice(0, 10);
  const fixedPart = "sharkpock";

  const key = `${mobileStart}${mobileEnd}${usernamePart}${aadharPart}${userIdPart}${fixedPart}`;
  if (key.length !== 36) {
    console.log("key.length",key.length)
    throw new Error("Generated key is not 36 characters long.");
  }
  return key;
};

export const encryptData =  (key, data) => {
  const dataString = JSON.stringify(data);
  const encrypted =  CryptoJS.AES.encrypt(dataString, key).toString();
  return encrypted;
};

export const decryptData = (key,data)=>{
  const bytes = CryptoJS.AES.decrypt(data, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
