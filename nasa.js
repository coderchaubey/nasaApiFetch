const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("searchBtn");
const title = document.getElementById("title");
const explanation = document.getElementById("explanation");
const image = document.getElementById("image");
const heading = document.getElementById("heading");

// console.log(searchBtn);
document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date().toISOString().split("T")[0];

  //removing data from local Storage after reloading the page
  localStorage.removeItem("searches");

  fetchImageOfTheDay(currentDate);
});

searchBtn.addEventListener("click", getImageOfTheDay);

function getImageOfTheDay(event) {
  event.preventDefault();
  // console.log(searchInput.value);
  fetchImageOfTheDay(searchInput.value);
  saveSearch(searchInput.value);
  addSearchToHistory();
}

//saving the searches
function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

//adding to our lovely history
function addSearchToHistory() {
  //get the parsed data
  const parsedDate = JSON.parse(localStorage.getItem("searches")) || [];
  //getting the element
  const p = document.getElementsByTagName("p")[2];

  //emptying the previous data to restrict overflow of duplicates
  p.innerHTML = "";

  //iterating over the array of parsed data
  parsedDate.forEach((e) => {
    const a = document.createElement("a");
    a.textContent = e;
    a.href = "#";
    a.style.display = "block";

    //adding eventListeners
    a.addEventListener("click", () => {
      fetchImageOfTheDay(e);
    });

    p.appendChild(a);
  });
}

function fetchImageOfTheDay(date) {
  // console.log(date);
  // const currentDate=date.toISOString.split('T')[0];
  const api = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=j35rEyNF0Sro8IQRX03hM1iKsmoTivKVWQBgvffF`;
  fetch(api)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not OK");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      const dataTitle = data.title;
      const dataExplanation = data.explanation;
      const imageUrl = data.url;

      heading.textContent = `Picture on ${date}`;
      title.textContent = dataTitle;
      explanation.textContent = dataExplanation;
      image.setAttribute("src", imageUrl);
    })
    .catch((error) => {
      // console.log('This is the error', error);
      alert(error.response);
    });
}
