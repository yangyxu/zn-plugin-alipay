zn.define([
    './base',
    './alipay_trade_wap_pay',
    './alipay_trade_refund'
], function (
    base,
    alipay_trade_wap_pay,
    alipay_trade_refund
){
    return {
        "base": base,
        "alipay.trade.wap.pay": alipay_trade_wap_pay,
        "alipay.trade.refund": alipay_trade_refund
    }
});
