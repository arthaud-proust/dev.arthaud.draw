class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        // canvas.height = 1080;
        // canvas.width = 1920;

        this.rect = canvas.getBoundingClientRect();
        this.scaleX = this.canvas.width / this.rect.width;
        this.scaleY = this.canvas.height / this.rect.height;

        this.ctx = canvas.getContext('2d');


        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = "round";

        this.setCanvasSize()
        window.addEventListener('resize', e=>this.setCanvasSize);
    }

    setCanvasSize () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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



    returnPos(event) {
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