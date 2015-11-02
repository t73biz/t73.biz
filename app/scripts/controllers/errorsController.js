(function(){
	mainApp.controller('ErrorsController', [
		'$scope',
		'$state',
		function($scope, $state) {
			$scope.showInputForm = function() {
				$scope.showform = true;
				setTimeout(function () {
					$("#newUrl").focus();
				}, 1700);
			}

			$scope.textEntered = function() {
				$("#newUrl").blur();
				$scope.redirect = true;
			}

			$scope.startRedirect = function() {
					if(!$state.get($scope.newUrl)) {
						$scope.home = true;
						setTimeout(function () {
							$state.go('home');
						}, 5000);
						
					} else {
						setTimeout(function () {
							$state.go($scope.newUrl);
						}, 1000);
					}
			}	
		}
	]);
})();

