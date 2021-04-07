const u = require('./utils');
const os = require("os");

module.exports = function(io, roomManager) {
    // let broadcaster
    io.sockets.on("connection", socket => {
        
        socket.on('auth',  function(data) {
            if(socket.admin = false) return;
            if(data.adminCode == roomManager.getRoom(socket.room).adminCode) {
                socket.admin = true;

                io.sockets.in(socket.room).emit('message', {
                    type:'announcement', 
                    content:`
                        <h1>Hi there!</h1>
                        <h3>How can you invite people to join you?</h3>
                        <p>By sharing this link: <code>${socket.handshake.headers.host}/room/${socket.room}</code></p>
                        <p>Or by giving them the code of the room: <code>${socket.room}</code></p>
                        <span style="color:#9c3d3d">Note for admin: don't share the link of your actual page, it's the admin page.</span>
                        `
                });
            } else {
                console.log(data);
                console.log(roomManager.getRoom(socket.room).adminCode);
                socket.admin = false;
            }
        })

        socket.on('join', function (data) {

            if(roomManager.getRoom(data.room).join(u.escape(data.username)) == 'exist') {
                console.log('Already connected');
                socket.emit('redirect', '/choose-a-name/'+data.room);
            }

            socket.join(data.room);
            console.log(`${data.username} joined the room ${data.room}`);
            socket.room = data.room


            io.sockets.in(data.room).emit('users', roomManager.getRoom(data.room).users);
            // socket.emit('message', {type:'announcement', content:`${data.username} joined the room`});
            io.sockets.in(data.room).emit('message', {type:'announcement', content: u.escape(`${data.username} joined the room`)});
            io.sockets.in(data.room).emit('roomUpdate', roomManager.getRoom(data.room).data);
        });

        socket.on('leave', function (data) {
            socket.leave(data.room);
            console.log(`${data.username} left the room ${data.room}`);
            socket.room = undefined

            roomManager.getRoom(data.room).leave(u.escape(data.username));


            io.sockets.in(data.room).emit('users', roomManager.getRoom(data.room).users);
            // socket.emit('message', {type:'announcement', content:`${data.username} joined the room`});
            io.sockets.in(data.room).emit('message', {type:'announcement', content: u.escape(`${data.username} left the room`)});
        });

        socket.on('userConnected', function (data) {
            socket.emit('canTakeUsername', !roomManager.getRoom(data.room).connected(data.username));
        });

        socket.on('users', function (room) {
            socket.emit('users', roomManager.getRoom(room).users);
        });

        socket.on('delete', function (data) {
            if(!socket.admin) return;
            io.sockets.in(data.room).emit('message', {type:'announcement', content:`Video ended`});
            io.sockets.in(data.room).emit('ended');
            socket.leave(data.room);
            roomManager.delete(data.room);
            console.log(`Room ${data.room} ended`);
            socket.room = undefined
        });

        socket.on('messageSended', function (message) {
            console.log(`[${socket.room}] ${message.author}: "${message.content}" `);
            // socket.emit('message', {type:'message', author:message.author, content: message.content});
            io.sockets.to(socket.room).emit('message', {type:'message', author: u.escape(message.author), content: u.escape(message.content)});
        });


        socket.on("draw", part=> {
            if(socket.admin || !roomManager.getRoom(socket.room).locked) {
                io.sockets.in(socket.room).emit('draw', part);
            }
        })

        socket.on("move", coords=> {
            if(socket.admin) io.sockets.in(socket.room).emit('move', coords);
        })

        socket.on("clear", coords=> {
            if(socket.admin || !roomManager.getRoom(socket.room).locked) io.sockets.in(socket.room).emit('clear', coords);
        })

        socket.on("toggleLock", ()=> {
            if(socket.admin) {
                roomManager.getRoom(socket.room).toggleLock();
                io.sockets.in(socket.room).emit('roomUpdate', {locked: roomManager.getRoom(socket.room).locked});
            }
        })
    });
}



