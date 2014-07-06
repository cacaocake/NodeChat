var express = require('express');
var router = express.Router();
var Chat = require('../Chat');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/main', function(req, res) {

    var isSuccess = false
        , nickName = req.body.nickName;

    if (nickName && nickName.trim() !== '') {
        if (!Chat.hasUser(nickName)) {
            Chat.addUser(nickName);
            req.session.nickName = nickName;
            isSuccess = true;
        }
    }
    res.render('main', {
        isSuccess: isSuccess
        , nickName: nickName
        , roomList: Chat.getRoomList()
    });
});

router.get('/main', function(req, res) {
    if (req.session.nickName) {
        res.render('main', {
            isSuccess: true
            , nickName: req.session.nickName
            , roomList: Chat.getRoomList()
        });
    } else {
        res.render('enter', {
            isSuccess: false
            , nickName: ''
        });

    }

});

router.post('/makeRoom', function(req, res) {
    var isSuccess = false
        , roomName = req.body.roomName;

    if(roomName && roomName.trim() != '') {
        if (!Chat.hasRoom(roomName)) {
            Chat.addRoom(roomName);
            isSuccess = true;
        }
    }
    res.render('makeRoom', {
        isSuccess: isSuccess
        , roomName: roomName
    });
});

router.get('/join/:id', function(req, res) {
    var isSuccess = false
        , roomName = req.params.id;

    if (Chat.hasRoom(roomName)) {
        isSuccess = true;
    }

    res.render('room', {
        isSuccess: isSuccess
        , roomName: roomName
        , nickName: req.session.nickName
        , attendants: Chat.getAttendantsList(roomName)
    });
});



module.exports = router;
