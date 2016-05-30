import React from 'react'

class Player extends React.Component {

  constructor() {
    super()
    this.adsCount = 0
    this.videosCount = 0
    this.duration = 0
    this.state = {}
  }

  getRandomVideo() {
    console.log(this.props);
    let { videos } = this.props
    let video = videos[Math.floor(Math.random()*videos.length)]
    return video
  }

  loadRandomVideo() {
    let video = this.getRandomVideo()
    this.loadVideo(video)
  }

  componentDidMount() {

    console.debug(`start ${this.props.name}`);

    setInterval(() => {
      this.duration++
    }, 1000)

    setInterval(() => {
      // console.debug(`${this.props.name} - ${this.videosCount}v - ${this.adsCount}a - ${this.duration}s`)
      console.debug(`${this.props.name.replace('p', '')} - ${this.adsCount} - ${this.duration}`)
    }, 5000)

    let video = this.getRandomVideo()
    console.log(video);

    this.player = DM.player(this.refs.playerIframe, {
      video: video.xid,
      width: 650,
      height: 370,
      params: {
        autoplay: true,
        mute: true,
        quality: '240',
      }
    });

    this.apiReady = new Promise((resolve, reject) => {
      this.player.addEventListener('apiready', (e) => {
        resolve(e)
      })
    })

    this.player.addEventListener('ad_play', (e) => {
      console.debug('ad_play')
      this.player.setVolume(0)
    })
    this.player.addEventListener('playing', (e) => {
      this.videosCount++
      console.debug('playing')
      this.loadRandomVideo()
    })

    this.player.addEventListener('error', (e) => {
      console.debug('error')
      this.loadRandomVideo()
    })

    this.player.addEventListener('start', (e) => {
      console.debug('start')
      this.player.setVolume(0)
    })

    this.player.addEventListener('ad_timeupdate', (e) => {
      this.player.setVolume(0)
    })
    this.player.addEventListener('ad_start', (e) => {
      this.adsCount++
      this.player.setVolume(0)
      // console.debug('ad_start');
    })

    // this.player.addEventListener('ad_end', (e) => { console.debug('apiready') })
    // this.player.addEventListener('apiready', (e) => console.debug('apiready') )
    // this.player.addEventListener('ad_pause', (e) => console.debug('ad_pause') )
    // this.player.addEventListener('video_start', (e) => console.debug('video_start') )
    // this.player.addEventListener('video_end', (e) => console.debug('video_end') )

    // this.player.addEventListener('durationchange', (e) => { console.debug('durationchange') })
    // this.player.addEventListener('end', (e) => { console.debug('end') })
    // this.player.addEventListener('fullscreenchange', (e) => { console.debug('fullscreenchange') })
    // this.player.addEventListener('loadedmetadata', (e) => { console.debug('loadedmetadata') })
    // this.player.addEventListener('pause', (e) => { console.debug('pause') })
    // this.player.addEventListener('play', (e) => { console.debug('play') })
    // this.player.addEventListener('progress', (e) => { console.debug('progress') })
    // this.player.addEventListener('qualitiesavailable', (e) => { console.debug('qualitiesavailable') })
    // this.player.addEventListener('qualitychange', (e) => { console.debug('qualitychange') })
    // this.player.addEventListener('rebuffer', (e) => { console.debug('rebuffer') })
    // this.player.addEventListener('seeked', (e) => { console.debug('seeked') })
    // this.player.addEventListener('seeking', (e) => { console.debug('seeking') })
    // this.player.addEventListener('subtitlechange', (e) => { console.debug('subtitlechange') })
    // this.player.addEventListener('subtitlesavailable', (e) => { console.debug('subtitlesavailable') })
    // this.player.addEventListener('timeupdate', (e) => { console.debug('timeupdate') })
    // this.player.addEventListener('volumechange', (e) => { console.debug('volumechange') })

  }

  loadVideo(video) {
    this.apiReady.then((e) => {
      console.debug('load', video)
      this.player.load(video.xid)
    })
  }

  render() {

    if (this.props.video) {
      this.loadVideo()
    }

    return (
      <div className={"fplayer "+this.props.name}>
        <div ref="playerIframe" ></div>
      </div>
    )
  }

}

export default Player
