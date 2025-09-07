// Artworks data generated from images/portfolio directory
const imageFiles = [
  'images/portfolio/Portfolio10.JPEG',
  'images/portfolio/Portfolio11.JPEG',
  'images/portfolio/Portfolio12.JPEG',
  'images/portfolio/Portfolio13.JPEG',
  'images/portfolio/Portfolio14.JPEG',
  'images/portfolio/Portfolio15.JPEG',
  'images/portfolio/Portfolio16.JPEG',
  'images/portfolio/Portfolio17.JPEG',
  'images/portfolio/Portfolio18.JPEG',
  'images/portfolio/Portfolio2.jpg',
  'images/portfolio/Portfolio3.JPEG',
  'images/portfolio/Portfolio4.JPEG',
  'images/portfolio/Portfolio5.JPEG',
  'images/portfolio/Portfolio6.JPEG',
  'images/portfolio/Portfolio7.JPEG',
  'images/portfolio/Portfolio8.JPEG',
  'images/portfolio/Portfolio9.JPEG',
  'images/portfolio/ZPortfolio3.jpg',
  'images/portfolio/ZPortfolio4.jpg',
  'images/portfolio/portfolio_1.jpg'
];

function deriveTitleFromPath(path) {
  const file = path.split('/').pop();
  const base = file.replace(/\.[^.]+$/, '');
  // Make a friendlier title
  return base
    .replace(/^Z/, '')
    .replace(/^Portfolio/i, 'Listaverk ')
    .replace(/[_-]+/g, ' ')
    .trim();
}

const artworks = imageFiles.map((imagePath) => ({
  title: deriveTitleFromPath(imagePath),
  year: '2024',
  technique: '',
  size: '',
  image: imagePath,
  categories: ['available', 'y2024'],
  available: true,
}));

export { artworks };