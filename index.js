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
    const {x, y, z} = v; // Whats this? all assign to v? No, Destructuring the x, y and z values from v

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
}

const drawVertex = (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white'
        ctx.fill()
}

const drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'white'
    ctx.stroke();
}


const P = [];

const center = new Vertex(CW2, CH2, 0);

P[0] = new Vertex(400, 200, -200);
P[1] = new Vertex(600, 200, -200);
P[2] = new Vertex(400, 400, -200);
P[3] = new Vertex(600, 400, -200);
P[4] = new Vertex(400, 200, 0);
P[5] = new Vertex(600, 200, 0);
P[6] = new Vertex(600, 400, 0);
P[7] = new Vertex(400, 400, 0);

// const dot = new Vertex();

const T = [
    // My Version
    // ***************
    // [0, 1, 2], [2, 3, 1],
    // [4, 7, 5], [5, 6, 7],
    // [0, 7, 2], [0, 4, 1],
    // [5, 1, 6], [6, 3, 7]
    // ***************
    // Corrected tutorial version
    // ***************
    [0, 1, 2], [1, 3, 2],
    [5, 4, 6], [4, 7, 5],
    [4, 0, 7], [0, 2, 7],
    [1, 5, 3], [5, 7, 3],
    [4, 5, 0], [5, 1, 0],
    [2, 3, 7], [3, 6, 7]
    // *************** 
]

    // for (let t of T){
    //     const p1 = projected[t[0]];
    //     const p2 = projected[t[1]];
    //     const p3 = projected[t[2]];

    //     drawLine(p1.x, p1.y, p2.x, p2.y);
    //     drawLine(p2.x, p2.y, p3.x, p3.y);
    //     drawLine(p3.x, p3.y, p1.x, p1.y);
    // }


const engine = () => { 

    angle += 0.0005;
    ctx.clearRect(0, 0, CW, CH);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CW, CH);
 

    // P[0].draw();
    // P.forEach(dot => dot.draw())

    const projected = []

    for (let v of P){
        //centralize

        let translated = new Vertex(v.x - center.x, v.y - center.y, v.z - center.z)
        let rotated = multMat(rotZMat(angle), translated);
        rotated = multMat(rotXMat(angle), rotated)
        let movedBack = new Vertex(rotated.x + center.x, rotated.y + center.y, rotated.z + center.z)
        let proj2D = multMat(proj, movedBack);

        drawVertex(proj2D.x, proj2D.y)

        projected.push(proj2D)
    }

    for (let t of T){
        const p1 = projected[t[0]];
        const p2 = projected[t[1]];
        const p3 = projected[t[2]];

        drawLine(p1.x, p1.y, p2.x, p2.y);
        drawLine(p2.x, p2.y, p3.x, p3.y);
        drawLine(p3.x, p3.y, p1.x, p1.y);
    }

    // for (let e of edges){
        // const p1 = projected[e[0]];
        // const p2 = projected[e[1]];
        // drawLine(p1.x, p1.y, p2.x, p2.y);
    // }

    
    requestAnimationFrame(engine);
}


engine();