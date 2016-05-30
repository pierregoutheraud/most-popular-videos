import React from 'react'
import dm from 'api/DM.js'
import Player from './Player.jsx'

import video_xids from 'data/video_xids.js'

// import partners from './5000partners.js'
// let partners_ids = partners.slice(0, 5000) // first 1000 partners

// function getRandomItems(arr, n) {
//   var result = new Array(n),
//       len = arr.length,
//       taken = new Array(len);
//   if (n > len)
//       throw new RangeError("getRandom: more elements taken than available");
//   while (n--) {
//       var x = Math.floor(Math.random() * len);
//       result[n] = arr[x in taken ? taken[x] : x];
//       taken[x] = --len;
//   }
//   return result;
// }

// function getPartnersXids() {
//   let params = {
//     mostpopular: 1,
//     partner: 1,
//     limit: 100,
//     verified: 1
//   }
//   // Fetch 10 first pages
//   let partners = []
//   let p = Promise.resolve()
//   for (let i=1; i<=55; i++) {
//     p = p.then((res) => {
//       if (res) {
//         // console.log(res.list);
//         partners = partners.concat(res.list)
//       }
//       params.page = i
//       return dm.api('/users', params)
//     })
//   }
//
//   p.then((res) => {
//     console.log(partners.length);
//     partners.forEach((partner) => {
//       console.log(`'${partner.id}',`);
//     })
//   })
// }

/*
function getPartnersXids() {
  let params = {
    mostpopular: 1,
    partner: 1,
    limit: 100,
    verified: 1
  }
  // Fetch 10 first pages
  let partners = []
  let p = Promise.resolve()
  for (let i=1; i<=5; i++) {
    dm.api('/users', params)
    // p = p.then((res) => {
    //   if (res) {
    //     // console.log(res.list);
    //     partners = partners.concat(res.list)
    //   }
    //   params.page = i
    //   return dm.api('/users', params)
    // })
  }

  p.then((res) => {
    console.log(partners.length);
    partners.forEach((partner) => {
      console.log(`'${partner.id}',`);
    })
  })
}
*/

class PlayerContainer extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    // getPartnersXids()
    this.getVideo()
  }


  getVideo() {
    this.getVideoFromFile()
    // this.getVideo_1()
    // this.getVideo_2()
  }

  getVideoFromFile() {
    let id = video_xids[Math.floor(Math.random()*video_xids.length)]
    this.setState({
      video: {
        id
      }
    })
  }

  /*

  // get 10 random partners ids and use them in call
  getVideo_1() {

    function call() {
      let owners = getRandomItems(partners_ids, 10)
      let params = {
        owners,
        flags: 'partner',
        limit: 100,
        no_live: 1
      }
      return dm.api('/videos', params, false)
    }

    call().then((res) => {

      if (!res || !res.list.length) {
        this.getVideo_1()
        return
      }

      let videos = res.list
      let video = videos[Math.floor(Math.random()*videos.length)]
      // this.setState({ video })

    })

  }

  // get 1 random partner, 10 times --> 10 calls merged in one
  getVideo_2() {

    function call() {
      var partner_id = partners_ids[Math.floor(Math.random()*partners_ids.length)]
      let params = {
        owners: partner_id,
        flags: 'partner',
        limit: 100,
        no_live: 1
      }
      return dm.api('/videos', params, false)
    }

    // do 10 calls, so that its merged in one in sdk
    let numberOfCalls = 10
    let ps = []
    for(let i=0;i< numberOfCalls;i++) {
      ps.push(call())
    }

    // we get 10 responses and check if one of them contains a video
    let videos = null, video = null
    Promise.all(ps).then((responses) => {
      for(let i=0;i< responses.length;i++) {
        let res = responses[i]
        console.log(res.list.length);
        if (res.list.length) {
          videos = res.list
          video = videos[Math.floor(Math.random()*videos.length)]
          break;
        }
      }
      if (!video) {
        this.getVideo_2()
      } else {
        this.setState({ video })
      }
    });

  }

  getVideo_3() {
    dm.api('/videos', params, false).then((res) => {
      if (!res.list.length) {
        this.getVideo()
        return
      }
      let videos = res.list
      let video = videos[Math.floor(Math.random()*videos.length)]
    })
  }

  */

  render() {
    return (
      <div className="player-container">
        <Player video={this.state.video} getVideo={::this.getVideo} name={this.props.name} />
      </div>
    )
  }

}

export default PlayerContainer
