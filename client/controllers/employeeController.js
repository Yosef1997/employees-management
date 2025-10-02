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

    // Pagination data
    $scope.pagination = {
      total: 0,
      page: 1,
      limit: 10,
      totalPage: 0,
    }

    // Load Employees (dengan pagination & search)
    $scope.loadEmployees = function (page = 1) {
      EmployeeService.getAll(
        page,
        $scope.pagination.limit,
        $scope.searchText
      ).then(function (res) {
        $scope.employees = res.data.data // daftar karyawan
        $scope.pagination.total = res.data.total
        $scope.pagination.page = res.data.page
        $scope.pagination.limit = res.data.limit
        $scope.pagination.totalPage = res.data.totalPage
      })
    }

    // Load Departments
    $scope.loadDepartments = function () {
      DepartmentService.getAll().then(function (res) {
        $scope.departments = res.data
      })
    }

    // By ID (detail employee untuk edit)
    if ($routeParams.id) {
      EmployeeService.getById($routeParams.id).then(function (res) {
        $scope.employee = res.data
      })
    }

    // Tambah
    $scope.addEmployee = function () {
      if (!$scope.employee.Name || $scope.employee.Salary <= 0) {
        alert('Nama tidak boleh kosong dan gaji harus > 0')
        return
      }
      EmployeeService.create($scope.employee).then(function () {
        $location.path('/employees')
      })
    }

    // Update
    $scope.updateEmployee = function () {
      EmployeeService.update($routeParams.id, $scope.employee).then(
        function () {
          $location.path('/employees')
        }
      )
    }

    // Hapus
    $scope.deleteEmployee = function (id) {
      if (confirm('Yakin hapus data?')) {
        EmployeeService.remove(id).then(function () {
          $scope.loadEmployees()
        })
      }
    }

    // Init
    $scope.loadEmployees()
    $scope.loadDepartments()
  }
)
