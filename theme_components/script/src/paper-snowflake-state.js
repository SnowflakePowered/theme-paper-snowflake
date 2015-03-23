Polymer('paper-snowflake-state', {
  publish: {
    snowflakeAvailable: false,
    stateReady: false,
    gamesLoaded: false,
    platformsLoaded: false,
    showingDetails: false,
    availableGames: {},
    availablePlatforms: {},
    selectedGame: {},
    selectedPlatformGames: [],
    selectedPlatform: {}
  },
  _snowflakeAvailable: function(callback) {
    var promise;
    promise = Promise.defer();
    window.setTimeout(function() {
      if (window.snowflake === void 0) {
        window.setTimeout(arguments.callee, 750);
      } else {
        promise.resolve(callback);
      }
    }, 750);
    return promise.promise;
  },
  selectedPlatformChanged: function() {
    console.log("selected platform has changed");
    console.log(this.selectedPlatform);
    return this.selectedPlatformGames = this.availableGames[this.selectedPlatform.PlatformID];
  },
  availableGamesChanged: function() {
    console.log("list of available games have changed; refreshing");
    return this.selectedPlatformGames = this.availableGames[this.selectedPlatform.PlatformID];
  },
  ready: function() {
    console.log("state loaded");
    return this._snowflakeAvailable().then((function(_this) {
      return function() {
        console.log("snowflake available");
        return _this.snowflakeAvailable = true;
      };
    })(this)).then((function(_this) {
      return function() {
        snowflake.getGames().then(function(data) {
          console.log("games loaded");
          console.log(data);
          _this.availableGames = data;
          return _this.gamesLoaded = true;
        });
        snowflake.getPlatforms().then(function(data) {
          console.log("platforms loaded");
          console.log(data);
          _this.availablePlatforms = data;
          return _this.platformsLoaded = true;
        });
        return 1;
      };
    })(this)).then((function(_this) {
      return function() {
        console.log("state ready");
        return _this.stateReady = true;
      };
    })(this));
  }
});
