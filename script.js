
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


let result = 0;
let operatorValue = '';

let operatorClickCount = 0;

// oepration and math

  function operate(){

    let mathOne = parseFloat(firstNum);
    let mathTwo = parseFloat(secondNum); 

      switch(operatorValue){
        case '*':
          result = multiply(mathOne, mathTwo);
          result = (parseFloat(result.toPrecision(12)))
          operatorClickCount++;    
             break;
         case  '/':
                result = divide(mathOne, mathTwo);
                result = (parseFloat(result.toPrecision(12)))
                operatorClickCount++;   
            break;
        case '+':
            result = add(mathOne, mathTwo);
            result = (parseFloat(result.toPrecision(12)))
            operatorClickCount++;    
            break;
        case '-':
           result = subtract(mathOne, mathTwo);
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

let firstNum = '';
let secondNum = '';

function getNumValue(){
    // num value 1


    if(operatorValue == ''){
        let atribute = this.getAttribute('value');
        firstNum = firstNum + atribute;
        display.textContent = firstNum;
    }
    else{
        let atribute = this.getAttribute('value');
        secondNum = secondNum + atribute;
        display.textContent = secondNum; 
    }
    operate();


};



// stop here


function getDecimal1(){

let decimalVal ='.';

        if (display.textContent == '.'){
            display.textContent = '0.';
            firstNum = display.textContent;
        }

        decimal.disabled = true;
};

// function getDecimal2(){

function getDecimal2(){
    let decimalVal ='.';

    if (display.textContent == '.'){
        display.textContent = '0.';
        secondNum = String(display.textContent);
    }
 
    decimal.disabled = true;
}


// check if function is display on screen

function getOperatorValue(){
    let attribute = this.getAttribute('value');
    operatorValue = attribute;
    decimal.disabled = false;


        if(operatorClickCount >= 1){
            display.textContent = result;
            firstNum = result;
            secondNum = ''; 
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
    else if(fixedNum.includes('.') == false){
        decimal.disabled = false;
        firstNum = fixedNum;
        display.textContent = firstNum;
    }
    else{
        firstNum = fixedNum;
        display.textContent = firstNum;
    };
}

function deleteLastNum2(){

    let fixedNum2 = String(secondNum).slice(0, -1);
    if(fixedNum2.length < 1){
        secondNum = 0;
        display.textContent = secondNum;
    }
    else if(fixedNum2.includes('.') == false){
        decimal.disabled = false;
        secondNum = fixedNum2;
        display.textContent = secondNum;
    }
    else{
        secondNum = fixedNum2;
        display.textContent = secondNum;
    }
};


// equal button function


function equalDisplayResult(){  

    if(display.textContent === String(firstNum) && firstNum !== secondNum){
       display.textContent = firstNum;
    } else if(display.textContent === String(secondNum) && firstNum !== secondNum){
        display.textContent = result;
        firstNum = '';
        secondNum = '';
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
    firstNum = '';
    secondNum = '';
    display.textContent = firstNum;
    operatorValue = '';
    operatorClickCount = 0;
    result = 0;
    display.textContent = 0;

};


// keyboard support



function keyboardSup (e){

// numbers

const calcButtons = "1234567890";

calcButtons.split("").forEach( number => 
    {
        if(e.key === number && operatorValue == ""){
            firstNum = firstNum += number;
            display.textContent = firstNum;
        }else if(e.key === number && operatorValue != ""){
            secondNum = secondNum += number;
            display.textContent = secondNum;
        }
        operate();
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
            secondNum = '';
        }
            else if(e.key === operator && display.textContent == result && operatorValue == ""){
                operatorValue = String(operator);
                firstNum = result;
                secondNum = '';
        }

    });

// equal 

    const equalButton = "=";
    
    if(e.key == equalButton){
        equalDisplayResult();
    }

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

// get decimal

    const decimalButton = ".";

    if(e.key == decimalButton && display.textContent == firstNum && operatorValue === '' || display.textContent == '0' && operatorValue == ''){

        if (display.textContent == '0'){
            display.textContent = '0.';
            firstNum = display.textContent;
        }
        else if(display.textContent.includes('.') == false){
            firstNum = firstNum + decimalButton;
            display.textContent = firstNum;
        }
        else{
            decimal.disabled = true;

        }

        
    }else if(e.key == decimalButton && display.textContent == secondNum && operatorValue != '' || e.key == decimalButton && display.textContent == firstNum && operatorValue != ''){

        if(operatorValue != '' && secondNum == ''){
            display.textContent = '0.'
            secondNum = display.textContent;
        }
        else if(display.textContent.includes('.') == false){
            secondNum = secondNum + decimalButton;
            display.textContent = secondNum;
        }
        else{
            decimal.disabled = true;

        }

    }


};



// add event listeners

    document.addEventListener('keydown', keyboardSup);

    Array.from(numbers).forEach(number => {
        number.addEventListener("click",  getNumValue);
    });

    Array.from(operator).forEach(operator =>{
        operator.addEventListener("click", getOperatorValue);
    });


    clean.addEventListener("click", resetValues);

    equal.addEventListener("click", equalDisplayResult);

    decimal.addEventListener("click", () =>
    {
        if(display.textContent == firstNum && operatorValue === ''){
            getDecimal1();
        }
        else if (display.textContent == secondNum && operatorValue != ''){
            getDecimal2();
        }
    });

    del.addEventListener("click", () => {
        if(firstNum == display.textContent && operatorClickCount === 0){
            deleteLastNum1();
        }
        else if(secondNum == display.textContent && operatorClickCount >= 1){
            deleteLastNum2();
            operate();
        }

    });
