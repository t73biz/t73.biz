/**
 * Posts Controller
 * This controller will handle all of the markdown processing of the files, and assign the post view paramaters
 * @author Ronald Chaplin <rchaplin@t73.biz>
 */

(function () {
	mainApp.controller('PostsController', [
		'$http',
		'$scope',
		'$state',
		'$stateParams',
		'$window',
		function($http, $scope, $state, $stateParams, $window) {
			$scope.contentLoaded = false;

			if($window.articleList.indexOf($stateParams.articleName) == -1) {
				$scope.post = {
					title: 'Danger Will Robinson!',
					tagline: "The widgets have broken! We can't seem to find what you're looking for!",
					content: 'Try looking in the article list again.'
				};
			} else {
				$http.get('/articles/' + $stateParams.articleName + '.md')
				.success(function(data){
					var absUrl = $state.href('posts', {articleName: $stateParams.articleName},{absolute: true});
					var tl = data.substr(0, data.indexOf("\n"));
					var ct = data.substr(tl.length);
					$scope.post = {
						title: $stateParams.articleName,
						tagline: tl,
						content: ct
					};

					$scope.disqus = {
						shortname: 't73biz',
						identifier: $stateParams.articleName,
						url: absUrl
					}

					$scope.google = {
						url: absUrl
					}

					$scope.twitter = {
						url: absUrl,
						msg: "Check out this article from @t73biz" 
					}
					$scope.contentLoaded = true;
				});
			}

		}
	]);

})();


var articleList = [
	"bootstrap-alert-plugin",
	"cakephp-3-maintenance-mode",
	'freelancing-with-toptal',
	"sitepoint-versioning-newsletter",
	"symfony-2-translocation-bundle",
];
