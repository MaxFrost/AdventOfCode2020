const fs = require('fs')
const data = fs.readFileSync('./5/day5data.txt', 'utf8')
//const sample = fs.readFileSync('./5/day5sample.txt', 'utf8')

const dataInput = data.split(/\r?\n/)
//const sampleInput = sample.split(/\r?\n/)

function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

function findSeat(array, side) {
    if(array.length == 1) return array[0]
    let half = array.length / 2
    let currentSide = side.slice(0,1)
    let remainingSide = side.slice(1)
    let cutArray = 0

    if (currentSide == 'F' || currentSide == 'L') {
        cutArray = array.slice(0,half)
    } else if (currentSide == 'B' || currentSide == 'R') {
        cutArray = array.slice(half)
    } else {
        throw "Unexpected side"
    }
    return findSeat(cutArray, remainingSide)
}

function calcPass(BoardingPass) {
    const rangeRow = range(0, 127)
    const rangeColumn = range(0, 7)
    let BoardingRow = findSeat(rangeRow, BoardingPass.slice(0,7))
    let BoardingColumn = findSeat(rangeColumn, BoardingPass.slice(7))

    let SeatID = BoardingRow * 8 + BoardingColumn

    //console.log("Row:",BoardingRow, "Column:",BoardingColumn, "ID:", SeatID )
    return SeatID
}

let HighestID = 0
dataInput.forEach(element => {
    let currentSeatID = calcPass(element)
    if (currentSeatID > HighestID) {
        HighestID = currentSeatID
    }
})

console.log("Part 1:", HighestID)

let foundSeats = []
dataInput.forEach(element => {
    foundSeats.push(calcPass(element))
})

let sortedID = foundSeats.sort((a,b) => a-b)

function findMissingID (sortedID) {
    let currentSet = sortedID.slice(0,2)
    if (currentSet[0]+1 == currentSet[1]) {
        console.log("compared: ", currentSet[0], currentSet[1])
        return findMissingID (sortedID.slice(2))
    } else if (currentSet[0]+2 == currentSet[1]){
        return console.log(currentSet[0]+1)
    } else if (currentSet[0] == null){
        throw "Too Deep"
    } else {
        return findMissingID (sortedID.slice(2))
    }
}

findMissingID(sortedID)