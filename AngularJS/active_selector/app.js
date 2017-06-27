var app = angular.module('app', []); 

app.controller('selectFilter', function($scope) {

    $scope.tabs = [];
    $scope.selectedInd = 0;
    
    $scope.filters = [
        {
	    'filterId': 1,
	    'time': 'last 24 hours',
        },
        {
	    'filterId': 2,
	    'time': 'all',
        },
        {
	    'filterId': 3,
	    'time': 'last hour',
        },
        {
	    'filterId': 4,
	    'time': 'today',
        },
        {
	    'filterId': 5,
	    'time': 'yersteday',
        }
    ];
    $scope.selected = 0;

    $scope.select= function(filter) {
	console.log(filter);
	console.log($scope.tabs);
	console.log($scope.tabs[$scope.selectedInd]);
	
	var found = false;

	for (var i=0, l=$scope.tabs.length; i<l; i++) { 
	    if (filter ==  $scope.tabs[i]){
		found = true;
		$scope.selectedInd = i;
		return;
	    }
	}

	if(!found){
	    $scope.tabs.push(filter);
	    $scope.selectedInd = $scope.tabs.length-1;	    
	}
	
    };
});
