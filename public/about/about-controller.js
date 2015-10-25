(function () {
    'use strict';

    angular.module('hello2')
        .controller('AboutController', AboutController);

    function AboutController() {
        var vm = this;

        vm.message = "i need ";

    }

    console.log("hello about")
}());