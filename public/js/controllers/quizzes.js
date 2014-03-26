'use strict';

app.controller('QuizzesController', ['$scope', '$stateParams', '$location', 'Global', 'Quizzes', 'Questions', 'Alert', function ($scope, $stateParams, $location, Global, Quizzes, Questions, Alert) {
    $scope.global = Global;
    $scope.kinds = [
        {id: 'text', value: 'Texte'},
        {id: 'audio', value: 'Audio'},
        {id: 'video', value: 'Vidéo'}
    ];

    $scope.tagfilter = function(message) {
        if ($scope.tags) {
          return $scope.tags.replace(/\s*,\s*/g, ',').split(',').every(function(tag) {
            return message.tags.some(function(objTag){
              return objTag.indexOf(tag) !== -1;
            });
          });
        }
        else {
          return true;
        }
    };

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

    $scope.findQuestions = function() {
        Quizzes.get({
            quizId: $stateParams.quizId
        }, function(quiz) {
            $scope.quiz = quiz;
            $scope.quizQuestions = $scope.quiz.questions;
        });
        Quizzes.getQuestionsNin({
            quizId: $stateParams.quizId
        }, function(questions) {
            $scope.questions = questions;
            $scope.limitct = 25;
            $scope.limitsvalues = [25, 50, 100];
        });
    };

    $scope.updateQuestions = function() {
        var quiz = $scope.quiz;

        if (!quiz.updated) {
            quiz.updated = [];
        }
        quiz.updated.push(new Date().getTime());
        quiz.$update(function(res) {
            Alert.add('info', 'La liste des questions a été mise à jour.', 2000);
        });
    };

    $scope.addQuestion = function(question) {
        $scope.questions.splice($scope.questions.indexOf(question), 1);
        $scope.quiz.questions.push(question);
        this.updateQuestions();
    };

    $scope.addAllQuestions = function() {
        angular.forEach($scope.questionsFiltered, function(question){
            $scope.questions.splice($scope.questions.indexOf(question), 1);
            $scope.quiz.questions.push(question);
        });
        this.updateQuestions();
    };

    $scope.removeQuestion = function(index) {
        var question = $scope.quiz.questions[index];
        $scope.quiz.questions.splice(index, 1);
        $scope.questions.push(question);
        this.updateQuestions();
    };

     $scope.removeAllQuestions = function() {
        angular.forEach($scope.quiz.questions, function(question){
            $scope.questions.push(question);
        });
        $scope.quiz.questions.length = 0;
        this.updateQuestions();
    };

}]);
