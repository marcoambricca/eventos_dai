export default class ValidationHelper{
    intMoreThan = (num, min) => {
        return num > min
    }
    intMoreOrEqualThan = (num, min) => {
        return num >= min
    }
    stringLongerThan = (str, min) => {
        return str.length > min
    }
    stringLongerOrEqualThan = (str, min) => {
        return str.length >= min
    }
}