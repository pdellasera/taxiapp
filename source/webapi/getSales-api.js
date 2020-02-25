mvc.api({
    name: "get",
    action: "startSales",
    methods: {
        post: methodGet
    }
}, "getStartSales", function (req, getStartSales, send) { send({ error: "method not allowed", errorCode: 404 }) });
async function methodGet(req, getStartSales, send) {
    var elem = req.body
    var result = await getStartSales.get(elem);
    
    //console.log(result);
    return result;
}