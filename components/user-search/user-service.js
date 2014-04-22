app.factory('User', ['$resource', '$rootScope', '$location', function ($resource, $rootScope, $location) {
    var queryStringName = 'username';

    var url = $rootScope.api + "user";
    var User = $resource(
        url,
        null,//{ScopeId: "@ScopeId"},
        {
            'get': {
                method: 'GET'
            },
            'query': {
                method: 'GET',
                url: url + "/search",
                isArray: true
            }
        }
    );

    User.CurrentUser = null;
    User.SetCurrentUser = function (u) {

        //sets the query string
        $location.search(queryStringName, u.Name);

        User.CurrentUser = u;
        $rootScope.$broadcast('CurrentUser', u);
    }

    //Set the user onload
    //if its set in the querystring use that, else ask the server for current user
    //requires html5 mode on locations, set in app.js

    if ($location.search().username != null) {
        User.get({ username: $location.search().username }).$promise.then(function (user) {
            User.SetCurrentUser(user);
        })
        console.log("set with url");
    }
    else {
        User.get().$promise.then(function (user) {
            User.SetCurrentUser(user);
        })
        console.log("set by current login");
    }

    return User;
}]);