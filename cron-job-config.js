const schedule = require('node-schedule');
const backUpDatabase = require('./controllers/back-up-system/backUp')
const backUpSchedule = schedule.scheduleJob('23 * * * 0', backUpDatabase)

module.exports = backUpSchedule