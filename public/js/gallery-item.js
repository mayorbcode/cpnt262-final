
// Declare and assign variables 
const url = window.location.href;
const params = url.split('/');
const id = params[4];
console.log(id);

// Asynchronous gallery-item fetch
export const locations = fetch(`${window.location.origin}/api/v0/gallery/${id}`)
  .then((response) => {
    // JSON returned from server
    // We need to convert it into a Javascript object
    return response.json();
  })
  .then((location) => {
    // `data Javascript object
    console.log(location);
    let output='';
    location.forEach((item) => {
      output = `
        <figure class="card">
          <img src=${item.imagePath} alt="Scenic image of place in ${item.description}">
          <figcaption>
            <h2>${item.title}</h2>
          </figcaption>
        </figure>
      `;
    });
    // Output to DOM
    document.querySelector('.gallery-item').innerHTML = output;
  })
  .catch((error) => {
    console.log('Oooooooops!');
  });

