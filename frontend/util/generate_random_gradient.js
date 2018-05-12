// "linear-gradient(to right, rgba(235,168,0,1) 0%, rgba(235,168,0,0.97) 12%, rgba(226,131,37,0.95) 23%, rgba(214,83,83,0.91) 37%, rgba(226,84,58,0.9) 42%, rgba(248,86,14,0.91) 51%, rgba(253,86,4,0.91) 53%, rgba(242,87,27,0.9) 64%, rgba(235,55,35,0.89) 71%, rgba(212,56,38,0.78) 84%, rgba(241,111,92,0.78) 97%)"
// "linear-gradient(135deg, rgba(96,144,189,1) 0%, rgba(96,144,189,0.94) 13%, rgba(50,59,227,0.83) 38%, rgba(39,5,235,0.72) 62%, rgba(29,93,156,0.63) 82%, rgba(32,124,229,0.55) 99%, rgba(32,124,229,0.55) 100%)",
// "linear-gradient(45deg, rgba(33,124,173,1) 0%, rgba(33,124,173,0.94) 13%, rgba(0,16,245,0.81) 42%, rgba(39,5,235,0.67) 74%, rgba(29,93,156,0.59) 91%, rgba(32,124,229,0.55) 99%, rgba(32,124,229,0.55) 100%)",

const gradients = [
  "linear-gradient(to right bottom, #333333, #5c3e5e, #9f3b6b, #de3351, #ff5500)",
  "linear-gradient(135deg, rgb(149, 130, 116) 0%, rgb(78, 90, 106) 100%)",
  "linear-gradient(135deg, rgb(215, 204, 193) 0%, rgb(125, 139, 153) 100%)"
];

export default function generateRandomGradient() {
  return gradients[Math.round(Math.random() * gradients.length)];
}
