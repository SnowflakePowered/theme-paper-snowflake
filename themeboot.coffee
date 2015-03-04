{SnowflakeEndpoint, Snowflake} = require './node_modules/snowflake.js/snowflake.js'

window.snowflake = new Snowflake new SnowflakeEndpoint "ws://localhost:30003"

window.addEventListener 'snowflake-ok', ->
    snowflake.getGames()
    snowflake.getPlatforms()