'use strict';

app.controller('QuizzesController', ['$scope', '$stateParams', '$location', 'Global', 'Quizzes', function ($scope, $stateParams, $location, Global, Quizzes) {
    $scope.global = Global;

    $scope.create = function() {
        var quiz = new Quizzes({
            title: this.title,
            description: this.description
        });
        quiz.$save(function(response) {
            $location.path('quizzes/' + response._id);
        });

        this.title = '';
        this.description = '';
    };

    $scope.remove = function(quiz) {
        if (quiz) {
            quiz.$remove();

            for (var i in $scope.quizzes) {
                if ($scope.quizzes[i] === quiz) {
                    $scope.quizzes.splice(i, 1);
                }
            }
        }
        else {
            $scope.quiz.$remove();
            $location.path('quizzes');
        }
    };

    $scope.update = function() {
        var quiz = $scope.quiz;
        if (!quiz.updated) {
            quiz.updated = [];
        }
        quiz.updated.push(new Date().getTime());

        quiz.$update(function() {
            $location.path('quizzes/' + quiz._id);
        });
    };

    $scope.find = function() {
        Quizzes.query(function(quizzes) {
            $scope.quizzes = quizzes;
        });
    };

    $scope.findOne = function() {
        Quizzes.get({
            quizId: $stateParams.quizId
        }, function(quiz) {
            $scope.quiz = quiz;
        });
    };
}]);
