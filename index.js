document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded")
  getList()
  getDetail("2baf70d1-42bb-4437-b551-e5fed5a87abe")

  const filter = document.querySelector("#filter")
  const select = filter.querySelector("select")
  select.addEventListener("change", handleFilter)
})

// Query Selectors ----------------------------------
let checked;

// Event Handlers -----------------------------------
function handleClick(e) {
  let id = e.currentTarget.id
  getDetail(id)
}

function handleCheck(e) {
  const checkedId = e.currentTarget.querySelector("button")
  updateWatched(e.currentTarget.id)
  if(checked === true) {
    checkedId.id = "checked"
  }
  else {checkedId.id = ""}
  console.log(checked)
}

function handleFilter(e) {
  if(e.target.value === "watched") {
    console.log("rerender list based on checked")
    const cards = document.querySelectorAll(".card")
    const cardsArray = [...cards]
    cardsArray.forEach(card => {
      if(card.querySelector("button").id !== "checked") {
        card.style = "display: none;"
      }
    })
  }
  else {
    console.log("rerender original list")
    resetList()
    getList()
  }
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
  p.innerText = `☆ ${movie.rt_score}` // ★ or ☆ ?
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

  const h4 = document.createElement("h4")
  h4.innerText = `${movie.release_date} • ${movie.director}`
  card.appendChild(h4)

  card.addEventListener("click", handleClick)
  cardsContainer.appendChild(card)
}

function renderDetail(movie) {
  const detailContainer = document.querySelector("#detail-container")
  
  const rating = document.createElement("div")
  rating.id = "rating"
  const p = document.createElement("p")
  p.innerText = `☆ ${movie.rt_score}`
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
  fetch(`http://localhost:3000/movies/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"watched": checked})
  })
  .then(res => res.json())
}
