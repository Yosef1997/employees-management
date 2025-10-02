app.factory('EmployeeService', function ($http) {
  const API_URL = 'http://localhost:3000/api/v1/employees'
  const HEADERS = { headers: { 'x-api-key': window.env.API_KEY } }

  function toPayload(emp) {
    return {
      name: emp.Name || emp.name || '',
      position: emp.Position || emp.position || '',
      salary: emp.Salary || emp.salary || 0,
      departmentId: emp.DepartmentID || null,
    }
  }

  return {
    getAll: function (page = 1, limit = 10, search = '') {
      return $http.get(
        `${API_URL}?page=${page}&limit=${limit}&search=${search}`,
        HEADERS
      )
    },
    getById: function (id) {
      return $http.get(`${API_URL}/${id}`, HEADERS)
    },
    create: function (employee) {
      const payload = toPayload(employee)
      return $http.post(API_URL, payload, HEADERS)
    },
    update: function (id, employee) {
      const payload = toPayload(employee)
      return $http.put(`${API_URL}/${id}`, payload, HEADERS)
    },
    remove: function (id) {
      return $http.delete(`${API_URL}/${id}`, HEADERS)
    },
  }
})

app.factory('DepartmentService', function ($http) {
  const API_URL = 'http://localhost:3000/api/v1/departments'
  const HEADERS = { headers: { 'x-api-key': window.env.API_KEY } }

  return {
    getAll: function () {
      return $http.get(API_URL, HEADERS)
    },
  }
})
