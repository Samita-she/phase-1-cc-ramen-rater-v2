// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('#ramen-detail .detail-image');
  const detailName = document.querySelector('#ramen-detail .name');
  const detailRestaurant = document.querySelector('#ramen-detail .restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen');

  ramenForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value
    };

    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;

    img.addEventListener('click', () => handleClick(newRamen));

    ramenMenu.appendChild(img);

    ramenForm.reset(); // Clear form after submission
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = ''; // Clear existing content

      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;

        img.addEventListener('click', () => handleClick(ramen));

        ramenMenu.appendChild(img);
      });

      if (ramens.length > 0) {
        handleClick(ramens[0]); // Display first ramen by default
      }
    })
    .catch(error => console.error('Failed to fetch ramens:', error)); // Handle errors
};

const addEditListener = () => {
  const editForm = document.getElementById('edit-ramen');
  if (!editForm) {
    console.error('Edit form not found in the DOM!');
    return;
  }

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    document.getElementById('rating-display').textContent = newRating;
    document.getElementById('comment-display').textContent = newComment;

    editForm.reset();
  });
};

const addDeleteListener = (imgElement) => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', () => {
    imgElement.remove();
    document.getElementById('ramen-detail').innerHTML = ''; // Clear details
  });

  document.getElementById('ramen-detail').appendChild(deleteButton);
};

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
    addEditListener();
  });
};

main();

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main
};
