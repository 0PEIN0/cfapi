/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

function CodeforcesTableDirective( $sce , cfcObj , shsObj ) {
	return {
        restrict : 'E' ,
        replace : true ,
		transclude : true ,
        template : '\
        	<table class="table table-striped table-bordered customTable">\
	            <thead>\
	              <th data-ng-repeat="column in columnList">\
	                  <div><a href="javascript:void(0);" data-ng-click="sortColumn($index)">{{column.name}} <span class="glyphicon glyphicon-sort" aria-hidden="{{column.ariaHidden}}"></span></a></div>\
	              </th>\
	            </thead>\
	            <tbody>\
	              <tr data-ng-repeat="row in rowcellList track by $index" data-ng-init="rowIndex = $index">\
	                <td data-ng-repeat="column in columnList track by $index" data-ng-init="columnIndex = $index">\
	                    <div data-ng-bind-html="forceTrustHtml( getTableCellHtml( rowIndex , columnIndex ) )"></div>\
	                </td>\
	              </tr>\
	            </tbody>\
	        </table>' ,
        scope : {
	    	'columnList' : '=' ,
			'rowcellList' : '='
	    } ,
        link: function( scope , element , attrs ) {
			var constantForSorting ;
			constantForSorting = cfcObj.constantMultiplierWhileSortingNumbers ;

			scope.forceTrustHtml = function( htmlString ) {
				return $sce.trustAsHtml( htmlString ) ;
			} ;
			
			scope.getTableCellHtml = function( rowIndex , columnIndex ) {
				var property ;
				property = scope.columnList[ columnIndex ].sortIndex ;
				if( scope.rowcellList[ rowIndex ] == null ) {
					return '' ;
				}
				return scope.rowcellList[ rowIndex ][ property + 'Html' ] ;
			} ;
			
			scope.sortColumn = function( idx ) {
				var column , leftString , rightString ;
				column = scope.columnList[ idx ] ;
				if( column.currentlySorted == null || column.currentlySorted == 'desc' ) {
					column.currentlySorted = 'asc' ;
				}
				else {
					column.currentlySorted = 'desc' ;
				}
				scope.rowcellList = shsObj.sort( scope.rowcellList , function( left , right ) {
					var leftNumber , rightNumber ;
					if( left[ column.sortIndex ] == null ) {
						return true ;
					}
					if( right[ column.sortIndex ] == null ) {
						return false ;
					}
					if( column.sortIndex == 'handle' ) {
						leftString = left[ column.sortIndex ][ 0 ].handle ;
					}
					else {
						leftString = left[ column.sortIndex ] ;
					}
					if( column.sortIndex == 'handle' ) {
						rightString = right[ column.sortIndex ][ 0 ].handle ;
					}
					else {
						rightString = right[ column.sortIndex ] ;
					}
					if( leftString == null || rightString == null ) {
						if( leftString != null ) {
							return false ;
						}
						return true ;
					}
					leftNumber = parseFloat( leftString ) ;
					rightNumber = parseFloat( rightString ) ;
					if( column.currentlySorted == 'asc' ) {
						if( isNaN( leftNumber ) == false && isNaN( rightNumber ) == false ) {
							if( leftNumber * constantForSorting > rightNumber * constantForSorting ) {
								return true ;
							}
							else {
								return false ;
							}
						}
						else {
							return ( leftString.localeCompare( rightString ) <= 0 ) ? false : true ;
						}
					}
					else {
						if( isNaN( leftNumber ) == false && isNaN( rightNumber ) == false ) {
							if( rightNumber * constantForSorting > leftNumber * constantForSorting ) {
								return true ;
							}
							else {
								return false ;
							}
						}
						else {
							return ( rightString.localeCompare( leftString ) <= 0 ) ? false : true ;
						}
					}
				} ) ;
			} ;
        }
    } ;
}

