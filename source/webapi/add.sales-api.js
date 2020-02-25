mvc.api({
    name: "add",
    action: "sales",
    methods: {
        post: methodGet
    }
}, "addSales", function (req, addSales, send) { send({ error: "method not allowed", errorCode: 404 }) });
async function methodGet(req, addSales, send) {
    var elem = req.body
    var result = await addSales.add(elem);
    //console.log(result);
    return result;
}


mvc.api({
    name: "add",
    action: "salesDetails",
    methods: {
        post: methodGet
    }
}, "addSalesDetails", function (req, addSalesDetails, send) { send({ error: "method not allowed", errorCode: 404 }) });
async function methodGet(req, addSalesDetails, send) {
    var elem = req.body
    var result = await addSalesDetails.addItems(elem);
    //console.log(result);
    return result;
}