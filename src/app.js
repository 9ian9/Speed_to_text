let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');

// Cấu hình Express để phục vụ các file trong thư mục 'locales'
app.use('/locales', express.static(path.join(__dirname, 'locales')));

// Cấu hình favicon và các file static khác
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.of('/stream').on('connection', stream);

// Khởi động server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});