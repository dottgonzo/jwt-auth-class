"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var jwtClass = require("../index");
var expect = chai.expect;
var testsecret = 'shh';
describe('main test for jwt simple class', function () {
    describe('main test base', function () {
        var auth;
        var token;
        before('initialize class', function () {
            auth = new jwtClass.Auth(testsecret);
        });
        it('sign', function () {
            token = auth.sign({ ss: 'rr' });
            console.log(token);
            expect(token).to.be.ok;
        });
        it('verify', function () {
            expect(auth.verify(token)).to.be.ok;
        });
    });
    describe('main test without timestamp', function () {
        var auth;
        var token;
        before('initialize class', function () {
            auth = new jwtClass.Auth(testsecret, { ignoreExpiration: true });
        });
        it('sign', function () {
            token = auth.sign({ ss: 'rr' });
            console.log(token);
            expect(token).to.be.ok;
        });
        it('verify', function () {
            expect(auth.verify(token)).to.be.ok;
        });
    });
});
