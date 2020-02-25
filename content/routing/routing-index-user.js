$(document).ready(function () {
    view.load();

    if (window.location.hash.indexOf("/") != -1) {
        view.components.handler.sleep(500);
    }



    // SETING PAGE
    var page_profile = {
        name: "profile",
        page: "/secure/profile.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                console.log("d")
                $(".needHide").css("display", "none")
                view.load()
            })
        }
    }
    var page_payment = {
        name: "payment",
        page: "/secure/payment.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                console.log("d")
                $(".needHide").css("display", "none")
                view.load()
            })
        }
    }
    var page_paymentCreditCart = {
        name: "credit-cart",
        page: "/secure/credit-cart-payment.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                console.log("d")
                $(".needHide").css("display", "none")
                view.load()
            })
        }
    }
    // LOAD LAYOUT
    route.load({
        el: "#container",
        notFoundMessage: `<div class="row">
        <div class="col col-12 content text-center">
            <i class="fas fa-exclamation-circle not-found-icon"></i>
            <p>La página no fue encontrada!</p>
        </div>
      </div>`,
        defaultPage: {
            name: "user",
            page: "/secure/user-dashboard.html",
            postLoad: function () {
                view.load();
            }
        }
    });

    // ROUTING RESGISTRATION  
    routing.register(page_profile);
    routing.register(page_payment);
    routing.register(page_paymentCreditCart);
    routing.modal();

});
var app = new ShoperizApplication();
