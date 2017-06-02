const express = require('express');
const cookieParser = require('cookie-parser');
const parser = require('body-parser').urlencoded({ extended: false });
const jwt = require('jsonwebtoken');

const JWT_KEY = 'sadb32yre9qwndi3uqvsdf@!#3';
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.cookie('token', '123123');
    res.render('home');
});

const requireLoggedIn = (req, res, next) => {
    const { TOKEN } = req.cookies;
    jwt.verify(TOKEN, JWT_KEY, (err, obj) => {
        if (err) return res.redirect('/dangnhap');
        next();
    });
};

const redirectIfLoggedIn = (req, res, next) => {
    const { TOKEN } = req.cookies;
    jwt.verify(TOKEN, JWT_KEY, (err, obj) => {
        if (!err) return res.redirect('/private');
        next();
    });
};

app.get('/private', requireLoggedIn, (req, res) => {
    res.send('Welcome!!!');
});

app.get('/dangnhap', redirectIfLoggedIn, (req, res) => res.render('dangnhap'));

app.post('/dangnhap', redirectIfLoggedIn, parser, (req, res) => {
    const { username, password } = req.body;
    const user = arrUser.find(e => e.username === username && e.pass === password);
    if (!user) return res.send('Dang nhap that bai');
    jwt.sign({ username }, JWT_KEY, (err, token) => {
        res.cookie('TOKEN', token);
        res.send('Dang nhap thanh cong');
    });
    // res.redirect('/private'); 
});

const arrUser = [
    { username: 'Ti', pass: '123' },
    { username: 'Teo', pass: '234' },
    { username: 'Tun', pass: '567' },
];

// app.post('/dangnhap', (req, res) => {

// });

// app.post('/muahang', (req, res) => {

// });

app.listen(3000, () => console.log('Server started!'));
