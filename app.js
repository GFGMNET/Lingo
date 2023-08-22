const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const matter = require('gray-matter');
const marked = require('marked')


function getBlog(id) {
  const article = id;
  const blogFile = matter.read(__dirname + '/content/news/' + article + '.md');

  const md = require('markdown-it')()
  const content = blogFile.content;
  const result = md.render(content);
  return {
    result,
    blogFile,
  };
}


//const db_init =  require('./cfg/database.js');
var Datastore = require('nedb')
  , user = new Datastore({ filename: 'db/userfile', autoload: true })
  , category = new Datastore({ filename: 'db/categoryfile', autoload: true })
  , content = new Datastore({ filename: 'db/contentfile', autoload: true });

// body parse middleware application/x-www-form-urlencoded
// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

let cors = require("cors");
app.use(cors());

app.get("/category", (req, res) => {   
  category.find({}, function (err, docs) {
     res.send(docs)
  });
  console.log("ok")
});

app.post("/category", (req, res) =>{
  const l_name = req.body.name
  var doc = { 
    category: l_name
  };
category.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});
res.send('OK')

})

app.delete("/category/:id", (req, res) => {
   const l_name = req.params.id
  db.remove({ _id: l_name }, {}, function (err, numRemoved) {
    // numRemoved = 1
    res.send("ok")
  });
})

app.get("/user", (req, res) => {   
  user.find({}, function (err, docs) {
     res.send(docs)
  });
  });

app.get("/user/:id", (req,res) => {
  const _id = req.params.id
  user.findOne({ _id: _id }, function (err, doc) {
    // doc is the document Mars
    res.send(doc)
  });
})

app.post("/user", (req, res) =>{
  const l_name = req.body.lname
  const f_name = req.body.fname
  const u_name = req.body.uname
  const email  = req.body.email
  const pw = req.body.pw
  
  var doc = { 
    lastname: l_name,
	firstname: f_name,
	username: u_name,
	email: email,
  password: pw
  };
user.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});
res.send('OK')
})

app.delete("/user/:id", (req, res) => {
   const l_name = req.params.id
  db.remove({ _id: l_name }, {}, function (err, numRemoved) {
    // numRemoved = 1
    res.send("ok")
  });
})
//All Content
app.get("/news", (req, res) => {   
  content.find({}).sort({ date: -1 }).skip(0).limit(6).exec(function (err, docs)  {
     res.render("index",{
      title: "Home",
      l_data: docs
     }
    )
  });
  });

app.get("/", (req, res) => {   
  const blogposts = fs.readdirSync(__dirname + '/content/news').filter(file => file.endsWith('.md'));
  const posts = blogposts.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`content/news/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  })
  
   res.render("news", {
     title: "Home" ,
     l_data: posts
   });

  })
app.get("/news_test",(req, res)=>{
  const blogposts = fs.readdirSync(__dirname + '/content/news').filter(file => file.endsWith('.md'));
  const posts = blogposts.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`content/news/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  })
  res.send(posts)
})

app.get("/news/:article", (req, res) => {
   const article = req.params.article
   const blogFile = matter.read(__dirname + '/content/news/' + article + '.md');
   const md = require('markdown-it')()
   const content = blogFile.content;
   const result = md.render(content);
   
   console.log(blogFile)
   console.log(result)

   res.send(result)
})



app.get("/detail/:id", (req, res)=>{
  const idle = req.params.id
  content.findOne({ _id: idle }, function (err, doc) {
    // doc is the document Mars
    // If no document is found, doc is null
  });
})



app.get("/vod", (req, res) =>{
  content.find({type: 'vod'}, function(err, docs) {
    res.send(docs)
  })
});

app.post("/content", (req, res) =>{
  const l_name = req.body.type
  const date = new Date()
  const category = req.body.category
  const summary = req.body.summary
  const title = req.body.title
  const body = req.body.body
  const img = req.body.img

  var doc = { 
    type: l_name,
	  date: date,
    category: category,
    summary: summary,
    title: title,
    body: body,
    img: img
  };

content.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});
res.send('OK')
})

app.delete("/content/:id", (req, res) => {
   const l_name = req.params.id
  db.remove({ _id: l_name }, {}, function (err, numRemoved) {
    // numRemoved = 1
    res.send('OK')	
  });
})

app.get("/content/:id", (req,res) => {
  const _id = req.params.id
  content.findOne({ _id: _id }, function (err, doc) {
    // doc is the document Mars
    res.send(doc)
  });
})

app.listen('2000', () => {
    console.log('Server Started on port 2000');
});