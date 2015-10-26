/**
 * Created by Fikayo on 4/27/2015.
 */

(function () {
    'use strict';

    angular.module('flightsTime')
        .factory('CacheItem', ['$window', CacheItem])
        .factory('AppPopUps', ['$ionicPopup', AppPopUps])
        .factory('AppLoading', ['$ionicLoading', AppLoading])
        .factory('UploadImage', ['$ionicLoading', '$cordovaFileTransfer', UploadImage])
        .factory('AppSettings', ['$q', '$http', 'CA_URL', 'PORTAL_URL', AppSettings])
        .factory('BusView', ['$q', '$http', 'BT_URL', BusView])
        .factory('BusService', ['$q', '$http', 'CA_URL', BusService])
        .factory('MemberIDInterceptor', ['$log', MemberIDInterceptor])

    function CacheItem($window){
        var storage = $window.localStorage;
        var cachedItem;
        var userID = 'UserID';

        return {

            setCacheItem: setCacheItem,
            getCacheItem: getCacheItem,
            removeCacheItem : removeCacheItem,
            genRandom : genRandom
        };

        function setCacheItem(ItemName, ItemValue) {
                storage.setItem(ItemName, ItemValue);
        }

        function getCacheItem(ItemName) {
            return storage.getItem(ItemName);
        }

        function removeCacheItem(ItemName){
            storage.removeItem(ItemName);
        }

        function genRandom(length) {
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
            return result;
        }
    }//CacheItem


    function AppPopUps($ionicPopup) {
        return {
            showAlert: showAlert
        };

        function showAlert(title, message) {
            $ionicPopup.alert({
                title: title,
                template: message
            });
        }//showAlert
    }//PopUp

    function AppLoading($ionicLoading) {

        return {
            showLoading: showLoading,
            hideLoading: hideLoading
        };

        function showLoading(template) {
            $ionicLoading.show({
                template: template
            });
        }//showLoading

        function hideLoading() {
            $ionicLoading.hide();
        }//hideLoading

    }//AppLoading

    function UploadImage($ionicLoading, $cordovaFileTransfer){

        return {
            upload : upload,
            ft : ft
        };

        function upload(image, params, urlToUpload, successCallback) {
            $ionicLoading.show({template: 'Posting....'});
            var fileURL = image;
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = true;

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(fileURL, encodeURI(urlToUpload), successCallback,
                function(error) {
                    $ionicLoading.show({template: 'Error Posting'});
                    $ionicLoading.hide();
                }, options);

        }//end uploadPicture

        function ft(server, filePath, options, successCallback, errorCallback, progressCallback){

            $cordovaFileTransfer.upload(server, filePath, options)
                .then(successCallback, errorCallback, progressCallback);

        }//ngcUpload

    }//UploadImage

    function AppSettings($q, $http, CA_URL, PORTAL_URL){

        return {
            getPromotedSME : getPromotedSME,
            getSettings : getSettings
        };

        function getPromotedSME(){
            var deferred = $q.defer();

            $http.get(PORTAL_URL + 'external/getpromotedsme?today='+Date.now())
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }//getPromotedSME


        function getSettings(){
            var deferred = $q.defer();

            $http.get(CA_URL + 'external/appsettings')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }
    }//AppSettings

    function BusService($q, $http, CA_URL){

        return {
            getOperators : getOperators,
            getTerminals : getTerminals,
            getHotels : getHotels
        }

        function getOperators(){
            var deferred = $q.defer();

            $http.get(CA_URL + 'bus/getoperators')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }//getOperators

        function getTerminals(){
            var deferred = $q.defer();

            $http.get(CA_URL + 'bus/getterminals')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }//getTerminals

        function getHotels(){
            var deferred = $q.defer();

            $http.get(CA_URL + 'hotels/gethotels')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }//getAirports
    }//BusService

    function BusView($q, $http, BT_URL){

        return {
            getParams : getParams,
            getOperators : getOperators,
            getTerminals : getTerminals,
            getStates : getStates,
            loadFlights : loadFlights,
            getTaxiStates : getTaxiStates
        };

        function getParams(){
            return {
                arrivals : {name : 'arrivals', glance_route : 'app.arrivals'},
                departures : {name : 'departures', glance_route : 'app.departures'},
                all : {name : 'all flights', glance_route : 'app.allflights'}
            };
        }//getParams

        function getOperators(){
                var deferred = $q.defer();

                $http.get(BT_URL + 'external/getoperators')
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function () {
                        deferred.reject();
                    });

                return deferred.promise;
        }//getAirlines

        function getTerminals(){
            var deferred = $q.defer();

            $http.get(BT_URL + 'external/getterminals')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }//getAirports

        

        function loadFlights(category, airport, airline, date){



        }//loadFlights

        function getStates(){
            var deferred = $q.defer();


            $http.get(BT_URL + 'external/getstates')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }//getStates

        function getTaxiStates(){
            var deferred = $q.defer();
            //TODO: Load Nigeria-Only States
            $http.get(API_URL + 'mobile/loadtaxistates')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }//getTaxiStates

        //

    }//FlightsView

    function MemberIDInterceptor($log){

        $log.debug('Interceptor is Responding');

        var memberInterceptor = {

        };

        return memberInterceptor;

    }//MemberIDInterceptor

})();