function CodeforcesContestStandingDirective( cfApi , cftsObj ) {
	return {
		restrict : 'E' ,
		replace : true ,
		transclude : true ,
		template : '\
			<div class="panel panel-info">\
				<div class="panel-heading"><h3>Country Contest Standings</h3></div>\
				<div class="panel-body">\
					<div class="well well-sm">\
						<div>\
							<select data-ng-change="contestSelected()" data-ng-model="selectedContest">\
								<option data-ng-repeat="item in contestList.dataList" data-ng-bind="item.name" value="{{item.id}}" data-ng-init="contestListLoading($index)"></option>\
							</select>\
							<select data-ng-change="countrySelected()" data-ng-model="selectedCountry">\
								<option value="">All Countries</option>\
								<option data-ng-repeat="item in countryList" data-ng-bind="item.countryName" value="{{item.countryName}}"></option>\
							</select>\
						</div>\
					</div>\
					<codeforces-table-directive column-list="customStandingTableStructure" rowcell-list="contestStandingsList.filteredDataList"></codeforces-table-directive>\
				</div>\
			</div>' ,
		scope : {
	    	'showLoadingFlag' : '=' , 
			'showRankListFlag' : '='
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.userListInfoResponse = function( response ) {
				scope.userInfoList = scope.userInfoList.concat( response.dataList ) ;
				if( scope.contestStandingsList != null && scope.contestStandingsList.summary.users.length > 0 && scope.userInfoList.length == scope.contestStandingsList.summary.users.length ) {
					scope.contestStandingsList = cfApi.updateContestStandingsList( scope.contestStandingsList , scope.userInfoList ) ;
				}
			} ;
			
			scope.contestListLoading = function( idx ) {
				if( idx == scope.contestList.dataList.length - 1 ) {
					scope.selectedContest = '' + scope.contestList.summary.initialLoadContestId ;
					scope.contestSelected() ;
				}
			} ;
		
			scope.contestListResponse = function( response ) {
				scope.contestList = response ;
			} ;
			
			scope.contestSelected = function() {
				if( scope.selectedContest != null ) {
					scope.showLoadingFlag = true ;
					cfApi.getOfficialContestStandings( scope.contestStandingsResponse , scope.selectedContest ) ;
					scope.selectedCountry = '' ;
				}
			} ;
			
			scope.contestStandingsResponse = function( response ) {
				scope.userInfoList = [] ;
				cfApi.getUserInfo( scope.userListInfoResponse , response.summary.users ) ;
				scope.customStandingTableStructure = cftsObj.getCustomStandingTableStructure( response.summary , false ) ;
				scope.contestStandingsList = response ;
				scope.showLoadingFlag = false ;
			} ;
			
			scope.countrySelected = function() {
				if( scope.selectedCountry != null && scope.selectedCountry != '' ) {
					scope.contestStandingsList.filteredDataList = cfApi.getOfficialContestStandingsByCountry( scope.contestStandingsList.dataList , scope.userInfoList , scope.selectedCountry ) ;
					scope.customStandingTableStructure = cftsObj.getCustomStandingTableStructure( scope.contestStandingsList.summary , true ) ;
				}
				else {
					scope.contestStandingsList.filteredDataList = scope.contestStandingsList.dataList ; 
					scope.customStandingTableStructure = cftsObj.getCustomStandingTableStructure( scope.contestStandingsList.summary , false ) ;
				}
			} ;
			
			scope.showRankListFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					cfApi.getContestList( scope.contestListResponse ) ;
				}
			} ;

			scope.$watch( 'showRankListFlag' , scope.showRankListFlagChanged , true ) ;
			scope.countryList = cfApi.getCountryList() ;
			scope.userHandle = cfApi.getDefaultUserHandle() ;
		}
	} ;
}

