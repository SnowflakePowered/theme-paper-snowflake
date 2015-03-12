Polymer 'paper-snowflake-state' ,
  publish:
    snowflakeAvailable: false
    stateReady: false
    availableGames: {}
    availablePlatforms: {}
    selectedGame: {}
    selectedPlatformGames: []
    selectedPlatform: {}

  _snowflakeAvailable: (callback) ->
    promise = Promise.defer()
    window.setTimeout ->
      if window.snowflake == undefined
        window.setTimeout arguments.callee, 25
      else
        promise.resolve callback
      return
    , 25
    promise.promise
  selectedPlatformChanged: ->
    console.log "selected platform has changed"
    console.log @selectedPlatform
    @selectedPlatformGames = @availableGames[@selectedPlatform.PlatformID];
  ready: ->
   console.log "state loaded"
   @_snowflakeAvailable()
   .then =>
    console.log "snowflake available"
    @snowflakeAvailable = true;
   .then =>
     snowflake.getGames()
     .then (data) =>
       console.log "games loaded"
       console.log data
       @availableGames = data
     snowflake.getPlatforms()
     .then (data) =>
       console.log "platforms loaded"
       console.log data
       @availablePlatforms = data;
     return 1;
   .then =>
     console.log "state ready"
     @stateReady = true;
     
   

