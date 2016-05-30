'use strict';

var _partners = require('./5000partners.js');

var _partners2 = _interopRequireDefault(_partners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var request = require('request');

// let partnersSlice = partners.slice(0, 50)
var partnersSlice = _partners2.default;

var call_i = 0;

function call(data) {
  return new Promise(function (resolve, reject) {

    call_i++;
    console.log('call', call_i);

    var url = 'https://api.dailymotion.com';
    data = JSON.stringify(data);

    request.post(url, { form: data }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        (function () {
          var results = JSON.parse(body);

          var idsAll = [];
          results.forEach(function (res) {
            // for each result
            if (res.result.list) {
              var ids = res.result.list.map(function (video) {
                return video.id;
              });
              idsAll = idsAll.concat(ids);
            }
          });
          resolve(idsAll);
        })();
      } else {
        reject();
      }
    });
  });
}

var p = Promise.resolve(),
    video_xids = [];

var _loop = function _loop() {

  console.log(partnersSlice.length);

  var partner_ids = partnersSlice.splice(0, 9);
  var data = [];
  partner_ids.forEach(function (id) {
    data.push({
      "call": "GET /videos",
      "args": {
        "owners": [id],
        "flags": "partner",
        "limit": 100,
        "no_live": 1,
        "context": "t=1464442350658",
        "localization": "fr"
      },
      "id": 0
    });
  });

  p = p.then(function () {
    return call(data);
  }).then(function (xids) {
    video_xids = video_xids.concat(xids);
  });
};

while (partnersSlice.length) {
  _loop();
}

p.then(function () {
  // console.log(video_xids);

  // fs.writeFile("./test.js", `export default [${video_xids.toString()}]`, function(err) {
  //     if(err) return console.log(err);
  //     console.log("The file was saved!");
  // });

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  today = mm + '-' + dd + '-' + yyyy;

  var file = fs.createWriteStream('videos_' + video_xids.length + '_' + today + '.js');
  file.on('error', function (err) {
    console.log(err);
  });
  file.write('export default [');
  video_xids.forEach(function (xid) {
    // file.write(v.join(', ') + '\n');
    file.write('"' + xid + '",');
  });
  file.write(']');
  file.end();
  console.log("The file was saved!");
});

// let p = Promise.resolve()
// let video_ids = []
// for(let i=0;i<20;i++) {
//   let partner_xid = partners[i]
//   p = p.then(() => call(partner_xid)).then((ids) => {
//     video_ids = video_ids.concat(ids)
//     return video_ids
//   })
// }
// p.then(() => {
//   console.log('-->', video_ids);
// })