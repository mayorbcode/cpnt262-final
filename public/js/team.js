// Import custom module
// import { ham } from './hamburger.js';


// Asynchronous gallery fetch
export const team = fetch(`${window.location.origin}/api/v0/members`)
  .then((response) => {
    // JSON returned from server
    // We need to convert it into a Javascript object
    return response.json();
  })
  .then((locations) => {
    // `data Javascript object
    console.log(locations);
    let output = '';
    locations.forEach((location) => {
      output += `
        <a href=/members/${location.id}>
        <figure class="card">
          <img src=${location.imagePath} alt="Scenic image of place in ${location.description}">
          <figcaption>
            <h2>${location.title}</h2>
          </figcaption>
        </figure>
        </a>
      `;
    });
    // Output to DOM
    document.querySelector('.gallery').innerHTML = output;
  })
  .catch((error) => {
    console.log('Oooooooops!');
  });