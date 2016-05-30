import React from 'react'

class Video extends React.Component {

  constructor() {
    super()

    this.state = {
    }
  }

  componentDidMount() {

    this.player = DM.player(this.refs.player, {
      video: this.props.xid,
      width: 650,
      height: 370,
      params: {
        autoplay: false,
        mute: false,
        // quality: '240',
      }
    });

  }

  render() {

    let { title, rank } = this.props

    return (
      <div className="video">
        <div className="video__info">
          <span className="video__rank">{ rank+1 }</span>
          <h2 className="video__title">
            { title }
          </h2>
        </div>
        <div ref="player" className="video__player" ></div>
      </div>
    )
  }

}

Video.defaultProps  = {
}

export default Video
