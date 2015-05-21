Polymer('paper-snowflake-state', {
  publish: {
    snowflakeAvailable: false,
    stateReady: false,
    gamesLoaded: false,
    platformsLoaded: false,
    controllersLoaded: false,
    showingDetails: false,
    availableGames: {},
    availablePlatforms: {},
    availableControllers: {},
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
        _this.snowflakeAvailable = true;
        return snowflake.getGames();
      };
    })(this)).then((function(_this) {
      return function(data) {
        console.log("games loaded");
        console.log(data);
        _this.availableGames = data;
        _this.gamesLoaded = true;
        return snowflake.getPlatforms();
      };
    })(this)).then((function(_this) {
      return function(data) {
        console.log("platforms loaded");
        console.log(data);
        _this.availablePlatforms = data;
        _this.platformsLoaded = true;
        return snowflake.getControllers();
      };
    })(this)).then((function(_this) {
      return function(data) {
        console.log("controllers loaded");
        console.log(data);
        _this.availableControllers = data;
        _this.controllersLoaded = true;
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
