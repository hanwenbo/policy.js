var Policy = require('../dist/policy.min')

const should =  require('should')

describe('Policy', () => {
    describe('verify', () => {
        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*"], "Effect": "Allow"}]})
            policy.verify('goods/xxx').should.be.equal(false)
        })

        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*"], "Effect": "Allow"}]})
            policy.verify('user/xxx').should.be.equal(true)
        })

        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*"], "Effect": "Allow"}]})
            policy.addPolicy({"Statement": [{"Action": ["user/*"], "Effect": "Deny"}]})
            policy.verify('user/xxx').should.be.equal(false)
        })

        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*"], "Effect": "Allow"}]})
            policy.addPolicy({"Statement": [{"Action": ["goods/*"], "Effect": "Allow"}]})
            policy.verify('goods/xxx').should.be.equal(true)
        })

        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*"], "Effect": "Allow"}]})
            policy.addPolicy({"Statement": [{"Action": ["goods/*"], "Effect": "Allow"}]})
            policy.verify('user/xxx').should.be.equal(true)
        })

        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*"], "Effect": "Allow"}]})
            policy.addPolicy({"Statement": [{"Action": ["goods/*"], "Effect": "Allow"}]})
            policy.addPolicy({"Statement": [{"Action": ["user/*"], "Effect": "Deny"}]})
            policy.verify('user/xxx').should.be.equal(false)
        })

        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*","goods/list"], "Effect": "Allow"}]})
            policy.verify('goods/list').should.be.equal(true)
        })

        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*","goods/info"], "Effect": "Allow"}]})
            policy.verify('goods/list').should.be.equal(false)
        })

        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*","goods/info"], "Effect": "Allow"}]})
            policy.addPolicy({"Statement": [{"Action": ["user/*","goods/list"], "Effect": "Deny"}]})
            policy.verify('goods/info').should.be.equal(true)
            policy.verify('goods/list').should.be.equal(false)
        })
    })
})

