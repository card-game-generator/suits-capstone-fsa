const io = require('socket.io')();

io.on('connection', client => {
  client.on('message', payload => {
    console.log('client is subscribing to timer with payload ', payload);
    io.emit('message', { message: 'XiFeng is the man' });
  });
});

const port = 8000;
io.listen(port);

console.log('listening on port ', port);
