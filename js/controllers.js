/**
 * angularjs控制器
 */

//主控制模板
var algorithmsControllers = angular.module('algorithmsControllers',[])


//目录控制器
algorithmsControllers.controller('directoryCtr', ['$scope', function($scope){
	$scope.directory={}
	$scope.directory.part1={
						title:"第一部分：基础知识",
						chapters:{
							chapter1: {
								title: "第1章 算法在计算中的作用",
								sections:{
									section1:{
										title:"1.1 算法",
										path:"1.1.1"
									},
									section2: {
										title: "1.2 作为一种技术的算法",
										path:"1.1.2"
									}
								}	
							},
							chapter2:{
								title:"第2章 算法基础",
								sections:{
									section1:{
										title:"2.1 插入排序",
										path:"1.2.1"
									},
									section2:{
										title:"2.2 分析算法",
										path:"1.2.2"
									},
									section3:{
										title:"2.3 设计算法",
										path:"1.2.3"
									}
								}
							},
							chapter3:{
								title:"第3章 函数的增长",
								sections:{
									section1:{
										title:"3.1 渐进记号",
										path:"1.3.1"
									},
									section2:{
										title:"3.2 标准记号与常用函数",
										path:"1.3.2"
									}
								}
							},
							chapter4:{
								title:"第4章 分治策略",
								sections:{
									section1:{
										title:"4.1 最大子数组问题",
										path:"1.4.1"
									},
									section2:{
										title:"4.2 矩阵乘法的Strassen算法",
										path:"1.4.2"
									},
									section3:{
										title:"4.3 用代入法求解递归式",
										path:"1.4.3"
									},
									section4:{
										title:"4.4 用递归树方法求解递归式",
										path:"1.4.4"
									},
									section5:{
										title:"4.5 用主方法求解递归式",
										path:"1.4.5"
									},
									section6:{
										title:"4.6 证明主定理",
										path:"1.4.6"
									}
								}
							},
							chapter5:{
								title:"第5章 低概率分析和随机算法",
								sections:{
									section1:{
										title:"5.1 雇佣问题",
										path:"1.5.1"
									},
									section2:{
										title:"5.2 指示器随机变量",
										path:"1.5.1"
									},
									section3:{
										title:"5.3 随机算法",
										path:"1.5.2"
									},
									section4:{
										title:"5.4 概率分析和指示器随机变量的进一步使用",
										path:"1.5.3"
									}
								}
							}
						}
					}

		
	
}])


//内容页控制器
algorithmsControllers.controller('homePageContentCtrl',['$scope', '$routeParams',function ($scope,$routeParams) {
	$scope.section=$routeParams.sectionNum;
	console.log($scope.section)
	var rendererMD = new marked.Renderer();

	rendererMD.table = function (header, body) {
	    return '<table class="table table-striped">'+header+body+'</table>'
	}

	marked.setOptions({
		renderer:rendererMD,
		gfm: true,
	    tables: true,
	    breaks: false,
	    pedantic: false,
	    sanitize: false,
	    smartLists: true,
	    smartypants: false
	});//基本设置

	marked.setOptions({
        highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });



    $.get('./README.md',function (result) {
    	$('#content').html(marked(result));
    	$('pre code').addClass('hljs mel');
    })
}])

algorithmsControllers.controller('contentCtrl', ['$scope','$routeParams', function($scope,$routeParams){
	$scope.section=$routeParams.sectionNum; //获取路径

	console.log($scope)

	var rendererMD = new marked.Renderer();

	rendererMD.table = function (header, body) {
	    return '<table class="table table-striped">'+header+body+'</table>'
	}

	marked.setOptions({
		renderer:rendererMD,
		gfm: true,
	    tables: true,
	    breaks: false,
	    pedantic: false,
	    sanitize: false,
	    smartLists: true,
	    smartypants: false
	});//基本设置

	marked.setOptions({
        highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });



    $.get('./content/pages/'+$scope.section+'.md',function (result) {
    	$('#secssion-pages').html(marked(result));
    	$('pre code').addClass('hljs mel');

    	MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
		MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    })

}])