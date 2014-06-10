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
            'groups': {
                isArray: true,
                method: 'GET',
                url: url + '/groups'
            },
            'clearPasswordLastSet': {
                method: 'GET',
                url: url + '/clearPasswordLastSet'
            },
            'password': {
                method: 'GET',
                url: url + '/password'
            }

        }
    );
});