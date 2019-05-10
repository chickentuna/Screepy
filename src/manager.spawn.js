const creepLimit = {
  harvester: 2,
  builder: 1,
  upgrader: 1
}

function getNumberOfScreepsWithRole (role) {
  let count = 0
  for (let creepName in Game.creeps) {
    if (Game.creeps[creepName].memory.role === role) {
      count++
    }
  }
  return count
}

function generateCreepName (prefix) {
  let suffix = 0
  while (Game.creeps[prefix + suffix]) {
    suffix += 1
  }
  return prefix + suffix
}

function getCostOf (body) {
  let sum = 0
  for (let part of body) {
    sum += BODYPART_COST[part]
  }
  return sum
}

var spawnManager = {
  run: function () {
    for (let spawnName in Game.spawns) {
      const spawn = Game.spawns[spawnName]
      for (let role of ['harvester', 'builder', 'upgrader']) {
        let count = getNumberOfScreepsWithRole(role)
        if (count < creepLimit[role]) {
          let toSpawn = [MOVE, WORK, CARRY]

          if (spawn.energy >= getCostOf(toSpawn)) {
            let name = generateCreepName(role)
            spawn.spawnCreep(toSpawn, name, {
              memory: {
                role
              }
            })
          }
        }
      }
    }
  }
}

module.exports = spawnManager
