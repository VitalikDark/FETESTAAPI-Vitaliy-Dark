export const filteredMovieList = (data) => {
  if (data) {
    const { id, name, genres } = data
    let idStr = '', nameStr = '', genresStr = ''

    if (!!id) idStr = `&movie_id=${id}`
    if (!!name) nameStr = `&name=${name}`
    if (!!genres) genresStr = `&genres=${genres}`

    return `${idStr}${nameStr}${genresStr}`.slice(1)
  }
  return ``
}
