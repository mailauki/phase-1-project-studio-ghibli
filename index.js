document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded")
  getList()
})

// Query Selectors ----------------------------------

// Event Listeners ----------------------------------

// Renderings ---------------------------------------

// Fetch Requests -----------------------------------
function getList() {
  fetch("https://ghibliapi.herokuapp.com/films/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(movieData => console.log(movieData))
}