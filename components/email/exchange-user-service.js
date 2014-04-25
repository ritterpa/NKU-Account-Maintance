app.factory('ExchangeUser', function ($resource, $rootScope) {
    var url = $rootScope.api + "exchange/";
    var ExchangeUser = $resource(
        url,
        null,
        {
            'getonsite': {
                method: 'GET',
                url: url + "user"
            },
            'getoffsite': {
                method: 'GET',
                url: url + "student"
            }
        }
    );

    return ExchangeUser;
});
