/* global it, expect, describe, beforeEach, inject */

'use strict';

describe('Given the version directive', function () {
    beforeEach(module('pManageCreditcardsWAApp'));

    describe('The version', function () {
        it('should provide the current version', function () {

            module(function ($provide) {
                $provide.provider('version', function () {
                    this.$get = function () {
                        return {
                            version : 'TEST_VER'
                        };
                    };
                });
            });

            inject(function ($compile, $rootScope) {
                var element = $compile('<span app-version></span>')($rootScope);
                expect(element.text()).toEqual('TEST_VER');
            });
        });
    });
});