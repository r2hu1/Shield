import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY;

export function encryptPassword(userpass) {
  return CryptoJS.AES.encrypt(userpass, SECRET_KEY).toString();
}

export function decryptPassword(encryptedpass) {
  const bytes = CryptoJS.AES.decrypt(encryptedpass, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}