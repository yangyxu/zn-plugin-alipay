zn.define([
    'node:request',
    'node:fs',
    'node:path',
    './api/index.js',
    './AlipayUtil.js',
    './AlipayTrade.js'
], function (node_request, node_fs, node_path, api, AlipayUtil, AlipayTrade) {

    return zn.Class({
        mixins: [ AlipayUtil ],
        properties: {
            config: {
                get: function (){
                    return this._config;
                }
            }
        },
        methods: {
            init: function (config){
                this._config = zn.extend({}, config);
                if(config.merchant_private_key){
                    this._config.merchant_private_key = node_fs.readFileSync(node_path.resolve(process.cwd(), config.merchant_private_key), 'utf-8');
                    //this._config.merchant_private_key = this._config.merchant_private_key.replace(/[\r\n]/g,"");
                }
            },
            getMethodDefaultParams: function (method, params, encode){
                var _base = api.base,
                    _defaultParams = api[method],
                    _params = {},
                    _values = null,
                    _value = null;

                if(_params){
                    _values = {};
                    zn.each(_base, function (value, key){
                        _value = value.value;
                        if(params[key] != null){
                            _value = params[key];
                        }
                        if(_value != null || value.required){
                            if(typeof _value == 'function'){
                                _value = _value.call();
                            }
                            _values[key] = _value;
                        }
                    });
                    _values.method = method;

                    zn.each(_defaultParams, function (value, key){
                        _value = params[key];
                        if(_value != null){
                            _params[key] = _value;
                        } else if(_value == null && value.required){
                            _value = value.value;
                            if(typeof _value == 'function'){
                                _value = _value.call();
                            }
                            _params[key] = _value;
                        }
                    });

                    _values.biz_content = JSON.stringify(_params);
                    var _sign = this.createSignatureWithRSA(this.stringify(_values), _values.sign_type, _values.charset);
                    _values.sign = encode!==false?encodeURIComponent(_sign):_sign;
                }

                return _values;
            },
            getMethodURL: function (method, params){
                var _params = this.getMethodDefaultParams(method, params);
                return this.config.gateway + '?' + Object.keys(_params).map(function (key){
                    return key+'='+_params[key];
                }).join('&');
            },
            callGetMethod: function (method, params){
                var _defer = zn.async.defer();
                if(!method || !params){
                    _defer.reject(new Error('Method or params not allow null.'));
                }else {
                    node_request({
                        url: this.config.gateway,
                        qs: this.getMethodDefaultParams(method, params, false),
                        method: 'GET',
                        encoding: 'utf-8',
                        gzip: true
                    }, function (err, response, body){
                        if(err){
                            _defer.reject(err);
                        }else {
                            _defer.resolve(body);
                        }
                    });
                }

                return _defer.promise;
            },
            callPostMethod: function (method, params){
                var _defer = zn.async.defer();
                if(!method || !params){
                    _defer.reject(new Error('Method or params not allow null.'));
                }else {
                    node_request({
                        url: this.config.gateway,
                        method: 'POST',
                        body: this.xmlStringify(this.getMethodDefaultParams(method, params)),
                        encoding: 'utf-8',
                        gzip: true
                    }, function (err, response, body){
                        if(err){
                            _defer.reject(err);
                        }else {
                            _defer.resolve(body);
                        }
                    });
                }

                return _defer.promise;
            }
        }
    });

});
