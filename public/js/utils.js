/* dom control */

const menu = document.querySelector('#menu');
const usersMenu = document.querySelector('#users');
const chat = document.querySelector('#chat')
const clearButton = document.querySelector("#clear");
const toggleLockButton = document.querySelector("#toggle-lock");
const toggleMenuButton = document.querySelector("#toggle-menu");
const toggleUsersButton = document.querySelector("#toggle-users");
const toggleChatButton = document.querySelector("#toggle-chat");
const endSessionButton = document.querySelector('#end-session');
const leaveSessionButton = document.querySelector('#leave-session');



if(clearButton) clearButton.addEventListener("click", clear);
if(toggleLockButton) toggleLockButton.addEventListener("click", toggleLock);
if(toggleMenuButton) toggleMenuButton.addEventListener("click", toggleMenu);
if(toggleUsersButton) toggleUsersButton.addEventListener("click", toggleUsers);
if(toggleChatButton) toggleChatButton.addEventListener("click", toggleChat);
if(endSessionButton) endSessionButton.addEventListener("click", endSession);
if(leaveSessionButton) leaveSessionButton.addEventListener("click", leaveSession);


function clear() {
    socket.emit('clear');
}

function toggleMenu() {
    this.src=`/assets/menu${menu.classList.contains('open')?'':'-close'}.svg`
    menu.classList.toggle('open')
}

function toggleLock() {
    socket.emit('toggleLock');
}

function toggleUsers() {
    // this.src=`/assets/menu${usersMenu.classList.contains('open')?'':'-close'}.svg`
    toggleUsersButton.src = `/assets/users${usersMenu.classList.contains('open')?'':'-open'}.svg`;
    usersMenu.classList.toggle('open')
}

function toggleChat() {
    this.innerHTML = `<img src="/assets/chat${chat.classList.contains('open')?'-off':''}.svg">`;
    chat.classList.toggle('open')
}

function endSession() {
    socket.emit('delete', {room});
    socket.close();
    document.location.href = '/'
}
function leaveSession() {
    socket.emit('leave', {room, username: username});
    socket.close();
    document.location.href = '/'
}