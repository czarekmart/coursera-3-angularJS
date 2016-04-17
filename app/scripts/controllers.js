'use strict';

function formatError(response, errorText) {

    var statusText = response.statusText || errorText || "Did you call 'json-server --watch db.json'?";
    var message = "Error '" + response.status + "'. " + statusText;
    return message;
};

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory){

        //====================================================================
        // menu.html controllers
        //====================================================================

        $scope.showDetails = false;

        $scope.showMenu = false;
        $scope.message = "Loading ...";
        menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = formatError(response);
            });

        $scope.select = function(setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.select(1);

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };

    }])

    .controller('ContactController', ['$scope', function($scope) {

        //====================================================================
        // contactus.html controllers
        //====================================================================

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope','feedbackFactory', function($scope, feedbackFactory) {

        $scope.sendFeedback = function() {
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
            }
            else {

                $scope.feedback.id = 0; // to force the id to be integer, rather than guid.

                var useMethod = 1;
                if ( useMethod == 1 ) {
                    // Method 1.
                    feedbackFactory.getFeedback().save($scope.feedback);
                }
                else {
                    // Method 2.
                    var feedbackResource = feedbackFactory.getFeedback();
                    var newFeedback = new feedbackResource($scope.feedback);
                    newFeedback.$save();
                }

                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                    agree:false, email:"" };
                $scope.feedback.mychannel="";

                $scope.feedbackForm.$setPristine();
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        $scope.showDish = false;
        $scope.message="Loading ...";
        menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = formatError(response);
            }
        );

    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        var resetComment = function() {

            $scope.comment = {
                author: "",
                rating: 5,
                comment: "",
                date: "",
            };
        };

        resetComment();

        $scope.submitComment = function () {

            $scope.comment.date = new Date().toISOString();

            $scope.dish.comments.push($scope.comment);
            menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);

            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();

            //Step 5: reset your JavaScript object that holds your comment
            resetComment();
        }
    }])

    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

        $scope.showDish = false;
        $scope.message="Loading ...";
        menuFactory.getDishes().get({id:0})
            .$promise.then(
            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = formatError(response);
            }
        );

        $scope.showPromotion = false;
        $scope.promotionMessage="Loading ...";
        menuFactory.getPromotions().get({id:0})
            .$promise.then(
            function(response){
                $scope.promotion = response;
                $scope.showPromotion = true;
            },
            function(response) {
                $scope.promotionMessage = formatError(response, 'Cannot read promotion information from the server.');
            }
        );

        $scope.showChef = false;
        $scope.chefMessage="Loading ...";
        corporateFactory.getLeaders().get({id:3})
            .$promise.then(
            function(response){
                $scope.chef = response;
                $scope.showChef = true;
            },
            function(response) {
                $scope.chefMessage = formatError(response, 'Cannot read leadership information from the server.');
            }
        );
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

        $scope.showLeaders = false;
        $scope.message="Loading ...";
        corporateFactory.getLeaders().query(
            function(response) {
                $scope.leaders = response;
                $scope.showLeaders = true;
            },
            function(response) {
                $scope.message = formatError(response, 'Cannot read leadership information from the server.');
            });

    }])
;


