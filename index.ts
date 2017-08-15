import * as jwt from "jsonwebtoken"

export interface IJwtAuthOptions {
    ignoreExpiration: boolean
    ignoreNotBefore: boolean
}
export class Auth {
    secret: string
    options: IJwtAuthOptions = {
        ignoreExpiration: false,
        ignoreNotBefore: false
    }
    constructor(secret, options?: IJwtAuthOptions) {
        if (!secret) throw Error('no secret provided')
        this.secret = secret
        if (options) this.options = options
    }
    verify(token): any {
        const that = this
        let t = false
        const o = {
            ignoreExpiration: that.options.ignoreExpiration,
            ignoreNotBefore: that.options.ignoreNotBefore
        }
        try {
            t = jwt.verify(token, that.secret, o)
        } catch (err) {
            return false
        }
        return t
    }
    sign(object) {
        const that = this
        if (that.options.ignoreExpiration) {
            jwt.sign(object, that.secret, { noTimestamp: true })
        } else {
            jwt.sign(object)
        }

    }
}