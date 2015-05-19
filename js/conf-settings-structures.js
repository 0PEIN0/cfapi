/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

function CodeforcesConfiguration() {
	this.defaultUserHandle = 'battousai' ;
	
	this.defaultContestStandingCount = 10000 ;
	this.defaultContestStatusCount = 1000000 ;
	this.defaultRecentSubmissions = 1000 ;
	this.defaultUserSubmissions = 10000 ;
	
	this.maxRowsPerPageInPagination = 1000 ;
	this.maxButtonsInPagination = 5 ;
	
	this.timeZoneOffsetInHours = 3 ;
	this.localStorageTimeOutHours = 1 ;
	this.defaultNavigationIndex = 2 ;
	this.constantMultiplierWhileSortingNumbers = 10000 ;
	this.defaultContestId = 262 ;
	this.perApiRequestUserHandleLimit = 500 ;
	this.subsequentApiCallTimeoutInMilliseconds = 400 ;
	this.gymMinimumContestId = 100000 ;
	
	this.acceptedSubmissionStatus = 'ok' ;
	this.pretestSubmissionTestSetType = 'pretests' ;
	this.standingResultType = 'preliminary' ;
	
	this.jsonpUrlParameter = null ;
	this.angularHttpObj = null ;
	this.codeforcesBaseUrl = 'http://codeforces.com' ;
}

