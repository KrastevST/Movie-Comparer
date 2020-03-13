const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect(movie) {
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
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
  }
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
});
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
});

const onMovieSelect = async (movie) => {
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