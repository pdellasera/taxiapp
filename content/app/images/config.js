var imagesProfileRender = "";
var imagesIdRender = "";
var imagesP = [];
var nameimages = [];
var config = [{
  contentImput: "image-upload-input-wrap",
  idInput: "file-upload-input",
  contentUpload: "file-upload-content",
  viewImages: "file-upload-image",
  titleImages: "image-title",
  idErr: "errMessage",
  templateErr: "",
  nameForm: "imagesPrincipal",
  size: 1024 * 1024,
  validateSize: true,
  validateFormats: true,
  validateSpace: true,
  preview: true,
  useSweetAlert: true,
  useAlertify: false,
}];
var exist = new exisSessionUser();
var user = JSON.parse(exist.exist());
// console.log(user)
window.upload = new uploadImagesServer({
  Module: "upload-image",
  save: [{
    btn1: "saveImagesPerfil",
  }]
})

function uploadImages() {
  $('#modalImages').modal('show');
}

function validateUpload(input) {
  var imagesPofile = document.getElementById(config[0].idInput).files[0].name;
  imagesProfileRender = user.id + '_' + imagesPofile;
  global.obj.imagesName.splice(0, 1)
  global.obj.imagesName.push({
    name: user.id + "_" + imagesPofile
  })
  config.push({
    data: input
  });
  upload.registerDataForm(config);
}

function chooseAnotherImages() {
  upload.chooseAnother(config);
}

function uploadImagesServ() {
  upload.saveImages({
    url: '/upload?id=' + user.id
  });

  setTimeout(() => {
    if (imagesProfileRender != "" && imagesProfileRender != undefined) {
      var data = {
        "images": imagesProfileRender
      }
      view.setData("uploadImages", data);
      view.load();
    } else {
      $("#chamgeImages").hide();
    }
  }, 1000);

  $('#modalImages').modal('hide');
}

var imagesRender = "";
var imagesIdRender = "";
var imagesP = [];
var nameimages = [];
var config2 = [{
  contentImput: "image-upload-input-wrap2",
  idInput: "file-upload-input2",
  contentUpload: "file-upload-content2",
  viewImages: "file-upload-image2",
  titleImages: "image-title2",
  idErr: "errMessage",
  templateErr: "",
  nameForm: "images2",
  size: 1024 * 1024,
  validateSize: true,
  validateFormats: true,
  validateSpace: true,
  preview: true,
  useSweetAlert: true,
  useAlertify: false,
}];
var exist = new exisSessionUser();
var user = JSON.parse(exist.exist());
window.upload = new uploadImagesServer({
  Module: "upload-image",
  save: [{
    btn1: "saveImagesPerfil2",
  }]
})

function uploadImages() {
  $('#modalImages2').modal('show');
}

function validateUpload2(input) {
  var images2 = document.getElementById(config2[0].idInput).files[0].name;
  imagesRender = user.id + '_' + images2;
  global.obj.imagesName2.splice(0, 1)
  global.obj.imagesName2.push({
    name: user.id + "_" + images2
  })
  config2.push({
    data: input
  });
  upload.registerDataForm(config2);
}

function chooseAnotherImages2() {
  upload.chooseAnother(config2);
}

function uploadImagesServ2() {
  upload.saveImages({
    url: '/upload?id=' + user.id
  });

  setTimeout(() => {
    if (imagesRender != "" && imagesRender != undefined) {
      var data = {
        "images": imagesRender
      }
      view.setData("uploadImages2", data);
      view.load();
    } else {
      $("#chamgeImages2").hide();
    }
  }, 1000);

  $('#modalImages2').modal('hide');
}



var imagesRender = "";
var imagesIdRender = "";
var imagesP = [];
var nameimages = [];
var config3 = [{
  contentImput: "image-upload-input-wrap3",
  idInput: "file-upload-input3",
  contentUpload: "file-upload-content3",
  viewImages: "file-upload-image3",
  titleImages: "image-title3",
  idErr: "errMessage",
  templateErr: "",
  nameForm: "images3",
  size: 1024 * 1024,
  validateSize: true,
  validateFormats: true,
  validateSpace: true,
  preview: true,
  useSweetAlert: true,
  useAlertify: false,
}];
var exist = new exisSessionUser();
var user = JSON.parse(exist.exist());
window.upload = new uploadImagesServer({
  Module: "upload-image",
  save: [{
    btn1: "saveImagesPerfil3",
  }]
})

function uploadImages() {
  $('#modalImages3').modal('show');
}

function validateUpload3(input) {
  var images3 = document.getElementById(config3[0].idInput).files[0].name;
  imagesRender = user.id + '_' + images3
  global.obj.imagesName3.splice(0, 1)
  global.obj.imagesName3.push({
    name: user.id + "_" + images3
  })
  config3.push({
    data: input
  });
  upload.registerDataForm(config3);
}

function chooseAnotherImages3() {
  upload.chooseAnother(config3);
}

function uploadImagesServ3() {
  upload.saveImages({
    url: '/upload?id=' + user.id
  });

  setTimeout(() => {
    if (imagesRender != "" && imagesRender != undefined) {
      var data = {
        "images": imagesRender
      }
      view.setData("uploadImages3", data);
      view.load();
    } else {
      $("#chamgeImages3").hide();
    }
  }, 1000);

  $('#modalImages3').modal('hide');
}