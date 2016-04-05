'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory){

        //====================================================================
        // menu.html controllers
        //====================================================================

        $scope.showDetails = false;
        $scope.dishes= menuFactory.getDishes();
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

    .controller('FeedbackController', ['$scope', function($scope) {

        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                    agree:false, email:"" };
                $scope.feedback.mychannel="";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.dish= menuFactory.getDish(3);

    }])

    .controller('DishCommentController', ['$scope', function($scope) {

        var resetComment = function() {

            $scope.comment = {
                author: "",
                rating: 5,
                comment: ""
            };
        };

        resetComment();

        $scope.submitComment = function () {

            console.log("Your comment:", $scope.comment);

            $scope.dish.comments.push({
                rating: $scope.comment.rating,
                comment: $scope.comment.comment,
                author: $scope.comment.author,
                date: new Date().toISOString()
            });

            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();

            //Step 5: reset your JavaScript object that holds your comment
            resetComment();
        }
    }]);


