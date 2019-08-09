'use strict';

// For texts
const firstParagraphs = document.querySelectorAll('.main-first-second article p');
const colParagraphs = document.querySelectorAll('.col-3-article p');
const lastParagraph = document.querySelector('.main-fifth p');

// For images
const firstPhone = document.querySelector('#first-phone');
const secondPhone = document.querySelector('#second-phone');
let clientWidth = document.documentElement.clientWidth;
const newSrc_1 = 'images/phone_1_adapt.png';
const oldSrc_1 = 'images/phone_1.png';
const newSrc_2 = 'images/phone_2_adapt.png';
const oldSrc_2 = 'images/phone_2.png';

// For texts
const truncate = (text, length) => {
  return text.innerText = text.innerText.length > length
    ? `${text.innerText.substring(0, length)}. . .`
    : text.innerText;
}

firstParagraphs.forEach(p => truncate(p, 550));
colParagraphs.forEach(p => truncate(p, 207));
truncate(lastParagraph, 336);

// For images
function changeImg(img, src) {
  img.src = src;
  return;
}

if (clientWidth <= 950) {
  changeImg(firstPhone, newSrc_1);
  changeImg(secondPhone, newSrc_2);
}

// Навесила на событие только в целях тестирования
window.onresize = () => {
  clientWidth = document.documentElement.clientWidth;

  if (clientWidth <= 950) {
    changeImg(firstPhone, newSrc_1);
    changeImg(secondPhone, newSrc_2);
  } else {
    changeImg(firstPhone, oldSrc_1);
    changeImg(secondPhone, oldSrc_2);
  }
};
