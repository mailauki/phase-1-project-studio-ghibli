document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded")
  getList()
  getDetail("2baf70d1-42bb-4437-b551-e5fed5a87abe")

  const filter = document.querySelector("#filter")
  filter.addEventListener("click", handleFilter)
})

// Query Selectors ----------------------------------
let checked;

// Event Handlers -----------------------------------
function handleClick(e) {
  let id = e.currentTarget.id
  if(e.target.parentNode.classList.contains("card")) { // checks if click target is card not checkbox
    getDetail(id)
  }
}

function handleCheck(e) {
  const detailCheck = document.querySelector("#detail-container").querySelector(".checkbox")
  const cardChecks = document.querySelector("#cards-container").querySelectorAll(".checkbox")
  const cardChecksArray = [...cardChecks]
  const detailCheckedBtn = detailCheck.querySelector("button")

  if(e.currentTarget.classList.contains("checkbox")) { // checks if click target is checkbox
    updateWatched(e.currentTarget.id)
    cardChecksArray.forEach(cardCheck => {
      if(e.currentTarget.id === cardCheck.id) { // matches click target and list to check of correct checkbox
        if(checked === true) {
          e.currentTarget.querySelector("button").id = "checked"
        }
        else {
          e.currentTarget.querySelector("button").id = ""
        }
        if(cardCheck.id === detailCheck.id) { // syncs check of card and detail
          if(checked === true) {
            cardCheck.querySelector("button").id = "checked"
            detailCheckedBtn.id = "checked"
          }
          else {
            cardCheck.querySelector("button").id = ""
            detailCheckedBtn.id = ""
          }
        }
      }
    })
  }
    
}

function handleFilter(e) {
  const cards = document.querySelectorAll(".card")
  const cardsArray = [...cards]
  const dropdown = document.querySelector(".dropdown")

  if(e.target.id === "filter-by") {
    dropdown.style = "display: block; margin-top: 18px;"
  }
  else if(e.target.innerText === "All"){
    dropdown.style = "display: none;"
    cardsArray.forEach(card => card.style = "display: intial;")
  }
  else if(e.target.innerText === "Watched") {
    dropdown.style = "display: none;"
    cardsArray.forEach(card => {
      card.style = "display: intitial;"
      if(card.querySelector("button").id !== "checked") {
        card.style = "display: none;"
      }
    })
  }
  else if(e.target.innerText !== "All" && "Watched") {
    dropdown.style = "display: none;"
    cardsArray.forEach(card => {
      const director = card.querySelector("h4").innerText
      if(director === e.target.innerText) {
        card.style = "display: intitial;"
      }
      else {card.style = "display: none;"}
    })
  }
}

function isMatch(detailId) {
  const cardArray = [...(document.querySelectorAll(".card"))]
  cardArray.forEach(card => {
    if(card.id === detailId) {
      card.classList.add("selected")
    }
    else {card.classList.remove("selected")}
  })
}

// Renderings ---------------------------------------
function renderList(movie) {
  const cardsContainer = document.querySelector("#cards-container")

  const card = document.createElement("div")
  card.id = movie.id
  card.classList.add("card")

  const rating = document.createElement("div")
  rating.id = "rating"
  const p = document.createElement("p")
  p.innerText = `★ ${movie.rt_score}` // ★ or ☆ ?
  rating.appendChild(p)
  card.appendChild(rating)

  const img = document.createElement("img")
  img.setAttribute("src", movie.image)
  card.appendChild(img)

  const div = document.createElement("div")
  div.classList.add("checkbox")
  div.id = movie.id
  const checkbox = document.createElement("button")
  const check = document.createElement("img")
  check.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/61/61141.png")
  checkbox.appendChild(check)
  fetch(`http://localhost:3000/movies/${movie.id}`)
  .then(res => res.json())
  .then(movieData => {
    checked = movieData.watched
    if(checked === true) {
      checkbox.id = "checked"
    }
    else {
      checkbox.id = ""
    }
  })
  div.appendChild(checkbox)
  card.appendChild(div)

  div.addEventListener("click", handleCheck)
  
  const h3 = document.createElement("h3")
  h3.innerText = movie.title
  card.appendChild(h3)

  const info = document.createElement("div")
  info.id = "info"
  const h5 = document.createElement("h5")
  h5.innerText = movie.release_date
  info.appendChild(h5)
  const span = document.createElement("span")
  span.innerText = " • "
  info.appendChild(span)
  const h4 = document.createElement("h4")
  h4.innerText = movie.director
  info.appendChild(h4)
  card.appendChild(info)

  card.addEventListener("click", handleClick)
  cardsContainer.appendChild(card)
}

