'use strict';

describe('Given the version directive', function () {
    beforeEach(module('pManageCreditcardsWAApp'));

    describe('ingRichSelectCreditcardToggleTemplate', function () {
        it('should provide the ingRichSelectCreditcardToggleTemplate', function () {

            module(function ($provide) {
                $provide.provider('ingRichSelectCreditcardToggleTemplate', function () {
                    this.$get = function () {
                        return {
                            version : 'TEST_VER'
                        };
                    };
                });
            });

            inject(function ($compile, $rootScope) {
                $compile('<div ing-rich-select-creditcard-item-template></div>')($rootScope);
                $compile('<div ing-rich-select-creditcard-toggle-template></div>')($rootScope);
            });
        });
    });
});