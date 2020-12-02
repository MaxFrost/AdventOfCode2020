const fs = require('fs')

function Policy(policyString) {
    var tempelement = policyString.split(':')
    var tempPolicy = tempelement[0]

    var Policy = tempPolicy.split(' ')
    var minmax = Policy[0].split('-')

    return {
        policy:     Policy[1],
        min:        minmax[0],
        max:        minmax[1],
        password:   tempelement[1].trim(),
        CharCountPass() {
            var foundChar = (this.password.match(new RegExp(this.policy, "g")) || []).length
            return this.min <= foundChar && foundChar <= this.max ? 1 : 0
        },
        PlacementPass() {
            var Pass1 = this.password[this.min - 1].match(new RegExp(this.policy, "g")) != null ? 1:0
            var Pass2 = this.password[this.max - 1].match(new RegExp(this.policy, "g")) != null ? 1:0

            return Pass1 == Pass2 ? 0 : Pass1 || Pass2 ? 1 : 0
        }
    }
}

const data = fs.readFileSync('./2/day2data.txt', 'utf8')
const lines = data.split(/\r?\n/)

var totalPass = 0

lines.forEach(element => {
    totalPass += Policy(element).CharCountPass()
})
console.log("Part 1: " + totalPass)

totalPass = 0
lines.forEach(element => {
    totalPass += Policy(element).PlacementPass()
})
console.log("Part 2: " + totalPass)
