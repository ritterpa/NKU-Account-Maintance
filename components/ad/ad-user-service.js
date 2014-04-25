app.factory('ADUser', function ($resource, $rootScope) {
    var url = $rootScope.api + "ad/user";
    return $resource(
        url,
        null,//{ScopeId: "@ScopeId"},
        {
            'get': {
                method: 'GET'
            },
            'unlock': {
                method: 'GET',
                url: url + '/unlock'
            },
            'password': {
                method: 'GET',
                url: url + '/password'
            }
        }
    );
});