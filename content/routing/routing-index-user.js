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
                closeMenuInLoadPage()
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
                closeMenuInLoadPage()
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
    var page_addNewCart = {
        name: "add-new-cart",
        page: "/secure/add-new-cart.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                console.log("d")
                $(".needHide").css("display", "none")
                view.load()
            })
        }
    }
    var page_historial = {
        name: "historial",
        page: "/secure/historial.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                $(".needHide").css("display", "none")
                view.load()
                closeMenuInLoadPage()
            })
        }
    }
    var page_tripDetails = {
        name: "trip-details",
        page: "/secure/trip-description.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                $(".needHide").css("display", "none")
                view.load()
            })
        }
    }
    var page_onlinesupport = {
        name: "online-support",
        page: "/secure/online-support.html",
        classInParent: true,
        postLoad: function () {
            $(document).ready(function () {
                $(".needHide").css("display", "none")
                view.load()
                closeMenuInLoadPage()
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
    routing.register(page_addNewCart);
    routing.register(page_historial);
    routing.register(page_tripDetails);
    routing.register( page_onlinesupport);
    routing.modal();

});
var app = new ShoperizApplication();
