const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const connect = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b5ba86357c201e',
    password: '7cd63087',
    database: 'heroku_7f3c24aa7563043'
})

app.set('view_engine', 'ejs');
app.listen(port);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get("/:search", function(req, res){
    var word = req.params.search;
    connect.query('SELECT * FROM the_robbers WHERE Text LIKE ?', "%"+word+"%" , (error, rows) => {
        if(error) throw error;
        else {
           let s = '<h1 class = "occurences"> There are ' +String(rows.length)+" occurences </h1>";
            for (let i = 0; i < rows.length; i++) {
                s+='<div class = "details"><h3 class = "location">'
                s+='<span class="act">'+rows[i].Act+'</span>';
                s+='<span class="scene">'+rows[i].Scene+'</span>';
                s+='<span class="line">'+"Line: " +rows[i].Line+"</span>"+ "</h3>";
                s+='<p class = "text">' +rows[i].Text+ "</p></div>";
            }
            res.render("search.ejs", {result: s});
        }
    })
});

