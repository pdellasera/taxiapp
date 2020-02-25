function addSales() {
    this.add = function (data) {
        return new Promise((resolve) => {
            let response = {};
            plugdo.collect('addSales').get(data, function (data, err) {
                if (err) {
                    resolve(err);
                } else {
                    //console.log(JSON.parse(JSON.stringify(data.Database[0].Table.Row[0])))
                    response.result = JSON.parse(JSON.stringify(data.Database[0].Table.Row[0]))
                    //console.log(response.result[0].isUpdate)
                    resolve(response.result[0]);
                }
            })
        })
    }
}
mvc.dependencies.addSales = new addSales();