class Stylo {
    constructor(canvas, pointer) {
        this.canvas = canvas;
        this.pointer = pointer;


        this.ctx = canvas.getContext('2d');

        this.rect = canvas.getBoundingClientRect();
        console.log(this.rect);
        this.scaleX = this.canvas.width / this.rect.width;
        this.scaleY = this.canvas.height / this.rect.height;

        this.drawing = false;
        this.points = [];
        this.atScreen = {
            x:0,
            y:0
        };

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = "round";

        this.setListeners();
    }

    setListeners() {
        this.canvas.addEventListener('mousedown', e=>this.start(e));
        this.canvas.addEventListener('mousemove', e=>this.handle(e));
        this.canvas.addEventListener('mouseup', e=>this.stop(e));
        this.canvas.addEventListener('mouseleave', e=>this.stop(e));
    }


    get precedent() {
        return this.points[this.points.length-1] ||[0,0];
    }

    get x() {
        return (this.atScreen.x) * this.scaleX
    }

    get y() {
        return (this.atScreen.y) * this.scaleY
    }

    get at() {
        return {
            x: this.x,
            y: this.y
        }
    }

    start(e) {
        this.points = [];
        this.drawing = true;
        console.log('Drawing started');
    }
    stop(e) {
        if(!this.drawing) return;
        this.drawing = false;
        console.log('Drawing stopped');
    }
    toggle() {
        this.drawing = !this.drawing;
    }


    handle(event) {
        // console.log(this.getPos(event));
        if(!this.drawing) {
            
        } else {

            this.atScreen.x = event.offsetX
            this.atScreen.y = event.offsetY

            socket.emit('draw', [
                this.precedent,
                this.at
            ])

            this.points.push(this.at);
        }
        // socket.emit('move', {
        //     x: event.offsetX,
        //     y: event.offsetY
        // });
    }


    movePointer(coords) {
        this.pointer.style.top = coords.y+"px";
        this.pointer.style.left = coords.x+"px";
    }

    draw(part) {
        this.ctx.beginPath();
        this.ctx.moveTo(part[0].x, part[0].y);
        this.ctx.lineTo(part[1].x, part[1].y);
        this.ctx.closePath();
        this.ctx.stroke();
    }



    getPos(event) {
        var eventDoc, doc, body;
            
        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        return {
            x: event.pageX,
            y: event.pageY
        }
    }
}