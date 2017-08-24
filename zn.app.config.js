zn.define({
    deploy: 'zn.plugin.alipay',
    models: '/src/model/',
    controllers: '/src/controller/',
    alipay: {
        dev_gateway: 'https://openapi.alipaydev.com/gateway.do',
        gateway: 'https://openapi.alipay.com/gateway.do',
        partner: '', // 合作身份者ID，以2088开头由16位纯数字组成的字符串
        app_id: '',
        sign_type: 'RSA2',
        charset: 'utf8',
        alipay_public_key: '',
        merchant_private_key: ''
    }
});
