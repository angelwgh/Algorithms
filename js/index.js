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
			templateUrl:'content/content.html',
			controller:'contentCtrl'
		})
		.when('/:sectionNum',{
			templateUrl:'content/content1.html',
			controller:'contentCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
	}
	])

