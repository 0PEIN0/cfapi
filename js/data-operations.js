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
		params = self.checkContestStatusParameters( params ) ;
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
		if( userInfoObj != null && userInfoObj.country != null && userInfoObj.country != '' ) {
			while( userInfoObj.country.search( ' ' ) != -1 ) {
				userInfoObj.country = userInfoObj.country.replace( ' ' , '' ) ;
			}
		}
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
		submission.problemTagsHtml = ( submission.problemTags == '' ) ? '' : '<span class="problem-info">' + submission.problemTags + '</span>' ;
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
		var i , sz1 , res , j , sz2 , fl , submission , k , sz3 ;
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
		res.summary.tags = [] ;
		res.summary.countries = [] ;
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
			//summary build up calculations
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
					break ;
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
					break ;
				}
			}
			if( fl == 0 ) {
				res.summary.verdicts.push( { name : data[ i ].verdict , frequency : 1 , cssClass : data[ i ].verdictTextCssClass } ) ;
			}
			sz3 = data[ i ].problem.tags.length ;
			for( k = 0 ; k < sz3 ; k++ ) {
				fl = 0 ;
				sz2 = res.summary.tags.length ;
				for( j = 0 ; j < sz2 ; j++ ) {
					if( res.summary.tags[ j ].name == data[ i ].problem.tags[ k ] ) {
						fl = 1 ;
						res.summary.tags[ j ].frequency++ ;
						break ;
					}
				}
				if( fl == 0 ) {
					res.summary.tags.push( { name : data[ i ].problem.tags[ k ] , frequency : 1 } ) ;
				}
			}
		}
		//summary sortings
		res.summary.languages = res.summary.languages.sort( function( left , right ) {
			return right.frequency - left.frequency ;
		} ) ;
		res.summary.verdicts = res.summary.verdicts.sort( function( left , right ) {
			return right.frequency - left.frequency ;
		} ) ;
		res.summary.tags = res.summary.tags.sort( function( left , right ) {
			return right.frequency - left.frequency ;
		} ) ;
		res.summary.countries = res.summary.countries.sort( function( left , right ) {
			return right.frequency - left.frequency ;
		} ) ;
		res.summary.languagesAlphabeticallySorted = [] ;
		sz1 = res.summary.languages.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			res.summary.languagesAlphabeticallySorted.push( res.summary.languages[ i ] ) ;
		}
		res.summary.languagesAlphabeticallySorted = res.summary.languagesAlphabeticallySorted.sort( function( left , right ) {
			if( left == null || right == null ) {
				return 0 ;
			}
			return left.name.localeCompare( right.name ) ;
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
			return left.name.localeCompare( right.name ) ;
		} ) ;
		res.summary.tagsAlphabeticallySorted = [] ;
		sz1 = res.summary.tags.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			res.summary.tagsAlphabeticallySorted.push( res.summary.tags[ i ] ) ;
		}
		res.summary.tagsAlphabeticallySorted = res.summary.tagsAlphabeticallySorted.sort( function( left , right ) {
			if( left == null || right == null ) {
				return 0 ;
			}
			return left.name.localeCompare( right.name ) ;
		} ) ;
		res.summary.users = self.getAuthorList( data ) ;
		return res ;
	} ;
	
	this.parseSubmissionListThroughFilter = function( submissionList , verdictName , showUnofficialSubmissions , tagName , languageName , countryName ) {
		var res , i , sz , fl ;
		res = [] ;
		sz = submissionList.length ;
		for( i = 0 ; i < sz ; i++ ) {
			fl = 1 ;
			if( verdictName != null && verdictName != '' && submissionList[ i ].verdict.toLowerCase().search( verdictName.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && showUnofficialSubmissions != null && showUnofficialSubmissions == false && submissionList[ i ].inContestSubmission == false ) {
				fl = 0 ;
			}
			if( fl == 1 && tagName != null && tagName != '' && submissionList[ i ].problemTags.toLowerCase().search( tagName.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && languageName != null && languageName != '' && submissionList[ i ].lang.toLowerCase().search( languageName.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && countryName != null && countryName != '' && ( submissionList[ i ].country == null || submissionList[ i ].country == '' || submissionList[ i ].country.toLowerCase() != countryName.toLowerCase() ) ) {
				fl = 0 ;
			}
			if( fl == 1 ) {
				res.push( submissionList[ i ] ) ;
			}
		}
		return res ;
	} ;
	
	this.parseSubmissionsWithUserInfo = function( submissionListObj , userInfoList ) {
		var i , sz1 , j , sz2 , submissionList , fl , sz3 , k ;
		submissionList = submissionListObj.dataList ;
		sz1 = submissionList.length ;
		sz2 = userInfoList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			for( j = 0 ; j < sz2 ; j++ ) {
				if( submissionList[ i ].handle[ 0 ].handle == userInfoList[ j ].handle )  {
					submissionList[ i ].handleHtml = self.generateHandleHtml( submissionList[ i ] , 'handle' , userInfoList[ j ] ) ;
					if( userInfoList[ j ].country != null && userInfoList[ j ].country != '' ) {
						submissionList[ i ].country = userInfoList[ j ].country ;
						sz3 = submissionListObj.summary.countries.length ;
						fl = 0 ;
						for( k = 0 ; k < sz3 ; k++ ) {
							if( submissionListObj.summary.countries[ k ].name == userInfoList[ j ].country ) {
								fl = 1 ;
								submissionListObj.summary.countries[ k ].frequency++ ;
								break ;
							}
						}
						if( fl == 0 ) {
							submissionListObj.summary.countries.push( { name : userInfoList[ j ].country , frequency : 1 } ) ;
						}
					}
					break ;
				}
			}
		}
		submissionListObj.summary.countriesAlphabeticallySorted = [] ;
		sz1 = submissionListObj.summary.countries.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			submissionListObj.summary.countriesAlphabeticallySorted.push( submissionListObj.summary.countries[ i ] ) ;
		}
		submissionListObj.summary.countriesAlphabeticallySorted = submissionListObj.summary.countriesAlphabeticallySorted.sort( function( left , right ) {
			if( left == null || right == null ) {
				return 0 ;
			}
			return left.name.localeCompare( right.name ) ;
		} ) ;
		return submissionListObj ;
	} ;
	
	this.parseSubmissionsWithProblemSet = function( submissionList , problemSetList ) {
		var i , sz1 , j , sz2 , problemIdentification ;
		sz1 = submissionList.length ;
		sz2 = problemSetList.length ; 
		for( i = 0 ; i < sz1 ; i++ ) {
			for( j = 0 ; j < sz2 ; j++ ) {
				problemIdentification = '' + problemSetList[ j ].contestId + '-' + problemSetList[ j ].index ;
				if( submissionList[ i ].problemIdentification == problemIdentification || submissionList[ i ].problemName == problemSetList[ j ].name )  {
					submissionList[ i ].userSolved = problemSetList[ j ].solvedCount ;
					submissionList[ i ].userSolvedHtml = '' + submissionList[ i ].userSolved ;
					break ;
				}
			}
		}
		return submissionList ;
	} ;
}
