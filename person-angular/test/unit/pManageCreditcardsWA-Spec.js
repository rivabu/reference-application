'use strict';

describe('Given the pManageCreditcardsWAApp module', function () {

    var module;
    beforeEach(function () {
        module = angular.module('pManageCreditcardsWAApp');
    });

    it('should be registered', function () {
        expect(module).not.toBeNull();
    });

    describe('Dependencies:', function () {

        var dependencies;
        var hasModule = function (m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function () {
            dependencies = module.value('pManageCreditcardsWAApp').requires;
        });

        //you can also test the module's dependencies
        it('should have ingGlobal as a dependency', function () {
            expect(hasModule('ingGlobal')).toEqual(true);
        });

    });
});

describe('Dummy test to test the properties', function () {

    var $http, $httpBackend;

    beforeEach(module('pManageCreditcardsWAApp'));

    beforeEach(inject(function (_$httpBackend_, _$http_) {
        $httpBackend = _$httpBackend_;
        $http = _$http_;
    }));
});
