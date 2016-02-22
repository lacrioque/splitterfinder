"use strict";
const 
    forge = require('node-forge'),
    fs = require('fs'),
    Q = require('q'),
    rsa = forge.pki.rsa,
    pki = forge.pki,
    checkKeys = function(){
        let def = Q.defer(),privkey,pubkey;
        try{
            privkey = fs.statSync('./sfmodcrypt_b.pem'),
            pubkey = fs.statSync('./sfmodcrypt_a.pem');
        } catch(e){
            def.reject( false );
            return def.promise;
        }
        if(privkey.isFile() && pubkey.isFile()){
            def.resolve( true );
        } else {
            def.reject( false );
        }
        return def.promise;
    },
    createKeyPair = function(){
        let def = Q.defer();
        console.log("Generating Keys");
        rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
            console.log(err);
            def.resolve(keypair);
        });
        return def.promise;
    },
    saveKeyPair = function(keypair){
        let def = Q.defer();
        console.log("Writing Keys");
        fs.writeFile("sfmodcrypt_a.pem", pki.publicKeyToPem(keypair.publicKey), 'utf8', function(err,bytes){
            fs.writeFile("sfmodcrypt_b.pem", pki.privateKeyToPem(keypair.privateKey), 'utf8', function(err,bytes){
                def.resolve();    
            })
        });
        return def.promise;
    },
    run = function(){
        let def = Q.defer();
        checkKeys().then(
            function(){def.resolve(true);}, 
            function(){
                createKeyPair().then(saveKeyPair).then(function(){
                        console.log("Key successfully written");
                        def.resolve(true);
                        });
            });
        return def.promise;
    };
        
module.exports = run();