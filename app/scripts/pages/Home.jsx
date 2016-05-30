import React from 'react'
import { browserHistory } from 'react-router'

import Video from 'components/Video.jsx'
import FakePlayer from 'components/FakePlayer.jsx'

class Home extends React.Component {

  constructor() {
    super()

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {

    let videosData = [
      {
        xid: 'x4ddwjg',
        title: 'Funny Cats Compilation'
      }
    ]

    let videos = videosData.map((video,i) => {
      return (
        <Video
          rank={i}
          xid={video.xid}
          title={video.title}
          key={i}
        />
      )
    })
    // <FakePlayer videos={videosData} name="p1" />

    return (
      <div className="page page--home">

        <h1>Discover the most popular cat videos!</h1>

        <div className="videos-list">
          { videos }
        </div>

      </div>
    )
  }

}

Home.defaultProps  = {
}

export default Home
