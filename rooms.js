var Chat = require('./Chat');

module.exports = function(app) {
    var io = require('socket.io').listen(app);

    var Room = io
        .of('/room')
        .on('connection', function(socket) {
            var joinedRoom = null;
            socket.on('join', function(data) {
                if (Chat.hasRoom(data.roomName)) {
                    joinedRoom = data.roomName;
                    socket.join(joinedRoom);
                    socket.emit('joined', {
                        isSuccess:true, nickName:data.nickName
                    });
                    socket.broadcast.to(joinedRoom).emit('joined', {
                        isSuccess:true, nickName:data.nickName
                    });
                    Chat.joinRoom(joinedRoom, data.nickName);
                } else {
                    socket.emit('joined', {isSuccess:false});
                }
            });

            socket.on('message', function(data) {
                if (joinedRoom) {
                    socket.broadcast.to(joinedRoom).json.send(data);
                }
            });

            socket.on('leave', function(data) {
                if (joinedRoom) {
                    Chat.leaveRoom(joinedRoom, data.nickName);
                    socket.broadcast.to(joinedRoom).emit('leaved', {
                        nickName:data.nickName
                    });
                    socket.leave(joinedRoom);
                }
            });
        });
}