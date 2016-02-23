/*globals Buffer*/
"use strict";
const 
    forge = require('node-forge'), 
    fs = require('fs-extra'), 
    pki = forge.pki,
    getKeys = function(){
        let privkeypem = fs.readFileSync('sfmodcrypt_b.pem','utf8'),
            pubkeypem = fs.readFileSync('sfmodcrypt_a.pem','utf8');
        return {privkeypem: privkeypem, pubkeypem : pubkeypem};
    },
    sf_encryption = function () {
        const 
            keys = getKeys(),
            privateKey = pki.privateKeyFromPem(keys.privkeypem),
            publicKey = pki.publicKeyFromPem(keys.pubkeypem),
            encrypt = function (object) {
                let object_plain, 
                    output, outputbuffer, binary, nodebuffer;
                try {
                    object_plain = JSON.stringify(object);
                } catch (e) {
                    if (e) {
                        return 'ERROR: Object not transformable';
                    }
                }
                nodebuffer = new Buffer(object_plain);
                binary = nodebuffer.toString('binary');
                output = publicKey.encrypt(binary);
                outputbuffer = new Buffer(output,'binary');
                return outputbuffer.toString('hex');
            }, 
            decrypt = function (hex) {
                let object_buffer,
                    binary,
                    object;
                object_buffer = new Buffer(hex, 'hex');
                binary = object_buffer.toString('binary');
                object = privateKey.decrypt(binary);
                try {
                    object = JSON.parse(object);
                } catch (e) {
                    if (e) {
                        console.log(object);
                        throw 'ERROR: Object not transformable';
                    }
                }
                return object;
            };
        return {
        encrypt: encrypt,
        decrypt: decrypt
        };
    };
module.exports = sf_encryption();