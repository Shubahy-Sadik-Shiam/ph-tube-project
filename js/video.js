// Function for date and time ----->
  const getTimeString = (time) => {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    return `${hour}h ${minute}min ago`;
  }

// Create load Button catagories  ---->
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// Create load videos catagories ---->
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
// Create Display Videos Catagories  ---->
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if(videos.length === 0){
    videoContainer.classList.remove('grid')
    videoContainer.innerHTML = `
    <div class="flex mt-10 flex-col gap-5 justify-center items-center">
      <img src="assets/Icon.png"/>
      <p class="text-center font-bold text-4xl">Opps!! Sorry, No Video Found </p>
    </div>
    `
  }
  else{
    videoContainer.classList.add('grid')
  }
  videos.forEach((element) => {
    // console.log(element);
    const div = document.createElement("div");
    div.classList = "card card-compact bg-base-100 shadow-xl";
    div.innerHTML = `
        <figure class="h-[200px] relative">
    <img class="w-full object-cover h-full"
      src= ${element.thumbnail}
      alt="Shoes"/>
      ${
        element.others.posted_date === "" ? "" : `<span class="absolute right-1 bottom-2 bg-black text-white rounded p-1">${getTimeString(element.others.posted_date)}</span>`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
       <img class ="w-10 h-10 object-cover rounded-full" src= ${element.authors[0].profile_picture} />
    </div>
    <div>
       <h2 class="font-bold text-lg" >${element.title}</h2>
    <div class ="flex gap-2 text-center">
       <p class="text-gray-400 text-xs">${element.authors[0].profile_name}</p>
        ${element.authors[0].verified === true ? `<img class="h-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
    </div>
       <p class="text-gray-400 text-xs">${element.others.views}</p>
    </div>
  </div> 
        `;
    videoContainer.append(div);
  });
};
// Create Display Button Catagories  ---->
const displayCatagories = (categories) => {
  const categoryContainer = document.getElementById("category");
  categories.forEach((element) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id ="btn-${element.category_id}" onclick ="loadCategoryVideos(${element.category_id})" class="btn category-btn">
       ${element.category}
      </button>
    
    `
    categoryContainer.append(buttonContainer);
  });
};
// Create button clicking functionalities ------>
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add('active')
        displayVideos(data.category)
    })
    .catch((error) => console.log(error));
}
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (let btn of buttons){
        btn.classList.remove('active')
    }
}

loadCategories();
loadVideos();
