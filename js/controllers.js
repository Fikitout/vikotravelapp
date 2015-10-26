(function () {
    'use strict';

    angular.module('flightsTime.controllers', [])
        .controller('AppCtrl', ['$rootScope', '$scope', '$state', 'AppSettings', 'CacheItem', 'AppPopUps', 'BusService', 'BusView', AppCtrl])
        .controller('SubmitMemberIdCtrl', ['$scope', '$rootScope', '$state', 'PORTAL_URL', 'CacheItem', 'AppLoading', 'AppPopUps', SubmitMemberIdCtrl])
        .controller('ActivatePinCtrl', ['$scope', '$state', 'BT_URL', 'AppLoading', 'AppPopUps', 'CacheItem', ActivatePinCtrl])
        .controller('InterestFormCtrl', ['$scope', '$rootScope', '$state', 'PORTAL_URL', 'CacheItem', 'AppLoading', 'AppPopUps', InterestFormCtrl])
        .controller('HomeCtrl', ['$rootScope', '$scope', '$state', HomeCtrl])
        .controller('SearchHotelCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', SearchHotelCtrl])
        .controller('SelectHotelCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', SelectHotelCtrl])
        .controller('SelectRoomCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', SelectRoomCtrl])
        .controller('BookRoomCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', BookRoomCtrl])
        .controller('PaymentOptionsCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', PaymentOptionsCtrl])
        .controller('SearchBusCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', SearchBusCtrl])
        .controller('BusResultsCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', 'CacheItem', BusResultsCtrl])
        .controller('BookBusCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', 'CacheItem', BookBusCtrl])
        .controller('BusPaymentOptionsCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', BusPaymentOptionsCtrl])
        .controller('FindSchedulesCtrl', ['$rootScope', '$scope', '$state', 'BT_URL', 'AppLoading', 'AppPopUps', FindSchedulesCtrl])
        .controller('ScheduleResultsCtrl', ['$rootScope', '$scope', '$state', 'BT_URL', 'AppLoading', 'AppPopUps', ScheduleResultsCtrl])
        .controller('PortfolioCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'BT_URL', 'AppLoading', 'AppPopUps', PortfolioCtrl])
        .controller('HotelHistoryCtrl', ['$scope', '$rootScope', '$state', 'CA_URL', HotelHistoryCtrl])
        .controller('BusHistoryCtrl', ['$scope', '$rootScope', '$state', 'CA_URL', BusHistoryCtrl])
        .controller('AppMessagesCtrl', ['$scope', '$rootScope', '$state', 'API_URL', 'PORTAL_URL', AppMessagesCtrl])
        .controller('SelectDiscountedHotelCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', SelectDiscountedHotelCtrl])
        .controller('SelectDiscountedBusCtrl', ['$rootScope', '$scope', '$state', 'CA_URL', 'AppLoading', 'AppPopUps', 'CacheItem', SelectDiscountedBusCtrl])
        .directive('iframeOnload', [iframeOnLoad])
        .filter("sanitize", sanitize);

    function AppCtrl($rootScope, $scope, $state, AppSettings, CacheItem, AppPopUps, BusService, BusView) {

        
        $rootScope.checkMemberID = checkMemberID;
        $rootScope.goToWebPage = goToWebPage;
        $rootScope.goToPage = goToPage;
        $rootScope.goToPageWithValidation = goToPageWithValidation;
        $scope.checkSubscription = checkSubscription;
        $rootScope.checkSubscription = checkSubscription;
        //$rootScope.activeDaysLeft = getDaysLeft();
        
        
        //Set AppID
        setAppID();
        //Check if an APP_ID is set
        checkMemberID();
        //Check subscription on Page load
        checkSubscription();
        
        
        //Load App Configuration
        AppSettings.getSettings()
            .then(function(settings){
                $rootScope.appSettings = settings;

                console.log($rootScope.appSettings);
            });

        //Load promoted SMEs
        AppSettings.getPromotedSME()
            .then(function(smes){
                $rootScope.promotedSMEs = smes;

                console.log($rootScope.promotedSMEs);
            });

        //Load Initialization data
        BusService.getOperators()
            .then(function(data){
                $rootScope.busoperators = data;
                console.log($rootScope.busoperators);
            });

        BusService.getTerminals()
            .then(function(data){
                $rootScope.busterminals = data;
                console.log($rootScope.busterminals);
            });

        /*BusService.getHotels()
            .then(function(data){
                $rootScope.hotelslist = data;
                console.log($rootScope.hotelslist);
            });*/

        BusView.getTerminals()
            .then(function(data){
                $rootScope.bustimesTerminals = data;
                console.log($rootScope.bustimesTerminals);
            });

        BusView.getOperators()
            .then(function(data){
                $rootScope.bustimesOperators = data;
                console.log($rootScope.bustimesOperators);
            });
         
        BusView.getStates()
            .then(function(data){
                $rootScope.bustimesStates = data;
                console.log($rootScope.bustimesStates);
            });
        /*
        FlightsView.getTaxiStates()
            .then(function(data){
                $rootScope.taxistates = data;
                //console.log($rootScope.airports);
            });*/


        
        window.uploadDone = function(){
            $scope.hideloader = true;
            $scope.$apply();
        };

        function checkMemberID(){

            //Check if MemberID exists
            if(CacheItem.getCacheItem("member_id")){
                $rootScope.member_id = CacheItem.getCacheItem("member_id");
                console.log($rootScope.member_id);
                //Boolean Varibale to check if a member exists
                $rootScope.hasMember = !!$rootScope.member_id;
            }//end memberid Check
            else{
                $state.go('submitmemberid');
            }
        }

        function goToWebPage(page) {
            window.open(page, '_blank','location=yes');
            return false;
        }//goToWebPage

        function goToPage(page) {

            //Check Subscription
            $scope.checkSubscription();
            $state.go(page);
        }//goToPage

        function goToPageWithValidation(page){

            //Removes the 'subscribed' item if it has expired
            checkSubscription();

            //Check whether the subscribed item still exists
            if(CacheItem.getCacheItem("subscribed")){

                //Go to desired page
                $state.go(page);
            }
            else{
                //Display Alert
                AppPopUps.showAlert("Subscription Expired. Buy a new Pin code to continue accessing this feature. Thanks.");
                //Return to homepage
                $state.go('app.home');

            }
        }

        //Check if an AppID Exists else create one
        function setAppID(){

            if(CacheItem.getCacheItem("AppID")){
                console.log("AppID Exists"); 
            }
            else{
                console.log("Creating New AppID...."); 
                var NewAppID = CacheItem.genRandom(16);
                CacheItem.setCacheItem("AppID", NewAppID);
            }

             $rootScope.AppID = CacheItem.getCacheItem("AppID");
             console.log($rootScope.AppID);
        }


        function checkSubscription(){
            //Check Subscription
            /*if(localStorage.getCacheItem('subscribed')){
                console.log("Subscription Active");
                $scope.subscribed = true;
            }
            else{
                console.log("Subscription Ended");
                $scope.subscribed = false;
            }*/

            //Check if a subscription date exists
            if(CacheItem.getCacheItem("subscribed")){

                //Check if it has expired
                if(Date.now() >= CacheItem.getCacheItem("subscribed")){
                    //Remove the subscribed item
                    CacheItem.removeCacheItem("subscribed");
                    console.log("Subscription Ended");
                    $scope.subscribed = false;

                    //Remove all bookings
                    CacheItem.setCacheItem("bookings", 0);
                }
                else{
                    console.log("Subscription Active");
                    $scope.subscribed = true;
                }
            }
            else{
                console.log("Subscription Ended");
                $scope.subscribed = false;
            }
        }//checkSubscription

    }//AppCtrl

    function SubmitMemberIdCtrl($scope, $rootScope, $state, PORTAL_URL, CacheItem, AppLoading, AppPopUps){

        var vm = this;

        vm.submitMemberID = submitMemberID;

        function submitMemberID(){

            AppLoading.showLoading('Submitting...');

            $.post(PORTAL_URL+'mobile/verifymemberid', {member_id : vm.member_id}, function(raw_response){

                var response = $.parseJSON(raw_response);

                if(response.success){

                    //activate one day access if this is first time by checking if an id exists before
                    if(!CacheItem.getCacheItem("member_id")){
                        var dayStamp = 24 * 60 * 60 * 1000;

                        var days = 1;

                        var expires = Date.now() + (days * dayStamp);

                        CacheItem.setCacheItem("subscribed", expires);

                        //Set bookings to zero
                        CacheItem.setCacheItem("bookings", 0);
                        $rootScope.checkSubscription();
                    }
                    //set new id
                    CacheItem.setCacheItem("member_id", vm.member_id);

                    //refresh rootScope memberid
                    $rootScope.member_id = CacheItem.getCacheItem("member_id");
                    $rootScope.hasMember = true;

                    //Show PopUp indicating new ID
                    AppLoading.hideLoading();
                    AppPopUps.showAlert("SME Code "+vm.member_id+" Successfully Registered.");

                    //Redirect to homepage
                    $state.go('app.home');


                }else{
                    //Display error message from server
                    AppLoading.hideLoading();
                    AppPopUps.showAlert(response.message);
                }

                /**/

                $scope.$apply();
            });
            //console.log('Member ID: '+vm.member_id);
        }

    }//SubmitMemberIdCtrl

    function ActivatePinCtrl($scope, $state, BT_URL, AppLoading, AppPopUps, CacheItem){

        var vm  = this;

        vm.submitPin = submitPin;

        //$scope.activeDaysLeft = getDaysLeft();
        getDaysLeft();

        function submitPin(){

            AppLoading.showLoading('Loading');
            //disable pincode field

            var request = {pincode:vm.pincode};
            //verify pin and deactivate if valid
            $.post(BT_URL+'external/loadpin', request, function(response){

                var response = $.parseJSON(response);

                if(response.success){

                    console.log("Days : "+response.days+", Bookings : "+response.bookings);

                    ActivatePin(response.days, response.bookings);
                    /*
                    switch(Number(response.term)) {
                        case 0://two weeks
                            ActivatePin(14, 2);
                            break;
                        case 1://one week
                            ActivatePin(7, 1);
                            break;
                        case 2://one month
                            ActivatePin(30, 4);
                            break;
                    }
                    */
                    //Check for the number of active days for pin, if not available default to a day
                    //var days = (response.days)?Number(response.days) : 1;

                    //var expires = Date.now() + (days * dayStamp);

                    //CacheItem.setCacheItem("subscribed", expires);

                    //Set subscribed to true
                    $scope.checkSubscription();

                    //Show success message
                    AppLoading.hideLoading();

                    AppPopUps.showAlert(response.message);

                    //Redirect to homepage
                    $state.go('app.home');
                }else{
                    //notify user of error
                    //Show success message
                    AppLoading.hideLoading();

                    AppPopUps.showAlert(response.message);
                }

                $scope.$apply();
            })

        }//submitPin

        //Sets the proper days or extension for both subscription and bookings
        function ActivatePin(days, bookings){

            var dayStamp = 24 * 60 * 60 * 1000;

            var active_subscription = CacheItem.getCacheItem("subscribed");
            console.log("Old Expiry date : "+active_subscription);

            var new_expiry_date;
            /**Set or extend subscription date**/
            if(active_subscription){

                //Increase the expiry date of the currently running subscription
                new_expiry_date  = Number(active_subscription) + (Number(days) * dayStamp);

            }
            else{

                //Add the number of days from today
                new_expiry_date = Date.now() + (Number(days) * dayStamp);
            }

            //Set the new date
            CacheItem.setCacheItem("subscribed", new_expiry_date);

            console.log("New Expiry date : "+CacheItem.getCacheItem("subscribed"));

            /**Set or extend bookings**/
            var current_bookings_count = CacheItem.getCacheItem("bookings");
            console.log("Bookings : "+current_bookings_count);

            var new_bookings_count;

            if(current_bookings_count){

                //Extend number of bookings
                new_bookings_count  = Number(current_bookings_count) + Number(bookings);
            }
            else{

                //Set a new bookings count based on pin
                new_bookings_count = Number(bookings);
            }

            //Set the new bookings count
            CacheItem.setCacheItem("bookings", new_bookings_count);

            console.log("New Bookings Count : "+CacheItem.getCacheItem("bookings"));
        }//ActivatePin

        function getDaysLeft(){
            var daysLeft = (CacheItem.getCacheItem("subscribed") - Date.now())/(24 * 60 * 60 * 1000);

            if(daysLeft < 1){
                $scope.activeDaysLeft = "Today, Total Bus Bookings : "+CacheItem.getCacheItem("bookings");
            }
            else{
                $scope.activeDaysLeft = "in "+Math.floor(daysLeft)+" days, Total Bus Bookings : "+CacheItem.getCacheItem("bookings");
            }
        }//getDaysLeft
    }//ActivatePinCtrl

    function InterestFormCtrl($scope, $rootScope, $state, PORTAL_URL, CacheItem, AppLoading, AppPopUps){

        var vm = this;
        vm.submitInterest = submitInterest;
        vm.interestForm = {};

        function submitInterest(){
            console.log(vm.interestForm);

            //Add the AppID to check for duplicates
            vm.interestForm.app_id = $rootScope.AppID;

            AppLoading.showLoading('Submitting...');

            $.post(PORTAL_URL+'mobile/submitinterest', vm.interestForm, function(raw){

                var response = $.parseJSON(raw);

                if(response.success){

                    AppLoading.hideLoading();

                    AppPopUps.showAlert(response.message);

                    vm.interestForm = {};

                    $state.go(app.home);

                }else{
                    AppLoading.hideLoading();

                    AppPopUps.showAlert(response.message);
                }

                $scope.$apply();
            });
        }//submitInterest


    }//InterestFormCtrl

    function HomeCtrl($rootScope, $scope, $state) {

        $scope.flightsViewOptions = flightsViewOptions;

        function flightsViewOptions(flight_type){

            $rootScope.flight_type = flight_type;

            $state.go('app.flightviewoptions');

        }//flightsViewOptions

    }//HomeCtrl


    /*************************Hotel Controllers******************************/    
    function SearchHotelCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps){

        var vm = this;

        vm.findHotels = findHotels;

        function findHotels(){
            //console.log(vm.keyword);

            AppLoading.showLoading('Searching Hotels...');

            $.post(CA_URL+'hotels/searchhotels', {keyword : vm.keyword}, function(response){

                $rootScope.hotelresults = $.parseJSON(response);

               // console.log($rootScope.hotelresults);

                AppLoading.hideLoading();

                //Clear Form
                //vm.keyword = "";

                $state.go('app.selecthotel');

                $scope.$apply();
            })
            .fail(function(){ 
              // Handle error here
              AppLoading.hideLoading();
              AppPopUps.showAlert('Something went wrong. Pls try again.');
              $scope.$apply();
            });
        }//findHotels
    }//SearchHotelCtrl

    function SelectHotelCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps){

        var vm = this;
        //Empty hotelDetails first
        $rootScope.hotelDetails = {};

        vm.findHotelRooms = findHotelRooms;

        //Watch for Hotel Selection to Load Hotel Details
        //NB: $watch in ionic access scope variables directly and not vm
        $scope.$watch("hotels.selectedhotel", function(newValue, oldValue){
            //console.log(newValue);

            //Extract Hotel Details from Bulk hotel Data
            $rootScope.hotelDetails = _.findWhere($rootScope.hotelresults, {id:newValue});

            //console.log($scope.hotelDetails);
        }, true);

        function findHotelRooms(){

            AppLoading.showLoading('Loading Rooms..');
            //console.log(vm.selectedhotel);
            $.post(CA_URL+'hotels/getrooms', {hotel_id : vm.selectedhotel}, function(response){

                $rootScope.roomsresults = $.parseJSON(response);

                //console.log($rootScope.roomsresults);

                AppLoading.hideLoading();

                //Clear select box
                //vm.selectedhotel = "";

                $state.go('app.hotelrooms');

                $scope.$apply();
            })
            .fail(function(){ 
              // Handle error here
              AppLoading.hideLoading();
              AppPopUps.showAlert('Something went wrong. Pls try again.');
              $scope.$apply();
            });
        }//findHotelRooms
    }//SelectHotelCtrl

    function SelectRoomCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps){

        var vm = this;

        vm.selectRoom = selectRoom;

        function selectRoom(roomId){
            //console.log(roomId);

            $rootScope.selectedRoom = _.findWhere($rootScope.roomsresults, {id:roomId});

            //console.log($rootScope.selectedRoom);

            //Navigate to Booking details Page
            $state.go('app.bookroom');
        }//selectRoom
    }//SelectRoomCtrl

    function BookRoomCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps){

        var vm = this;
        vm.bookingForm = {};//Form Values
        vm.numNights = numNights;
        vm.calculatePrice = calculatePrice;
        vm.bookHotel = bookHotel;
       
        //Set Default values
        //Checkin
        $scope.checkIn = new Date();
        vm.bookingForm.guestcheckindate = $scope.checkIn.format("yyyy-mm-dd");
        console.log(vm.bookingForm.guestcheckindate);


        $scope.datePickerCheckInCallback = function (val) {
            if(typeof(val)==='undefined'){
                
            }else{
                //console.log(val.format("yyyy-mm-dd"));
                vm.bookingForm.guestcheckindate = val.format("yyyy-mm-dd");
                console.log(vm.bookingForm.guestcheckindate);

                //numNights();
            }
        };

        //CheckOut
        $scope.checkOut = new Date();
        vm.bookingForm.guestcheckoutdate = $scope.checkOut.format("yyyy-mm-dd");
        console.log(vm.bookingForm.guestcheckoutdate);


        $scope.datePickerCheckOutCallback = function (val) {
            if(typeof(val)==='undefined'){
                
            }else{
                //console.log(val.format("yyyy-mm-dd"));
                vm.bookingForm.guestcheckoutdate = val.format("yyyy-mm-dd");
                console.log(vm.bookingForm.guestcheckoutdate);

                //numNights();
            }
        };

        function numNights(){
      
              var fromStamp = new Date(vm.bookingForm.guestcheckindate).getTime()/1000;
              var toStamp = new Date(vm.bookingForm.guestcheckoutdate).getTime()/1000;
              
              var nights = Math.round(((toStamp - fromStamp)/(60*60*24)));

              //set form Value
              vm.bookingForm.totaldays = nights;
              
              return nights?nights : 0;
        }//numNights

        function calculatePrice(){
            var discount_equivalent = ($rootScope.selectedRoom.roompernightprice - ($rootScope.selectedRoom.roompernightprice * $rootScope.selectedRoom.discount/100));
            var discounted_price = ($rootScope.selectedRoom.discount > 0)? discount_equivalent : $rootScope.selectedRoom.roompernightprice;
            var charged_price = discounted_price * vm.bookingForm.num_rooms * vm.bookingForm.totaldays;
            var service_charge = $rootScope.appSettings.service_charge;
            var VAT = charged_price * ($rootScope.appSettings.vat/100);
            var total_price = charged_price + service_charge + VAT;

            //Save in form values
            vm.bookingForm.pernightprice = $rootScope.selectedRoom.roompernightprice;//original price
            vm.bookingForm.amountpaid = total_price;
            vm.bookingForm.agent_discount = $rootScope.selectedRoom.agentDiscount;

            return total_price?total_price : 0;
            //(selectedRoom.roompernightprice * booking.bookingForm.num_adults * booking.bookingForm.num_rooms * booking.numNights()) + ((selectedRoom.roompernightprice * booking.bookingForm.num_adults * booking.bookingForm.num_rooms * booking.numNights())/20 + 100)
        }//calculatePrice

        /*function calculatePrice(){

            var charged_price = $rootScope.selectedRoom.roompernightprice * vm.bookingForm.num_rooms * vm.bookingForm.totaldays;
            var service_charge = $rootScope.appSettings.service_charge;
            var VAT = charged_price * ($rootScope.appSettings.vat/100);
            var total_price = charged_price + service_charge + VAT;

            //Save in form values
            vm.bookingForm.pernightprice = $rootScope.selectedRoom.roompernightprice;
            vm.bookingForm.amountpaid = total_price;

            return total_price?total_price : 0;
            //(selectedRoom.roompernightprice * booking.bookingForm.num_adults * booking.bookingForm.num_rooms * booking.numNights()) + ((selectedRoom.roompernightprice * booking.bookingForm.num_adults * booking.bookingForm.num_rooms * booking.numNights())/20 + 100)
        }//calculatePrice*/

        function bookHotel(){

            AppLoading.showLoading('Processing....');
            //Add Other Parameters
            vm.bookingForm.hotelFK = Number($rootScope.hotelDetails.id);
            vm.bookingForm.roomFK = Number($rootScope.selectedRoom.id);

            //AgentID
            vm.bookingForm.agentid = $rootScope.member_id;

            //Set bookedby to be the appid inorder to pull messages
            vm.bookingForm.appmessage = $rootScope.AppID;

            //Save Guest in Scope
            $rootScope.hotelguest = vm.bookingForm.guest;

            //console.log(vm.bookingForm);

            if(vm.bookingForm.totaldays < 1){
                AppPopUps.showAlert('Select Apropriate Check-In and Check-Out Dates');
            }
            else{

                $.post(CA_URL+'hotels/bookhotelroom', vm.bookingForm, function(raw_response){

                    var response = $.parseJSON(raw_response);

                    console.log(response);

                    if(response.success){

                        AppLoading.hideLoading();
                        //Save the booking details into the scope
                        $rootScope.bookingSuccessDetails = response.booking;

                        //Clear Booking Form
                        vm.bookingForm = {};

                        //Display Payment Options
                        $state.go('app.payoptions');
                    }else{
                        AppLoading.hideLoading();
                        AppPopUps.showAlert(response.message);
                    }

                    $scope.$apply();
                })
                .fail(function(){ 
                  // Handle error here
                  AppLoading.hideLoading();
                  AppPopUps.showAlert('Something went wrong. Pls try again.');
                  $scope.$apply();
                });
            }//end nights error check



            //console.log(vm.bookingForm);
        }//bookHotel
    }//BookRoomCtrl


    function PaymentOptionsCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps){

        var vm = this;

        vm.payMethod = payMethod;

        function payMethod(method){

            AppLoading.showLoading('Completing Transaction...');

            var bookingnumber = $rootScope.bookingSuccessDetails.bookingnumber;

            $.post(CA_URL+'hotels/setpaymentmethod', {booking_id : bookingnumber, payment_method : method}, function(raw){

                var response = $.parseJSON(raw);

                if(response.success){

                    AppLoading.hideLoading();
                    if(method == 'Bank Transfer'){
                        $state.go('app.payinbankconfirmation');
                    }
                    else if(method == 'Pay-On-Arrival'){
                        $state.go('app.payonarrivalconfirmation');
                    }
                }
                else{
                    AppLoading.hideLoading();
                    AppPopUps.showAlert(response.message);
                }

                $scope.$apply();
            })
        }//payMethod
    }//PaymentOptionsCtrl

    /***********************Bus Controllers*************************/

    function SearchBusCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps){

        var vm = this;
        $scope.showTerminals = false;
        vm.searchForm = {}; //Search Form
        vm.searchBus = searchBus;
        $scope.loadingOperators = false;

        $scope.$watch("search.searchForm.depart", function(newValue, oldValue){

            console.log(vm.searchForm.depart+" "+vm.searchForm.arrive);
            
            //Check if the 'from' and 'to' values are not empty
            loadOperators();

        }, true);

        $scope.$watch("search.searchForm.arrive", function(newValue, oldValue){

            console.log(vm.searchForm.depart+" "+vm.searchForm.arrive);
            
            //Check if the 'from' and 'to' values are not empty
            loadOperators();

        }, true);


        //Watch for Bus Operator Selection to Load Terminals
        //NB: $watch in ionic access scope variables directly and not vm
        $scope.$watch("search.searchForm.operator", function(newValue, oldValue){

            $scope.showTerminals = false;
            //Get The Trips in the result set for this operator
            $scope.operatorTrips = _.where($scope.busSearchPreResults, {busoperator:newValue});

            //Get All the unique Terminals in this result set
            $scope.routeTerminals = _.uniq(_.pluck($scope.operatorTrips, 'busterminal'));

            $scope.showTerminals = true;
            console.log($scope.routeTerminals);
           
           /*var operator = _.findWhere($rootScope.busoperators, {id:newValue});
           console.log(operator);

           var operatorName = operator.busoperator?operator.busoperator: "";
           //Extract Hotel Details from Bulk hotel Data
           $scope.terminals = _.where($rootScope.busterminals, {busoperator:newValue});

           //Show Terminal Selection if there are terminals
           if($scope.terminals.length !=0){
                $scope.showTerminals = true;
           }
           else{
                $scope.showTerminals = false;
           }

           console.log($scope.terminals);
            */
            //console.log($scope.hotelDetails);
        }, true);

        function loadOperators(){
            if(vm.searchForm.depart!="" && vm.searchForm.arrive!=""){

                $scope.loadingOperators = true;

                //Load All Buses for this route
                $.post(CA_URL+'bus/findbuses', vm.searchForm, function(raw){

                    var response = $.parseJSON(raw);

                    $scope.loadingOperators = false;

                    $scope.busSearchPreResults = response;

                    //Get All unique Operators in this results set
                    $scope.routeOperators = _.uniq(_.pluck(response, 'busoperator'));

                    console.log($scope.routeOperators);

                    $scope.$apply();
                });
            }
        }//loadOperators

        function searchBus(){
            console.log(vm.searchForm);

            //Save the search Parameters into the global scope
            $rootScope.searchForm = vm.searchForm;

            AppLoading.showLoading('Searching...');

            $.post(CA_URL+'bus/findbuses', vm.searchForm, function(raw){

                var response = $.parseJSON(raw);

                //console.log(response);
                //Save the buses in global scope
                $rootScope.busResults = response;

                AppLoading.hideLoading();

                if($rootScope.busResults.length==0){
                    AppPopUps.showAlert('No Buses Found for this Route');
                }
                else{
                    console.log($rootScope.busResults);
                    //Go to bus list page
                    $state.go('app.searchbusresults');
                }

                $scope.$apply();
            })
            .fail(function(){ 
              // Handle error here
              AppLoading.hideLoading();
              AppPopUps.showAlert('Something went wrong. Pls try again.');
              $scope.$apply();
            });
        }//searchBus
    }//SearchBusCtrl

    function BusResultsCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps, CacheItem){

        var vm = this;

        vm.bookBus = bookBus;

        function bookBus(busId){

            //Bookings Check
            if(Number(CacheItem.getCacheItem("bookings")) > 0){
                //Set the selected bus into the global scope
                $rootScope.selectedBus = _.findWhere($rootScope.busResults, {id : busId});

                console.log($rootScope.selectedBus);

                $state.go('app.bookbus');
            }
            else{
                AppPopUps.showAlert("You have 0 Bus Bookings Left. Enter new pin to activate more bus Bookings");

                //Redirect to pin activation page
                $state.go('app.enterpin');
            }
            

        }//bookBus


    }//BusResultsCtrl

    function BookBusCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps, CacheItem){

        var vm = this;
        vm.calculatePrice = calculatePrice;
        vm.submitBusBooking = submitBusBooking;
        vm.bookingForm = {};
        vm.bookingForm.guest = {};

        //Set Default values
        //Number of Seats
        vm.bookingForm.num_seats = 1;
        vm.bookingForm.guest.title = "Mr.";

        //Travel Date
        $scope.travelDate = new Date();
        vm.bookingForm.boarding_datetime = $scope.travelDate.format("yyyy-mm-dd");
        console.log(vm.bookingForm.boarding_datetime);


        $scope.datePickerCallback = function (val) {
            if(typeof(val)==='undefined'){
                
            }else{
                //console.log(val.format("yyyy-mm-dd"));
                vm.bookingForm.boarding_datetime = val.format("yyyy-mm-dd");
                console.log(vm.bookingForm.boarding_datetime);

                //numNights();
            }
        };

        function calculatePrice(){
            var discount_equivalent = ($rootScope.selectedBus.busfare - ($rootScope.selectedBus.busfare * $rootScope.selectedBus.discount/100));
            var discounted_price = ($rootScope.selectedBus.discount > 0)? discount_equivalent : $rootScope.selectedBus.busfare;
            var charged_price = discounted_price * vm.bookingForm.num_seats;
            var service_charge = $rootScope.appSettings.bus_service_charge;
            var VAT = charged_price * ($rootScope.appSettings.vat/100);
            var total_price = charged_price + service_charge + VAT;

            //Save in form values
            vm.bookingForm.busfare = $rootScope.selectedBus.busfare;
            vm.bookingForm.amountpaid = total_price;
            vm.bookingForm.agent_discount = $rootScope.selectedBus.agentDiscount;//Agent discount to be calcullated on server

            return total_price?total_price : 0;
            //(selectedRoom.roompernightprice * booking.bookingForm.num_adults * booking.bookingForm.num_rooms * booking.numNights()) + ((selectedRoom.roompernightprice * booking.bookingForm.num_adults * booking.bookingForm.num_rooms * booking.numNights())/20 + 100)
        }//calculatePrice


        /*function calculatePrice(){

            var charged_price = $rootScope.selectedBus.busfare * vm.bookingForm.num_seats;
            var service_charge = $rootScope.appSettings.bus_service_charge;
            var VAT = charged_price * ($rootScope.appSettings.vat/100);
            var total_price = charged_price + service_charge + VAT;

            //Save in form values
            vm.bookingForm.busfare = $rootScope.selectedBus.busfare;
            vm.bookingForm.amountpaid = total_price;

            return total_price?total_price : 0;
            //(selectedRoom.roompernightprice * booking.bookingForm.num_adults * booking.bookingForm.num_rooms * booking.numNights()) + ((selectedRoom.roompernightprice * booking.bookingForm.num_adults * booking.bookingForm.num_rooms * booking.numNights())/20 + 100)
        }//calculatePrice*/

        function submitBusBooking(){

            //Get busoperator FK 
            /*var seletedOperator = _.findWhere($rootScope.busoperators, {busoperator:$rootScope.selectedBus.busoperator});
            vm.bookingForm.busoperatorFK = Number(seletedOperator.id);*/
            var seletedOperator = _.findWhere($rootScope.busterminals, {busoperator:$rootScope.selectedBus.busoperator});
            vm.bookingForm.busoperatorFK = seletedOperator.busoperator;

            //Get Bus FK
            //vm.bookingForm.busFK = Number($rootScope.selectedBus.id);
            vm.bookingForm.busFK = $rootScope.selectedBus.bustype;

            //Get Terminal FK
           /* var seletedTerminal = _.findWhere($rootScope.busterminals, {busterminal:$rootScope.selectedBus.busterminal});
            vm.bookingForm.terminalFK = Number(seletedTerminal.id);*/
            vm.bookingForm.terminalFK = $rootScope.selectedBus.busterminal;

            //AgentID
            vm.bookingForm.agentid = $rootScope.member_id;

            //Set bookedby to be the appid inorder to pull messages
            vm.bookingForm.appmessage = $rootScope.AppID;

            console.log(vm.bookingForm);

            //Save the booking data in the global scope
            $rootScope.busBookingForm = vm.bookingForm;

            AppLoading.showLoading('Processing Booking...');

            var num_bookings = Number(CacheItem.getCacheItem("bookings"))

            $.post(CA_URL+'bus/bookbus', vm.bookingForm, function(raw){

                var response = $.parseJSON(raw);

                AppLoading.hideLoading();

                if(response.success){

                    //Save booking details in global scope
                    $rootScope.busBookingDetails = response.booking;

                    console.log($rootScope.busBookingDetails);

                    //Clear Booking Form
                    vm.bookingForm = {};

                    //Reduce bus bookings by 1
                    var new_bus_bookings_count = num_bookings - 1;

                    CacheItem.setCacheItem("bookings", new_bus_bookings_count);

                    //Go To Bus Payment Options
                    $state.go('app.payoptionsbus');
                }
                else{
                    AppPopUps.showAlert(response.message);
                }

                $scope.$apply();
            })
            .fail(function(){ 
              // Handle error here
              AppLoading.hideLoading();
              AppPopUps.showAlert('Something went wrong. Pls try again.');
              $scope.$apply();
            });
        }//submitBusBooking
    }//BookBusCtrl

    function BusPaymentOptionsCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps){

        var vm = this;

        vm.payMethod = payMethod;

        function payMethod(method){

            AppLoading.showLoading('Completing Transaction...');

            var bookingnumber = $rootScope.busBookingDetails.bookingnumber;

            $.post(CA_URL+'bus/setpaymentmethod', {booking_id : bookingnumber, payment_method : method}, function(raw){

                var response = $.parseJSON(raw);

                if(response.success){

                    AppLoading.hideLoading();
                    if(method == 'Bank Transfer'){
                        $state.go('app.payinbankconfirmationbus');
                    }
                    else if(method == 'Pay-On-Arrival'){
                        $state.go('app.payonarrivalconfirmationbus');
                    }
                }
                else{
                    AppLoading.hideLoading();
                    AppPopUps.showAlert(response.message);
                }

                $scope.$apply();
            })
            .fail(function(){ 
              // Handle error here
              AppLoading.hideLoading();
              AppPopUps.showAlert('Something went wrong. Pls try again.');
              $scope.$apply();
            });
        }//payMethod

    }//BusPaymentOptionsCtrl

    /*******************BusTimes Controllers**********************/
    function FindSchedulesCtrl($rootScope, $scope, $state, BT_URL, AppLoading, AppPopUps){

        var vm = this;

        vm.searchForm = {};//Form Values
        vm.searchRoutes = searchRoutes;

        //Set Defaults
        vm.searchForm.category = "";


        //Depart Date
        $scope.departDate = new Date();
        vm.searchForm.date = $scope.departDate.format("yyyy-mm-dd");
        console.log(vm.searchForm.date);


        $scope.datePickerCallback = function (val) {
            if(typeof(val)==='undefined'){
                
            }else{
                //console.log(val.format("yyyy-mm-dd"));
                vm.searchForm.date = val.format("yyyy-mm-dd");
                console.log(vm.searchForm.date);

                //numNights();
            }
        };

        $scope.$watch("finder.searchForm.from", function(newValue, oldValue){

            console.log(vm.searchForm.depart+" "+vm.searchForm.arrive);
            
            //Check if the 'from' and 'to' values are not empty
            loadOperators();

        }, true);

        $scope.$watch("finder.searchForm.to", function(newValue, oldValue){

            console.log(vm.searchForm.from+" "+vm.searchForm.to);
            
            //Check if the 'from' and 'to' values are not empty
            loadOperators();

        }, true);


        //Watch for Bus Operator Selection to Load Terminals
        //NB: $watch in ionic access scope variables directly and not vm
        $scope.$watch("finder.searchForm.operator", function(newValue, oldValue){

            $scope.showTerminals = false;
            //Get The Trips in the result set for this operator
            $scope.busTimesOperatorTrips = _.where($scope.busTimesSearchPreResults, {airline_name:newValue});

            //Get All the unique Terminals in this result set
            $scope.busTimesRouteTerminals = _.uniq(_.pluck($scope.busTimesOperatorTrips, 'airport_name'));

            $scope.showTerminals = true;
            console.log($scope.busTimesRouteTerminals);
           
        }, true);

        function loadOperators(){
            if(vm.searchForm.depart!="" && vm.searchForm.arrive!=""){

                $scope.loadingOperators = true;


                //Load All Buses for this route
                $.post(BT_URL+'external/gettrips', vm.searchForm, function(raw){

                    var response = $.parseJSON(raw);

                    $scope.loadingOperators = false;

                    $scope.busTimesSearchPreResults = response;

                    //Get All unique Operators in this results set
                    $scope.routeOperators = _.uniq(_.pluck(response, 'airline_name'));

                    console.log($scope.routeOperators);

                    $scope.$apply();
                });
            }
        }//loadOperators

        function searchRoutes(){

            console.log(vm.searchForm);

            //Save search details in global scope
            $rootScope.busTimesSearchDetails = vm.searchForm;

            AppLoading.showLoading('Loading Results...');

            $.post(BT_URL+'external/gettrips', vm.searchForm, function(raw){

                var response = $.parseJSON(raw);

                AppLoading.hideLoading();

                if(response.length==0){
                    AppPopUps.showAlert('No Trips found for the specified Route details');
                }
                else{

                    //Save results in global scope
                    $rootScope.busTimesResults = response;
                    //Go to results page
                    $state.go('app.scheduleresults');
                }

                $scope.$apply();
            })
            .fail(function(){ 
              // Handle error here
              AppLoading.hideLoading();
              AppPopUps.showAlert('Something went wrong. Pls try again.');
              $scope.$apply();
            });
            
        }//searchRoutes
    }//FindSchedulesCtrl

    function ScheduleResultsCtrl($rootScope, $scope, $state, BT_URL, AppLoading, AppPopUps){

        $scope.setStatusColors = {
            'Fully Booked' : '#1BAE08',
            'Boarding' : '#0113FE',
            'Scheduled' : '#000000',
            'Delayed' : '#FE8300',
            'Cancelled' : '#FE0000',
            'Enroute' : '#09D5FA',
            'Arrived' : '#8A4502'
        };
    }//ScheduleResultsCtrl

    function iframeOnLoad(){
        return {
            scope: {
                callBack: '&iframeOnload'
            },
            link: function(scope, element, attrs){
                element.on('load', function(){
                    return scope.callBack();
                })
            }
        }
    }

    
    /**********************Portfolio Controllers**************************/

    function PortfolioCtrl($rootScope, $scope, $state, CA_URL, BT_URL, AppLoading, AppPopUps){

        $scope.getDiscountedValues = getDiscountedValues;
        $scope.getYesterdaySchedules = getYesterdaySchedules;
        /*$scope.getDiscountedRooms = getDiscountedRooms;
        $scope.getDiscountedBuses = getDiscountedBuses;*/

        var vm = this;


        function getDiscountedValues(value_type){


            AppLoading.showLoading('Loading...');

            $.post(CA_URL+'external/discounted', {type : value_type}, function(raw){

                AppLoading.hideLoading();

                var response = $.parseJSON(raw);

                if(response.length == 0){
                    AppPopUps.showAlert('No discounted '+value_type+' Available at the moment. Pls try again later.');
                }
                else{

                    $rootScope.discountedValues = response;

                    if(value_type == "Hotels"){
                       
                        console.log($rootScope.discountedValues);

                        $state.go('app.discountedhotels');
                    }
                    else if(value_type == "Rooms"){
                        $state.go('app.discountedrooms');
                    }
                    else if(value_type == "Buses"){
                        $state.go('app.discountedbuses');
                    }
                    
                }

                $scope.$apply();
            })
            .fail(function(){ 
              // Handle error here
              AppLoading.hideLoading();
              AppPopUps.showAlert('Something went wrong. Pls try again.');
              $scope.$apply();
            });
        }//getDiscountedValues

        function getYesterdaySchedules(){

            console.log(vm.origin+" - "+vm.destination); 

            if((vm.origin && vm.origin !="") && (vm.destination && vm.destination !="")){

                AppLoading.showLoading('Loading Results...');

                var yesterdayDate = new Date((new Date()).valueOf() - 1000*60*60*24);

                var yesterday = yesterdayDate.format("yyyy-mm-dd");

                console.log(yesterday);

                var fetchParams = {
                    from : vm.origin,
                    to : vm.destination,
                    date : yesterday
                }

                $.post(BT_URL+'external/gettrips', fetchParams, function(raw){

                    var response = $.parseJSON(raw);

                    AppLoading.hideLoading();


                    //Save results in global scope
                    $scope.busTimesResultsYesterday = response;
                    
                    

                    $scope.$apply();
                })
                .fail(function(){ 
                  // Handle error here
                  AppLoading.hideLoading();
                  AppPopUps.showAlert('Something went wrong. Pls try again.');
                  $scope.$apply();
                });
            }
            else{
                AppPopUps.showAlert('Choose an Origin and Destination from the dropdowns');
            }

            

        }//getYesterdaySchedules

        $scope.setStatusColors = {
            'Fully Booked' : '#1BAE08',
            'Boarding' : '#0113FE',
            'Scheduled' : '#000000',
            'Delayed' : '#FE8300',
            'Cancelled' : '#FE0000',
            'Enroute' : '#09D5FA',
            'Arrived' : '#8A4502'
        };

        
    }//PortfolioCtrl

    function SelectDiscountedHotelCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps){

        var vm = this;
        //Empty hotelDetails first
        $rootScope.hotelDetails = {};

        vm.findHotelRooms = findHotelRooms;

        //Watch for Hotel Selection to Load Hotel Details
        //NB: $watch in ionic access scope variables directly and not vm
        /*$scope.$watch("hotels.selectedhotel", function(newValue, oldValue){
            //console.log(newValue);

            //Extract Hotel Details from Bulk hotel Data
            $rootScope.hotelDetails = _.findWhere($rootScope.hotelresults, {id:newValue});

            //console.log($scope.hotelDetails);
        }, true);*/

        function findHotelRooms(selectedHotelId){

            /**Use hotel Id to set the selected hotel into the root scope**/

            //Extract Hotel Details from Bulk hotel Data
            $rootScope.hotelDetails = _.findWhere($rootScope.discountedValues, {id:selectedHotelId});

            //Check if subscription is active
            console.log($scope.subscribed);

            if($scope.subscribed){

                AppLoading.showLoading('Loading Rooms..');
                //console.log(vm.selectedhotel);
                $.post(CA_URL+'hotels/getrooms', {hotel_id : selectedHotelId}, function(response){

                    $rootScope.roomsresults = $.parseJSON(response);

                    //console.log($rootScope.roomsresults);

                    AppLoading.hideLoading();

                    //Clear select box
                    //vm.selectedhotel = "";

                    $state.go('app.hotelrooms');

                    $scope.$apply();
                })
                .fail(function(){ 
                  // Handle error here
                  AppLoading.hideLoading();
                  AppPopUps.showAlert('Something went wrong. Pls try again.');
                  $scope.$apply();
                });
            }
            else{
                AppPopUps.showAlert("Subscription Expired. Buy a new Pin code to continue accessing this feature. Thanks.");
            }
            
        }//findHotelRooms
    }//SelectDiscountedHotelCtrl

    function SelectDiscountedBusCtrl($rootScope, $scope, $state, CA_URL, AppLoading, AppPopUps, CacheItem){
        var vm = this;

        vm.bookBus = bookBus;

        function bookBus(busId){

            //subscription check
            if($scope.subscribed){
                //Bookings Check
                if(Number(CacheItem.getCacheItem("bookings")) > 0){
                    //Set the selected bus into the global scope
                    $rootScope.selectedBus = _.findWhere($rootScope.discountedValues, {id : busId});

                    console.log($rootScope.selectedBus);

                    $state.go('app.bookbus');
                }
                else{
                    AppPopUps.showAlert("You have 0 Bus Bookings Left. Enter new pin to activate more bus Bookings");

                    //Redirect to pin activation page
                    $state.go('app.enterpin');
                }
            
            }
            else{
                AppPopUps.showAlert("Subscription Expired. Buy a new Pin code to continue accessing this feature. Thanks.");
            }
            
            

        }//bookBus
    }//SelectDiscountedBusCtrl
   

    function HotelHistoryCtrl($scope, $rootScope, $state, CA_URL){

        $scope.loaded = false;
        $scope.nohistory = false;

        $.post(CA_URL+'external/fetcharchive', {type : "hotels", app_message_id : $rootScope.AppID}, function(raw_response){

            $scope.loaded = true;

            var response = $.parseJSON(raw_response);

            console.log(response);

            if(response.length > 0){
                $scope.hotelarchive = response;
            }
            else{
                $scope.nohistory = true;
            }


            $scope.$apply();
        })
        .fail(function(){ 
          // Handle error here
          AppLoading.hideLoading();
          AppPopUps.showAlert('Something went wrong. Pls try again.');
          $scope.$apply();
        });
    }//HotelHistoryCtrl


    function BusHistoryCtrl($scope, $rootScope, $state, CA_URL){

        $scope.loaded = false;
        $scope.nohistory = false;

        $.post(CA_URL+'external/fetcharchive', {type : "bus", app_message_id : $rootScope.AppID}, function(raw_response){

            $scope.loaded = true;

            var response = $.parseJSON(raw_response);

            console.log(response);

            if(response.length > 0){
                $scope.busarchive = response;
            }
            else{
                $scope.nohistory = true;
            }

            $scope.$apply();
        })
        .fail(function(){ 
          // Handle error here
          AppLoading.hideLoading();
          AppPopUps.showAlert('Something went wrong. Pls try again.');
          $scope.$apply();
        });
    }//BusHistoryCtrl


    function AppMessagesCtrl($scope, $rootScope, $state, API_URL, PORTAL_URL){
        $scope.loaded = false;

        $.post(PORTAL_URL+'mobile/appmessages', {app_message_id : $rootScope.AppID}, function(raw_response){

            $scope.loaded = true;

            var response = $.parseJSON(raw_response);

            console.log(response);

            $scope.appmessages = response;

            $scope.$apply();
        })
        .fail(function(){ 
          // Handle error here
          AppLoading.hideLoading();
          AppPopUps.showAlert('Something went wrong. Pls try again.');
          $scope.$apply();
        });
    }//AppMessagesCtrl

    

    function sanitize($sce) {
      return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
      }
    }//sanitize


    //Function to Merge two objects
    function extend(obj, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
    }
})();
