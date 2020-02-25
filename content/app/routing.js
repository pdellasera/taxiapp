function PlugdoRouting (config) {
  var self = this;

  if(config === undefined) {
      console.log("Plugdo Routing requires a configuration");
      return;
  }

  if(config.el === undefined) {
      console.log("The element ID of the container is not defined in the configuration");
      return;
  }

  this.config = config;
  this.pages = {};

  this.currentPage = "";
  this.currentModal = "";

  window.onhashchange = function () {
      routing.initalLoad = false;
      var pageName = window.location.hash.replace("#", "");

      if(pageName.indexOf("/") != -1) {
          var pages = pageName.split("/");
          routing.currentModal = pageName + "";
          pageName = pages[0];
      }
      else {
          routing.currentModal = "";
      }

      if(routing.currentPage !== pageName) {
          routing.currentPage = pageName;
          routing.loadHtmlContent();

          if(routing.config.classSelected !== undefined) {
              $("." + routing.config.classSelected).removeClass(routing.config.classSelected);
          }

          routing.applySelectedClass();
      }

      if(routing.currentModal !== "") {
          if(routing.config.elModal === undefined) {
              console.log("The element ID of the modal container is not defined in the configuration");
              return;
          }

          routing.loadHtmlContent(routing.currentModal, false);
      }
  }

  this.loadHtmlContent = function (pageParam, isElParam) {
      var pageName = this.currentPage;
      var isEl = true;

      if(pageParam !== undefined) 
      {
          pageName = pageParam;
      }

      if(isElParam !== undefined) {
          isEl = isElParam;
      }

      var page = this.pages[pageName];

      if(page !== undefined) {
          plugdo.request.get(page.page, "", function (data) {
              var htmlData = data;

              if(isEl) {
                  $(routing.config.el).empty();
                  $(routing.config.el).append(data);
              }
              else {
                  $(routing.config.elModal).empty();
                  $(routing.config.elModal).append(data);

                  if(page.postLoad !== undefined) {
                      if(typeof page.postLoad === 'function') {
                          page.postLoad();
                      }
                  }
              }
          }, function (err) {
              if(routing.config.notFoundMessage) {
                  if(!routing.config.notFoundMessage) {
                      routing.config.notFoundMessage = "404 - Page not found!";
                  }

                  if(isEl) {
                      $(routing.config.el).empty();
                      $(routing.config.el).append(routing.config.notFoundMessage);
                  }
                  else {
                      $(routing.config.elModal).empty();
                      $(routing.config.elModal).append(routing.config.notFoundMessage);
                  }
              }
          });
      }
  }

  this.applySelectedClass = function () {
      var finder = 'a[href^="/#{{name}}"]';
      finder = finder.replace("{{name}}", this.currentPage);

      var link = $(finder);

      if(link.length > 0) {
          var page = this.pages[this.currentPage];
          if(page.classInParent) {
              var parent = link[0].parentNode;
              $(parent).addClass(this.config.classSelected);
          }
          else {
              $(link[0]).addClass(this.config.classSelected);
          }
      }
  }

  this.register = function (page) {
      this.pages[page.name] = page;

      if(this.currentPage == page.name) {
          this.applySelectedClass();
          this.loadHtmlContent();
      }
  }

  this.modal = function () {
      if(this.currentModal !== "") {
          if(this.config.elModal === undefined) {
              console.log("The element ID of the modal container is not defined in the configuration");
              return;
          }

          this.loadHtmlContent(this.currentModal, false);
      }
  }

  this.initialize = function () {
      var pageName = window.location.hash.replace("#", "");

      if(pageName.indexOf("/") != -1) {
          var pages = pageName.split("/");
          this.currentModal = pageName + "";
          pageName = pages[0];
      }

      this.currentPage = pageName;
  }

  this.initialize();
}

