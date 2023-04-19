//------------------------------------------------------------------------//
//GLOBAL VARIABLES
//------------------------------------------------------------------------//
let addToy = false;
const URL = "http://localhost:3000/toys";
const toyCollectionContainer = document.getElementById("toy-collection");
const form = document.querySelector(".add-toy-form")
form.addEventListener("submit", (e)=> {e.preventDefault(); addNewToy(e)})
let cardArray;

//------------------------------------------------------------------------//
//DOUMENT EVENT LISTENER INVOKED WHEN DOM LOADED
//------------------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys();
});
//------------------------------------------------------------------------//
//FETCH REQUESTS
//------------------------------------------------------------------------//
function getToys() {
  return fetch(URL)
    .then((resp) => resp.json())
    .then((cards) => {
      cardArray = cards;
      cards.map((card) => renderCard(card));
    });
}

function postNewCard(toyObj) {
  return fetch(URL,{
    method: "POST",
    headers: {
     "Content-Type" : "application/json",
     "Accept" : "application/json"
    },
    body: JSON.stringify(toyObj)
  }).then(res => res.json()).then(console.log("Made it"))
}
//------------------------------------------------------------------------//
// FUNCTIONS
//------------------------------------------------------------------------//

function renderCard(card) {
  const toyCard = document.createElement("div");
  const toyName = document.createElement("h2");
  const likes = document.createElement("p");
  const btn = document.createElement("button");
  const img = document.createElement("img");
  toyCard.classList.add("card");
  toyName.textContent = card.name;
  img.src = card.image;
  img.classList.add("toy-avatar");
  likes.textContent = card.likes;
  btn.textContent = "Like ❤️";
  btn.classList.add("like-btn");
  btn.id = card.id;
  toyCard.append(toyName, img, likes, btn);
  toyCollectionContainer.appendChild(toyCard);
  btn.addEventListener("click",(e) => {card.likes++; likeAToy(e, card.likes)})

}

function addNewToy(e) {
const addedInput = form.querySelectorAll("input.input-text")
const toyObj = {name :addedInput[0].value, image: addedInput[1].value, likes: 5}
postNewCard(toyObj)
}

function likeAToy(e, cardLikes) {

return fetch(`${URL}/${e.target.id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify({likes: cardLikes})
}).then(res => res.json()).then(data => console.log(data))

}
