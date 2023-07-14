const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const markdown = require('markdown-it');
const matter = require('gray-matter');
const fs = require('fs'
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body parse middleware application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen('3000', () => {
    console.log('Server Started on port 3000');
});