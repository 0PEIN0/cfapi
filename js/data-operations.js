/* global . */
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
		return cfsObj.codeforcesApiBaseUrl + 'contest.hacks?' + cfsObj.angularJsonpRequestQueryParameter + '&contestId=' + contestId ;
	} ;

	this.buildContestListUrl = function( showGymContests ) {
		if( showGymContests == null ) {
			throw new Error( 'Empty "showGymContests" parameter provided!' ) ;
		}
		return cfsObj.codeforcesApiBaseUrl + 'contest.list?' + cfsObj.angularJsonpRequestQueryParameter + '&gym=' + showGymContests ;
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
		return cfsObj.codeforcesApiBaseUrl + 'contest.standings?' + cfsObj.angularJsonpRequestQueryParameter + '&contestId=' + contestId + '&from=' + params.from + '&count=' + params.count + '&handles=' + params.handles + '&room=' + params.room + '&showUnofficial=' + showUnofficial ;
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
		return cfsObj.codeforcesApiBaseUrl + 'contest.status?' + cfsObj.angularJsonpRequestQueryParameter + '&contestId=' + contestId + '&handle=' + params.handle + '&from=' + params.from + '&count=' + params.count ;
	} ;

	this.buildProblemsUrl = function( tags ) {
		if( tags == null ) {
			tags = '' ;
		}
		return cfsObj.codeforcesApiBaseUrl + 'problemset.problems?' + cfsObj.angularJsonpRequestQueryParameter + '&tags=' + tags ;
	} ;

	this.buildRecentSubmissionsForAllInPracticeUrl = function( count ) {
		if( count == null || count == '' ) {
			count = cfcObj.defaultRecentSubmissions ;
		}
		return cfsObj.codeforcesApiBaseUrl + 'problemset.recentStatus?' + cfsObj.angularJsonpRequestQueryParameter + '&count=' + count  ;
	} ;
	
	this.buildSubmissionListUrl = function( count ) {
		if( count == null || count == '' ) {
			count = cfcObj.defaultRecentSubmissions ;
		}
		return cfsObj.codeforcesApiBaseUrl + 'problemset.recentStatus?' + cfsObj.angularJsonpRequestQueryParameter + '&count=' + count  ;
	} ;

	this.buildUserInfoUrl = function( userHandles ) {
		if( userHandles == null || userHandles == '' ) {
			throw new Error( 'Empty user handle provided!' ) ;
		}
		return cfsObj.codeforcesApiBaseUrl + 'user.info?' + cfsObj.angularJsonpRequestQueryParameter + '&handles=' + userHandles ;
	} ;

	this.buildRaterUsersUrl = function( isActiveOnly ) {
		if( isActiveOnly == null ) {
			throw new Error( 'Empty "isActiveOnly" parameter provided!' ) ;
		}
		return cfsObj.codeforcesApiBaseUrl + 'user.ratedList?' + cfsObj.angularJsonpRequestQueryParameter + '&activeOnly=' + isActiveOnly ;
	} ;

	this.buildUserRatingUrl = function( userHandle ) {
		if( userHandle == null || userHandle == '' ) {
			throw new Error( 'Empty user handle provided!' ) ;	
		}
		return cfsObj.codeforcesApiBaseUrl + 'user.rating?' + cfsObj.angularJsonpRequestQueryParameter + '&handle=' + userHandle ;
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
		return cfsObj.codeforcesApiBaseUrl + 'user.status?' + cfsObj.angularJsonpRequestQueryParameter + '&handle=' + userHandle + '&from=' + params.from + '&count=' + params.count ;
	} ;
}

