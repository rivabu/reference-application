/**
 * Created by m07i580 on 13-6-2014.
 */
beforeEach(function () {
    'use strict';
    this.addMatchers({
        toEqualData: function (expected) {
            return angular.equals(this.actual, expected);
        }
    });
});