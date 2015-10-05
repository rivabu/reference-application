'use strict';

describe('Given the MCPServiceInterceptor', function () {

    var $http, $httpBackend, location;

    beforeEach(module('pManageCreditcardsWAApp'));

    beforeEach(inject(function (_$httpBackend_, _$http_, _$location_) {
        $httpBackend = _$httpBackend_;
        $http = _$http_;
        location = _$location_;
    }));

    describe('the interceptor', function () {
        it('should append the urlparameter', function () {
            // add mcpurlparam=1234 to the request
            location.search('mcpurlparam=1234');
            $httpBackend.expectGET('/p-manage-creditcards?mcpurlparam=1234').respond(200, {});
            $http({method: 'GET', url: '/p-manage-creditcards'});
            $httpBackend.flush();
            expect(location.url()).toEqual('?mcpurlparam=1234');
        });
        it('should append the urlparameter', function () {
            // add no param to the request
            $httpBackend.expectGET('/p-manage-creditcards?').respond(200, {});
            $http({method: 'GET', url: '/p-manage-creditcards?'});
            $httpBackend.flush();
            expect(location.url()).toEqual('');
        });
        it('should append the urlparameter', function () {
            // add mcpurlparam=1234 to the request
            location.search('id=1234');
            $httpBackend.expectGET('/p-manage-creditcards?id=1234').respond(200, {});
            $http({method: 'GET', url: '/p-manage-creditcards'});
            $httpBackend.flush();
            expect(location.url()).toEqual('?id=1234');
        });
    });
});