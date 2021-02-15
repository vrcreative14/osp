
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


const SaveSellerInfo = () => {  
    let status = ValidateSellerInfo()
    if (status == false)
    return
    const list = ["firstname","middlename","lastname","primaryemail","primarymobile","secondaryemail","secondarymobile" ]
    debugger
    var user = getCookie('user')
    var dict = {
        "user": user
    };
    dict[""]
    for(let i=0; i < list.length; i++){
    //  let a = document.getElementById(list[i])
    //  array.push(a.value)    
    dict[list[i]] = document.getElementById(list[i]).value
  }
  jsonBody=JSON.stringify(dict)
  postJSON('http://www.vcnity.online/api/seller/register/',jsonBody)
  openTab('storeInfo')
  document.getElementsByClassName('showMessage').style.display = 'block'
}


const SaveStoreInfo = () => {    
    if(getCookie('seller')==""){
       DisplayMessage('','Please register yourself as a Seller before registering the Shop/Store', 'info')
       openTab('sellerInfo')
       return
    }
    let status = ValidateStoreInfo()
    if (status == false)
      return

    const list = ["shopname","state","city","pincode","latitude","longitude","productcategory", "storecategory",  "address", "landmark", "gstin"]
    debugger
    var user = getCookie('user_ph')
  
    //var seller = getCookie('seller')
    var dict = {
        "user_ph" : user,        
    };
    dict[""]
   for(let i=0; i < list.length; i++){
    //  let a = document.getElementById(list[i])
    //  array.push(a.value)    
    dict[list[i]] = document.getElementById(list[i]).value
  }
  if(document.querySelector('input[name="isgstregistered"]:checked').value == '1')
        dict["isgstregistered"] = true
   else
   dict["isgstregistered"] = false

  jsonBody=JSON.stringify(dict)
  postJSONAuth('http://www.vcnity.online/api/store/create/',jsonBody)
}


const SaveStoreDetails = () => {
    debugger
    let status = ValidateStoreInfo()
    if (status == false)
    return

    const list = ["shopname","state","city","pincode","latitude","longitude","productcategory", "storecategory", "storeimage","address","isgst","gstin" ]
    debugger
    var user = getCookie('user')
    var seller = getCookie('seller')
    var dict = {
        "user": user,
        "seller": seller
    };
    dict[""]
   for(let i=0; i < list.length; i++){
    //  let a = document.getElementById(list[i])
    //  array.push(a.value)    
    dict[list[i]] = document.getElementById(list[i]).value
  }
  jsonBody=JSON.stringify(dict)    
  postJSON('http://www.vcnity.online/api/store/details/', jsonBody)
}

function FetchFillLocation(event){
    document.getElementById('currentEvent').value = event.target.id
    var locatebutton = document.querySelector('#detect-location')
    if (locatebutton != null)
     locatebutton.classList.add('loading')
    getLocation()
    let location = document.getElementById('saveLocation').value
    if(location != "")
    FillAddress(location)   
    //DisplayMessage('', 'Not able to detect location at this time' ,false)
}

function FillAddress(data){
    let address = data["houseNumber"] + " " +data["street"] + " " + data["subLocality"] 
    if(document.getElementById('address') == null)
    return
    document.getElementById('address').value = address
    document.getElementById('city').value = data["city"]
    document.getElementById('pincode').value = data["pincode"]
    document.getElementById('state').value = data["state"]
    document.getElementById('landmark').value = data["poi"]
  
    var locatebutton = document.querySelector('#detect-location')
    if (locatebutton != null)
     locatebutton.classList.remove('loading')
    document.querySelector('#locationmessage').style.display = 'inline'
}

function CheckProductCategory(){
   var category = document.getElementById('store-category').value
   if (category == 'Others'){
        document.querySelector('#describe-category').classList.remove('hidden')
   }

}

const ValidateStoreInfo = () => {
    const list = ["shopname","state","city","pincode","productcategory", "storecategory", "isgstregistered","gstin"]
    var listDup = ["shopname","state","city","pincode","productcategory", "storecategory", "isgstregistered","gstin"]
    const optionalList = ['address','latitude','longitude','storeimage']
    var index = 0
    for(let i =0;i < list.length;i++){
        let item = list[i]        
        if(item == 'isgstregistered'){           
            if(document.querySelector('input[name="isgstregistered"]:checked') == null){
            document.getElementById('isgstregisterederrorLabel').style.display = 'inline-block'
            continue
            }            
            listDup.shift()
            continue
           }
       
       let itemvalue = document.getElementById(item).value
       if (itemvalue == undefined || itemvalue == ""){
           if(item == 'gstin'){
            let isGST = document.querySelector('input[name="isgstregistered"]:checked')
            switch(isGST){
                case "1": document.getElementById('gstinerrorLabel').style.display = 'inline-block'
                let itemid = item + "errorLabel" 
                document.getElementById(itemid).style.display = 'inline-block'
                break;
                default : document.getElementById('gstinerrorLabel').style.display = 'none'
                listDup.shift()  
                break;
            }
           }
           let itemid = item + "errorLabel" 
           document.getElementById(itemid).style.display = 'inline-block'
          
       }
       else{
        listDup.shift()           
       }
    }
    
    if(listDup.length == 0){
    optionalList.forEach(function(optionalItem){
      switch(optionalItem){
          case "latitude" || "longitude":
              break;
        
        case "storeimage":

            break;

      }

    });
    return true;
}
else{
OpenMessageBar('Could not save.Please Enter the required fields')
return false;
}

}

const ValidateSellerInfo = () => {
    const list = ["firstname","lastname","primaryemail","primarymobile" ]
    let count = 0
    for(let i =0;i< list.length;i++){
        let item = list[i]      
        let itemvalue = document.getElementById(item).value
        let itemid = ""
      
        if (itemvalue == undefined || itemvalue == ""){
            switch(item){
             case "firstname":
             case "lastname":
                itemid = "nameerrorLabel" 
                document.getElementById(itemid).style.display = 'inline-block'  
                count = count+1             
                 break;
            default:
                itemid = item + "errorLabel" 
                document.getElementById(itemid).style.display = 'inline-block'
                count = count+1
                break;
            }        
           
           continue
        }
        else{
            continue
        }
        if(count === 0)
        return true
        else{
            OpenMessageBar('Could not save.Please Enter the required fields')
            return false;
            }
    }
}

function OpenMessageBar(text) {
    var bar = document.getElementById("messagebar");
    bar.className = "show";
    bar.innerText = text
    setTimeout(function(){ bar.className = bar.className.replace("show", ""); }, 3000);
  }

