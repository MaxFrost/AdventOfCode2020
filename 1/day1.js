const fs = require('fs')

fs.readFile('./1/day1data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const lines = data.split(/\r?\n/)
    //console.log(data)
    //lines.forEach((line) => {
    //    console.log(line)
    //})

    var tempAdd = 0
    for(i=0; i < lines.length; i++) {
        for(j=0; j < lines.length; j++) {
            for(k=0; k < lines.length; k++) {
                if (i != j && i != k && j != k) {
                    tempAdd = Number(lines[i]) + Number(lines[j]) + Number(lines[k])
                    if (tempAdd == 2020) {
                        return console.log(Number(lines[i]) * Number(lines[j]) * Number(lines[k]))
                    }
                }
            }
        }
    }
})

