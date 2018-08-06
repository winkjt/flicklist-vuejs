
var api = {
  root: "https://api.themoviedb.org/3",
  token: "f6bd21e39046f6a08df40d82ad8cffd3"
}

var flicklistView = new Vue({
	el: '#mount-target',
	data: function() {
		return {
			watchlistItems: [],
      browseItems: [],
      searchTerm: null,
		};
	},
	methods: {
    // TODO 1 (done)
    // This function should accept an argument, `keywords`
		discoverMovies: function (keywords) {

      // TODO 2 (done)
      // ask the API for movies related to the keywords that were passed in above
      // HINT: add another key/value pair to the url given to fetch

			fetch(`${api.root}/discover/movie?api_key=${api.token}&with_keywords=${keywords}`)
					.then(resp => resp.ok ? resp.json() : Promise.reject(resp))
					.then((response) => {
						console.log("We got a response from The Movie DB!");
						console.log(response);

						this.browseItems = response.results;

					});
    },
    searchMovies: function(searchTerm) {
      console.log(`searching for movies with "${searchTerm}" in their title...`);
      // TODO 3 (done)
      // change the url so that we search for keywords, not movies


      //TODO 4
      // when the response comes back, do all the tasks below


      // TODO 4a (done)
      // create a new variable called keywordIDs whose value is an
      // array of all the `.id` values of each object inside response.results
      // HINT use the array map function to map over response.results


      // TODO 4b (done)
      // create a new variable called keywordsString by converting
      // the array of ids to a comma-separated string, e.g.
      //      "192305,210090,210092,210093"
      // HINT: use the Array join function


      // TODO 4c (done)
      // instead of a comma-separated string, we want the ids
      // to be separated with the pipe "|" character, eg:
      //     "192305|210090|210092|210093"
      // HINT: pass an argument to the join function


      // TODO 4d (done)
      // when the response comes back, call discoverMovies,
      // passing along the string of keywords as an argument

      fetch(`${api.root}/search/keyword?api_key=${api.token}&query=${searchTerm}`)
      .then(resp => resp.ok ? resp.json() : Promise.reject(resp))
      .then((response) => {
        console.log("We got a response from The Movie DB!");
        console.log(response);
        var keywordIDs = response.results.map(r => r.id);
        var keywordsString = keywordIDs.join('|');

        this.discoverMovies(keywordsString);
      });

    },
    posterUrl: function(movie) {
      var baseImageUrl = "http://image.tmdb.org/t/p/w300/";
      return baseImageUrl + movie.poster_path;
      },
		addToWatchlist: function(movie) {
			this.watchlistItems.push(movie);
    },
    removeFromWatchlist: function(movie) {
      this.watchlistItems = this.watchlistItems.filter(m => m !== movie);
    },
	},
	mounted: function () {
		this.discoverMovies();
	},
});
