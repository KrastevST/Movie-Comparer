it('Shows an autocomplete', () => {
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData() {
      return [
        {Title: 'A movie'},
        {Title: 'Some movie'},
        {Title: 'Some other movie'},
      ]
    },
    renderOption(movie) {
      return movie.Title
    },
  })

  const dropdown = document.querySelector('.dropdown')

  assert.notInclude(dropdown.className, 'is-active')  
})