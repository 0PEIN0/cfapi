/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

function CodeforcesRootDirective( cfcObj , cftsObj ) {
	return {
        restrict : 'E' ,
        replace : true ,
		transclude : true ,
        template : '\
        	<div>\
				<div class="overlay" data-ng-show="showLoadingFlag==true">\
				    Loading...\
				</div>\
				<div data-ng-show="showLoadingFlag==false">\
					<div>\
						<ul class="nav nav-pills">\
						  <li data-ng-repeat="item in navElementNameList track by $index" role="presentation" data-ng-click="navElementClicked(item.index)" data-ng-class="(currentNavIndex==item.index) ? \'active\' : \'\'"><a href="javascript:void(0);" data-ng-bind-html=\'item.title\'></a></li>\
						  <li><a href="https://github.com/0PEIN0/cfapi/issues" target="_blank"><img alt="Report Bug" title="Report Bug" class="navigation-image" src="images/bug.png"/></a></li>\
						  <li><a href="https://github.com/0PEIN0/cfapi" target="_blank"><img alt="Repository" title="Repository" class="navigation-image" src="images/github.png"/></a></li>\
						</ul>\
					</div>\
					<div>\
						<codeforces-user-statistics-directive data-ng-show="navigationFlags[0] == true" show-loading-flag="showLoadingFlag" show-user-statistics-flag="navigationFlags[0]" page-header="navElementNameList[0].title" user-handle="userHandle"></codeforces-user-statistics-directive>\
						<codeforces-recent-submissions-directive data-ng-show="navigationFlags[1] == true" show-loading-flag="showLoadingFlag" show-recent-submissions-flag="navigationFlags[1]" page-header="navElementNameList[1].title"></codeforces-recent-submissions-directive>\
						<codeforces-contest-submissions-directive data-ng-show="navigationFlags[2] == true" show-loading-flag="showLoadingFlag" show-contest-submissions-flag="navigationFlags[2]" page-header="navElementNameList[2].title"></codeforces-contest-submissions-directive>\
						<codeforces-contest-standing-directive data-ng-show="navigationFlags[3] == true" show-loading-flag="showLoadingFlag" show-standing-flag="navigationFlags[3]" page-header="navElementNameList[3].title"></codeforces-contest-standing-directive>\
						<codeforces-problem-set-directive data-ng-show="navigationFlags[4] == true" show-loading-flag="showLoadingFlag" show-problem-set-flag="navigationFlags[4]" page-header="navElementNameList[4].title"></codeforces-problem-set-directive>\
					</div>\
				</div>\
			</div>' ,
        scope : {
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.transformNavElementNameToPageName = function( navElementName ) {
				var res ;
				res = navElementName.toLowerCase() ;
				while( res.search( ' ' ) != -1 ) {
					res = res.replace( ' ' , '-' ) ;
				}
				return res ;
			} ;
		
			scope.navElementClicked = function( idx ) {
				var i , len , pageName ;
				if( idx != null ) {
					len = scope.navigationFlags.length ;
					for( i = 0 ; i < len ; i++ ) {
						scope.navigationFlags[ i ] = false ;
					}
					scope.showLoadingFlag = true ;
					scope.currentNavIndex = idx ;
					scope.navigationFlags[ idx ] = true ;
					pageName = scope.transformNavElementNameToPageName( scope.navElementNameList[ idx ].name ) ;
					ga( 'send' , 'pageview' , pageName ) ;
				}
			} ;
		
			scope.init = function() {
				var i , len ;
				scope.userHandle = cfcObj.defaultUserHandle ;
				scope.navigationFlags = [] ;
				scope.navElementNameList = cftsObj.getNavigationStructure( scope.userHandle ) ;
				len = scope.navElementNameList.length ;
				for( i = 0 ; i < len ; i++ ) {
					scope.navigationFlags.push( false ) ;
				}
				scope.currentNavIndex = 1 ;
				scope.navElementClicked( scope.currentNavIndex ) ;
			} ;
		
			scope.init() ;
        }
    } ;
}

