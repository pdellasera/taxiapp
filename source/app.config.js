
const setting = {
  dev: {
    db: {
      user: "root",
      password: "",
      host: "localhost",
      database: "module_ventas"
    }
  },
  prod: {
    db: {
      user: "fitwave",
      password: "fitwaveplugdo2020",
      host: "fitwave-dev.czisjst5vn7k.us-east-2.rds.amazonaws.com",
      database: "fitwave"
    }
  }, security: {
    rateLimit: {
      active: true,
      period: 1,
      limit: 1500
    }

  }, header: {
    active: true
  },
  origin: {
    active: true,
    domains: []
  }
}

exports.settings = function () {
  return setting;
};



// const setting = {
//     dev: {
//       db: {
//         user: "root",
//         password: "",
//         host: "localhost",
//         database: "module_venta"
//       }
//     },
//     // prod: {
//     //   db: {
//     //     user: "guialook",
//     //     password: "guialookplugdo2019",
//     //     host: "guialook.cpjwenmlj3sr.us-west-2.rds.amazonaws.com",
//     //     database: "guialook"
//     //   },
//       security: {
//         rateLimit: {
//           active: true,
//           period: 1,
//           limit: 1500
//         },
//         header: {
//           active: true
//         },
//         origin: {
//           active: true,
//           domains: []
//         }
//       }
//     }
//   }

//   exports.settings = function () {
//     return setting;
//   };