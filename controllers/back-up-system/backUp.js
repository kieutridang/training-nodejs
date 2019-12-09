const exec = require('child_process').exec

function backUpDatabase() {
  const cmd = 'mongodump --host trainingNodejsDb-shard-0/trainingnodejsdb-shard-00-00-hb5zq.mongodb.net:27017,trainingnodejsdb-shard-00-01-hb5zq.mongodb.net:27017,trainingnodejsdb-shard-00-02-hb5zq.mongodb.net:27017 --ssl --username admin --password Ngocanh93 --authenticationDatabase admin --db clothstoredb'
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Backup success', stdout);
  })
}

module.exports = backUpDatabase