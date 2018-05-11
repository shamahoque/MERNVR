const read = (params, credentials) => {
  return fetch('/api/game/' + params.gameId, {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}
export {
  read
}
