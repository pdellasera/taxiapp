mvc.controller({
  name: "home",
  action: "index",
  path:"/"
}, function (req) {
  return {
      title: "Shoping Cart",
      location: global.config.location
  };
})


mvc.controller({
  name: "home",
  action: "sign-up-email",
  path:"/sign-up-email"
}, function (req) {
  return {
      title: "Signup Email",
      location: global.config.location
  };
})

mvc.controller({
  name: "home",
  action: "index-user",
  path:"/index-user"
}, function (req) {
  return {
      title: "Index User",
      location: global.config.location
  };
})