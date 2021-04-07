const { createCanvas, loadImage } = require('canvas')

module.exports = class Room {
    constructor(roomManager, code, admins) {
        this.roomManager = roomManager;
        this.code = code;
        this.admins = admins;
        this._users = [];
        this._locked = true;
        this.canvas = createCanvas(10000, 10000);
        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillStyle = '#000';
        
        this.adminCode = Array(20).fill('-').map(()=>{
            return this.roomManager.codeChars[Math.floor(Math.random()*this.roomManager.codeChars.length)];
        }).join('');
        // this.adminCode = 'adminTESTE';
    }

    get data() {
        return {
            code: this.code,
            admins: this.admins,
            users: this.users,
            locked: this.locked
        }
    }

    get json() {
        return JSON.stringify(this.data);
    }

    get locked() {
        return this._locked
    }

    get users() {
        return this._users
    }

    validAdminCode(adminCode) {
        return adminCode === this.adminCode;
    }

    connected(username) {
        return this._users.includes(username)
    }

    join(username) {
        if(this.connected(username)) {
            return 'exist'
            // return 'done'
        } else {
            this._users.push(username)
            return 'done'
        }
    }

    leave(username) {
        const index = this._users.indexOf(username);
        if (index > -1) {
            this._users.splice(index, 1);
        }
    }

    toggleLock() {
        this._locked = !this._locked;
    }

    draw(part) {
        this.ctx.beginPath();
        this.ctx.moveTo(part[0].x, part[0].y);
        this.ctx.lineTo(part[1].x, part[1].y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

}