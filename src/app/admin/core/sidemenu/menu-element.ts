export const menus = [
    {
        'name': 'Dashboard',
        'icon': 'dashboard',
        'link': '/auth',
        'open': false,
        'chip': false,
        
    },
    {
        'name': 'Learner Management',
        'icon': 'widgets',
        'link': false,
        'open': false,
        'sub': [
            {
                'name': 'Learners',
                'link': 'userManagement',
                'icon': 'widgets',
                'chip': false,
                'open': true,
            },
            {
                'name': 'User Groups',
                'link': 'tables/responsive',
                'icon': 'list',
                'chip': false,
                'open': true,
            }
        ]
    },
    {
        'name': 'Course Management',
        'icon': 'list',
        'link': false,
        'open': false,
        
    }
   
  
];
