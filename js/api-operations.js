/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

function CodeforcesApiUrlBuilder( cfsObj , cfcObj ) {
	var self ;

	self = {} ;

	self.checkContestStandingsParameters = function( params ) {
		if( params.from == null || params.from == '' ) {
			params.from = '1' ;
		}
		if( params.count == null || params.count == '' ) {
			params.count = '' + cfcObj.defaultContestStandingCount ;
		}
		if( params.handles == null ) {
			params.handles = '' ;
		}
		if( params.room == null || params.room == '' ) {
			params.room = '' ;
		}
		return params ;
	} ;

	self.checkContestStatusParameters = function( params ) {
		if( params.from == null || params.from == '' ) {
			params.from = '1' ;
		}
		if( params.count == null || params.count == '' ) {
			params.count = '' + cfcObj.defaultContestStatusCount ;
		}
		if( params.handle == null ) {
			params.handle = '' ;
		}
		return params ;
	} ;

	self.checkUserSubmissionsParameters = function( params ) {
		if( params.from == null || params.from == '' ) {
			params.from = '1' ;
		}
		if( params.count == null || params.count == '' ) {
			params.count = '' + cfcObj.defaultUserSubmissions ;
		}
		return params ;
	} ;

	this.buildContestHacksUrl = function( contestId ) {
		if( contestId == null || contestId == '' ) {
			throw new Error( 'Empty contest id provided!' ) ;
		}
		return cfsObj.baseUrl + 'contest.hacks?' + cfcObj.jsonpUrlParameter + '&contestId=' + contestId ;
	} ;

	this.buildContestListUrl = function( showGymContests ) {
		if( showGymContests == null ) {
			throw new Error( 'Empty "showGymContests" parameter provided!' ) ;
		}
		return cfsObj.baseUrl + 'contest.list?' + cfcObj.jsonpUrlParameter + '&gym=' + showGymContests ;
	} ;

	this.buildContestStandingsUrl = function( contestId , from , count , handles , room , showUnofficial ) {
		if( contestId == null || contestId == '' ) {
			throw new Error( 'Empty contest id provided!' ) ;
		}
		var params ;
		params = {} ;
		params.from = from ;
		params.count = count ;
		params.handles = handles ;
		params.room = room ;
		params = self.checkContestStandingsParameters( params ) ;
		return cfsObj.baseUrl + 'contest.standings?' + cfcObj.jsonpUrlParameter + '&contestId=' + contestId + '&from=' + params.from + '&count=' + params.count + '&handles=' + params.handles + '&room=' + params.room + '&showUnofficial=' + showUnofficial ;
	} ;

	this.buildContestStatusUrl = function( contestId , handle , from , count ) {
		if( contestId == null || contestId == '' ) {
			throw new Error( 'Empty contest id provided!' ) ;
		}
		var params ;
		params = {} ;
		params.handle = handle ;
		params.from = from ;
		params.count = count ;
		params = self.cfaubObj.checkContestStatusParameters( params ) ;
		return cfsObj.baseUrl + 'contest.status?' + cfcObj.jsonpUrlParameter + '&contestId=' + contestId + '&handle=' + params.handle + '&from=' + params.from + '&count=' + params.count ;
	} ;

	this.buildProblemsUrl = function( tags ) {
		if( tags == null ) {
			tags = '' ;
		}
		return cfsObj.baseUrl + 'problemset.problems?' + cfcObj.jsonpUrlParameter + '&tags=' + tags ;
	} ;

	this.buildRecentSubmissionsForAllInPracticeUrl = function( count ) {
		if( count == null || count == '' ) {
			count = cfcObj.defaultRecentSubmissions ;
		}
		return cfsObj.baseUrl + 'problemset.recentStatus?' + cfcObj.jsonpUrlParameter + '&count=' + count  ;
	} ;
	
	this.buildSubmissionListUrl = function( count ) {
		if( count == null || count == '' ) {
			count = cfcObj.defaultRecentSubmissions ;
		}
		return cfsObj.baseUrl + 'problemset.recentStatus?' + cfcObj.jsonpUrlParameter + '&count=' + count  ;
	} ;

	this.buildUserInfoUrl = function( userHandles ) {
		if( userHandles == null || userHandles == '' ) {
			throw new Error( 'Empty user handle provided!' ) ;
		}
		return cfsObj.baseUrl + 'user.info?' + cfcObj.jsonpUrlParameter + '&handles=' + userHandles ;
	} ;

	this.buildRaterUsersUrl = function( isActiveOnly ) {
		if( isActiveOnly == null ) {
			throw new Error( 'Empty "isActiveOnly" parameter provided!' ) ;
		}
		return cfsObj.baseUrl + 'user.ratedList?' + cfcObj.jsonpUrlParameter + '&activeOnly=' + isActiveOnly ;
	} ;

	this.buildUserRatingUrl = function( userHandle ) {
		if( userHandle == null || userHandle == '' ) {
			throw new Error( 'Empty user handle provided!' ) ;	
		}
		return cfsObj.baseUrl + 'user.rating?' + cfcObj.jsonpUrlParameter + '&handle=' + userHandle ;
	} ;

	this.buildUserStatusUrl = function( userHandle , from , count ) {
		if( userHandle == null || userHandle == '' ) {
			throw new Error( 'Empty user handle provided!' ) ;	
		}
		var params ;
		params = {} ;
		params.from = from ;
		params.count = count ;
		params = self.checkUserSubmissionsParameters( params ) ;
		return cfsObj.baseUrl + 'user.status?' + cfcObj.jsonpUrlParameter + '&handle=' + userHandle + '&from=' + params.from + '&count=' + params.count ;
	} ;
}

