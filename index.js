//Gets rid of security warnings 
//(these security warnings show up regardless if the application is safe or not)
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; 
var initialHTML = createHTML();

/***********************
 *  FUNCTIONS
 ***********************/

/**
 * Generates a preview by showing the HTML on the BrowserWindow
 */
function generatePreview(givenHTML) {
    document.getElementById("preview").innerHTML = givenHTML;
}

/**
 * Copies text in the HTML output box to clipboard,
 * then gives a confirmation until the input changes.
 */
function copyToClipboard() {
    var copyText = document.getElementById("outputted");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    document.getElementById("copyClick").style.backgroundColor = "#009900";
    document.getElementById("copyClick").innerHTML = "Copied!";
}

/**
 * Checks if user is thanking themselves
 * @param {String} tableType - name of the column ie "specs" and "details"
 * @return {String} the HTML fragment to be outputted
 */
function updateHTML(tableType){

    returnHTML = "";
    firstRowDone = false;
    firstRowDone2ndCol = false;

    for (var i = 0; i < document.getElementsByName(tableType).length; i++){

        if (document.getElementsByName(tableType)[i].value){
            if (firstRowDone === false) {
                returnHTML += "<tr><td class=\"firstrow\">";
                firstRowDone = true;
            }
            else {
                returnHTML += "<tr><td class=\"col1\">";
            }
            returnHTML += 
            `${document.getElementById(tableType + `${i+1}`).innerHTML}` + "</td>";
            
            if (firstRowDone2ndCol === false) {
                returnHTML += "<td class=\"firstrow2\">"; 
                firstRowDone2ndCol = true;
            }
            else {
                returnHTML += "<td>";
            }
            returnHTML +=  document.getElementsByName(tableType)[i].value + "</tr>";
        }
    }
    return returnHTML;
}

/**
 * Creates HTML for both specs and details
 * @return {String} the completed HTML to be outputted
 */
function createHTML() {
    
    result = "";
    
    //Changing HTML spacing here may result in error
    var result = "<style><!--.col1{color:#FCDC97;width:9em}" 
    + ".table td{background:#121212;padding:10px 10px 10px 0!important;border-top:1px solid #555!important;font-size:17px !important;}"
    + ".table tbody{padding:0!important}.table{border-width:0px!important;margin:0;"
    + "table-layout:fixed}.tablediv{padding-left:0}.table > tbody > tr:first-child > td{border-top:0!important}.firstrow{color:#FCDC97;width:9em;"
    + "border-top:0!important}.firstrow2{border-top:0!important}--></style>"
    + "<div class=\"tablediv\"><table width=\"100%\"><tbody>";
    result += updateHTML("specs");
    result += "</table>"
    result += "</div>";
    return result;
}

/**
 * Sets the outputted and preview HTML to nothing if the initial HTML === the current HTML.
 * Otherwise, outputs HTML and generates a preview of it.
 * Also hides the "Copied!" confirmation text.
 */
function inputAndUpdate() {
    let resultHTML = createHTML();
    if (resultHTML === initialHTML){
        document.getElementById("outputted").value = "";
        generatePreview("");
    }
    else {
        document.getElementById("outputted").value = resultHTML;
        generatePreview(resultHTML);
        document.getElementById("copyConfirmation").style.visibility = "hidden";
    }
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
    document.getElementById("copyClick").innerHTML = "Copy";
    document.getElementById("copyClick").style.backgroundColor = "#BF6900";
    inputAndUpdate(); 
});