function CodeforcesSettings() {
	var self ;
	
	self = {} ;
	
	this.baseUrl = 'http://codeforces.com/api/' ;
	self.countryList = JSON.parse( '[{"countryName":"Russia","imageUrl":"http://st.codeforces.com/images/flags-16/ru.png"},{"countryName":"Belarus","imageUrl":"http://st.codeforces.com/images/flags-16/by.png"},{"countryName":"China","imageUrl":"http://st.codeforces.com/images/flags-16/cn.png"},{"countryName":"Japan","imageUrl":"http://st.codeforces.com/images/flags-16/jp.png"},{"countryName":"Ukraine","imageUrl":"http://st.codeforces.com/images/flags-16/ua.png"},{"countryName":"Poland","imageUrl":"http://st.codeforces.com/images/flags-16/pl.png"},{"countryName":"UnitedStates(USA)","imageUrl":"http://st.codeforces.com/images/flags-16/us.png"},{"countryName":"Korea,Republicof","imageUrl":"http://st.codeforces.com/images/flags-16/kr.png"},{"countryName":"Taiwan","imageUrl":"http://st.codeforces.com/images/flags-16/tw.png"},{"countryName":"Iran","imageUrl":"http://st.codeforces.com/images/flags-16/ir.png"},{"countryName":"Croatia","imageUrl":"http://st.codeforces.com/images/flags-16/hr.png"},{"countryName":"Vietnam","imageUrl":"http://st.codeforces.com/images/flags-16/vn.png"},{"countryName":"Romania","imageUrl":"http://st.codeforces.com/images/flags-16/ro.png"},{"countryName":"Brazil","imageUrl":"http://st.codeforces.com/images/flags-16/br.png"},{"countryName":"Kazakhstan","imageUrl":"http://st.codeforces.com/images/flags-16/kz.png"},{"countryName":"Canada","imageUrl":"http://st.codeforces.com/images/flags-16/ca.png"},{"countryName":"Switzerland","imageUrl":"http://st.codeforces.com/images/flags-16/ch.png"},{"countryName":"Slovakia","imageUrl":"http://st.codeforces.com/images/flags-16/sk.png"},{"countryName":"Latvia","imageUrl":"http://st.codeforces.com/images/flags-16/lv.png"},{"countryName":"Indonesia","imageUrl":"http://st.codeforces.com/images/flags-16/id.png"},{"countryName":"HongKong","imageUrl":"http://st.codeforces.com/images/flags-16/hk.png"},{"countryName":"India","imageUrl":"http://st.codeforces.com/images/flags-16/in.png"},{"countryName":"UnitedKingdom","imageUrl":"http://st.codeforces.com/images/flags-16/gb.png"},{"countryName":"Georgia","imageUrl":"http://st.codeforces.com/images/flags-16/ge.png"},{"countryName":"Bulgaria","imageUrl":"http://st.codeforces.com/images/flags-16/bg.png"},{"countryName":"Finland","imageUrl":"http://st.codeforces.com/images/flags-16/fi.png"},{"countryName":"Korea,DPR","imageUrl":"http://st.codeforces.com/images/flags-16/kp.png"},{"countryName":"Turkiye","imageUrl":"http://st.codeforces.com/images/flags-16/tr.png"},{"countryName":"Bangladesh","imageUrl":"http://st.codeforces.com/images/flags-16/bd.png"},{"countryName":"Australia","imageUrl":"http://st.codeforces.com/images/flags-16/au.png"},{"countryName":"Serbia","imageUrl":"http://st.codeforces.com/images/flags-16/rs.png"},{"countryName":"Egypt","imageUrl":"http://st.codeforces.com/images/flags-16/eg.png"},{"countryName":"Germany","imageUrl":"http://st.codeforces.com/images/flags-16/de.png"},{"countryName":"CzechRepublic","imageUrl":"http://st.codeforces.com/images/flags-16/cz.png"},{"countryName":"Thailand","imageUrl":"http://st.codeforces.com/images/flags-16/th.png"},{"countryName":"Armenia","imageUrl":"http://st.codeforces.com/images/flags-16/am.png"},{"countryName":"Argentina","imageUrl":"http://st.codeforces.com/images/flags-16/ar.png"},{"countryName":"Lithuania","imageUrl":"http://st.codeforces.com/images/flags-16/lt.png"},{"countryName":"Sweden","imageUrl":"http://st.codeforces.com/images/flags-16/se.png"},{"countryName":"Italy","imageUrl":"http://st.codeforces.com/images/flags-16/it.png"},{"countryName":"Spain","imageUrl":"http://st.codeforces.com/images/flags-16/es.png"},{"countryName":"Uzbekistan","imageUrl":"http://st.codeforces.com/images/flags-16/uz.png"},{"countryName":"Peru","imageUrl":"http://st.codeforces.com/images/flags-16/pe.png"},{"countryName":"Kyrgyzstan","imageUrl":"http://st.codeforces.com/images/flags-16/kg.png"},{"countryName":"SouthAfrica","imageUrl":"http://st.codeforces.com/images/flags-16/za.png"},{"countryName":"France","imageUrl":"http://st.codeforces.com/images/flags-16/fr.png"},{"countryName":"Colombia","imageUrl":"http://st.codeforces.com/images/flags-16/co.png"},{"countryName":"Hungary","imageUrl":"http://st.codeforces.com/images/flags-16/hu.png"},{"countryName":"Catalonia","imageUrl":"http://st.codeforces.com/images/flags-16/ct.png"},{"countryName":"Mexico","imageUrl":"http://st.codeforces.com/images/flags-16/mx.png"},{"countryName":"Estonia","imageUrl":"http://st.codeforces.com/images/flags-16/ee.png"},{"countryName":"Cuba","imageUrl":"http://st.codeforces.com/images/flags-16/cu.png"},{"countryName":"Belgium","imageUrl":"http://st.codeforces.com/images/flags-16/be.png"},{"countryName":"Slovenia","imageUrl":"http://st.codeforces.com/images/flags-16/si.png"},{"countryName":"TheNetherlands","imageUrl":"http://st.codeforces.com/images/flags-16/nl.png"},{"countryName":"Singapore","imageUrl":"http://st.codeforces.com/images/flags-16/sg.png"},{"countryName":"Philippines","imageUrl":"http://st.codeforces.com/images/flags-16/ph.png"},{"countryName":"Mongolia","imageUrl":"http://st.codeforces.com/images/flags-16/mn.png"},{"countryName":"Venezuela","imageUrl":"http://st.codeforces.com/images/flags-16/ve.png"},{"countryName":"Syria","imageUrl":"http://st.codeforces.com/images/flags-16/sy.png"},{"countryName":"Tajikistan","imageUrl":"http://st.codeforces.com/images/flags-16/tj.png"},{"countryName":"Austria","imageUrl":"http://st.codeforces.com/images/flags-16/at.png"},{"countryName":"Turkmenistan","imageUrl":"http://st.codeforces.com/images/flags-16/tm.png"},{"countryName":"Malaysia","imageUrl":"http://st.codeforces.com/images/flags-16/my.png"},{"countryName":"Bolivia","imageUrl":"http://st.codeforces.com/images/flags-16/bo.png"},{"countryName":"Portugal","imageUrl":"http://st.codeforces.com/images/flags-16/pt.png"},{"countryName":"Jordan","imageUrl":"http://st.codeforces.com/images/flags-16/jo.png"},{"countryName":"DominicanRepublic","imageUrl":"http://st.codeforces.com/images/flags-16/do.png"},{"countryName":"Norway","imageUrl":"http://st.codeforces.com/images/flags-16/no.png"},{"countryName":"Azerbaijan","imageUrl":"http://st.codeforces.com/images/flags-16/az.png"},{"countryName":"Macedonia","imageUrl":"http://st.codeforces.com/images/flags-16/mk.png"},{"countryName":"SriLanka","imageUrl":"http://st.codeforces.com/images/flags-16/lk.png"},{"countryName":"Greece","imageUrl":"http://st.codeforces.com/images/flags-16/gr.png"},{"countryName":"Moldova","imageUrl":"http://st.codeforces.com/images/flags-16/md.png"},{"countryName":"Ireland","imageUrl":"http://st.codeforces.com/images/flags-16/ie.png"},{"countryName":"Lebanon","imageUrl":"http://st.codeforces.com/images/flags-16/lb.png"},{"countryName":"Morocco","imageUrl":"http://st.codeforces.com/images/flags-16/ma.png"},{"countryName":"Tunisia","imageUrl":"http://st.codeforces.com/images/flags-16/tn.png"},{"countryName":"Chile","imageUrl":"http://st.codeforces.com/images/flags-16/cl.png"},{"countryName":"BosniaandHerzegovina","imageUrl":"http://st.codeforces.com/images/flags-16/ba.png"},{"countryName":"Denmark","imageUrl":"http://st.codeforces.com/images/flags-16/dk.png"},{"countryName":"Israel","imageUrl":"http://st.codeforces.com/images/flags-16/il.png"},{"countryName":"Cyprus","imageUrl":"http://st.codeforces.com/images/flags-16/cy.png"},{"countryName":"Mete","imageUrl":"http://st.codeforces.com/images/flags-16/mt.png"},{"countryName":"Montenegro","imageUrl":"http://st.codeforces.com/images/flags-16/me.png"},{"countryName":"Iceland","imageUrl":"http://st.codeforces.com/images/flags-16/is.png"},{"countryName":"NewZealand","imageUrl":"http://st.codeforces.com/images/flags-16/nz.png"},{"countryName":"Macau","imageUrl":"http://st.codeforces.com/images/flags-16/mo.png"},{"countryName":"Zimbabwe","imageUrl":"http://st.codeforces.com/images/flags-16/zm.png"},{"countryName":"Mauritius","imageUrl":"http://st.codeforces.com/images/flags-16/mu.png"},{"countryName":"PRC","imageUrl":"http://st.codeforces.com/images/flags-16/zh.png"},{"countryName":"Algeria","imageUrl":"http://st.codeforces.com/images/flags-16/dz.png"},{"countryName":"Palestine","imageUrl":"http://st.codeforces.com/images/flags-16/ps.png"},{"countryName":"Pakistan","imageUrl":"http://st.codeforces.com/images/flags-16/pk.png"},{"countryName":"ValencianCountry","imageUrl":"http://st.codeforces.com/images/flags-16/pv.png"},{"countryName":"SaudiArabia","imageUrl":"http://st.codeforces.com/images/flags-16/sa.png"},{"countryName":"Turkey","imageUrl":"http://st.codeforces.com/images/flags-16/tc.png"},{"countryName":"Uruguay","imageUrl":"http://st.codeforces.com/images/flags-16/uy.png"},{"countryName":"Ghana","imageUrl":"http://st.codeforces.com/images/flags-16/gh.png"},{"countryName":"Zambia","imageUrl":"http://st.codeforces.com/images/flags-16/zb.png"},{"countryName":"Hubei","imageUrl":"http://st.codeforces.com/images/flags-16/hb.png"},{"countryName":"Chechnya","imageUrl":"http://st.codeforces.com/images/flags-16/as.png"},{"countryName":"Gensokyo","imageUrl":"http://st.codeforces.com/images/flags-16/gn.png"},{"countryName":"Oman","imageUrl":"http://st.codeforces.com/images/flags-16/om.png"},{"countryName":"Madagascar","imageUrl":"http://st.codeforces.com/images/flags-16/mg.png"},{"countryName":"Nigeria","imageUrl":"http://st.codeforces.com/images/flags-16/ig.png"},{"countryName":"Karp-ChantCountry","imageUrl":"http://st.codeforces.com/images/flags-16/kc.png"},{"countryName":"Nepal","imageUrl":"http://st.codeforces.com/images/flags-16/np.png"},{"countryName":"Mozambique","imageUrl":"http://st.codeforces.com/images/flags-16/mz.png"},{"countryName":"Monaco","imageUrl":"http://st.codeforces.com/images/flags-16/mc.png"},{"countryName":"Haiti","imageUrl":"http://st.codeforces.com/images/flags-16/ht.png"},{"countryName":"Burundi","imageUrl":"http://st.codeforces.com/images/flags-16/bu.png"},{"countryName":"Bermuda","imageUrl":"http://st.codeforces.com/images/flags-16/bm.png"},{"countryName":"GDL","imageUrl":"http://st.codeforces.com/images/flags-16/gl.png"},{"countryName":"Iraq","imageUrl":"http://st.codeforces.com/images/flags-16/iq.png"},{"countryName":"Kyrgyz","imageUrl":"http://st.codeforces.com/images/flags-16/gk.png"},{"countryName":"Nicaragua","imageUrl":"http://st.codeforces.com/images/flags-16/ni.png"},{"countryName":"Benin","imageUrl":"http://st.codeforces.com/images/flags-16/bj.png"},{"countryName":"UK","imageUrl":"http://st.codeforces.com/images/flags-16/uk.png"},{"countryName":"Tanzania","imageUrl":"http://st.codeforces.com/images/flags-16/tz.png"},{"countryName":"Honduras","imageUrl":"http://st.codeforces.com/images/flags-16/hn.png"}]' ) ;
	this.verdictTextReplacements = [ 
		{ source : null , destination : 'In queue' } , 
		{ source : 'ok' , destination : 'Accepted' } , 
		{ source : 'testing' , destination : 'Running' } , 
		{ source : 'challenged' , destination : 'Hacked' } , 
		{ source : '_' , destination : ' ' } , 
		{ source : 'failed' , destination : 'Judgement failed' } , 
		{ source : 'pretests-passed' , destination : 'Pretests passed' } ] ;
	this.ratingDesignations = [ 
		'International Grandmaster' , 
		'Grandmaster' , 
		'International master' , 
		'Master' , 
		'Candidate Master' , 
		'Expert' , 
		'Specialist' , 
		'Pupil' , 
		'Newbie' , 
		'unrated' ] ;
	this.ratingCssClasses = [ 
		'user-rating-red' , 
		'user-rating-red' , 
		'user-rating-orange' , 
		'user-rating-orange' , 
		'user-rating-purple' , 
		'user-rating-blue' , 
		'user-rating-green' , 
		'user-rating-green' , 
		'user-rating-gray' , 
		'user-rating-unrated' ] ;
	this.verdictDoesntHaveCaseNumberToShow = [ 
		'Accepted' , 
		'Compilation error' , 
		'In queue' , 
		'Skipped' , 
		'Hacked' ,
		'Pretests passed' ] ;
	this.angularJsonpRequestQueryParameter = 'jsonp=JSON_CALLBACK' ;
	
	this.getCountryList = function() {
		var res , shsObj ;
		shsObj = new SortHandlerService() ;
		res = shsObj.sort( self.countryList , function( left , right ) {
			return ( left.countryName.localeCompare( right.countryName ) <= 0 ) ? false : true ;
		} ) ;
		return res ;
	} ;
	
	this.getCountryListAsObject = function() {
		var res , i , sz ;
		res = {} ;
		sz = self.countryList.length ;
		for( i = 0 ; i < sz ; i++ ) {
			res[ self.countryList[ i ].countryName ] = self.countryList[ i ].imageUrl ;
		}
		return res ;
	} ;
}

