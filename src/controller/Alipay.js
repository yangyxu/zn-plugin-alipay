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
            }
        }
    });

});
