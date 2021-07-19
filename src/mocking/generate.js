module.exports = function () {
  var faker = require("faker");
  var _ = require("lodash");

  //Run json-server --watch generate.js --port 8000 to mock data
  return {
    popularMovies: _.times(100, function (n) {
      return `/title/tt${faker.random.number({
        min: 10000000,
        max: 99999999,
      })}`;
    }),
  };
};
