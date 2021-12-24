document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded")
  getList()
  // renderFirstDetail()
  getDetail("2baf70d1-42bb-4437-b551-e5fed5a87abe")
})

// Query Selectors ----------------------------------
let checked;

// Event Handlers -----------------------------------
function handleClick(e) {
  // console.log("clicked")
  // console.log(e.target.parentNode)
  let id = e.target.parentNode.id
  // console.log(id)
  getDetail(id)
}

function handleCheck(e) {
  console.log("clicked")
  // console.log(e.target.parentNode.querySelector("button"))
  console.log(e.target.parentNode)
  if (e.target.parentNode.id === "checked") {
    e.target.parentNode.id = ""
  }
  else {e.target.parentNode.id = "checked"}
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
  // const checkbox = document.createElement("input")
  // checkbox.setAttribute("type", "checkbox")
  const checkbox = document.createElement("button")
  const check = document.createElement("img")
  check.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/61/61141.png")
  checkbox.appendChild(check)
  div.appendChild(checkbox)
  card.appendChild(div)

  div.addEventListener("click", handleCheck) // make checkbox checked if clicked here too
  // checkbox.addEventListener("change", () => console.log("checked"))
  
  const h3 = document.createElement("h3")
  h3.innerText = movie.title
  card.appendChild(h3)

  const h4 = document.createElement("h4")
  h4.innerText = `${movie.release_date} • ${movie.director}`
  card.appendChild(h4)

  // console.log(card)
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
  // const checkbox = document.createElement("input")
  // checkbox.setAttribute("type", "checkbox")
  const checkbox = document.createElement("button")
  const check = document.createElement("img")
  check.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/61/61141.png")
  checkbox.appendChild(check)
  div.appendChild(checkbox)
  detailContainer.appendChild(div)

  div.addEventListener("click", handleCheck) // make checkbox checked if clicked here too
  // checkbox.addEventListener("click", handleCheck)

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
    // console.log(movieData)
    movieData.forEach(movie => renderList(movie))
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
function resetDetail() {
  const detail = document.querySelector("#detail-container")
  while (detail.firstChild) {
    detail.removeChild(detail.firstChild)
  }
}
