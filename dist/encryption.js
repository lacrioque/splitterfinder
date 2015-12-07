var key_string = 'Spl1tterfind3r4Life', forge = require('node-forge'), fs = require('fs-extra'), salt = forge.random.getBytesSync(128), key = forge.pkcs5.pbkdf2(key_string, salt, 5, 16), sf_encryption = function () {
    var encrypt = function (object) {
        var object_plain, iv = forge.random.getBytesSync(8), cipher = forge.cipher.createCipher('AES-ECB', key), output, buffer;
        try {
          object_plain = JSON.stringify(object);
        } catch (e) {
          if (e) {
            return 'ERROR: Object not transformable';
          }
        }
        cipher.start({ iv: iv });
        buffer = forge.util.createBuffer(object_plain, 'utf8');
        cipher.update(buffer);
        cipher.finish();
        output = cipher.output.toHex();
        return output;
      }, decrypt = function (object_hex) {
        var object_string, object_bytes, object_buffer, object, iv = forge.random.getBytesSync(8), decipher = forge.cipher.createDecipher('AES-ECB', key);
        object_bytes = forge.util.hexToBytes(object_hex);
        object_buffer = forge.util.createBuffer(object_bytes);
        decipher.start({ iv: iv });
        decipher.update(object_buffer);
        decipher.finish();
        object_string = decipher.output.toString();
        try {
          object = JSON.parse(object_string);
        } catch (e) {
          if (e) {
            return 'ERROR: Object not transformable';
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