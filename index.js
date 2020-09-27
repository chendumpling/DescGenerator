//Gets rid of security warnings 
//(these security warnings show up regardless if the application is safe or not)
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; 

/***********************
 *  FUNCTIONS
 ***********************/

function copyToClipboard() {
    var copyText = document.getElementById("outputted");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
}

function createHTML() {
    var inputArray = [];
    var result = "";

    for (var i = 0; i < document.getElementsByName('inputval').length; i++){
        inputArray[i] = document.getElementsByName('inputval')[i].value;
    }
    
    //These will have their own different HTML tags

    //Input 1
    if(inputArray[0]){
        result += "<p>" + `${document.getElementById("input1").innerHTML}` + ": " + inputArray[0] + "</p>";
    }
    //Input 2
    if(inputArray[1]){
        result += inputArray[1]
    }
    //Input 3
    if(inputArray[2]){
        result += inputArray[2]
    }
    //Input 4
    if(inputArray[3]){
        result += inputArray[3]
    }
    //Input 5
    if(inputArray[4]){
        result += inputArray[4]
    }
    
    return result;
}

function inputAndUpdate() {
    document.getElementById("outputted").value = createHTML();
}

/***********************
 *  EVENT LISTENERS
 ***********************/

// Copy output to Clipboard
const copyClick = document.getElementById('copyClick');
copyClick.addEventListener('click', function(){
    copyToClipboard();
});

// Detect any change to input
document.addEventListener('input', function(){
   inputAndUpdate(); 
});

