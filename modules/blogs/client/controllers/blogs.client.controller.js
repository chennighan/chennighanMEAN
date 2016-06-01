(function () {
  'use strict';

  // Blogs controller
  angular
    .module('blogs')
    .controller('BlogsController', BlogsController);

  BlogsController.$inject = ['$scope', '$state', 'Authentication', 'blogResolve'];

  function BlogsController ($scope, $state, Authentication, blog) {
    var vm = this;

    vm.authentication = Authentication;
    vm.blog = blog;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Blog
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.blog.$remove($state.go('blogs.list'));
      }
    }

    // Save Blog
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.blogForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.blog._id) {
        vm.blog.$update(successCallback, errorCallback);
      } else {
        vm.blog.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('blogs.view', {
          blogId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
