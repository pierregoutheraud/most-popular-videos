class YoutubeSDK {

  constructor () {

    this.api_key = 'AIzaSyDWTBmnCCuCpiCb5trq-D4k8TSKXDqfBpw';

    this.ready = new Promise((resolve, reject) => {
      window.handleGAPILoad = () => {
        gapi.client.setApiKey(this.api_key);
        gapi.client.load('youtube', 'v3').then(() => {
          resolve()
        });
      }
    })


    let script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js?onload=handleGAPILoad';
    document.head.appendChild(script);

  }

  search (q) {
    return this.ready.then(() => {

      var request = gapi.client.youtube.search.list({
        'q': q,
        'part': 'snippet',
        'order': 'viewCount',
        'maxResults': 50
      });

      return request.then(function(res) {
        return res.result.items;
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
      });

    })
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
