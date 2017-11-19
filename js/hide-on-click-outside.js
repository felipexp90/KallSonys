(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('hideOnClickOutside', hideOnClickOutside);

    hideOnClickOutside.$inject = [
        '$document'
    ];

    function hideOnClickOutside($document) {
        return {
            restrict: 'A',
            link: function ($scope, el, attrs, ctrl) {
                $document.on('click', function(e){

                    if(el !== e.target && !el[0].contains(e.target) && attrs.ignoreClickId == undefined || (attrs.ignoreClickId !== undefined && !$(e.target).is($('#'+attrs.ignoreClickId)))) {
                        $scope.$apply(function () {
                            // property with an object or a boolean
                            var name = attrs.hideOnClickOutside;
                            // can be an object: {'show': true|false, 'event': <js event>}
                            if (typeof $scope[name] === 'object') {
                                if ($scope[name].show && e.target != $scope[name].event.target) {
                                    $scope[name].show = false;
                                }
                            }
                            // can be a boolean
                            else if ($scope[name]) {
                                $scope[name] = false;
                            }
                        });
                    }
                });
            }
        }
    }
})();
