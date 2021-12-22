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

app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get("/:search", function(req, res){
    var word = req.params.search;
    connect.query('SELECT * FROM the_robbers WHERE Text LIKE ?', "%"+word+"%" , (error, rows) => {
        if(error) throw error;
        else {
           let s = 'There are ' +String(rows.length)+" occurences <br>";
            for (let i = 0; i < rows.length; i++) {
                s+=rows[i].Act;
                s+=rows[i].Scene;
                s+="Line: "+rows[i].Line+"<br>";
                s+=rows[i].Text+"<br>"+"<br>";
            }
            res.render("search.ejs", {result: s});
        }
    })
});

