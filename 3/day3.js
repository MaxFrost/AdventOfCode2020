const fs = require('fs')
const data = fs.readFileSync('./3/day3data.txt', 'utf8')
//const data = fs.readFileSync('./3/day3sample.txt', 'utf8')
const map = data.split(/\r?\n/)
const maplengthX = map[0].length
const maplengthY = map.length

console.log("Map Length: [X]" + maplengthX + " [Y]" + maplengthY)

function MapPath(plotX, plotY) {
    let treehit = 0
    let currentX = plotX
    for (i = plotY; i < maplengthY; i = i + plotY) {
        if (map[i][currentX] == '#') {
            treehit++
        }
        currentX = (currentX + plotX) % maplengthX
    }
    return treehit
}

console.log("Trees Hit:", MapPath(3, 1))

let ThisIsPain = MapPath(1, 1) * MapPath(3, 1) * MapPath(5, 1) * MapPath(7, 1) * MapPath(1, 2)

console.log("TreeHitHash", ThisIsPain)

/*
Ran into some math issues on this one. Was using an incorrect adder for the X,
so when the curveball of the second half showed up, the final calculation wasn't working right away.
*/