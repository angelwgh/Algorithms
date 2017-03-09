/**
 * 主程序
 */

var algorithms = angular.module('algorithms',[
		'ngRoute',
		'algorithmsControllers'
	]);


algorithms.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/',{
			templateUrl:'content/homepage.html',
			controller:'homePageContentCtrl'
		})
		.when('/:sectionNum',{
			templateUrl:'content/secssion.html',
			controller:'contentCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
	}
	])

