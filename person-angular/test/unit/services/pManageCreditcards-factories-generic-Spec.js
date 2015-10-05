
'use strict';

describe('Testcase pManageCreditcardsWAApp -> Services -> ', function () {
    var mockHttp = {};
    // global beforeEach
    beforeEach(module('pManageCreditcardsWAApp', 'ngResource'));
    beforeEach(inject(function ($rootScope, $httpBackend) {
        mockHttp = $httpBackend;
    }));
    describe('Version service -> ', function () {
        it('Should return current version', inject(function (version) {
            expect(version.version).toEqual('1.0.0-SNAPSHOT');
        }));
    });

    describe('RequestUtilsService service -> ', function () {
        var envs = [
                'http://127.0.0.1:3000/app/index.html?id=1',
                'http://localhost:3000/app/index.html?id=1',
                'http://localhost:3000/app/index.html?',
                'http://testomgeving:3000/app/index.html?id=1',
                'http://testomgeving:3000/app/index.html?id=1'
            ],
            count = 0;


        beforeEach(inject(function($browser){
            $browser.url(envs[count++]);
        }));

        it('127.0.0.1 id=1',  inject (function (RequestUtilsService) {
            expect(RequestUtilsService.getParamFromUrl('id', true)).toEqual('1');
        }));
        it('localhost id=1',  inject (function (RequestUtilsService) {
            expect(RequestUtilsService.getParamFromUrl('id', true)).toEqual('1');
        }));
        it('localhost no id',  inject (function (RequestUtilsService) {
            expect(RequestUtilsService.getParamFromUrl('id', true)).toEqual(null);
        }));
        it('ander omgeving id=1',  inject (function (RequestUtilsService) {
            expect(RequestUtilsService.getParamFromUrl('id', true)).toEqual(null);
        }));
        it('ander omgeving id=1',  inject (function (RequestUtilsService) {
            expect(RequestUtilsService.getParamFromUrl('id', false)).toEqual('1');
        }));

    });
});