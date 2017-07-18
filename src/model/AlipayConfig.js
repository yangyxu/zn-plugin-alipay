zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_alipay_config", {
        mixins: [
            model.Base
        ],
        properties: {
            appId: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            partner: {
                value: null,
                type: ['varchar', 100],
                default: ''
            }
        }
    });

})
