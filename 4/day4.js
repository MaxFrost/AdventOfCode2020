const fs = require('fs')
const data = fs.readFileSync('./4/day4data.txt', 'utf8')
const sample = fs.readFileSync('./4/day4sample.txt', 'utf8')

const dataInput = data.split(/\r?\n\r?\n/)
const sampleInput = sample.split(/\r?\n\r?\n/)
const masterReg = new RegExp("(\\D{3}:\\S*)",'g')

function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

function TestAge (year) {
    const allowed = range(1920, 2002)
    return allowed.includes(parseInt(year)) ? true : false
}

function TestIssYear (year) {
    const allowed = range(2010, 2020)
    return allowed.includes(parseInt(year)) ? true : false
}

function TestExpYear (year) {
    const allowed = range(2020, 2030)
    return allowed.includes(parseInt(year)) ? true : false
}

function TestHeight (height) {
    const allowedin = range(59,76)
    const allowedcm = range(150,193)
    if (height.match(/cm$/g) != null) {
        return allowedcm.includes(parseInt(height)) ? true : false
    } else if (height.match(/in$/g) != null) {
        return allowedin.includes(parseInt(height)) ? true : false
    } else {
        return false
    }
}

function TestHairColor (color) {
    return color.match(/^#[0-9a-f]{6}$/g) != null ? true : false
}

function TestEyeColor (eye) {
    return eye.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/g) != null ? true : false
}

function TestPassportID (passportID) {
    return passportID.match(/^\d{9}$/g) != null ? true : false
}

function Passport (newArray) {
    return {
        EyeColor:       ParseMatch(newArray, 'ecl' ),
        PassportID:     ParseMatch(newArray, 'pid'),
        ExpirationYear: ParseMatch(newArray, 'eyr'),
        HairColor:      ParseMatch(newArray, 'hcl'),
        BirthYear:      ParseMatch(newArray, 'byr'),
        IssueYear:      ParseMatch(newArray, 'iyr'),
        CountryID:      ParseMatch(newArray, 'cid'),
        Height:         ParseMatch(newArray, 'hgt'),
        IsValid() {
            if (this.EyeColor != null &&
                this.PassportID != null &&
                this.ExpirationYear != null &&
                this.HairColor != null &&
                this.BirthYear != null &&
                this.IssueYear != null &&
                this.Height != null) {
                return true
            } else {
                return false
            }
            
        },
        IsBetterValid() {
            if (this.IsValid()) {
                if (TestAge(this.BirthYear) &&
                    TestEyeColor(this.EyeColor)&&
                    TestPassportID(this.PassportID)&&
                    TestExpYear(this.ExpirationYear) &&
                    TestIssYear(this.IssueYear) &&
                    TestHairColor(this.HairColor) &&
                    TestHeight(this.Height)
                ) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }

        }
    }
}

function ParseMatch (inputArray, regex) {
    let foundItem = inputArray.find(item => item.match(new RegExp(regex,'g')))
    if (foundItem != null) {
        return foundItem.split(':')[1]
    } else {
        return null
    }
    
}

let validPassport = 0
dataInput.forEach(element => {
    let test2 = element.match(masterReg)
    let currentPassport = Passport(test2)
    if (currentPassport.IsValid() == true) {
        validPassport ++
    }
})

console.log("Part 1:", validPassport)

let validBetterPassport = 0
dataInput.forEach(element => {
    let test2 = element.match(masterReg)
    let currentPassport = Passport(test2)
    //console.log(currentPassport)
    if (currentPassport.IsBetterValid() == true) {
        validBetterPassport ++
    }
})

console.log("Part 2:", validBetterPassport)


