"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var Auth = (function () {
    function Auth(secret, options) {
        this.options = {
            ignoreExpiration: false,
            ignoreNotBefore: false
        };
        if (!secret)
            throw Error('no secret provided');
        this.secret = secret;
        if (options)
            this.options = options;
    }
    Auth.prototype.verify = function (token) {
        var that = this;
        var t = false;
        var o = {
            ignoreExpiration: that.options.ignoreExpiration,
            ignoreNotBefore: that.options.ignoreNotBefore
        };
        try {
            t = jwt.verify(token, that.secret, o);
        }
        catch (err) {
            return false;
        }
        return t;
    };
    Auth.prototype.sign = function (object) {
        var that = this;
        if (that.options.ignoreExpiration) {
            jwt.sign(object, that.secret, { noTimestamp: true });
        }
        else {
            jwt.sign(object);
        }
    };
    return Auth;
}());
exports.Auth = Auth;
