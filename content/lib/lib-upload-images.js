function uploadImagesServer(config) {
  if (config.Module != "upload-image") {
    throw "this Module is not Fount in the configuration";
  } else {
    var btn = config.save[0];
    hidebtnSave(btn)
    var self = this;
    var configFile = "";
    var ObjectMultipleImages = []
  }

  function hidebtnSave(btn) {
    for (const btnP of Object.keys(btn)) {
      if (document.getElementById(btn[btnP]) != null) {
        document.getElementById(btn[btnP]).style.display = "none";
      }
    }
  }

  function showbtnSave(btn) {
    for (const i of Object.keys(btn)) {
      if (document.getElementById(btn[i]) != null) {
        document.getElementById(btn[i]).style.display = "block";
      }
    }
  }
  
  self.registerDataForm = function (configImages) {
    showbtnSave(btn)
    configFile = configImages[1];
    config = configImages[0];
    if (configImages.length != 0) {
      /* CALL  OPTIONS VALIDATION */
      func_validateSize();
      func_validateFormats();
      func_validateSpace();
      func_validatePreviewImages();
    } else {
      throw "Object 'config' is Empty";
    }
    /* OPTIONS VALIDATION */

    function func_validateSize() {
      if (config.validateSize != false) {
        ValidateSizeImages()
      }
    }

    function func_validateFormats() {
      if (config.validateFormats != false) {
        validateFormatImages();
      }
    }

    function func_validateSpace() {
      if (config.validateSpace != undefined) {
        if (config.validateSpace != false) {
          if (config.previewMultiple != true) {

            if (configFile.data.files.length != 0) {
              var nameImage = configFile.data.files[0].name;
              if (nameImage.indexOf(" ") === -1) { } else {
                var err = {
                  title: "Error",
                  text: "El nombre de la imagen no debe contener espacios",
                  icon: "error"
                }
                msgErr(err)
              }
            } else {
              throw new TypeError("The images could not be processed")
            }
          } else {
            throw new TypeError("la propiedad de validacion de espacios   no esta disponible para Multiples imagenes ")
          }
        }
      }
    }

    function func_validatePreviewImages() {
      if (config.preview != false) {
        renderImagesOnlyOne()
      }
    }

    /* ······END OPTIONS VALIDATION······ */

    function ValidateSizeImages() {
      if (configFile.data.files[0].size > config.size) {
        var errorObj = {
          title: "Error",
          text: "Imagen excede el limite autorizado",
          icon: "error"
        }
        msgErr(errorObj);
      }
    }

    function validateFormatImages() {
      if (config.idInput != "") {
        var fileInput = document.getElementById(config.idInput);
        var filePath = fileInput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (!allowedExtensions.exec(filePath)) {
          var errorObj = {
            title: "Error",
            text: "Solo se aceptan formatos .jpeg/.jpg/.png",
            icon: "error"
          }
          msgErr(errorObj);
        }
      } else {
        throw "The id of input in not defined in the configuration"
      }
    }

    function renderImagesOnlyOne() {
      if (config.contentImput === undefined) {
        throw new TypeError(`id of input is undefined in configuration`)
      }
      if (config.viewImages === undefined) {
        throw new TypeError(`Container of view images is undefined in the  configuration`)
      }

      if (config.contentUpload === undefined) {
        throw new TypeError(`Container of Upload images is undefined in the  configuration`)
      }

      if (config.titleImages === undefined) {
        throw new TypeError(`Container of title images is undefined in the configuration`)
      }
      if (config.contentImput && config.viewImages && config.contentUpload && config.titleImages != "") {
        renderI()
      } else {
        throw new TypeError(`the image cannot be displayed because some properties are not defined`)
      }

      function renderI() {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById(config.contentImput).style.display = "none";
          document.getElementById(config.viewImages).src = `${e.target.result}`;
          document.getElementById(config.contentUpload).style.display = "block";
          if (configFile.data.files.length != 0) {
            document.getElementById(config.titleImages).innerHTML = configFile.data.files[0].name;
          }
        };
        if (configFile.data.files.length > 0) {
          reader.readAsDataURL(configFile.data.files[0]);
        } else {
          throw new TypeError(`the image could not be rendered`)
        }

      }
    }

    /* ······FUNCTION GLOBAL ERROR ······ */
    function msgErr(msn) {
      if (config.useSweetAlert === true) {
        swal({
          title: msn.title,
          text: msn.text,
          icon: msn.icon,
        })
        responseImages()
      } else {
        if (config.useAlertify === true) {
          alertify.set('notifier', 'position', 'top-right');
          if (msn.icon != "success") {
            alertify.error(msn.text);
          } else {
            alertify.success(msn.text);
          }
          responseImages()
        } else {
          if (config.templateErr != "" && config.idErr != "") {
            document.getElementById(config.idErr).innerHTML = msn.text;
            setTimeout(() => {
              document.getElementById(config.idErr).innerHTML = "";
            }, 2000);
            responseImages()
          } else {
            throw "The propertys of 'error'   is empty in the configuration"
          }
        }
      }
    }
    /* ······END FUNCTION GLOBAL ERROR ······ */

    function responseImages() {
      for (let index = 0; index < document.forms.length; index++) {
        if (document.forms[index].id != undefined) {
          if (document.forms[index].id === configFile.data.form.id) {
            document.forms[index].reset();
            if (config.preview != false) {
              document.getElementById(config.contentImput).style.display = "block";
              document.getElementById(config.contentUpload).style.display = "none";
            } else { }
          }
        }
      }
    }

    self.chooseAnother = function (configDelete) {
      configFile = configDelete[1];
      config = configDelete[0];
      for (let index = 0; index < document.forms.length; index++) {
        if (document.forms[index].id != undefined) {
          if (document.forms[index].id === configFile.data.form.id) {
            document.forms[index].reset();
            configDelete.splice(1, 1);
            hidebtnSave(btn)
            document.getElementById(config.contentImput).style.display = "block";
            document.getElementById(config.contentUpload).style.display = "none";
          }
        }
      }
    }

    self.MultipleImages = function (idResult) {
      if (idResult.active != false) {
        ObjectMultipleImages.push(idResult)
        if (window.File && window.FileList && window.FileReader) {
          var files = event.target.files;
          var output = document.getElementById(idResult.result);
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match('image')) continue;
            var picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
              var picFile = event.target;
              var div = document.createElement("div");
              div.className = `${idResult.class}`;
              div.innerHTML = `<img id="images-${i}" class="img-thumbnail" src="${picFile.result}"  title="${picFile.name}" />`;
              output.insertBefore(div, null);
            });
            picReader.readAsDataURL(file);
          }
        } else {
          throw new TypeError("Your browser does not support File API")
        }
      }
    }

    self.saveImages = function (link) {
      var URL = link.url;
      var formData = new FormData(document.getElementById(config.nameForm));
      // console.log(formData)
      formData.append("dato", "valor");
      if (URL != "") {
        saveImagesServer(URL, formData)
      } else {
        var Errobject = {
          title: "Error",
          text: "Por favor coloque una Url de  Api a cual se enviaran los datos.",
          icon: "error"
        }
        msgErr(Errobject)
      }
      function saveImagesServer(URL, formData) {
        var request = new XMLHttpRequest();
        request.responseType = 'json';
        request.open('post', URL);
        request.send(formData);
        if (request.status != 500 ) {
         return {   
           success:true
         }
        } else {
          return {   
            success:false
          }
        }
      }
    }
  }
}

