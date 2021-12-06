//TMDB

const API_KEY = "api_key=5339a4dd4bf8d631aa4b84f75a1d6802";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const searchAuthorURL = BASE_URL + "/search/person?" + API_KEY;
const WEATHER_API_URL =
  "http://api.weatherapi.com/v1/current.json?key=f0e57d6e2e58426cb79185737210312&q=";
const TRIVIA_API_URL =
  "https://opentdb.com/api.php?amount=5&category=11&type=boolean";
const joke = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");
const meteo = document.getElementById("meteo");
const progress = document.getElementById("progress");
const triviaPrev = document.getElementById("trivia-prev");
const triviaNext = document.getElementById("trivia-next");
const circles = document.querySelectorAll(".circle");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById("tags");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");
const questions = document.getElementById("questions");
const question = document.getElementById("question");
const loadingQuestion = document.getElementById("loading-question");
const triviaNew = document.getElementById("trivia-new");
const triviaRadioBtn = document.querySelectorAll(".trivia-btn input");
const triviaResult = document.getElementById("trivia-result");
const searchQuery = document.getElementsByName("search_query");

//===============Trivia Start===============//
var currentActive = 1;
var freshQuestions = [];
triviaNext.addEventListener("click", () => {
  currentActive++;
  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  update();
});

triviaPrev.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
});

triviaNew.addEventListener("click", () => {
  currentActive = 1;
  getQuestions();
  update();
});

triviaRadioBtn.forEach((radioBtn) => {
  radioBtn.addEventListener("click", () => {
    triviaResult.classList.remove("incorrect");
    triviaResult.classList.remove("correct");
    triviaResult.textContent = "";
    if (
      radioBtn.value.toLowerCase() ==
      freshQuestions[currentActive - 1].correct_answer.toLowerCase()
    ) {
      triviaResult.textContent = "Good Answer!";
      triviaResult.classList.add("correct");
    } else {
      triviaResult.textContent = "Bad Answer!";
      triviaResult.classList.add("incorrect");
    }
    console.log(radioBtn);
  });
});

getQuestions();

async function getQuestions() {
  currentActive = 1;
  loadingQuestion.classList.remove("hidden");
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const res = await fetch(TRIVIA_API_URL, config);
  const data = await res.json();
  if (data.length !== 0) {
    loadingQuestion.classList.add("hidden");
    console.log(data.results);
    freshQuestions = data.results;
    question.innerHTML = freshQuestions[currentActive - 1].question;
  } else freshQuestions = [];
}

function update() {
  // Update Active class in circle
  circles.forEach((circle, index) => {
    if (index < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  // Update the progress Bar
  var activeCircles = document.querySelectorAll(".active");

  // Switch the question
  if (currentActive <= freshQuestions.length)
    question.innerHTML = freshQuestions[currentActive - 1].question;

  // Clean the trivia result
  triviaResult.classList.remove("incorrect");
  triviaResult.classList.remove("correct");
  triviaResult.textContent = "";
  triviaRadioBtn.forEach((radioBtn) => {
    radioBtn.checked = false;
  });

  progress.style.width =
    ((activeCircles.length - 1) / (circles.length - 1)) * 100 + "%";

  // Change the button enabled and disabled state
  if (currentActive === 1) {
    triviaPrev.disabled = true;
  } else if (currentActive === circles.length) {
    triviaNext.disabled = true;
  } else {
    triviaPrev.disabled = false;
    triviaNext.disabled = false;
  }
}
//===============Trivia End=================//

//===============Meteo API Start===============//
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getMeteo);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

async function getMeteo(position) {
  locationUrl =
    WEATHER_API_URL +
    position.coords.latitude +
    "," +
    position.coords.longitude +
    "&aqi=no";
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const res = await fetch(locationUrl, config);
  const data = await res.json();
  console.log(data);
  if (data.length !== 0) {
    meteo.innerHTML = `
          <row class="meteo-row">
          <img class="meteo-logo" src="${
            data.current.condition.icon
              ? data.current.condition.icon
              : "https://static.thenounproject.com/png/82078-200.png"
          }" alt="${data.current.condition.text}">
          
          <div class="meteo-data">
          <h3 class="meteo-info">Condition : ${
            data.current.condition.text
          }<br> Temperature : ${data.current.temp_c}°C</h3>
          <h4>${data.location.name}, ${data.location.region}</h4>
          </div>
          </row>
        `;
  } else {
    meteo.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
  }
}
//===============Meteo API End===============//

//===============Dad Jokes API Start===============//
getJokes();

jokeBtn.addEventListener("click", getJokes);

async function getJokes() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const res = await fetch("https://icanhazdadjoke.com/", config);
  const data = await res.json();
  joke.innerText = data.joke;
}
//===============Dad Jokes API End===============//

//===============TMDB API Start===============//
const genres = [
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 28,
    name: "Action",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 53,
    name: "Thriller",
  },
];

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = "";
var totalPages = 100;

