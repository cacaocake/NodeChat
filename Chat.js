
var Chat = module.exports = {
    users: []
    , rooms: []

    , hasUser: function(nickName) {
        var users = this.users.filter(function(element) {
            return (element === nickName);
        });

        if (users.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    , addUser: function(nickName) {
        this.users.push(nickName);
    }

    , removeUser: function(nickName) {
        var index = this.users.indexOf(nickName);
        if(index > -1){
            this.users.splice(index,1);
        }
    }
    // 방 관련 함수 모음
    , hasRoom: function(roomName) {
        var rooms = this.rooms.filter(function(element) {
            return (element.name === roomName);
        });

        if (rooms.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    , addRoom: function(roomName) {
        this.rooms.push({name:roomName, attendants:[]});
    }
    , removeRoom: function(roomName) {
        var index = this.rooms.indexOf(roomName);
        if(index > -1){
            if(this.rooms[index].attendants.length < 1) {
                this.rooms.splice(index, 1);
            }
        }
    }
    , getRoomList: function() {
        return this.rooms.map(function(element) {
            return element.name;
        });
    }
    , joinRoom: function(roomName, user) {
        var rooms = this.rooms.filter(function(element) {
            return (element.name === roomName);
        });
        if (!this.hasAttendant(rooms[0].attendants, user)) {
            rooms[0].attendants.push(user);
        }
    }
    , hasAttendant: function(attendants, user) {
        return attendants.some(function(element) {
            return (element === user);
        });
    }
    , leaveRoom: function(roomName, user) {
        var rooms = this.rooms.filter(function(element) {
            return (element.name === roomName);
        });
        rooms[0].attendants.forEach(function(element, index, arr) {
            if (element === user) {
                arr.splice(index, 1);
            }
        });
    }
    , getAttendantsList: function(roomName) {
        var rooms = this.rooms.filter(function(element) {
            return (element.name === roomName);
        });
        return rooms[0].attendants;
    }
}