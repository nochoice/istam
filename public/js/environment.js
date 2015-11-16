var uid = require("uid");

var environment = {
    set: function() {

        var env = {
            userId: uid(10),
            name: "Istam"
        }

        localStorage.setItem('env', JSON.stringify(env));
        return env;
    },

    get: function() {
        var env = localStorage.getItem('env');

        if(!env) {
            env = this.set();
        } else {
            env = JSON.parse(env);
        }

        return env;
    }
};

module.exports = environment;