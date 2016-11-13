/**
 * Returns validated address in XML or JSON format
 * @param responseType
 * @param token
 * @param request body
 */
var accessToken;

function getToken() {
    // var key = 'IiVWAv686H6hyZHALo7VnQzUAH5MD4Il';
    // var secret = 'SwoxcpKjzlt7DUAG';
    // var tok = key + ':' + secret;
    // var hash = window.btoa(tok);
    var hash = 'SWlWV0F2Njg2SDZoeVpIQUxvN1ZuUXpVQUg1TUQ0SWw6U3dveGNwS2p6bHQ3RFVBRw==';
    var BasicToken = "Basic " + hash;
    $.ajax({
        type: "POST",
        url: "https://api.pitneybowes.com/oauth/token",
        headers: {
            "Authorization": BasicToken
        },
        dataType: 'json',
        async: true,
        data: 'grant_type=client_credentials',
        success: function(data) {
            alert(JSON.stringify(data));
            accessToken = JSON.stringify(data.access_token)
            console.log(accessToken)
        },
        error: function(data) {
            alert(JSON.stringify(data));
        }
    });
    return accessToken;
}


// function validateMailingAddressAsync(){
//   var IA = new IDENTIFYAPIS.identifyAddress('<access token>');
//   //enter the returned access token as explained in Obtaining Credentials section
//   IA.validateMailingAddress('{ "options": { "OutputCasing":"M" }, "Input": { "Row": [ { "AddressLine1": "1 Global View", "AddressLine2": "", "City": "Troy", "Country": "us", "StateProvince": "NY", "PostalCode": "","FirmName":"Pitney Bowes Software", "user_fields":[{"name":"name1","value":"value1"},{"name":"name2","value":"value2"}] } ] } }', 'validateMailingAddressCallback');
// }
// function validateMailingAddressCallback(data){
//   if(data !== undefined){
//     $('#AsyncResponseDiv').html(JSON.stringify(data));
//   }
// }
// function validateMailingAddressRest(responseType, token, postData, callback) {
//     var contentType;
//     var accept;
//     var url;
//     var auth = 'Bearer ' + token;
//     if (responseType == 'JSON') {
//         contentType = 'application/json';
//         accept = 'application/json';
//         url = 'https://api.pitneybowes.com/identify/identifyaddress/v1/rest/validatemailingaddress/results.json';
//     } else if (responseType == 'XML') {
//         contentType = 'application/xml';
//         accept = 'application/xml';
//         url = 'https://api.pitneybowes.com/identify/identifyaddress/v1/rest/validatemailingaddress/results.xml';
//     }
//     var request = $.ajax({
//         url: url,
//         type: 'POST',
//         data: postData,
//         async: true,
//         headers: {
//             'Content-type': contentType,
//             'Accept': accept,
//             'Authorization': auth
//         }
//     }).done(function(responseData, status, xhr) {
//         response = xhr.responseText;
//         var callbacks = eval(callback);
//         if (callbacks !== undefined && callbacks !== null) {
//             callbacks(response);
//         } else {
//             alert('Callback are not available.');
//         }
//     }).fail(function(xhr, status, err) {
//         response = xhr.responseText;
//         var callbacks = eval(callback);
//         if (callbacks !== undefined && callbacks !== null) {
//             callbacks(response);
//         } else {
//             alert('Callback are not available.');
//         }
//     });
// };
