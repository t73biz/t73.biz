(function () {
	mainApp.controller('MainController', [
		'$location',
		'$scope',
		'$state',
		'$window',
		function($location, $scope, $state, $window) {
			$scope.articleList = $window.articleList;
			$scope.$on('$viewContentLoaded', function(event) {
		    	// $window.ga('send', 'pageview', { page: $location.url() });
			});
		}
	]);
})();
