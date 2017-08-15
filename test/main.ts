import * as chai from "chai";

import * as jwtClass from '../index'
const expect = chai.expect

const testsecret = 'shh'

describe('main test for jwt simple class', function () {


    describe('main test base', function () {

        let auth
        let token

        before('initialize class', function () {
            auth = new jwtClass.Auth(testsecret)
        })


        it('sign', function () {
            token = auth.sign({ ss: 'rr' })
            expect(token).to.be.ok
        })
        it('verify', function () {
            expect(auth.verify(token)).to.be.ok
        })
    })


    describe('main test without timestamp', function () {

        let auth
        let token

        before('initialize class', function () {
            auth = new jwtClass.Auth(testsecret, { ignoreExpiration: true })
        })


        it('sign', function () {
            token = auth.sign({ ss: 'rr' })
            expect(token).to.be.ok
        })
        it('verify', function () {
            expect(auth.verify(token)).to.be.ok
        })
    })

})