/* DELETE FILE IN THE SERVER   */
function deleteFileInServer(config) {
  var self = this;
  var component = config.Module;
  if (config.Module != undefined) {
    if (config.msgErrActive != undefined) {
      if (config.useAlertify != undefined) {
        if (config.useSweetAlert != undefined) {
          if (config.useConsole != undefined) {
            if (component != 'delete-image') {
              throw new TypeError("Module is not register in the configuration")
            } else {
              self.deleteImages = function (params) {
                // console.log(params)
                var dataDelete = params
                if (dataDelete.name != "" && dataDelete.name != undefined) {
                  del()
                } else {
                  throw "Name File is undefined"
                }

                function del() {
                  var request = new XMLHttpRequest();
                  request.open("POST", dataDelete.Url, true);
                  request.setRequestHeader('Content-Type', 'application/json');
                  request.send(JSON.stringify({
                    name: dataDelete.name
                  }));
                  if (request.readyState === 1) {
                    var successObj = {
                      title: "Excelente",
                      text: "Archivo eliminado correctamente",
                      icon: "success"
                    }
                    msgErr(successObj)
                  } else {
                    var errorObj = {
                      title: "error",
                      text: "El rchivo no fue  eliminado ",
                      icon: "error"
                    }
                    msgErr(errorObj)
                  }
                }

                function msgErr(msn) {
                  if (config.useSweetAlert === true) {
                    swal({
                      title: msn.title,
                      text: msn.text,
                      icon: msn.icon,
                    })
                  } else {
                    if (config.useAlertify === true) {
                      alertify.set('notifier', 'position', 'top-right');
                      if (msn.icon != "success") {
                        alertify.error(msn.text);
                      } else {
                        alertify.success(msn.text);
                      }
                    } else {
                      if (config.useConsole === true) {
                        console.log(msn)
                      }
                    }
                  }
                }
              }
            }
          } else {
            throw new TypeError("The property useConsole in not defined")
          }
        } else {
          throw new TypeError("The property SweetAlert in not defined")
        }
      } else {
        throw new TypeError("The property useAlertify in not defined")
      }
    } else {
      throw new TypeError("the  property  msgErrActive is  not  defined")
    }
  } else {
    throw new TypeError("the  property  Module is  not  defined")
  }
}