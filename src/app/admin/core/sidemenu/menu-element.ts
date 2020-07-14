// export const menus = [
//     {
//         name: 'Dashboard',
//         icon: 'dashboard',
//         link: '/Admin/auth/dashboard',
//         open: false,
//         chip: false,

//     },
//     {
//         name: 'User Management',
//         icon: 'widgets',
//         link: false,
//         open: false,
//         sub: [
//             {
//                 name: 'Users',
//                 link: '/Admin/auth/userManagement',
//                 icon: 'widgets',
//                 chip: false,
//                 open: true,
//             },
//             {
//                 name: 'User Groups',
//                 link: '/Admin/auth/usergroup',
//                 icon: 'list',
//                 chip: false,
//                 open: true,
//             },
//             {
//                 name: 'Course Enrollment',
//                 icon: 'border_color',
//                 link: '/Admin/auth/enrollment',
//                 open: false,
//                 chip: false,
//             },
//             {
//                 name: 'Reports',
//                 link: '/Admin/auth/reports',
//                 icon: 'notes',
//                 chip: false,
//                 open: true,
//             },
//         ]
//     },
//     {
//         name: 'Course Management',
//         icon: 'list',
//         link: '/Admin/auth/Wca',
//         chip: false,
//         open: true,

//     },

//     {
//         name: 'Catalogue Management',
//         icon: 'business',
//         link: false,
//         open: false,
//         sub: [
//             {
//                 name: 'Categories',
//                 link: '/Admin/auth/catagory',
//                 icon: 'view_quilt',
//                 chip: false,
//                 open: true,
//             },
//             {
//                 name: 'Catalogues',
//                 link: '/Admin/auth/catalogue',
//                 icon: 'assignment',
//                 chip: false,
//                 open: true,
//             }
//         ]
//     },
//     {
//         name: 'Audit Log',
//         link: '/Admin/auth/auditlog',
//         icon: 'widgets',
//         chip: false,
//         open: true,
//     },
// ];


export const menus = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        link: 'dashboard',
        open: false,
        chip: false,
        isChild : false,

    },
    {
        name: 'User Management',
        icon: 'widgets',
        link: false,
        open: false,
        isChild : false,
        sub: [
            {
                name: 'Users',
                link: 'userManagement',
                icon: 'assignment_ind',
                chip: false,
                open: true,
                isChild : true
            },
            {
                name: 'User Groups',
                link: 'usergroup',
                icon: 'list',
                chip: false,
                open: true,
                isChild : true
            },
            {
                name: 'Course Enrolment',
                icon: 'border_color',
                link: 'enrollment',
                open: false,
                chip: false,
                isChild : true
            },
            {
                name: 'Reports',
                link: 'reports',
                icon: 'notes',
                chip: false,
                open: true,
                isChild : true
            },
        ]
    },
    {
        name: 'Bulk Enrolment Management',
        icon: 'work',
        link: false,
        open: false,
        isChild : false,
        sub: [
            {
                name: 'Bulk Enrolment',
                icon: 'border_color',
                link: 'bulkenrolment',
                open: false,
                chip: false,
                isChild : true
            },
            {
                name: 'Reports',
                link: 'bulkenrolmentreports',
                icon: 'notes',
                chip: false,
                open: true,
                isChild : true
            },
        ]
    },
    {
        name: 'Course Management',
        icon: 'library_books',
        link: 'Wca',
        chip: false,
        open: true,
        isChild : false
    },

    {
        name: 'Catalogue Management',
        icon: 'business',
        link: false,
        open: false,
        isChild : false,
        sub: [
            {
                name: 'Categories',
                link: 'catagory',
                icon: 'view_quilt',
                chip: false,
                open: true,
                isChild : true
            },
            {
                name: 'Catalogues',
                link: 'catalogue',
                icon: 'assignment',
                chip: false,
                open: true,
                isChild : true
            }
        ]
    },
    {
        name: 'Batch Management',
        icon: 'school',
        link: 'batch',
        chip: false,
        open: true,
        isChild : false
    },
    {
        name: 'Audit Log',
        link: 'auditlog',
        icon: 'receipt',
        chip: false,
        open: true,
        isChild : false
    },
];
