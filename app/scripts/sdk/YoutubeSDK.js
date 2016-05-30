import request from 'superagent';
import store from 'store';
import SDK from 'sdks/SDK.js';

class YoutubeSDK extends SDK {

  constructor () {
    super();
    this.api_key = 'AIzaSyDWTBmnCCuCpiCb5trq-D4k8TSKXDqfBpw';
    this.initialized = true;

    window.handleGAPILoad = () => {
      gapi.client.setApiKey(this.api_key);
      gapi.client.load('youtube', 'v3').then(() => {
        this.initialized = true;
      });
    }

    let script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js?onload=handleGAPILoad';
    document.head.appendChild(script);

  }

  fetch({current, page}) {
    if (!this.initialized) {
      setTimeout(this.fetch, 500);
      return false;
    }
    return this.get();
  }

  get () {

    // return new Promise((resolve, reject) => {

      var request = gapi.client.youtube.videos.list({
        // 'part': 'contentDetails,fileDetails,id,liveStreamingDetails,localizations,player,processingDetails,recordingDetails,snippet,statistics,status,suggestions,topicDetails'
        'part': 'snippet,id,player,statistics',
        'chart': 'mostPopular',
        'maxResults': 10
      });

      return request.then(function(res) {
        return res.result.items;
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
      });

    // })



  }

}

export default new YoutubeSDK();
