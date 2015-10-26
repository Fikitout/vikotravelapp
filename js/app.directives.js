(function(){

	'use strict';

	angular.module('flightsTime')
	.directive('ftPassengerInfo', ftPassengerInfo);

	function ftPassengerInfo(){

		return {
			restrict : "E",
			templateUrl : "./templates/directives/passengerInfo.html",
			scope:{
				indexPosition : '@index'
			},
			controller : function($scope){
				$scope.position = Number($scope.indexPosition);
			}
		}
	}//passengerInfo
})();