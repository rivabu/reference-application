

describe('ingWizardFooterHideNext directive', function(){
    'use strict';

    beforeEach(module('pManageCreditcardsWAApp'));

    var $compile, $scope;

    beforeEach(inject(function(_$compile_, $rootScope){
        $compile = _$compile_;
        $scope = $rootScope.$new();
    }));

    function retrieveFooterFromWizard(wizardElement){
        return angular.element(wizardElement.find('.ing-wizard-footer'));
    }

    function getNextButton(footerElement){
        return angular.element(footerElement.find('.js-btn-next'));
    }

    it('should hide next button when specified', function(){
        $scope.show = false;
        $scope.wizardConfig = {id: 'dsd', steps: [{}]};
        var element = retrieveFooterFromWizard($compile('<div ing-wizard config="wizardConfig"><div showNext="show" ing-wizard-footer-hide-next></div></div>')($scope));
        $scope.$digest();
        expect(getNextButton(element).hasClass('ng-hide')).toBe(true);
    });
});