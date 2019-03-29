const express = require('express');
const os = require('os');
const request = require('request');;
const app = express();

// var keys = require('../env.json');
// console.log(request)
const envJson = require('../../env.json')
const api_key = envJson.api_Key;
app.use(express.static('dist'));
const getMovieListHTTP = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
console.log(getMovieListHTTP)
app.get('/api/getMovieList', (req, res) => {
  request.get(getMovieListHTTP,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body.results)
            // console.log(body)
            res.send(body)
        }else{
          // console.log(error, "error")

          return error
        }
    }
  );

});

app.post('/api/searchMovie/', (req, res)=>{
  console.log(req.query)
  request.get(`https://api.themoviedb.org/3/search/company?api_key=7565b329e2e97630530d3b802c68cab8&query=${req.query.value}&page=1`,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var bodyJson = JSON.parse(body);
            var total_results = bodyJson.total_results;
            console.log(bodyJson)
            if(total_results === 0){
              res.send({"results": "none"})
            }else{
              res.send(body)
            }
        }else{
          return error
        }
    }
  );
})

app.post('/api/getMovieById/', (req, res)=>{
  console.log(req.query)
  request.get(`https://api.themoviedb.org/3/movie/${req.query.value}?api_key=7565b329e2e97630530d3b802c68cab8&language=en-US`,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(body)
        }else{
          return error
        }
    }
  );
})

var server = app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
module.exports = server;