function CodeforcesDataListParser( cfsObj , cfcObj , shObj ) {
	var self ;
	
	self = {} ;

	self.transformVerdicts = function( textString , testSetType ) {
		if( textString != null && testSetType != null && testSetType.toLowerCase() == cfcObj.pretestSubmissionTestSetType.toLowerCase() && textString.toLowerCase() == cfcObj.acceptedSubmissionStatus.toLowerCase() ) {
			textString = 'pretests-passed' ;
		}
		textString = shObj.replaceAssociatedStrings( cfsObj.verdictTextReplacements , textString ) ;
		textString = shObj.makeTheFirstCharacterOfStringCapitalized( textString ) ;
		return textString ;
	} ;

	self.formatVerdictTextsToShow = function( dataObject ) {
		var i , sz , verdictText , fl ;
		sz = cfsObj.verdictDoesntHaveCaseNumberToShow.length ;
		verdictText = dataObject.verdict ;
		fl = 0 ;
		for( i = 0 ; i < sz ; i++ ) {
			if( dataObject.verdict == cfsObj.verdictDoesntHaveCaseNumberToShow[ i ] ) {
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
		if( verdict == null ) {
			verdictTextCssClass = 'label-in-queue' ;
		}
		else {
			verdictTextCssClass = 'label-' + verdict.toLowerCase() ;
		}
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

	self.generateHandleHtml = function( dataObject , propertyName , userInfoList ) {
		var i , sz1 , j , sz2 , k , sz3 , sz4 , userInfoObj , res , handleList , handle , countryImageHtml , countryList , userHandleCssClass , cssClassList , ratingDesignationList , rankString ;
		res = '' ;
		if( dataObject.participantType != null && dataObject.participantType.toLowerCase() == cfcObj.outOfCompetitionParticipant.toLowerCase() ) {
			res += '<span class="participant-type-span">' + shObj.makeTheFirstCharacterOfStringCapitalized( shObj.replaceAllUnderScoresWithSpaces( cfcObj.outOfCompetitionParticipant.toLowerCase() ) ) + '</span>' ;
		}
		else if( dataObject.participantType != null && dataObject.participantType.toLowerCase() == cfcObj.virtualParticipant.toLowerCase() ) {
			res += '<span class="participant-type-span">' + shObj.makeTheFirstCharacterOfStringCapitalized( shObj.replaceAllUnderScoresWithSpaces( cfcObj.virtualParticipant.toLowerCase() ) ) + '</span>' ;
		}
		handleList = dataObject[ propertyName ] ;
		ratingDesignationList = cfsObj.ratingDesignations ;
		cssClassList = cfsObj.ratingCssClasses ;
		sz1 = handleList.length ;
		sz2 = 0 ;
		if( userInfoList != null ) {
			sz2 = userInfoList.length ;
		}
		sz3 = ratingDesignationList.length ;
		sz4 = countryList = cfsObj.getCountryListAsObject() ;
		for( i = 0 ; i < sz1 ; i++ ) {
			handle = handleList[ i ] ;
			countryImageHtml = '' ;
			userHandleCssClass = '' ;
			if( userInfoList != null && userInfoList.length > 0 ) {
				userInfoObj = null ;
				for( j = 0 ; j < sz2 ; j++ ) {
					if( handleList[ i ].toLowerCase().localeCompare( userInfoList[ j ].handle.toLowerCase() ) == 0 ) {
						userInfoObj = userInfoList[ j ] ;
						break ;
					}
				}
				if( userInfoObj != null ) {
					if( userInfoObj.rank == null || userInfoObj.rank == '' ) {
						rankString = 'unrated' ;
					}
					else {
						rankString = userInfoObj.rank.toLowerCase() ;
					}
					for( k = 0 ; k < sz3 ; k++ ) {
						if( ratingDesignationList[ k ] != null && ratingDesignationList[ k ].toLowerCase() == rankString ) {
							userHandleCssClass = cssClassList[ k ] ;
							break ;
						}
					}
					if( userInfoObj.country != null && userInfoObj.country != '' ) {
						while( userInfoObj.country.search( ' ' ) != -1 ) {
							userInfoObj.country = userInfoObj.country.replace( ' ' , '' ) ;
						}
					}
					else {
						userInfoObj.country = '' ;
					}
					if( userInfoObj.country != null && userInfoObj.country != '' && countryList[ userInfoObj.country ] != null ) {
						countryImageHtml = '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/ratings/country/' + userInfoObj.country + '">' + '<img title="' + userInfoObj.country + '" alt="' + userInfoObj.country + '" class="flag-img" src="' + countryList[ userInfoObj.country ] + '"></a>' ;
					}
				}
			}
			res += countryImageHtml + '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/profile/' + handle + '">' + '<div class="user-rating-core ' + userHandleCssClass + '">' + handle + '</div>' + '</a>' ;
		}
		if( dataObject.teamName != null && dataObject.teamName != '' ) {
			if( dataObject.teamId != null && dataObject.teamId != '' ) {
				res += '(<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/team/' + dataObject.teamId + '">' + dataObject.teamName + '</a>)' ;
			}
			else {
				res += '(' + dataObject.teamName + ')' ;
			}
		}
		return res ;
	} ;
	
	self.generateProblemHtml = function( dataObject , testSetType ) {
		var problemHtml ;
		problemHtml = '' ;
		if( dataObject.contestId >= cfcObj.gymMinimumContestId ) {		
			problemHtml += '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/gym/' + dataObject.contestId + '/problem/' + dataObject.index + '"><div>' + dataObject.name + '</div></a>' ;
		}
		else {
			if( testSetType != null && testSetType.toLowerCase() == cfcObj.pretestSubmissionTestSetType.toLowerCase() ) {
				problemHtml += '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/contest/' + dataObject.contestId + '/problem/' + dataObject.index + '"><div>' + dataObject.name + '</div></a>' ;				
			}
			else {
				problemHtml += '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/problemset/problem/' + dataObject.contestId + '/' + dataObject.index + '"><div>' + dataObject.name + '</div></a>' ;
			}		
		}
		if( dataObject.contestId != null && dataObject.index != null ) {
			problemHtml += '<span class="problem-info">(' + dataObject.contestId + '-' + dataObject.index + ')</span>' ;
		}
		if( dataObject.points != null && dataObject.points != -1 ) {
			problemHtml += '<span class="problem-info">POINTS: ' + dataObject.points + '</span>' ;
		}
		return problemHtml ;
	} ;
	
	self.generateProblemTagsHtml = function( dataObject ) {
		var res ;
		res = ( dataObject.problemTags == '' ) ? '' : '<span class="problem-info">' + dataObject.problemTags + '</span>' ;
		return res ;
	} ;
	
	self.buildSubmissionIdHtml = function( dataObject ) {
		var res ;
		res = '' ;
		if( dataObject.problem.contestId < cfcObj.gymMinimumContestId ) {
			res += '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/contest/' + dataObject.problem.contestId + '/submission/' + dataObject.id + '"><div>' + dataObject.id + '</div></a>' ;
		}
		else {
			res += '' + dataObject.id ;
		}
		return res ;
	} ;
	
	self.buildContestIdHtml = function( dataObject ) {
		var res ;
		res = '' ;
		if( dataObject.contestId < cfcObj.gymMinimumContestId ) {
			res += '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/contest/' + dataObject.contestId + '"><div>' + dataObject.contestId + '</div></a>' ;
		}
		else {
			res += '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/gym/' + dataObject.contestId + '"><div>' + dataObject.contestId + '</div></a>' ;
		}
		return res ;
	} ;
	
	self.buildProblemIndexHtml = function( dataObject ) {
		var res ;
		res = '' ;
		if( dataObject.contestId < cfcObj.gymMinimumContestId ) {
			res += '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/contest/' + dataObject.contestId + '/problem/' + dataObject.index + '"><div>' + dataObject.index + '</div></a>' ;
		}
		else {
			res += '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/gym/' + dataObject.contestId + '/problem/' + dataObject.index + '"><div>' + dataObject.index + '</div></a>' ;
		}
		return res ;
	} ;
	
	self.buildRoomHtml = function( dataObject ) {
		var res ;
		res = '<a target="_blank" href="' + cfsObj.codeforcesBaseUrl + '/contest/' + dataObject.contestId + '/room/' + dataObject.party.room + '">' + dataObject.party.room + '</a>' ;
		return res ;
	} ;

	self.buildUserStandingObject = function( dataObject , summary , contestId ) {
		var userStanding , i , sz , cssClass ;
		dataObject.contestId = contestId ;
		userStanding = {} ;
		userStanding.rank = dataObject.rank ;
		userStanding.rankHtml = '' + dataObject.rank ;
		if( dataObject.party.room == null ) {
			dataObject.party.room = -1 ;
			userStanding.roomHtml = '' ;
		}
		else {
			userStanding.room = dataObject.party.room ;
			userStanding.roomHtml = self.buildRoomHtml( dataObject ) ;
		}
		userStanding.participantType = dataObject.participantType ;
		userStanding.handle = dataObject.authorHandles ;
		userStanding.handleHtml = self.generateHandleHtml( dataObject , 'authorHandles' , null ) ;
		userStanding.teamName = dataObject.teamName ;
		userStanding.teamId = dataObject.teamId ;
		userStanding.points = dataObject.points ;
		userStanding.pointsHtml = '<div class="standings-cell-points">' + dataObject.points + '</div>' ;
		userStanding.penalty = dataObject.penalty ;
		userStanding.penaltyHtml = '' + dataObject.penalty ;
		userStanding.hacks = dataObject.successfulHackCount ;
		userStanding.hacksUnsuccessful = dataObject.unsuccessfulHackCount ;
		userStanding.hacksHtml = '<div>' ;
		if( dataObject.successfulHackCount > 0 ) {
			userStanding.hacksHtml += '<span class="standings-cell-challenge-success">' + '+' + dataObject.successfulHackCount + '</span>' ;
		}
		if( dataObject.successfulHackCount > 0 && dataObject.unsuccessfulHackCount > 0 ) {
			userStanding.hacksHtml += '<span class="standings-cell-challenge-seperator">' + ' : ' + '</span>' ;
		}
		if( dataObject.unsuccessfulHackCount > 0 ) {
			userStanding.hacksHtml += '<span class="standings-cell-challenge-fail">' + '-' + dataObject.unsuccessfulHackCount + '</span>' ;
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
				if( dataObject.problemResults[ i ].type.toLowerCase() == cfcObj.standingResultType.toLowerCase() ) {
					cssClass = 'standings-cell-pretests-passed' ;
				}
				else {
					cssClass = 'standings-cell-accepted' ;
				}
				userStanding[ String.fromCharCode( 'a'.charCodeAt( 0 ) + i ) + 'Html' ] = '<div class="standings-cell-core ' + cssClass + '">' + dataObject.problemResults[ i ].points + '</div>' ;
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
		submission.handleHtml = self.generateHandleHtml( dataObject , 'authorHandles' , null ) ;
		submission.teamName = dataObject.teamName ;
		submission.teamId = dataObject.teamId ;
		submission.problemName = dataObject.problem.name ;
		submission.problemNameHtml = self.generateProblemHtml( dataObject.problem , dataObject.testset ) ;
		submission.problemTags = dataObject.problem.tags.join( ', ' ) ;
		submission.problemTagsHtml = self.generateProblemTagsHtml( submission ) ;
		submission.problemIdentification = '' + dataObject.problem.contestId + '-' + dataObject.problem.index ;
		submission.inContestSubmission = dataObject.inContestSubmission ;
		submission.userSolved = -1 ;
		submission.userSolvedHtml = '' ;
		submission.lang = dataObject.programmingLanguage ;
		submission.langHtml = dataObject.programmingLanguage ;
		submission.verdict = dataObject.verdictText ;
		submission.verdictHtml = '<span class="label ' + dataObject.verdictTextCssClass + '">' + dataObject.verdictText + '</span>' ;
		submission.executionTime = dataObject.timeConsumedSeconds ;
		submission.executionTimeHtml = '' + dataObject.timeConsumedSeconds ;
		submission.executionMemory = dataObject.memoryConsumedMegaBytes ;
		submission.executionMemoryHtml = '' + dataObject.memoryConsumedMegaBytes + ' MB' ;
		submission.index = dataObject.problemIndex ;
		submission.points = dataObject.problemPoints ;
		submission.contestId = dataObject.problem.contestId ;
		return submission ;
	} ;
	
	self.buildProblemSetObject = function( dataObject ) {
		var problem ;
		problem = {} ;
		problem.contestId = dataObject.contestId ;
		problem.contestIdHtml = self.buildContestIdHtml( problem ) ;
		problem.index = dataObject.index ;
		problem.indexHtml = self.buildProblemIndexHtml( problem ) ;
		problem.problemName = dataObject.name ;
		problem.problemNameHtml = self.generateProblemHtml( dataObject ) ;
		if( dataObject.tags == null || dataObject.tags.length == 0 ) {
			problem.problemTags = '' ;
		}
		else {
			problem.problemTags = dataObject.tags.join( ', ' ) ;
		}
		problem.problemTagsHtml = self.generateProblemTagsHtml( problem ) ;
		if( dataObject.points == null ) {
			problem.points = -1 ;
			problem.pointsHtml = '' ;
		}
		else {
			problem.points = dataObject.points ;
			problem.pointsHtml = '' + problem.points ;
		}
		problem.userSolved = dataObject.solvedCount ;
		problem.userSolvedHtml = '' + problem.userSolved ;
		if( dataObject.type == null ) {
			problem.problemType = '' ;
		}
		else {
			problem.problemType = shObj.makeTheFirstCharacterOfStringCapitalized( dataObject.type.toLowerCase() ) ;
		}
		problem.problemTypeHtml = '' + problem.problemType ;
		return problem ;
	} ;
	
	self.getHandlesInAnArray = function( handleList ) {
		var i , sz , res ;
		res = [] ;
		sz = handleList.length ;
		for( i = 0 ; i < sz ; i++ ) {
			if( handleList[ i ].handle != null ) {
				res.push( handleList[ i ].handle ) ;
			}
			else if( handleList[ i ].member != null ) {
				res.push( handleList[ i ].member ) ;
			}
			else {
				res.push( handleList[ i ] ) ;
			}
		}
		return res ;
	} ;

	self.getUniqueAuthorList = function( dataList ) {
		var authorList , i , sz1 , j , sz2 , userMap , mapCnt ;
		authorList = [] ;
		userMap = [] ;
		mapCnt = 1 ;
		sz1 = dataList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			if( sz2 = dataList[ i ].authorHandles == null ) {
				continue ;
			}
			sz2 = dataList[ i ].authorHandles.length ;
			for( j = 0 ; j < sz2 ; j++ ) {
				if( userMap[ dataList[ i ].authorHandles[ j ] ] == null ) {
					userMap[ dataList[ i ].authorHandles[ j ] ] = mapCnt++ ;
					authorList.push( dataList[ i ].authorHandles[ j ] ) ;
				}
			}
		}
		return authorList ;
	} ;
	
	self.calculateSummaryOfAProperty = function( res , dataList , summaryPropertyName , dataListPropertyName ) {
		var i , sz1 , j , sz2 , k , sz3 , fl , summaryPropertyNameAlphabeticallySorted ;
		sz1 = dataList.length ;
		res.summary[ summaryPropertyName ] = [] ;
		for( i = 0 ; i < sz1 ; i++ ) {
			if( ( typeof dataList[ i ][ dataListPropertyName ] ) == 'object' && dataList[ i ][ dataListPropertyName ].length >= 0 ) {
				sz3 = dataList[ i ][ dataListPropertyName ].length ;
				for( k = 0 ; k < sz3 ; k++ ) {
					fl = 0 ;
					sz2 = res.summary[ summaryPropertyName ].length ;
					for( j = 0 ; j < sz2 ; j++ ) {
						if( res.summary[ summaryPropertyName ][ j ].name == dataList[ i ][ dataListPropertyName ][ k ] && dataList[ i ][ dataListPropertyName ][ k ] != '' ) {
							fl = 1 ;
							res.summary[ summaryPropertyName ][ j ].frequency++ ;
							break ;
						}
					}
					if( fl == 0 ) {
						if( dataList[ i ][ dataListPropertyName ][ k ] != -1 && dataList[ i ][ dataListPropertyName ][ k ] != '' && dataList[ i ][ dataListPropertyName ][ k ] != null ) {
							res.summary[ summaryPropertyName ].push( { name : dataList[ i ][ dataListPropertyName ][ k ] , frequency : 1 } ) ;
							if( dataList[ i ].verdictTextCssClass != null && dataListPropertyName == 'verdict' ) {
								res.summary[ summaryPropertyName ][ res.summary[ summaryPropertyName ].length - 1 ].cssClass = dataList[ i ].verdictTextCssClass ;
							}
						}
					}
				}
			}
			else {
				sz2 = res.summary[ summaryPropertyName ].length ;
				fl = 0 ;
				for( j = 0 ; j < sz2 ; j++ ) {
					if( res.summary[ summaryPropertyName ][ j ].name == dataList[ i ][ dataListPropertyName ] ) {
						fl = 1 ;
						res.summary[ summaryPropertyName ][ j ].frequency++ ;
						break ;
					}
				}
				if( fl == 0 ) {
					if( dataList[ i ][ dataListPropertyName ] != -1 && dataList[ i ][ dataListPropertyName ] != '' && dataList[ i ][ dataListPropertyName ] != null ) {
						res.summary[ summaryPropertyName ].push( { name : dataList[ i ][ dataListPropertyName ] , frequency : 1 } ) ;
						if( dataList[ i ].verdictTextCssClass != null && dataListPropertyName == 'verdict' ) {
							res.summary[ summaryPropertyName ][ res.summary[ summaryPropertyName ].length - 1 ].cssClass = dataList[ i ].verdictTextCssClass ;
						}
					}
				}
			}
		}
		res.summary[ summaryPropertyName ] = res.summary[ summaryPropertyName ].sort( function( left , right ) {
			return right.frequency - left.frequency ;
		} ) ;
		summaryPropertyNameAlphabeticallySorted = summaryPropertyName + 'AlphabeticallySorted' ;
		res.summary[ summaryPropertyNameAlphabeticallySorted ] = [] ;
		sz1 = res.summary[ summaryPropertyName ].length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			res.summary[ summaryPropertyNameAlphabeticallySorted ].push( res.summary[ summaryPropertyName ][ i ] ) ;
		}
		res.summary[ summaryPropertyNameAlphabeticallySorted ] = res.summary[ summaryPropertyNameAlphabeticallySorted ].sort( function( left , right ) {
			if( left == null || left.name == null || right == null || right.name == null ) {
				return 0 ;
			}
			if( isNaN( left.name ) == false || isNaN( right.name ) == false ) {
				return left.name - right.name ;
			}
			return left.name.localeCompare( right.name ) ;
		} ) ;
		return res ;
	} ;
	
	self.extractCountryListAgainstHandleListUsingUserInfoList = function( dataList , userInfoList ) {
		var i , sz1 , j , sz2 , k , sz3 , l , sz4 , fl ;
		sz1 = dataList.length ;
		sz2 = userInfoList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			dataList[ i ].countries = [] ;
			if( dataList[ i ].handle != null ) {
				sz3 = dataList[ i ].handle.length ;
				for( k = 0 ; k < sz3 ; k++ ) {
					for( j = 0 ; j < sz2 ; j++ ) {
						if( dataList[ i ].handle[ k ] == userInfoList[ j ].handle ) {
							sz4 = dataList[ i ].countries.length ;
							fl = 0 ;
							for( l = 0 ; l < sz4 ; l++ ) {
								if( dataList[ i ].countries[ l ] == userInfoList[ j ].country ) {
									fl = 1 ;
									break ;
								}
							}
							if( fl == 0 ) {
								dataList[ i ].countries.push( userInfoList[ j ].country ) ;
							}
							break ;
						}
					}
				}
			}
		}
		return dataList ;
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
			data[ i ].authorHandles = self.getHandlesInAnArray( data[ i ].party.members ) ;
			data[ i ].teamName = data[ i ].party.teamName ;
			data[ i ].teamId = data[ i ].party.teamId ;  
			data[ i ].participantType = data[ i ].party.participantType ;
			userStanding = self.buildUserStandingObject( data[ i ] , res.summary , res.summary.contest.id ) ;
			if( userStanding.penalty > 0 ) {
				res.summary.hasPenalty = true ;
			}
			if( data[ i ].successfulHackCount > 0 || data[ i ].unsuccessfulHackCount > 0 ) {
				res.summary.hasHacks = true ;
			}
			res.dataList.push( userStanding ) ;
		}
		res.filteredDataList = res.dataList ;
		res.summary.users = self.getUniqueAuthorList( data ) ;
		res.summary.numberOfProblems = res.summary.problems.length ;
		return res ;
	} ;
	
	this.parseContestStandingsWithUserInfo = function( standingListObj , userInfoList ) {
		var i , sz1 , standingList ;
		standingList = standingListObj.dataList ;
		sz1 = standingList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			standingList[ i ].handleHtml = self.generateHandleHtml( standingList[ i ] , 'handle' , userInfoList ) ;
		}
		standingList = self.extractCountryListAgainstHandleListUsingUserInfoList( standingList , userInfoList ) ;
		standingListObj.dataList = standingList ;
		standingListObj = self.calculateSummaryOfAProperty( standingListObj , standingListObj.dataList , 'countries' , 'countries' ) ;
		return standingListObj ;
	} ;
	
	this.parseContestStandingsByCountry = function( standingList , countryName ) {
		var i , sz1 , res , rank ;
		res = [] ;
		sz1 = standingList.length ;
		rank = 1 ;
		for( i = 0 ; i < sz1 ; i++ ) {
			if( standingList[ i ].countries != null && standingList[ i ].countries.length > 0 && standingList[ i ].countries.join( ',' ).toLowerCase().indexOf( countryName.toLowerCase() ) != -1 ) {
				standingList[ i ].relativeRank = rank++ ;
				standingList[ i ].relativeRankHtml = '' + standingList[ i ].relativeRank ;
				res.push( standingList[ i ] ) ;
			}
		}
		return res ;
	} ;
	
	this.parseProblemSet = function( data ) {
		var res , i , len ;
		res = {} ;
		res.summary = {} ;
		res.summary.total = data.problems.length ;
		res.dataList = data.problems ;
		len = res.dataList.length ;
		for( i = 0 ; i < len ; i++ ) {
			res.dataList[ i ].solvedCount = data.problemStatistics[ i ].solvedCount ;
		}
		return res ;
	} ;
	
	this.parseProblemSetForTableData = function( data ) {
		var res , i , len , problemSetObject ;
		res = {} ;
		res.summary = {} ;
		len = data.problems.length ;
		res.summary.total = len ;
		res.dataList = [] ;
		for( i = 0 ; i < len ; i++ ) {
			problemSetObject = {} ;
			problemSetObject.contestId = data.problems[ i ].contestId ;
			problemSetObject.index = data.problems[ i ].index ;
			problemSetObject.name = data.problems[ i ].name ;
			problemSetObject.tags = data.problems[ i ].tags ;
			problemSetObject.points = data.problems[ i ].points ;
			problemSetObject.type = data.problems[ i ].type ;
			problemSetObject.solvedCount = data.problemStatistics[ i ].solvedCount ;
			problemSetObject = self.buildProblemSetObject( problemSetObject ) ;
			res.dataList.push( problemSetObject ) ;
		}
		res = self.calculateSummaryOfAProperty( res , data.problems , 'tags' , 'tags' ) ;
		res = self.calculateSummaryOfAProperty( res , data.problems , 'problemIndexes' , 'index' ) ;
		res = self.calculateSummaryOfAProperty( res , data.problems , 'points' , 'points' ) ;
		res.filteredDataList = res.dataList ;
		return res ;
	} ;
	
	this.parseProblemSetForTableDataThroughFilter = function( problemSetList , tagName , problemIndex , problemPoint ) {
		var res , i , sz , fl ;
		res = [] ;
		sz = problemSetList.length ;
		for( i = 0 ; i < sz ; i++ ) {
			fl = 1 ;
			if( fl == 1 && tagName != null && tagName != '' && problemSetList[ i ].problemTags.toLowerCase().indexOf( tagName.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && problemIndex != null && problemIndex != '' && problemSetList[ i ].index.toLowerCase().indexOf( problemIndex.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && problemPoint != null && problemPoint != '' && problemSetList[ i ].points != problemPoint ) {
				fl = 0 ;
			}
			if( fl == 1 ) {
				res.push( problemSetList[ i ] ) ;
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
		var i , sz1 , res , submission ;
		res = {} ;
		res.dataList = [] ;
		res.summary = {} ;
		sz1 = data.length ;
		res.summary.total = data.length ;
		res.summary.totalAccepted = 0 ;
		res.summary.totalInContest = 0 ;
		res.summary.totalInContestAccepted = 0 ;
		for( i = 0 ; i < sz1 ; i++ ) {
			data[ i ].creationDateTimeString = self.makeDateTimeStringFromMilliseconds( data[ i ].creationTimeSeconds ) ;
			data[ i ].problemName = data[ i ].problem.name ;
			data[ i ].problemIndex = data[ i ].problem.index ;
			data[ i ].problemPoints = data[ i ].problem.points ;
			if( data[ i ].problemPoints == null ) {
				data[ i ].problemPoints = -1 ;
			}
			data[ i ].authorHandles = self.getHandlesInAnArray( data[ i ].author.members ) ;
			data[ i ].teamName = data[ i ].author.teamName ;
			data[ i ].teamId = data[ i ].author.teamId ;
			data[ i ].timeConsumedSeconds = shObj.roundToDecimalPlaces( ( data[ i ].timeConsumedMillis / 1000 ) , 3 ) ;
			data[ i ].memoryConsumedMegaBytes = shObj.roundToDecimalPlaces( ( data[ i ].memoryConsumedBytes / ( 1024 * 1024 ) ) , 2 ) ;
			data[ i ].verdict = self.transformVerdicts( data[ i ].verdict , data[ i ].testset ) ;
			data[ i ].verdictText = self.formatVerdictTextsToShow( data[ i ] ) ;
			data[ i ].inContestSubmission = ( data[ i ].author.participantType == 'CONTESTANT' ) ? true : false ;
			data[ i ].verdictTextCssClass = self.buildCssClassFromVerdict( data[ i ].verdict ) ;
			data[ i ].tags = data[ i ].problem.tags ;
			submission = self.buildSubmissionObject( data[ i ] ) ;
			res.dataList.push( submission ) ;
			if( data[ i ].inContestSubmission == true ) {
				res.summary.totalInContest++ ;
			}
			if( data[ i ].verdict == 'Accepted' ) {
				res.summary.totalAccepted++ ;
				if( data[ i ].inContestSubmission == true ) {
					res.summary.totalInContestAccepted++ ;
				}
			}
		}
		res = self.calculateSummaryOfAProperty( res , data , 'languages' , 'programmingLanguage' ) ;
		res = self.calculateSummaryOfAProperty( res , data , 'verdicts' , 'verdict' ) ;
		res = self.calculateSummaryOfAProperty( res , res.dataList , 'countries' , 'countries' ) ;
		res = self.calculateSummaryOfAProperty( res , data , 'tags' , 'tags' ) ;
		res = self.calculateSummaryOfAProperty( res , data , 'problemIndexes' , 'problemIndex' ) ;
		res = self.calculateSummaryOfAProperty( res , data , 'points' , 'problemPoints' ) ;
		res.summary.users = self.getUniqueAuthorList( data ) ;
		return res ;
	} ;
	
	this.parseSubmissionListThroughFilter = function( submissionList , verdictName , showUnofficialSubmissions , tagName , languageName , countryName , problemIndex , problemPoint ) {
		var res , i , sz , fl ;
		res = [] ;
		sz = submissionList.length ;
		for( i = 0 ; i < sz ; i++ ) {
			fl = 1 ;
			if( fl == 1 && verdictName != null && verdictName != '' && submissionList[ i ].verdict.toLowerCase().indexOf( verdictName.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && showUnofficialSubmissions != null && showUnofficialSubmissions == false && submissionList[ i ].inContestSubmission == false ) {
				fl = 0 ;
			}
			if( fl == 1 && tagName != null && tagName != '' && submissionList[ i ].problemTags.toLowerCase().indexOf( tagName.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && languageName != null && languageName != '' && submissionList[ i ].lang.toLowerCase().indexOf( languageName.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && countryName != null && countryName != '' && ( submissionList[ i ].countries == null || submissionList[ i ].countries == '' || submissionList[ i ].countries.length == 0 || submissionList[ i ].countries.join( ',' ).toLowerCase().indexOf( countryName.toLowerCase() ) == -1 ) ) {
				fl = 0 ;
			}
			if( fl == 1 && problemIndex != null && problemIndex != '' && submissionList[ i ].index.toLowerCase().indexOf( problemIndex.toLowerCase() ) == -1 ) {
				fl = 0 ;
			}
			if( fl == 1 && problemPoint != null && problemPoint != '' && submissionList[ i ].points != problemPoint ) {
				fl = 0 ;
			}
			if( fl == 1 ) {
				res.push( submissionList[ i ] ) ;
			}
		}
		return res ;
	} ;
	
	this.parseSubmissionsWithUserInfo = function( submissionListObj , userInfoList ) {
		var i , sz1 , submissionList ;
		submissionList = submissionListObj.dataList ;
		sz1 = submissionList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			submissionList[ i ].handleHtml = self.generateHandleHtml( submissionList[ i ] , 'handle' , userInfoList ) ;
		}
		submissionList = self.extractCountryListAgainstHandleListUsingUserInfoList( submissionList , userInfoList ) ;
		submissionListObj.dataList = submissionList ;
		submissionListObj = self.calculateSummaryOfAProperty( submissionListObj , submissionListObj.dataList , 'countries' , 'countries' ) ;
		return submissionListObj ;
	} ;
	
	this.parseSubmissionsWithProblemSet = function( submissionList , problemSetList ) {
		var i , sz1 , j , sz2 , problemIdentification ;
		sz1 = submissionList.length ;
		sz2 = problemSetList.length ;
		for( i = 0 ; i < sz1 ; i++ ) {
			for( j = 0 ; j < sz2 ; j++ ) {
				problemIdentification = '' + problemSetList[ j ].contestId + '-' + problemSetList[ j ].index ;
				if( submissionList[ i ].problemIdentification == problemIdentification || ( submissionList[ i ].problemName == problemSetList[ j ].name && Math.abs( submissionList[ i ].contestId - problemSetList[ j ].contestId ) <= 1 ) )  { 
					submissionList[ i ].userSolved = problemSetList[ j ].solvedCount ;
					submissionList[ i ].userSolvedHtml = '' + submissionList[ i ].userSolved ;
					break ;
				}
			}
		}
		return submissionList ;
	} ;
}
