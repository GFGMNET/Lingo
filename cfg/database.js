var Datastore = require('nedb')
  , user = new Datastore({ filename: 'db/userfile', autoload: true })
  , category = new Datastore({ filename: 'db/categoryfile', autoload: true })
  , content = new Datastore({ filename: 'db/contentfile', autoload: true });