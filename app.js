const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const markdown = require('markdown-it');
const matter = require('gray-matter');
const fs = require('fs');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parse middleware application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    const blogposts = fs.readdirSync(__dirname + '/content/blog').filter(file => file.endsWith('.md'));
    const posts = blogposts.map((fileName) => {
      const slug = fileName.replace('.md', '');
      const readFile = fs.readFileSync(`content/blog/${fileName}`, 'utf-8');
      const { data: frontmatter } = matter(readFile);
      return {
        slug,
        frontmatter,
      };
    })
    console.log(posts);
     res.render("index", {
       title: "Home" ,
       posts: posts
     });
  
  });


app.listen('3000', () => {
    console.log('Server Started on port 3000');
});