app.directive("adGroup", function ($compile, $compile) {
    return {
        restrict: "A",
        scope: {
            group: "=adGroup"
        },
        replace: 'true',
        template:
            '<li>{{ group.Name }} ' +
                '<ul ng-if="group.Children.length > 0" class="ul-tight" ng-repeat="g in group.Children | orderBy:Name">' +
                    '<li>'+
                        '<div ad-group="g"></div>' +
                    '</li>' +
                '</ul>' +
            '</li>',
        compile: function (el) {
            var contents = el.contents().remove();
            var compiled;
            return function(scope,el){
                if(!compiled)
                    compiled = $compile(contents);

                compiled(scope,function(clone){
                    el.append(clone);
                });
            };
        }
    };
})
