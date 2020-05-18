export const menus = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth',
        'open': false,
        'chip': false,
        
    },
    {
        'name': 'User Management',
        'icon': 'widgets',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Users',
                'link': 'userManagement',
                'icon': 'widgets',
                'chip': false,
                'open': true,
            },
            {
                'name': 'User Groups',
                'link': 'usergroup',
                'icon': 'list',
                'chip': false,
                'open': true,
            }
        ]
    },
    {
        'name': 'Course Management',
        'icon': 'list',
        'link': 'Wca',
        'chip': false,
        'open': true,
        
    },

    {
        'name': 'Catalogue Management',
        'icon': 'business',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Categories',
                'link': 'catagory',
                'icon': 'view_quilt',
                'chip': false,
                'open': true,
            },
            {
                'name': 'Catalogues',
                'link': 'catalogue',
                'icon': 'assignment',
                'chip': false,
                'open': true,
            }
        ]
    }, 
  
];
