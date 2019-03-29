// Import the server we want to test
var app = require('../index');

// Import the SuperTest framework
var supertest = require('supertest');

// Give SuperTest the app we want to test
var testServer = supertest(app);





describe('POST /api/searchMovie/?value=adfaefadf', function() {
  it('responds with none', function(done) {
    testServer
      .post('/api/searchMovie/?value=adfawefda')
      .expect({'results': 'none'})
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});


describe('POST /api/searchMovie/?value=TOM', function() {
  it('responds with list of movies that contains a result object', function(done) {
    testServer
      .post('/api/searchMovie/?value=TOM')
      .expect(res => {typeof res.results === 'object'})
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

//test is breaking for unknowen reason. Passes if directly called

describe('GET /api/getMovieList', function() {
  it('responds with movie list', function(done) {
    return testServer
      .get('/api/getMovieList/')
      .expect(res => {typeof res.results === 'object'})
      // .then(res => {
      //   done();
      // })

      .end(function(err, res) {

        if (err) return done(err);
        done()
      });
  });
});

describe('GET /api/getMovieById', function() {
  it('responds with the movie object from the id sent as params', function(done) {
    return testServer
      .post('/api/getMovieById/?value=299537')
      .expect(res => {
              "adult": false,
              "backdrop_path": "/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
              "belongs_to_collection": null,
              "budget": 152000000,
              "genres": [
                {
                  "id": 28,
                  "name": "Action"
                },
                {
                  "id": 12,
                  "name": "Adventure"
                },
                {
                  "id": 878,
                  "name": "Science Fiction"
                }
              ],
              "homepage": "https://www.marvel.com/movies/captain-marvel",
              "id": 299537,
              "imdb_id": "tt4154664",
              "original_language": "en",
              "original_title": "Captain Marvel",
              "overview": "The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.",
              "popularity": 448.169,
              "poster_path": "/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
              "production_companies": [
                {
                  "id": 420,
                  "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
                  "name": "Marvel Studios",
                  "origin_country": "US"
                }
              ],
              "production_countries": [
                {
                  "iso_3166_1": "US",
                  "name": "United States of America"
                }
              ],
              "release_date": "2019-03-06",
              "revenue": 910298835,
              "runtime": 124,
              "spoken_languages": [
                {
                  "iso_639_1": "en",
                  "name": "English"
                }
              ],
              "status": "Released",
              "tagline": "Higher. Further. Faster.",
              "title": "Captain Marvel",
              "video": false,
              "vote_average": 7.2,
              "vote_count": 2981
      })
      .end(function(err, res) {

        if (err) return done(err);
        done()
      });
  });
});
