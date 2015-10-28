
var mainApp = angular.module('mainApp', ['disqus', 'ui.router', 'social', 'yaru22.md'])
.config(
	[
		'$locationProvider',
		'$stateProvider',
		'$urlRouterProvider',
		function($locationProvider, $stateProvider, $urlRouterProvider) {

			$urlRouterProvider
				.when("/bootstrap-alert-plugin", '/posts/bootstrap-alert-plugin')
				.when("/cakephp-3-maintenance-mode", '/posts/cakephp-3-maintenance-mode')
				.when('/freelancing-with-toptal',	'/posts/freelancing-with-toptal')
				.when("/sitepoint-versioning-newsletter", '/posts/sitepoint-versioning-newsletter')
				.when("/translocation-bundle", '/posts/symfony-2-translocation-bundle')
				.otherwise("/");
			$locationProvider.html5Mode(true);

			// Now set up the states
			$stateProvider
			.state('home', {
				url: "/",
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
			.state('posts', {
				url: "/posts/:articleName",
				templateUrl: "pages/post.html",
				controller: "PostsController",
			})

		}
	]
)
.filter('humanize', function() {
	return function(slug) {
		if(slug){
			return slug.split("-").map(function(word) {
				return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
			}).join(' ');
		}
	};
});
