$(document).ready(function () {
  view.load();

  if (window.location.hash.indexOf("/") != -1) {
    view.components.handler.sleep(500);
  }



// SETING PAGE




  // LOAD LAYOUT
  route.load({
    el: "#container",
    elModal: '#plugdo-modal-content',
    notFoundMessage: `<div class="row">
    <div class="col col-12 content text-center">
        <i class="fas fa-exclamation-circle not-found-icon"></i>
        <p>La página no fue encontrada!</p>
    </div>
  </div>`,
    defaultPage: {
      name: "user",
      page: "/secure/cart.html",
      postLoad: function () {
        view.load();
      }
    }
  });

 
  // ROUTING RESGISTRATION  
  routing.modal();

});
var app = new ShoperizApplication();
