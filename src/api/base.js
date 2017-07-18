zn.define({
    app_id: {
        type: 'String',
        required: true,
        maxLength: 32,
        value: function (){
            return zn.alipay.config.app_id;
        }
    },
    method: {
        type: 'String',
        required: true,
        maxLength: 128
    },
    charset: {
        type: 'String',
        required: true,
        maxLength: 10,
        options: ['utf-8', 'gbk', 'gb2312'],
        value: 'utf-8'
    },
    sign_type: {
        type: 'String',
        required: true,
        maxLength: 10,
        options: ['RSA2', 'RSA'],
        value: 'RSA2'
    },
    sign: {
        type: 'String',
        required: true,
        maxLength: 256
    },
    timestamp: {
        type: 'String',
        required: true,
        maxLength: 19,
        value: function (){
            return zn.alipay.getTimeStamp();
        }
    },
    version: {
        type: 'String',
        required: true,
        maxLength: 3,
        value: '1.0'
    },
    format: {
        type: 'String',
        required: false,
        maxLength: 40,
        value: 'JSON'
    },
    return_url: {
        type: 'String',
        required: false,
        maxLength: 256
    },
    notify_url: {
        type: 'String',
        required: false,
        maxLength: 256
    },
    biz_content: {
        type: 'String',
        required: false
    }
});
