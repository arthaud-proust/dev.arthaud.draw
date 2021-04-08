const cvs = document.getElementById('canvas-element');
const pointer = document.getElementById('canvas-pointer');
const pointersDiv = document.querySelector('#canvas-pointers');
var pointerManager = new PointerManager(pointersDiv);

var canvas = new Canvas(cvs);
var stylo = new Stylo(cvs, pointer);
var roomObj = {};


socket.emit('create', room);

socket.on('roomUpdate', function(room) {
    Object.entries(room).forEach(([key,value])=>{
        roomObj[key] = value;
    })

    toggleLockButton.innerHTML=`<img src="/assets/${roomObj.locked?'':'un'}locked.svg">`
})

socket.on('move', function(coords) {
    stylo.movePointer(coords);
})

socket.on('move', function(coords) {
    stylo.movePointer(coords);
})

socket.on('draw', function(data) {
    stylo.draw(data.part);
    if(data.username !== username) {
        pointerManager.update(data.username, data.part[1]);
    }
})

socket.on('clear', e=>canvas.clear(e));





socket.on("connect", () => {
    socket.emit('room', room);
});

socket.on("ended", () => {
    window.location.href = '/';
});

window.onunload = window.onbeforeunload = () => {
    socket.emit('leave', {room, username: username});
    socket.close();
};