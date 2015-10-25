(function () {
    'use strict';

    angular.module('hello2')
        .controller('QuizListController', QuizListController);

    QuizListController.$inject = ['QuizService'];

    function QuizListController(QuizService) {
        var vm = this;

        vm.quizzes = [];
        vm.title = 'a title';
        vm.strapLine = 'a strapline';

        QuizService.getQuizzes().then(function (quizzes) {
            vm.quizzes = quizzes;
            console.log("Got Data: " + JSON.stringify(quizzes));
        });
    }

    console.log("Hello QuizListController");
}());