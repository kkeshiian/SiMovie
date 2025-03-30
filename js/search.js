let userGenres = JSON.parse(localStorage.getItem("selectedGenres") || []);
console.log("Genre user: ", userGenres);

let userLangs = JSON.parse(localStorage.getItem("selectedLangs") || []);
console.log("Lang user: ", userLangs);

let userPopularity = JSON.parse(localStorage.getItem("selectedDuration") || []);
console.log("popularity User: ", userPopularity);

const API_KEY = "6531a386ed2068e9261ec3fa0001cba6";
const URL = "https://api.themoviedb.org/3";

async function searchMovies(userGenres, userLangs, userPopularity) {
  const response = await fetch(
    `${URL}/discover/movie?api_key=${API_KEY}&with_genres=${userGenres}&with_original_language=${userLangs}&vote_average.${getPopularity()}`
  );
  const data = await response.json();
  console.log(data.results);
  return displayMovies(data.results);
}

searchMovies(userGenres, userLangs);

function getPopularity() {
  if (userPopularity[0] == 2) {
    return "gte=5";
  } else {
    return "lte=5";
  }
}

const movieList = document.querySelector(".list-card");

const genreNameMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function getGenresName(userGenres) {
  return userGenres
    .map((id) => genreNameMap[id] || "tidak diketahui")
    .join(", ");
}

const languageNameMap = {
  en: "English",
  id: "Indonesian",
  ja: "Japanese",
  fr: "French",
  es: "Spanish",
  de: "German",
  zh: "Chinese",
  ko: "Korean",
  hi: "Hindi",
  it: "Italian",
  ru: "Russian",
  pt: "Portuguese",
  ar: "Arabic",
  th: "Thai",
  tr: "Turkish",
};

function getlanguageName(userLangs) {
  return languageNameMap[userLangs] || "tidak diketahui";
}

function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const moviecard = `
            <div class="card card-compact bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="w-full h-auto"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title text-center mx-auto">${movie.title}</h2>
                  <p>Tanggal Rilis: ${movie.release_date}</p>
                  <p>Genre: ${getGenresName(movie.genre_ids)}</p>
                  <p>Bahasa: ${getlanguageName(movie.original_language)}</p>
                  <p>Popularitas: ${movie.vote_average}</p>
                </div>
            </div> `;
    movieList.innerHTML += moviecard;
  });
}
