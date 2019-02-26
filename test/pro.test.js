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

    describe('viewVerify', () => {
        it('success', () => {
            var policy =  new Policy()
            policy.addPolicy({"Statement": [{"Action": ["user/*","goods/info","order/info","refund/*"], "Effect": "Allow"}]})
            policy.addPolicy({"Statement": [{"Action": ["user/*","goods/list"], "Effect": "Deny"}]})
            policy.viewVerify('goods/info').should.be.equal(true)
            policy.viewVerify('goods/info && goods/list').should.be.equal(false)
            policy.viewVerify('goods/info || goods/list').should.be.equal(true)
            policy.viewVerify('goods/info || goods/list').should.be.equal(true)
            policy.viewVerify('order/info || goods/list').should.be.equal(true)
            policy.viewVerify('order/info && refund/*').should.be.equal(true)
            policy.viewVerify('(order/info && refund/*) || goods/list').should.be.equal(true)
            policy.viewVerify('(order/info && refund/*) && goods/list').should.be.equal(false)
        })
    })

    describe('getActionList', () => {
        it('success', () => {
            var policy =  new Policy()
            const result = policy.getActionList({"Statement": [{"Action": ["user/*","goods/info","order/info","refund/*"], "Effect": "Allow"}]})
            result.should.be.instanceof(Array).and.have.lengthOf(4);
        })
    })

    describe('getEffect', () => {
        it('success', () => {
            var policy =  new Policy()
            const result1 = policy.getEffect({"Statement": [{"Action": ["user/*","goods/info","order/info","refund/*"], "Effect": "Allow"}]})
            result1.should.be.equal('Allow')

            const result2 = policy.getEffect({"Statement": [{"Action": ["user/*","goods/info","order/info","refund/*"], "Effect": "Deny"}]})
            result2.should.be.equal('Deny')
        })
    })
})