function CodeforcesTableStructures( $sce ) {
	var self ;
	
	self = {} ;
	
	self.submissionTableStructure = [ 
		{ name : 'Submission ID' , sortIndex : 'id' } , 
		{ name : 'Server Date Time' , sortIndex : 'dateTime' } , 
		{ name : 'User Handles' , sortIndex : 'handle' , width : '230px' } , 
		{ name : 'Problem Name' , sortIndex : 'problemName' , width : '190px' } , 
		{ name : 'Problem Tags' , sortIndex : 'problemTags' , width : '120px' } , 
		{ name : 'User Solved' , sortIndex : 'userSolved' } ,
		{ name : 'Language' , sortIndex : 'lang' } , 
		{ name : 'Verdict' , sortIndex : 'verdict' , width : '180px' } , 
		{ name : 'Time (in seconds)' , sortIndex : 'executionTime' } , 
		{ name : 'Memory' , sortIndex : 'executionMemory' } ] ;
	self.standingTableStructure = [ 
		{ name : 'Rank' , sortIndex : 'rank' } , 
		{ name : 'Relative Rank' , sortIndex : 'relativeRank' } , 
		{ name : 'Room Number' , sortIndex : 'room' } , 
		{ name : 'Handle(s)' , sortIndex : 'handle' , width : '230px' } , 
		{ name : 'Points' , sortIndex : 'points' } , 
		{ name : 'Penalty' , sortIndex : 'penalty' } , 
		{ name : 'Hacks' , sortIndex : 'hacks' } ] ;
	self.problemSetTableStructure = [ 
		{ name : 'Contest ID' , sortIndex : 'contestId' } ,
		{ name : 'Problem Index' , sortIndex : 'index' } ,  
		{ name : 'Problem Name' , sortIndex : 'problemName' , width : '320px' } ,
		{ name : 'Problem Tags' , sortIndex : 'problemTags' , width : '200px' } , 
		{ name : 'Points' , sortIndex : 'points' } ,
		{ name : 'User Solved' , sortIndex : 'userSolved' } ,
		{ name : 'Problem Type' , sortIndex : 'problemType' } ] ;
	self.navigationStructure = [ 
		{ name : 'Submissions of ' , title : 'Submissions of ' },
		{ name : 'Problemset Status' , title : 'Problemset Status' } ,
		{ name : 'Contest Submissions' , title : 'Contest Submissions' } ,
		{ name : 'Contest Standings' , title : 'Contest Standings' } ,
		{ name : 'Problem List' , title : 'Problem List' } , 
		{ name : '' , title : '<img alt="Settings" title="Settings" class="navigation-image" src="images/settings.png"/>' } ] ;
	
	this.getCustomStandingTableStructure = function( summary , showRelativeRankFlag ) {
		var res , i , sz , problemColumn ;
		if( summary.numberOfProblems == null || summary.numberOfProblems == '' ) {
			throw new Error( 'Invalid "numberOfProblems" parameter supplied in CodeforcesTableStructures class!' ) ;
		}
		res = [] ;
		sz = self.standingTableStructure.length ;
		for( i = 0 ; i < sz ; i++ ) {
			if( summary.hasPenalty == false && self.standingTableStructure[ i ].sortIndex == 'penalty' ) {
				continue ;
			}
			if( summary.hasHacks == false && self.standingTableStructure[ i ].sortIndex == 'hacks' ) {
				continue ;
			}
			if( showRelativeRankFlag == false && self.standingTableStructure[ i ].sortIndex == 'relativeRank' ) {
				continue ;
			}
			self.standingTableStructure[ i ].currentlySorted = null ;
			res.push( self.standingTableStructure[ i ] ) ;
		}
		for( i = 0 ; i < summary.numberOfProblems ; i++ ) {
			problemColumn = {} ;
			problemColumn.name = String.fromCharCode( 'A'.charCodeAt( 0 ) + i ) ;
			problemColumn.sortIndex = String.fromCharCode( 'a'.charCodeAt( 0 ) + i ) ;
			problemColumn.currentlySorted = null ;
			problemColumn.ariaHidden = true ;
			res.push( problemColumn ) ;
		}
		return res ;
	} ;
	
	this.getCustomSubmissionTableStructure = function( showUserSolvedFlag ) {
		var res , len , i ;
		res = [] ;
		len = self.submissionTableStructure.length ;
		for( i = 0 ; i < len ; i++ ) {
			if( showUserSolvedFlag == false && self.submissionTableStructure[ i ].sortIndex == 'userSolved' ) {
				continue ;
			}
			self.submissionTableStructure[ i ].currentlySorted = null ;
			res.push( self.submissionTableStructure[ i ] ) ;
		}
		return res ;
	} ;
	
	this.getNavigationStructure = function( userHandle ) {
		if( userHandle == null || userHandle == '' ) {
			throw new Error( 'No valid "userHandle" provided for "getNavigationStructure" method.' ) ;
		}
		var res , i , sz , navigationStructureElement ;
		res = [] ;
		sz = self.navigationStructure.length ;
		for( i = 0 ; i < sz ; i++ ) {
			navigationStructureElement = {} ;
			navigationStructureElement.name = self.navigationStructure[ i ].name ;
			navigationStructureElement.title = self.navigationStructure[ i ].title ;
			navigationStructureElement.index = i ; 
			if( i == 0 ) {
				navigationStructureElement.name += userHandle ;
				navigationStructureElement.title += '<strong>' + userHandle + '</strong>' ;
			}
			navigationStructureElement.title = $sce.trustAsHtml( navigationStructureElement.title ) ;
			res.push( navigationStructureElement ) ;
		}
		return res ;
	} ;
	
	this.getCustomProblemSetTableStructure = function() {
		var res , len , i ;
		res = [] ;
		len = self.problemSetTableStructure.length ;
		for( i = 0 ; i < len ; i++ ) {
			self.problemSetTableStructure[ i ].currentlySorted = null ;
			res.push( self.problemSetTableStructure[ i ] ) ;
		}
		return res ;
	} ;
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-48151583-6', {'storage': 'none'});ga('set', 'checkProtocolTask', function(){});ga('require', 'displayfeatures');
