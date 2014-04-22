app.factory('ADUser', function ($resource, $rootScope) {
    var url = $rootScope.api + "ad/user";
    var ADUser = $resource(
        url,
        null,//{ScopeId: "@ScopeId"},
        {
            'get': {
                method: 'GET'
            },
            'unlock': {
                method: 'GET',
                url: url + '/unlock'
            }
        }
    );

    return ADUser;
});