function CodeforcesTableDirective( $sce , cfcObj , shsObj ) {
	return {
        restrict : 'E' ,
        replace : true ,
		transclude : true ,
        template : '\
        	<table class="table table-striped table-bordered customTable">\
	            <thead>\
	              <th data-ng-repeat="column in columnList" data-ng-style="{\'width\':((column.width!=null)?\'{{column.width}}\':\'\')}">\
	                  <span><a href="javascript:void(0);" data-ng-click="sortColumn($index)">{{column.name}} <span class="glyphicon glyphicon-sort"></span></a></span>\
	              </th>\
	            </thead>\
	            <tbody>\
	              <tr data-ng-repeat="row in rowcellList track by $index" data-ng-init="rowIndex = $index">\
	                <td data-ng-repeat="column in columnList track by $index" data-ng-init="columnIndex = $index">\
	                    <span class="table-cell-generic" data-ng-bind-html="forceTrustHtml( getTableCellHtml( rowIndex , columnIndex ) )"></span>\
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
							if( leftNumber == -1 ) {
								return true ;
							}
							if( rightNumber == -1 ) {
								return false ;
							}
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
							if( leftNumber == -1 ) {
								return true ;
							}
							if( rightNumber == -1 ) {
								return false ;
							}
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

function CodeforcesContestStandingDirective( cfApi , cfcObj , cfsObj , cftsObj ) {
	return {
		restrict : 'E' ,
		replace : true ,
		transclude : true ,
		template : '\
			<div class="panel panel-info">\
				<div class="panel-heading"><h3 data-ng-bind-html="pageHeader"></h3></div>\
				<div class="panel-body">\
					<div class="well well-sm">\
						<div>\
							<span class="filter-span">Filters:</span>\
							<select class="form-control generic-select-tag" data-ng-change="contestSelected()" data-ng-model="selectedContest">\
								<option data-ng-repeat="item in contestList.dataList" data-ng-bind="item.name" value="{{item.id}}" data-ng-init="contestListLoading($index)"></option>\
							</select>\
							<select class="form-control generic-select-tag" data-ng-change="countrySelected()" data-ng-model="selectedCountry">\
								<option value="">Any Country</option>\
								<option data-ng-repeat="item in countryList" data-ng-bind="item.countryName" value="{{item.countryName}}"></option>\
							</select>\
							<button type="button" data-ng-click="clearFilters()" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Clear Filters</button>\
						</div>\
					</div>\
					<codeforces-table-directive column-list="customStandingTableStructure" rowcell-list="contestStandingsList.filteredDataList"></codeforces-table-directive>\
				</div>\
			</div>' ,
		scope : {
	    	'showLoadingFlag' : '=' , 
			'showStandingFlag' : '=' ,
			'pageHeader' : '='
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.clearFilters = function() {
				scope.selectedCountry = '' ;
				scope.countrySelected() ;
			} ;
			
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
			
			scope.showStandingFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					cfApi.getContestList( scope.contestListResponse ) ;
				}
			} ;

			scope.$watch( 'showStandingFlag' , scope.showStandingFlagChanged , true ) ;
			scope.countryList = cfsObj.getCountryList() ;
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
				<div class="panel-heading"><h3 data-ng-bind-html="pageHeader"></h3></div>\
				<div class="panel-body">\
					<div class="well well-sm">\
						<div>\
							Total Accepted Submissions: <span class="badge badge-custom" data-ng-bind="submissionList.summary.totalAccepted+\' / \'+submissionList.summary.total"></span>\
						</div>\
						<div data-ng-show="showContestAccptedSubmissionSummaryFlag==true">\
							Total Accepted Submissions(during contests): <span class="badge badge-custom" data-ng-bind="submissionList.summary.totalInContestAccepted+\' / \'+submissionList.summary.totalInContest"></span>\
						</div>\
						<div>\
							Language usage breakdown: <span class="badge badge-custom" data-ng-repeat="item in submissionList.summary.languages" data-ng-bind="item.name + \' : \' + item.frequency"></span>\
						</div>\
						<div>\
							Verdict distribution breakdown: <span class="label" data-ng-repeat="item in submissionList.summary.verdicts" data-ng-bind="item.name + \' : \' + item.frequency" data-ng-class="item.cssClass"></span>\
						</div>\
						<div>\
							<span class="filter-span">Filters:</span>\
							<select class="form-control generic-select-tag" data-ng-change="filterSubmissionDataList()" data-ng-model="selectedTag">\
								<option value="">Any Tag</option>\
								<option data-ng-repeat="item in tagList" data-ng-bind="item.name+\' (\'+item.frequency+\')\'" value="{{item.name}}"></option>\
							</select>\
							<select class="form-control generic-select-tag" data-ng-change="filterSubmissionDataList()" data-ng-model="selectedLanguage">\
								<option value="">Any Language</option>\
								<option data-ng-repeat="item in languageList" data-ng-bind="item.name+\' (\'+item.frequency+\')\'" value="{{item.name}}"></option>\
							</select>\
							<select class="form-control generic-select-tag" data-ng-change="filterSubmissionDataList()" data-ng-model="selectedVerdict">\
								<option value="">Any Verdict</option>\
								<option data-ng-repeat="item in verdictList" data-ng-bind="item.name+\' (\'+item.frequency+\')\'" value="{{item.name}}"></option>\
							</select>\
							<select class="form-control generic-select-tag" data-ng-change="filterSubmissionDataList()" data-ng-model="selectedCountry">\
								<option value="">Any Country</option>\
								<option data-ng-repeat="item in countryList" data-ng-bind="item.name+\' (\'+item.frequency+\')\'" value="{{item.name}}"></option>\
							</select>\
							<button type="button" data-ng-click="clearFilters()" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Clear Filters</button>\
						</div>\
					</div>\
					<div data-ng-show="showUnofficialOptionCheckbox==true">\
						<input type="checkbox" aria-label="..." data-ng-model="showUnofficialUserSubmissionsFlag" data-ng-change="filterSubmissionDataList()">Show Unofficial\
					</div>\
					<codeforces-table-directive column-list="submissionTableStructure" rowcell-list="submissionList.filteredDataList" ></codeforces-table-directive>\
				</div>\
			</div>' ,
		scope : {
			'submissionListLoadedFlag' : '=' ,
	    	'submissionList' : '=' , 
			'showContestAccptedSubmissionSummaryFlag' : '=' ,
			'showUnofficialOptionCheckbox' : '=' ,
			'pageHeader' : '='
	    } ,
        link: function( scope , element , attrs ) {

			scope.filterSubmissionDataList = function() {
				scope.submissionList.filteredDataList = cfApi.getSubmissionListThroughFilter( scope.submissionList.dataList , scope.selectedVerdict , scope.showUnofficialUserSubmissionsFlag , scope.selectedTag , scope.selectedLanguage , scope.selectedCountry ) ;
			} ;
			
			scope.clearFilters = function() {
				scope.selectedTag = '' ;
				scope.selectedLanguage = '' ;
				scope.selectedVerdict = '' ;
				scope.selectedCountry = '' ;
				scope.showUnofficialUserSubmissionsFlag = true ;
				scope.filterSubmissionDataList() ;
			} ;
			
			scope.userListInfoResponse = function( response ) {
				scope.userInfoList = scope.userInfoList.concat( response.dataList ) ;
				if( scope.submissionList != null && scope.submissionList.summary.users.length > 0 && scope.userInfoList.length == scope.submissionList.summary.users.length ) {
					scope.submissionList = cfApi.updateSubmissionsDataListWithUserInfo( scope.submissionList , scope.userInfoList ) ;
					scope.countryList = scope.submissionList.summary.countriesAlphabeticallySorted ;
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
					scope.tagList = scope.submissionList.summary.tagsAlphabeticallySorted ;
					scope.languageList = scope.submissionList.summary.languagesAlphabeticallySorted ;
					scope.countryList = [] ;
					scope.userInfoList = [] ;
					cfApi.getUserInfo( scope.userListInfoResponse , scope.submissionList.summary.users ) ;
					cfApi.getProblems( scope.problemListResponse ) ;
				}
			} ;
			
			scope.init = function() {
				scope.$watch( 'submissionListLoadedFlag' , scope.submissionListLoadedFlagChanged , true ) ;
				scope.verdictList = [] ;
				scope.selectedVerdict = '' ;
				scope.submissionTableStructure = cftsObj.getCustomSubmissionTableStructure( false ) ;
				scope.showUnofficialUserSubmissionsFlag = true ;
			} ;
			
			scope.init() ;
		}
	} ;
}

function CodeforcesUserStatisticsDirective( cfApi ) {
	return {
		restrict : 'E' ,
		transclude : true ,
		template : '<codeforces-submissions-directive submission-list-loaded-flag="submissionListLoadedFlag" submission-list="submissionList" show-contest-accpted-submission-summary-flag="true" show-unofficial-option-checkbox="true" page-header="pageHeader"></codeforces-submissions-directive>' ,
		scope : {
	    	'showLoadingFlag' : '=' , 
			'showUserStatisticsFlag' : '=' , 
			'userHandle' : '=' ,
			'pageHeader' : '='
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.submissionListResponse = function( response ) {
				scope.submissionList = response ;
				scope.showLoadingFlag = false ;
				scope.submissionListLoadedFlag = true ;
			} ;
			
			scope.showUserStatisticsFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					scope.submissionListLoadedFlag = false ;
					cfApi.getUserSubmissions( scope.submissionListResponse , scope.userHandle ) ;
				}
			} ;

			scope.$watch( 'showUserStatisticsFlag' , scope.showUserStatisticsFlagChanged , true ) ;
		}
	} ;
}

