import React from 'react';
import CryptoJS from 'crypto-js';
import { iv, key, payload } from './contant';

const App = () => {
  const ecrypted  = (data) => {
    var ecryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return ecryptedData.toString();
  }

  const decrypted  = (data) => {
    var decryptedData = CryptoJS.AES.decrypt(data, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return CryptoJS.enc.Utf8.stringify(decryptedData);
  }

  return (
    <div>
      <h1>Ecrypted: {ecrypted(JSON.stringify(payload))} </h1>
      <h1>Decrypted: {decrypted(ecrypted(JSON.stringify(payload)))} </h1>
    </div>
  );
};

export default App;