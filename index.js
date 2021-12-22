document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded")
  getList()
})

// Query Selectors ----------------------------------

// Event Listeners ----------------------------------

// Renderings ---------------------------------------
function renderList(movie) {
  const cardsContainer = document.querySelector("#cards-container")

  const card = document.createElement("div")
  card.id = movie.id

  const img = document.createElement("img")
  img.setAttribute("src", movie.image)
  card.appendChild(img)
  
  const h3 = document.createElement("h3")
  h3.innerText = movie.title
  card.appendChild(h3)

  const h4 = document.createElement("h4")
  h4.innerText = `${movie.release_date} • ${movie.director}` // | or • ?
  card.appendChild(h4)

  const rating = document.createElement("div")
  const p = document.createElement("p")
  p.innerText = `☆ ${movie.rt_score}` // ★ or ☆ ?
  rating.appendChild(p)
  card.appendChild(rating)

  console.log(card)
  cardsContainer.appendChild(card)
}

// Fetch Requests -----------------------------------
function getList() {
  fetch("https://ghibliapi.herokuapp.com/films/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(movieData => {
    console.log(movieData)
    movieData.forEach(movie => renderList(movie))
  })
}