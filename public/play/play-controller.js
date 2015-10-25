(function () {
    'use strict';

    angular.module('hello2')
        .controller('PlayController', PlayController);

    PlayController.$inject = ['$stateParams', 'QuizService', '$location'];

    function PlayController($stateParams, QuizService, $location) {
        var vm = this;
        var questions;
        var answers = [];
        vm.current = [];
        vm.showAnswers = false;
        vm.index = 0;
        vm.total = 0;
        vm.right = 0;
        vm.percent = 0
        vm.responses = [];
        console.log("ID = " + $stateParams.id);

        // get all the quiz questions from the service
        QuizService.getQuiz($stateParams.id).then(function (data) {
            console.log('Received data from service: ' + data.quiz.questions.length);
            questions = data;
            vm.title = data.title;
            vm.tagLine = data.tagLine;
            vm.current = data.quiz.questions[vm.index];
            vm.total = data.quiz.questions.length;
            vm.index = 0;
            update(0);
        });

        function padResponses(response, question) {
            var ndx, newResponse = [];
            newResponse = question.map(function () {
                return false;
            });

            for(ndx=0; ndx < response.length; ndx += 1){
                if(response[ndx]){
                    newResponse[ndx] = true;
                }
            }
            return newResponse;
        }

        function update(direction) {
            answers[vm.index] = padResponses(vm.responses, vm.current.choices);
            vm.index += direction;
            vm.current = questions.quiz.questions[vm.index];
            // restore previous answer if one exists
            if (answers[vm.index]) {
                vm.responses = answers[vm.index];
            } else {
                vm.responses = [];
            }
        }

        vm.previous = function () {
            if (vm.index) {
                update(-1);
            }
        };

        // Move to the next question if there is one
        vm.next = function () {
            if (vm.index < vm.total) {
                update(1);
            }
        };

        // tabulate the score
        vm.score = function () {
            update(0);
            var outer, score, question, answer, inner, totalRight = 0;
            vm.right =0;

            for (outer = 0; outer < vm.total; outer += 1) {
                question = questions.quiz.questions[outer].choices.map(function (obj) {
                    return !!obj.isAnswer;
                });

                var correct = false;
                answer = answers[outer];
                if(answer) {
                    correct = true;
                    for (inner = 0; inner < answer.length; inner += 1) {
                        if (!answer || question[inner] != answer[inner]) {
                            correct = false;
                            break;
                        }
                    }
                }
                vm.right += (correct? 1: 0);
                console.log('question ' + outer + ', = ' + (correct ? 'right' : 'wrong'));
            }
            vm.showAnswers = true;
            vm.index = 0;
            update(0);
        };

        vm.exit = function () {
            var bob = $location.path();
//            debugger;
            $location.path('/')
        }
    }

    console.log("Hello Play Controller");
}());