Polymer('paper-snowflake-state', {
  publish: {
    snowflakeAvailable: false,
    stateReady: false,
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
        window.setTimeout(arguments.callee, 25);
      } else {
        promise.resolve(callback);
      }
    }, 25);
    return promise.promise;
  },
  selectedPlatformChanged: function() {
    console.log("selected platform has changed");
    console.log(this.selectedPlatform);
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
          return _this.availableGames = data;
        });
        snowflake.getPlatforms().then(function(data) {
          console.log("platforms loaded");
          console.log(data);
          return _this.availablePlatforms = data;
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

//# sourceMappingURL=paper-snowflake-state.js.map
