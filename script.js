
// function for operator

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => {
    if( b == 0){
        return 'nope';
    }
    else{    
        return a / b;
    }
}


// values 

let firstNum = '0';
let secondNum = '0';
let result = 0;
let operatorValue = '';

let operatorClickCount = 0;

// oepration and math

  function operate(){
      switch(operatorValue){
        case '*':
          result = multiply(firstNum, secondNum);
          result = (parseFloat(result.toPrecision(12)))
          operatorClickCount++;    
             break;
         case  '/':
                result = divide(firstNum, secondNum);
                operatorClickCount++;   
            break;
        case '+':
            result = add(firstNum, secondNum);
            result = (parseFloat(result.toPrecision(12)))
            operatorClickCount++;    
            break;
        case '-':
           result = subtract(firstNum, secondNum);
           result = (parseFloat(result.toPrecision(12)))
           operatorClickCount++;    
            break;
        default:
            operatorValue = '';
    }
}



const display = document.querySelector('#display h1')
const operator = document.getElementsByClassName('operator');
const numbers = document.getElementsByClassName('number');
const clean = document.getElementById('clear-btn');
const equal = document.getElementById('equal');
const decimal = document.getElementById('decimal');
const del = document.getElementById('delete');



// get values for all numbers


function getNumValue(){
    // num value 1

    if(operatorValue == ''){
        let atribute = this.getAttribute('value');
        firstNum = parseFloat(firstNum + atribute);
        display.textContent = firstNum;
    // num value 2 
    } else{
        let atribute = this.getAttribute('value');
        secondNum = parseFloat(secondNum + atribute);
        display.textContent = secondNum; 
    }
    operate();
};

// decimals

function getDecimal(){
    let decimalVal = "";
    let value = this.getAttribute('value');
    decimalVal = value;
    decimalFirstNum = String(firstNum);
    decimalSecondNum = String(secondNum);

    if(display.textContent == firstNum && decimalFirstNum.includes(".") === false)
    {
        firstNum = firstNum + decimalVal;;
        display.textContent = firstNum;
    }
    else if(display.textContent == secondNum && decimalSecondNum.includes(".") === false) {
        secondNum = secondNum + decimalVal;
        display.textContent = secondNum;
    };
};

// check if function is display on screen

function getOperatorValue(){
    let attribute = this.getAttribute('value');
    operatorValue = attribute;

        if(operatorClickCount >= 1){
            display.textContent = result;
            firstNum = result;
            secondNum = 0; 
        } 
};

// delete last num

function deleteLastNum1(){

    let fixedNum = String(firstNum).slice(0, -1);
    if(fixedNum.length < 1){
        firstNum = 0;
        display.textContent = firstNum;
    }
    else{
        firstNum = fixedNum;
        display.textContent = firstNum;
        firstNum = parseFloat(firstNum);

    };
}

function deleteLastNum2(){

    let fixedNum2 = String(secondNum).slice(0, -1);
    if(fixedNum2.length < 1){
        secondNum = 0;
        display.textContent = secondNum;
    }
    else{
        secondNum = fixedNum2;
        display.textContent = secondNum;
        secondNum = parseFloat(secondNum);
    }
};


// equal button function

function equalDisplayResult(){  


    if(result === result && display.textContent != firstNum){
        firstNum = result;
        secondNum = 0;
        display.textContent = result;
        operatorClickCount = 0;
    }
    else{
        display.textContent = firstNum;
    }
};


// clear function

function resetValues(){
    firstNum = '0';
    secondNum = '0';
    display.textContent = firstNum;
    operatorValue = '';
    operatorClickCount = 0;
    result = 0;
    // decimalCount = 0;

};




// add event listeners

    Array.from(numbers).forEach(number => {
        number.addEventListener("click", getNumValue);
    });

    Array.from(operator).forEach(operator =>{
        operator.addEventListener("click", getOperatorValue);
    });


    clean.addEventListener("click", resetValues);

    equal.addEventListener("click", equalDisplayResult);

    decimal.addEventListener("click", getDecimal);

    del.addEventListener("click", () => {
        if(firstNum == display.textContent){
            deleteLastNum1();
        }
        else if(secondNum == display.textContent){
            deleteLastNum2();
            operate();
        }
    });
