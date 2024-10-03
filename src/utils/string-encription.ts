import CryptoJS from "crypto-js";

type EProps = {
  stringToEncrypt: string;
};

const secretKey =
  "ifhvboietjriohuroteu89473848736893tfjroijfgdnbvjgdsuy65e878fu30948ut3uh78g5gy478";

export const EncryptString = ({ stringToEncrypt }: EProps) => {
  const encryptedData = CryptoJS.AES.encrypt(
    stringToEncrypt,
    secretKey
  ).toString();

  return encryptedData;
};

type DProps = {
  stringToDecrypt: string;
};

export const DecryptString = ({ stringToDecrypt }: DProps) => {
  const decryptedBytes = CryptoJS.AES.decrypt(stringToDecrypt, secretKey);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