function CodeforcesSubmissionsDirective( cfApi , cftsObj ) {
	return {
		restrict : 'E' ,
		replace : true ,
		transclude : true ,
		template : '\
			<div class="panel panel-info">\
				<div class="panel-heading"><h3>Recent practice submissions on Codeforces</h3></div>\
				<div class="panel-body">\
					<div class="well well-sm">\
						<div data-ng-show="showUnofficialAccptedSubmissionSummaryFlag==true">\
							Total Accepted Submissions(including unofficial ones): <span class="badge badge-custom" data-ng-bind="userSubmissions.summary.totalAccepted+\' / \'+userSubmissions.summary.total"></span>\
						</div>\
						<div>\
							Total Accepted Submissions: <span class="badge badge-custom" data-ng-bind="submissionList.summary.totalAccepted+\' / \'+submissionList.summary.total"></span>\
						</div>\
						<div>\
							Language usage breakdown: <span class="badge badge-custom" data-ng-repeat="item in submissionList.summary.languages" data-ng-bind="item.name + \' : \' + item.frequency"></span>\
						</div>\
						<div>\
							Verdict distribution breakdown: <span class="label" data-ng-repeat="item in submissionList.summary.verdicts" data-ng-bind="item.name + \' : \' + item.frequency" data-ng-class="item.cssClass"></span>\
						</div>\
						<div>\
							Filter by Verdict: \
							<select data-ng-change="verdictSelected()" data-ng-model="selectedVerdict">\
								<option value="">All Verdicts</option>\
								<option data-ng-repeat="item in verdictList" data-ng-bind="item.name+\' (\'+item.frequency+\')\'" value="{{item.name}}"></option>\
							</select>\
						</div>\
					</div>\
					<div data-ng-show="showUnofficialOptionCheckbox==true">\
						<input type="checkbox" aria-label="..." data-ng-model="showUnofficialUserSubmissionsFlag">Show Unofficial\
					</div>\
					<codeforces-table-directive column-list="submissionTableStructure" rowcell-list="submissionList.filteredDataList" ></codeforces-table-directive>\
				</div>\
			</div>' ,
		scope : {
			'submissionListLoadedFlag' : '=' ,
	    	'submissionList' : '=' , 
			'showUnofficialAccptedSubmissionSummaryFlag' : '=' ,
			'showUnofficialOptionCheckbox' : '='
	    } ,
        link: function( scope , element , attrs ) {

			scope.verdictSelected = function() {
				if( scope.selectedVerdict != null && scope.selectedVerdict != '' ) {
					scope.submissionList.filteredDataList = cfApi.getSubmissionListThroughFilter( scope.submissionList.dataList , scope.selectedVerdict ) ;
				}
				else {
					scope.submissionList.filteredDataList = scope.submissionList.dataList ;
				}
			} ;
			
			scope.userListInfoResponse = function( response ) {
				scope.userInfoList = scope.userInfoList.concat( response.dataList ) ;
				if( scope.submissionList != null && scope.submissionList.summary.users.length > 0 && scope.userInfoList.length == scope.submissionList.summary.users.length ) {
					scope.submissionList = cfApi.updateSubmissionsDataListWithUserInfo( scope.submissionList , scope.userInfoList ) ;
				}
			} ;
			
			scope.problemListResponse = function( response ) {
				var problemSetList ;
				scope.submissionTableStructure = cftsObj.getCustomSubmissionTableStructure( true ) ;
				problemSetList = response ;
				scope.submissionList = cfApi.updateSubmissionsDataListwithProblemInfo( scope.submissionList , problemSetList ) ;
			} ;
			
			scope.submissionListLoadedFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					scope.submissionList.filteredDataList = scope.submissionList.dataList ;
					scope.verdictList = scope.submissionList.summary.verdictsAlphabeticallySorted ;
					cfApi.getUserInfo( scope.userListInfoResponse , scope.submissionList.summary.users ) ;
					cfApi.getProblems( scope.problemListResponse ) ;
				}
			} ;
			
			scope.init = function() {
				scope.$watch( 'submissionListLoadedFlag' , scope.submissionListLoadedFlagChanged , true ) ;
				scope.userInfoList = [] ;
				scope.verdictList = [] ;
				scope.selectedVerdict = '' ;
				scope.submissionTableStructure = cftsObj.getCustomSubmissionTableStructure( false ) ;
			} ;
			
			scope.init() ;
		}
	} ;
}

function CodeforcesUserStatisticsDirective( cfApi ) {
	return {
		restrict : 'E' ,
		transclude : true ,
		template : '<codeforces-submissions-directive submission-list-loaded-flag="submissionListLoadedFlag" submission-list="submissionList" show-unofficial-accpted-submission-summary-flag="true" show-unofficial-option-checkbox="true"></codeforces-submissions-directive>' ,
		scope : {
	    	'showLoadingFlag' : '=' , 
			'showUserStatisticsFlag' : '='
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.submissionListResponse = function( response ) {
				scope.submissionList = response ;
				scope.showLoadingFlag = false ;
				scope.submissionListLoadedFlag = true ;
			} ;
			
			scope.showUserStatisticsFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					cfApi.getSubmissionList( scope.submissionListResponse ) ;
				}
			} ;

			scope.$watch( 'showUserStatisticsFlag' , scope.showUserStatisticsFlagChanged , true ) ;
			scope.submissionListLoadedFlag = false ;
		}
	} ;
}

function CodeforcesRecentSubmissionsDirective( cfApi ) {
	return {
		restrict : 'E' ,
		transclude : true ,
		template : '<codeforces-submissions-directive submission-list-loaded-flag="submissionListLoadedFlag" submission-list="submissionList" show-unofficial-accpted-submission-summary-flag="false" show-unofficial-option-checkbox="false"></codeforces-submissions-directive>' ,
		scope : {
	    	'showLoadingFlag' : '=' , 
			'showRecentSubmissionsFlag' : '='
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.submissionListResponse = function( response ) {
				scope.submissionList = response ;
				scope.showLoadingFlag = false ;
				scope.submissionListLoadedFlag = true ;
			} ;
			
			scope.showRecentSubmissionsFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					cfApi.getRecentSubmissionsForAllInPractice( scope.submissionListResponse ) ;
				}
			} ;

			scope.$watch( 'showRecentSubmissionsFlag' , scope.showRecentSubmissionsFlagChanged , true ) ;
			scope.submissionListLoadedFlag = false ;
		}
	} ;
}
