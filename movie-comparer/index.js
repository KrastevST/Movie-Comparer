const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '7d293ab4',
      s: searchTerm
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search for a movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"><div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
  const movies = await fetchData(event.target.value);

  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const option = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;

    option.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
      input.value = movie.Title;
      onMovieSelect(movie);
    });

    resultsWrapper.appendChild(option);
  }
};
input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', event => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});

const onMovieSelect =  async (movie) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '7d293ab4',
      i: movie.imdbID
    }
  });

  document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetailed) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetailed.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetailed.Title}</h1>
          <h4>${movieDetailed.Genre}</h4>
          <p>${movieDetailed.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary"
      <p class="title">${movieDetailed.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary"
      <p class="title">${movieDetailed.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary"
      <p class="title">${movieDetailed.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary"
      <p class="title">${movieDetailed.imdbRating}</p>
      <p class="subtitle">IMDB Raiting</p>
    </article>
    <article class="notification is-primary"
      <p class="title">${movieDetailed.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};