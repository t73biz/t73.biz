/**
 * AngularJS directives for social sharing buttons - Facebook Like, Google+, Twitter and Pinterest
 * @author Jason Watmore <jason@pointblankdevelopment.com.au> (http://jasonwatmore.com)
 * @author Ronald Chaplin <rchaplin@t73.biz> (http://t73.biz)
 * @author Michael Bromley -- Disqus
 * @version 1.2.0
 */
(function () {
	angular.module('social', [])
	  .directive('fbLike', [
		  '$window', '$rootScope', function ($window, $rootScope) {
			  return {
				  restrict: 'A',
				  scope: {
					  fbLike: '=?'
				  },
				  link: function (scope, element, attrs) {
					  if (!$window.FB) {
						  // Load Facebook SDK if not already loaded
						  $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
							  $window.FB.init({
								  appId: $rootScope.facebookAppId,
								  xfbml: true,
								  version: 'v2.0'
							  });
							  renderLikeButton();
						  });
					  } else {
						  renderLikeButton();
					  }

					  var watchAdded = false;
					  function renderLikeButton() {
						  if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
							  // wait for data if it hasn't loaded yet
							  watchAdded = true;
							  var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
								  if (newValue) {
									  renderLikeButton();

									  // only need to run once
									  unbindWatch();
								  }

							  });
							  return;
						  } else {
							  element.html('<div class="fb-like"' + (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + ' data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>');
							  $window.FB.XFBML.parse(element.parent()[0]);
						  }
					  }
				  }
			  };
		  }
	  ])

	  .directive('googlePlus', [
		  '$window', function ($window) {
			  return {
				  restrict: 'A',
				  scope: {
					  googlePlus: '=?'
				  },
				  link: function (scope, element, attrs) {
					  if (!$window.gapi) {
						  // Load Google SDK if not already loaded
						  $.getScript('//apis.google.com/js/platform.js', function () {
							  renderPlusButton();
						  });
					  } else {
						  renderPlusButton();
					  }

					  var watchAdded = false;
					  function renderPlusButton() {
						  if (!!attrs.googlePlus && !scope.googlePlus && !watchAdded) {
							  // wait for data if it hasn't loaded yet
							  watchAdded = true;
							  var unbindWatch = scope.$watch('googlePlus', function (newValue, oldValue) {
								  if (newValue) {
									  renderPlusButton();

									  // only need to run once
									  unbindWatch();
								  }

							  });
							  return;
						  } else {
							  element.html('<div class="g-plusone"' + (!!scope.googlePlus ? ' data-href="' + scope.googlePlus + '"' : '') + ' data-size="medium"></div>');
							  $window.gapi.plusone.go(element.parent()[0]);
						  }
					  }
				  }
			  };
		  }
	  ])

	  .directive('tweet', [
		  '$window', '$location',
		  function ($window, $location) {
			  return {
				  restrict: 'A',
				  scope: {
					  tweet: '=',
					  tweetUrl: '='
				  },
				  link: function (scope, element, attrs) {
					  if (!$window.twttr) {
						  // Load Twitter SDK if not already loaded
						  $.getScript('//platform.twitter.com/widgets.js', function () {
							  renderTweetButton();
						  });
					  } else {
						  renderTweetButton();
					  }

					  var watchAdded = false;
					  function renderTweetButton() {
						  if (!scope.tweet && !watchAdded) {
							  // wait for data if it hasn't loaded yet
							  watchAdded = true;
							  var unbindWatch = scope.$watch('tweet', function (newValue, oldValue) {
								  if (newValue) {
									  renderTweetButton();

									  // only need to run once
									  unbindWatch();
								  }
							  });
							  return;
						  } else {
							  element.html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + scope.tweet + '" data-url="' + (scope.tweetUrl || $location.absUrl()) + '">Tweet</a>');
							  $window.twttr.widgets.load(element.parent()[0]);
						  }
					  }
				  }
			  };
		  }
	  ])

	  .directive('pinIt', [
		  '$window', '$location',
		  function ($window, $location) {
			  return {
				  restrict: 'A',
				  scope: {
					  pinIt: '=',
					  pinItImage: '=',
					  pinItUrl: '='
				  },
				  link: function (scope, element, attrs) {
					  if (!$window.parsePins) {
						  // Load Pinterest SDK if not already loaded
						  (function (d) {
							  var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
							  p.type = 'text/javascript';
							  p.async = true;
							  p.src = '//assets.pinterest.com/js/pinit.js';
							  p['data-pin-build'] = 'parsePins';
							  p.onload = function () {
								  if (!!$window.parsePins) {
									  renderPinItButton();
								  } else {
									  setTimeout(p.onload, 100);
								  }
							  };
							  f.parentNode.insertBefore(p, f);
						  }($window.document));
					  } else {
						  renderPinItButton();
					  }

					  var watchAdded = false;
					  function renderPinItButton() {
						  if (!scope.pinIt && !watchAdded) {
							  // wait for data if it hasn't loaded yet
							  watchAdded = true;
							  var unbindWatch = scope.$watch('pinIt', function (newValue, oldValue) {
								  if (newValue) {
									  renderPinItButton();

									  // only need to run once
									  unbindWatch();
								  }
							  });
							  return;
						  } else {
							  element.html('<a href="//www.pinterest.com/pin/create/button/?url=' + (scope.pinItUrl || $location.absUrl()) + '&media=' + scope.pinItImage + '&description=' + scope.pinIt + '" data-pin-do="buttonPin" data-pin-config="beside"></a>');
							  $window.parsePins(element.parent()[0]);
						  }
					  }
				  }
			  };
		  }
	  ]);

	  /**
	   * Config
	   */
	  var moduleName = 'disqus';

	  /**
	   * Module
	   */
	  var module;
	  try {
		  module = angular.module(moduleName);
	  } catch(err) {
		  // named module does not exist, so create one
		  module = angular.module(moduleName, []);
	  }

	  module.directive('dirDisqus', ['$window', function($window) {
		  return {
			  restrict: 'E',
			  scope: {
				  disqus_shortname: '@disqusShortname',
				  disqus_identifier: '@disqusIdentifier',
				  disqus_title: '@disqusTitle',
				  disqus_url: '@disqusUrl',
				  disqus_category_id: '@disqusCategoryId',
				  disqus_disable_mobile: '@disqusDisableMobile',
				  disqus_config_language : '@disqusConfigLanguage',
				  disqus_remote_auth_s3 : '@disqusRemoteAuthS3',
				  disqus_api_key : '@disqusApiKey',
				  disqus_on_ready: "&disqusOnReady",
				  readyToBind: "@"
			  },
			  template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>',
			  link: function(scope) {

				  // ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
				  // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
				  if (typeof scope.disqus_identifier === 'undefined' || typeof scope.disqus_url === 'undefined') {
					  throw "Please ensure that the `disqus-identifier` and `disqus-url` attributes are both set.";
				  }

				  scope.$watch("readyToBind", function(isReady) {

					  // If the directive has been called without the 'ready-to-bind' attribute, we
					  // set the default to "true" so that Disqus will be loaded straight away.
					  if ( !angular.isDefined( isReady ) ) {
						  isReady = "true";
					  }
					  if (scope.$eval(isReady)) {
						  // console.log('remote'+scope.disqus_remote_auth_s3);
						  // put the config variables into separate global vars so that the Disqus script can see them
						  $window.disqus_shortname = scope.disqus_shortname;
						  $window.disqus_identifier = scope.disqus_identifier;
						  $window.disqus_title = scope.disqus_title;
						  $window.disqus_url = scope.disqus_url;
						  $window.disqus_category_id = scope.disqus_category_id;
						  $window.disqus_disable_mobile = scope.disqus_disable_mobile;
						  $window.disqus_config =  function () {
							  this.language = scope.disqus_config_language;
							  this.page.remote_auth_s3 = scope.disqus_remote_auth_s3;
							  this.page.api_key = scope.disqus_api_key;
							  if (scope.disqus_on_ready) {
								  this.callbacks.onReady = [function () {
									  scope.disqus_on_ready();
								  }];
							  }
						  };
						  // get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
						  if (!$window.DISQUS) {
							  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
							  dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
							  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
						  } else {
							  $window.DISQUS.reset({
								  reload: true,
								  config: function () {
									  this.page.identifier = scope.disqus_identifier;
									  this.page.url = scope.disqus_url;
									  this.page.title = scope.disqus_title;
									  this.language = scope.disqus_config_language;
									  this.page.remote_auth_s3=scope.disqus_remote_auth_s3;
									  this.page.api_key=scope.disqus_api_key;
								  }
							  });
						  }
					  }
				  });
			  }
		  };
	  }]);
})();
