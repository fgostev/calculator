
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
    decimalResult = String(result);

    if(display.textContent == firstNum && decimalFirstNum.includes(".") === false)
    {
        firstNum = firstNum + decimalVal;;
        display.textContent = firstNum;
    }
    else if(display.textContent == secondNum && decimalSecondNum.includes(".") === false) {
        secondNum = secondNum + decimalVal;
        display.textContent = secondNum;
    }   
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
        else if(operatorValue != "" && display.textContent === String(result)){
            firstNum = result;
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
        display.textContent = fixedNum2;
        secondNum = parseFloat(fixedNum2);
    }
};


// equal button function


function equalDisplayResult(){  

    if(display.textContent === String(firstNum) && firstNum !== secondNum){
       display.textContent = firstNum;
    } else if(display.textContent === String(secondNum) && firstNum !== secondNum){
        display.textContent = result;
        firstNum = 0;
        secondNum = 0;
        operatorClickCount = 0;
        operatorValue = '';       
    }
    else if (firstNum === secondNum){
        display.textContent = result;
        operatorValue = '';
    };
};



// clear function

function resetValues(){
    firstNum = '0';
    secondNum = '0';
    display.textContent = firstNum;
    operatorValue = '';
    operatorClickCount = 0;
    result = 0;

};


// keyboard support



function keyboardSup (e){

// numbers

const calcButtons = "1234567890";

calcButtons.split("").forEach( number => 
    {
        if(e.key === number && operatorValue == ""){
            firstNum = parseFloat(firstNum += number);
            display.textContent = firstNum;
        }else if(e.key === number && operatorValue != ""){
            secondNum = parseFloat(secondNum += number);
            display.textContent = secondNum;
            operate();
        }
    });

// operator

    const operatorButtons = "*/+-";


    let currentOperator = "";
    operatorButtons.split("").forEach( operator => {


        if(e.key === operator && firstNum != ""){
            operatorValue = String(operator);
        }     

         if (e.key === operator && display.textContent == secondNum){
            operatorValue = String(operator);
            display.textContent = result;
            firstNum = result;
            secondNum = 0;
        }
            else if(e.key === operator && display.textContent == result && operatorValue == ""){
                operatorValue = String(operator);
                firstNum = result;
                secondNum = 0;
        }

    });

// equal 

    const equalButton = "=";

    if(e.key == equalButton){
        equalDisplayResult();
    };

    const backspace = "Backspace"
    if(e.key == backspace){
        if(firstNum == display.textContent && operatorClickCount === 0){
            deleteLastNum1();
        }
        else if(secondNum == display.textContent && operatorClickCount >= 1){
            deleteLastNum2();
            operate();
        }
    };

// decimal

    const decimalButton = ".";
    let decimalFirstNum = String(firstNum);
    let decimalSecondNum =String(secondNum);

    if (e.key == decimalButton){
        if(display.textContent == firstNum && decimalFirstNum.includes(".") === false)
        {
            firstNum = firstNum + decimalButton;;
            display.textContent = firstNum;
        }
        else if(display.textContent == secondNum && decimalSecondNum.includes(".") === false) {
            secondNum = secondNum + decimalButton;
            display.textContent = secondNum;
        }; 
    };
};



// add event listeners

    document.addEventListener('keydown', keyboardSup);

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
        if(firstNum == display.textContent && operatorClickCount === 0){
            deleteLastNum1();
        }
        else if(secondNum == display.textContent && operatorClickCount >= 1){
            deleteLastNum2();
            operate();
        }

    });
