zn.define([
    '../Alipay.js'
], function (Alipay) {

    return zn.Controller('pay',{
        methods: {
            init: function (){
                var _appConfig = this._context._config,
                    _serverConfig = this._context._serverContext._config;
                zn.alipay = new Alipay(zn.overwrite({}, _serverConfig.alipay, _appConfig.alipay));
            },
            testWapPay: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    response.success(zn.alipay.getMethodURL('alipay.trade.wap.pay', {
                        subject: 'SB'+(new Date()).getTime(),
                        product_code: 'NB001',
                        out_trade_no: 'YY'+(new Date()).getTime(),
                        total_amount: 0.01
                    }));
                }
            },
            testGetRefund: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    response.success(zn.alipay.getMethodURL('alipay.trade.refund', {
                        out_trade_no: '2501501813633892',
                        trade_no: '2017073121001004380270461631',
                        refund_reason: '退货',
                        refund_amount: 0.01
                    }));
                }
            },
            testCallRefund: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    zn.alipay.callGetMethod('alipay.trade.refund', {
                        out_trade_no: '2501239330378898',
                        trade_no: '2017072921001004380265517107',
                        refund_reason: '退货',
                        refund_amount: 0.01
                    }).then(function (data){
                        response.success(data);
                    }, function (err){
                        response.error(err);
                    });
                }
            }
        }
    });

});
