// Create load catagories
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((res) => res.json())
  .then((data) => displayCatagories(data.categories))
  .catch((error) => console.log(error))
}

// Create displayCatagories
const displayCatagories = (categories) => {
    const categoryContainer = document.getElementById('category');
    categories.forEach(element => {
      const button = document.createElement('button');
      button.classList = 'btn';
      button.innerText = element.category;
      categoryContainer.append(button)

    });
};


loadCategories();