function CodeforcesRecentSubmissionsDirective( cfApi ) {
	return {
		restrict : 'E' ,
		transclude : true ,
		template : '<codeforces-submissions-directive submission-list-loaded-flag="submissionListLoadedFlag" submission-list="submissionList" show-contest-accpted-submission-summary-flag="false" show-unofficial-option-checkbox="false" page-header="pageHeader"></codeforces-submissions-directive>' ,
		scope : {
	    	'showLoadingFlag' : '=' , 
			'showRecentSubmissionsFlag' : '=' ,
			'pageHeader' : '='
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.submissionListResponse = function( response ) {
				scope.submissionList = response ;
				scope.showLoadingFlag = false ;
				scope.submissionListLoadedFlag = true ;
			} ;
			
			scope.showRecentSubmissionsFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					scope.submissionListLoadedFlag = false ;
					cfApi.getRecentSubmissionsForAllInPractice( scope.submissionListResponse ) ;
				}
			} ;

			scope.$watch( 'showRecentSubmissionsFlag' , scope.showRecentSubmissionsFlagChanged , true ) ;
		}
	} ;
}

function CodeforcesContestSubmissionsDirective( cfApi , cfcObj ) {
	return {
		restrict : 'E' ,
		transclude : true ,
		replace : true ,
		template : '\
			<div>\
				<div class="well well-sm">\
					<span class="filter-span">Select Contest:</span>\
					<select class="form-control generic-select-tag" data-ng-change="contestSelected()" data-ng-model="selectedContest">\
						<option data-ng-repeat="item in contestList.dataList" data-ng-bind="item.name" value="{{item.id}}" data-ng-init="contestListLoading($index)"></option>\
					</select>\
				</div>\
				<codeforces-submissions-directive submission-list-loaded-flag="submissionListLoadedFlag" submission-list="submissionList" show-contest-accpted-submission-summary-flag="false" show-unofficial-option-checkbox="false" page-header="pageHeader"></codeforces-submissions-directive>\
			</div>' ,
		scope : {
	    	'showLoadingFlag' : '=' , 
			'showContestSubmissionsFlag' : '=' ,
			'pageHeader' : '='
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.submissionListResponse = function( response ) {
				scope.submissionList = response ;
				scope.showLoadingFlag = false ;
				scope.submissionListLoadedFlag = true ;
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
					scope.submissionListLoadedFlag = false ;
					cfApi.getContestStatus( scope.submissionListResponse , scope.selectedContest , 1 , 1000 ) ;
				}
			} ;
			
			scope.showContestSubmissionsFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					scope.submissionListLoadedFlag = false ;
					cfApi.getContestList( scope.contestListResponse ) ;
				}
			} ;

			scope.$watch( 'showContestSubmissionsFlag' , scope.showContestSubmissionsFlagChanged , true ) ;
		}
	} ;
}

