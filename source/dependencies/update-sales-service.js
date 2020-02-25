function UpdateSales() {
    this.update = function (data) {
        return new Promise((resolve) => {
            let response = {};
            plugdo.collect('updateSales').get(data, function (data, err) {
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
mvc.dependencies.UpdateSales = new UpdateSales();