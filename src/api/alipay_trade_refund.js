zn.define({
    out_trade_no: {
        type: 'String',
        required: true,
        maxLength: 64
    },
    trade_no: {
        type: 'String',
        required: true,
        maxLength: 256
    },
    refund_amount: {
        type: 'Price',
        required: true,
        maxLength: 9
    },
    refund_reason: {
        type: 'String',
        required: false,
        maxLength: 256
    },
    out_request_no: {
        type: 'String',
        required: false,
        maxLength: 64
    },
    operator_id: {
        type: 'String',
        required: false,
        maxLength: 30
    },
    store_id: {
        type: 'String',
        required: false,
        maxLength: 32
    },
    terminal_id: {
        type: 'String',
        required: false,
        maxLength: 32
    }
});
