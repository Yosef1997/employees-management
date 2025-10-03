app.controller(
  'EmployeeController',
  function (
    $scope,
    $routeParams,
    $location,
    $timeout,
    EmployeeService,
    DepartmentService
  ) {
    $scope.employees = []
    $scope.employee = {}
    $scope.departments = []
    $scope.searchText = ''
    $scope.loading = false
    $scope.alert = { message: '', type: '' }
    $scope.pagination = {
      total: 0,
      page: 1,
      limit: 10,
      totalPage: 0,
    }

    function showAlert(message, type) {
      $scope.alert.message = message
      $scope.alert.type = type
      $timeout(function () {
        $scope.alert.message = ''
      }, 3000)
    }

    $scope.loadEmployees = function (page = 1) {
      $scope.loading = true
      $scope.pagination.page = page
      console.log('Loading start:', $scope.loading)
      EmployeeService.getAll(page, $scope.pagination.limit, $scope.searchText)
        .then(function (res) {
          $scope.employees = res.data.data
          $scope.pagination.total = res.data.total
          $scope.pagination.page = res.data.page
          $scope.pagination.limit = res.data.limit
          $scope.pagination.totalPage = res.data.totalPage
        })
        .catch(function (err) {
          showAlert('Gagal memuat data karyawan', 'error')
        })
        .finally(function () {
          $scope.loading = false
          console.log('Loading end:', $scope.loading)
        })
    }

    $scope.loadDepartments = function () {
      $scope.loading = true
      DepartmentService.getAll()
        .then(function (res) {
          $scope.departments = res.data
        })
        .catch(function (err) {
          showAlert('Gagal memuat data departemen', 'error')
        })
        .finally(function () {
          $scope.loading = false
        })
    }

    if ($routeParams.id) {
      $scope.loading = true
      EmployeeService.getById($routeParams.id)
        .then(function (res) {
          $scope.employee = res.data
        })
        .catch(function (err) {
          showAlert('Data karyawan tidak ditemukan', 'error')
        })
        .finally(function () {
          $scope.loading = false
        })
    }

    $scope.addEmployee = function () {
      if (!$scope.employee.Name || $scope.employee.Salary <= 0) {
        showAlert('Nama tidak boleh kosong dan gaji harus > 0', 'error')
        return
      }
      $scope.loading = true
      EmployeeService.create($scope.employee)
        .then(function () {
          showAlert('Karyawan berhasil ditambahkan', 'success')
          $location.path('/employees')
        })
        .catch(function () {
          showAlert('Gagal menambahkan karyawan', 'error')
        })
        .finally(function () {
          $scope.loading = false
        })
    }

    $scope.updateEmployee = function () {
      $scope.loading = true
      EmployeeService.update($routeParams.id, $scope.employee)
        .then(function () {
          showAlert('Karyawan berhasil diupdate', 'success')
          $location.path('/employees')
        })
        .catch(function () {
          showAlert('Gagal mengupdate karyawan', 'error')
        })
        .finally(function () {
          $scope.loading = false
        })
    }

    $scope.deleteEmployee = function (id) {
      if (confirm('Yakin hapus data?')) {
        $scope.loading = true
        EmployeeService.remove(id)
          .then(function () {
            showAlert('Karyawan berhasil dihapus', 'success')
            $scope.loadEmployees($scope.pagination.page)
          })
          .catch(function () {
            showAlert('Gagal menghapus karyawan', 'error')
          })
          .finally(function () {
            $scope.loading = false
          })
      }
    }

    $scope.loadEmployees()
    $scope.loadDepartments()
  }
)
