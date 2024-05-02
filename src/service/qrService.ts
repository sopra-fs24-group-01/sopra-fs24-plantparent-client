// example: http(s)://api.qrserver.com/v1/create-qr-code/?data=[URL-encoded-text]&size=[pixels]x[pixels]

const qrBaseURL: string = "https://api.qrserver.com/v1/create-qr-code/";


export function getQRCodeURL({url, size = [200, 200]} : { url: string, size: number[] }) {
  const data = encodeURIComponent(url);

  return `${qrBaseURL}?data=${data}&size=${size[0]}x${size[1]}`;
}