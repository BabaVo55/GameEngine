const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

cvs.width = 1080;
cvs.height = 620;

const CW = cvs.width;
const CH = cvs.height;
CW2 = CW / 2;
CH2 = CH / 2;

class Vertex { 
    constructor(x = 0, y = 0, z = 0){
        this.x = x;
        this.y = y;
        this.z = z
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white'
        ctx.fill()
    }
}

const P = [];
P[0] = new Vertex(CW2, CH2, 0);

// const dot = new Vertex();

const engine = () => { 
    ctx.clearRect(0, 0, CW, CH);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CW, CH);


    // P[0].draw();
    P.forEach(dot => dot.draw())
    requestAnimationFrame(engine);
}


engine();