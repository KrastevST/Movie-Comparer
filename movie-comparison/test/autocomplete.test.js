const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval)
        clearTimeout(timeout)
        resolve()
      }
    }, 30)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      reject()
    }, 2000)
  })
}

beforeEach(() => {
  document.querySelector('#target').innerHTML = ''
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData() {
      return [
        { Title: 'A movie' },
        { Title: 'Some movie' },
        { Title: 'Some other movie' },
      ]
    },
    renderOption(movie) {
      return movie.Title
    },
  })


})

it('Dropdown starts closed', () => {
  const dropdown = document.querySelector('.dropdown')

  assert.notInclude(dropdown.className, 'is-active')
})

it('After searching, dropdown opens up', async () => {
  const input = document.querySelector('input')
  input.value = 'inception'
  input.dispatchEvent(new Event('input'))

  await waitFor('.dropdown-item')

  const dropdown = document.querySelector('.dropdown')

  assert.include(dropdown.className, 'is-active')
})