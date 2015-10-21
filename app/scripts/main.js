var mainApp = angular.module('mainApp', ['ui.router']);

mainApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");

	// Now set up the states
  $stateProvider
	  .state('home', {
		url: "/home",
		templateUrl: "pages/home.html"
	  })
	  .state('about', {
		url: "/about",
		templateUrl: "pages/about.html"
	  })
	  .state('contact', {
        url: "/contact",
        templateUrl: "pages/contact.html"
      })
});
