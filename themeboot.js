var Snowflake, SnowflakeEndpoint, _ref;

_ref = require('./node_modules/snowflake.js/snowflake.js'), SnowflakeEndpoint = _ref.SnowflakeEndpoint, Snowflake = _ref.Snowflake;

window.snowflake = new Snowflake(new SnowflakeEndpoint("ws://localhost:30003"));

window.addEventListener('snowflake-ok', function() {
  snowflake.getGames();
  return snowflake.getPlatforms();
});

//# sourceMappingURL=themeboot.js.map
