var mainApp = angular.module('mainApp', ['ui.router']);

mainApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");

var articleList = [
	{
		href: "bootstrap-alert-plugin",
		title: "Bootstrap Alert Plugin"
	},
	{
		href: "cakephp-3-maintenance-mode",
		title: "Cakephp 3 Maintenance Mode Tutorial"
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

	// Now set up the states
$stateProvider
	.state('home', {
		url: "/home",
		templateUrl: "pages/home.html",
		controller: function($scope) {
			$scope.articles = articleList;
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
		templateUrl: "pages/articles/bootstrap-alert-plugin.html"
	})
	.state('cakephp-3-maintenance-mode', {
		url: "/cakephp-3-maintenance-mode",
		templateUrl: "pages/articles/cakephp-3-maintenance-mode.html"
	})
	.state('sitepoint-versioning-newsletter', {
		url: "/sitepoint-versioning-newsletter",
		templateUrl: "pages/articles/sitepoint-versioning-newsletter.html"
	})
	.state('translocation-bundle', {
		url: "/translocation-bundle",
		templateUrl: "pages/articles/translocation-bundle.html"
	})
});
