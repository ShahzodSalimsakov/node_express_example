const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

app.use(express.static(__dirname + 'public'));

app.use(function(req, res) {
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express run in http://localhost:' + app.get('port') + 'press Ctrl+C for exit');
});

var fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];