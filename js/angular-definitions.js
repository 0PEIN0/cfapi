/*
Author: S. M. Ijaz-ul-Amin Chowdhury
Codeforces Handle: .PEIN.
Github Username: 0PEIN0
Github Repository Link: https://github.com/0PEIN0/cfapi
License: GNU General Public License version 2
*/

var app = angular.module( 'CodeforcesApplication' , [ 'ngSanitize' ] ) ;
app.service( 'CodeforcesConfiguration' , [ CodeforcesConfiguration ] ) ;
app.service( 'CodeforcesSettings' , [ CodeforcesSettings ] ) ;
app.service( 'CodeforcesTableStructures' , [ CodeforcesTableStructures ] ) ;
app.service( 'StringHandler' , [ StringHandler ] ) ;
app.service( 'SortHandlerService' , [ SortHandlerService ] ) ;
app.service( 'LocalStorageService' , [ 'CodeforcesConfiguration' , LocalStorageService ] ) ;
app.service( 'CodeforcesApiService' , [ '$http' , '$timeout' , '$sce' , 'LocalStorageService' , 'CodeforcesSettings' , 'CodeforcesConfiguration' , 'StringHandler' , CodeforcesApiService ] ) ;
app.controller( 'CodeforcesController' , [ '$scope' , '$sce' , 'CodeforcesApiService' , CodeforcesController ] ) ;
app.directive( 'codeforcesTableDirective' , [ '$sce' , 'CodeforcesConfiguration' , 'SortHandlerService' , CodeforcesTableDirective ] ) ;
app.directive( 'codeforcesContestStandingDirective' , [ 'CodeforcesApiService' , 'CodeforcesTableStructures' , CodeforcesContestStandingDirective ] ) ;
app.directive( 'codeforcesSubmissionsDirective' , [ 'CodeforcesApiService' , 'CodeforcesTableStructures' , CodeforcesSubmissionsDirective ] ) ;
app.directive( 'codeforcesUserStatisticsDirective' , [ 'CodeforcesApiService' , CodeforcesUserStatisticsDirective ] ) ;
app.directive( 'codeforcesRecentSubmissionsDirective' , [ 'CodeforcesApiService' , CodeforcesRecentSubmissionsDirective ] ) ;
app.directive( 'codeforcesContestSubmissionsDirective' , [ 'CodeforcesApiService' , CodeforcesContestSubmissionsDirective ] ) ;
