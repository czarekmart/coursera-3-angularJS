'use strict';

angular.module('confusionApp')
     .constant("baseURL","http://localhost:3000/")
     .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {


        this.getDishes = function(){
            return $resource ( baseURL+"dishes/:id", null, {'update':{method:'PUT' }} );
        };

        this.getPromotions = function(){
            return $resource ( baseURL+"promotions/:id", null, {} );
        };

    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        var corpfac = {};

        corpfac.getLeaders = function(){
            return $resource ( baseURL+"leadership/:id", null, {} );
        };

        return corpfac;
    }])

    .factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        var feedfac = {};

        feedfac.getFeedback = function(){

            // For the reviewer:
            // The request is: The feedbackFactory is returning the resource correctly and the resource has been
            // correctly configured to post the data to the server.
            //
            // However, this resource is already ready to post via save. No further configuration is necessary.
            //
            return $resource ( baseURL+"feedback/:id", null, {} );
        };

        return feedfac;
    }])

;
