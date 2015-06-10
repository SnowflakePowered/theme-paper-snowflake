snowflake.getEmulatorFlags(this.selectedEmulator.name)
.then (data) =>
  this.fkeys = data
  snowflake.getFlagDefaultValues(this.selectedEmulator.name)
.then (data) =>
  this.defaultValues = data
  snowflake.getFlagValues(this.selectedEmulator.name, this.selectedGame.UUID)
.then (data) =>
  _flagValues = data
  _defaultValues = this.defaultValues
  for flag in Object.keys(this.fkeys)
      key = this.fkeys[flag].Key
      locked = (localStorage.getItem("unlocked_" + this.selectedGame.UUID + ";" + this.selectedEmulator.name + ";" + this.fkeys[flag].Key) is null)
      if locked
       this.commitQueue[this.selectedEmulator.name][this.selectedGame.UUID][key] = _defaultValues[key]
      else
       this.commitQueue[this.selectedEmulator.name][this.selectedGame.UUID][key] = _flagValues[key]
