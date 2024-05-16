const canvas = document.getElementById('mainCanvas')
let c = canvas.getContext('2d')

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function getRadians(degrees) {
    return degrees * Math.PI / 180
}

// class Entity {
//     constructor() {

//     }
// }

class Circle {
    constructor(position, radius) {
        this.position = { ...position }
        this.radius = radius
        // console.log(JSON.stringify(ob))
    }

    drawCircle() {
        c.beginPath()
        c.arc(0, 0, this.radius, 0, 2 * Math.PI)
        c.closePath()
        c.fillStyle = 'lightblue'
        c.fill()
    }

    checkOverlap(shapes) {
        for (let i = 0; i < shapes.length; i++) {
            if (c.isPointInPath(shapes[i].center.x, shapes[i].center.y)) {
                if (shapes[i].radius === undefined) {
                    this.changeCircleSize(7.5)
                } else {
                    this.changeCircleSize(-15)
                }
                shapes.splice(i, 1)
            }
        }
    }

    changeCircleSize(delta) {
        this.radius += delta
    }
}

class Treat {
    constructor(position) {
        this.position = { ...position }
        this.size = {
            width: 15,
            height: 15
        }
        this.center =  {
            x: Math.ceil(this.position.x + this.size.width / 2),
            y: Math.ceil(this.position.y + this.size.height / 2)
        }
    }

    drawTreat() {
        c.fillStyle = 'orange'
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    }

}

// let x = 500
// let y = 375
// let r = 15
// let arm = r + 7.5

class Mine {
    constructor(center, radius, arm) {
        this.center = { ...center }
        this.radius = radius
        this.arm = arm
    }

    drawMine() {
        c.beginPath()
        c.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
        c.fillStyle = '#800020'
        c.fill()
        
        c.strokeStyle = '#800020'
        c.lineWidth = 2
        
        c.moveTo(this.center.x - this.arm, this.center.y)
        c.lineTo(this.center.x + this.arm, this.center.y)
        c.stroke()
        
        c.moveTo(this.center.x, this.center.y - this.arm)
        c.lineTo(this.center.x, this.center.y + this.arm)
        c.stroke()
        
        let obliqueX = Math.cos(getRadians(45)) * this.arm
        let obliqueY = Math.sin(getRadians(45)) * this.arm
        
        c.moveTo(this.center.x + obliqueX, this.center.y - obliqueY)
        c.lineTo(this.center.x - obliqueX, this.center.y + obliqueY)
        c.stroke()
        
        c.moveTo(this.center.x - obliqueX, this.center.y - obliqueY)
        c.lineTo(this.center.x + obliqueX, this.center.y + obliqueY)
        c.stroke()
        c.closePath()    
    }
}

let mines = []

function generateMines() {
    for (let i = 0; i < 4; i++) {
        let mine = new Mine({x: getRandomInt(986), y: getRandomInt(736)}, 10, 15)
        mines.push(mine)
    }
}

generateMines()


let treats = []

function generateTreats() {
    for (let i = 0; i < 10; i++) {
        let treat = new Treat({x: getRandomInt(986), y: getRandomInt(736)})
        treats.push(treat)
    }
}

generateTreats()

let circle = new Circle({x: 500, y: 375}, 50)
preDrawingCircle(circle)
circle.drawCircle()
postDrawingCircle()

function preDrawingCircle() {
    c.reset()
    drawAxis()
    for (let treat of treats) {
        treat.drawTreat()
    }
    for (let mine of mines) {
        mine.drawMine()
    }
    c.translate(circle.position.x, circle.position.y)
}

function postDrawingCircle() {
    circle.checkOverlap(treats)

    circle.checkOverlap(mines)
    // c.resetTransform()
    // console.log(treats)
    // for (let treat of treats) {
    //     treat.drawTreat()
    // }
    // console.log(treats)
    c.resetTransform()
}

function drawAxis() {
    c.beginPath()
    c.moveTo(500, 0)
    c.lineTo(500, 750)
    c.stroke()

    c.beginPath()
    c.moveTo(0, 375)
    c.lineTo(1000, 375)
    c.stroke()
}

function redrawCanvas() {
    c.reset()

}

// function drawCircle() {
//     c.reset()
//     drawAxis()
//     drawTreats()
//     c.translate(circle.position.x, circle.position.y)
//     c.beginPath()
//     circle.arc()
//     c.closePath()
//     circle.fillStyle()
//     c.fill()
//     checkOverlap()
//     c.resetTransform()
// }

window.addEventListener('keydown', function(event) {
    if (event.code == 'KeyD' || event.code == 'ArrowRight') {
        circle.position.x += 50
    } else if (event.code == 'KeyA' || event.code == 'ArrowLeft') {
        circle.position.x -= 50
    } else if (event.code === 'KeyS' || event.code == 'ArrowDown') {
        circle.position.y += 50
    } else if (event.code === 'KeyW' || event.code == 'ArrowUp') {
        circle.position.y -= 50
    }
    preDrawingCircle(circle)
    circle.drawCircle()
    postDrawingCircle()
})



