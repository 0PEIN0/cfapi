/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

function LocalStorageService( cfcObj ) {
	this.timeOutHours = 10 ;
	if( cfcObj.localStorageTimeOutHours != null ) {
		this.timeOutHours = cfcObj.localStorageTimeOutHours ;
	}
	
	this.DoesLocalStorageExist = function() {
		try {
			if( localStorage == null ) {
				return false ;
			}
			return true ;
		}
		catch( ex ) {
			throw ex ;
		}
	} ;
	
	this.Set = function( key , value ) {
		try {
			var valueObj , valueJsonString , setTime ;
			if( this.DoesLocalStorageExist() == false ) {
				throw new Error( "Doesn't support 'localStorage' facility!" ) ;
			}
			valueObj = {} ;
			setTime = new Date() ;
			valueObj.startTime = {} ;
			valueObj.startTime.year = setTime.getUTCFullYear() ;
			valueObj.startTime.month = setTime.getUTCMonth()
			valueObj.startTime.day = setTime.getUTCDate() ;
			valueObj.startTime.hours = setTime.getUTCHours() ;
			valueObj.startTime.minutes = setTime.getUTCMinutes() ;
			valueObj.startTime.seconds = setTime.getUTCSeconds() ;
			valueObj.startTime.milliseconds = setTime.getUTCMilliseconds() ;
			valueObj.val = value ;
			valueJsonString = JSON.stringify( valueObj ) ;
			localStorage.setItem( key , valueJsonString ) ;
		}
		catch( ex ) {
			throw ex ;
		}
	} ;
	
	this.Get = function( key ) {
		try {
			var valueObj , res , timeDiff , curTime , valueJsonString , setTime ;
			if( this.DoesLocalStorageExist() == false ) {
				throw new Error( "Doesn't support 'localStorage' facility!" ) ;
			}
			valueJsonString = localStorage.getItem( key ) ;
			if( valueJsonString == null ) {
				return null ;
			}
			curTime = new Date() ;
			curTime = new Date( curTime.getUTCFullYear() , curTime.getUTCMonth() , curTime.getUTCDate() , curTime.getUTCHours() , curTime.getUTCMinutes() , curTime.getUTCSeconds() , curTime.getUTCMilliseconds() ) ;
			valueObj = JSON.parse( valueJsonString ) ;
			res = valueObj.val ;
			setTime = new Date( valueObj.startTime.year , valueObj.startTime.month , valueObj.startTime.day , valueObj.startTime.hours , valueObj.startTime.minutes , valueObj.startTime.seconds , valueObj.startTime.milliseconds ) ;
			timeDiff = Math.floor( ( curTime.valueOf() - setTime.valueOf() ) / 36e5 ) ;
			if( timeDiff >= this.timeOutHours ) {
				this.Remove( key ) ;
				res = null ;
			}
			return res ;
		}
		catch( ex ) {
			throw ex ;
		}
	} ;
	
	this.Remove = function( key ) {
		try {
			if( this.DoesLocalStorageExist() == false ) {
				throw new Error( "Doesn't support 'localStorage' facility!" ) ;
			}
			localStorage.setItem( key , null ) ;
		}
		catch( ex ) {
			throw ex ;
		}
	} ;
}

function StringHandler() {

	this.roundToDecimalPlaces = function( number , decimalPlaces ) {
		var res , multiplier , cn , i , len , idx ;
		multiplier = 1 ;
		cn = decimalPlaces ;
		while( cn > 0 ) {
			multiplier *= 10 ;
			cn-- ;
		}
		number = ( number * multiplier ) / multiplier ;
		number = number.toString() ;
		len = number.length ;
		idx = -1 ;
		for( i = 0 ; i < len ; i++ ) {
			if( number.charAt( i ) == '.' ) {
				idx = i ;
				break ;
			}
		}
		if( idx == -1 ) {
			res = number + '.' ;
			for( i = 0 ; i < decimalPlaces ; i++ ) {
				res += '0' ;
			}
		}
		else {
			cn = ( len - 1 ) - idx ;
			res = number ;
			if( cn < decimalPlaces ) {
				cn = decimalPlaces - cn ;
				for( i = 0 ; i < cn ; i++ ) {
					res += '0' ;
				}
			}
			else {
				res = '' ;
				for( i = 0 ; i <= idx + decimalPlaces ; i++ ) {
					res += number.charAt( i ) ;
				}
			}
		}
		return res ;
	} ;

	this.replaceAssociatedStrings = function( associationList , textString ) {
		var i , sz ;
		sz = associationList.length ;
		if( textString == null ) {
			return textString ;
		}
		textString = textString.toLowerCase() ;
		for( i = 0 ; i < sz ; i++ ) {
			if( associationList[ i ].source == null ) {
				if( textString == null ) {
					textString = associationList[ i ].destination ;
					break ;
				}
			}
			else {
				while( textString.search( associationList[ i ].source ) != -1 ) {
					textString = textString.replace( associationList[ i ].source , associationList[ i ].destination ) ;
				}
			}
		}
		return textString ;
	} ;

	this.makeTheFirstCharacterOfStringCapitalized = function( textString ) {
		var res , len , i ;
		len = textString.length ;
		res = '' ;
		for( i = 0 ; i < len ; i++ ) {
			if( i == 0 ) {
				res += ( '' + textString.charAt( i ) ).toUpperCase() ;
			}
			else {
				res += textString.charAt( i ) ;
			}
		}
		return res ;
	} ;
}

function SortHandlerService() {
	var self ;

	self = {} ;
	
	self.doMergeSort = function( l , r ) {
		var res , m , brr , crr , i , j , sz1 , sz2 , compareResult ;
		res = [] ;
		if( l > r ) {
			return null ;
		}
		if( l == r ) {
			res.push( self.arr[ l ] ) ;
			return res ;
		}
		m = Math.floor( ( l + r ) / 2 ) ;
		brr = self.doMergeSort( l , m ) ;
		crr = self.doMergeSort( m + 1 , r ) ;
		sz1 = brr.length ;
		sz2 = crr.length ;
		for( i = 0 , j = 0 ; i < sz1 || j < sz2 ; ) {
			if( i >= sz1 ) {
				res.push( crr[ j ] ) ;
				j++ ;
			}
			else if( j >= sz2 ) {
				res.push( brr[ i ] ) ;
				i++ ;
			}
			else {
				compareResult = self.comparatorFunction( brr[ i ] , crr[ j ] ) ;
				if( compareResult == false ) {
					res.push( brr[ i ] ) ;
					i++ ;
				}
				else if( compareResult == true ) {
					res.push( crr[ j ] ) ;
					j++ ;
				}
				else {
					throw new Error( 'Invalid sort comparator return value!' ) ;
				}
			}
		}
		return res ;
	} ;
	
	this.sort = function( arr , comparatorFunction ) {
		if( arr == null ) {
		throw new Error( 'Empty "arr" parameter provided for SortHandler class!' ) ;
		}
		if( comparatorFunction == null ) {
			throw new Error( 'Empty "comparatorFunction" parameter provided for SortHandler class!' ) ;
		}
		if( typeof comparatorFunction != 'function' ) {
			throw new Error( '"comparatorFunction" parameter provided for SortHandler class is not a function, expected a function!' ) ;
		}
		self.arr = arr ;
		self.comparatorFunction = comparatorFunction ;
		return self.doMergeSort( 0 , self.arr.length - 1 ) ;
	} ;
}
