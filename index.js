// Obtain the Canvas element through its ID;
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

// Set Canvas properties (width & height);
cvs.width = 1080;
cvs.height = 620;


// C-Width & C-Height is created and set using canvas width & height, then CW2 & CH2 is created using half of its value??
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

const rotZMat = (angle) => {
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
        this.z = z;
    }
    // draw(){
    //     ctx.beginPath();
    //     ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    //     ctx.fillStyle = 'white'
    //     ctx.fill()
    // }
}

const drawVertex = (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white'
        ctx.fill()
}


const P = [];

const center = new Vertex(CW2, CH2, 0);

P[0] = new Vertex(400, 200, 0);
P[1] = new Vertex(600, 200, 0);
P[2] = new Vertex(400, 400, 0);
P[3] = new Vertex(600, 400, 0);
P[4] = new Vertex(400, 200, -200);
P[5] = new Vertex(600, 200, -200);
P[6] = new Vertex(600, 400, -200);
P[7] = new Vertex(400, 400, -200);

// const dot = new Vertex();

const engine = () => { 

    angle += 0.009;
    ctx.clearRect(0, 0, CW, CH);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CW, CH);
 

    // P[0].draw();
    // P.forEach(dot => dot.draw())

    for (let v of P){
        //centralize

        let translated = new Vertex(v.x - center.x, v.y - center.y, v.z - center.z)
        let rotated = multMat(rotZMat(angle), translated);
        //Z rotation
        rotated = multMat(rotXMat(angle), rotated)
        // let rotated2 = multMat(rotXMat(angle), new Vertex(300,400,300))
        let movedBack = new Vertex(rotated.x + center.x, rotated.y + center.y, rotated.z + center.z)
        // let movedBack2 = new Vertex(rotated2.x + center.x, rotated2.y + center.y, rotated2.z + center.z)
        let proj2D = multMat(proj, movedBack);
        // let proj2D2 = multMat(proj, movedBack2);

        drawVertex(proj2D.x, proj2D.y)
        // drawVertex(proj2D2.x, proj2D2.y)
    }
    requestAnimationFrame(engine);
}


engine();