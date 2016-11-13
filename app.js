//Import necessary modules/packages
var firebase = require('firebase')
var QuickBooks = require('./index.js')

//Initialize Firebase setup
var config = {
    apiKey: "AIzaSyDPxlOBoWx4zoCZw3rGJIvSLV9sZo319xc",
    authDomain: "ibizverify-281fa.firebaseapp.com",
    databaseURL: "https://ibizverify-281fa.firebaseio.com",
    storageBucket: "ibizverify-281fa.appspot.com",
    messagingSenderId: "1053957078638"
}
firebase.initializeApp(config);

//Initialize Firebase database
var database = firebase.database()

//Initialize QuickBooks Authentication and setup
var consumerKey = 'qyprdWu29kVB9JANVub3vielVgOdMR',
    consumerSecret = '6mUSGAnm5VuWO2WnAr1SmbIelrNJ7zL03OkU7CpA',
    oauthToken = 'qyprdLucvH15kDqwYIjSNNXBilEn0CQbrQy8DEElFrVP1hZ1',
    oauthTokenSecret = 'l7yfnWtkyhEJP1lnmp3z7I83u3AL3EL8CTxvrxxH',
    realmId = '123145725595674'

var qbo = new QuickBooks(consumerKey,
    consumerSecret,
    oauthToken,
    oauthTokenSecret,
    realmId,
    true,
    true);


// var submit = document.getElementById('submit')

//Find employees from Sandbox Company and upload to Firebase
// var employeeList;
// qbo.findEmployees({
//         fetchAll: true
//     }, function(e, employees) {
//        employeeList = employees.QueryResponse.Employee;
//         var selectedUser;
//         console.log(employeeList)
//         var i = employeeList.length;
//         while (i--) {
//             if (employeeName == employeeList[i].DisplayName) {
//                 selectedUser = employeeList[i]
//                 alert(selectedUser)
//                 break;
//             } else {
//                 console.log("Error: user not found in database!")
//                 alert(error)
//             }
//         }
//     })

var companyName = "Weiskopf Consulting"
//Find customers from Sandbox Company and upload to Firebase
var customerList;
var BillingAddress;
// var companyName = document.getElementById('name')
qbo.findCustomers({
    fetchAll: true
}, function(e, customers) {
    customerList = customers.QueryResponse.Customer;
    var selectedUser;
    var i = customerList.length;
    while(i--) {
      if(companyName == customerList[i].CompanyName) {
      selectedUser = customerList[i]
      console.log("Success: customer found in database!")
      break;
    } else {
        console.log("Error: customer not found in database!")
      }
    }
    BillingAddress = selectedUser.BillAddr
})

// //Upload customerList to Firebase database
// function uploadCustomerList() {
//     database()
//       .ref('rn-firebase-upload')
//       .child('employees')
//       .put(employeeList, { contentType : 'application/json' })
//       .catch(err => console.error(err));
// }
// });
// });
