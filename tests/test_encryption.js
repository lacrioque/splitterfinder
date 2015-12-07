var encrypt_me = require ("../src/modules/encryption.js");
var encrypt_you = require ("../src/modules/encryption.js");

console.log("testing Encryption");
console.log("Encrypted Object:");

var object = {
	aname : "Testname",
	asurname: "TestSruname",
	somdata : "somedata",
	challenging: "Something not soe!äöüß§$&§e<y"
};

console.log(object);

var encrypted = encrypt_me.encrypt(object);

console.log("encrypted: ");
console.log(encrypted);

var decrypted = encrypt_you.decrypt(encrypted);

console.log("decrypted: ");
console.log(decrypted);