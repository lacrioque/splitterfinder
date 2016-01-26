/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services.validateJSONInputService', []).factory('$validateJSON', function () {
  var testParsing = function(text){},
      getProcess = function(options){
          var option = {
              test: options.test || "lean",
              validClasses: options.validClasses || "valid", 
              invalidClasses : options.invalidClasses || "invalid",
              returnErrors: options.returnErrors || true
          },
          returner = {
            classes: "",
            invalid: true,
            validate : function(text){
                var valid = checkErrors(text, option);
                if(valid === true){
                    this.invalid = false;
                    this.classes = option.validClasses;
                } else {
                    this.invalid = true;
                    this.classes = option.invalidClasses;
                }
            },
          };
          console.log(returner);
          return returner;
          
          
      },
      checkErrors = function(text, options){
          switch(options.test){
              default:
              case "lean": 
                try{
                        var obj = JSON.parse(text);
                        if(obj && typeof obj === "object" && obj !== null){
                            return true;
                        } else {
                            throw new Error();
                        }
                    } catch (e) {
                        return false 
                    } 
                break;
              case "strict":
                    try{
                        var obj = JSON.parse(text);
                        if(obj && typeof obj === "object" && obj !== null){
                            return true;
                        } else {
                            throw new Error("null or !object");
                        }
                    } catch (e) {
                        return e;
                    } 
                    
                break;
              case "strict_check":
              //kommt noch
                break;
               
          }
          return true;
      },
      findErrors = function(text, options){
          //kommt noch
      };
      
      return {
          getProcess : getProcess,
          testParsing : testParsing,
          checkErrors : checkErrors,
          findErrors : findErrors
      }
});
//