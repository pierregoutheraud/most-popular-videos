// import './all.js'

class DM {

  constructor() {
    window.DM.init({
      apiKey: '537f4fad3143ce59a831',
      status: true, // check login status
      cookie: true // enable cookies to allow the server to access the session
    })
  }

  api (url, params, immediate=true) {
    return new Promise((resolve, reject) => {
      params.context = 't=' + Date.now()
      params.localization = 'fr'
      window.DM.api(url, params, (res) => {
        console.log(res);
        if (res.error) {
          reject(res.error)
          return
        }
        resolve(res)
      }, immediate)
    }).catch((err) => {
      console.err(err);
    })
  }

}

export default new DM