function CodeforcesDataListParser( cfsObj , cfcObj , shObj ) {
	var self ;
	
	self = {} ;

	self.transformVerdicts = function( textString ) {
		textString = shObj.replaceAssociatedStrings( cfsObj.verdictTextReplacements , textString ) ;
		textString = shObj.makeTheFirstCharacterOfStringCapitalized( textString ) ;
		return textString ;
	} ;

	self.formatVerdictTextsToShow = function( dataObject ) {
		var i , sz , verdictText , fl ;
		sz = cfsObj.verdictDoesntHasCaseNumberToShow.length ;
		verdictText = dataObject.verdict ;
		fl = 0 ;
		for( i = 0 ; i < sz ; i++ ) {
			if( dataObject.verdict == cfsObj.verdictDoesntHasCaseNumberToShow[ i ] ) {
				fl = 1 ;
				break ;
			}
		}
		if( fl == 0 ) {
			verdictText = dataObject.verdict + ' on test ' + ( dataObject.passedTestCount + 1 ) ;
		}
		return verdictText ;
	} ;

	self.buildCssClassFromVerdict = function( verdict ) {
		var verdictTextCssClass ;
		verdictTextCssClass = 'label-' + verdict.toLowerCase() ;
		while( verdictTextCssClass.search( ' ' ) != -1 ) {
			verdictTextCssClass = verdictTextCssClass.replace( ' ' , '-' ) ;
		}
		return verdictTextCssClass ;
	} ;

	self.makeDateTimeStringFromMilliseconds = function( timeInSeconds ) {
		var res , timeInMilliseconds , dateObj ;
		timeInMilliseconds = ( timeInSeconds - 3600 * cfcObj.timeZoneOffsetInHours ) * 1000 ;
		dateObj = new Date( timeInMilliseconds ) ;
		if( dateObj.getFullYear() <= 2014 ) {
			timeInMilliseconds = ( timeInSeconds - 3600 * ( cfcObj.timeZoneOffsetInHours - 1 ) ) * 1000 ;
			dateObj = new Date( timeInMilliseconds ) ;
		}
		res = self.formatCodeforcesDateTimeStringFromDateObject( dateObj ) ;
		return res ;
	} ;

	self.formatCodeforcesDateTimeStringFromDateObject = function( dateObject ) {
		var res , day , month , hour , minute , second ;
		res = '' ;
		day = '' + dateObject.getDate() ;
		if( day.length == 1 ) {
			day = '0' + day ;
		}
		res += day ;
		res += '-' ;
		month = '' + ( dateObject.getMonth() + 1 ) ;
		if( month.length == 1 ) {
			month = '0' + month ;
		}
		res += month ;
		res += '-' ;
		res += '' + dateObject.getFullYear() ;
		res += ' ' ;
		hour = '' + dateObject.getHours() ;
		if( hour.length == 1 ) {
			hour = '0' + hour ;
		}
		res += hour ;
		res += ':' ;
		minute = '' + dateObject.getMinutes() ;
		if( minute.length == 1 ) {
			minute = '0' + minute ;
		}
		res += minute ;
		res += ':' ;
		second = '' + dateObject.getSeconds() ;
		if( second.length == 1 ) {
			second = '0' + second ;
		}
		res += second ;
		return res ;
	} ;

	self.generateHandleHtml = function( dataObject , propertyName , userInfoObj ) {
		var i , sz , authorHandles , handle , countryImageHtml , countryList , memberList , userHandleCssClass , cssClassList , ratingDesignationList , rankString ;
		if( dataObject[ propertyName ].members != null ) {
			memberList = dataObject[ propertyName ].members ;
		}
		else {
			memberList = dataObject[ propertyName ] ;
		}
		ratingDesignationList = cfsObj.ratingDesignations ;
		cssClassList = cfsObj.ratingCssClasses ;
		sz = ratingDesignationList.length ;
		userHandleCssClass = '' ;
		if( userInfoObj != null ) {
			if( userInfoObj.rank == null || userInfoObj.rank == '' ) {
				rankString = 'unrated' ;
			}
			else {
				rankString = userInfoObj.rank.toLowerCase() ;
			}
			for( i = 0 ; i < sz ; i++ ) {
				if( ratingDesignationList[ i ] != null && ratingDesignationList[ i ].toLowerCase() == rankString ) {
					userHandleCssClass = cssClassList[ i ] ;
					break ;
				}
			}
		}
		sz = memberList.length ;
		authorHandles = '' ;
		countryList = cfsObj.getCountryListAsObject() ;
		for( i = 0 ; i < sz ; i++ ) {
			handle = memberList[ i ].handle ;
			countryImageHtml = '' ;
			if( userInfoObj != null && userInfoObj.country != null && userInfoObj.country != '' && countryList[ userInfoObj.country ] != null ) {
				countryImageHtml = '<a target="_blank" href="http://codeforces.com/ratings/country/' + userInfoObj.country + '">' + '<img title="' + userInfoObj.country + '" alt="' + userInfoObj.country + '" class="flag-img" src="' + countryList[ userInfoObj.country ] + '"></a>' ;
			}
			authorHandles += countryImageHtml + '<a target="_blank" href="http://codeforces.com/profile/' + handle + '">' + '<div class="user-rating-core ' + userHandleCssClass + '">' + handle + '</div>' + '</a>' ;
		}
		if( dataObject[ propertyName ].teamName != null && dataObject[ propertyName ].teamName != '' ) {
			authorHandles += ' (<a target="_blank" href="http://codeforces.com/team/' + dataObject[ propertyName ].teamId + '">' + dataObject[ propertyName ].teamName + '</a>)' ;
		}
		return authorHandles ;
	} ;
	
	self.generateProblemHtml = function( dataObject ) {
		var problemHtml ;
		problemHtml = '' ;
		problemHtml += '<a target="_blank" href="http://codeforces.com/problemset/problem/' + dataObject.problem.contestId + '/' + dataObject.problem.index + '"><div>' + dataObject.problem.name + '</div></a>' ;
		if( dataObject.problem.contestId != null && dataObject.problem.index != null ) {
			problemHtml += '<span class="problem-info">(' + dataObject.problem.contestId + '-' + dataObject.problem.index + ')</span>' ;
		}
		if( dataObject.problem.points != null ) {
			problemHtml += '<span class="problem-info">POINTS: ' + dataObject.problem.points + '</span>' ;
		}
		return problemHtml ;
	} ;
	
	self.buildSubmissionIdHtml = function( dataObject ) {
		var res ;
		res = '' ;
		if( dataObject.problem.contestId < 100000 ) {
			res += '<a target="_blank" href="http://codeforces.com/contest/' + dataObject.problem.contestId + '/submission/' + dataObject.id + '"><div>' + dataObject.id + '</div></a>' ;
		}
		else {
			res += '' + dataObject.id ;
		}
		return res ;
	} ;

	self.buildUserStandingObject = function( dataObject , summary ) {
		var userStanding , i , sz ;
		userStanding = {} ;
		userStanding.rank = dataObject.rank ;
		userStanding.rankHtml = '' + dataObject.rank ;
		userStanding.handle = dataObject.authorHandles ;
		userStanding.handleHtml = self.generateHandleHtml( dataObject , 'party' , null ) ;
		userStanding.points = dataObject.points ;
		userStanding.pointsHtml = '<div class="standings-cell-points">' + dataObject.points + '</div>' ;
		userStanding.penalty = dataObject.penalty ;
		userStanding.penaltyHtml = '' + dataObject.penalty ;
		userStanding.hacks = dataObject.successfulHackCount ;
		userStanding.hacksUnsuccessful = dataObject.unsuccessfulHackCount ;
		userStanding.hacksHtml = '<div class="standing-cell-challenge-parent-div">' ;
		if( dataObject.successfulHackCount > 0 ) {
			userStanding.hacksHtml += '<div class="standings-cell-challenge-success">' + '+' + dataObject.successfulHackCount + '</div>' ;
		}
		if( dataObject.successfulHackCount > 0 && dataObject.unsuccessfulHackCount > 0 ) {
			userStanding.hacksHtml += '<div class="standings-cell-challenge-seperator">' + ' : ' + '</div>' ;
		}
		if( dataObject.unsuccessfulHackCount > 0 ) {
			userStanding.hacksHtml += '<div class="standings-cell-challenge-fail">' + '-' + dataObject.unsuccessfulHackCount + '</div>' ;
		}
		userStanding.hacksHtml += '</div>' ;
		sz = dataObject.problemResults.length ;
		for( i = 0 ; i < sz ; i++ ) {
			userStanding[ String.fromCharCode( 'a'.charCodeAt( 0 ) + i ) ] = dataObject.problemResults[ i ].points ;
			if( dataObject.problemResults[ i ].points == 0 ) {
				if( dataObject.problemResults[ i ].rejectedAttemptCount > 0 ) {
					userStanding[ String.fromCharCode( 'a'.charCodeAt( 0 ) + i ) + 'Html' ] = '<div class="standings-cell-core standings-cell-not-accepted">' + '-' + dataObject.problemResults[ i ].rejectedAttemptCount + '</div>' ;
				}
				else {
					userStanding[ String.fromCharCode( 'a'.charCodeAt( 0 ) + i ) + 'Html' ] = '' ;
				}
			}
			else {
				userStanding[ String.fromCharCode( 'a'.charCodeAt( 0 ) + i ) + 'Html' ] = '<div class="standings-cell-core standings-cell-accepted">' + dataObject.problemResults[ i ].points + '</div>' ;
			}
		}
		return userStanding ;
	} ;
	
	self.buildSubmissionObject = function( dataObject ) {
		var submission ;
		submission = {} ;
		submission.id = dataObject.id ;
		submission.idHtml = self.buildSubmissionIdHtml( dataObject ) ;
		submission.dateTime = dataObject.creationDateTimeString ;
		submission.dateTimeHtml = dataObject.creationDateTimeString ;
		submission.handle = dataObject.authorHandles ;
		submission.handleHtml = self.generateHandleHtml( dataObject , 'author' , null ) ;
		submission.problemName = dataObject.problem.name ;
		submission.problemNameHtml = self.generateProblemHtml( dataObject ) ;
		submission.problemTags = dataObject.problem.tags.join( ', ' ) ;
		submission.problemTagsHtml = '<span class="problem-info">' + submission.problemTags + '</span>' ;
		submission.problemIdentification = '' + dataObject.problem.contestId + '-' + dataObject.problem.index ;
		submission.userSolved = 0 ;
		submission.userSolvedHtml = '' ;
		submission.lang = dataObject.programmingLanguage ;
		submission.langHtml = dataObject.programmingLanguage ;
		submission.verdict = dataObject.verdictText ;
		submission.verdictHtml = '<span class="label ' + dataObject.verdictTextCssClass + '">' + dataObject.verdictText + '</span>' ;
		submission.executionTime = dataObject.timeConsumedSeconds ;
		submission.executionTimeHtml = '' + dataObject.timeConsumedSeconds ;
		submission.executionMemory = dataObject.memoryConsumedMegaBytes ;
		submission.executionMemoryHtml = '' + dataObject.memoryConsumedMegaBytes + ' MB' ;
		return submission ;
	} ;
	
	self.getAuthorList = function( dataList ) {
		var authorList , i , sz1 , j , sz2 , userMap , mapCnt ;
		authorList = [] ;
		userMap = [] ;
		mapCnt = 1 ;
		sz1 = dataList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			sz2 = dataList[ i ].authorHandles.length ;
			for( j = 0 ; j < sz2 ; j++ ) {
				if( userMap[ dataList[ i ].authorHandles[ j ].handle ] == null ) {
					userMap[ dataList[ i ].authorHandles[ j ].handle ] = mapCnt++ ;
					authorList.push( dataList[ i ].authorHandles[ j ].handle ) ;
				}
			}
		}
		return authorList ;
	} ;

	this.parseDefaultNoParsing = function( data ) {
		var res ;
		res = {} ;
		res.dataList = data ;
		res.summary = {} ;
		res.summary.total = data.length ;
		return res ;
	} ;
	
	this.parseContestList = function( data ) {
		var res , i , sz ;
		res = {} ;
		res.summary = {} ;
		sz = data.length ;
		res.dataList = [] ;
		for( i = 0 ; i < sz ; i++ ) {
			if( data[ i ].phase != 'BEFORE' ) {
				res.dataList.push( data[ i ] ) ;
			}
		}
		res.summary.total = res.dataList.length ;
		res.summary.initialLoadContestId = res.dataList[ 0 ].id ;
		if( cfcObj.defaultContestId != null && cfcObj.defaultContestId != '' ) {
			res.summary.initialLoadContestId = cfcObj.defaultContestId ;
		}
		return res ;
	} ;

	this.parseContestStandings = function( data ) {
		var res , i , sz1 , userStanding ;
		res = {} ;
		res.dataList = [] ;
		res.summary = {} ;
		res.summary.contest = data.contest ;
		res.summary.problems = data.problems ;
		res.summary.total = data.rows.length ;
		res.summary.hasPenalty = false ;
		res.summary.hasHacks = false ;
		data = data.rows ;
		sz1 = data.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			data[ i ].authorHandles = data[ i ].party.members ;
			userStanding = self.buildUserStandingObject( data[ i ] , res.summary ) ;
			if( userStanding.penalty > 0 ) {
				res.summary.hasPenalty = true ;
			}
			if( data[ i ].successfulHackCount > 0 || data[ i ].unsuccessfulHackCount > 0 ) {
				res.summary.hasHacks = true ;
			}
			res.dataList.push( userStanding ) ;
		}
		res.filteredDataList = res.dataList ;
		res.summary.users = self.getAuthorList( data ) ;
		res.summary.numberOfProblems = res.summary.problems.length ;
		return res ;
	} ;
	
	this.parseProblemSet = function( data ) {
		var res , i , len ;
		res = {} ;
		res.dataList = data.problems ;
		len = res.dataList.length ;
		for( i = 0 ; i < len ; i++ ) {
			res.dataList[ i ].solvedCount = data.problemStatistics[ i ].solvedCount ;
		}
		res.summary = {} ;
		res.summary.total = data.problems.length ;
		return res ;
	} ;
	
	this.parseContestStandingsWithUserInfo = function( standingList , userInfoList ) {
		var i , sz1 , j , sz2 ;
		sz1 = standingList.length ;
		sz2 = userInfoList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			for( j = 0 ; j < sz2 ; j++ ) {
				if( standingList[ i ].handle[ 0 ].handle == userInfoList[ j ].handle )  {
					standingList[ i ].handleHtml = self.generateHandleHtml( standingList[ i ] , 'handle' , userInfoList[ j ] ) ;
					break ;
				}
			}
		}
		return standingList ;
	} ;
	
	this.parseContestStandingsByCountry = function( standingList , userInfoList , countryName ) {
		var i , sz1 , res , j , sz2 , rank ;
		res = [] ;
		sz1 = standingList.length ;
		sz2 = userInfoList.length ;
		rank = 1 ;
		for( i = 0 ; i < sz1 ; i++ ) {
			for( j = 0 ; j < sz2 ; j++ ) {
				if( standingList[ i ].handle != null && standingList[ i ].handle[ 0 ] != null && standingList[ i ].handle[ 0 ].handle != null && userInfoList[ j ].handle != null ) {
					if( standingList[ i ].handle[ 0 ].handle == userInfoList[ j ].handle && userInfoList[ j ].country == countryName ) {
						standingList[ i ].relativeRank = rank++ ;
						standingList[ i ].relativeRankHtml = '' + standingList[ i ].relativeRank ;
						res.push( standingList[ i ] ) ;
						break ;
					}
				}
			}
		}
		return res ;
	} ;
	
	this.parseUserListInfo = function( data ) {
		var res , i , sz ;
		res = {} ;
		res.dataList = [] ;
		res.summary = {} ;
		res.summary.total = data.length ;
		sz = data.length ;
		for( i = 0 ; i < sz ; i++ ) {
			res.dataList.push( data[ i ] ) ;
		}
		return res ;
	} ;

	this.parseSubmissions = function( data ) {
		var i , sz1 , res , j , sz2 , fl , submission ;
		res = {} ;
		res.dataList = [] ;
		res.summary = {} ;
		sz1 = data.length ;
		res.summary.total = data.length ;
		res.summary.totalAccepted = 0 ;
		res.summary.totalInContest = 0 ;
		res.summary.totalInContestAccepted = 0 ;
		res.summary.languages = [] ;
		res.summary.verdicts = [] ;
		for( i = 0 ; i < sz1 ; i++ ) {
			data[ i ].creationDateTimeString = self.makeDateTimeStringFromMilliseconds( data[ i ].creationTimeSeconds ) ;
			data[ i ].problemName = data[ i ].problem.name ;
			data[ i ].authorHandles = data[ i ].author.members ;
			data[ i ].timeConsumedSeconds = shObj.roundToDecimalPlaces( ( data[ i ].timeConsumedMillis / 1000 ) , 3 ) ;
			data[ i ].memoryConsumedMegaBytes = shObj.roundToDecimalPlaces( ( data[ i ].memoryConsumedBytes / ( 1024 * 1024 ) ) , 2 ) ;
			data[ i ].verdict = self.transformVerdicts( data[ i ].verdict ) ;
			data[ i ].verdictText = self.formatVerdictTextsToShow( data[ i ] ) ;
			data[ i ].inContestSubmission = ( data[ i ].author.participantType == 'CONTESTANT' ) ? true : false ;
			data[ i ].verdictTextCssClass = self.buildCssClassFromVerdict( data[ i ].verdict ) ;
			submission = self.buildSubmissionObject( data[ i ] ) ;
			res.dataList.push( submission ) ;
			//summary calculations
			if( data[ i ].inContestSubmission == true ) {
				res.summary.totalInContest++ ;
			}
			if( data[ i ].verdict == 'Accepted' ) {
				res.summary.totalAccepted++ ;
				if( data[ i ].inContestSubmission == true ) {
					res.summary.totalInContestAccepted++ ;
				}
			}
			sz2 = res.summary.languages.length ;
			fl = 0 ;
			for( j = 0 ; j < sz2 ; j++ ) {
				if( res.summary.languages[ j ].name == data[ i ].programmingLanguage ) {
					fl = 1 ;
					res.summary.languages[ j ].frequency++ ;
				}
			}
			if( fl == 0 ) {
				res.summary.languages.push( { name : data[ i ].programmingLanguage , frequency : 1 } ) ;
			}
			sz2 = res.summary.verdicts.length ;
			fl = 0 ;
			for( j = 0 ; j < sz2 ; j++ ) {
				if( res.summary.verdicts[ j ].name == data[ i ].verdict ) {
					fl = 1 ;
					res.summary.verdicts[ j ].frequency++ ;
				}
			}
			if( fl == 0 ) {
				res.summary.verdicts.push( { name : data[ i ].verdict , frequency : 1 , cssClass : data[ i ].verdictTextCssClass } ) ;
			}
		}
		res.summary.languages = res.summary.languages.sort( function( left , right ) {
			return right.frequency - left.frequency ;
		} ) ;
		res.summary.verdicts = res.summary.verdicts.sort( function( left , right ) {
			return right.frequency - left.frequency ;
		} ) ;
		res.summary.verdictsAlphabeticallySorted = [] ;
		sz1 = res.summary.verdicts.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			res.summary.verdictsAlphabeticallySorted.push( res.summary.verdicts[ i ] ) ;
		}
		res.summary.verdictsAlphabeticallySorted = res.summary.verdictsAlphabeticallySorted.sort( function( left , right ) {
			if( left == null || right == null ) {
				return 0 ;
			}
			return ( left.name.localeCompare( right.name ) <= 0 ) ? false : true ;
		} ) ;
		res.summary.users = self.getAuthorList( data ) ;
		return res ;
	} ;
	
	this.parseSubmissionListThroughFilter = function( submissionList , verdictName , showUnofficialSubmissions ) {
		var res , i , sz , fl ;
		res = [] ;
		sz = submissionList.length ;
		for( i = 0 ; i < sz ; i++ ) {
			fl = 1 ;
			if( verdictName != null && verdictName != '' && submissionList[ i ].verdict.toLowerCase().search( verdictName.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( showUnofficialSubmissions != null && showUnofficialSubmissions == false && submissionList[ i ].inContestSubmission == false ) {
				fl = 0 ;
			}
			if( fl == 1 ) {
				res.push( submissionList[ i ] ) ;
			}
		}
		return res ;
	} ;
	
	this.parseSubmissionsWithUserInfo = function( submissionList , userInfoList ) {
		var i , sz1 , j , sz2 ;
		sz1 = submissionList.length ;
		sz2 = userInfoList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			for( j = 0 ; j < sz2 ; j++ ) {
				if( submissionList[ i ].handle[ 0 ].handle == userInfoList[ j ].handle )  {
					submissionList[ i ].handleHtml = self.generateHandleHtml( submissionList[ i ] , 'handle' , userInfoList[ j ] ) ;
					break ;
				}
			}
		}
		return submissionList ;
	} ;
	
	this.parseSubmissionsWithProblemSet = function( submissionList , problemSetList ) {
		var i , sz1 , j , sz2 , problemIdentification ;
		sz1 = submissionList.length ;
		sz2 = problemSetList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			for( j = 0 ; j < sz2 ; j++ ) {
				problemIdentification = '' + problemSetList[ j ].contestId + '-' + problemSetList[ j ].index ;
				if( submissionList[ i ].problemIdentification == problemIdentification )  {
					submissionList[ i ].userSolved = problemSetList[ j ].solvedCount ;
					submissionList[ i ].userSolvedHtml = '' + submissionList[ i ].userSolved ;
					break ;
				}
			}
		}
		return submissionList ;
	} ;
}

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
	
	this.getCountryList = function() {
		return self.cfsObj.getCountryList() ;
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

	this.getContestStatus = function( callbackFunction , contestId , handle , from , count ) {
		self.makeJsonpRequest( self.cfaubObj.buildContestStatusUrl( contestId , handle , from , count , true ) , self.cfdlpObj.parseDefaultNoParsing , callbackFunction , false ) ;
	} ;

	this.getProblems = function( callbackFunction , tags ) {
		self.makeJsonpRequest( self.cfaubObj.buildProblemsUrl( tags ) , self.cfdlpObj.parseProblemSet , callbackFunction , false ) ;
	} ;

	this.getRecentSubmissionsForAllInPractice = function( callbackFunction , count ) {
		self.makeJsonpRequest( self.cfaubObj.buildRecentSubmissionsForAllInPracticeUrl( count ) , self.cfdlpObj.parseSubmissions , callbackFunction , false ) ;
	} ;
	
	this.getSubmissionListThroughFilter = function( submissionList , verdictName , showUnofficialSubmissions ) {
		return self.cfdlpObj.parseSubmissionListThroughFilter( submissionList , verdictName , showUnofficialSubmissions ) ;
	} ;
	
	this.updateSubmissionsDataListWithUserInfo = function( submissionsListObj , userInfoList ) {
		var res ;
		res = submissionsListObj ;
		res.dataList = self.cfdlpObj.parseSubmissionsWithUserInfo( submissionsListObj.dataList , userInfoList ) ;
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

function CodeforcesController( $scope , cfApi ) {
	
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
			pageName = $scope.transformNavElementNameToPageName( $scope.navElementNameList[ idx ].title ) ;
			ga( 'send' , 'pageview' , pageName ) ;
		}
	} ;

	$scope.init = function() {
		var i , len ;
		$scope.userHandle = cfApi.getDefaultUserHandle() ;
		$scope.navigationFlags = [] ;
		$scope.navElementNameList = [] ;
		$scope.navElementNameList.push( { title : 'User Statistics of ' + $scope.userHandle , index : 0 } ) ;
		$scope.navElementNameList.push( { title : 'Recent Practice Submissions on Codeforces' , index : 1 } ) ;
		$scope.navElementNameList.push( { title : 'Contest Standings' , index : 2 } ) ;
		len = $scope.navElementNameList.length ;
		for( i = 0 ; i < len ; i++ ) {
			$scope.navigationFlags.push( false ) ;
		}
		$scope.currentNavIndex = 1 ;
		$scope.navElementClicked( $scope.currentNavIndex ) ;
	} ;

	$scope.init() ;
}