var selectedGenre = [];
setGenre();
function setGenre() {
  tagsEl.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
      highlightSelection();
    });
    tagsEl.append(t);
  });
}

function highlightSelection() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  clearBtn();
  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add("highlight");
    });
  }
}

function clearBtn() {
  let clearBtn = document.getElementById("clear");
  if (clearBtn) {
    clearBtn.classList.add("highlight");
  } else {
    let clear = document.createElement("div");
    clear.classList.add("tag", "highlight");
    clear.id = "clear";
    clear.innerText = "Clear x";
    clear.addEventListener("click", () => {
      selectedGenre = [];
      setGenre();
      getMovies(API_URL);
    });
    tagsEl.append(clear);
  }
}

getMovies(API_URL);

function getMovies(url) {
  next.classList.remove("hidden");
  prev.classList.remove("hidden");
  current.classList.remove("hidden");
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if (currentPage <= 1) {
          prev.classList.add("disabled");
          next.classList.remove("disabled");
        } else if (currentPage >= totalPages) {
          prev.classList.remove("disabled");
          next.classList.add("disabled");
        } else {
          prev.classList.remove("disabled");
          next.classList.remove("disabled");
        }

        tagsEl.scrollIntoView({ behavior: "smooth" });
      } else {
        main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
      }
    });
}

function getMoviesByAuthor(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length !== 0) {
        console.log(data.results);
        var directors = [];
        data.results.forEach(function (entry) {
          if (
            entry.known_for_department === "Directing" ||
            entry.known_for_department === "Writing"
          ) {
            directors.push(entry);
          }
        });
        console.log(directors);
        if (directors.length !== 0) {
          getCredits(directors);
        } else {
          main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
        }
      } else {
        main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
      }
    });
}

async function getCredits(directors) {
  var movies = [];
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  directors.forEach(async function (director) {
    var url = BASE_URL + "/person/" + director.id + "/credits?" + API_KEY;
    var res = await fetch(url, config);
    var data = await res.json();
    console.log(data.cast);
    movies = await movies.concat(data.cast);
    console.log(movies);
    showMovies(movies);
  });

  next.classList.add("hidden");
  prev.classList.add("hidden");
  current.classList.add("hidden");
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
             <img src="${
               poster_path
                 ? IMG_URL + poster_path
                 : "http://via.placeholder.com/1080x1580"
             }" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3>Overview</h3>
                ${overview}
                <br/> 
                <button class="know-more" id="${id}">Videos</button
            </div>
        
        `;

    main.appendChild(movieEl);

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openNav(movie);
    });
  });
}

const overlayContent = document.getElementById("overlay-content");
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + "/movie/" + id + "/videos?" + API_KEY)
    .then((res) => res.json())
    .then((videoData) => {
      console.log(videoData);
      if (videoData) {
        document.getElementById("myNav").style.width = "100%";
        if (videoData.results.length > 0) {
          var embed = [];
          var dots = [];
          videoData.results.forEach((video, idx) => {
            let { name, key, site } = video;

            if (site == "YouTube") {
              embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `);

              dots.push(`
              <span class="dot">${idx + 1}</span>
            `);
            }
          });

          var content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>
        
        ${embed.join("")}
        <br/>

        <div class="dots">${dots.join("")}</div>
        
        `;
          overlayContent.innerHTML = content;
          activeSlide = 0;
          showVideos();
        } else {
          overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
        }
      }
    });
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos() {
  let embedClasses = document.querySelectorAll(".embed");
  let dots = document.querySelectorAll(".dot");

  totalVideos = embedClasses.length;
  embedClasses.forEach((embedTag, idx) => {
    if (activeSlide == idx) {
      embedTag.classList.add("show");
      embedTag.classList.remove("hide");
    } else {
      embedTag.classList.add("hide");
      embedTag.classList.remove("show");
    }
  });

  dots.forEach((dot, indx) => {
    if (activeSlide == indx) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

leftArrow.addEventListener("click", () => {
  if (activeSlide > 0) {
    activeSlide--;
  } else {
    activeSlide = totalVideos - 1;
  }

  showVideos();
});

rightArrow.addEventListener("click", () => {
  if (activeSlide < totalVideos - 1) {
    activeSlide++;
  } else {
    activeSlide = 0;
  }
  showVideos();
});

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  var searchCategory = "";

  for (i = 0; i < searchQuery.length; i++) {
    if (searchQuery[i].checked) searchCategory = searchQuery[i].value;
  }
  console.log(searchCategory);
  selectedGenre = [];
  setGenre();
  if (searchTerm) {
    if (searchCategory === "director")
      getMoviesByAuthor(searchAuthorURL + "&query=" + searchTerm);
    else getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    getMovies(url);
  }
}
//===============TMDB API End===============//
