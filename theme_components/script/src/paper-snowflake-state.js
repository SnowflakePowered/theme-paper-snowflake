var __slice = [].slice;

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
    availableProfiles: {},
    selectedGame: {},
    selectedPlatformGames: [],
    selectedPlatform: {},
    selectedController: {},
    availableDevices: []
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
  selectedControllerChanged: function() {
    console.log("selected controller has changed");
    return snowflake.getControllerProfiles(this.selectedController.ControllerID).then((function(_this) {
      return function(data) {
        return _this.availableProfiles = data;
      };
    })(this));
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
        return snowflake.getInputDevices();
      };
    })(this)).then((function(_this) {
      return function(data) {
        var device, filtered, preset_windows;
        console.log("devices loaded");
        filtered = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            device = data[_i];
            if (device.XI_IsXInput === false) {
              _results.push(device.DI_ProductName);
            }
          }
          return _results;
        })();
        preset_windows = ["KeyboardDevice", "XInputDevice1", "XInputDevice2", "XInputDevice3", "XInputDevice4"];
        _this.availableDevices = __slice.call(preset_windows).concat(__slice.call(filtered));
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
