import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserManagementComponent } from '../pages/user-management/user-management.component';
import { AddUserComponent } from '@admin/pages/add-user/add-user.component';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { GroupManagementComponent } from '@admin/pages/group-management/group-management.component';
import { AdminCoursesComponent } from '@admin/pages/admin-courses/admin-courses.component';
import { PublishCourseComponent } from '@admin/pages/publish-course/publish-course.component';
import { ReportManagementComponent } from '@admin/pages/report-management/report-management.component';
import { CatalogueManagementComponent } from '@admin/pages/catalogue-management/catalogue-management.component';
import { CatagoryManagementComponent } from '@admin/pages/catagory-management/catagory-management.component';
import { EnrollmentComponent} from '@admin/pages/enrollment/enrollment.component';
import { LearnerprofileComponent} from '@admin/pages/learnerprofile/learnerprofile.component';
import { AdminDashboardComponent } from '@admin/pages/admin-dashboard/admin-dashboard.component';
import { AuditlogComponent } from '@admin/pages/auditlog/auditlog.component';
import { ReportsComponent } from '@admin/pages/reports/reports.component';

export const appRoutes: Routes = [{
    path: 'auth', component: AuthComponent, children: [
        { path: 'dashboard', component: AdminDashboardComponent, data: { title: 'Admin Dashboard' } },
        { path: 'userManagement', component: UserManagementComponent, data: { title: 'Learner Management' }, canActivate: [AuthGuard] },
        { path: 'addUser', component: AddUserComponent, data: { title: 'Add New Learner' }, canActivate: [AuthGuard] },
        { path: 'publishCourse', component: PublishCourseComponent, data: { title: 'Publish Course' } },
        { path: 'viewReport', component: ReportManagementComponent, data: { title: 'Report Management' }, canActivate: [AuthGuard] },
        // { path: 'material-widgets', loadChildren: '../material-widgets/material-widgets.module#MaterialWidgetsModule' },
        { path : 'tables', loadChildren: '../tables/tables.module#TablesModule', data : {title: 'Admin Dashboard'} ,
         canActivate: [AuthGuard] },
        { path : 'usergroup' , component: GroupManagementComponent, data: { title: 'User Group creation' }, canActivate: [AuthGuard]},
        { path: 'listCourses', component: AdminCoursesComponent, data: { title: 'View Courses' }, canActivate: [AuthGuard]},
        { path: 'catalogue', component: CatalogueManagementComponent, data: { title: 'Catalogue Management' }, canActivate: [AuthGuard]},
        { path: 'catagory', component: CatagoryManagementComponent, data: { title: 'Category Management' }, canActivate: [AuthGuard]},
        { path: 'enrollment', component: EnrollmentComponent, data: { title: 'Enrollment' }, canActivate: [AuthGuard] },
        { path: 'learnerprofile', component: LearnerprofileComponent, data: { title: 'Profile' },  canActivate: [AuthGuard]},
        { path: 'reports', component: ReportsComponent, data: { title: 'Reports' }, canActivate: [AuthGuard] },
        { path: 'auditlog', component: AuditlogComponent, data: { title: 'Audit Log' },canActivate: [AuthGuard] },
        {
            path: 'Wca',
            loadChildren: '../../wca/wca.module#WcaModule',
            data : {title: 'Web Content Authoring'}
          },

        // { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
        { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule', data : {title: 'Admin Dashboard'} ,
         canActivate: [AuthGuard]  },
        // { path: 'chats', loadChildren: '../chats/chat.module#ChatsModule' }, // fix this
        // { path: 'mail', loadChildren: '../mail/mail.module#MailModule' }, // fix this
        // { path: 'pages', loadChildren: '../pages/pages.module#PagesModule' },
        // { path: 'forms', loadChildren: '../forms/forms.module#FormModule' }, //fix this
        // { path: 'guarded-routes', loadChildren: '../guarded-routes/guarded-routes.module#GuardedRoutesModule' },
        // { path: 'editor', loadChildren: '../editor/editor.module#EditorModule' },
        // { path: 'scrumboard', loadChildren: '../scrumboard/scrumboard.module#ScrumboardModule' },
    ]
}];
