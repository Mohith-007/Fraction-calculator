// script.js
function calculate() {
    const num1 = parseInt(document.getElementById('numerator1').value, 10);
    const den1 = parseInt(document.getElementById('denominator1').value, 10);
    const num2 = parseInt(document.getElementById('numerator2').value, 10);
    const den2 = parseInt(document.getElementById('denominator2').value, 10);
    const operation = document.getElementById('operation').value;

    if (den1 === 0 || den2 === 0) {
        document.getElementById('result').innerHTML = "Error: Denominator cannot be zero.";
        return;
    }

    let resultNum, resultDen;
    switch (operation) {
        case 'add':
            resultNum = num1 * den2 + num2 * den1;
            resultDen = den1 * den2;
            break;
        case 'subtract':
            resultNum = num1 * den2 - num2 * den1;
            resultDen = den1 * den2;
            break;
        case 'multiply':
            resultNum = num1 * num2;
            resultDen = den1 * den2;
            break;
        case 'divide':
            if (num2 === 0) {
                document.getElementById('result').innerHTML = "Error: Cannot divide by zero.";
                return;
            }
            resultNum = num1 * den2;
            resultDen = den1 * num2;
            break;
    }

    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const gcdValue = gcd(resultNum, resultDen);
    resultNum /= gcdValue;
    resultDen /= gcdValue;

    const resultFormat = document.querySelector('input[name="format"]:checked').value;
    let resultString = `${resultNum}/${resultDen}`;
    if (resultFormat === 'mixed' && Math.abs(resultNum) >= resultDen) {
        const wholePart = Math.floor(resultNum / resultDen);
        const fractionPartNum = Math.abs(resultNum % resultDen);
        resultString = `${wholePart} ${fractionPartNum}/${resultDen}`;
    }

    document.getElementById('result').innerHTML = `Result: ${resultString}`;
}

document.getElementById('fractionForm').onreset = function() {
    document.getElementById('result').innerHTML = '';
};
