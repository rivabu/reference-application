sourceViewer.controller('frontPageController', ['$rootScope', '$location', 'DataAccess', '$scope', function ($rootScope, $location, DataAccess, $scope) {

    $scope.projecten = [
                        {"name": "1. Model-View-Controller Walk-Through", "id": 1, "description" : "We start with a quick walk-through of the application to show how the model, view and controller work together."},
                        {"name": "2. Java Configuration", "id": 2, "description" : "So how do we configure Spring to use our controllers and locate our JSP files and static resources etc? Well fortunately the days of XML hell are gone and we can now set up Spring entirely with Java configuration."},
                        {"name": "3. Configuring the Servlet Container", "id": 3, "description" : "Next we see how to set up the servlet container for Spring MVC. This can be done programmatically or using traditional web.xml configuration."},
                        {"name": "4. Injecting a Property Value", "id": 4, "description" : "Finally we take a look at how to read a value from a property file and inject it into our controller. Strictly speaking	this is not an MVC feature but part of the core framework, but I'll include it here anyway."},
                        {"name": "5. Whirlwind Tour", "id": 5, "description" : "So let's quickly summarise how this application works by taking a whirlwind tour of the source code."}
                        ];
    

    $scope.showProject = function(id) {
    	console.log('project selected with id: ' + id);
    	var url = '/main/' + id;
		$location.path(url);
		console.log('location path: ' + url);
    }
}]);


