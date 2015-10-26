// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('flightsTime', ['ionic', 'ionic.service.core', 'flightsTime.controllers', 'ionic-datepicker', 'angular-repeat-n', 'ngMessages'])
    .constant('API_URL', 'http://flightstime.com.ng/api/')
    .constant('CA_URL', 'http://api.consolidatedalliance.ng/')
    .constant('BT_URL', 'http://bustime.com.ng/api/')
    .constant('PORTAL_URL', 'http://vikonigeria.com/')
    /*.constant('API_URL', 'http://localhost/flightstime/')
    .constant('CA_URL', 'http://localhost/ca/')
    .constant('BT_URL', 'http://localhost/bustime/')
    .constant('PORTAL_URL', 'http://localhost/ft_portal/')*/
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicAppProvider, $ionicConfigProvider, $httpProvider) {

        // Identify app
        $ionicAppProvider.identify({
            // The App ID (from apps.ionic.io) for the server
            app_id: '624dc03a',
            // The public API key all services will use for this app
            api_key: '7f28a66bd3120b0dd25365dcd5c2a8345d4196b347c9a220'
            // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
            // gcm_id: 'YOUR_GCM_ID'
        });

        // remove back button text completely
        $ionicConfigProvider.backButton.previousTitleText(false).text('');

        //Add Interceptor
        $httpProvider.interceptors.push('MemberIDInterceptor');

        //App States
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: "/home",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: 'HomeCtrl'
                    }
                }
            })

            /***********Hotel Booking Routes***********/
            .state('app.searchhotels', {
                url: '/searchhotels',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/searchhotels.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.selecthotel', {
                url: '/selecthotel',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/selecthotel.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.hotelrooms', {
                url: '/hotelrooms',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/hotelrooms.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.bookroom', {
                url: '/bookroom',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/bookroom.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.bookasoptions', {
                url: '/bookasoptions',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/bookasoptions.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.guestform', {
                url: '/guestform',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/guestform.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.bookasexisting', {
                url: '/bookasexisting',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/bookasexisting.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.createaccount', {
                url: '/createaccount',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/createaccount.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.payoptions', {
                url: '/payoptions',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/payoptions.html',
                    //controller: 'DashCtrl'
                  }
                }
            })

            .state('app.payinbankconfirmation', {
                url: '/payinbankconfirmation',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/payinbankconfirmation.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.payonarrivalconfirmation', {
                url: '/payonarrivalconfirmation',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/hotels/payonarrivalconfirmation.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            /*************************Inter-State Bus*****************************/
            .state('app.searchbus', {
                  url: '/searchbus',
                  views: {
                    'menuContent': {
                      templateUrl: 'templates/bus/searchbus.html',
                      //controller: 'ChatsCtrl'
                    }
                  }
            })
            .state('app.searchbusresults', {
                  url: '/searchbusresults',
                  views: {
                    'menuContent': {
                      templateUrl: 'templates/bus/searchbusresults.html',
                      //controller: 'ChatsCtrl'
                    }
                  }
            })
            .state('app.bookbus', {
                  url: '/bookbus',
                  views: {
                    'menuContent': {
                      templateUrl: 'templates/bus/bookbus.html',
                      //controller: 'ChatsCtrl'
                    }
                  }
            })
            .state('app.payoptionsbus', {
                url: '/payoptionsbus',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/bus/payoptionsbus.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.payinbankconfirmationbus', {
                url: '/payinbankconfirmationbus',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/bus/payinbankconfirmationbus.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.payonarrivalconfirmationbus', {
                url: '/payonarrivalconfirmationbus',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/bus/payonarrivalconfirmationbus.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            /************BusTimes Routes*************/
            .state('app.scheduleviewoptions', {
                url: '/scheduleviewoptions',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/bustime/viewoptions.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.byroute', {
                url: '/byroute',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/bustime/byroute.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.bycompany', {
                url: '/bycompany',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/bustime/bycompany.html',
                    //controller: 'DashCtrl'
                  }
                }
            })
            .state('app.scheduleresults', {
                url: '/scheduleresults',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/bustime/scheduleresults.html',
                    //controller: 'DashCtrl'
                  }
                }
            })

            
            /************General Routes*************/
            .state('submitmemberid', {
                url: "/submitmemberid",
                cache: false,
                templateUrl: "templates/submitmemberid.html"
            })
            
            /*.state('app.freeupdates', {
                url: "/freeupdates",
                views: {
                    'menuContent': {
                        templateUrl: "templates/freeupdates.html"
                        //controller: 'DriverRegCtrl'
                    }
                }
            })*/
            .state('app.premiumupdates', {
                url: "/premiumupdates",
                views: {
                    'menuContent': {
                        templateUrl: "templates/premiumupdates.html"
                        //controller: 'DriverRegCtrl'
                    }
                }
            })
            
            
            .state('app.enterpin', {
                url: "/enterpin",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/enterpin.html"
                        //controller: 'ActivatePinCtrl'
                    }
                }
            })
            .state('app.interestform', {
                url: "/interestform",
                views: {
                    'menuContent': {
                        templateUrl: "templates/interestform.html"
                        //controller: 'ActivatePinCtrl'
                    }
                }
            })

            /***********Portfolio Routes***********/
            .state('app.portfolio', {
                url: "/portfolio",
                views: {
                    'menuContent': {
                        templateUrl: "templates/portfolio/portfolio.html",
                        //controller: 'FlightResultsCtrl'
                    }
                }
            })
            .state('app.notifications', {
                url: "/notifications",
                views: {
                    'menuContent': {
                        templateUrl: "templates/portfolio/notifications.html",
                        //controller: 'FlightResultsCtrl'
                    }
                }
            })
            .state('app.hotelhistory', {
                url: "/hotelhistory",
                views: {
                    'menuContent': {
                        templateUrl: "templates/portfolio/hotelhistory.html",
                        //controller: 'FlightResultsCtrl'
                    }
                }
            })
            .state('app.bushistory', {
                url: "/bushistory",
                views: {
                    'menuContent': {
                        templateUrl: "templates/portfolio/bushistory.html",
                        //controller: 'FlightResultsCtrl'
                    }
                }
            })
            .state('app.discountedhotels', {
                url: "/discountedhotels",
                views: {
                    'menuContent': {
                        templateUrl: "templates/portfolio/discountedhotels.html",
                        //controller: 'FlightResultsCtrl'
                    }
                }
            })
            .state('app.yesterdaytimes', {
                url: "/yesterdaytimes",
                views: {
                    'menuContent': {
                        templateUrl: "templates/portfolio/yesterdaytimes.html",
                        //controller: 'FlightResultsCtrl'
                    }
                }
            })
            /*.state('app.discountedrooms', {
                url: "/discountedrooms",
                views: {
                    'menuContent': {
                        templateUrl: "templates/portfolio/discountedrooms.html",
                        //controller: 'FlightResultsCtrl'
                    }
                }
            })*/
            .state('app.discountedbuses', {
                url: "/discountedbuses",
                views: {
                    'menuContent': {
                        templateUrl: "templates/portfolio/discountedbuses.html",
                        //controller: 'FlightResultsCtrl'
                    }
                }
            })  
        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
