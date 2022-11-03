/* eslint-disable linebreak-style */
const showLoader = () => {
  document.getElementById('loader').style.display = 'block';
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('footer').style.display = 'none';
};

const closeLoader = () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('mainContent').style.display = 'grid';
    document.getElementById('footer').style.display = 'block';
  }, 500);
};

export { showLoader, closeLoader };
