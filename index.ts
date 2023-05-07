
/**
 * как я понял, в при использовании nominal types, проверка будет во время исполнения происходить,
 * а во время разработки TS будет требовать явного приведения
 */

// only positive integer

type TPositiveInteger = number & { __brand: "TPositiveInteger"}

const positiveNumberChecker = (value: number) => {
    if(value <= 0 || !Number.isInteger(value)){
        throw new Error(`Value ${value} should be a positive number`)
    }

    return value as TPositiveInteger
}

// range percent - exclude 146% case

type TPercentRange = number & { __brand: "TPercentRange"}

const percentRangeChecker = (value: number) => {
    
    if(value < 0 || value > 100){
        throw new Error(`Value ${value} should be in 0 to 100 range`)
    }

    return value as TPercentRange
}

function totalPrice(price: TPositiveInteger, discount: number, isInstallment: boolean, months: TPositiveInteger): number{

    const discountAmount = price * discount / 100
    const discountedPrice = price - discountAmount

    if(isInstallment){

        return discountedPrice / months
    }
    
    return discountedPrice
}

const price: TPositiveInteger = positiveNumberChecker(100000)
const discount: TPercentRange = percentRangeChecker(25)
const isInstallment = true
const months: TPositiveInteger = positiveNumberChecker(12)

const res = totalPrice(price, discount, isInstallment, months)

console.log(res);
