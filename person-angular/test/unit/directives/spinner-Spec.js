/* global it, expect, describe, beforeEach, inject */

'use strict';

describe('Given the spinner directive', function () {
    beforeEach(module('pManageCreditcardsWAApp'));

    var $compile, $rootScope, $q;

    beforeEach(inject(function (_$compile_, _$rootScope_, _$q_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));

    it('should show the spinner', function () {
        var element = $compile('<div id="spinner" spinner/></div>')($rootScope);
        expect(element.html()).toBe('<span ng-show="show" class="loading-indicator-medium"></span>');
    });

    describe('with a promise', function () {
        var element, deferred;
        beforeEach(function () {
            // Arrange
            deferred = $q.defer();
            $rootScope.promise = {$promise: deferred.promise};

        });

        function act() {
            // Act
            element = $compile('<div spinner="promise"></div>')($rootScope);
        }

        it('should appear when promise is not yet resolved', function () {
            act();
            expect(element.html()).toBe('<span ng-show="show" class="loading-indicator-medium"></span>');
        });

        it('should disappear when given promise gets fulfilled', function () {
            act();
            deferred.resolve();
            $rootScope.$digest();
            expect(element.html()).toBe('<span ng-show="show" class="loading-indicator-medium ng-hide"></span>');
        });

        it('should disappear when given promise gets rejected', function () {
            act();
            deferred.reject();
            $rootScope.$digest();
            expect(element.html()).toBe('<span ng-show="show" class="loading-indicator-medium ng-hide"></span>');
        });

        it('should not be shown when promise is already resolved', function () {
            deferred.resolve();
            act();
            $rootScope.$digest();
            expect(element.html()).toBe('<span ng-show="show" class="loading-indicator-medium ng-hide"></span>');
        });
    });
});