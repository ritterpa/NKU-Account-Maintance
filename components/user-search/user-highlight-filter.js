app.filter('userHighlight', function () {

    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    return function (matchItem, query) {
        var querySplit = query.split(" ");
        _.forEach(querySplit, function (val) {
            matchItem = val ? matchItem.replace(new RegExp(escapeRegexp(val), 'gi'), '<strong>$&</strong>') : matchItem;
        });
        return matchItem;
    };
});