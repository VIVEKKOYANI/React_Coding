import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('12345678900987654321');
const iv = CryptoJS.enc.Utf8.parse('12345678900987654321');

const payload =  {
  "method": "GET",
  "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json"
  },
  "url": "http://test-cms-service"
}

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

  // 'EnAES-CBC with HMAC Encryption and Decryption'

  return (
    <div>
      <h1>Ecrypted: {ecrypted(JSON.stringify(payload))} </h1>
      <h1>Decrypted: {decrypted(ecrypted(JSON.stringify(payload)))} </h1>
    </div>
  );
};

export default App;