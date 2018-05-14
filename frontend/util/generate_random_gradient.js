
const gradients = [
  "linear-gradient(to right, rgba(235,168,0,1) 0%, rgba(235,168,0,0.97) 12%, rgba(226,131,37,0.95) 23%, rgba(214,83,83,0.91) 37%, rgba(226,84,58,0.9) 42%, rgba(248,86,14,0.91) 51%, rgba(253,86,4,0.91) 53%, rgba(242,87,27,0.9) 64%, rgba(235,55,35,0.89) 71%, rgba(212,56,38,0.78) 84%, rgba(241,111,92,0.78) 97%)",
  "linear-gradient(to right bottom, #333333, #5c3e5e, #9f3b6b, #de3351, #ff5500)",
  "linear-gradient(135deg, rgb(149, 130, 116) 0%, rgb(78, 90, 106) 100%)",
  "linear-gradient(315deg, rgb(132, 97, 112) 0%, rgb(142, 132, 133) 100%)",
  "linear-gradient(135deg,#e6846e,#70929c)",
  "linear-gradient(135deg,#70929c,#8e8485)",
  "linear-gradient(135deg,#846170,#70929c)"
];

export default function generateRandomGradient() {
  return gradients[Math.round(Math.random() * gradients.length)];
}
