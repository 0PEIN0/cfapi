/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

function CodeforcesApiService( $http , $timeout , $sce , lssObj , cfsObj , cfcObj , shObj ) {
	var self ;

	self = {} ;
	self.cfsObj = cfsObj ;
	self.cfcObj = cfcObj ;
	self.shObj = shObj ;
	self.cfaubObj = new CodeforcesApiUrlBuilder( self.cfsObj , self.cfcObj ) ;
	self.cfdlpObj = new CodeforcesDataListParser( self.cfsObj , self.cfcObj , self.shObj ) ;
	self.cfcObj.angularHttpObj = $http ;
	self.cfcObj.jsonpUrlParameter = self.cfsObj.angularJsonpRequestQueryParameter ;

	self.checkValidityOfResponse = function( data ) {
		if( data.status != 'OK' ) {
			throw new Error( 'Ajax response status is not "OK", fatal error!' ) ;
		}
		return data.result ;
	} ;

	self.makeJsonpRequest = function( url , dataParsingCallbackFunction , callbackFunction , isLocalStorageMaterial ) {
		if( dataParsingCallbackFunction == null ) {
			throw new Error( 'No dataParsingCallbackFunction parameter is supplied for makeJsonpRequest method!' ) ;
		}
		if( callbackFunction == null ) {
			throw new Error( 'No callbackFunction parameter is supplied for makeJsonpRequest method!' ) ;
		}
		if( isLocalStorageMaterial == true ) {
			var responseData ; 
			responseData = lssObj.Get( 'Codeforces:' + url ) ;
			if( responseData != null ) {
				responseData = dataParsingCallbackFunction( responseData ) ;
				callbackFunction( responseData ) ;
				return ;
			}
		}
		if( self.cfcObj.angularHttpObj != null ) {
			self.cfcObj.angularHttpObj.jsonp( url ).success( function( responseData ) {
				responseData = self.checkValidityOfResponse( responseData ) ;
				responseData = dataParsingCallbackFunction( responseData ) ;
				callbackFunction( responseData ) ;
				if( isLocalStorageMaterial == true ) {
					lssObj.Set( 'Codeforces:' + url , responseData ) ;
				}
			} );
		}
		else {
			throw new Error( 'No http object is supplied!' ) ;
		}
	} ;
	
	self.makeJsonpRequestSingleParameter = function( paramList ) {
		self.makeJsonpRequest( paramList.url , paramList.dataParsingCallbackFunction , paramList.callbackFunction , paramList.isLocalStorageMaterial ) ;
	} ;
	
	this.getDefaultUserHandle = function() {
		return self.cfcObj.defaultUserHandle ;
	} ;

	this.getContestHacks = function( callbackFunction , contestId ) {
		self.makeJsonpRequest( self.cfaubObj.buildContestHacksUrl( contestId ) , self.cfdlpObj.parseDefaultNoParsing , callbackFunction , false ) ;
	} ;

	this.getContestList = function( callbackFunction ) {
		self.makeJsonpRequest( self.cfaubObj.buildContestListUrl( false ) , self.cfdlpObj.parseContestList , callbackFunction , false ) ;
	} ;

	this.getContestListOnlyGym = function( callbackFunction ) {
		self.makeJsonpRequest( self.cfaubObj.buildContestListUrl( true ) , self.cfdlpObj.parseContestList , callbackFunction , false ) ;
	} ;

	this.getOfficialContestStandings = function( callbackFunction , contestId , room , from , count , handles ) {
		self.makeJsonpRequest( self.cfaubObj.buildContestStandingsUrl( contestId , from , count , handles , room , false ) , self.cfdlpObj.parseContestStandings , callbackFunction , false ) ;
	} ;
	
	this.getOfficialContestStandingsByCountry = function( standingList , userInfoList , countryName ) {
		return self.cfdlpObj.parseContestStandingsByCountry( standingList , userInfoList , countryName ) ;
	} ;
	
	this.updateContestStandingsList = function( standingListObj , userInfoList ) {
		var res ;
		res = standingListObj ;
		res.dataList = self.cfdlpObj.parseContestStandingsWithUserInfo( standingListObj.dataList , userInfoList ) ;
		return res ;
	} ;

	this.getContestStandingsIncludingUnofficial = function( callbackFunction , contestId , room , from , count , handles ) {
		self.makeJsonpRequest( self.cfaubObj.buildContestStandingsUrl( contestId , from , count , handles , room , true ) , self.cfdlpObj.parseContestStandings , callbackFunction , false ) ;
	} ;

	this.getContestStatus = function( callbackFunction , contestId , from , count , handle ) {
		self.makeJsonpRequest( self.cfaubObj.buildContestStatusUrl( contestId , handle , from , count , true ) , self.cfdlpObj.parseSubmissions , callbackFunction , false ) ;
	} ;

	this.getProblems = function( callbackFunction , tags ) {
		self.makeJsonpRequest( self.cfaubObj.buildProblemsUrl( tags ) , self.cfdlpObj.parseProblemSet , callbackFunction , false ) ;
	} ;
	
	this.getProblemTableList = function( callbackFunction , tags ) {
		self.makeJsonpRequest( self.cfaubObj.buildProblemsUrl( tags ) , self.cfdlpObj.parseProblemSetForTableData , callbackFunction , false ) ;
	} ;
	
	this.getProblemTableListThroughFilter = function( problemSetList , tagName , problemIndex , problemPoint ) {
		return self.cfdlpObj.parseProblemSetForTableDataThroughFilter( problemSetList , tagName , problemIndex , problemPoint ) ;
	} ;

	this.getRecentSubmissionsForAllInPractice = function( callbackFunction , count ) {
		self.makeJsonpRequest( self.cfaubObj.buildRecentSubmissionsForAllInPracticeUrl( count ) , self.cfdlpObj.parseSubmissions , callbackFunction , false ) ;
	} ;
	
	this.getSubmissionListThroughFilter = function( submissionList , verdictName , showUnofficialSubmissions , tagName , languageName , countryList , problemIndex , problemPoint ) {
		return self.cfdlpObj.parseSubmissionListThroughFilter( submissionList , verdictName , showUnofficialSubmissions , tagName , languageName , countryList , problemIndex , problemPoint ) ;
	} ;
	
	this.updateSubmissionsDataListWithUserInfo = function( submissionsListObj , userInfoList ) {
		var res ;
		res = self.cfdlpObj.parseSubmissionsWithUserInfo( submissionsListObj , userInfoList ) ;
		return res ;
	} ;
	
	this.updateSubmissionsDataListwithProblemInfo = function( submissionsListObj , problemSetListObj ) {
		var res ;
		res = submissionsListObj ;
		res.dataList = self.cfdlpObj.parseSubmissionsWithProblemSet( submissionsListObj.dataList , problemSetListObj.dataList ) ;
		return res ;
	} ;

	this.getUserInfo = function( callbackFunction , userHandles ) {
		var i , sz , seperator , handlesOnHand , lim ;
		seperator = ';' ;
		lim = self.cfcObj.perApiRequestUserHandleLimit ;
		sz = userHandles.length ;
		handlesOnHand = '' ;
		for( i = 0 ; i < sz ; i++ ) {
			if( handlesOnHand != '' ) {
				handlesOnHand += seperator ;
			}
			handlesOnHand += userHandles[ i ] ;
			if( ( i > 0 && i % lim == 0 ) || i == sz - 1 ) {
				$timeout( self.makeJsonpRequestSingleParameter , self.cfcObj.subsequentApiCallTimeoutInMilliseconds , true , { url : self.cfaubObj.buildUserInfoUrl( handlesOnHand ) , dataParsingCallbackFunction : self.cfdlpObj.parseUserListInfo , callbackFunction : callbackFunction , isLocalStorageMaterial : false } ) ;
				handlesOnHand = '' ;
			}
		}
	} ;

	this.getRatedUsers = function( callbackFunction ) {
		self.makeJsonpRequest( self.cfaubObj.buildRaterUsersUrl( false ) , self.cfdlpObj.parseDefaultNoParsing , callbackFunction , true ) ;
	} ;

	this.getActiveRatedUsers = function( callbackFunction ) {
		self.makeJsonpRequest( self.cfaubObj.buildRaterUsersUrl( true ) , self.cfdlpObj.parseDefaultNoParsing , callbackFunction , false ) ;
	} ;

	this.getUserRating = function( callbackFunction , userHandle ) {
		self.makeJsonpRequest( self.cfaubObj.buildUserRatingUrl( userHandle ) , self.cfdlpObj.parseDefaultNoParsing , callbackFunction , false ) ;
	} ;

	this.getUserSubmissions = function( callbackFunction , userHandle , from , count ) {
		self.makeJsonpRequest( self.cfaubObj.buildUserStatusUrl( userHandle , from , count ) , self.cfdlpObj.parseSubmissions , callbackFunction , false ) ;
	} ;
}
