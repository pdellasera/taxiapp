function Languages () {
    var self = this;
    this.languages = { 
        default: "en",
        actives: {
            "en": {},
            "es": {}
        }
    };

    this.load = function () {
        Object.getOwnPropertyNames(this.languages.actives).forEach(function(name, idx, array) {
            self.languages.actives[name] = require("./" + name).get();
        });
    };

    this.get = function (language) {
        console.log(this.languages.actives);
        if(this.languages.actives[language] === undefined) {
            return this.languages.actives[this.languages.default];
        }

        return this.languages.actives[language];
    }
}

exports.get = function () {
    var lang = new Languages();
    lang.load();

    return lang;
}