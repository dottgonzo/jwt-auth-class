import * as jwt from "jsonwebtoken"

export interface IJwtAuthOptions {
    ignoreExpiration?: boolean
    ignoreNotBefore?: boolean
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
    verify(token: string): any {
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
    sign(object: object): false | string {
        const that = this
        let token:string
        try {
            if (that.options.ignoreExpiration) {
                token = jwt.sign(object, that.secret, { noTimestamp: true })
            } else {
                token = jwt.sign(object, that.secret)
            }
            return token
        } catch (err) {
            return false
        }

    }
}