var app = angular.module( 'CodeforcesApplication' , [ 'ngSanitize' ] ) ;
app.service( 'CodeforcesConfiguration' , [ CodeforcesConfiguration ] ) ;
app.service( 'CodeforcesSettings' , [ CodeforcesSettings ] ) ;
app.service( 'CodeforcesTableStructures' , [ CodeforcesTableStructures ] ) ;
app.service( 'StringHandler' , [ StringHandler ] ) ;
app.service( 'SortHandlerService' , [ SortHandlerService ] ) ;
app.service( 'LocalStorageService' , [ 'CodeforcesConfiguration' , LocalStorageService ] ) ;
app.service( 'CodeforcesApiService' , [ '$http' , '$timeout' , '$sce' , 'LocalStorageService' , 'CodeforcesSettings' , 'CodeforcesConfiguration' , 'StringHandler' , CodeforcesApiService ] ) ;
app.controller( 'CodeforcesController' , [ '$scope' , 'CodeforcesApiService' , CodeforcesController ] ) ;
app.directive( 'codeforcesTableDirective' , [ '$sce' , 'CodeforcesConfiguration' , 'SortHandlerService' , CodeforcesTableDirective ] ) ;
app.directive( 'codeforcesContestStandingDirective' , [ 'CodeforcesApiService' , 'CodeforcesTableStructures' , CodeforcesContestStandingDirective ] ) ;
app.directive( 'codeforcesSubmissionsDirective' , [ 'CodeforcesApiService' , 'CodeforcesTableStructures' , CodeforcesSubmissionsDirective ] ) ;
app.directive( 'codeforcesUserStatisticsDirective' , [ 'CodeforcesApiService' , CodeforcesUserStatisticsDirective ] ) ;
app.directive( 'codeforcesRecentSubmissionsDirective' , [ 'CodeforcesApiService' , CodeforcesRecentSubmissionsDirective ] ) ;