function CodeforcesProblemSetDirective( cfApi , cftsObj ) {
	return {
		restrict : 'E' ,
		transclude : true ,
		replace : true ,
		template : '\
			<div class="panel panel-info">\
				<div class="panel-heading"><h3 data-ng-bind-html="pageHeader"></h3></div>\
				<div class="panel-body">\
					<div class="well well-sm">\
						<div>\
							<span class="filter-span">Filters:</span>\
							<select class="form-control generic-select-tag" data-ng-change="filterProblemSetDataList()" data-ng-model="selectedTag">\
								<option value="">Any Tag</option>\
								<option data-ng-repeat="item in tagList" data-ng-bind="item.name+\' (\'+item.frequency+\')\'" value="{{item.name}}"></option>\
							</select>\
							<select class="form-control generic-select-tag" data-ng-change="filterProblemSetDataList()" data-ng-model="selectedPoint">\
								<option value="">Any Points</option>\
								<option data-ng-repeat="item in pointList" data-ng-bind="item.name+\' (\'+item.frequency+\')\'" value="{{item.name}}"></option>\
							</select>\
							<select class="form-control generic-select-tag" data-ng-change="filterProblemSetDataList()" data-ng-model="selectedProblemIndex">\
								<option value="">Any Problem Index</option>\
								<option data-ng-repeat="item in problemIndexList" data-ng-bind="item.name+\' (\'+item.frequency+\')\'" value="{{item.name}}"></option>\
							</select>\
							<button type="button" data-ng-click="clearFilters()" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Clear Filters</button>\
						</div>\
					</div>\
					<codeforces-table-directive column-list="customProblemSetTableStructure" rowcell-list="problemSetListObj.filteredDataList"></codeforces-table-directive>\
				</div>\
			</div>' ,
		scope : {
	    	'showLoadingFlag' : '=' , 
			'showProblemSetFlag' : '=' ,
			'pageHeader' : '='
	    } ,
        link: function( scope , element , attrs ) {
			
			scope.clearFilters = function() {
				scope.selectedTag = '' ;
				scope.selectedProblemIndex = '' ;
				scope.selectedPoint = '' ;
			} ;
			
			scope.filterProblemSetDataList = function() {
				scope.problemSetListObj.filteredDataList = cfApi.getProblemTableListThroughFilter( scope.problemSetListObj.dataList , scope.selectedTag , scope.selectedProblemIndex , scope.selectedPoint ) ;
			} ;
			
			scope.problemSetListResponse = function( response ) {
				scope.problemSetListObj = response ;
				scope.showLoadingFlag = false ;
				scope.clearFilters() ;
				scope.tagList = response.summary.tagsAlphabeticallySorted ;
				scope.problemIndexList = response.summary.problemIndexesAlphabeticallySorted ;
				scope.pointList = response.summary.pointsAlphabeticallySorted ;
			} ;
			
			scope.showProblemSetFlagChanged = function( newValue , oldValue ) {
				if( newValue == true ) {
					cfApi.getProblemTableList( scope.problemSetListResponse ) ;
				}
			} ;

			scope.$watch( 'showProblemSetFlag' , scope.showProblemSetFlagChanged , true ) ;
			scope.customProblemSetTableStructure = cftsObj.getCustomProblemSetTableStructure() ;
		}
	} ;
}
