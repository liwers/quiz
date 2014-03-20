'use strict';

/*
 * Service to display Alert
 * type: success, warning, info, danger
 * msg: String message to display
 * timeout: time in millisecond (optional)
 * Example: Alert.add('warning', 'Test alerte', 5000);
*/

app.factory('Alert', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    var alertService;
    $rootScope.alerts = [];

    alertService = {
        add: function(type, msg, timeout) {
            $rootScope.alerts.push({
                type: type,
                msg: msg,
                close: function() {
                    return alertService.closeAlert(this);
                }
            });

            if (timeout) {
                $timeout(function(){
                    alertService.closeAlert(this);
                }, timeout);
            }
        },
        closeAlert: function(alert) {
            return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
        },
        closeAlertIdx: function(index) {
            return $rootScope.alerts.splice(index, 1);
        }
    };

    return alertService;
}]);
