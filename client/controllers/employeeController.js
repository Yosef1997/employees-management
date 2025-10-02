app.controller(
  'EmployeeController',
  function (
    $scope,
    $routeParams,
    $location,
    EmployeeService,
    DepartmentService
  ) {
    $scope.employees = []
    $scope.employee = {}
    $scope.departments = []
    $scope.searchText = ''

    $scope.pagination = {
      total: 0,
      page: 1,
      limit: 10,
      totalPage: 0,
    }

    $scope.loadEmployees = function (page = 1) {
      EmployeeService.getAll(
        page,
        $scope.pagination.limit,
        $scope.searchText
      ).then(function (res) {
        $scope.employees = res.data.data
        $scope.pagination.total = res.data.total
        $scope.pagination.page = res.data.page
        $scope.pagination.limit = res.data.limit
        $scope.pagination.totalPage = res.data.totalPage
      })
    }

    $scope.loadDepartments = function () {
      DepartmentService.getAll().then(function (res) {
        $scope.departments = res.data
      })
    }

    if ($routeParams.id) {
      EmployeeService.getById($routeParams.id).then(function (res) {
        $scope.employee = res.data
      })
    }

    $scope.addEmployee = function () {
      if (!$scope.employee.Name || $scope.employee.Salary <= 0) {
        alert('Nama tidak boleh kosong dan gaji harus > 0')
        return
      }
      EmployeeService.create($scope.employee).then(function () {
        $location.path('/employees')
      })
    }

    $scope.updateEmployee = function () {
      EmployeeService.update($routeParams.id, $scope.employee).then(
        function () {
          $location.path('/employees')
        }
      )
    }

    $scope.deleteEmployee = function (id) {
      if (confirm('Yakin hapus data?')) {
        EmployeeService.remove(id).then(function () {
          $scope.loadEmployees()
        })
      }
    }

    $scope.loadEmployees()
    $scope.loadDepartments()
  }
)
