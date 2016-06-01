(function () {
  'use strict';

  angular
    .module('blogs')
    .controller('BlogsListController', BlogsListController);

  BlogsListController.$inject = ['BlogsService'];

  function BlogsListController(BlogsService) {
    var vm = this;

    vm.blogs = BlogsService.query();
  }
})();
