zn.define([
    'node:crypto',
    'node:xml2js'
], function (node_crypto, node_xml2js) {

    var SING_TYPE = {
        RSA : 'RSA-SHA1',
        RSA2: 'RSA-SHA256'
    }, CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    var XML_Builder = new node_xml2js.Builder();

    return zn.Class({
        methods: {
            xmlStringify: function (object){
                return XML_Builder.buildObject({
                    xml: object
                });
            },
            xmlParse: function (xml, callback){
                node_xml2js.parseString(xml, {
                    trim: true,
                    explicitArray: false
                }, function (error, data) {
                    if(error){
                        error = new Error();
                        error.name = 'XMLParseError';
                        callback && callback(error);
                    }else {
                        callback && callback(data);
                    }
                });

                return this;
            },
            getTimeStamp: function (date){
                var _date = date || new Date(),
                    _MM = _date.getMonth() + 1,
                    _dd = _date.getDate(),
                    _HH = _date.getHours(),
                    _mm = _date.getMinutes(),
                    _ss = _date.getSeconds();

                return [_date.getFullYear(), (_MM > 9 ? '' : '0') + _MM, (_dd > 9 ? '' : '0') + _dd].join('-') + ' ' + [
                    (_HH > 9 ? '' : '0') + _HH, (_mm > 9 ? '' : '0') + _mm, (_ss > 9 ? '' : '0') + _ss
                ].join(':');
            },
            generateNonceString: function (size){
                var _max = CHARS.length,
                    _size = size || 32,
                    _value = '';

                for (var i = 0; i < _size; i++) {
                    _value += CHARS.charAt(Math.floor(Math.random() * _max));
                }

                return _value;
            },
            createSignatureWithRSA: function (content, signType, charset){
                var rsa = node_crypto.createSign(SING_TYPE[signType || 'RSA2']);
                rsa.update(content, charset || 'utf-8');

                return rsa.sign(this.config.merchant_private_key, 'base64');
            },
            checkRSA: function (params, sign, signType, charset){
                var rsa = node_crypto.createVerify(SING_TYPE[signType || 'RSA2']);
                rsa.update(JSON.stringify(params).replace(/\//g, "\\/"), charset  || 'utf-8');
                return rsa.verify(this.config.alipay_public_key, sign, 'base64');
            },
            stringify: function (params){
                return Object.keys(params)
                    .filter(function(key){
                        if(key == 'sign'){
                            return false;
                        }
                        if(params[key] == ''){
                            return false;
                        }

                        return true;
                    })
                    .sort()
                    .map(function(key){
                        return [key, params[key]].join('=');
                    })
                    .join('&');
            }
        }
    });

});
