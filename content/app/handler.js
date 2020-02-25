function SalesItemHandler() {
  this.init = function () {
    var session = {
      sessionID: "abcdfg12345"
    }
    request.post(global.api.getStartSalesData, session, function (res) {
      var saleItem = {
        "css": "no",
        "items": []
      }
      var elem = res.response.result.Database[0].Table.Row[0]
      if (elem <= 0) {
        var elem = '<div class="cart-section-empty text-center">' +
          '<img src="https://img.icons8.com/material-two-tone/100/000000/clear-shopping-cart.png">' +
          '<h1 class="title-empty">Your Bag is Empty</h1>' +
          '<p class="title-paragraph">' +
          'Ve a productos y agrega unos cuantos?<br>' +
          '</p>' +
          '</div>'
        $("#salesContainer").html(elem)
      } else {
        //console.log(elem)
        var obj = {
          "month": "Jan",
          "day": "31",
          "name": "Lebron James",
          "short": "Teacher Lakers 69",
          "price": "78.99",
          "style": "#fff",
          "status": "",
          "statusColor": "",
          "link": "",
          "salesID": ""
        }
        var cs = 0
        $.each(elem, function (s, v) {
          obj.month = v.month
          obj.day = v.day
          obj.name = v.name
          obj.short = v.short
          obj.price = v.price;
          obj.status = v.status == "P" ? "<i class='fas fa-lock-open'></i>" : "<i class='fas fa-lock'></i>"
          obj.statusColor = v.status == "P" ? "text-danger" : "text-secondary"
          obj.link = v.status == "P" ? "/#sales/item" : "/#sales"
          obj.salesID = v.status == "P" ? v.salesID : ""
          if (cs == 1) {
            obj.style = "#fff"
          } else {
            obj.style = "#E7ECE3"
          }

          saleItem.items.push(obj)
          obj = {}
          if (cs == 0) {
            cs = 1
          } else {
            cs = 0
          }
        })
        cookie.set("salesItem", JSON.stringify(elem), 1);
        // console.log(saleItem)
        view.setInitialData("plugdo-sales", "salesItems", saleItem);
        view.load();
      }

    })

  }

}


function ShoperizApplication() {
  this.modalPostLoad = function () {
    $("#plugdo-modal-component").show();
  }
}


function shopingHandler() {
  this.init = function () {
    $("#plugdo-modal-component").hide();
    var cartID = window.location.hash;
    cartID = cartID.substring(cartID.indexOf("?") + 1)
    if (cartID == "") {
      var elem = '<div class="cart-section-empty text-center mt-3">' +
        '<img src="https://img.icons8.com/cotton/64/000000/laptop-error.png">' +
        '<h2 class="title-empty">Lo sentimos este URL no es valido</h2>' +
        '</div>'
      $("#cartContainer").html(elem)
    } else {
      var json = {
        "name": "Luis Castrejon",
        "email": "lcastrejon@gmail.com",
        "phone": "6665-9899",
        "cartID": (Math.random() * 99999).toString(36).replace(".", "0"),
        "createDate": "02/06/2020",
        "items": [{
          "productName": "Papitas Lay",
          "description": "Las mas ricas del mundo",
          "productID": "P-9854",
          "qty": 2,
          "price": "25.56",
          "total": "45.12",
          "img": "data:image/jpeg;base64,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"
        }, {
          "productName": "Coca Cola ",
          "description": "1Lt para que compartas",
          "productID": "P-3236",
          "qty": 2,
          "price": "1.50",
          "total": "3.00",
          "img": "https://www.distribuidorabebidas.com.uy/wp-content/uploads/sites/31/2018/01/funda_coca_cola_225_litros.jpg"
        }]
      }
      var data = {
        "css": "col-12",
        "totalItems": 0,
        "subTotal": 0,
        "totalAmount": 0,
        "itbm": 0,
        "discount": "0.00",
        "shopingCode": "",
        "items": []
      }

      var noProcess = 0
      if (noProcess == 0) {
        console.log("2")
        data.items = json.items
        data.shopingCode = json.cartID
        data.totalItems = json.items.length
        var sub = 0
        $.each(json.items, function (s, v) {
          sub = sub + parseFloat(v.total)
        })
        data.subTotal = sub
        data.itbm = parseFloat((sub * 7 / 100).toFixed(2))
        if (json.discount === undefined) {
          data.discount = "0.00"
        }

        data.totalAmount = parseFloat((data.subTotal + data.itbm).toFixed(2));
        var it = JSON.stringify(data);
        // cookie.set("userName", userName, 1);
        cookie.set('cartItems', it,1);

        view.setInitialData("plugdo-items-cart", "itemsCart", data)
        view.load();
      } else {
        $("html,body").css("background-color", "#ffff")
        $(".color-title").addClass("d-none")
        var elem = '<div class="cart-section-empty text-center mt-4">' +
          '<img src="https://img.icons8.com/dotty/80/000000/broken-link.png">' +
          '<h1 class="title-empty">URL expirado</h1>' +
          '</div>'
        $("#cartContainer").html(elem)
      }

    }


  }
  this.deleteItem = function (id) {
    var elem = cookie.get("tmpCart");

  }
}