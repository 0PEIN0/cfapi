/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

function CodeforcesController( $scope , $sce , cfApi ) {
	
	$scope.transformNavElementNameToPageName = function( navElementName ) {
		var res ;
		res = navElementName.toLowerCase() ;
		while( res.search( ' ' ) != -1 ) {
			res = res.replace( ' ' , '-' ) ;
		}
		return res ;
	} ;

	$scope.navElementClicked = function( idx ) {
		var i , len , pageName ;
		if( idx != null ) {
			len = $scope.navigationFlags.length ;
			for( i = 0 ; i < len ; i++ ) {
				$scope.navigationFlags[ i ] = false ;
			}
			$scope.showLoadingFlag = true ;
			$scope.currentNavIndex = idx ;
			$scope.navigationFlags[ idx ] = true ;
			pageName = $scope.transformNavElementNameToPageName( $scope.navElementNameList[ idx ].name ) ;
			ga( 'send' , 'pageview' , pageName ) ;
		}
	} ;

	$scope.init = function() {
		var i , len ;
		$scope.userHandle = cfApi.getDefaultUserHandle() ;
		$scope.navigationFlags = [] ;
		$scope.navElementNameList = [] ;
		$scope.navElementNameList.push( { name : 'Submissions of ' + $scope.userHandle , title : $sce.trustAsHtml( 'Submissions of <strong>' + $scope.userHandle + '</strong>' ) , index : 0 } ) ;
		$scope.navElementNameList.push( { name : 'Problemset Status' , title : $sce.trustAsHtml( 'Problemset Status' ) , index : 1 } ) ;
		$scope.navElementNameList.push( { name : 'Contest Submissions' , title : $sce.trustAsHtml( 'Contest Submissions' ) , index : 2 } ) ;
		$scope.navElementNameList.push( { name : 'Contest Standings' , title : $sce.trustAsHtml( 'Contest Standings' ) , index : 3 } ) ;
		len = $scope.navElementNameList.length ;
		for( i = 0 ; i < len ; i++ ) {
			$scope.navigationFlags.push( false ) ;
		}
		$scope.currentNavIndex = 1 ;
		$scope.navElementClicked( $scope.currentNavIndex ) ;
	} ;

	$scope.init() ;
}