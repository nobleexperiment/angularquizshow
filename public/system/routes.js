(function () {
    "use strict";

    angular.module('hello2')
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                console.log("in router");

                $stateProvider
                    .state('quiz', {
                        url: "/quiz",
                        templateUrl: "../quiz/quiz-listings.html",
                        controller: 'QuizListController as quizList'
                    })
                    .state('player', {
                        url: "/player/:id",
                        templateUrl: "../play/play.html",
                        controller: "PlayController as player"
                    })
                    .state('about', {
                        url: "/about",
                        templateUrl: "../about/about.html",
                        controller: "AboutController as about"
                    });

                $urlRouterProvider.otherwise('/about');
            }]);

    console.log("routes!");
}());