app.factory('PharosUser', function ($resource, $rootScope) {
    var url = $rootScope.api + "pharos/user";
    var PharosUser = $resource(
        url,
        null,
        {
            'get': {
                method: 'GET'
            }
        }
    );

    return PharosUser;
});