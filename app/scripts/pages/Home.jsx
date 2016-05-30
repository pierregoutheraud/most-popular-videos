import React from 'react'
import { browserHistory } from 'react-router'

import Video from 'components/Video.jsx'

class Home extends React.Component {

  constructor() {
    super()

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {

    let videos = [
      {
        xid: 'x4ddaju',
        title: 'PSY - GANGNAM STYLE(강남스타일) M/V'
      },
      {
        xid: 'x4ddaju',
        title: 'PSY - GANGNAM STYLE(강남스타일) M/V'
      }
    ]

    videos = videos.map((video,i) => {
      return (
        <Video
          rank={i}
          xid={video.xid}
          title={video.title}
          key={i}
        />
      )
    })

    return (
      <div className="page page--home">

        <h1>Most popular videos on internet</h1>

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
