var app = angular.module('EmployeeApp', ['ngRoute'])

app.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/employees', {
        templateUrl: 'views/employees.html',
        controller: 'EmployeeController',
      })
      .when('/employees/new', {
        templateUrl: 'views/employee-form.html',
        controller: 'EmployeeController',
      })
      .when('/employees/edit/:id', {
        templateUrl: 'views/employee-edit.html',
        controller: 'EmployeeController',
      })
      .otherwise({ redirectTo: '/employees' })
  },
])
