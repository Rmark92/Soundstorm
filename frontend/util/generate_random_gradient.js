const gradients = [
  "linear-gradient(45deg, rgba(33,124,173,1) 0%, rgba(33,124,173,0.94) 13%, rgba(0,16,245,0.81) 42%, rgba(39,5,235,0.67) 74%, rgba(29,93,156,0.59) 91%, rgba(32,124,229,0.55) 99%, rgba(32,124,229,0.55) 100%)",
  "linear-gradient(135deg, rgba(96,144,189,1) 0%, rgba(96,144,189,0.94) 13%, rgba(50,59,227,0.83) 38%, rgba(39,5,235,0.72) 62%, rgba(29,93,156,0.63) 82%, rgba(32,124,229,0.55) 99%, rgba(32,124,229,0.55) 100%)",
  "linear-gradient(135deg, rgb(149, 130, 116) 0%, rgb(78, 90, 106) 100%)",
  "linear-gradient(135deg, rgb(215, 204, 193) 0%, rgb(125, 139, 153) 100%)",
  "linear-gradient(rgba(255,85,0,.95),rgba(255,85,0,.1))"
];

export default function generateRandomGradient() {
  return gradients[Math.round(Math.random() * gradients.length)];
}
