'use strict';

app.controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Global', 'Questions', function ($scope, $stateParams, $location, Global, Questions) {
    $scope.global = Global;
    $scope.kinds = [
        {id: 'text', value: 'Texte'},
        {id: 'audio', value: 'Audio'},
        {id: 'video', value: 'Vidéo'}
    ];

    $scope.initCreate = function() {
        $scope.kind = 'text';
        $scope.answers = [];
        $scope.tags = [];
    };

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

    $scope.removeAnswer = function(index) {
        $scope.question.answers.splice(index, 1);
    };

    $scope.create = function() {
        var tags = this.tags;
        if (tags.length > 0) {
           tags = tags.split(/[\s,]+/);
        }

        var question = new Questions({
            question: this.question,
            kind: this.kind,
            file: this.file,
            answers: this.answers,
            tags: tags,
            explain: this.explain
        });
        question.$save(function(response) {
            $location.path('questions/' + response._id);
        });

        this.title = '';
        this.kind = '';
        this.file = '';
        this.answers = '';
        this.tags = '';
        this.explain = '';
    };

    $scope.remove = function(question) {
        if (question) {
            question.$remove();

            for (var i in $scope.questions) {
                if ($scope.questions[i] === question) {
                    $scope.questions.splice(i, 1);
                }
            }
        }
        else {
            $scope.question.$remove();
            $location.path('questions');
        }
    };

    $scope.update = function() {
        var tags = $scope.question.tags;
        if( typeof tags === 'string' ) {
            $scope.question.tags = tags.split(/[\s,]+/);
        }
        var question = $scope.question;
        if (!question.updated) {
            question.updated = [];
        }
        question.updated.push(new Date().getTime());

        question.$update(function() {
            $location.path('questions/' + question._id);
        });
    };

    $scope.find = function() {
        Questions.query(function(questions) {
            $scope.questions = questions;
            $scope.limitct = 25;
            $scope.limitsvalues = [25, 50, 100];
        });

    };

    $scope.findOne = function() {
        Questions.get({
            questionId: $stateParams.questionId
        }, function(question) {
            $scope.question = question;
        });
    };
}]);
