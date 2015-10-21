var mainApp = angular.module('mainApp', ['ui.router']);

mainApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");

	// Now set up the states
$stateProvider
	.state('home', {
		url: "/home",
		templateUrl: "pages/home.html",
		controller: function($scope) {
			$scope.articles = [
				{
					href: "bootstrap-alert-plugin",
					title: "Bootstrap Alert Plugin"
				},
				{
					href: "sitepoint-versioning-newsletter",
					title: "Sitepoint Versioning Newsletter"
				},
				{
					href: "translocation-bundle",
					title: "Translocation Bundle"
				}
			];
		}
	})
	.state('about', {
		url: "/about",
		templateUrl: "pages/about.html"
	})
	.state('contact', {
		url: "/contact",
		templateUrl: "pages/contact.html"
	})
	.state('bootstrap-alert-plugin', {
		url: "/bootstrap-alert-plugin",
		templateUrl: "pages/bootstrap-alert-plugin.html"
	})
	.state('sitepoint-versioning-newsletter', {
		url: "/sitepoint-versioning-newsletter",
		templateUrl: "pages/sitepoint-versioning-newsletter.html"
	})
	.state('translocation-bundle', {
		url: "/translocation-bundle",
		templateUrl: "pages/translocation-bundle.html"
	})
});