function renderDetail(movie) {
  const detailContainer = document.querySelector("#detail-container")
  
  const rating = document.createElement("div")
  rating.id = "rating"
  const p = document.createElement("p")
  p.innerText = `★ ${movie.rt_score}`
  rating.appendChild(p)
  detailContainer.appendChild(rating)

  const banner = document.createElement("img")
  banner.setAttribute("src", movie.movie_banner)
  detailContainer.appendChild(banner)

  const div = document.createElement("div")
  div.classList.add("checkbox")
  div.id = movie.id
  const span = document.createElement("span")
  span.innerText = "Watched "
  div.appendChild(span)
  const checkbox = document.createElement("button")
  const check = document.createElement("img")
  check.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/61/61141.png")
  checkbox.appendChild(check)
  fetch(`http://localhost:3000/movies/${movie.id}`)
  .then(res => res.json())
  .then(movieData => {
    checked = movieData.watched
    if(checked === true) {
      checkbox.id = "checked"
    }
    else {
      checkbox.id = ""
    }
  })
  div.appendChild(checkbox)
  detailContainer.appendChild(div)

  div.addEventListener("click", handleCheck)

  const h2 = document.createElement("h2")
  h2.innerText = movie.title
  detailContainer.appendChild(h2)

  const infoStrip = document.createElement("div")
  infoStrip.classList.add("info-strip")
  const date = document.createElement("h4")
  date.innerText = movie.release_date
  infoStrip.appendChild(date)
  const director = document.createElement("h4")
  director.innerText = movie.director
  infoStrip.appendChild(director)
  const runTime = document.createElement("h4")
  runTime.innerText = `${movie.running_time} min`
  infoStrip.appendChild(runTime)
  detailContainer.appendChild(infoStrip)
  
  const japaneseStrip = document.createElement("div")
  japaneseStrip.classList.add("japanese-strip")
  const kanji = document.createElement("h5")
  kanji.innerText = movie.original_title
  japaneseStrip.appendChild(kanji)
  const romanji = document.createElement("h5")
  romanji.innerText = movie.original_title_romanised
  japaneseStrip.appendChild(romanji)
  detailContainer.appendChild(japaneseStrip)

  const description = document.createElement("p")
  description.innerText = movie.description
  detailContainer.appendChild(description)

  isMatch(div.id)
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
    movieData.forEach(movie => {
      renderList(movie)
    })
  })
}

function getDetail(id) {
  fetch(`http://ghibliapi.herokuapp.com/films/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(movieData => {
    resetDetail()
    renderDetail(movieData)
  })
}

function resetList() {
  const cards = document.querySelector("#cards-container")
  while(cards.firstChild) {
    cards.removeChild(cards.firstChild)
  }
}

function resetDetail() {
  const detail = document.querySelector("#detail-container")
  while (detail.firstChild) {
    detail.removeChild(detail.firstChild)
  }
}

function updateWatched(id) {
  checked = !checked
  if(checked === true) {
    formData = {"watched": true}
  }
  else {
    formData = {"watched": false}
  }
  fetch(`http://localhost:3000/movies/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
}
