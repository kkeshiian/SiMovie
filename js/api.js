const API_KEY = "6531a386ed2068e9261ec3fa0001cba6";
const URL = "https://api.themoviedb.org/3";

async function searchMovies(query) {
  const response = await fetch(
    `${URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await response.json();
  console.log(data.results);
  return data.results;
}

const searchInput = document.querySelector(".Input-judul");
const searchButton = document.querySelector(".btn-search");
const movieList = document.querySelector(".list-card");

searchButton.addEventListener("click", async () => {
  // alert("halo")
  const query = searchInput.value.trim();
  if (query) {
    const movies = await searchMovies(query);
    displayMovies(movies);
  }
});

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

function getGenresName(genreIDs) {
  return genreIDs.map((id) => genreNameMap[id] || "tidak diketahui").join(", ");
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

function getlanguageName(lang) {
  return languageNameMap[lang] || "tidak diketahui";
}

function displayMovies(movies) {
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = `
          <div class="card card-compact bg-base-100 shadow-xl">
              <figure>
                  <img 
                      src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                      class="w-full h-auto" 
                  />
              </figure>
              <div class="card-body">
                  <h2 class="card-title text-center mx-auto">${movie.title}</h2>
                  <div class="movie-info">
                      <p><strong>Tanggal Rilis</strong> <span>:</span> ${
                        movie.release_date
                      }</p>
                      <p><strong>Genre</strong> <span>:</span> ${getGenresName(
                        movie.genre_ids
                      )}</p>
                      <p><strong>Bahasa</strong> <span>:</span> ${getlanguageName(
                        movie.original_language
                      )}</p>
                      <p><strong>Popularitas</strong> <span>:</span> ${
                        movie.vote_average
                      }</p>
                  </div>
              </div>
          </div>
      `;

    movieList.innerHTML += movieCard;
  });
}
