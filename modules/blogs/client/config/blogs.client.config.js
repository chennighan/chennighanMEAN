(function () {
  'use strict';

  angular
    .module('blogs')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Blogs',
      state: 'blogs',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'blogs', {
      title: 'List Blogs',
      state: 'blogs.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'blogs', {
      title: 'Create Blog',
      state: 'blogs.create',
      roles: ['user']
    });
  }
})();
