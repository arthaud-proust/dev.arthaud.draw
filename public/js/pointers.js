class PointerManager {
    constructor(container) {
        this.container = container;
        this.users = {};
    }

    get(username) {
        if(!this.users[username]) {
            this.users[username] = {
                coords: {x:0,y:0},
                el: null
            }
            this.crapEl(username);
        }
        return this.users[username]
    }

    setCoords(username, coords) {
        this.get(username).coords = coords;
    }

    crapEl(username) {
        if(!this.users[username].el) {
            let el = document.createElement('div');
            el.classList.add('canvas-pointer');
            el.dataset.user = username;
            el.innerText = username;
            this.users[username].el = el;
            this.container.appendChild(this.users[username].el);
        }
        return this.users[username].el
    }

    updateAll(users) {
        for(let [user, coords] of Object.entries(users)) {
            this.users[user] = coords;
        }
    }

    update(username, coords) {
        this.setCoords(username, coords);
        this.move(username, coords);
    }

    move(username, coords) {
        this.crapEl(username).style.top = coords.y+"px";
        this.crapEl(username).style.left = coords.x+"px";
    }

    updatePointers() {
        for(let [user, coords] of Object.entries(users)) {
            document.querySelector(`.canvas-pointer[data-user="${user}"]`)
            this.users[user] = coords;
        }
    }
}