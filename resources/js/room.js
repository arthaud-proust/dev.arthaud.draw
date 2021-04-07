module.exports = class Room {
    constructor(roomManager, code, admins) {
        this.roomManager = roomManager;
        this.code = code;
        this.admins = admins;
        this._users = [];
        this._locked = true;
        
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
}