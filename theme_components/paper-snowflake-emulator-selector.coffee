snowflake.getEmulatorFlags this.selectedEmulator.name
.then (data) =>
  this.fkeys = data
  snowflake.getFlagDefaultValues this.selectedEmulator.name
.then (data) =>
  values = {}
  flags = (flag for own key, flag of this.fkeys when localStorage.getItem("custom_" + this.selectedGame.UUID + ";" +   this.selectedEmulator.name + ";" + flag.Key is null))
  (values[flag.Key] = data[flag.Key] for flag in flags)
  snowflake.setFlagValues this.selectedEmulator.name, this.selectedGame.UUID, values
.then =>
  snowflake.getFlagValues this.selectedEmulator.name, this.selectedGame.UUID
.then (data) =>
  this.fvalues = data
