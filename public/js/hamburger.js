// Hamburger

// Declare and assign variables
const hamburger = document.querySelector('.svg');
const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');
const hero = document.querySelector('.hero');

// Function declaration
function change() {
  hamburger.classList.toggle('transform');
  nav.classList.toggle('nav-toggle');
  menu.classList.toggle('menu-toggle');
  hero.classList.toggle('hero-toggle');
}

// Export addeventlistener which fires our function on every click
export const ham = hamburger.addEventListener('click', change);