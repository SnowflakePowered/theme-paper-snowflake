Polymer 'paper-snowflake-state' ,
  publish:
    snowflakeAvailable: false
    stateReady: false
    gamesLoaded: false
    platformsLoaded: false
    controllersLoaded: false
    showingDetails: false
    availableGames: {}
    availablePlatforms: {}
    availableControllers: {}
    availableProfiles: {}
    selectedGame: {}
    selectedPlatformGames: []
    selectedPlatform: {}
    selectedController: {}
    availableDevices: []

  _snowflakeAvailable: (callback) ->
    promise = Promise.defer()
    window.setTimeout ->
      if window.snowflake == undefined
        window.setTimeout arguments.callee, 750
      else
        promise.resolve callback
      return
    , 750
    promise.promise
  selectedPlatformChanged: ->
    console.log "selected platform has changed"
    console.log @selectedPlatform
    @selectedPlatformGames = @availableGames[@selectedPlatform.PlatformID]
  selectedControllerChanged: ->
    console.log "selected controller has changed"
    snowflake.getControllerProfiles @selectedController.ControllerID
    .then (data) =>
      @availableProfiles = data;
  availableGamesChanged: ->
    console.log "list of available games have changed; refreshing"
    @selectedPlatformGames = @availableGames[@selectedPlatform.PlatformID]
  ready: ->
    console.log "state loaded"
    @_snowflakeAvailable()
    .then =>
      console.log "snowflake available"
      @snowflakeAvailable = true
      snowflake.getGames()
    .then (data) =>
      console.log "games loaded"
      console.log data
      @availableGames = data
      @gamesLoaded = true
      snowflake.getPlatforms()
    .then (data) =>
      console.log "platforms loaded"
      console.log data
      @availablePlatforms = data
      @platformsLoaded = true
      snowflake.getControllers()
    .then (data) =>
      console.log "controllers loaded"
      console.log data
      @availableControllers = data
      @controllersLoaded = true
      snowflake.getInputDevices()
    .then (data) =>
      console.log "devices loaded"
      filtered = (device.DI_ProductName for device in data when device.XI_IsXInput is false)
      preset_windows = ["KeyboardDevice", "XInputDevice1", "XInputDevice2", "XInputDevice3", "XInputDevice4"]
      @availableDevices = [preset_windows..., filtered...]
      return 1
    .then =>
      console.log "state ready"
      @stateReady = true
