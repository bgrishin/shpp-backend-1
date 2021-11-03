const emails = ["fi@secondpart.end","first-part@.se=cond%p.art.end","first.part@se=cond%part.r","f@secondart.end,","first-part@.se=cond@part.end","-firstpart@.se=cond%.enddeded","firs_tpart@.se.en","firstpart@.se.enddeded"];
const passwords = ["C00l_Pass","SupperPas1","Cool_pass","C00l"];
const phones = ["+38 (099) 567 8901","+38 099 5 6 7 8 9 01","(09-9) 567-890-1","--  (099) 567 890-1","+38 (099) 567 8901 0","+38 099 a0000000","+38 (0989) 567 8901","+48 (0989) 567 8901"];

//Validator
const Validator = {
  validatePhone: function (phone) {
    const regexp = /^(\+\d{1,2}[\s-]?|[\s-]{0,4})?\(?(\d[\s-)]{0,2}){3}(\d[\s-]?){7}$/g;
    return regexp.test(phone);
  },
  validatePassword: function (password) {
    const regexp = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/;
    return regexp.test(password);
  },
  validateEmail: function (email) {
    const regexp = /^[^\s\d\.-]([a-zA-Z\-\.\+\d]{1,20})@([a-zA-Z\d\.\!\$\%\&\’\*\+\/\=\?\^\_\-]{1,15})\.([a-zA-Z]{1,5})$/g;
    return regexp.test(email);
  }
}

//Tests

//EMAIL
for(let i = 0; i < emails.length; i++) {
  if(!Validator.validateEmail(emails[i])) {
    console.log(`Email - ${emails[i]} is not valid.`)
  }else{
    console.log(`Email - ${emails[i]} is valid!`)
  }
}
console.log("");

//PHONE

for(i = 0; i < phones.length; i++) {
  if(!Validator.validatePhone(phones[i])) {
    console.log(`Phone - ${phones[i]} is not valid.`);
  }else{
    console.log(`Phone - ${phones[i]} is valid!`);
  }
}
console.log("");

//PASSWORD

for(i = 0; i < passwords.length; i++) {
  if(!Validator.validatePassword(passwords[i])) {
    console.log(`Password - ${passwords[i]} is not valid.`);
  }else{
    console.log(`Password - ${passwords[i]} is valid!`);
  }
}
console.log("");
