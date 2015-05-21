/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

function DataLimitingFilter() {
    return function( arr , start , end ) {
		if( start == -1 || end == -1 || ( start == 0 && end == 0 ) || arr == null ) {
			 return [] ;
		}
        var res ;
        end = Math.min( arr.length , end ) ;
        res = arr.slice( start , end ) ;
        return res ;
    } ;
}