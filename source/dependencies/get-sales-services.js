function getStartSales() {
    this.get = function (data) {
        return new Promise((resolve) => {
            let response = {};
            plugdo.collect('getStartSalesData').get(data, function (data, err) {
                if (err) {
                    resolve(err);
                } else {
                    //console.log(data.Database[0].Table)
                    response.result = data
                    resolve(response);
                }
            })
        })
    }
}
mvc.dependencies.getStartSales = new getStartSales();