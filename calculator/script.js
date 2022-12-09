
/*
    get all buttons depending if it is a number, operation, or the equal button
*/
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')


/* -- NUMBER BUTTONS */
/*
    for every number button, add an onclick function
    that displays the buttons the user has clicked
*/
numberButtons.forEach(button => {
    let value = button.textContent
    button.setAttribute('value', value)
    button.addEventListener('click', function(){
        addCurrOutput(value)
    })
});

/*
    display the numbers the user has clicked on
*/
var equation = [] //output list
var index = 0
function addCurrOutput(input){
    let display = ''
    //add button value to output list
    if(equation[index] == undefined) {
        display = input
        equation.push(input)
    } else {
        equation[index] = equation[index]+input
        display = equation[index]
    }

    //add to div
    let currDiv = document.getElementById('curr_display')
    currDiv.innerHTML = '' //clear if div has existing data
    currDiv.innerHTML = display;
}

/* OPERATION BUTTONS */
/*
    for each operation button, add an onclick function that
    lets the user input a new set of numbers 
    ex) 123 + 456 > allows user to input 456
*/
operationButtons.forEach(button => {
    let value = button.textContent
    button.setAttribute('value', value)
    button.addEventListener('click', function(){
        let op = value;
        changeDiv(op)
    })
});

/* 
    change the display layers
*/
function changeDiv(op){
    ++index
    equation.push(op)
    ++index

    //add to top div
    let prevDiv = document.getElementById('prev_display')
    prevDiv.innerHTML = equation.join(' ')
    //clear current div
    document.getElementById('curr_display').innerHTML = ''
}

/* EQUAL BUTTON */
/*
    when the equal button is clicked, calculated all the number
    input with the appropriate operation
*/
equalsButton.addEventListener('click', function(){
    var total = 0.0
    var op = '+'
    equation.forEach(element => {
        //convert into float
        var num = parseFloat(element)
        //if element is an operation
        if(isNaN(num)){
            op = element;
        } else{
            //calculate the total of given input
            total = (operators(op, total, num))
        }
    });
    displayTotal(total)
})

/*
   calculates with the proper operation and returns total 
*/
function operators(op, a, b) {
    if(op =='÷'){ return a / b }
    if(op =='x'){ return a * b }
    if(op =='+'){ return a + b }
    if(op =='-'){ return a - b }
};

/* 
    change the display output, and resets the user's input 
    with the total and allows the user to continue
*/
function displayTotal(total){
    document.getElementById('prev_display').innerHTML = equation.join(' ')
    document.getElementById('curr_display').innerHTML = total
    equation = []
    equation.push(total)
    index = 1
}
