
function checkGSTIN(gstin){
var regex="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
if( regex.test(String(gstin))){
    return true
}
else
    return false
}

function CheckGSTINEntry(value){
    debugger
    if(value=="1")
        document.querySelector('.gstinEntry').classList.remove('hidden')
    else
        document.querySelector('.gstinEntry').classList.add('hidden')
}