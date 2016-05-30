import React from 'react'
import { browserHistory } from 'react-router'
import youtubeSDK from 'sdks/YoutubeSDK.js'

class YoutubeVideos extends React.Component {

  constructor() {
    super()

    this.state = {
      videos: null
    }
  }

  componentDidMount() {
    youtubeSDK.search('cats').then((videos) => {
      this.setState({ videos })
    })
  }

  render() {

    let { videos } = this.state
    if (videos) {
      videos = videos.map((video, i) => {
        // console.log(video);
        return (
          <div className="yt-video">
            <h1>{ video.snippet.title }</h1>
            <img src={ video.snippet.thumbnails.high.url } height="200" />
            <p>{ video.id.videoId }</p>
            <a href={"https://www.youtube.com/watch?v="+video.id.videoId}>{"https://www.youtube.com/watch?v="+video.id.videoId}</a>
          </div>
        )
      })
    }

    return (
      <div className="page page--videos">
        { videos }
      </div>
    )
  }

}

YoutubeVideos.defaultProps  = {
}

export default YoutubeVideos
