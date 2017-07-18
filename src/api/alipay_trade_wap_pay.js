zn.define({
    subject: {
        type: 'String',
        required: true,
        maxLength: 256
    },
    product_code: {
        type: 'String',
        required: true,
        maxLength: 64
    },
    out_trade_no: {
        type: 'String',
        required: true,
        maxLength: 64
    },
    total_amount: {
        type: 'Price',
        required: true,
        maxLength: 9
    },
    body: {
        type: 'String',
        required: false,
        maxLength: 128
    },
    timeout_express: {
        type: 'String',
        required: false,
        maxLength: 6,
        value: '10m'
    },
    time_expire: {
        type: 'String',
        required: false,
        maxLength: 32
    },
    seller_id: {
        type: 'String',
        required: false,
        maxLength: 28
    },
    auth_token: {
        type: 'String',
        required: false,
        maxLength: 40
    },
    goods_type: {
        type: 'String',
        required: false,
        maxLength: 2
    },
    passback_params: {
        type: 'String',
        required: false,
        maxLength: 512
    },
    promo_params: {
        type: 'String',
        required: false,
        maxLength: 512
    },
    extend_params: {
        type: 'String',
        required: false
    },
    enable_pay_channels: {
        type: 'String',
        required: false,
        maxLength: 128
    },
    disable_pay_channels: {
        type: 'String',
        required: false,
        maxLength: 128
    },
    store_id: {
        type: 'String',
        required: false,
        maxLength: 32
    },
    quit_url: {
        type: 'String',
        required: false,
        maxLength: 400
    }
});
