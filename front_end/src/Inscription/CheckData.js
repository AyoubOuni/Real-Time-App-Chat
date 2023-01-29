
function Checknom(nom) {
    var er = /\w{2,}/ ;
return er.test(nom);
}
function Checkemail(email) {
    var er = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return er.test(email);
}
function Checkpassword(password) {
    var er = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
return er.test(password);
}
function CheckNumerotel(tel) {
    var er = /^\d{8}$/;
return er.test(tel);
}


export {Checknom,Checkemail,Checkpassword,CheckNumerotel};
