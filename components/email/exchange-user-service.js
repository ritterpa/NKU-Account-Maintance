app.factory('ExchangeUser', function ($resource, $rootScope) {
    var url = $rootScope.api + "exchange/user";
    var ExchangeUser = $resource(
        url,
        null,
        {
            'get': {
                method: 'GET'
            }
        }
    );

    return ExchangeUser;
});
