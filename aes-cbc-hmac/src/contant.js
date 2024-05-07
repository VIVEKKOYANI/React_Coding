export const key = CryptoJS.enc.Utf8.parse('12345678900987654321');
export const iv = CryptoJS.enc.Utf8.parse('12345678900987654321');

export const payload =  {
  "method": "GET",
  "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json"
  },
  "url": "http://test-cms-service"
}