const read = (params) => {
    return fetch('/api/game/' + params.gameId, {
      method: 'GET'
    }).then((response) => {
      return response.json()
    }).catch((e) => console.log(e))
  }
  export {
    read
  }
  