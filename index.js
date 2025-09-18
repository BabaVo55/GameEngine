const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

cvs.width = 1080;
cvs.height = 620;

const CW = cvs.width;
const CH = cvs.height;
CW2 = CW / 2;
CH2 = CH / 2;

let angle = 0;

const proj = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];

const rozMat = (angle) => {
    return [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
    ]
}

const rotXMat = (angle) => {
    return [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ]
}

const rotYMat = (angle) => {
    return [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ]
}

function multMat(m, v) {
    const {x, y, z} = v; // Whats this? all assign to v?

    return {
        x: m[0][0] * x + m[0][1] * y + m[0][2] * z,
        y: m[1][0] * x + m[1][1] * y + m[1][2] * z,
        z: m[2][0] * x + m[2][1] * y + m[2][2] * z

    }
}

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
P[0] = new Vertex(400, 200, 0);
P[1] = new Vertex(600, 200, 0);
P[2] = new Vertex(400, 400, 0);
P[3] = new Vertex(600, 400, 0);

// const dot = new Vertex();

const engine = () => { 

    angle += 0.02;
    ctx.clearRect(0, 0, CW, CH);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CW, CH);


    // P[0].draw();
    // P.forEach(dot => dot.draw())

    for (let v of P){
        //centralize
        let rotated = multMat(rotYMat(angle), v);
        let proj2D = multMat(proj, rotated);

        drawVertex(proj2D.x, proj2D.y)
    }
    requestAnimationFrame(engine);
}


engine();