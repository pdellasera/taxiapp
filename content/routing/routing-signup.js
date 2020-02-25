$(document).ready(function () {
    view.load();

    if (window.location.hash.indexOf("/") != -1) {
        view.components.handler.sleep(500);
    }



    // SETING PAGE
    var page_registerEmailStep2 = {
        name: "email-signup-step2",
        page: "/secure/email-sign-up-step2.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                var input = document.querySelector("#phone-input");
                if (input) {
                    window.intlTelInput(input, {
                        autoPlaceholder: "aggressive",
                        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js"
                    });
                }
                view.load()
            })
        }
    }

    var page_registerEmailStep3 = {
        name: "email-sign-up-step3",
        page: "/secure/email-sign-up-step3.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                view.load()
            })
        }
    }


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
            page: "/secure/sign-up-email.html",
            postLoad: function () {
                view.load();
            }
        }
    });


    // ROUTING RESGISTRATION  
    routing.register(page_registerEmailStep2);
    routing.register(page_registerEmailStep3);
    routing.modal();

});
var app = new ShoperizApplication();
