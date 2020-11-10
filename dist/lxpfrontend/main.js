(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./core/core.module": [
		"./src/app/core/core.module.ts",
		"default~core-core-module~learner-learner-module"
	],
	"./learner/learner.module": [
		"./src/app/learner/learner.module.ts",
		"default~core-core-module~learner-learner-module",
		"learner-learner-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/admin/services/admin-services.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/admin/services/admin-services.service.ts ***!
  \**********************************************************/
/*! exports provided: AdminServicesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminServicesService", function() { return AdminServicesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var apollo_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-angular */ "./node_modules/apollo-angular/fesm2015/ngApollo.js");
/* harmony import */ var _core_services_configs_loader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/configs-loader.service */ "./src/app/core/services/configs-loader.service.ts");
/* harmony import */ var _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./operations/admin_mutation */ "./src/app/admin/services/operations/admin_mutation.ts");
/* harmony import */ var _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./operations/admin_query */ "./src/app/admin/services/operations/admin_query.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");








var AdminServicesService = /** @class */ (function () {
    // tslint:disable-next-line:no-shadowed-variable
    function AdminServicesService(Apollo, http, configs) {
        this.Apollo = Apollo;
        this.http = http;
        this.configs = configs;
        this.envWcaApi = _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].wcaapiurl;
        this.envApi = _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].apiUrl;
        this.envApiImg = _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].apiUrlImg;
        this.envCourseApi = _environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].createCourseApi;
    }
    // for add user - group dropdown
    AdminServicesService.prototype.getUserGroup = function () {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_user_group"],
        });
    };
    // Add user flow
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.user_registration = function (email, full_name, termsandconditions, group_id, group_name, admin) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["user_registration"],
            variables: {
                full_name: full_name,
                email: email,
                term_condition: termsandconditions,
                group_id: group_id,
                group_name: group_name,
                admin: admin
            }
        });
    };
    AdminServicesService.prototype.bulkuserupload = function (fb) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpHeaders"]({ Authorization: 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970' })
        };
        return this.http.post(this.envApiImg + 'bulkuserupload', fb, httpOptions);
    };
    // end of Add user flow
    // User Management
    AdminServicesService.prototype.getAllUsers = function (pagenumber, sort, groupname) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_all_user"],
            variables: {
                pagenumber: pagenumber,
                sort: sort,
                group_name: groupname
            }
        });
    };
    // api current;y not used
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.getLearnerDetail = function (user_id) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_all_learner_detail"],
            variables: {
                user_id: user_id,
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.getUserSession = function (user_id) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_user_session_detail"],
            variables: {
                user_id: user_id,
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.searchUser = function (search_string, pagination, sort) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["search_user"],
            variables: {
                search_string: search_string,
                pagination: pagination,
                sort: sort,
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.searchUserInGroup = function (search_string, group_id) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["searchUserFromGroup"],
            variables: {
                search_string: search_string,
                group_id: group_id
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.deActivate_And_reActivate_User = function (user_id, is_active) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["deactivate_reactivate_user"],
            variables: {
                user_id: user_id,
                is_active: is_active,
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.blockUser = function (user_id, is_blocked) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["block_user"],
            variables: {
                user_id: user_id,
                is_blocked: is_blocked,
            }
        });
    };
    // end of User Management
    // Group Management
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.updateGroup = function (_id, group_name, group_id) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["update_group"],
            variables: {
                _id: _id,
                group_name: group_name,
                group_id: group_id
            }
        });
    };
    AdminServicesService.prototype.gethierarchies = function () {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_user_group_hierarchy"],
        });
    };
    AdminServicesService.prototype.getgroup = function (data) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getgroup"],
            variables: {
                input_id: data.input_id, type: data.type, pagenumber: data.pagenumber
            }
        });
    };
    AdminServicesService.prototype.creategroup = function (group) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["createusergroup"],
            variables: {
                group_name: group.group_name, group_type: group.group_type,
                parent_group_id: group.parent_group_id, hierarchy_id: group.hierarchy_id,
                admin_id: group.admin_id, catalogue_id: group.catalogue_id
            }
        });
    };
    AdminServicesService.prototype.updategroupdetails = function (data) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["groupstatus"],
            variables: {
                catalogue_id: data.catalogue_id,
                catalogue_name: data.catalogue_name,
                is_active: data.is_active,
                group_id: data.group_id,
                group_name: data.group_name,
                group_type: data.group_type,
                parent_group_id: data.parent_group_id,
                hierarchy_id: data.hierarchy_id,
                admin_id: data.admin_id,
                created_by: data.created_by
            }
        });
    };
    AdminServicesService.prototype.getgroupbyid = function (groupid) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getgroupbyid"],
            variables: {
                group_id: groupid
            }
        });
    };
    // end of Group Management
    // Notifications
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.getNotificationData = function (admin_id) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getnotificationreports"],
            variables: {
                admin_id: admin_id,
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.removeNotificationData = function (report_id) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["update_notification"],
            variables: {
                report_id: report_id,
            }
        });
    };
    // end of Notifications
    // Course Management
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.getAllCourseCreated = function (user_id, pagenumber) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_course_createdby_admin"],
            variables: {
                admin_id: user_id,
                pagenumber: pagenumber
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.getAllCoursePublished = function (user_id, pagenumber) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_course_published"],
            variables: {
                admin_id: user_id,
                pagenumber: pagenumber
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.getAllDrafted = function (user_id, pagenumber) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_draft_course"],
            variables: {
                admin_id: user_id,
                pagenumber: pagenumber
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.publishCourse = function (course_id, is_published, level, category_id, sub_category_id, super_sub_category_id) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["publishcourse"],
            variables: {
                course_id: course_id,
                is_published: is_published,
                level: level,
                category_id: category_id,
                sub_category_id: sub_category_id,
                super_sub_category_id: super_sub_category_id
            }
        });
    };
    // end of COurse Management
    // Category Management
    AdminServicesService.prototype.createCategory = function (category) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["create_catelogue"],
            variables: {
                input_name: category.input_name,
                input_description: category.input_description,
                input_image: category.input_image,
                creator_id: category.creator_id,
                level: category.level,
                apply_all_courses: category.apply_all_courses,
                course_id: category.course_id,
                parent_category_id: category.parent_category_id,
                parent_sub_category_id: category.parent_sub_category_id,
            }
        });
    };
    AdminServicesService.prototype.getcategories = function (pgnumber) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getcategoryadmin"],
            variables: {
                pagenumber: pgnumber
            }
        });
    };
    AdminServicesService.prototype.reAssignCourses = function (course) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["reassigncourse"],
            variables: {
                old_level: course.old_level,
                old_category_id: course.old_category_id,
                old_sub_category_id: course.old_sub_category_id,
                old_super_sub_category_id: course.old_super_sub_category_id,
                level: course.level,
                apply_all_courses: course.apply_all_courses,
                course_id: course.course_id,
                category_id: course.category_id,
                sub_category_id: course.sub_category_id,
                super_sub_category_id: course.super_sub_category_id
            }
        });
    };
    AdminServicesService.prototype.updateCatagory = function (category) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["update_catalogue"],
            variables: {
                input_id: category.input_id,
                input_name: category.input_name,
                input_description: category.input_description,
                input_image: category.input_image,
                level: category.level,
            }
        });
    };
    AdminServicesService.prototype.deleteCategory = function (inputid, Level) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["delete_catalogue"],
            variables: {
                input_id: inputid,
                level: Level,
            }
        });
    };
    // End of Category Management
    // catalogue Management
    AdminServicesService.prototype.addNewCatalogue = function (name, description, id) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["create_master_catalogue"],
            variables: {
                catalogue_name: name,
                catalogue_description: description,
                creator_id: id,
            }
        });
    };
    AdminServicesService.prototype.updateCatalogDtl = function (name, description, id) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["updatecatalogueinfo"],
            variables: {
                catalogue_name: name,
                catalogue_description: description,
                catalogue_id: id,
            }
        });
    };
    AdminServicesService.prototype.getAllCatalogue = function (pg) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getallcatalogue"],
            variables: {
                pagenumber: pg,
            }
        });
    };
    AdminServicesService.prototype.getcatalogues = function () {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getcatalogue"],
        });
    };
    AdminServicesService.prototype.getallcatalogueById = function (id, pagenumber) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getallcatalogue_by_id"],
            variables: {
                catalogue_id: id,
                pagenumber: pagenumber
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.getCourseForCatalogue = function (catalogue_id, pagenumber) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getcoursesforcatalogue"],
            variables: {
                catalogue_id: catalogue_id,
                pagenumber: pagenumber
            }
        });
    };
    // tslint:disable-next-line:variable-name
    AdminServicesService.prototype.getCourseInCatalogue = function (catalogue_id, pagenumber) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getcoursesincatalogue"],
            variables: {
                catalogue_id: catalogue_id,
                pagenumber: pagenumber
            }
        });
    };
    AdminServicesService.prototype.addCourse = function (id, courseid, selectall) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["coursecataloguemapping"],
            variables: {
                catalogue_id: id,
                course_id: courseid,
                select_all: selectall
            }
        });
    };
    AdminServicesService.prototype.removeCourse = function (id, courseid, selectall) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["unmapcoursesfromcatalogue"],
            variables: {
                catalogue_id: id,
                course_id: courseid,
                select_all: selectall
            }
        });
    };
    // End of Catalogue Management
    // Enrollment
    AdminServicesService.prototype.getenrolledcourses = function (data) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getenrolledcourses"],
            variables: {
                group_id: data.group_id,
                pagenumber: data.pagenumber,
                is_individual: data.is_individual,
                course_id: data.course_id
            }
        });
    };
    AdminServicesService.prototype.getenrolledcoursesgroup = function (pgnumber) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["get_all_enrolledcourses"],
            variables: {
                pagenumber: pgnumber,
            }
        });
    };
    AdminServicesService.prototype.rejectenrollment = function (data) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["rejectenrollment"],
            variables: {
                update_type: data.update_type,
                status_reason: data.status_reason,
                enrollments: data.enrollments
            }
        });
    };
    AdminServicesService.prototype.approveenrollment = function (data) {
        return this.Apollo.query({
            query: _operations_admin_mutation__WEBPACK_IMPORTED_MODULE_4__["approveenrollment"],
            variables: {
                update_type: data.update_type,
                status_reason: data.status_reason,
                enrollments: data.enrollments
            }
        });
    };
    // End of enrollment
    // Start Of Bulk Enrollment
    AdminServicesService.prototype.bulkenrollment = function (fb) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpHeaders"]({ Authorization: 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970' })
        };
        return this.http.post(this.envApiImg + 'bulkenrollment', fb, httpOptions);
    };
    // End Of Bulk Enrollment
    // Dashboard
    // getting admin dashboard overview data
    AdminServicesService.prototype.getAdminOverview = function (days, userid) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getAdminOverview"],
            variables: {
                days: days,
                user_id: userid
            }
        });
    };
    // getting admin dashboard data for course tab
    AdminServicesService.prototype.getAdmindashboardCoursetab = function () {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getAdmindashboardCoursetab"],
            variables: {}
        });
    };
    AdminServicesService.prototype.getLeranertabCount = function () {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getLeranertabCount"],
            variables: {}
        });
    };
    // getting Active and in-active chart data
    AdminServicesService.prototype.getActiveinactiveCount = function (days) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getActiveinactiveCount"],
            variables: {
                days: days
            }
        });
    };
    // getting login per day chart data
    AdminServicesService.prototype.getLoginsPerDay = function (days) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getLoginsPerDay"],
            variables: {
                days: days,
            }
        });
    };
    // getting login per day data
    AdminServicesService.prototype.getUsersIndays = function (days) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getUsersInWeeks"],
            variables: {
                weeks: days,
            }
        });
    };
    // getting student and professional chart data
    AdminServicesService.prototype.getProfessionalStudent = function (days) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getProfessionalStudent"],
            variables: {
                days: days,
            }
        });
    };
    // getting enrolled and free course data for chart
    AdminServicesService.prototype.enrolledCourse = function (days) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["enrolledCourse"],
            variables: {
                days: days,
            }
        });
    };
    // getting top 5 course
    AdminServicesService.prototype.getTopfiveDashboardType = function (type) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getTopfiveDashboardType"],
            variables: {
                type: type
            }
        });
    };
    // getting all 3 level category for admin dashboard chart
    AdminServicesService.prototype.getCoursesChart = function () {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getCoursesChart"],
            variables: {}
        });
    };
    // End of dashboard
    AdminServicesService.prototype.getadminexportauditlog = function (fromdate, todate) {
        return this.Apollo.query({
            query: _operations_admin_query__WEBPACK_IMPORTED_MODULE_5__["getadminexportauditlog"],
            variables: {
                from_date: fromdate,
                to_date: todate
            }
        });
    };
    AdminServicesService.prototype.getfilteredauditlog = function (data) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpHeaders"]({ Authorization: localStorage.getItem('token') })
        };
        return this.http.post(this.envApi + 'get_audit_info', data, httpOptions);
    };
    AdminServicesService.prototype.getauditlogreports = function (pagenumber) {
        var headers1 = new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpHeaders"]().set('Authorization', localStorage.getItem('token'));
        var params1 = new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpParams"]().set('pagenumber', pagenumber);
        var options = { params: params1, headers: headers1 };
        return this.http.get(this.envApi + 'getauditlog', options);
    };
    AdminServicesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [apollo_angular__WEBPACK_IMPORTED_MODULE_2__["Apollo"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"],
            _core_services_configs_loader_service__WEBPACK_IMPORTED_MODULE_3__["ConfigsLoaderService"]])
    ], AdminServicesService);
    return AdminServicesService;
}());



/***/ }),

/***/ "./src/app/admin/services/operations/admin_mutation.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/services/operations/admin_mutation.ts ***!
  \*************************************************************/
/*! exports provided: user_registration, update_group, create_catelogue, createusergroup, update_notification, groupstatus, reassigncourse, update_catalogue, delete_catalogue, create_master_catalogue, updatecatalogueinfo, coursecataloguemapping, unmapcoursesfromcatalogue, rejectenrollment, approveenrollment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user_registration", function() { return user_registration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_group", function() { return update_group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_catelogue", function() { return create_catelogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createusergroup", function() { return createusergroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_notification", function() { return update_notification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupstatus", function() { return groupstatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reassigncourse", function() { return reassigncourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_catalogue", function() { return update_catalogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delete_catalogue", function() { return delete_catalogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_master_catalogue", function() { return create_master_catalogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatecatalogueinfo", function() { return updatecatalogueinfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coursecataloguemapping", function() { return coursecataloguemapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmapcoursesfromcatalogue", function() { return unmapcoursesfromcatalogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rejectenrollment", function() { return rejectenrollment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "approveenrollment", function() { return approveenrollment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


// tslint:disable-next-line:variable-name
var user_registration = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation user_registration($full_name: String!, $email: String!,$term_condition:Boolean,$group_id:String,\n    $group_name: String,$admin: [String]) {\n    user_registration(\n      full_name: $full_name\n      email: $email,\n      term_condition: $term_condition,\n      group_id: $group_id,\n      group_name: $group_name,\n      admin: $admin\n    ) {\n      message\n      success\n      data {\n      user_id\n      full_name\n      email\n      _id\n      }\n      _id\n      error\n    }\n  }"], ["\n  mutation user_registration($full_name: String!, $email: String!,$term_condition:Boolean,$group_id:String,\n    $group_name: String,$admin: [String]) {\n    user_registration(\n      full_name: $full_name\n      email: $email,\n      term_condition: $term_condition,\n      group_id: $group_id,\n      group_name: $group_name,\n      admin: $admin\n    ) {\n      message\n      success\n      data {\n      user_id\n      full_name\n      email\n      _id\n      }\n      _id\n      error\n    }\n  }"])));
// tslint:disable-next-line:variable-name
var update_group = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation update_group($_id: String!, $group_name: String!, $group_id: String!){\n  update_group(_id: $_id,group_name: $group_name, group_id: $group_id) {\n    success\n    error_msg\n    message\n  }\n}"], ["\nmutation update_group($_id: String!, $group_name: String!, $group_id: String!){\n  update_group(_id: $_id,group_name: $group_name, group_id: $group_id) {\n    success\n    error_msg\n    message\n  }\n}"])));
// tslint:disable-next-line:variable-name
var create_catelogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation create_catelogue(\n  $input_name: String!,\n  $input_description: String!,\n  $input_image: String!,\n  $creator_id: String!,\n  $level: Int!,\n  $apply_all_courses: Boolean!,\n  $course_id: [String]!,\n  $parent_category_id: String!,\n  $parent_sub_category_id: String!){\n  create_catelogue(input_name: $input_name,input_description: $input_description, input_image: $input_image,\n    creator_id : $creator_id,parent_sub_category_id: $parent_sub_category_id,level: $level, course_id: $course_id,\n    apply_all_courses : $apply_all_courses, parent_category_id: $parent_category_id) {\n    success\n    error_msg\n    message\n    details{\n      _id\n      level\n      category_id\n      category_name\n      category_image\n      category_description\n    }\n  }\n}"], ["\nmutation create_catelogue(\n  $input_name: String!,\n  $input_description: String!,\n  $input_image: String!,\n  $creator_id: String!,\n  $level: Int!,\n  $apply_all_courses: Boolean!,\n  $course_id: [String]!,\n  $parent_category_id: String!,\n  $parent_sub_category_id: String!){\n  create_catelogue(input_name: $input_name,input_description: $input_description, input_image: $input_image,\n    creator_id : $creator_id,parent_sub_category_id: $parent_sub_category_id,level: $level, course_id: $course_id,\n    apply_all_courses : $apply_all_courses, parent_category_id: $parent_category_id) {\n    success\n    error_msg\n    message\n    details{\n      _id\n      level\n      category_id\n      category_name\n      category_image\n      category_description\n    }\n  }\n}"])));
var createusergroup = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation createusergroup($group_name: String!, $group_type: String!, $parent_group_id: String!, $hierarchy_id: String!,\n     $admin_id: String!, $catalogue_id : String!) {\n  createusergroup(group_name: $group_name,group_type: $group_type,\n  parent_group_id: $parent_group_id,hierarchy_id: $hierarchy_id,admin_id: $admin_id,catalogue_id: $catalogue_id) {\n    success\n    error_msg\n    message{\n      _id\n      group_name\n      group_type\n      admin_id\n      created_on\n      updated_on\n      created_by\n      is_active\n      group_id\n      parent_id\n    }\n  }\n}"], ["\n  mutation createusergroup($group_name: String!, $group_type: String!, $parent_group_id: String!, $hierarchy_id: String!,\n     $admin_id: String!, $catalogue_id : String!) {\n  createusergroup(group_name: $group_name,group_type: $group_type,\n  parent_group_id: $parent_group_id,hierarchy_id: $hierarchy_id,admin_id: $admin_id,catalogue_id: $catalogue_id) {\n    success\n    error_msg\n    message{\n      _id\n      group_name\n      group_type\n      admin_id\n      created_on\n      updated_on\n      created_by\n      is_active\n      group_id\n      parent_id\n    }\n  }\n}"])));
// tslint:disable-next-line:variable-name
var update_notification = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation update_notification($report_id: String!){\n  update_notification(report_id: $report_id) {\n    success\n    error_msg\n    message\n  }\n}"], ["\nmutation update_notification($report_id: String!){\n  update_notification(report_id: $report_id) {\n    success\n    error_msg\n    message\n  }\n}"])));
var groupstatus = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_6 || (templateObject_6 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation groupstatus($catalogue_id: String!,$catalogue_name: String!,$is_active: Boolean!,$group_id: String!,$group_name: String!,\n  $group_type: String!,$parent_group_id: String!,$hierarchy_id: String!,$admin_id: String!,$created_by: String!){\n  groupstatus(catalogue_id: $catalogue_id,catalogue_name: $catalogue_name,is_active: $is_active,group_id : $group_id,\n    group_name: $group_name,group_type: $group_type,\n    parent_group_id : $parent_group_id,hierarchy_id: $hierarchy_id,admin_id: $ admin_id,created_by: $created_by){\n      success\n      message\n      error_msg\n  }\n}"], ["\nmutation groupstatus($catalogue_id: String!,$catalogue_name: String!,$is_active: Boolean!,$group_id: String!,$group_name: String!,\n  $group_type: String!,$parent_group_id: String!,$hierarchy_id: String!,$admin_id: String!,$created_by: String!){\n  groupstatus(catalogue_id: $catalogue_id,catalogue_name: $catalogue_name,is_active: $is_active,group_id : $group_id,\n    group_name: $group_name,group_type: $group_type,\n    parent_group_id : $parent_group_id,hierarchy_id: $hierarchy_id,admin_id: $ admin_id,created_by: $created_by){\n      success\n      message\n      error_msg\n  }\n}"])));
var reassigncourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_7 || (templateObject_7 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation reassigncourse(\n    $old_level:  Int!,\n    $old_category_id: String!,\n    $old_sub_category_id: String!,\n    $old_super_sub_category_id: String!,\n    $level: Int!,\n    $apply_all_courses: Boolean!,\n    $course_id: [String]!,\n    $category_id: String!,\n    $sub_category_id: String!,\n    $super_sub_category_id: String!){\n      reassigncourse(old_level: $old_level,old_category_id: $old_category_id, old_sub_category_id: $old_sub_category_id,\n        old_super_sub_category_id : $old_super_sub_category_id,level: $level,apply_all_courses: $apply_all_courses, course_id: $course_id,\n        category_id : $category_id, sub_category_id: $sub_category_id, super_sub_category_id: $super_sub_category_id) {\n      success\n      error_msg\n      message\n    }\n  }"], ["\n  mutation reassigncourse(\n    $old_level:  Int!,\n    $old_category_id: String!,\n    $old_sub_category_id: String!,\n    $old_super_sub_category_id: String!,\n    $level: Int!,\n    $apply_all_courses: Boolean!,\n    $course_id: [String]!,\n    $category_id: String!,\n    $sub_category_id: String!,\n    $super_sub_category_id: String!){\n      reassigncourse(old_level: $old_level,old_category_id: $old_category_id, old_sub_category_id: $old_sub_category_id,\n        old_super_sub_category_id : $old_super_sub_category_id,level: $level,apply_all_courses: $apply_all_courses, course_id: $course_id,\n        category_id : $category_id, sub_category_id: $sub_category_id, super_sub_category_id: $super_sub_category_id) {\n      success\n      error_msg\n      message\n    }\n  }"])));
// tslint:disable-next-line:variable-name
var update_catalogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_8 || (templateObject_8 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation update_catalogue($input_id: String!, $input_name: String!,$input_description: String,\n     $input_image: String,$level: Int!){\n    update_catalogue(input_id : $input_id,input_name: $input_name,input_description: $input_description,\n      input_image: $input_image,level: $level){\n      success\n      message\n      error_msg\n    }\n  }"], ["\n  mutation update_catalogue($input_id: String!, $input_name: String!,$input_description: String,\n     $input_image: String,$level: Int!){\n    update_catalogue(input_id : $input_id,input_name: $input_name,input_description: $input_description,\n      input_image: $input_image,level: $level){\n      success\n      message\n      error_msg\n    }\n  }"])));
// tslint:disable-next-line:variable-name
var delete_catalogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_9 || (templateObject_9 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation delete_catalogue($input_id: String! ,$level: Int!) {\n  delete_catalogue(input_id: $input_id,level: $level){\n    success\n    error_msg\n    message\n  }\n}"], ["\nmutation delete_catalogue($input_id: String! ,$level: Int!) {\n  delete_catalogue(input_id: $input_id,level: $level){\n    success\n    error_msg\n    message\n  }\n}"])));
// tslint:disable-next-line:variable-name
var create_master_catalogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_10 || (templateObject_10 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation  create_master_catalogue($catalogue_name: String! ,$catalogue_description : String!,$creator_id: String!) {\n  create_master_catalogue(catalogue_name: $catalogue_name,catalogue_description: $catalogue_description,creator_id:$creator_id ){\n    success\n    error_msg\n    message\n    details{\n      catalogue_id\n    }\n  }\n}"], ["\nmutation  create_master_catalogue($catalogue_name: String! ,$catalogue_description : String!,$creator_id: String!) {\n  create_master_catalogue(catalogue_name: $catalogue_name,catalogue_description: $catalogue_description,creator_id:$creator_id ){\n    success\n    error_msg\n    message\n    details{\n      catalogue_id\n    }\n  }\n}"])));
var updatecatalogueinfo = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_11 || (templateObject_11 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation  updatecatalogueinfo($catalogue_name: String! ,$catalogue_description : String!,$catalogue_id: String!) {\n  updatecatalogueinfo(catalogue_name: $catalogue_name,catalogue_description: $catalogue_description,catalogue_id:$catalogue_id ){\n    success\n    error_msg\n    message\n  }\n}"], ["\nmutation  updatecatalogueinfo($catalogue_name: String! ,$catalogue_description : String!,$catalogue_id: String!) {\n  updatecatalogueinfo(catalogue_name: $catalogue_name,catalogue_description: $catalogue_description,catalogue_id:$catalogue_id ){\n    success\n    error_msg\n    message\n  }\n}"])));
var coursecataloguemapping = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_12 || (templateObject_12 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation coursecataloguemapping($catalogue_id: String! ,$course_id: [String]! , $select_all: Boolean!) {\n  coursecataloguemapping(catalogue_id: $catalogue_id,course_id: $course_id, select_all: $select_all){\n    success\n    error_msg\n    message\n  }\n}"], ["\nmutation coursecataloguemapping($catalogue_id: String! ,$course_id: [String]! , $select_all: Boolean!) {\n  coursecataloguemapping(catalogue_id: $catalogue_id,course_id: $course_id, select_all: $select_all){\n    success\n    error_msg\n    message\n  }\n}"])));
var unmapcoursesfromcatalogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_13 || (templateObject_13 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation unmapcoursesfromcatalogue($catalogue_id: String! ,$course_id: [String]! , $select_all: Boolean!) {\n  unmapcoursesfromcatalogue(catalogue_id: $catalogue_id,course_id: $course_id, select_all: $select_all ){\n    success\n    error_msg\n    message\n  }\n}"], ["\nmutation unmapcoursesfromcatalogue($catalogue_id: String! ,$course_id: [String]! , $select_all: Boolean!) {\n  unmapcoursesfromcatalogue(catalogue_id: $catalogue_id,course_id: $course_id, select_all: $select_all ){\n    success\n    error_msg\n    message\n  }\n}"])));
// mutation{
//   create_master_catalogue(
//     catalogue_name: "sample 1",
//     catalogue_description : "sample catalogue number 1",
//     creator_id : "5e69f4ad139c79bbf14adc8a"
//   ){
//     success
//     error_msg
//     message
//   }
// }
var rejectenrollment = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_14 || (templateObject_14 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation reject_enrollment ($update_type: String!, $status_reason: String!,$enrollments: [enrollments_dtl]){\n  reject_enrollment(update_type: $update_type, status_reason: $status_reason, enrollments: $enrollments ){\n      success\n      error_msg\n      message\n  }\n}"], ["\nmutation reject_enrollment ($update_type: String!, $status_reason: String!,$enrollments: [enrollments_dtl]){\n  reject_enrollment(update_type: $update_type, status_reason: $status_reason, enrollments: $enrollments ){\n      success\n      error_msg\n      message\n  }\n}"])));
var approveenrollment = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_15 || (templateObject_15 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation approve_enrollment ($update_type: String!, $status_reason: String!,$enrollments: [enrollments_dtl]){\n  approve_enrollment(update_type: $update_type, status_reason: $status_reason, enrollments: $enrollments ){\n      success\n      error_msg\n      message\n  }\n}"], ["\nmutation approve_enrollment ($update_type: String!, $status_reason: String!,$enrollments: [enrollments_dtl]){\n  approve_enrollment(update_type: $update_type, status_reason: $status_reason, enrollments: $enrollments ){\n      success\n      error_msg\n      message\n  }\n}"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15;


/***/ }),

/***/ "./src/app/admin/services/operations/admin_query.ts":
/*!**********************************************************!*\
  !*** ./src/app/admin/services/operations/admin_query.ts ***!
  \**********************************************************/
/*! exports provided: get_user_group, search_user, searchUserFromGroup, deactivate_reactivate_user, block_user, get_all_user, get_user_session_detail, get_all_learner_detail, getnotificationreports, getgroup, get_user_group_hierarchy, get_course_createdby_admin, get_course_published, get_draft_course, publishcourse, getcategoryadmin, getallcatalogue_by_id, getallcatalogue, getcoursesincatalogue, getcatalogue, getenrolledcourses, get_all_enrolledcourses, getcoursesforcatalogue, getAdminOverview, getAdmindashboardCoursetab, getUsersInWeeks, getLoginsPerDay, getLeranertabCount, getActiveinactiveCount, getProfessionalStudent, getCoursesChart, enrolledCourse, getgroupbyid, getTopfiveDashboardType, getadminexportauditlog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_user_group", function() { return get_user_group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "search_user", function() { return search_user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchUserFromGroup", function() { return searchUserFromGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deactivate_reactivate_user", function() { return deactivate_reactivate_user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "block_user", function() { return block_user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_all_user", function() { return get_all_user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_user_session_detail", function() { return get_user_session_detail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_all_learner_detail", function() { return get_all_learner_detail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getnotificationreports", function() { return getnotificationreports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getgroup", function() { return getgroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_user_group_hierarchy", function() { return get_user_group_hierarchy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_course_createdby_admin", function() { return get_course_createdby_admin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_course_published", function() { return get_course_published; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_draft_course", function() { return get_draft_course; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishcourse", function() { return publishcourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getcategoryadmin", function() { return getcategoryadmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getallcatalogue_by_id", function() { return getallcatalogue_by_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getallcatalogue", function() { return getallcatalogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getcoursesincatalogue", function() { return getcoursesincatalogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getcatalogue", function() { return getcatalogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getenrolledcourses", function() { return getenrolledcourses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_all_enrolledcourses", function() { return get_all_enrolledcourses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getcoursesforcatalogue", function() { return getcoursesforcatalogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdminOverview", function() { return getAdminOverview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdmindashboardCoursetab", function() { return getAdmindashboardCoursetab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsersInWeeks", function() { return getUsersInWeeks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoginsPerDay", function() { return getLoginsPerDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLeranertabCount", function() { return getLeranertabCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActiveinactiveCount", function() { return getActiveinactiveCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfessionalStudent", function() { return getProfessionalStudent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoursesChart", function() { return getCoursesChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enrolledCourse", function() { return enrolledCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getgroupbyid", function() { return getgroupbyid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopfiveDashboardType", function() { return getTopfiveDashboardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getadminexportauditlog", function() { return getadminexportauditlog; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


// tslint:disable-next-line:variable-name
var get_user_group = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_user_group {\n    get_user_group {\n      success\n      message {\n        _id\n        group_name\n        group_type\n        is_active\n        group_id\n        parent_group_id\n        admin_id\n        hierarchy_id\n      }\n    }\n  }\n"], ["\n  query get_user_group {\n    get_user_group {\n      success\n      message {\n        _id\n        group_name\n        group_type\n        is_active\n        group_id\n        parent_group_id\n        admin_id\n        hierarchy_id\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var search_user = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query search_user($search_string: String!, $pagination: Int!, $sort: Int!) {\n    search_user(\n      search_string: $search_string\n      pagination: $pagination\n      sort: $sort\n    ) {\n      success\n      error_msg\n      message {\n        _id\n        is_admin\n        is_active\n        user_id\n        username\n        is_blocked\n        email\n        full_name\n        mobile_number\n        group_name\n        group_id\n      }\n    }\n  }\n"], ["\n  query search_user($search_string: String!, $pagination: Int!, $sort: Int!) {\n    search_user(\n      search_string: $search_string\n      pagination: $pagination\n      sort: $sort\n    ) {\n      success\n      error_msg\n      message {\n        _id\n        is_admin\n        is_active\n        user_id\n        username\n        is_blocked\n        email\n        full_name\n        mobile_number\n        group_name\n        group_id\n      }\n    }\n  }\n"])));
var searchUserFromGroup = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query search_user($search_string: String!, $group_id: String!) {\n    search_user(search_string: $search_string, group_id: $group_id) {\n      success\n      error_msg\n      message {\n        id\n        is_admin\n        is_active\n        user_id\n        username\n        is_blocked\n        email\n        full_name\n        mobile_number\n        group_name\n        group_id\n      }\n    }\n  }\n"], ["\n  query search_user($search_string: String!, $group_id: String!) {\n    search_user(search_string: $search_string, group_id: $group_id) {\n      success\n      error_msg\n      message {\n        id\n        is_admin\n        is_active\n        user_id\n        username\n        is_blocked\n        email\n        full_name\n        mobile_number\n        group_name\n        group_id\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var deactivate_reactivate_user = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query deactivate_reactivate_user($user_id: [String]!, $is_active: Boolean!) {\n    deactivate_reactivate_user(user_id: $user_id, is_active: $is_active) {\n      success\n      error_msg\n      message {\n        outdated_users\n        updated_users\n      }\n    }\n  }\n"], ["\n  query deactivate_reactivate_user($user_id: [String]!, $is_active: Boolean!) {\n    deactivate_reactivate_user(user_id: $user_id, is_active: $is_active) {\n      success\n      error_msg\n      message {\n        outdated_users\n        updated_users\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var block_user = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query block_user($user_id: [String]!, $is_blocked: Boolean!) {\n    block_user(user_id: $user_id, is_blocked: $is_blocked) {\n      success\n      error_msg\n      message {\n        outdated_users\n        updated_users\n      }\n    }\n  }\n"], ["\n  query block_user($user_id: [String]!, $is_blocked: Boolean!) {\n    block_user(user_id: $user_id, is_blocked: $is_blocked) {\n      success\n      error_msg\n      message {\n        outdated_users\n        updated_users\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var get_all_user = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_6 || (templateObject_6 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_all_user($pagenumber: Int!, $sort: Int!, $group_name: String!) {\n    get_all_user(\n      pagenumber: $pagenumber\n      sort: $sort\n      group_name: $group_name\n    ) {\n      success\n      error_msg\n      learner_count\n      message {\n        _id\n        is_admin\n        is_active\n        user_id\n        username\n        is_blocked\n        full_name\n        email\n        mobile_number\n        group_name\n        group_id\n      }\n    }\n  }\n"], ["\n  query get_all_user($pagenumber: Int!, $sort: Int!, $group_name: String!) {\n    get_all_user(\n      pagenumber: $pagenumber\n      sort: $sort\n      group_name: $group_name\n    ) {\n      success\n      error_msg\n      learner_count\n      message {\n        _id\n        is_admin\n        is_active\n        user_id\n        username\n        is_blocked\n        full_name\n        email\n        mobile_number\n        group_name\n        group_id\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var get_user_session_detail = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_7 || (templateObject_7 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_user_session_detail($user_id: String!) {\n    get_user_session_detail(user_id: $user_id) {\n      success\n      message {\n        _id\n        wishlist_count\n        enrolled_course_count\n        course_detail {\n          course_id\n          course_description\n          course_name\n          course_start_datetime\n          course_end_datetime\n          enrollment_start\n          enrollment_end\n          author_details\n        }\n        wishlist_added {\n          course_id\n          created_on\n        }\n        userObjects {\n          _id\n          is_admin\n          is_active\n          user_id\n          username\n          is_blocked\n          is_profile_updated\n          registered_date\n          mobile_number\n          email\n          full_name\n          profile_img\n          year_of_birth\n          progress\n          gender\n          about_you\n          is_student_or_professional\n          country_name\n          state_name\n          professional {\n            total_experience\n            organization\n            job_role\n          }\n          social_media {\n            _id\n            link\n            img\n          }\n          user_profile\n        }\n        player_detail {\n          _id\n          status\n          location\n          course_id\n        }\n        last_login\n        language\n      }\n    }\n  }\n"], ["\n  query get_user_session_detail($user_id: String!) {\n    get_user_session_detail(user_id: $user_id) {\n      success\n      message {\n        _id\n        wishlist_count\n        enrolled_course_count\n        course_detail {\n          course_id\n          course_description\n          course_name\n          course_start_datetime\n          course_end_datetime\n          enrollment_start\n          enrollment_end\n          author_details\n        }\n        wishlist_added {\n          course_id\n          created_on\n        }\n        userObjects {\n          _id\n          is_admin\n          is_active\n          user_id\n          username\n          is_blocked\n          is_profile_updated\n          registered_date\n          mobile_number\n          email\n          full_name\n          profile_img\n          year_of_birth\n          progress\n          gender\n          about_you\n          is_student_or_professional\n          country_name\n          state_name\n          professional {\n            total_experience\n            organization\n            job_role\n          }\n          social_media {\n            _id\n            link\n            img\n          }\n          user_profile\n        }\n        player_detail {\n          _id\n          status\n          location\n          course_id\n        }\n        last_login\n        language\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var get_all_learner_detail = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_8 || (templateObject_8 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_all_learner_detail($user_id: String!) {\n    get_all_learner_detail(user_id: $user_id) {\n      success\n      message {\n        _id\n        language\n        qualification {\n          Board_Name\n          Board_Id\n          institute_id\n          institute_name\n          institute_code\n          discipline_id\n          discipline_name\n          discipline_code\n          year_of_passing\n          percentage\n          specification_id\n          specification_name\n          specification_code\n          level_id\n          level_name\n          level_code\n        }\n        userObjects {\n          _id\n          is_admin\n          is_active\n          email\n          full_name\n          user_id\n          username\n          is_blocked\n          is_profile_updated\n          registered_date\n          mobile_number\n          profile_img\n          year_of_birth\n          progress\n          gender\n          about_you\n          is_student_or_professional\n          country_name\n          state_name\n          professional {\n            total_experience\n            organization\n            job_role\n          }\n          social_media {\n            _id\n            link\n            img\n          }\n          user_profile\n        }\n      }\n      error_msg\n    }\n  }\n"], ["\n  query get_all_learner_detail($user_id: String!) {\n    get_all_learner_detail(user_id: $user_id) {\n      success\n      message {\n        _id\n        language\n        qualification {\n          Board_Name\n          Board_Id\n          institute_id\n          institute_name\n          institute_code\n          discipline_id\n          discipline_name\n          discipline_code\n          year_of_passing\n          percentage\n          specification_id\n          specification_name\n          specification_code\n          level_id\n          level_name\n          level_code\n        }\n        userObjects {\n          _id\n          is_admin\n          is_active\n          email\n          full_name\n          user_id\n          username\n          is_blocked\n          is_profile_updated\n          registered_date\n          mobile_number\n          profile_img\n          year_of_birth\n          progress\n          gender\n          about_you\n          is_student_or_professional\n          country_name\n          state_name\n          professional {\n            total_experience\n            organization\n            job_role\n          }\n          social_media {\n            _id\n            link\n            img\n          }\n          user_profile\n        }\n      }\n      error_msg\n    }\n  }\n"])));
var getnotificationreports = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_9 || (templateObject_9 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getnotificationreports($admin_id: String!) {\n    getnotificationreports(admin_id: $admin_id) {\n      success\n      error_msg\n      message {\n        _id\n        upload_url\n        report_url\n        is_active\n        report_id\n        admin_id\n        time_ago\n        success_count\n        failure_count\n        updated_count\n        request_type\n        duplicate_count\n        existing_count\n        total_count\n        notification_msg\n        report_info {\n          created_on\n          updated_on\n          created_by\n        }\n      }\n    }\n  }\n"], ["\n  query getnotificationreports($admin_id: String!) {\n    getnotificationreports(admin_id: $admin_id) {\n      success\n      error_msg\n      message {\n        _id\n        upload_url\n        report_url\n        is_active\n        report_id\n        admin_id\n        time_ago\n        success_count\n        failure_count\n        updated_count\n        request_type\n        duplicate_count\n        existing_count\n        total_count\n        notification_msg\n        report_info {\n          created_on\n          updated_on\n          created_by\n        }\n      }\n    }\n  }\n"])));
var getgroup = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_10 || (templateObject_10 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getgroup($input_id: String!, $type: String!, $pagenumber: Int!) {\n    getgroup(input_id: $input_id, type: $type, pagenumber: $pagenumber) {\n      success\n      error_msg\n      message {\n        _id\n        group_name\n        group_type\n        admin_id\n        created_on\n        updated_on\n        created_by\n        is_active\n        group_id\n        hierarchy_id\n        parent_group_id\n      }\n    }\n  }\n"], ["\n  query getgroup($input_id: String!, $type: String!, $pagenumber: Int!) {\n    getgroup(input_id: $input_id, type: $type, pagenumber: $pagenumber) {\n      success\n      error_msg\n      message {\n        _id\n        group_name\n        group_type\n        admin_id\n        created_on\n        updated_on\n        created_by\n        is_active\n        group_id\n        hierarchy_id\n        parent_group_id\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var get_user_group_hierarchy = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_11 || (templateObject_11 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_user_group_hierarchy {\n    get_user_group_hierarchy {\n      success\n      error_msg\n      message {\n        _id\n        hierarchy_id\n        hierarchy_name\n        hierarchy_level\n        created_on\n        updated_on\n        created_by\n        admin_id\n        is_active\n      }\n    }\n  }\n"], ["\n  query get_user_group_hierarchy {\n    get_user_group_hierarchy {\n      success\n      error_msg\n      message {\n        _id\n        hierarchy_id\n        hierarchy_name\n        hierarchy_level\n        created_on\n        updated_on\n        created_by\n        admin_id\n        is_active\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var get_course_createdby_admin = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_12 || (templateObject_12 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_course_createdby_admin($admin_id: String!, $pagenumber: Int!) {\n    get_course_createdby_admin(admin_id: $admin_id, pagenumber: $pagenumber) {\n      success\n      error_msg\n      course_count\n      message {\n        course_id\n        course_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        pre_requisite {\n          name\n          image\n        }\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        parent_sub_category_id\n        category_id\n        groupid\n        created_by\n        updated_by\n        admin_id\n        is_published\n        course_mode\n        preview_video\n        learner_count\n        is_active\n        published_by\n        publisher_id\n        updated_by_id\n        published_on\n        takeway_details {\n          text\n          description\n          what_will_you_learn\n          media\n        }\n        coursepartner_details {\n          name\n          image\n        }\n        course_content_details {\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content {\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit {\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content {\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details {\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }\n"], ["\n  query get_course_createdby_admin($admin_id: String!, $pagenumber: Int!) {\n    get_course_createdby_admin(admin_id: $admin_id, pagenumber: $pagenumber) {\n      success\n      error_msg\n      course_count\n      message {\n        course_id\n        course_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        pre_requisite {\n          name\n          image\n        }\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        parent_sub_category_id\n        category_id\n        groupid\n        created_by\n        updated_by\n        admin_id\n        is_published\n        course_mode\n        preview_video\n        learner_count\n        is_active\n        published_by\n        publisher_id\n        updated_by_id\n        published_on\n        takeway_details {\n          text\n          description\n          what_will_you_learn\n          media\n        }\n        coursepartner_details {\n          name\n          image\n        }\n        course_content_details {\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content {\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit {\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content {\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details {\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var get_course_published = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_13 || (templateObject_13 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_course_published($admin_id: String!, $pagenumber: Int!) {\n    get_course_published(admin_id: $admin_id, pagenumber: $pagenumber) {\n      success\n      course_count\n      message {\n        course_id\n        course_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        pre_requisite {\n          name\n          image\n        }\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        parent_sub_category_id\n        category_id\n        groupid\n        created_by\n        updated_by\n        admin_id\n        is_published\n        course_mode\n        preview_video\n        learner_count\n        is_active\n        published_by\n        publisher_id\n        updated_by_id\n        published_on\n        takeway_details {\n          text\n          description\n          what_will_you_learn\n          media\n        }\n        coursepartner_details {\n          name\n          image\n        }\n        course_content_details {\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content {\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit {\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content {\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details {\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }\n"], ["\n  query get_course_published($admin_id: String!, $pagenumber: Int!) {\n    get_course_published(admin_id: $admin_id, pagenumber: $pagenumber) {\n      success\n      course_count\n      message {\n        course_id\n        course_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        pre_requisite {\n          name\n          image\n        }\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        parent_sub_category_id\n        category_id\n        groupid\n        created_by\n        updated_by\n        admin_id\n        is_published\n        course_mode\n        preview_video\n        learner_count\n        is_active\n        published_by\n        publisher_id\n        updated_by_id\n        published_on\n        takeway_details {\n          text\n          description\n          what_will_you_learn\n          media\n        }\n        coursepartner_details {\n          name\n          image\n        }\n        course_content_details {\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content {\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit {\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content {\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details {\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var get_draft_course = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_14 || (templateObject_14 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_draft_course($admin_id: String!, $pagenumber: Int!) {\n    get_draft_course(admin_id: $admin_id, pagenumber: $pagenumber) {\n      success\n      course_count\n      message {\n        course_id\n        course_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        pre_requisite {\n          name\n          image\n        }\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        parent_sub_category_id\n        category_id\n        groupid\n        created_by\n        updated_by\n        admin_id\n        is_published\n        course_mode\n        preview_video\n        learner_count\n        is_active\n        published_by\n        publisher_id\n        updated_by_id\n        published_on\n        takeway_details {\n          text\n          description\n          what_will_you_learn\n          media\n        }\n        coursepartner_details {\n          name\n          image\n        }\n        course_content_details {\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content {\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit {\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content {\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details {\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }\n"], ["\n  query get_draft_course($admin_id: String!, $pagenumber: Int!) {\n    get_draft_course(admin_id: $admin_id, pagenumber: $pagenumber) {\n      success\n      course_count\n      message {\n        course_id\n        course_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        pre_requisite {\n          name\n          image\n        }\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        parent_sub_category_id\n        category_id\n        groupid\n        created_by\n        updated_by\n        admin_id\n        is_published\n        course_mode\n        preview_video\n        learner_count\n        is_active\n        published_by\n        publisher_id\n        updated_by_id\n        published_on\n        takeway_details {\n          text\n          description\n          what_will_you_learn\n          media\n        }\n        coursepartner_details {\n          name\n          image\n        }\n        course_content_details {\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content {\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit {\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content {\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details {\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var publishcourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_15 || (templateObject_15 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query publishcourse(\n    $course_id: String!\n    $is_published: Boolean!\n    $level: String!\n    $category_id: String\n    $sub_category_id: String\n    $super_sub_category_id: String\n  ) {\n    publishcourse(\n      course_id: $course_id\n      is_published: $is_published\n      category_id: $category_id\n      sub_category_id: $sub_category_id\n      level: $level\n      super_sub_category_id: $super_sub_category_id\n    ) {\n      success\n      message\n      error_msg\n    }\n  }\n"], ["\n  query publishcourse(\n    $course_id: String!\n    $is_published: Boolean!\n    $level: String!\n    $category_id: String\n    $sub_category_id: String\n    $super_sub_category_id: String\n  ) {\n    publishcourse(\n      course_id: $course_id\n      is_published: $is_published\n      category_id: $category_id\n      sub_category_id: $sub_category_id\n      level: $level\n      super_sub_category_id: $super_sub_category_id\n    ) {\n      success\n      message\n      error_msg\n    }\n  }\n"])));
var getcategoryadmin = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_16 || (templateObject_16 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getcategoryadmin($pagenumber: Int!) {\n    getcategoryadmin(pagenumber: $pagenumber) {\n      success\n      error_msg\n      message {\n        _id\n        creator_id\n        level\n        created_on\n        updated_on\n        created_by\n        language_code\n        is_active\n        category_id\n        category_name\n        category_image\n        category_description\n        is_child\n      }\n    }\n  }\n"], ["\n  query getcategoryadmin($pagenumber: Int!) {\n    getcategoryadmin(pagenumber: $pagenumber) {\n      success\n      error_msg\n      message {\n        _id\n        creator_id\n        level\n        created_on\n        updated_on\n        created_by\n        language_code\n        is_active\n        category_id\n        category_name\n        category_image\n        category_description\n        is_child\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var getallcatalogue_by_id = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_17 || (templateObject_17 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getallcatalogue_by_id($catalogue_id: String!, $pagenumber: Int!) {\n    getallcatalogue_by_id(\n      catalogue_id: $catalogue_id\n      pagenumber: $pagenumber\n    ) {\n      success\n      error_msg\n      message {\n        _id\n        catalogue_name\n        catalogue_description\n        creator_id\n        catalogue_id\n        created_on\n        updated_on\n        created_by\n        is_active\n        group_details {\n          _id\n          admin_id\n          catalogue_id\n          created_on\n          updated_on\n          created_by\n          is_active\n          group_id\n          group_name\n          category_id\n        }\n        course_details {\n          course_id\n          course_description\n          course_name\n          course_category\n          course_type\n          course_language\n          super_sub_category_details {\n            _id\n            creator_id\n            level\n            created_on\n            updated_on\n            created_by\n            language_code\n            is_active\n            super_sub_category_id\n            super_sub_category_name\n            super_sub_category_image\n            super_sub_category_description\n            parent_sub_category_id\n            parent_category_id\n          }\n          sub_category_details {\n            _id\n            creator_id\n            level\n            created_on\n            updated_on\n            created_by\n            language_code\n            is_active\n            sub_category_id\n            sub_category_name\n            sub_category_image\n            sub_category_description\n            parent_category_id\n          }\n          category_details {\n            _id\n            creator_id\n            level\n            created_on\n            updated_on\n            created_by\n            language_code\n            is_active\n            category_id\n            category_name\n            category_image\n            category_description\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query getallcatalogue_by_id($catalogue_id: String!, $pagenumber: Int!) {\n    getallcatalogue_by_id(\n      catalogue_id: $catalogue_id\n      pagenumber: $pagenumber\n    ) {\n      success\n      error_msg\n      message {\n        _id\n        catalogue_name\n        catalogue_description\n        creator_id\n        catalogue_id\n        created_on\n        updated_on\n        created_by\n        is_active\n        group_details {\n          _id\n          admin_id\n          catalogue_id\n          created_on\n          updated_on\n          created_by\n          is_active\n          group_id\n          group_name\n          category_id\n        }\n        course_details {\n          course_id\n          course_description\n          course_name\n          course_category\n          course_type\n          course_language\n          super_sub_category_details {\n            _id\n            creator_id\n            level\n            created_on\n            updated_on\n            created_by\n            language_code\n            is_active\n            super_sub_category_id\n            super_sub_category_name\n            super_sub_category_image\n            super_sub_category_description\n            parent_sub_category_id\n            parent_category_id\n          }\n          sub_category_details {\n            _id\n            creator_id\n            level\n            created_on\n            updated_on\n            created_by\n            language_code\n            is_active\n            sub_category_id\n            sub_category_name\n            sub_category_image\n            sub_category_description\n            parent_category_id\n          }\n          category_details {\n            _id\n            creator_id\n            level\n            created_on\n            updated_on\n            created_by\n            language_code\n            is_active\n            category_id\n            category_name\n            category_image\n            category_description\n          }\n        }\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var getallcatalogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_18 || (templateObject_18 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getallcatalogue($pagenumber: Int!) {\n    getallcatalogue(pagenumber: $pagenumber) {\n      success\n      error_msg\n      total_count\n      message {\n        _id\n        catalogue_name\n        catalogue_description\n        creator_id\n        catalogue_id\n        created_on\n        updated_on\n        created_by\n        is_active\n        course_count\n      }\n    }\n  }\n"], ["\n  query getallcatalogue($pagenumber: Int!) {\n    getallcatalogue(pagenumber: $pagenumber) {\n      success\n      error_msg\n      total_count\n      message {\n        _id\n        catalogue_name\n        catalogue_description\n        creator_id\n        catalogue_id\n        created_on\n        updated_on\n        created_by\n        is_active\n        course_count\n      }\n    }\n  }\n"])));
var getcoursesincatalogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_19 || (templateObject_19 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getcoursesincatalogue($catalogue_id: String!, $pagenumber: Int!) {\n    getcoursesincatalogue(\n      catalogue_id: $catalogue_id\n      pagenumber: $pagenumber\n    ) {\n      success\n      total_count\n      error_msg\n      message {\n        course_id\n        course_name\n        course_description\n        short_description\n        course_img_url\n      }\n    }\n  }\n"], ["\n  query getcoursesincatalogue($catalogue_id: String!, $pagenumber: Int!) {\n    getcoursesincatalogue(\n      catalogue_id: $catalogue_id\n      pagenumber: $pagenumber\n    ) {\n      success\n      total_count\n      error_msg\n      message {\n        course_id\n        course_name\n        course_description\n        short_description\n        course_img_url\n      }\n    }\n  }\n"])));
var getcatalogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_20 || (templateObject_20 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getallcatalogue {\n    getallcatalogue {\n      success\n      error_msg\n      total_count\n      message {\n        _id\n        catalogue_name\n        catalogue_description\n        creator_id\n        catalogue_id\n        created_on\n        updated_on\n        created_by\n        is_active\n      }\n    }\n  }\n"], ["\n  query getallcatalogue {\n    getallcatalogue {\n      success\n      error_msg\n      total_count\n      message {\n        _id\n        catalogue_name\n        catalogue_description\n        creator_id\n        catalogue_id\n        created_on\n        updated_on\n        created_by\n        is_active\n      }\n    }\n  }\n"])));
var getenrolledcourses = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_21 || (templateObject_21 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getenrolledcourses(\n    $group_id: String!\n    $pagenumber: Int!\n    $is_individual: Boolean!\n    $course_id: String!\n  ) {\n    getenrolledcourses(\n      group_id: $group_id\n      pagenumber: $pagenumber\n      is_individual: $is_individual\n      course_id: $course_id\n    ) {\n      success\n      error_msg\n      enroll_count\n      message {\n        _id\n        user_id\n        user_obj_id\n        course_id\n        enroll_date\n        lxp_joined_date\n        username\n        full_name\n        group_name\n        course_name\n        group_id\n        wish_list {\n          wish_list_id\n          created_on\n          user_id\n        }\n      }\n    }\n  }\n"], ["\n  query getenrolledcourses(\n    $group_id: String!\n    $pagenumber: Int!\n    $is_individual: Boolean!\n    $course_id: String!\n  ) {\n    getenrolledcourses(\n      group_id: $group_id\n      pagenumber: $pagenumber\n      is_individual: $is_individual\n      course_id: $course_id\n    ) {\n      success\n      error_msg\n      enroll_count\n      message {\n        _id\n        user_id\n        user_obj_id\n        course_id\n        enroll_date\n        lxp_joined_date\n        username\n        full_name\n        group_name\n        course_name\n        group_id\n        wish_list {\n          wish_list_id\n          created_on\n          user_id\n        }\n      }\n    }\n  }\n"])));
// tslint:disable-next-line:variable-name
var get_all_enrolledcourses = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_22 || (templateObject_22 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_all_enrolledcourses($pagenumber: Int!) {\n    get_all_enrolledcourses(pagenumber: $pagenumber) {\n      enroll_count\n      success\n      error_msg\n      message {\n        totalCount\n        request_date\n        group_detail {\n          group_name\n          group_id\n          course_id\n          course_name\n        }\n      }\n    }\n  }\n"], ["\n  query get_all_enrolledcourses($pagenumber: Int!) {\n    get_all_enrolledcourses(pagenumber: $pagenumber) {\n      enroll_count\n      success\n      error_msg\n      message {\n        totalCount\n        request_date\n        group_detail {\n          group_name\n          group_id\n          course_id\n          course_name\n        }\n      }\n    }\n  }\n"])));
var getcoursesforcatalogue = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_23 || (templateObject_23 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getcoursesforcatalogue($catalogue_id: String!, $pagenumber: Int!) {\n    getcoursesforcatalogue(\n      catalogue_id: $catalogue_id\n      pagenumber: $pagenumber\n    ) {\n      success\n      total_count\n      error_msg\n      message {\n        course_id\n        course_name\n        course_description\n        short_description\n        course_img_url\n      }\n    }\n  }\n"], ["\n  query getcoursesforcatalogue($catalogue_id: String!, $pagenumber: Int!) {\n    getcoursesforcatalogue(\n      catalogue_id: $catalogue_id\n      pagenumber: $pagenumber\n    ) {\n      success\n      total_count\n      error_msg\n      message {\n        course_id\n        course_name\n        course_description\n        short_description\n        course_img_url\n      }\n    }\n  }\n"])));
var getAdminOverview = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_24 || (templateObject_24 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getAdminOverview($days: Int, $user_id: String) {\n    getAdminOverview(days: $days, user_id: $user_id) {\n      success\n      error_msg\n      message {\n        totalLearnerPecTill {\n          IncDecPec\n          valueIncDecPec\n        }\n        PublishCourse\n        DraftCourse\n        TotalCourse\n        newReg\n        allEnrollement\n        enrollPending\n        enrollRejected\n        enrollmentApprove\n        perDays {\n          _id\n          count\n        }\n        TotalActiveInActiveLearner {\n          Active\n          InActive\n        }\n        totalLearTillCurrent\n        availableCoursePec {\n          IncDecPec\n          valueIncDecPec\n        }\n        totalEnrollPec {\n          IncDecPec\n          valueIncDecPec\n        }\n        totalLearnerPec {\n          IncDecPec\n          valueIncDecPec\n        }\n      }\n    }\n  }\n"], ["\n  query getAdminOverview($days: Int, $user_id: String) {\n    getAdminOverview(days: $days, user_id: $user_id) {\n      success\n      error_msg\n      message {\n        totalLearnerPecTill {\n          IncDecPec\n          valueIncDecPec\n        }\n        PublishCourse\n        DraftCourse\n        TotalCourse\n        newReg\n        allEnrollement\n        enrollPending\n        enrollRejected\n        enrollmentApprove\n        perDays {\n          _id\n          count\n        }\n        TotalActiveInActiveLearner {\n          Active\n          InActive\n        }\n        totalLearTillCurrent\n        availableCoursePec {\n          IncDecPec\n          valueIncDecPec\n        }\n        totalEnrollPec {\n          IncDecPec\n          valueIncDecPec\n        }\n        totalLearnerPec {\n          IncDecPec\n          valueIncDecPec\n        }\n      }\n    }\n  }\n"])));
var getAdmindashboardCoursetab = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_25 || (templateObject_25 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getAdmindashboardCoursetab {\n    getAdmindashboardCoursetab {\n      success\n      error_msg\n      message {\n        allLast30daysCourses {\n          course_name\n          super_sub_category_id {\n            super_sub_category_name\n          }\n          category_id {\n            category_name\n          }\n          parent_sub_category_id {\n            sub_category_name\n          }\n        }\n        availableCoursePec30Pec {\n          IncDecPec\n          valueIncDecPec\n        }\n\n        TotalCourse\n        perMonth\n        TotalCategoryCount\n        availableCoursePec {\n          IncDecPec\n          valueIncDecPec\n        }\n        totalCategoryPec {\n          IncDecPec\n          valueIncDecPec\n        }\n      }\n    }\n  }\n"], ["\n  query getAdmindashboardCoursetab {\n    getAdmindashboardCoursetab {\n      success\n      error_msg\n      message {\n        allLast30daysCourses {\n          course_name\n          super_sub_category_id {\n            super_sub_category_name\n          }\n          category_id {\n            category_name\n          }\n          parent_sub_category_id {\n            sub_category_name\n          }\n        }\n        availableCoursePec30Pec {\n          IncDecPec\n          valueIncDecPec\n        }\n\n        TotalCourse\n        perMonth\n        TotalCategoryCount\n        availableCoursePec {\n          IncDecPec\n          valueIncDecPec\n        }\n        totalCategoryPec {\n          IncDecPec\n          valueIncDecPec\n        }\n      }\n    }\n  }\n"])));
// getting user per week in dashboard learners tab
var getUsersInWeeks = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_26 || (templateObject_26 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getUsersInWeeks($weeks: Int) {\n    getUsersInWeeks(weeks: $weeks) {\n      success\n      message {\n        total_Users {\n          _id\n          count\n        }\n        active_Users {\n          _id\n          count\n        }\n      }\n    }\n  }\n"], ["\n  query getUsersInWeeks($weeks: Int) {\n    getUsersInWeeks(weeks: $weeks) {\n      success\n      message {\n        total_Users {\n          _id\n          count\n        }\n        active_Users {\n          _id\n          count\n        }\n      }\n    }\n  }\n"])));
// getting login user for dashboard
var getLoginsPerDay = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_27 || (templateObject_27 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getLoginsPerDay($days: Int) {\n    getLoginsPerDay(days: $days) {\n      success\n      message {\n        _id\n        count\n      }\n    }\n  }\n"], ["\n  query getLoginsPerDay($days: Int) {\n    getLoginsPerDay(days: $days) {\n      success\n      message {\n        _id\n        count\n      }\n    }\n  }\n"])));
var getLeranertabCount = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_28 || (templateObject_28 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getLeranertabCount {\n    getLeranertabCount {\n      success\n      message {\n        subscribeUser\n        today_login_count\n        total_user_group_count\n        user_group_diff\n        login_percentage {\n          IncDecPec\n          valueIncDecPec\n        }\n        userGrpPec {\n          IncDecPec\n          valueIncDecPec\n        }\n        subscribeUser_percentage {\n          IncDecPec\n          valueIncDecPec\n        }\n      }\n    }\n  }\n"], ["\n  query getLeranertabCount {\n    getLeranertabCount {\n      success\n      message {\n        subscribeUser\n        today_login_count\n        total_user_group_count\n        user_group_diff\n        login_percentage {\n          IncDecPec\n          valueIncDecPec\n        }\n        userGrpPec {\n          IncDecPec\n          valueIncDecPec\n        }\n        subscribeUser_percentage {\n          IncDecPec\n          valueIncDecPec\n        }\n      }\n    }\n  }\n"])));
// getting active and inactive users  for dashboard
var getActiveinactiveCount = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_29 || (templateObject_29 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getActiveinactiveCount($days: Int) {\n    getActiveinactiveCount(days: $days) {\n      success\n      message {\n        EnrolledActive\n        EnrolledInActive\n        InActiveUser {\n          _id\n          count\n        }\n        ActiveUser {\n          _id\n          count\n        }\n      }\n    }\n  }\n"], ["\n  query getActiveinactiveCount($days: Int) {\n    getActiveinactiveCount(days: $days) {\n      success\n      message {\n        EnrolledActive\n        EnrolledInActive\n        InActiveUser {\n          _id\n          count\n        }\n        ActiveUser {\n          _id\n          count\n        }\n      }\n    }\n  }\n"])));
// getting Professional Student  users  for dashboard
var getProfessionalStudent = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_30 || (templateObject_30 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getProfessionalStudent($days: Int) {\n    getProfessionalStudent(days: $days) {\n      success\n      message {\n        student {\n          _id\n          count\n        }\n        professional {\n          _id\n          count\n        }\n      }\n    }\n  }\n"], ["\n  query getProfessionalStudent($days: Int) {\n    getProfessionalStudent(days: $days) {\n      success\n      message {\n        student {\n          _id\n          count\n        }\n        professional {\n          _id\n          count\n        }\n      }\n    }\n  }\n"])));
var getCoursesChart = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_31 || (templateObject_31 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getCoursesChart {\n    getCoursesChart {\n      success\n      error_msg\n      data {\n        _id\n        main_cat {\n          _id\n          category_id\n          category_name\n          level\n          main_cat_course_count\n        }\n        sub_cat {\n          _id\n          sub_category_id\n          sub_category_name\n          level\n          sub_cat_course_count\n        }\n        sub_sub_cat {\n          _id\n          super_sub_category_id\n          level\n          sub_sub_cat_course_count\n        }\n      }\n    }\n  }\n"], ["\n  query getCoursesChart {\n    getCoursesChart {\n      success\n      error_msg\n      data {\n        _id\n        main_cat {\n          _id\n          category_id\n          category_name\n          level\n          main_cat_course_count\n        }\n        sub_cat {\n          _id\n          sub_category_id\n          sub_category_name\n          level\n          sub_cat_course_count\n        }\n        sub_sub_cat {\n          _id\n          super_sub_category_id\n          level\n          sub_sub_cat_course_count\n        }\n      }\n    }\n  }\n"])));
// getting enrolled and free course category and sub-category for admin dashboard
var enrolledCourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_32 || (templateObject_32 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query enrolledCourse($days: Int) {\n    enrolledCourse(days: $days) {\n      success\n      enrollcourse\n      freecourse\n      message {\n        count\n        category_id {\n          category_name\n        }\n        parent_sub_category_id {\n          sub_category_name\n        }\n        super_sub_category_id {\n          super_sub_category_name\n        }\n        course {\n          course_name\n        }\n      }\n    }\n  }\n"], ["\n  query enrolledCourse($days: Int) {\n    enrolledCourse(days: $days) {\n      success\n      enrollcourse\n      freecourse\n      message {\n        count\n        category_id {\n          category_name\n        }\n        parent_sub_category_id {\n          sub_category_name\n        }\n        super_sub_category_id {\n          super_sub_category_name\n        }\n        course {\n          course_name\n        }\n      }\n    }\n  }\n"])));
var getgroupbyid = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_33 || (templateObject_33 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getgroupbyid($group_id: String!) {\n    getgroupbyid(group_id: $group_id) {\n      success\n      error_msg\n      message {\n        _id\n        group_name\n        group_type\n        parent_group_id\n        hierarchy_id\n        admin_id\n        created_on\n        updated_on\n        created_by\n        is_active\n        group_id\n        catalogue_mapping_details {\n          _id\n          admin_id\n          catalogue_id\n          created_on\n          updated_on\n          created_by\n          is_active\n          group_id\n          catalogue_details {\n            _id\n            catalogue_name\n            catalogue_description\n            creator_id\n            catalogue_id\n            created_on\n            updated_on\n            created_by\n            is_active\n          }\n          category_id\n        }\n      }\n    }\n  }\n"], ["\n  query getgroupbyid($group_id: String!) {\n    getgroupbyid(group_id: $group_id) {\n      success\n      error_msg\n      message {\n        _id\n        group_name\n        group_type\n        parent_group_id\n        hierarchy_id\n        admin_id\n        created_on\n        updated_on\n        created_by\n        is_active\n        group_id\n        catalogue_mapping_details {\n          _id\n          admin_id\n          catalogue_id\n          created_on\n          updated_on\n          created_by\n          is_active\n          group_id\n          catalogue_details {\n            _id\n            catalogue_name\n            catalogue_description\n            creator_id\n            catalogue_id\n            created_on\n            updated_on\n            created_by\n            is_active\n          }\n          category_id\n        }\n      }\n    }\n  }\n"])));
// getting top 5 course filter data
var getTopfiveDashboardType = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_34 || (templateObject_34 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getTopfiveDashboardType($type: String) {\n    getTopfiveDashboardType(type: $type) {\n      success\n      error_msg\n      data {\n        course_name\n        short_description\n      }\n    }\n  }\n"], ["\n  query getTopfiveDashboardType($type: String) {\n    getTopfiveDashboardType(type: $type) {\n      success\n      error_msg\n      data {\n        course_name\n        short_description\n      }\n    }\n  }\n"])));
var getadminexportauditlog = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_35 || (templateObject_35 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_admin_export_auditlog($from_date: String!, $to_date: String!) {\n    get_admin_export_auditlog(from_date: $from_date, to_date: $to_date) {\n      success\n      error_msg\n      message\n    }\n  }\n"], ["\n  query get_admin_export_auditlog($from_date: String!, $to_date: String!) {\n    get_admin_export_auditlog(from_date: $from_date, to_date: $to_date) {\n      success\n      error_msg\n      message\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./not-found/not-found.component */ "./src/app/not-found/not-found.component.ts");




var routes = [
    {
        path: '',
        loadChildren: './learner/learner.module#LearnerModule',
        data: { title: 'Welcome to EduTech' }
    },
    {
        path: 'Learner',
        loadChildren: './learner/learner.module#LearnerModule',
        data: { animation: 'Learner' }
    },
    // {
    //   path: 'Admin',
    //   loadChildren: './admin/admin.module#AdminModule',
    //   data : {title: 'Admin '}
    // },
    {
        path: 'Player',
        loadChildren: './core/core.module#CoreModule',
        data: { title: 'Player' }
    },
    // {
    //   path: '*',
    //   // loadChildren: './wca/wca.module#WcaModule',
    //   data : {title: 'Web Content Authoring'}
    // },
    { path: '**', component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_3__["NotFoundComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, {
                    scrollPositionRestoration: 'enabled',
                    initialNavigation: 'enabled',
                })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<!-- <ngx-spinner bdColor=\"rgba(51,51,51,0.8)\" size=\"medium\" color=\"#fff\" type=\"ball-climbing-dot\">\n    <p style=\"font-size: 20px; color: white\">Loading...</p> -->\n  <!-- </ngx-spinner> -->\n\n  <div [@routeAnimations]=\"o && o.activatedRouteData \n      && o.activatedRouteData['animation']\">\n    <router-outlet #o=\"outlet\"></router-outlet>\n</div>\n<!-- <router-outlet></router-outlet> -->\n<!-- <ng4-loading-spinner> </ng4-loading-spinner> -->\n\n<!-- <div fxLayout=\"row\" fxLayoutAlign=\"space-around center\" *ngIf=\"isLoader\">\n  <mat-spinner diameter=\"50\" strokeWidth=\"5\"></mat-spinner>\n</div> -->\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-loading .logo {\n  width: -webkit-fill-available !important;\n  height: -webkit-fill-available !important;\n  display: contents; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2F2aW5hc2gvRG9jdW1lbnRzL2NpbnRhbmEvbHhwIHByb2plY3QvV2ViJTIwUG9ydGFsL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksd0NBQXdDO0VBQ3hDLHlDQUF5QztFQUN6QyxpQkFBaUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAtbG9hZGluZyAubG9nbyB7XG4gICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGUgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IC13ZWJraXQtZmlsbC1hdmFpbGFibGUgIWltcG9ydGFudDtcbiAgICBkaXNwbGF5OiBjb250ZW50cztcbiAgICBcbiAgfVxuICAiXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_services_handlers_global_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ././core/services/handlers/global-service.service */ "./src/app/core/services/handlers/global-service.service.ts");
/* harmony import */ var _app_wca_services_wca_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app/wca/services/wca.service */ "./src/app/wca/services/wca.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_services_common_services_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/services/common-services.service */ "./src/app/core/services/common-services.service.ts");
/* harmony import */ var _router_animation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./router.animation */ "./src/app/router.animation.ts");
/* harmony import */ var _learner_services_learner_services_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @learner/services/learner-services.service */ "./src/app/learner/services/learner-services.service.ts");











var AppComponent = /** @class */ (function () {
    function AppComponent(router, gs, http, activatedRoute, APIService, titleService, commonService, Lservice) {
        this.router = router;
        this.gs = gs;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.APIService = APIService;
        this.titleService = titleService;
        this.commonService = commonService;
        this.Lservice = Lservice;
        // ipAddress = '';
        this.title = 'LXP';
        this.isLoader = false;
        // this.getIPAddress();
        this.commonService.getIpAddressByUrl();
        // this.getorganizationbyiddetails();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loaderSubscription = this.commonService.loader.subscribe(function (val) {
            _this.isLoader = val;
        });
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]; })).subscribe(function () {
            var rt = _this.getChild(_this.activatedRoute);
            rt.data.subscribe(function (data) {
                _this.titleService.setTitle(data.title);
            });
        });
        this.getIPAddress();
        // var name = localStorage.getItem('uname') ? localStorage.getItem('uname') : null;
        // var psd = localStorage.getItem('ps') ? localStorage.getItem('ps') : null;
        // var login = localStorage.getItem('login') ? localStorage.getItem('login') : null;
        // var cookie = localStorage.getItem('remember_me') ? localStorage.getItem('remember_me') : 'false';
        // var ps = atob(psd)
        // if (login == 'true') {
        //   if (cookie == 'true') {
        //     if ((name || psd) == null) {
        //       this.router.navigate(["/Learner/login"]);
        //     }
        //   } else {
        //     // Commented by rajesh because whenever i will reload the page it clearing my localstorage
        //     // Yeah Rajesh, u need to enable remember me for this - Mythreyi
        //     //  If i am first time register i don't have remember me its giving lot of problem  :: ankit
        //     //  I think now the issue will get resolved - Mythreyi
        //     localStorage.clear();
        //   }
        // }
    };
    AppComponent.prototype.getChild = function (activatedRoute) {
        if (activatedRoute.firstChild) {
            return this.getChild(activatedRoute.firstChild);
        }
        else {
            return activatedRoute;
        }
    };
    AppComponent.prototype.getIPAddress = function () {
        // this.http.get(this.commonService.getIpAddressByUrl()).subscribe((res: any) => {
        //   this.ipAddress = res.ip;
        //   localStorage.setItem('Systemip', this.ipAddress ? this.ipAddress : '' );
        // });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.loaderSubscription.unsubscribe();
    };
    AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            animations: [_router_animation__WEBPACK_IMPORTED_MODULE_9__["slideInAnimation"]],
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _core_services_handlers_global_service_service__WEBPACK_IMPORTED_MODULE_4__["GlobalServiceService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _app_wca_services_wca_service__WEBPACK_IMPORTED_MODULE_5__["WcaService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["Title"],
            _core_services_common_services_service__WEBPACK_IMPORTED_MODULE_8__["CommonServicesService"],
            _learner_services_learner_services_service__WEBPACK_IMPORTED_MODULE_10__["LearnerServicesService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: getBaseHref, AppModule, appInitializerFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseHref", function() { return getBaseHref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appInitializerFactory", function() { return appInitializerFactory; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng4-loading-spinner */ "./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ng5_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng5-slider */ "./node_modules/ng5-slider/esm5/ng5-slider.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _core_material_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/material.module */ "./src/app/core/material.module.ts");
/* harmony import */ var _graphql_graphql_modules__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./graphql/graphql.modules */ "./src/app/graphql/graphql.modules.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _core_shared_alert_component_alert_component_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @core/shared/alert-component/alert-component.component */ "./src/app/core/shared/alert-component/alert-component.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm5/drag-drop.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_services_helpers__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @core/services/_helpers */ "./src/app/core/services/_helpers/index.ts");
/* harmony import */ var ng2_pdfjs_viewer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng2-pdfjs-viewer */ "./node_modules/ng2-pdfjs-viewer/index.js");
/* harmony import */ var _core_services_configs_loader_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @core/services/configs-loader.service */ "./src/app/core/services/configs-loader.service.ts");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./not-found/not-found.component */ "./src/app/not-found/not-found.component.ts");

// angular




// others






// local





// import { DialogComponent } from './wca/pages/dialog/dialog.component';








// import { ChartsModule } from 'ng2-charts';
// import { JwtInterceptor } from './core/services/_helpers/jwt.interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
function getBaseHref(platformLocation) {
    return platformLocation.getBaseHrefFromDOM();
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"],
                _core_shared_alert_component_alert_component_component__WEBPACK_IMPORTED_MODULE_14__["AlertComponentComponent"],
                // DialogComponent,
                _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_21__["NotFoundComponent"],
            ],
            imports: [
                ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_5__["Ng4LoadingSpinnerModule"].forRoot(),
                _core_material_module__WEBPACK_IMPORTED_MODULE_10__["MaterialModule"],
                // ChartsModule,
                _graphql_graphql_modules__WEBPACK_IMPORTED_MODULE_11__["GraphqlModule"],
                _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_16__["DragDropModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                ng5_slider__WEBPACK_IMPORTED_MODULE_6__["Ng5SliderModule"],
                ng2_pdfjs_viewer__WEBPACK_IMPORTED_MODULE_19__["PdfJsViewerModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrModule"].forRoot({
                    timeOut: 4000,
                    positionClass: 'toast-top-right',
                    maxOpened: 1,
                    preventDuplicates: true,
                    autoDismiss: true
                }),
                ngx_spinner__WEBPACK_IMPORTED_MODULE_8__["NgxSpinnerModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_12__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _graphql_graphql_modules__WEBPACK_IMPORTED_MODULE_11__["GraphqlModule"]
            ],
            providers: [_core_shared_alert_component_alert_component_component__WEBPACK_IMPORTED_MODULE_14__["AlertComponentComponent"],
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_3__["APP_BASE_HREF"],
                    useFactory: getBaseHref,
                    deps: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["PlatformLocation"], _core_services_configs_loader_service__WEBPACK_IMPORTED_MODULE_20__["ConfigsLoaderService"]]
                },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_15__["MAT_DIALOG_DEFAULT_OPTIONS"], useValue: { hasBackdrop: true } },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_15__["MAT_TABS_CONFIG"], useValue: { animationDuration: '0ms' } },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_17__["HTTP_INTERCEPTORS"], useClass: _core_services_helpers__WEBPACK_IMPORTED_MODULE_18__["ErrorInterceptor"], multi: true }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_ELEMENTS_SCHEMA"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["NO_ERRORS_SCHEMA"]],
            entryComponents: [_core_shared_alert_component_alert_component_component__WEBPACK_IMPORTED_MODULE_14__["AlertComponentComponent"]]
        })
    ], AppModule);
    return AppModule;
}());

function appInitializerFactory(configsLoaderService) {
    return function () { return configsLoaderService.loadConfigs(); };
}


/***/ }),

/***/ "./src/app/core/material.module.ts":
/*!*****************************************!*\
  !*** ./src/app/core/material.module.ts ***!
  \*****************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");




var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTreeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonToggleModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTreeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonToggleModule"]
            ],
            providers: [
                {
                    provide: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
                    useValue: {}
                },
            ],
            declarations: []
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/core/services/_helpers/auth.guard.ts":
/*!******************************************************!*\
  !*** ./src/app/core/services/_helpers/auth.guard.ts ***!
  \******************************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _handlers_alert_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../handlers/alert-service.service */ "./src/app/core/services/handlers/alert-service.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");





var AuthGuard = /** @class */ (function () {
    function AuthGuard(toastr, alert, router) {
        this.toastr = toastr;
        this.alert = alert;
        this.router = router;
    }
    // Added by Mythreyi
    AuthGuard.prototype.canActivate = function (route, state) {
        var userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
        // const role = localStorage.getItem('role') || sessionStorage.getItem('role') || null;
        // console.log('role-----',role)
        // for learner ------> 1
        // debugger
        var adminUrl = state.url.includes('Admin');
        var learnerUrl = state.url.includes('Learner');
        if (userDetailes != null) {
            // userdetail is present // authenticated user
            // url should not start from admin - can be /Larner or anything
            // if profile updated and trying to go login/reg
            if (state.url === '/Learner' || state.url === '/Learner/login' || state.url === '/Learner/register'
                || state.url === '/Learner/otp' || state.url === '/Learner/recover'
                || state.url === '/Learner/password' || state.url === '/Learner/recoverotp'
                || state.url === '/Learner/resetpassword' || state.url === '/Learner/terms' || state.url === '/' || adminUrl) {
                this.router.navigate(['/Learner/MyCourse']);
                return false;
            }
            else if (!userDetailes.is_profile_updated) {
                // if profile not updated and trying to access other screens, redirect to profile 
                //Iggnite Changes done by Afser on Profile update not Mandtory
                // if (state.url !== '/Learner/profile') {
                //   this.router.navigate(['/Learner/profile']);
                //   this.toastr.warning('Your profile is incomplete !', 'Please provide data for all mandatory fields', { closeButton: true });
                //   // this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details');
                //   return false;
                // } else {// if url is profile or anything
                //   return true;
                // }
                return true;
            }
            else {
                return true;
            }
            // end of url navigations for logged in learner ------> 1
        }
        else if ((userDetailes == null)) { // user detail is not present in local storage
            if (state.url === '/Learner' || state.url === '/Learner/login' || state.url === '/Learner/register'
                || state.url === '/Learner/otp' || state.url === '/Learner/recover'
                || state.url === '/Learner/password' || state.url === '/Learner/recoverotp'
                || state.url === '/Learner/resetpassword' || state.url === '/Learner/terms' || state.url === '/') {
                return true;
            }
            else {
                this.router.navigate(['/Learner']);
                return false;
            }
        }
        else {
            // console.log('role--33334444---',role)
            this.router.navigate(['/Learner']);
            return false;
        }
    };
    AuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _handlers_alert_service_service__WEBPACK_IMPORTED_MODULE_3__["AlertServiceService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/core/services/_helpers/error.interceptor.ts":
/*!*************************************************************!*\
  !*** ./src/app/core/services/_helpers/error.interceptor.ts ***!
  \*************************************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _common_services_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common-services.service */ "./src/app/core/services/common-services.service.ts");





var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(CommonService) {
        this.CommonService = CommonService;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        this.showLoader();
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]) {
                _this.onEnd();
            }
        }, function (err) {
            _this.onEnd();
        }));
    };
    ErrorInterceptor.prototype.onEnd = function () {
        this.hideLoader();
    };
    ErrorInterceptor.prototype.showLoader = function () {
        var isLoad = this.CommonService.isLoad;
        this.CommonService.loader$.next(isLoad);
    };
    ErrorInterceptor.prototype.hideLoader = function () {
        this.CommonService.loader$.next(false);
        this.CommonService.isLoad = true;
    };
    ErrorInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_common_services_service__WEBPACK_IMPORTED_MODULE_4__["CommonServicesService"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/core/services/_helpers/index.ts":
/*!*************************************************!*\
  !*** ./src/app/core/services/_helpers/index.ts ***!
  \*************************************************/
/*! exports provided: FakeBackendInterceptor, fakeBackendProvider, AuthGuard, JwtInterceptor, ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mock_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mock-services */ "./src/app/core/services/_helpers/mock-services.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function() { return _mock_services__WEBPACK_IMPORTED_MODULE_0__["FakeBackendInterceptor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fakeBackendProvider", function() { return _mock_services__WEBPACK_IMPORTED_MODULE_0__["fakeBackendProvider"]; });

/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.guard */ "./src/app/core/services/_helpers/auth.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]; });

/* harmony import */ var _jwt_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jwt.interceptor */ "./src/app/core/services/_helpers/jwt.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return _jwt_interceptor__WEBPACK_IMPORTED_MODULE_2__["JwtInterceptor"]; });

/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error.interceptor */ "./src/app/core/services/_helpers/error.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return _error_interceptor__WEBPACK_IMPORTED_MODULE_3__["ErrorInterceptor"]; });







/***/ }),

/***/ "./src/app/core/services/_helpers/jwt.interceptor.ts":
/*!***********************************************************!*\
  !*** ./src/app/core/services/_helpers/jwt.interceptor.ts ***!
  \***********************************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _admin_services_admin_services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../admin/services/admin-services.service */ "./src/app/admin/services/admin-services.service.ts");



// import { AuthenticationService } from '../_services';
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(auth) {
        this.auth = auth;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        // const currentUser = localStorage.getItem('token');
        // console.log(currentUser);
        // let currentUser = this.auth.getToken;
        // if (currentUser && currentUser.token) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser.token}`
        //         }
        //     });
        // }
        return next.handle(request);
    };
    JwtInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_admin_services_admin_services_service__WEBPACK_IMPORTED_MODULE_2__["AdminServicesService"]])
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/app/core/services/_helpers/mock-services.ts":
/*!*********************************************************!*\
  !*** ./src/app/core/services/_helpers/mock-services.ts ***!
  \*********************************************************/
/*! exports provided: FakeBackendInterceptor, fakeBackendProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function() { return FakeBackendInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fakeBackendProvider", function() { return fakeBackendProvider; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





// array in local storage for registered users
var users = JSON.parse(localStorage.getItem('users')) || [];
var FakeBackendInterceptor = /** @class */ (function () {
    function FakeBackendInterceptor() {
    }
    FakeBackendInterceptor.prototype.intercept = function (request, next) {
        var url = request.url, method = request.method, headers = request.headers, body = request.body;
        // debugger
        // wrap in delayed observable to simulate server api call
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(handleRoute))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["materialize"])()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(500))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["dematerialize"])());
        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }
        // route functions
        function authenticate() {
            var username = body.username, password = body.password;
            var user = users.find(function (x) { return x.email === username && x.password === password; });
            if (!user)
                return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: 'fake-jwt-token'
            });
        }
        function register() {
            var user = body;
            if (users.find(function (x) { return x.email === user.email; })) {
                return error('Username "' + user.email + '" is already taken');
            }
            user.id = users.length ? Math.max.apply(Math, users.map(function (x) { return x.id; })) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }
        function getUsers() {
            if (!isLoggedIn())
                return unauthorized();
            return ok(users);
        }
        function deleteUser() {
            if (!isLoggedIn())
                return unauthorized();
            users = users.filter(function (x) { return x.id !== idFromUrl(); });
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }
        // helper functions
        function ok(body) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({ status: 200, body: body }));
        }
        function error(message) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])({ error: { message: message } });
        }
        function unauthorized() {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])({ status: 401, error: { message: 'Unauthorised' } });
        }
        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
        function idFromUrl() {
            var urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    };
    FakeBackendInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], FakeBackendInterceptor);
    return FakeBackendInterceptor;
}());

var fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
    useClass: FakeBackendInterceptor,
    multi: true
};


/***/ }),

/***/ "./src/app/core/services/common-services.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/services/common-services.service.ts ***!
  \**********************************************************/
/*! exports provided: CommonServicesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonServicesService", function() { return CommonServicesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var apollo_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-angular */ "./node_modules/apollo-angular/fesm2015/ngApollo.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
/* harmony import */ var _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/services/operations/common_query */ "./src/app/core/services/operations/common_query.ts");
/* harmony import */ var _core_services_operations_common_mutation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/services/operations/common_mutation */ "./src/app/core/services/operations/common_mutation.ts");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");








var CommonServicesService = /** @class */ (function () {
    function CommonServicesService(Apollo, http) {
        this.Apollo = Apollo;
        this.http = http;
        // Search Component for search all courses
        this.globalSearch$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.globalSearch = this.globalSearch$.asObservable();
        // Global for all courses(Guideline search to Category and View all courses)
        this.globalCourses$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.globalCourses = this.globalCourses$.asObservable();
        // Guideline search to Category for Clear all filter
        this.globalFilterCategory$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.globalFilterCategory = this.globalFilterCategory$.asObservable();
        // Guideline search to Category for removing Category from applied filter
        this.globalCategory$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.globalCategory = this.globalCategory$.asObservable();
        // Category to view all courses component for applying category
        this.globalAllCategory$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.globalAllCategory = this.globalAllCategory$.asObservable();
        // Category to guideline search component
        this.selectedCategory$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.selectedCategory = this.selectedCategory$.asObservable();
        // Category to view all courses component to show category on applied filter
        this.appliedCategory$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.appliedCategory = this.appliedCategory$.asObservable();
        this.loader$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.loader = this.loader$.asObservable();
        this.isLoad = true;
        this.notificationCount$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.notificationCount = this.notificationCount$.asObservable();
        this.notificationStatus$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.notificationStatus = this.notificationStatus$.asObservable();
        this.openAvailCourcePopup$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.openAvailCourcePopup = this.openAvailCourcePopup$.asObservable();
        this.closeAvailPopup$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.closeAvailPopup = this.closeAvailPopup$.asObservable();
        this.openNotification$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.openNotification = this.openNotification$.asObservable();
        // While closing video palyer, pause video in course preview page
        this.pauseVideo$ = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.pauseVideo = this.pauseVideo$.asObservable();
    }
    CommonServicesService.prototype.logout = function (user_id, is_admin) {
        // this.Apollo.getClient().resetStore();
        return this.Apollo.query({
            query: _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__["logout"],
            variables: {
                user_id: user_id,
                is_admin: is_admin
            }
        });
    };
    CommonServicesService.prototype.viewCurseByID = function (course_id, user_id) {
        return this.Apollo.query({
            query: _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__["viewcourse"],
            variables: {
                course_id: course_id,
                user_id: user_id
            }
        });
    };
    CommonServicesService.prototype.viewWishlist = function (userid, pagenumber) {
        return this.Apollo.query({
            query: _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__["view_wishlist"],
            variables: {
                user_id: userid,
                pagenumber: pagenumber
            }
        });
    };
    CommonServicesService.prototype.addWishlist = function (course_id, user_id) {
        return this.Apollo.query({
            query: _core_services_operations_common_mutation__WEBPACK_IMPORTED_MODULE_5__["add_to_wishlist"],
            variables: {
                course_id: course_id,
                user_id: user_id
            }
        });
    };
    CommonServicesService.prototype.removeWishlist = function (wishlist_id) {
        return this.Apollo.query({
            query: _core_services_operations_common_mutation__WEBPACK_IMPORTED_MODULE_5__["delete_wishlist"],
            variables: {
                wishlist_id: wishlist_id,
            }
        });
    };
    CommonServicesService.prototype.list_content = function () {
        return this.Apollo.query({
            query: _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__["list_content"],
        });
    };
    CommonServicesService.prototype.syllabus_of_particular_scorm = function (contentid) {
        return this.Apollo.query({
            query: _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__["syllabus_of_particular_scorm"],
            variables: {
                contentid: contentid,
            }
        });
    };
    CommonServicesService.prototype.getPlayerStatus = function (id) {
        return this.Apollo.query({
            query: _core_services_operations_common_mutation__WEBPACK_IMPORTED_MODULE_5__["getPlayerStatus"],
            variables: {
                user_id: id
            }
        });
    };
    CommonServicesService.prototype.geturl = function (courseid) {
        return this.Apollo.query({
            query: _core_services_operations_common_mutation__WEBPACK_IMPORTED_MODULE_5__["geturl"],
            variables: {
                courseid: courseid
            }
        });
    };
    CommonServicesService.prototype.getCoursesByName = function (courseName, pagenumber) {
        return this.Apollo.query({
            query: _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__["getCoursesByName"],
            variables: {
                courseName: courseName,
                pagenumber: pagenumber
            }
        });
    };
    CommonServicesService.prototype.getallcourses = function (groupid, pagenumber, sort_type) {
        return this.Apollo.query({
            query: _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__["get_all_course_by_usergroup"],
            variables: {
                group_id: groupid,
                pagenumber: pagenumber,
                sort_type: sort_type
            }
        });
    };
    CommonServicesService.prototype.enrollcourse = function (id, group_id, course_id) {
        return this.Apollo.query({
            query: _core_services_operations_common_mutation__WEBPACK_IMPORTED_MODULE_5__["enrollcourse"],
            variables: {
                user_id: id,
                group_id: group_id,
                course_id: course_id,
            }
        });
    };
    CommonServicesService.prototype.postGuildelineSearchData = function (category, sub_category, super_sub_category, course_language, course_mode, author_details, partner_details, pagenumber, perPage, publishedToDate, publishedFromDate) {
        return this.Apollo.query({
            query: _core_services_operations_common_mutation__WEBPACK_IMPORTED_MODULE_5__["getCourseCategorySearch"],
            variables: {
                category: category,
                sub_category: sub_category,
                super_sub_category: super_sub_category,
                course_language: course_language,
                course_mode: course_mode,
                author_details: author_details,
                partner_details: partner_details,
                pagenumber: pagenumber,
                perPage: perPage,
                publishedFromDate: publishedFromDate,
                publishedToDate: publishedToDate
            }
        });
    };
    CommonServicesService.prototype.getGuidelineSearch = function () {
        return this.Apollo.query({
            query: _core_services_operations_common_mutation__WEBPACK_IMPORTED_MODULE_5__["getDetailsCount"]
        });
    };
    CommonServicesService.prototype.getIpAddressByUrl = function () {
        // return 'http://api.ipify.org/?format=json';
        this.http.get(_env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].systemIp).subscribe(function (res) {
            // this.ipAddress = res.ip;
            localStorage.setItem('Systemip', res.ip);
        });
    };
    CommonServicesService.prototype.getAllNotifications = function (userId, userType, pagenumber) {
        return this.Apollo.query({
            query: _core_services_operations_common_query__WEBPACK_IMPORTED_MODULE_4__["getAllNotifications"],
            variables: {
                userId: userId,
                userType: userType,
                pagenumber: pagenumber
            }
        });
    };
    CommonServicesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [apollo_angular__WEBPACK_IMPORTED_MODULE_2__["Apollo"], _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"]])
    ], CommonServicesService);
    return CommonServicesService;
}());



/***/ }),

/***/ "./src/app/core/services/configs-loader.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/core/services/configs-loader.service.ts ***!
  \*********************************************************/
/*! exports provided: ConfigsLoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigsLoaderService", function() { return ConfigsLoaderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var ConfigsLoaderService = /** @class */ (function () {
    function ConfigsLoaderService(handler) {
        this.httpClient = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"](handler);
    }
    Object.defineProperty(ConfigsLoaderService.prototype, "ApiUrl", {
        get: function () {
            return this.configs.apiUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigsLoaderService.prototype, "ScormUrl", {
        get: function () {
            return this.configs.scormUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigsLoaderService.prototype, "ApiUrlImg", {
        get: function () {
            return this.configs.apiUrlImg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigsLoaderService.prototype, "CreateCourseApi", {
        get: function () {
            return this.configs.createCourseApi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigsLoaderService.prototype, "Wcaapiurl", {
        get: function () {
            return this.configs.wcaapiurl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigsLoaderService.prototype, "Domain", {
        get: function () {
            return this.configs.domain;
        },
        enumerable: false,
        configurable: true
    });
    ConfigsLoaderService.prototype.loadConfigs = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.httpClient.get('assets/configs.json').pipe(function (settings) { return settings; })
                        .toPromise()
                        .then(function (settings) {
                        _this.configs = settings;
                    })];
            });
        });
    };
    ConfigsLoaderService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        /**
         * Retreive the values from the configs.json file under the assets
         * directory. At release time, azure pipelines replaces the values
         * in the file based on the variables configured in azure devops.
         *
         * Throughout the app, other services can reference the configs via this
         * service, instead of referecing the environment.ts file so that we can deploy
         * the same artifact to multiple environments without having to build multiple
         * times.
         */
        ,
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpBackend"]])
    ], ConfigsLoaderService);
    return ConfigsLoaderService;
}());



/***/ }),

/***/ "./src/app/core/services/handlers/alert-service.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/core/services/handlers/alert-service.service.ts ***!
  \*****************************************************************/
/*! exports provided: AlertServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertServiceService", function() { return AlertServiceService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _core_shared_alert_component_alert_component_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/shared/alert-component/alert-component.component */ "./src/app/core/shared/alert-component/alert-component.component.ts");




var AlertServiceService = /** @class */ (function () {
    function AlertServiceService(matDialog) {
        this.matDialog = matDialog;
    }
    AlertServiceService.prototype.openAlert = function (title, msg) {
        if (this.matDialog.openDialogs.length === 0) {
            var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogConfig"]();
            dialogConfig.data = { title: title, msg: msg ? msg : null, type: 'showClose' };
            dialogConfig.width = '30%',
                dialogConfig.panelClass = 'custom-modalbox',
                dialogConfig.hasBackdrop = true;
            dialogConfig.disableClose = true;
            var dialogRef = this.matDialog.open(_core_shared_alert_component_alert_component_component__WEBPACK_IMPORTED_MODULE_3__["AlertComponentComponent"], dialogConfig);
        }
    };
    AlertServiceService.prototype.openConfirmAlert = function (title, msg, confirmText, cancelText) {
        if (this.matDialog.openDialogs.length === 0) {
            var dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogConfig"]();
            dialogConfig.data = { title: title, msg: msg ? msg : null, type: 'confirmAlert', confirmText: confirmText ? confirmText : 'Yes',
                cancelText: cancelText ? cancelText : 'No' };
            dialogConfig.width = '30%',
                dialogConfig.disableClose = true;
            dialogConfig.panelClass = 'custom-modalbox';
            var dialogRef_1 = this.matDialog.open(_core_shared_alert_component_alert_component_component__WEBPACK_IMPORTED_MODULE_3__["AlertComponentComponent"], dialogConfig);
            return new Promise(function (resolve) {
                dialogRef_1.afterClosed().subscribe(function (result) {
                    resolve(result);
                });
            });
        }
    };
    AlertServiceService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], AlertServiceService);
    return AlertServiceService;
}());



/***/ }),

/***/ "./src/app/core/services/handlers/global-service.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/core/services/handlers/global-service.service.ts ***!
  \******************************************************************/
/*! exports provided: GlobalServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalServiceService", function() { return GlobalServiceService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_services_handlers_alert_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/handlers/alert-service.service */ "./src/app/core/services/handlers/alert-service.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");






var GlobalServiceService = /** @class */ (function () {
    function GlobalServiceService(route, alert, locationStrategy) {
        this.route = route;
        this.alert = alert;
        this.locationStrategy = locationStrategy;
        this.$theme = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('theme-3-primary');
        this.theme = this.$theme.asObservable();
        this.$callWishlist = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.callWishlist = this.$callWishlist.asObservable();
        this.$adminName = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('admin');
        this.adminName = this.$adminName.asObservable();
        this.$navigation = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('myCourse');
        this.navigation = this.$navigation.asObservable();
    }
    GlobalServiceService.prototype.checkLogout = function () {
        if (this.route.url !== '/' && this.route.url !== '/Learner/login' && this.route.url !== '/Learner' &&
            this.route.url !== '/Admin/login') {
            // const adminDetails = JSON.parse(localStorage.getItem('adminDetails')) || null;
            // const role = localStorage.getItem('role') || sessionStorage.getItem('role') || null;
            var userDetail = JSON.parse(localStorage.getItem('UserDetails')) || JSON.parse(sessionStorage.getItem('UserDetails')) || null;
            // console.log(userDetail);
            if ((userDetail != null && userDetail !== undefined)) {
                return userDetail;
                // } else if ((adminDetails != null || adminDetails !== undefined) && role === 'admin') {
                //   return adminDetails;
            }
            else {
                this.alert.openAlert('Logged Out!', 'You have been logged out. Please login to continue');
                this.route.navigate(['/Learner/login']);
            }
        }
    };
    GlobalServiceService.prototype.checkProfileFilled = function () {
        var userDetail = JSON.parse(localStorage.getItem('UserDetails')) || null;
        if (userDetail && !userDetail.is_profile_updated) {
            //Afser'schanges on Profile not Mandtory change no #3
            // this.route.navigate(['/Learner/profile']);
            // this.alert.openAlert('Your profile is incomplete !', 'Please fill all mandatory details');
            return true;
        }
        else {
            return true;
        }
    };
    GlobalServiceService.prototype.canCallWishlist = function (callWishlist) {
        this.$callWishlist.next(callWishlist);
    };
    GlobalServiceService.prototype.getAdminName = function (name) {
        this.$adminName.next(name);
    };
    GlobalServiceService.prototype.getNavigation = function (navigation) {
        this.$navigation.next(navigation);
    };
    GlobalServiceService.prototype.getThemeName = function (theme) {
        this.$theme.next(theme);
    };
    GlobalServiceService.prototype.preventBackButton = function () {
        history.pushState(null, null, location.href);
        this.locationStrategy.onPopState(function () {
            history.pushState(null, null, location.href);
        });
    };
    GlobalServiceService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _core_services_handlers_alert_service_service__WEBPACK_IMPORTED_MODULE_3__["AlertServiceService"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["LocationStrategy"]])
    ], GlobalServiceService);
    return GlobalServiceService;
}());



/***/ }),

/***/ "./src/app/core/services/operations/common_mutation.ts":
/*!*************************************************************!*\
  !*** ./src/app/core/services/operations/common_mutation.ts ***!
  \*************************************************************/
/*! exports provided: add_to_wishlist, delete_wishlist, getPlayerStatus, geturl, enrollcourse, getCourseCategorySearch, getDetailsCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_to_wishlist", function() { return add_to_wishlist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delete_wishlist", function() { return delete_wishlist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlayerStatus", function() { return getPlayerStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geturl", function() { return geturl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enrollcourse", function() { return enrollcourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCourseCategorySearch", function() { return getCourseCategorySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDetailsCount", function() { return getDetailsCount; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


var add_to_wishlist = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation add_to_wishlist($user_id: String, $course_id: String){\n    add_to_wishlist(user_id: $user_id, course_id: $course_id) {\n      success\n      message\n      error_msg,\n      wishlist_id\n    }\n  }"], ["\nmutation add_to_wishlist($user_id: String, $course_id: String){\n    add_to_wishlist(user_id: $user_id, course_id: $course_id) {\n      success\n      message\n      error_msg,\n      wishlist_id\n    }\n  }"])));
var delete_wishlist = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation delete_wishlist($wishlist_id: String){\n    delete_wishlist(wishlist_id: $wishlist_id) {\n      success\n      message\n      error_msg\n    }\n}"], ["\n  mutation delete_wishlist($wishlist_id: String){\n    delete_wishlist(wishlist_id: $wishlist_id) {\n      success\n      message\n      error_msg\n    }\n}"])));
var getPlayerStatus = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation getPlayerStatus($user_id: String){\n    getPlayerStatus(user_id: $user_id) {\n      message{\n        course_dtl{\n          location\n          status\n        }\n      }\n      success\n    }\n}"], ["\n  mutation getPlayerStatus($user_id: String){\n    getPlayerStatus(user_id: $user_id) {\n      message{\n        course_dtl{\n          location\n          status\n        }\n      }\n      success\n    }\n}"])));
var geturl = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation geturl($courseid: String!) {\n    geturl(courseid: $courseid) {\n      message\n      success\n    }\n  }\n"], ["\nmutation geturl($courseid: String!) {\n    geturl(courseid: $courseid) {\n      message\n      success\n    }\n  }\n"])));
var enrollcourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation enrollcourse($user_id: String!, $group_id:String!, $course_id: String!) {\n    enrollcourse( user_id:$user_id, group_id:$group_id,course_id: $course_id) {\n      message\n      success\n      error_msg\n    }\n  }\n"], ["\nmutation enrollcourse($user_id: String!, $group_id:String!, $course_id: String!) {\n    enrollcourse( user_id:$user_id, group_id:$group_id,course_id: $course_id) {\n      message\n      success\n      error_msg\n    }\n  }\n"])));
var getCourseCategorySearch = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_6 || (templateObject_6 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation getCourseCategorySearch($category: [String]!,$sub_category:[String]!, $super_sub_category: [String]!,\n    $course_language: [String],  $course_mode:[String],$author_details:[String],$partner_details:[String],\n    $pagenumber:Int!,$perPage: Int!, $publishedToDate: String, $publishedFromDate: String ) {\n    getCourseCategorySearch(category:$category,sub_category:$sub_category,super_sub_category:$super_sub_category,\n      course_language:$course_language,course_mode:$course_mode,author_details:$author_details,partner_details:$partner_details,\n      pagenumber:$pagenumber,perPage:$perPage, publishedToDate:$publishedToDate,\n       publishedFromDate:$publishedFromDate\n      ) {\n        success\n        message    \n        data{\n          course_id\n          course_description\n          course_name\n          version\n          location\n          course_start_datetime\n          course_end_datetime\n          advertised_start\n          course_img_url\n          social_sharing_url\n          certificate_display_behaviour\n          certificates_show_before_end\n          certificate_html_view_enabled\n          has_any_active_web_certificate\n          certificate_name\n          lowest_passing_grade\n          mobile_available\n          visible_to_staff_only\n          enrollment_start\n          enrollment_end\n          invitation_only\n          max_student_enrollments_allowed\n          announcement\n          catalog_visibility\n          course_video_url\n          short_description\n          self_paced\n          marketing_url\n          course_language\n          certificate_available_date\n          article_count\n          downloadable_resource_count\n          course_level\n          step_towards\n          rating\n          price\n          what_will_you_learn\n          course_category\n          course_type\n          groupid\n          created_by\n          updated_by\n          admin_id\n          is_published\n          course_mode\n          preview_video\n          learner_count\n          is_active\n          published_by\n          publisher_id\n          updated_by_id\n          user_role\n          user_id\n          user_name\n          published_on\n          updated_at\n          created_at\n          super_sub_category_id\n          pre_requisite\n          takeway_details{\n            text\n            description\n            what_will_you_learn\n            media\n          }\n          coursepartner_details{\n             name\n             image\n          }\n          category_id\n          parent_sub_category_id\n          course_content_details\n          author_details{\n            author_name\n            description\n            image\n          }\n        }\n        languageCount{\n        course_language\n        count\n        }\n        instructor{\n        authordetails\n        count\n        }\n        partner{\n        coursepartnerdetails\n        count\n        }\n        courseMode{\n        course_mode\n        count\n        }    \n  }\n  }\n"], ["\n  mutation getCourseCategorySearch($category: [String]!,$sub_category:[String]!, $super_sub_category: [String]!,\n    $course_language: [String],  $course_mode:[String],$author_details:[String],$partner_details:[String],\n    $pagenumber:Int!,$perPage: Int!, $publishedToDate: String, $publishedFromDate: String ) {\n    getCourseCategorySearch(category:$category,sub_category:$sub_category,super_sub_category:$super_sub_category,\n      course_language:$course_language,course_mode:$course_mode,author_details:$author_details,partner_details:$partner_details,\n      pagenumber:$pagenumber,perPage:$perPage, publishedToDate:$publishedToDate,\n       publishedFromDate:$publishedFromDate\n      ) {\n        success\n        message    \n        data{\n          course_id\n          course_description\n          course_name\n          version\n          location\n          course_start_datetime\n          course_end_datetime\n          advertised_start\n          course_img_url\n          social_sharing_url\n          certificate_display_behaviour\n          certificates_show_before_end\n          certificate_html_view_enabled\n          has_any_active_web_certificate\n          certificate_name\n          lowest_passing_grade\n          mobile_available\n          visible_to_staff_only\n          enrollment_start\n          enrollment_end\n          invitation_only\n          max_student_enrollments_allowed\n          announcement\n          catalog_visibility\n          course_video_url\n          short_description\n          self_paced\n          marketing_url\n          course_language\n          certificate_available_date\n          article_count\n          downloadable_resource_count\n          course_level\n          step_towards\n          rating\n          price\n          what_will_you_learn\n          course_category\n          course_type\n          groupid\n          created_by\n          updated_by\n          admin_id\n          is_published\n          course_mode\n          preview_video\n          learner_count\n          is_active\n          published_by\n          publisher_id\n          updated_by_id\n          user_role\n          user_id\n          user_name\n          published_on\n          updated_at\n          created_at\n          super_sub_category_id\n          pre_requisite\n          takeway_details{\n            text\n            description\n            what_will_you_learn\n            media\n          }\n          coursepartner_details{\n             name\n             image\n          }\n          category_id\n          parent_sub_category_id\n          course_content_details\n          author_details{\n            author_name\n            description\n            image\n          }\n        }\n        languageCount{\n        course_language\n        count\n        }\n        instructor{\n        authordetails\n        count\n        }\n        partner{\n        coursepartnerdetails\n        count\n        }\n        courseMode{\n        course_mode\n        count\n        }    \n  }\n  }\n"])));
var getDetailsCount = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_7 || (templateObject_7 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    query getDetailsCount{\n      getDetailsCount {\n        success\n         error_msg\n        message{\n          course_data{\n            course_language\n            count\n          }\n      author_data{\n        authordetails\n        count\n      }\n      coursepartner_data{\n        coursepartnerdetails\n        count\n      }\n      coursemode_data{\n        course_mode\n        count\n      }\n      other_data{\n        fieldCount\n        affectedRows\n        insertId\n        serverStatus\n        warningCount\n        message\n        protocol41\n        changedRows\n      }\n    }\n      }\n  }"], ["\n    query getDetailsCount{\n      getDetailsCount {\n        success\n         error_msg\n        message{\n          course_data{\n            course_language\n            count\n          }\n      author_data{\n        authordetails\n        count\n      }\n      coursepartner_data{\n        coursepartnerdetails\n        count\n      }\n      coursemode_data{\n        course_mode\n        count\n      }\n      other_data{\n        fieldCount\n        affectedRows\n        insertId\n        serverStatus\n        warningCount\n        message\n        protocol41\n        changedRows\n      }\n    }\n      }\n  }"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;


/***/ }),

/***/ "./src/app/core/services/operations/common_query.ts":
/*!**********************************************************!*\
  !*** ./src/app/core/services/operations/common_query.ts ***!
  \**********************************************************/
/*! exports provided: logout, getAllNotifications, viewcourse, view_wishlist, list_content, syllabus_of_particular_scorm, getCoursesByName, get_all_course_by_usergroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllNotifications", function() { return getAllNotifications; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewcourse", function() { return viewcourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "view_wishlist", function() { return view_wishlist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "list_content", function() { return list_content; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syllabus_of_particular_scorm", function() { return syllabus_of_particular_scorm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoursesByName", function() { return getCoursesByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_all_course_by_usergroup", function() { return get_all_course_by_usergroup; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


var logout = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query logout($user_id: String, $is_admin: Boolean){\n    logout(user_id: $user_id, is_admin: $is_admin) {\n      success\n      message\n      error_msg\n    }\n  }"], ["\n  query logout($user_id: String, $is_admin: Boolean){\n    logout(user_id: $user_id, is_admin: $is_admin) {\n      success\n      message\n      error_msg\n    }\n  }"])));
var getAllNotifications = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getAllNotifications($userId: String!, $userType: String, $pagenumber:Int!) {\n    getAllNotifications(userId: $userId, userType: $userType, pagenumber: $pagenumber) {\n    message\n    success\n    unReadCount\n    totalCount\n    data {\n      _id\n      userObjId\n      userId\n      notificationType\n      notificationMessage\n      created_on\n      updated_on\n      timeAgo\n      notifiedStatus\n      is_active\n    }\n    }\n    }\n    "], ["\n  query getAllNotifications($userId: String!, $userType: String, $pagenumber:Int!) {\n    getAllNotifications(userId: $userId, userType: $userType, pagenumber: $pagenumber) {\n    message\n    success\n    unReadCount\n    totalCount\n    data {\n      _id\n      userObjId\n      userId\n      notificationType\n      notificationMessage\n      created_on\n      updated_on\n      timeAgo\n      notifiedStatus\n      is_active\n    }\n    }\n    }\n    "])));
var viewcourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query viewcourse($course_id: String,$user_id: String){\n    viewcourse(course_id: $course_id,user_id:$user_id) {\n      success\n      error_msg\n      message{\n        totalLearners\n        course_enrollment_status\n        course_id\n        course_description\n        course_long_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        groupid\n        created_by\n        updated_by\n        admin_id\n        is_published\n        course_mode\n        preview_video\n        learner_count\n        is_active\n        published_by\n        publisher_id\n        updated_by_id\n        published_on\n        user_role\n        user_id\n        user_name\n       topicData{\n          moduleData{\n          moduleid\n          modulename\n          modulestatus\n          moduledetails{\n          topicname\n          topicstatus\n          topictime\n          }\n          }\n          }\n        people_also_viewed{\n          course_id\n          course_description\n          course_name\n          created_at\n          updated_at\n          version\n          location\n          course_start_datetime\n          course_end_datetime\n          advertised_start\n          course_img_url\n          social_sharing_url\n          certificate_display_behaviour\n          certificates_show_before_end\n          certificate_html_view_enabled\n          has_any_active_web_certificate\n          certificate_name\n          lowest_passing_grade\n          mobile_available\n          visible_to_staff_only\n          enrollment_start\n          enrollment_end\n          invitation_only\n          max_student_enrollments_allowed\n          announcement\n          catalog_visibility\n          course_video_url\n          short_description\n          self_paced\n          marketing_url\n          course_language\n          certificate_available_date\n          article_count\n          downloadable_resource_count\n          course_level\n          step_towards\n          rating\n          price\n          what_will_you_learn\n          course_category\n          course_type\n          groupid\n          created_by\n          updated_by\n          admin_id\n          is_published\n          course_mode\n          preview_video\n          learner_count\n          is_active\n          published_by\n          publisher_id\n          updated_by_id\n          published_on\n          user_role\n          user_id\n          user_name\n          pre_requisite{\n            name\n            image\n          }\n          takeway_details{\n            text\n            description\n            what_will_you_learn\n            media\n          }\n          coursepartner_details{\n            name\n            image\n          }\n          category_id\n          parent_sub_category_id\n          course_content_details{\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content{\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n            unit{\n              name\n              type\n              is_active\n              parent_id\n              description\n              sub_section_id\n              file_content{\n                video_url\n                image_url\n                audio_url\n                file_url\n              }\n            }\n          }\n          author_details{\n            author_name\n            description\n            image\n          }\n        }\n        frequently_bought_together{\n          course_id\n          course_description\n          course_name\n          created_at\n          updated_at\n          version\n          location\n          course_start_datetime\n          course_end_datetime\n          advertised_start\n          course_img_url\n          social_sharing_url\n          certificate_display_behaviour\n          certificates_show_before_end\n          certificate_html_view_enabled\n          has_any_active_web_certificate\n          certificate_name\n          lowest_passing_grade\n          mobile_available\n          visible_to_staff_only\n          enrollment_start\n          enrollment_end\n          invitation_only\n          max_student_enrollments_allowed\n          announcement\n          catalog_visibility\n          course_video_url\n          short_description\n          self_paced\n          marketing_url\n          course_language\n          certificate_available_date\n          article_count\n          downloadable_resource_count\n          course_level\n          step_towards\n          rating\n          price\n          what_will_you_learn\n          course_category\n          course_type\n          groupid\n          created_by\n          updated_by\n          admin_id\n          is_published\n          course_mode\n          preview_video\n          learner_count\n          is_active\n          published_by\n          publisher_id\n          updated_by_id\n          published_on\n          user_role\n          user_id\n          user_name\n          pre_requisite{\n            name\n            image\n          }\n          takeway_details{\n            text\n            description\n            what_will_you_learn\n            media\n          }\n          coursepartner_details{\n            name\n            image\n          }\n          category_id\n          parent_sub_category_id\n          course_content_details{\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content{\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n            unit{\n              name\n              type\n              is_active\n              parent_id\n              description\n              sub_section_id\n              file_content{\n                video_url\n                image_url\n                audio_url\n                file_url\n              }\n            }\n          }\n          author_details{\n            author_name\n            description\n            image\n          }\n        }\n        review_and_faq{\n          _id\n          user_id\n          user_name\n          course_id\n          rating\n          review\n          created_on\n          updated_on\n          is_active\n          faq{\n            _id\n            course_id\n            is_active\n            qa{\n              question\n              answer\n            }\n          }\n        }\n        pre_requisite{\n          name\n          image\n        }\n        takeway_details{\n          text\n          description\n          what_will_you_learn\n          media\n        }\n        coursepartner_details{\n          name\n          image\n        }\n        category_id\n        parent_sub_category_id\n        course_content_details{\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content{\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit{\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content{\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details{\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }"], ["\n  query viewcourse($course_id: String,$user_id: String){\n    viewcourse(course_id: $course_id,user_id:$user_id) {\n      success\n      error_msg\n      message{\n        totalLearners\n        course_enrollment_status\n        course_id\n        course_description\n        course_long_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        groupid\n        created_by\n        updated_by\n        admin_id\n        is_published\n        course_mode\n        preview_video\n        learner_count\n        is_active\n        published_by\n        publisher_id\n        updated_by_id\n        published_on\n        user_role\n        user_id\n        user_name\n       topicData{\n          moduleData{\n          moduleid\n          modulename\n          modulestatus\n          moduledetails{\n          topicname\n          topicstatus\n          topictime\n          }\n          }\n          }\n        people_also_viewed{\n          course_id\n          course_description\n          course_name\n          created_at\n          updated_at\n          version\n          location\n          course_start_datetime\n          course_end_datetime\n          advertised_start\n          course_img_url\n          social_sharing_url\n          certificate_display_behaviour\n          certificates_show_before_end\n          certificate_html_view_enabled\n          has_any_active_web_certificate\n          certificate_name\n          lowest_passing_grade\n          mobile_available\n          visible_to_staff_only\n          enrollment_start\n          enrollment_end\n          invitation_only\n          max_student_enrollments_allowed\n          announcement\n          catalog_visibility\n          course_video_url\n          short_description\n          self_paced\n          marketing_url\n          course_language\n          certificate_available_date\n          article_count\n          downloadable_resource_count\n          course_level\n          step_towards\n          rating\n          price\n          what_will_you_learn\n          course_category\n          course_type\n          groupid\n          created_by\n          updated_by\n          admin_id\n          is_published\n          course_mode\n          preview_video\n          learner_count\n          is_active\n          published_by\n          publisher_id\n          updated_by_id\n          published_on\n          user_role\n          user_id\n          user_name\n          pre_requisite{\n            name\n            image\n          }\n          takeway_details{\n            text\n            description\n            what_will_you_learn\n            media\n          }\n          coursepartner_details{\n            name\n            image\n          }\n          category_id\n          parent_sub_category_id\n          course_content_details{\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content{\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n            unit{\n              name\n              type\n              is_active\n              parent_id\n              description\n              sub_section_id\n              file_content{\n                video_url\n                image_url\n                audio_url\n                file_url\n              }\n            }\n          }\n          author_details{\n            author_name\n            description\n            image\n          }\n        }\n        frequently_bought_together{\n          course_id\n          course_description\n          course_name\n          created_at\n          updated_at\n          version\n          location\n          course_start_datetime\n          course_end_datetime\n          advertised_start\n          course_img_url\n          social_sharing_url\n          certificate_display_behaviour\n          certificates_show_before_end\n          certificate_html_view_enabled\n          has_any_active_web_certificate\n          certificate_name\n          lowest_passing_grade\n          mobile_available\n          visible_to_staff_only\n          enrollment_start\n          enrollment_end\n          invitation_only\n          max_student_enrollments_allowed\n          announcement\n          catalog_visibility\n          course_video_url\n          short_description\n          self_paced\n          marketing_url\n          course_language\n          certificate_available_date\n          article_count\n          downloadable_resource_count\n          course_level\n          step_towards\n          rating\n          price\n          what_will_you_learn\n          course_category\n          course_type\n          groupid\n          created_by\n          updated_by\n          admin_id\n          is_published\n          course_mode\n          preview_video\n          learner_count\n          is_active\n          published_by\n          publisher_id\n          updated_by_id\n          published_on\n          user_role\n          user_id\n          user_name\n          pre_requisite{\n            name\n            image\n          }\n          takeway_details{\n            text\n            description\n            what_will_you_learn\n            media\n          }\n          coursepartner_details{\n            name\n            image\n          }\n          category_id\n          parent_sub_category_id\n          course_content_details{\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content{\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n            unit{\n              name\n              type\n              is_active\n              parent_id\n              description\n              sub_section_id\n              file_content{\n                video_url\n                image_url\n                audio_url\n                file_url\n              }\n            }\n          }\n          author_details{\n            author_name\n            description\n            image\n          }\n        }\n        review_and_faq{\n          _id\n          user_id\n          user_name\n          course_id\n          rating\n          review\n          created_on\n          updated_on\n          is_active\n          faq{\n            _id\n            course_id\n            is_active\n            qa{\n              question\n              answer\n            }\n          }\n        }\n        pre_requisite{\n          name\n          image\n        }\n        takeway_details{\n          text\n          description\n          what_will_you_learn\n          media\n        }\n        coursepartner_details{\n          name\n          image\n        }\n        category_id\n        parent_sub_category_id\n        course_content_details{\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content{\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit{\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content{\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details{\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }"])));
var view_wishlist = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query view_wishlist($user_id: String, $pagenumber: Int ){\n    view_wishlist(user_id: $user_id, pagenumber: $pagenumber) {\n      success\n      error_msg\n      message{\n        _id\n        course_id\n        created_on\n        is_active\n        user_id\n        certificate_name\n        course_description\n        course_img_url\n        course_name\n        max_student_enrollments_allowed\n        price\n        rating\n        short_description\n        enrollment_status\n        }\n    }\n  }"], ["\n  query view_wishlist($user_id: String, $pagenumber: Int ){\n    view_wishlist(user_id: $user_id, pagenumber: $pagenumber) {\n      success\n      error_msg\n      message{\n        _id\n        course_id\n        created_on\n        is_active\n        user_id\n        certificate_name\n        course_description\n        course_img_url\n        course_name\n        max_student_enrollments_allowed\n        price\n        rating\n        short_description\n        enrollment_status\n        }\n    }\n  }"])));
var list_content = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    query list_content{\n      list_content {\n        success\n        message\n        data{\n          scorm_id_mstr\n          package\n          package_dec\n        }\n      }\n  }"], ["\n    query list_content{\n      list_content {\n        success\n        message\n        data{\n          scorm_id_mstr\n          package\n          package_dec\n        }\n      }\n  }"])));
var syllabus_of_particular_scorm = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_6 || (templateObject_6 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query syllabus_of_particular_scorm($contentid: String){\n    syllabus_of_particular_scorm(contentid: $contentid) {\n      success\n      message\n      data{\n        title\n        children{\n          title\n          link\n        }\n      }\n    }\n  }"], ["\n  query syllabus_of_particular_scorm($contentid: String){\n    syllabus_of_particular_scorm(contentid: $contentid) {\n      success\n      message\n      data{\n        title\n        children{\n          title\n          link\n        }\n      }\n    }\n  }"])));
var getCoursesByName = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_7 || (templateObject_7 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    query getCoursesByName($courseName : String!, $pagenumber : String!){\n      getCoursesByName(courseName: $courseName, pagenumber: $pagenumber) {\n        success\n        error_msg\n        message{\n          course_id\n           course_description\n           course_name\n           version\n           location\n           course_start_datetime\n           course_end_datetime\n           advertised_start\n           course_img_url\n           social_sharing_url\n           certificate_display_behaviour\n           certificates_show_before_end\n           certificate_html_view_enabled\n           has_any_active_web_certificate\n           certificate_name\n           lowest_passing_grade\n           mobile_available\n           visible_to_staff_only\n           enrollment_start\n           enrollment_end\n           invitation_only\n           max_student_enrollments_allowed\n           announcement\n           catalog_visibility\n           course_video_url\n           short_description\n           self_paced\n           marketing_url\n           course_language\n           certificate_available_date\n           author_details{\n              author_name\n              description\n              image\n            }\n           course_content_details{\n              name\n              type\n              is_active\n              parent_id\n              description\n              sub_section_id\n              file_content{\n                video_url\n                image_url\n                audio_url\n                file_url\n              }\n              unit{\n                  name\n                  type\n                  is_active\n                  parent_id\n                  description\n                  sub_section_id\n                  file_content{\n                    video_url\n                    image_url\n                    audio_url\n                    file_url\n                  }\n                }\n            }\n           article_count\n           downloadable_resource_count\n           course_level\n           step_towards\n           rating\n           price\n           what_will_you_learn\n           course_category\n           course_type\n           course_mode\n           learner_count\n           coursepartner_details{\n              name\n              image\n           }\n           takeway_details{\n              text\n              description\n              media{\n              image\n              }\n              what_will_you_learn\n              }\n           published_by\n           published_on\n           updated_at\n           created_at\n    }\n    }\n\n      }\n  "], ["\n    query getCoursesByName($courseName : String!, $pagenumber : String!){\n      getCoursesByName(courseName: $courseName, pagenumber: $pagenumber) {\n        success\n        error_msg\n        message{\n          course_id\n           course_description\n           course_name\n           version\n           location\n           course_start_datetime\n           course_end_datetime\n           advertised_start\n           course_img_url\n           social_sharing_url\n           certificate_display_behaviour\n           certificates_show_before_end\n           certificate_html_view_enabled\n           has_any_active_web_certificate\n           certificate_name\n           lowest_passing_grade\n           mobile_available\n           visible_to_staff_only\n           enrollment_start\n           enrollment_end\n           invitation_only\n           max_student_enrollments_allowed\n           announcement\n           catalog_visibility\n           course_video_url\n           short_description\n           self_paced\n           marketing_url\n           course_language\n           certificate_available_date\n           author_details{\n              author_name\n              description\n              image\n            }\n           course_content_details{\n              name\n              type\n              is_active\n              parent_id\n              description\n              sub_section_id\n              file_content{\n                video_url\n                image_url\n                audio_url\n                file_url\n              }\n              unit{\n                  name\n                  type\n                  is_active\n                  parent_id\n                  description\n                  sub_section_id\n                  file_content{\n                    video_url\n                    image_url\n                    audio_url\n                    file_url\n                  }\n                }\n            }\n           article_count\n           downloadable_resource_count\n           course_level\n           step_towards\n           rating\n           price\n           what_will_you_learn\n           course_category\n           course_type\n           course_mode\n           learner_count\n           coursepartner_details{\n              name\n              image\n           }\n           takeway_details{\n              text\n              description\n              media{\n              image\n              }\n              what_will_you_learn\n              }\n           published_by\n           published_on\n           updated_at\n           created_at\n    }\n    }\n\n      }\n  "])));
var get_all_course_by_usergroup = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_8 || (templateObject_8 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_all_course_by_usergroup($group_id: String!,$pagenumber: Int!,$sort_type:String!){\n    get_all_course_by_usergroup(group_id: $group_id,pagenumber: $pagenumber,sort_type: $sort_type){\n    success\n    error_msg\n    total_count\n    message{\n    course_id\n    course_description\n    course_name\n    enrollment_status\n    created_at\n    updated_at\n    version\n    location\n    course_start_datetime\n    course_end_datetime\n    advertised_start\n    course_img_url\n    social_sharing_url\n    certificate_display_behaviour\n    certificates_show_before_end\n    certificate_html_view_enabled\n    has_any_active_web_certificate\n    certificate_name\n    lowest_passing_grade\n    mobile_available\n    visible_to_staff_only\n    pre_requisite{\n      name\n      image\n  }\n    enrollment_start\n    enrollment_end\n    invitation_only\n    max_student_enrollments_allowed\n    announcement\n    catalog_visibility\n    course_video_url\n    short_description\n    self_paced\n    marketing_url\n    course_language\n    certificate_available_date\n    article_count\n    downloadable_resource_count\n    course_level\n    step_towards\n    rating\n    price\n    what_will_you_learn\n    course_category\n    course_type\n    course_content_details{\n    name\n    type\n    is_active\n    parent_id\n    description\n    sub_section_id\n    file_content{\n    video_url\n    image_url\n    audio_url\n    file_url\n    }\n    unit{\n    name\n    type\n    is_active\n    parent_id\n    description\n    sub_section_id\n    file_content{\n    video_url\n    image_url\n    audio_url\n    file_url\n    }\n    }\n    }\n    author_details{\n    author_name\n    description\n    image\n    }\n    }\n    }\n    }"], ["\n  query get_all_course_by_usergroup($group_id: String!,$pagenumber: Int!,$sort_type:String!){\n    get_all_course_by_usergroup(group_id: $group_id,pagenumber: $pagenumber,sort_type: $sort_type){\n    success\n    error_msg\n    total_count\n    message{\n    course_id\n    course_description\n    course_name\n    enrollment_status\n    created_at\n    updated_at\n    version\n    location\n    course_start_datetime\n    course_end_datetime\n    advertised_start\n    course_img_url\n    social_sharing_url\n    certificate_display_behaviour\n    certificates_show_before_end\n    certificate_html_view_enabled\n    has_any_active_web_certificate\n    certificate_name\n    lowest_passing_grade\n    mobile_available\n    visible_to_staff_only\n    pre_requisite{\n      name\n      image\n  }\n    enrollment_start\n    enrollment_end\n    invitation_only\n    max_student_enrollments_allowed\n    announcement\n    catalog_visibility\n    course_video_url\n    short_description\n    self_paced\n    marketing_url\n    course_language\n    certificate_available_date\n    article_count\n    downloadable_resource_count\n    course_level\n    step_towards\n    rating\n    price\n    what_will_you_learn\n    course_category\n    course_type\n    course_content_details{\n    name\n    type\n    is_active\n    parent_id\n    description\n    sub_section_id\n    file_content{\n    video_url\n    image_url\n    audio_url\n    file_url\n    }\n    unit{\n    name\n    type\n    is_active\n    parent_id\n    description\n    sub_section_id\n    file_content{\n    video_url\n    image_url\n    audio_url\n    file_url\n    }\n    }\n    }\n    author_details{\n    author_name\n    description\n    image\n    }\n    }\n    }\n    }"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;


/***/ }),

/***/ "./src/app/core/shared/alert-component/alert-component.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/core/shared/alert-component/alert-component.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title class=\"msg\">{{data.title}}</h2>\n\n<mat-dialog-content *ngIf=\"data.msg\">\n\n    <p class=\"msg\"> {{data.msg}} </p>\n</mat-dialog-content>\n\n<mat-dialog-actions *ngIf=\"data.type=='showClose'\">\n    <button mat-stroked-button class=\"border-light-grey color_black background-darkGrey\" (click)=\"close()\"\n        cdkFocusInitial>OK</button>\n</mat-dialog-actions>\n\n<mat-dialog-actions *ngIf=\"data.type=='confirmAlert'\">\n    <button mat-stroked-button [mat-dialog-close]=\"true\" class=\"border-light-grey color_black background-darkGrey\"\n        cdkFocusInitial>\n        {{data.confirmText ?data.confirmText :  'Yes'}}</button>\n    <button mat-flat-button [mat-dialog-close]=\"false\" class=\"background-maroon\">\n        {{data.cancelText ?data.cancelText :  'No'}}</button>\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/core/shared/alert-component/alert-component.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/core/shared/alert-component/alert-component.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "p {\n  text-align: center; }\n\n.mat-dialog-container {\n  display: block;\n  border: 0.5px solid #024d87;\n  padding: 30px;\n  box-sizing: border-box;\n  overflow: auto;\n  outline: 0;\n  width: 100%;\n  height: 100%;\n  min-height: inherit;\n  max-height: inherit; }\n\n.mat-button,\n.mat-stroked-button,\n.mat-flat-button {\n  min-width: 38%;\n  margin: auto;\n  border-radius: 0 !important; }\n\n.background-darkGrey {\n  background-color: #C02222 !important;\n  color: #ffffff !important; }\n\n@media screen and (max-width: 600px) {\n  p {\n    font-size: 8px; }\n  h2 {\n    font-size: 12px;\n    font-weight: bolder; }\n  .mat-dialog-container {\n    width: auto; } }\n\n.msg {\n  text-transform: lowercase !important; }\n\n.msg:first-letter {\n  text-transform: capitalize !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2F2aW5hc2gvRG9jdW1lbnRzL2NpbnRhbmEvbHhwIHByb2plY3QvV2ViJTIwUG9ydGFsL3NyYy9hcHAvY29yZS9zaGFyZWQvYWxlcnQtY29tcG9uZW50L2FsZXJ0LWNvbXBvbmVudC5jb21wb25lbnQuc2NzcyIsIi9ob21lL2F2aW5hc2gvRG9jdW1lbnRzL2NpbnRhbmEvbHhwIHByb2plY3QvV2ViJTIwUG9ydGFsL3NyYy9hc3NldHMvdmFyaWFibGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLGNBQWM7RUFDZCwyQkNOZ0I7RURPaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixjQUFjO0VBQ2QsVUFBVTtFQUNWLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLG1CQUFtQixFQUFBOztBQUd2Qjs7O0VBR0ksY0FBYztFQUNkLFlBQVk7RUFDWiwyQkFBMkIsRUFBQTs7QUFLL0I7RUFDSSxvQ0FBNkM7RUFDN0MseUJBQThCLEVBQUE7O0FBR2xDO0VBRUk7SUFDSSxjQUFjLEVBQUE7RUFHbEI7SUFDSSxlQUFlO0lBQ2YsbUJBQW1CLEVBQUE7RUFJdkI7SUFDSSxXQUFXLEVBQUEsRUFDZDs7QUFJTDtFQUNJLG9DQUFvQyxFQUFBOztBQUV4QztFQUNJLHFDQUFxQyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29yZS9zaGFyZWQvYWxlcnQtY29tcG9uZW50L2FsZXJ0LWNvbXBvbmVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCJ2YXJpYWJsZVwiO1xuXG5wIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5tYXQtZGlhbG9nLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYm9yZGVyOiAwLjVweCBzb2xpZCAkY29sb3ItYmx1ZTtcbiAgICBwYWRkaW5nOiAzMHB4O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgb3V0bGluZTogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICBtYXgtaGVpZ2h0OiBpbmhlcml0O1xufVxuXG4ubWF0LWJ1dHRvbixcbi5tYXQtc3Ryb2tlZC1idXR0b24sXG4ubWF0LWZsYXQtYnV0dG9uIHtcbiAgICBtaW4td2lkdGg6IDM4JTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgYm9yZGVyLXJhZGl1czogMCAhaW1wb3J0YW50O1xuICAgIC8vIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1ibHVlICFpbXBvcnRhbnQ7XG4gICAgLy9ib3RoIGNvbmZpcm0gYW5kIGNhbmNlbCBidXR0b24gc2FtZSBjbHIgc28gbm8gZGlmZmVyZW50aWF0ZVxufVxuXG4uYmFja2dyb3VuZC1kYXJrR3JleSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGx4cC10aGVtZS1ncmVlbiAhaW1wb3J0YW50Oy8vIFxuICAgIGNvbG9yOiAkY29sb3Itd2hpdGUgIWltcG9ydGFudDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcblxuICAgIHAge1xuICAgICAgICBmb250LXNpemU6IDhweDtcbiAgICB9XG5cbiAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcblxuICAgIH1cblxuICAgIC5tYXQtZGlhbG9nLWNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgIH1cblxufVxuXG4ubXNnIHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlICFpbXBvcnRhbnQ7XG59XG4ubXNnOmZpcnN0LWxldHRlciB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemUgIWltcG9ydGFudDtcbn0iLCIkY29sb3ItcmVkOiAjRkYwMDAwO1xuJGNvbG9yLWdyZWVuOiAjMDBGRjAwO1xuJGNvbG9yLWJsdWU6ICMwMjRkODc7XG4kY29sb3IteWVsbG93OiAjZWVjNzIwO1xuJGNvbG9yLWxpZ2h0LXllbGxvdyA6IHllbGxvdztcbiRjb2xvci1tYXJvb24gOiAjZGIzMTM3O1xuJGNvbG9yLWRhcmtHcmV5IDogIzVlNWU1ZTtcbiRjb2xvci1pY29uIDogI2VkOTg5YjtcbiRjb2xvci13aGl0ZSA6ICNmZmZmZmY7XG4kY29sb3ItbGlnaHQtYmx1ZSA6ICNCOEQwRkY7XG4kY29sb3ItbGlnaHQtcGluayA6ICNlYzgxODU7XG4kY29sb3ItbGlnaHQtZ3JlZW46ICMwMGQyYjk7XG4kY29sb3ItYmxhbms6IzFGMUExNztcbiRjb2xvci1zbWFsbC1ibHVlOiAjOTRiNWYxO1xuJGNvbG9yLWJvcmRlciA6ICNjY2M7XG4kY29sb3Itb3JhbmdlIDogI0VCOTYwNTtcbiRjb2xvci1zdWJoZWFkIDogIzQ0NmJkNGQxO1xuJGNvbG9yLWxpZ2h0LWdyZXkgOiAjYjNiM2FhNDc7XG4kY29sb3ItZmllbGQgOiAjZTNlY2ZmO1xuJGNvbG9yLWRhcmstZ3JlZW4gOiAjMDRkMDA0O1xuJGxpZ2h0LWdyZWVuIDogIzdjZmMwMGQ0O1xuJGljb24tY29sb3IgOiAjMDAwMDAwNTc7XG4kYm94LXNoYWRvdyA6ICM4MDgwODA2MTtcbiR0cmVuZDojNjdkNGIxO1xuJGNvbG9yLWxpZ2h0ZXN0LWdyZXk6I2Y1ZjVmNTcwO1xuJG5ld1JlZ2lzdGVyaWNvbjogIzIwM2JiZWE4O1xuJG5ld0xlYXJuZXIgOiAjMjAzYmJlNDA7XG4kYWN0aXZlbGVhcm5lcmNoYXJ0IDogIzdmZTdhNTtcbiRpbmFjdGl2ZWxlYXJuZXJjaGFydCA6ICNlYTZjODk7XG4kc3R1ZGVudENoYXJ0IDogIzgwODBmODtcbiRwcm9mZXNzaW9uYWxDaGFydCA6ICNlYTdjMzc7XG4kY29sb3ItbGFuZGluZy1ibHVlOiMxMDY4QjI7XG5cbi8vIEFkbWluIGRhc2hib2FyZCBjb2xvciBcbiRiZy1ncmVlbjogIzdjZmMwMDYxO1xuJGJnLWJyb3duOiAjZmZjMTA3NTk7XG4kYmctY29sb3I6ICNlM2UzZmU7XG4kYmctZGFyay1icm93biA6ICNhZjQ4MTE2MTtcbiRsaWdodC1ncmV5IDogI2Y2ZjZmNjtcbiRsaWdodC15ZWxsb3c6I2ZhZjVjYjtcblxuXG5cbi8vU2FyYXQgXG5cbiRicmVhZC1jcnVtYi1iZyAgOiAjZTVlM2UzO1xuLy8gJGxhYmVsIDogIzMzMzMzMzk2O1xuJHByb2ZpbGUtcC1ncmV5IDogI2NlY2VjZTtcbiRwcm9maWxlLXMtZ3JleSA6ICNkZmRmZGY7XG4kcHJvZmlsZS10LWdyZXkgOiAjZWFlYWVhO1xuJGxhYmVsMjojMzMzMzMzO1xuJGxpbmVDb2xvcjojY2NjY2NjYjA7XG4kYnVsZTI6IzQ0NmJkNGQxO1xuXG4vLyBNYW5qdVxuXG4vLyBNYWluIENvbG9yIFxuJGx4cC1ncmF5OiM4OTg5ODk7XG4kbHhwLXRoZW1lLWdyZWVuOiAjQzAyMjIyO1xuJGx4cC10aGVtZS15ZWxsb3ctc2VjOiNGRkNDMDA7XG4kbHhwLWRhcmstZ3JheTojNzE2ZDZkO1xuLy8gU2VjIGNvbG9yXG4kbHhwLXRleHQ6IzlFOUU5RTtcbiRseHAtZm9vdGVyLXRleHQ6IzNmNDQ0YTtcbiRseHAtaWNvbjogIzVjNjg3MztcbiRseHAtc3RhdHVzLXllbGxvdzojZmZjMTA3YmY7XG4kbHhwLWJ1dHRvbi10ZXh0OiM2OTcyN2M7XG4kbGFiZWw6ICM1YzY4NzM7XG4kbHhwLWxpZ2h0LWdyZXk6I2I1YWNhYztcbi8vICNmZmNjMDA7XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/core/shared/alert-component/alert-component.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/core/shared/alert-component/alert-component.component.ts ***!
  \**************************************************************************/
/*! exports provided: AlertComponentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertComponentComponent", function() { return AlertComponentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");




var AlertComponentComponent = /** @class */ (function () {
    function AlertComponentComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    AlertComponentComponent.prototype.ngOnInit = function () {
    };
    AlertComponentComponent.prototype.close = function () {
        this.dialogRef.close(true);
    };
    AlertComponentComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-alert-component',
            template: __webpack_require__(/*! ./alert-component.component.html */ "./src/app/core/shared/alert-component/alert-component.component.html"),
            styles: [__webpack_require__(/*! ./alert-component.component.scss */ "./src/app/core/shared/alert-component/alert-component.component.scss")]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], AlertComponentComponent);
    return AlertComponentComponent;
}());



/***/ }),

/***/ "./src/app/graphql/graphql.modules.ts":
/*!********************************************!*\
  !*** ./src/app/graphql/graphql.modules.ts ***!
  \********************************************/
/*! exports provided: GraphqlModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphqlModule", function() { return GraphqlModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var apollo_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-angular */ "./node_modules/apollo-angular/fesm2015/ngApollo.js");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-link */ "./node_modules/apollo-link/lib/bundle.esm.js");
/* harmony import */ var apollo_angular_link_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-angular-link-http */ "./node_modules/apollo-angular-link-http/fesm2015/ngApolloLinkHttp.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-cache-inmemory */ "./node_modules/apollo-cache-inmemory/lib/bundle.esm.js");
/* harmony import */ var _core_services_common_services_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/services/common-services.service */ "./src/app/core/services/common-services.service.ts");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
/* harmony import */ var _core_services_handlers_global_service_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/services/handlers/global-service.service */ "./src/app/core/services/handlers/global-service.service.ts");
/* harmony import */ var apollo_link_error__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! apollo-link-error */ "./node_modules/apollo-link-error/lib/bundle.esm.js");








// import { environment } from '../../environments/environment';



var defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};
var GraphqlModule = /** @class */ (function () {
    function GraphqlModule(apollo, httpLink, gs, httpC, services) {
        var _this = this;
        this.gs = gs;
        this.httpC = httpC;
        this.services = services;
        this.envWcaApi = _env_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].wcaapiurl;
        this.envApi = _env_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].apiUrl;
        this.envApiImg = _env_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].apiUrlImg;
        this.envCourseApi = _env_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].createCourseApi;
        var http = httpLink.create({ uri: this.envApi + 'graphql' });
        var middleware = new apollo_link__WEBPACK_IMPORTED_MODULE_4__["ApolloLink"](function (operation, forward) {
            // Check for token
            var token = localStorage.getItem('token') || sessionStorage.getItem('token');
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibHhwYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJ1c2VyX2lkIjoiMTIzNGFiIiwic2VjX2tleSI6IjEyM0FhIUAjIiwiaWF0IjoxNTk4NDUwMjk3LCJleHAiOjE1OTg0NzE4OTcsImlzcyI6Imh0dHBzOi8vd3d3LmxhcnNlbnRvdWJyby5jb20vIn0.y9YcBFZc43QtAP2Wep7rSI1wHtIMkTBeseAb-n0qvpc'
            if (!token) {
                return forward(operation);
            }
            operation.setContext({
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', token),
            });
            return forward(operation);
        });
        var Errlink = Object(apollo_link_error__WEBPACK_IMPORTED_MODULE_10__["onError"])(function (_a) {
            var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, response = _a.response, operation = _a.operation;
            // console.log(operation);
            if (graphQLErrors) {
                graphQLErrors.forEach(function (_a) {
                    var message = _a.message, locations = _a.locations, path = _a.path;
                    console.log("[GraphQL error]: Message: " + message + ", Location: " + locations + ", Path: " + path);
                    if (message.includes('TokenExpiredError') || message.includes('JsonWebTokenError')) {
                        console.log('inside');
                        localStorage.clear();
                        sessionStorage.clear();
                        _this.services.getIpAddressByUrl();
                        _this.gs.checkLogout();
                    }
                });
            }
            if (networkError) {
                console.log("[Network error]: " + networkError);
            }
        });
        var link = middleware.concat(http);
        apollo.create({
            link: Errlink.concat(link),
            cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_6__["InMemoryCache"]({
                addTypename: false
            }),
            defaultOptions: defaultOptions,
        });
    }
    GraphqlModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            exports: [
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                apollo_angular__WEBPACK_IMPORTED_MODULE_3__["ApolloModule"],
                apollo_angular_link_http__WEBPACK_IMPORTED_MODULE_5__["HttpLinkModule"]
            ]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [apollo_angular__WEBPACK_IMPORTED_MODULE_3__["Apollo"], apollo_angular_link_http__WEBPACK_IMPORTED_MODULE_5__["HttpLink"], _core_services_handlers_global_service_service__WEBPACK_IMPORTED_MODULE_9__["GlobalServiceService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _core_services_common_services_service__WEBPACK_IMPORTED_MODULE_7__["CommonServicesService"]])
    ], GraphqlModule);
    return GraphqlModule;
}());



/***/ }),

/***/ "./src/app/learner/services/learner-services.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/learner/services/learner-services.service.ts ***!
  \**************************************************************/
/*! exports provided: LearnerServicesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LearnerServicesService", function() { return LearnerServicesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var apollo_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-angular */ "./node_modules/apollo-angular/fesm2015/ngApollo.js");
/* harmony import */ var _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operations/learner_query */ "./src/app/learner/services/operations/learner_query.ts");
/* harmony import */ var _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./operations/learner_mutation */ "./src/app/learner/services/operations/learner_mutation.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");







var LearnerServicesService = /** @class */ (function () {
    function LearnerServicesService(Apollo, http) {
        this.Apollo = Apollo;
        this.http = http;
        this.envWcaApi = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].wcaapiurl;
        this.envApi = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrl;
        this.envApiImg = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiUrlImg;
        this.envCourseApi = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].createCourseApi;
        this.envDomain = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].domain;
    }
    LearnerServicesService.prototype.getData = function (userid, date) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getReadLeanerActivity"],
            variables: {
                userid: userid,
                date: date
            }
        });
    };
    LearnerServicesService.prototype.login = function (username, password, is_admin) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["login"],
            variables: {
                username: username,
                password: password,
                is_admin: is_admin
            }
        });
    };
    LearnerServicesService.prototype.imageupload = function (fb) {
        return this.http.post(this.envApiImg + "upload/image", fb);
    };
    LearnerServicesService.prototype.postcomment = function (data) {
        var token = localStorage.getItem('token') || sessionStorage.getItem('token');
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpHeaders"]({ Authorization: token })
        };
        return this.http.post(this.envApi + 'postcomment', data, httpOptions);
    };
    LearnerServicesService.prototype.unlikepost = function (data) {
        var token = localStorage.getItem('token') || sessionStorage.getItem('token');
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpHeaders"]({ Authorization: token })
        };
        return this.http.post(this.envApi + 'post_unlike', data, httpOptions);
    };
    LearnerServicesService.prototype.likepost = function (data) {
        var token = localStorage.getItem('token') || sessionStorage.getItem('token');
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpHeaders"]({ Authorization: token })
        };
        return this.http.post(this.envApi + 'post_like', data, httpOptions);
    };
    LearnerServicesService.prototype.user_registration = function (email, full_name, mobile_number, title_id, termsandconditions) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["user_registration"],
            variables: {
                full_name: full_name,
                mobile_number: mobile_number,
                title_id: title_id,
                email: email,
                term_condition: termsandconditions,
                domain: this.envDomain
            }
        });
    };
    LearnerServicesService.prototype.submit_otp = function (user_id, _id, mobile, email) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["user_registration_mobile_otp_send"],
            variables: {
                user_id: user_id,
                user: _id,
                mobile_number: mobile,
                email: email
            }
        });
    };
    LearnerServicesService.prototype.user_registration_verify = function (otp, mobile_number) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["user_registration_mobile_otp_verify"],
            variables: {
                otp: otp,
                mobile_number: mobile_number
            }
        });
    };
    LearnerServicesService.prototype.user_registration_done = function (user_id, username, password, created_by_ip) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["user_registration_done"],
            variables: {
                user_id: user_id,
                username: username,
                password: password,
                created_by_ip: created_by_ip
            }
        });
    };
    LearnerServicesService.prototype.view_profile = function (user_id) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["view_profile"],
            variables: {
                user_id: user_id
            }
        });
    };
    LearnerServicesService.prototype.get_country_details = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_country_details"]
        });
    };
    LearnerServicesService.prototype.get_state_details = function (_id) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["get_state_details"],
            variables: {
                _id: _id
            }
        });
    };
    LearnerServicesService.prototype.getMyCourse = function (user_id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_course_by_user"],
            variables: {
                user_id: user_id
            }
        });
    };
    // submit_otp(user_id,_id,mobile) {
    //   return this.Apollo.query({
    //     query: user_registration_mobile_otp_send,
    //     variables: {
    //       mobile_number:mobile,
    //       user_id:user_id,
    //       user:_id,
    LearnerServicesService.prototype.userNamesuggestion = function (userId) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["user_registration_username_suggestion"],
            variables: {
                user_id: userId
            }
        });
    };
    // checks for existing user or not
    LearnerServicesService.prototype.check_existing_user = function (name) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["check_existing_user"],
            variables: {
                username: name
            }
        });
    };
    LearnerServicesService.prototype.forgotUsernameandPassword = function (type, subtype, mobile_number, email) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["get_forgot_username_mobile_email"],
            variables: {
                type: type,
                subtype: subtype,
                mobile_number: mobile_number,
                email: email,
                domain: this.envDomain
            }
        });
    };
    LearnerServicesService.prototype.forgotPasswordByUsername = function (username) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["get_forgot_password_byusername"],
            variables: {
                username: username
            }
        });
    };
    LearnerServicesService.prototype.resetPassword = function (username, password) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["get_forgot_password_byresetpassword"],
            variables: {
                username: username,
                password: password
            }
        });
    };
    LearnerServicesService.prototype.get_qualification_details = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_qualification_details"]
        });
    };
    LearnerServicesService.prototype.get_board_university_details = function (id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_board_university_details"],
            variables: {
                _id: id
            }
        });
    };
    LearnerServicesService.prototype.get_district_details = function (country, state) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["get_district_details"],
            variables: {
                country: country,
                state: state
            }
        });
    };
    LearnerServicesService.prototype.get_change_password_updateprofile = function (username, old_password, password) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["get_change_password_updateprofile"],
            variables: {
                username: username,
                old_password: old_password,
                password: password
            }
        });
    };
    LearnerServicesService.prototype.get_discipline_details = function (id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_discipline_details"],
            variables: {
                _id: id
            }
        });
    };
    LearnerServicesService.prototype.get_specification_details = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_specification_details"]
        });
    };
    LearnerServicesService.prototype.get_institute_details = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_institute_details"]
        });
    };
    LearnerServicesService.prototype.get_language_details = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_language_details"]
        });
    };
    LearnerServicesService.prototype.update_mobile_onprofile = function (user_id, mobile_number) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["update_mobile_onprofile"],
            variables: {
                user_id: user_id,
                mobile_number: mobile_number
            }
        });
    };
    LearnerServicesService.prototype.update_verifyotp_mobile_onprofile = function (user_id, mobile_number, otp) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["update_verifyotp_mobile_onprofile"],
            variables: {
                user_id: user_id,
                mobile_number: mobile_number,
                otp: otp
            }
        });
    };
    LearnerServicesService.prototype.get_user_detail = function (email) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_user_detail"],
            variables: {
                email: email
            }
        });
    };
    LearnerServicesService.prototype.getLoginUserDetail = function (email) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getLoginUserDetail"],
            variables: {
                username: email
            }
        });
    };
    LearnerServicesService.prototype.get_user_detail_username = function (username) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_user_detail_username"],
            variables: {
                username: username
            }
        });
    };
    LearnerServicesService.prototype.update_email_onprofile = function (user_id, email) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["update_email_onprofile"],
            variables: {
                user_id: user_id,
                email: email,
                domain: this.envDomain
            }
        });
    };
    LearnerServicesService.prototype.list_content = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["list_content"],
            variables: {}
        });
    };
    LearnerServicesService.prototype.syllabus_of_particular_scorm = function (contentid, user_id, course_id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["syllabus_of_particular_scorm"],
            variables: {
                contentid: contentid,
                user_id: user_id,
                course_id: course_id
            }
        });
    };
    LearnerServicesService.prototype.getModuleData = function (course_id, userid) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getmoduleData"],
            variables: {
                courseid: course_id,
                user_id: userid
            }
        });
    };
    LearnerServicesService.prototype.update_profile = function (userData) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["update_profile"],
            variables: userData
        });
    };
    LearnerServicesService.prototype.delete_qualification = function (qualificationData) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["delete_qualification"],
            variables: qualificationData
        });
    };
    LearnerServicesService.prototype.resend_otp_onprofile = function (user_id) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["resend_otp_onprofile"],
            variables: {
                user_id: user_id
            }
        });
    };
    LearnerServicesService.prototype.getcoursecategory = function (groupid) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_all_category"],
            variables: {
                group_id: groupid
            }
        });
    };
    LearnerServicesService.prototype.getcoursesubcategory = function (categoryid) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_sub_category"],
            variables: {
                category_id: categoryid
            }
        });
    };
    LearnerServicesService.prototype.getsupersubcategory = function (subcategoryid) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getsupersubcategory"],
            variables: {
                sub_category_id: subcategoryid
            }
        });
    };
    LearnerServicesService.prototype.getcourse = function (subcategory) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_course_by_subcategory"],
            variables: {
                input_id: subcategory._id,
                input_type: subcategory.type,
                pagenumber: subcategory.pagenumber
            }
        });
    };
    // getallcourses(groupid, pagenumber,sort_type) {
    //   return this.Apollo.query({
    //     query: get_all_course_by_usergroup,
    //     variables: {
    //       group_id: groupid,
    //       pagenumber: pagenumber,
    //       sort_type:sort_type
    //     }
    //   });
    // }
    LearnerServicesService.prototype.get_module_topic = function (course_id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_module_topic"],
            variables: {
                course_id: course_id
            }
        });
    };
    LearnerServicesService.prototype.gettopicdetail = function (_id, modulename) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["gettopicdetail"],
            variables: {
                _id: _id,
                module_name: modulename
            }
        });
    };
    // Getting all 3 level Category data
    LearnerServicesService.prototype.getLevelCategoryData = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getLevelCategoryData"]
        });
    };
    // After selection category in category level filter
    LearnerServicesService.prototype.getLevelSubCategoryData = function (level1, level2, level3) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["getLevelSubCategoryData"],
            variables: {
                level1: level1,
                level2: level2,
                level3: level3
            }
        });
    };
    // Get guideline search for geeting all filter values
    LearnerServicesService.prototype.getGuidelineSearch = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getDetailsCount"]
        });
    };
    LearnerServicesService.prototype.postCategoryFilter = function (data) {
        return this.http.post(this.envApi + "getsublevelcategories", data);
    };
    // Guildeline selected filter value and getting courses
    LearnerServicesService.prototype.postGuildelineSearchData = function (category, sub_category, super_sub_category, course_language, course_mode, author_details, partner_details, pagenumber, perPage, publishedToDate, publishedFromDate, catalogue_visibility) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["getCourseCategorySearch"],
            variables: {
                category: category,
                sub_category: sub_category,
                super_sub_category: super_sub_category,
                course_language: course_language,
                course_mode: course_mode,
                author_details: author_details,
                partner_details: partner_details,
                pagenumber: pagenumber,
                perPage: perPage,
                publishedFromDate: publishedFromDate,
                publishedToDate: publishedToDate,
                catalogue_visibility: catalogue_visibility
            }
        });
    };
    LearnerServicesService.prototype.getlearnertrack = function (level1, level2) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getlearnertrack"],
            variables: {
                user_id: level1,
                _id: level2
            }
        });
    };
    LearnerServicesService.prototype.view_profile1 = function (user_id) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["view_profile1"],
            variables: {
                user_id: user_id
            }
        });
    };
    LearnerServicesService.prototype.get_enrolled_courses = function (user_id, id, catalogue_id, category_id, jobRoleCategoryId, searchString) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getLearnerenrolledCourses"],
            variables: {
                user_id: user_id,
                user_obj_id: id,
                catalogue_id: catalogue_id,
                category_id: category_id,
                jobRoleCategoryId: jobRoleCategoryId,
                searchString: searchString
            }
        });
    };
    LearnerServicesService.prototype.bulkclaimcourse = function (id, user_id, category_id, categoryName) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["bulkclaimcourse"],
            variables: {
                id: id,
                user_id: user_id,
                category_id: category_id,
                categoryName: categoryName
            }
        });
    };
    LearnerServicesService.prototype.getCountForCategories = function (userObjId) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getCountForCategories"],
            variables: {
                userObjId: userObjId
            }
        });
    };
    LearnerServicesService.prototype.getCoureBasedOnCatalog = function (catalogue_id, category_id, userObjId, subCategoryId, superSubCategoryId) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getCoureBasedOnCatalog"],
            variables: {
                catalogue_id: catalogue_id,
                category_id: category_id,
                userObjId: userObjId,
                subCategoryId: subCategoryId,
                superSubCategoryId: superSubCategoryId
            }
        });
    };
    LearnerServicesService.prototype.get_learner_dashboard = function (user_id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getlearnerdashboarddetails"],
            variables: {
                user_id: user_id
            }
        });
    };
    LearnerServicesService.prototype.createGuidanceRequestLanding = function (name, emailid, courseid, createdbyip) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["createGuidanceRequest"],
            variables: {
                name: name,
                email_id: emailid,
                created_by_ip: createdbyip,
                course_id: courseid
            }
        });
    };
    LearnerServicesService.prototype.getPopularInLanding = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_popular_course"]
        });
    };
    LearnerServicesService.prototype.getTrendingInLanding = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_trending_course"]
        });
    };
    LearnerServicesService.prototype.getPopularcourse = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getPopularcourse"]
        });
    };
    LearnerServicesService.prototype.getFeedbackQuestion = function () {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getFeedbackQuestion"]
        });
    };
    LearnerServicesService.prototype.InsertCourseFeedback = function (feedback) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["InsertCourseFeedback"],
            variables: feedback
        });
    };
    LearnerServicesService.prototype.getCoursePlayerStatusForCourse = function (user_id, course_id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getCoursePlayerStatusForCourse"],
            variables: {
                user_id: user_id,
                course_id: course_id
            }
        });
    };
    LearnerServicesService.prototype.getAssignmentmoduleData = function (courseid, user_id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getAssignmentmoduleData"],
            variables: {
                courseid: courseid,
                user_id: user_id
            }
        });
    };
    LearnerServicesService.prototype.playerModuleAndTopic = function (contentID, user_id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["playerModuleAndTopic"],
            variables: {
                contentID: contentID,
                user_id: user_id
            }
        });
    };
    LearnerServicesService.prototype.playerstatusrealtime = function (user_id, contentID, module, percentage) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["playerstatusrealtime"],
            variables: {
                user_id: user_id,
                contentID: contentID,
                module: module,
                percentage: percentage
            }
        });
    };
    LearnerServicesService.prototype.viewsingletopicdiscussion = function (topic_slug, uid) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["ViewSingleTopicDiscussionData"],
            variables: {
                topic_slug: topic_slug,
                uid: uid
            }
        });
    };
    LearnerServicesService.prototype.ViewAllThreadData = function (modId, cid, bid) {
        if (bid) {
            return this.Apollo.query({
                query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["ViewAllThreadDataBid"],
                variables: {
                    module_name: modId,
                    course_id: cid,
                    batch_id: bid
                }
            });
        }
        else {
            return this.Apollo.query({
                query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["ViewAllThreadData"],
                variables: {
                    module_name: modId,
                    course_id: cid,
                }
            });
        }
    };
    LearnerServicesService.prototype.createNewThread = function (uid, course_id, module_name, title, content, course_name, batch) {
        if (batch) {
            return this.Apollo.query({
                query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["CreateNewThreadBid"],
                variables: {
                    uid: uid, course_id: course_id, module_name: module_name, title: title, content: content, course_name: course_name,
                    batch_name: batch.batch_name, batch_id: batch.batch_id
                }
            });
        }
        else {
            return this.Apollo.query({
                query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["CreateNewThread"],
                variables: {
                    uid: uid, course_id: course_id, module_name: module_name, title: title, content: content, course_name: course_name
                }
            });
        }
    };
    LearnerServicesService.prototype.getReadLeanerActivity = function (userid, date) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getReadLeanerActivity"],
            variables: {
                userid: userid,
                date: date
            }
        });
    };
    LearnerServicesService.prototype.getAllActivity = function (userid, date) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getcalenderactivity"],
            variables: {
                userid: userid,
                date: date
            }
        });
    };
    LearnerServicesService.prototype.get_organization_by_id = function (organization_id) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["get_organization_by_id"],
            variables: {
                organization_id: organization_id
            }
        });
    };
    LearnerServicesService.prototype.claimcourse = function (id, user_id, course_id, courseName, categoryName) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["claimcourse"],
            variables: {
                id: id,
                user_id: user_id,
                course_id: course_id,
                courseName: courseName,
                categoryName: categoryName
            }
        });
    };
    LearnerServicesService.prototype.getSingleBatchInfo = function (uid, cid) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["singleBatchInfo"],
            variables: {
                user_id: uid,
                course_id: cid
            }
        });
    };
    LearnerServicesService.prototype.getRegisterTitle = function () {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["user_mstr_data"],
            variables: {}
        });
    };
    LearnerServicesService.prototype.add_topic_reference = function (user_id, batch_id, course_id, module_id, topic_id, reference_id, reference_status, created_by) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["add_topic_reference"],
            variables: {
                user_id: user_id,
                batch_id: batch_id,
                course_id: course_id,
                module_id: module_id,
                topic_id: topic_id,
                reference_id: reference_id,
                reference_status: reference_status,
                created_by: created_by
            }
        });
    };
    LearnerServicesService.prototype.saveAttendees = function () {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["save_attendies"],
            variables: {
                userid: 'fsdfsdfsd',
                activityid: '432142314',
                activitynamne: 'test',
                username: 'testing',
                mobile: '9876543234',
                email: 'test@gmail.com',
                status: 'true'
            }
        });
    };
    LearnerServicesService.prototype.getCountForJobroleCategories = function (userObjId) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getCountForJobroleCategories"],
            variables: {
                userObjId: userObjId
            }
        });
    };
    LearnerServicesService.prototype.markAsRead = function (notifications) {
        return this.Apollo.query({
            query: _operations_learner_mutation__WEBPACK_IMPORTED_MODULE_4__["markAsRead"],
            variables: {
                notifications: notifications
            }
        });
    };
    LearnerServicesService.prototype.getprojectActivityData = function (userId, courseId) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getprojectActivityData"],
            variables: {
                userId: userId,
                courseId: courseId
            }
        });
    };
    // get oerform activity details
    LearnerServicesService.prototype.getperformActivityData = function (userId, courseId) {
        return this.Apollo.query({
            query: _operations_learner_query__WEBPACK_IMPORTED_MODULE_3__["getperformActivityData"],
            variables: {
                userId: userId,
                courseId: courseId
            }
        });
    };
    LearnerServicesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [apollo_angular__WEBPACK_IMPORTED_MODULE_2__["Apollo"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]])
    ], LearnerServicesService);
    return LearnerServicesService;
}());



/***/ }),

/***/ "./src/app/learner/services/operations/learner_mutation.ts":
/*!*****************************************************************!*\
  !*** ./src/app/learner/services/operations/learner_mutation.ts ***!
  \*****************************************************************/
/*! exports provided: user_registration, user_registration_mobile_otp_send, user_registration_mobile_otp_verify, user_registration_done, get_forgot_username_mobile_email, get_forgot_password_byusername, user_registration_username_suggestion, get_forgot_password_byresetpassword, view_profile, get_state_details, get_district_details, get_change_password_updateprofile, view_profile1, delete_qualification, update_profile, update_mobile_onprofile, update_verifyotp_mobile_onprofile, update_email_onprofile, resend_otp_onprofile, gettopicdetail, getLevelSubCategoryData, getCourseCategorySearch, createGuidanceRequest, InsertCourseFeedback, playerstatusrealtime, CreateNewThread, CreateNewThreadBid, claimcourse, user_mstr_data, add_topic_reference, save_attendies, bulkclaimcourse, markAsRead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user_registration", function() { return user_registration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user_registration_mobile_otp_send", function() { return user_registration_mobile_otp_send; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user_registration_mobile_otp_verify", function() { return user_registration_mobile_otp_verify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user_registration_done", function() { return user_registration_done; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_forgot_username_mobile_email", function() { return get_forgot_username_mobile_email; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_forgot_password_byusername", function() { return get_forgot_password_byusername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user_registration_username_suggestion", function() { return user_registration_username_suggestion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_forgot_password_byresetpassword", function() { return get_forgot_password_byresetpassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "view_profile", function() { return view_profile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_state_details", function() { return get_state_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_district_details", function() { return get_district_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_change_password_updateprofile", function() { return get_change_password_updateprofile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "view_profile1", function() { return view_profile1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delete_qualification", function() { return delete_qualification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_profile", function() { return update_profile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_mobile_onprofile", function() { return update_mobile_onprofile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_verifyotp_mobile_onprofile", function() { return update_verifyotp_mobile_onprofile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_email_onprofile", function() { return update_email_onprofile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resend_otp_onprofile", function() { return resend_otp_onprofile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gettopicdetail", function() { return gettopicdetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLevelSubCategoryData", function() { return getLevelSubCategoryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCourseCategorySearch", function() { return getCourseCategorySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGuidanceRequest", function() { return createGuidanceRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertCourseFeedback", function() { return InsertCourseFeedback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerstatusrealtime", function() { return playerstatusrealtime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateNewThread", function() { return CreateNewThread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateNewThreadBid", function() { return CreateNewThreadBid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claimcourse", function() { return claimcourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user_mstr_data", function() { return user_mstr_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_topic_reference", function() { return add_topic_reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save_attendies", function() { return save_attendies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bulkclaimcourse", function() { return bulkclaimcourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markAsRead", function() { return markAsRead; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


var user_registration = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation user_registration($full_name: String!, $mobile_number: String, $title_id: String,\n   $email: String!,$term_condition:Boolean,$domain:String!) {\n    user_registration(\n      full_name: $full_name,\n      mobile_number:$mobile_number,\n      title_id :$title_id ,\n      email: $email,\n      term_condition: $term_condition,\n      domain:$domain\n    ) {\n      message\n      success\n      data {\n      user_id\n      full_name\n      email\n      _id\n      }\n      _id\n      error\n    }\n  }\n"], ["\n  mutation user_registration($full_name: String!, $mobile_number: String, $title_id: String,\n   $email: String!,$term_condition:Boolean,$domain:String!) {\n    user_registration(\n      full_name: $full_name,\n      mobile_number:$mobile_number,\n      title_id :$title_id ,\n      email: $email,\n      term_condition: $term_condition,\n      domain:$domain\n    ) {\n      message\n      success\n      data {\n      user_id\n      full_name\n      email\n      _id\n      }\n      _id\n      error\n    }\n  }\n"])));
var user_registration_mobile_otp_send = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation user_registration_mobile_otp_send($user_id: String,$user: String,$mobile_number: String!,$email: String) {\n    user_registration_mobile_otp_send(\n      user_id:$user_id,\n      user: $user,\n      mobile_number: $mobile_number,\n      email: $email,\n      is_active: true\n    ) {\n      message\n      success\n    }\n  }\n"], ["\n  mutation user_registration_mobile_otp_send($user_id: String,$user: String,$mobile_number: String!,$email: String) {\n    user_registration_mobile_otp_send(\n      user_id:$user_id,\n      user: $user,\n      mobile_number: $mobile_number,\n      email: $email,\n      is_active: true\n    ) {\n      message\n      success\n    }\n  }\n"])));
var user_registration_mobile_otp_verify = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation user_registration_mobile_otp_verify($otp:String!,$mobile_number: String!) {\n    user_registration_mobile_otp_verify(\n      otp: $otp,\n      mobile_number:$mobile_number\n\n    ) {\n      message\n      success\n      data{\n        otp\n        _id\n        mobile_number\n        user_id\n        username\n      }\n    }\n  }\n"], ["\n  mutation user_registration_mobile_otp_verify($otp:String!,$mobile_number: String!) {\n    user_registration_mobile_otp_verify(\n      otp: $otp,\n      mobile_number:$mobile_number\n\n    ) {\n      message\n      success\n      data{\n        otp\n        _id\n        mobile_number\n        user_id\n        username\n      }\n    }\n  }\n"])));
var user_registration_done = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation user_registration_done($user_id: String,$username: String,$password:String!, $created_by_ip: String!) {\n    user_registration_done(\n      user_id:$user_id,\n      username:$username,\n      password:$password,\n      created_by_ip:$created_by_ip\n    ) {\n      success\n      _id\n      message\n      token\n    }\n  }\n"], ["\n  mutation user_registration_done($user_id: String,$username: String,$password:String!, $created_by_ip: String!) {\n    user_registration_done(\n      user_id:$user_id,\n      username:$username,\n      password:$password,\n      created_by_ip:$created_by_ip\n    ) {\n      success\n      _id\n      message\n      token\n    }\n  }\n"])));
var get_forgot_username_mobile_email = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation get_forgot_username_mobile_email($type: String,$subtype:String!, $mobile_number: String,$email: String ,$domain:String!) {\n    get_forgot_username_mobile_email(\n      type:$type,\n      subtype:$subtype,\n      mobile_number:$mobile_number,\n      email:$email,\n      domain:$domain\n    ) {\n      success\n      message\n\n    }\n  }\n"], ["\n  mutation get_forgot_username_mobile_email($type: String,$subtype:String!, $mobile_number: String,$email: String ,$domain:String!) {\n    get_forgot_username_mobile_email(\n      type:$type,\n      subtype:$subtype,\n      mobile_number:$mobile_number,\n      email:$email,\n      domain:$domain\n    ) {\n      success\n      message\n\n    }\n  }\n"])));
var get_forgot_password_byusername = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_6 || (templateObject_6 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation get_forgot_password_byusername($username: String) {\n    get_forgot_password_byusername(\n      username:$username,\n    ) {\n      message\n      success\n      user_id\n      data{\n        value\n        type\n      }\n\n    }\n  }\n"], ["\n  mutation get_forgot_password_byusername($username: String) {\n    get_forgot_password_byusername(\n      username:$username,\n    ) {\n      message\n      success\n      user_id\n      data{\n        value\n        type\n      }\n\n    }\n  }\n"])));
var user_registration_username_suggestion = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_7 || (templateObject_7 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation user_registration_username_suggestion($user_id: String) {\n    user_registration_username_suggestion(\n      user_id:$user_id,\n    ) {\n      message\n      success\n      data\n\n    }\n  }\n"], ["\n  mutation user_registration_username_suggestion($user_id: String) {\n    user_registration_username_suggestion(\n      user_id:$user_id,\n    ) {\n      message\n      success\n      data\n\n    }\n  }\n"])));
var get_forgot_password_byresetpassword = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_8 || (templateObject_8 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation get_forgot_password_byresetpassword($username: String!,$password:String!) {\n    get_forgot_password_byresetpassword(\n      username:$username,\n      password:$password\n    ) {\n      message\n      success\n    }\n  }\n"], ["\n  mutation get_forgot_password_byresetpassword($username: String!,$password:String!) {\n    get_forgot_password_byresetpassword(\n      username:$username,\n      password:$password\n    ) {\n      message\n      success\n    }\n  }\n"])));
var view_profile = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_9 || (templateObject_9 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation view_profile($user_id: String) {\n    view_profile(user_id:$user_id)\n    {\n      success\n\n      message {\n\n        full_name\n\n\n\n        email\n\n        user_id\n\n        user_dtl {\n\n          is_admin\n\n          user_id\n\n          username\n\n          password\n\n          created_by_ip\n          created_on\n\n        }\n\n        user_mobile {\n\n          mobile_number\n\n        }\n\n        user_profile {\n\n          _id\n\n          languages_known\n\n          is_student_or_professional\n\n          about_you\n\n          certificate\n\n          user_id\n\n          profile_img\n\n          year_of_birth\n\n          doj_lxp\n\n          progress\n\n          is_active\n\n          gender\n\n          country\n\n          state\n\n          city_town\n\n          student\n\n          professional {\n\n            total_experience\n\n            organization\n\n            job_role\n\n          }\n\n\n\n          social_media {\n\n            link\n\n            img\n\n          }\n\n          last_login\n\n          created_by_ip\n\n          created_by\n\n          created_on\n\n          updated_by_ip\n\n          updated_on\n\n          updated_by\n          qualification {\n\n            qualification\n\n            institute\n\n            board_university\n\n            discipline\n\n            specification\n\n            year_of_passing\n\n            percentage\n\n          }\n\n        }\n\n        country_detail {\n\n          _id\n\n          countryname\n\n          countryshortcode\n\n          is_active\n\n        }\n\n        state_detail {\n\n          _id\n\n          statename\n\n          stateshortcode\n\n          country\n\n          is_active\n\n        }\n\n        district_detail {\n\n          _id\n\n          districtname\n\n          is_active\n\n        }\n\n        qualification {\n\n          board {\n\n            _id\n\n            Board_Id\n\n            Board_Name\n\n            is_active\n\n          }\n\n          discipline {\n\n            _id\n\n            discipline_id\n\n            discipline_name\n\n            discipline_code\n\n            is_active\n\n          }\n\n          institute_detail {\n\n            _id\n\n            institute_id\n\n            institute_name\n\n            institute_code\n\n            is_active\n\n          }\n\n          level_detail {\n\n            _id\n\n            level_id\n\n            level_name\n\n            level_code\n\n            is_active\n\n          }\n\n          specification_detail {\n\n            _id\n\n            specification_id\n\n            specification_name\n\n            specification_code\n\n            is_active\n\n          }\n\n          university {\n\n            _id\n\n            University_Id\n\n            University_Name\n\n            is_active\n\n          }\n\n          year_of_passing\n\n          percentage\n\n\n\n        }\n\n        language_detail {\n\n          _id\n\n          is_active\n\n          languagecode\n\n          languagename\n\n        }\n\n\n\n        progress\n                                }\n\n  }\n}\n"], ["\n  mutation view_profile($user_id: String) {\n    view_profile(user_id:$user_id)\n    {\n      success\n\n      message {\n\n        full_name\n\n\n\n        email\n\n        user_id\n\n        user_dtl {\n\n          is_admin\n\n          user_id\n\n          username\n\n          password\n\n          created_by_ip\n          created_on\n\n        }\n\n        user_mobile {\n\n          mobile_number\n\n        }\n\n        user_profile {\n\n          _id\n\n          languages_known\n\n          is_student_or_professional\n\n          about_you\n\n          certificate\n\n          user_id\n\n          profile_img\n\n          year_of_birth\n\n          doj_lxp\n\n          progress\n\n          is_active\n\n          gender\n\n          country\n\n          state\n\n          city_town\n\n          student\n\n          professional {\n\n            total_experience\n\n            organization\n\n            job_role\n\n          }\n\n\n\n          social_media {\n\n            link\n\n            img\n\n          }\n\n          last_login\n\n          created_by_ip\n\n          created_by\n\n          created_on\n\n          updated_by_ip\n\n          updated_on\n\n          updated_by\n          qualification {\n\n            qualification\n\n            institute\n\n            board_university\n\n            discipline\n\n            specification\n\n            year_of_passing\n\n            percentage\n\n          }\n\n        }\n\n        country_detail {\n\n          _id\n\n          countryname\n\n          countryshortcode\n\n          is_active\n\n        }\n\n        state_detail {\n\n          _id\n\n          statename\n\n          stateshortcode\n\n          country\n\n          is_active\n\n        }\n\n        district_detail {\n\n          _id\n\n          districtname\n\n          is_active\n\n        }\n\n        qualification {\n\n          board {\n\n            _id\n\n            Board_Id\n\n            Board_Name\n\n            is_active\n\n          }\n\n          discipline {\n\n            _id\n\n            discipline_id\n\n            discipline_name\n\n            discipline_code\n\n            is_active\n\n          }\n\n          institute_detail {\n\n            _id\n\n            institute_id\n\n            institute_name\n\n            institute_code\n\n            is_active\n\n          }\n\n          level_detail {\n\n            _id\n\n            level_id\n\n            level_name\n\n            level_code\n\n            is_active\n\n          }\n\n          specification_detail {\n\n            _id\n\n            specification_id\n\n            specification_name\n\n            specification_code\n\n            is_active\n\n          }\n\n          university {\n\n            _id\n\n            University_Id\n\n            University_Name\n\n            is_active\n\n          }\n\n          year_of_passing\n\n          percentage\n\n\n\n        }\n\n        language_detail {\n\n          _id\n\n          is_active\n\n          languagecode\n\n          languagename\n\n        }\n\n\n\n        progress\n                                }\n\n  }\n}\n"])));
var get_state_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_10 || (templateObject_10 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    mutation   get_state_details($_id: String){\n      get_state_details(\n        _id: $_id\n      ) {\n        message\n    success\n    data{\n      _id\n      statename\n      stateshortcode\n      country\n      created_by\n      created_on\n      created_by_ip\n      updated_on\n      updated_by\n      updated_by_ip\n      is_active\n    }\n      }\n    }\n    "], ["\n    mutation   get_state_details($_id: String){\n      get_state_details(\n        _id: $_id\n      ) {\n        message\n    success\n    data{\n      _id\n      statename\n      stateshortcode\n      country\n      created_by\n      created_on\n      created_by_ip\n      updated_on\n      updated_by\n      updated_by_ip\n      is_active\n    }\n      }\n    }\n    "])));
var get_district_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_11 || (templateObject_11 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation get_district_details($country: String,$state: String){\n\tget_district_details(\n\tcountry: $country,\n\tstate: $state) {\n\t  message\n    success\n    data{\n       _id\n      districtname\n   \n      created_by\n      created_on\n      created_by_ip\n      updated_on\n      updated_by\n      updated_by_ip\n      is_active\n    }\n}\n}\n"], ["\nmutation get_district_details($country: String,$state: String){\n\tget_district_details(\n\tcountry: $country,\n\tstate: $state) {\n\t  message\n    success\n    data{\n       _id\n      districtname\n   \n      created_by\n      created_on\n      created_by_ip\n      updated_on\n      updated_by\n      updated_by_ip\n      is_active\n    }\n}\n}\n"])));
var get_change_password_updateprofile = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_12 || (templateObject_12 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation get_change_password_updateprofile($username: String, $old_password: String $password: String){\n  get_change_password_updateprofile(\n    username: $username,\n    old_password: $old_password,\n    password: $password\n  ) {\n    message\nsuccess\n  }\n}\n"], ["\nmutation get_change_password_updateprofile($username: String, $old_password: String $password: String){\n  get_change_password_updateprofile(\n    username: $username,\n    old_password: $old_password,\n    password: $password\n  ) {\n    message\nsuccess\n  }\n}\n"])));
var view_profile1 = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_13 || (templateObject_13 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation view_profile($user_id: String) {\n    view_profile(user_id:$user_id) {\n    success\n    message {\n      full_name\n      email\n      user_id\n      user_mobile {\n        mobile_number\n      }\n      user_dtl{\n          username\n          created_on\n      }\n      user_profile {\n        _id\n        languages_known\n        is_student_or_professional\n        about_you\n        certificate\n        user_id\n        profile_img\n        year_of_birth\n        progress\n        is_active\n        gender\n        country\n        state\n        city_town\n        student\n        professional {\n          total_experience\n          organization\n          job_role\n        }\n        qualification{\n          discipline\n          board_university\n          qualification\n          specification\n          qualification\n          year_of_passing\n          percentage\n        }\n      }\n      country_detail {\n        countryname\n      }\n      state_detail {\n        statename\n      }\n      district_detail {\n        districtname\n      }\n     qualification {\n        board {\n          Board_Name\n        }\n        discipline {\n          discipline_name\n        }\n        institute_detail {\n          institute_name\n        }\n        level_detail {\n          level_name\n        }\n        specification_detail {\n          specification_name\n        }\n        university {\n          University_Name\n        }\n      year_of_passing\n      percentage\n      }\n      language_detail {\n        languagename\n      }\n      progress\n    }\n  }\n}\n"], ["\n  mutation view_profile($user_id: String) {\n    view_profile(user_id:$user_id) {\n    success\n    message {\n      full_name\n      email\n      user_id\n      user_mobile {\n        mobile_number\n      }\n      user_dtl{\n          username\n          created_on\n      }\n      user_profile {\n        _id\n        languages_known\n        is_student_or_professional\n        about_you\n        certificate\n        user_id\n        profile_img\n        year_of_birth\n        progress\n        is_active\n        gender\n        country\n        state\n        city_town\n        student\n        professional {\n          total_experience\n          organization\n          job_role\n        }\n        qualification{\n          discipline\n          board_university\n          qualification\n          specification\n          qualification\n          year_of_passing\n          percentage\n        }\n      }\n      country_detail {\n        countryname\n      }\n      state_detail {\n        statename\n      }\n      district_detail {\n        districtname\n      }\n     qualification {\n        board {\n          Board_Name\n        }\n        discipline {\n          discipline_name\n        }\n        institute_detail {\n          institute_name\n        }\n        level_detail {\n          level_name\n        }\n        specification_detail {\n          specification_name\n        }\n        university {\n          University_Name\n        }\n      year_of_passing\n      percentage\n      }\n      language_detail {\n        languagename\n      }\n      progress\n    }\n  }\n}\n"])));
var delete_qualification = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_14 || (templateObject_14 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n mutation delete_qualification($user_id: String,$qualification: String){\n  delete_qualification(\n    user_id: $user_id,\n    qualification: $qualification\n    ) {\n      success\n      message\n    }\n  }\n"], ["\n mutation delete_qualification($user_id: String,$qualification: String){\n  delete_qualification(\n    user_id: $user_id,\n    qualification: $qualification\n    ) {\n      success\n      message\n    }\n  }\n"])));
var update_profile = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_15 || (templateObject_15 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation update_profile($user_id: String, $is_student_or_professional: String, $profile_img: String, $year_of_birth: String, $doj_lxp: String,$qualification: [qualification_content],\n    $social_media: [social_media_content], $is_active: Boolean, $progress: String, $gender: String, $languages_known: [String],\n    $country: String, $state: String, $city_town: String, $about_you: String, $certificate: [String], $student: String,\n    $professional: professional_content, $last_login: String, $created_by_ip: String, $created_by: String, $created_on: String,\n    $updated_by_ip: String, $updated_on: String, $updated_by: String,$domain:String!){\n    update_profile(\n      user_id: $user_id,\n      profile_img: $profile_img,\n      year_of_birth: $year_of_birth,\n      doj_lxp: $doj_lxp,\n      qualification: $qualification,\n      social_media: $social_media,\n      is_active: $is_active,\n      progress: $progress,\n      gender: $gender,\n      languages_known: $languages_known,\n      country: $country,\n      state: $state,\n      city_town: $city_town,\n      about_you: $about_you,\n      certificate: $certificate,\n      is_student_or_professional: $is_student_or_professional,\n      student: $student,\n      professional: $professional,\n      last_login: $last_login,\n      created_by_ip: $created_by_ip,\n      created_by: $created_by,\n      created_on: $created_on,\n      updated_by_ip: $updated_by_ip,\n      updated_on: $updated_on,\n      updated_by: $updated_by,\n      domain:$domain\n    ) {\n      success\n      message\n\n    }\n  }\n"], ["\n  mutation update_profile($user_id: String, $is_student_or_professional: String, $profile_img: String, $year_of_birth: String, $doj_lxp: String,$qualification: [qualification_content],\n    $social_media: [social_media_content], $is_active: Boolean, $progress: String, $gender: String, $languages_known: [String],\n    $country: String, $state: String, $city_town: String, $about_you: String, $certificate: [String], $student: String,\n    $professional: professional_content, $last_login: String, $created_by_ip: String, $created_by: String, $created_on: String,\n    $updated_by_ip: String, $updated_on: String, $updated_by: String,$domain:String!){\n    update_profile(\n      user_id: $user_id,\n      profile_img: $profile_img,\n      year_of_birth: $year_of_birth,\n      doj_lxp: $doj_lxp,\n      qualification: $qualification,\n      social_media: $social_media,\n      is_active: $is_active,\n      progress: $progress,\n      gender: $gender,\n      languages_known: $languages_known,\n      country: $country,\n      state: $state,\n      city_town: $city_town,\n      about_you: $about_you,\n      certificate: $certificate,\n      is_student_or_professional: $is_student_or_professional,\n      student: $student,\n      professional: $professional,\n      last_login: $last_login,\n      created_by_ip: $created_by_ip,\n      created_by: $created_by,\n      created_on: $created_on,\n      updated_by_ip: $updated_by_ip,\n      updated_on: $updated_on,\n      updated_by: $updated_by,\n      domain:$domain\n    ) {\n      success\n      message\n\n    }\n  }\n"])));
var update_mobile_onprofile = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_16 || (templateObject_16 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation update_mobile_onprofile($user_id: String, $mobile_number: String){\n\tupdate_mobile_onprofile(\n    user_id: $user_id,\n    mobile_number: $mobile_number,\n    ) {\n\t    message\n    success\n}\n}\n"], ["\nmutation update_mobile_onprofile($user_id: String, $mobile_number: String){\n\tupdate_mobile_onprofile(\n    user_id: $user_id,\n    mobile_number: $mobile_number,\n    ) {\n\t    message\n    success\n}\n}\n"])));
var update_verifyotp_mobile_onprofile = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_17 || (templateObject_17 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation  update_verifyotp_mobile_onprofile($user_id: String, $mobile_number: String, $otp: String){\n    update_verifyotp_mobile_onprofile(\n      user_id: $user_id,\n      mobile_number: $mobile_number,\n      otp: $otp\n    ) {\n      success\n      message\n    }\n  }\n"], ["\n  mutation  update_verifyotp_mobile_onprofile($user_id: String, $mobile_number: String, $otp: String){\n    update_verifyotp_mobile_onprofile(\n      user_id: $user_id,\n      mobile_number: $mobile_number,\n      otp: $otp\n    ) {\n      success\n      message\n    }\n  }\n"])));
var update_email_onprofile = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_18 || (templateObject_18 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation update_email_onprofile($user_id: String, $email: String,$domain:String!){\n    update_email_onprofile(\n      user_id: $user_id,\n      email: $email,\n      domain:$domain\n    ) {\n      message\n      success\n    }\n  }\n"], ["\n  mutation update_email_onprofile($user_id: String, $email: String,$domain:String!){\n    update_email_onprofile(\n      user_id: $user_id,\n      email: $email,\n      domain:$domain\n    ) {\n      message\n      success\n    }\n  }\n"])));
var resend_otp_onprofile = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_19 || (templateObject_19 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation resend_otp_onprofile($user_id: String) {\n    resend_otp_onprofile(\n      user_id:$user_id\n    ) {\n      message\n      success\n    }\n  }\n"], ["\n  mutation resend_otp_onprofile($user_id: String) {\n    resend_otp_onprofile(\n      user_id:$user_id\n    ) {\n      message\n      success\n    }\n  }\n"])));
var gettopicdetail = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_20 || (templateObject_20 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation gettopicdetail($_id: String,$module_name:String) {\n    gettopicdetail(\n      _id:$_id,module_name:$module_name\n    ) {\n      data{\n        topicname\n      }\n      success\n    }\n\n  }\n"], ["\n  mutation gettopicdetail($_id: String,$module_name:String) {\n    gettopicdetail(\n      _id:$_id,module_name:$module_name\n    ) {\n      data{\n        topicname\n      }\n      success\n    }\n\n  }\n"])));
var getLevelSubCategoryData = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_21 || (templateObject_21 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation getLevelSubCategoryData($level1: [String],$level2:[String],$level3:[String]) {\n    getLevelSubCategoryData(level1:$level1,level2:$level2,level3:$level3) {\n      success\n      message,\n    data{\n      level1{\n        _id\n        isSelected\n        category_id\n        category_name\n        category_description\n        level\n      }\n      level2{\n       _id\n        sub_category_id\n        isSelected\n        sub_category_name\n        parent_category_id\n        level\n      }\n      level3{\n        _id\n        parent_category_id\n        parent_sub_category_id\n        isSelected\n        creator_id\n        level\n        super_sub_category_id\n        super_sub_category_name\n      }\n    }\n\n    }\n  }\n"], ["\n  mutation getLevelSubCategoryData($level1: [String],$level2:[String],$level3:[String]) {\n    getLevelSubCategoryData(level1:$level1,level2:$level2,level3:$level3) {\n      success\n      message,\n    data{\n      level1{\n        _id\n        isSelected\n        category_id\n        category_name\n        category_description\n        level\n      }\n      level2{\n       _id\n        sub_category_id\n        isSelected\n        sub_category_name\n        parent_category_id\n        level\n      }\n      level3{\n        _id\n        parent_category_id\n        parent_sub_category_id\n        isSelected\n        creator_id\n        level\n        super_sub_category_id\n        super_sub_category_name\n      }\n    }\n\n    }\n  }\n"])));
var getCourseCategorySearch = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_22 || (templateObject_22 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation getCourseCategorySearch($category: [String]!,$sub_category:[String]!, $super_sub_category: [String]!,\n    $course_language: [String],  $course_mode:[String],$author_details:[String],$partner_details:[String],\n    $pagenumber:Int!,$perPage: Int!, $publishedToDate: String, $publishedFromDate: String,\n    $catalogue_visibility: Int ) {\n    getCourseCategorySearch(category:$category,sub_category:$sub_category,super_sub_category:$super_sub_category,\n      course_language:$course_language,course_mode:$course_mode,author_details:$author_details,partner_details:$partner_details,\n      pagenumber:$pagenumber,perPage:$perPage, publishedToDate:$publishedToDate,\n       publishedFromDate:$publishedFromDate, catalogue_visibility: $catalogue_visibility\n      ) {\n        success\n        message\n        data{\n          course_id\n          course_description\n          course_name\n          version\n          location\n          course_start_datetime\n          course_end_datetime\n          advertised_start\n          course_img_url\n          social_sharing_url\n          certificate_display_behaviour\n          certificates_show_before_end\n          certificate_html_view_enabled\n          has_any_active_web_certificate\n          certificate_name\n          lowest_passing_grade\n          mobile_available\n          visible_to_staff_only\n          enrollment_start\n          enrollment_end\n          invitation_only\n          max_student_enrollments_allowed\n          announcement\n          catalog_visibility\n          course_video_url\n          short_description\n          self_paced\n          marketing_url\n          course_language\n          certificate_available_date\n          article_count\n          downloadable_resource_count\n          course_level\n          step_towards\n          rating\n          price\n          what_will_you_learn\n          course_category\n          course_type\n          groupid\n          created_by\n          updated_by\n          admin_id\n          is_published\n          course_mode\n          preview_video\n          learner_count\n          is_active\n          published_by\n          publisher_id\n          updated_by_id\n          user_role\n          user_id\n          user_name\n          published_on\n          updated_at\n          created_at\n          super_sub_category_id\n          pre_requisite\n          takeway_details{\n            text\n            description\n            what_will_you_learn\n            media\n          }\n          coursepartner_details{\n             name\n             image\n          }\n          category_id\n          parent_sub_category_id\n          course_content_details\n          author_details{\n            author_name\n            description\n            image\n          }\n        }\n        languageCount{\n        course_language\n        count\n        }\n        instructor{\n        authordetails\n        count\n        }\n        partner{\n        coursepartnerdetails\n        count\n        }\n        courseMode{\n        course_mode\n        count\n        }\n  }\n  }\n"], ["\n  mutation getCourseCategorySearch($category: [String]!,$sub_category:[String]!, $super_sub_category: [String]!,\n    $course_language: [String],  $course_mode:[String],$author_details:[String],$partner_details:[String],\n    $pagenumber:Int!,$perPage: Int!, $publishedToDate: String, $publishedFromDate: String,\n    $catalogue_visibility: Int ) {\n    getCourseCategorySearch(category:$category,sub_category:$sub_category,super_sub_category:$super_sub_category,\n      course_language:$course_language,course_mode:$course_mode,author_details:$author_details,partner_details:$partner_details,\n      pagenumber:$pagenumber,perPage:$perPage, publishedToDate:$publishedToDate,\n       publishedFromDate:$publishedFromDate, catalogue_visibility: $catalogue_visibility\n      ) {\n        success\n        message\n        data{\n          course_id\n          course_description\n          course_name\n          version\n          location\n          course_start_datetime\n          course_end_datetime\n          advertised_start\n          course_img_url\n          social_sharing_url\n          certificate_display_behaviour\n          certificates_show_before_end\n          certificate_html_view_enabled\n          has_any_active_web_certificate\n          certificate_name\n          lowest_passing_grade\n          mobile_available\n          visible_to_staff_only\n          enrollment_start\n          enrollment_end\n          invitation_only\n          max_student_enrollments_allowed\n          announcement\n          catalog_visibility\n          course_video_url\n          short_description\n          self_paced\n          marketing_url\n          course_language\n          certificate_available_date\n          article_count\n          downloadable_resource_count\n          course_level\n          step_towards\n          rating\n          price\n          what_will_you_learn\n          course_category\n          course_type\n          groupid\n          created_by\n          updated_by\n          admin_id\n          is_published\n          course_mode\n          preview_video\n          learner_count\n          is_active\n          published_by\n          publisher_id\n          updated_by_id\n          user_role\n          user_id\n          user_name\n          published_on\n          updated_at\n          created_at\n          super_sub_category_id\n          pre_requisite\n          takeway_details{\n            text\n            description\n            what_will_you_learn\n            media\n          }\n          coursepartner_details{\n             name\n             image\n          }\n          category_id\n          parent_sub_category_id\n          course_content_details\n          author_details{\n            author_name\n            description\n            image\n          }\n        }\n        languageCount{\n        course_language\n        count\n        }\n        instructor{\n        authordetails\n        count\n        }\n        partner{\n        coursepartnerdetails\n        count\n        }\n        courseMode{\n        course_mode\n        count\n        }\n  }\n  }\n"])));
var createGuidanceRequest = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_23 || (templateObject_23 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation create_guidance_request($name: String!,$email_id:String!, $created_by_ip : String!, $course_id : String!) {\n    create_guidance_request(\n      name:$name,\n      email_id:$email_id,\n      created_by_ip:$created_by_ip,\n      course_id:$course_id,\n    ) {\n      message\n      success\n      error_msg\n    }\n  }\n"], ["\n  mutation create_guidance_request($name: String!,$email_id:String!, $created_by_ip : String!, $course_id : String!) {\n    create_guidance_request(\n      name:$name,\n      email_id:$email_id,\n      created_by_ip:$created_by_ip,\n      course_id:$course_id,\n    ) {\n      message\n      success\n      error_msg\n    }\n  }\n"])));
var InsertCourseFeedback = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_24 || (templateObject_24 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation InsertCourseFeedback($user_id: String!, $question_id: [que_dtl], $question_ans: [question_ans_content],$course_id: String ){\n    InsertCourseFeedback(user_id: $user_id, question_id: $question_id, question_ans: $question_ans, course_id : $course_id ) {\n      success\n      message\n    }\n  }"], ["\nmutation InsertCourseFeedback($user_id: String!, $question_id: [que_dtl], $question_ans: [question_ans_content],$course_id: String ){\n    InsertCourseFeedback(user_id: $user_id, question_id: $question_id, question_ans: $question_ans, course_id : $course_id ) {\n      success\n      message\n    }\n  }"])));
var playerstatusrealtime = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_25 || (templateObject_25 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation playerstatusrealtime($user_id: String, $contentID:String,$module:[module_type_input],$percentage:String){\n  playerstatusrealtime(user_id: $user_id,contentID:$contentID,module:$module,percentage:$percentage) {\n      success\n      message\n    }\n  }"], ["\nmutation playerstatusrealtime($user_id: String, $contentID:String,$module:[module_type_input],$percentage:String){\n  playerstatusrealtime(user_id: $user_id,contentID:$contentID,module:$module,percentage:$percentage) {\n      success\n      message\n    }\n  }"])));
var CreateNewThread = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_26 || (templateObject_26 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation CreateNewThread($uid: Int!, $course_id: String!, $module_name:String!, $title:String!, $content:String!, $course_name: String!,\n$batch_id: String, $batch_name: String){\n  CreateNewThread(uid: $uid, course_id : $course_id, module_name:$module_name,title:$title,content:$content, course_name:$course_name,\n    batch_id: $batch_id, batch_name:$batch_name ) {\n    success\n    message\n  }\n}"], ["\nmutation CreateNewThread($uid: Int!, $course_id: String!, $module_name:String!, $title:String!, $content:String!, $course_name: String!,\n$batch_id: String, $batch_name: String){\n  CreateNewThread(uid: $uid, course_id : $course_id, module_name:$module_name,title:$title,content:$content, course_name:$course_name,\n    batch_id: $batch_id, batch_name:$batch_name ) {\n    success\n    message\n  }\n}"])));
var CreateNewThreadBid = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_27 || (templateObject_27 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation CreateNewThread($uid: Int!, $course_id: String!, $module_name:String!, $title:String!, $content:String!, $course_name: String!,\n$batch_id: String, $batch_name: String){\n  CreateNewThread(uid: $uid, course_id : $course_id, module_name:$module_name,title:$title,content:$content, course_name:$course_name,\n    batch_id: $batch_id, batch_name:$batch_name ) {\n    success\n    message\n  }\n}"], ["\nmutation CreateNewThread($uid: Int!, $course_id: String!, $module_name:String!, $title:String!, $content:String!, $course_name: String!,\n$batch_id: String, $batch_name: String){\n  CreateNewThread(uid: $uid, course_id : $course_id, module_name:$module_name,title:$title,content:$content, course_name:$course_name,\n    batch_id: $batch_id, batch_name:$batch_name ) {\n    success\n    message\n  }\n}"])));
var claimcourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_28 || (templateObject_28 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation claimcourse($id: String, $user_id: String, $course_id: [String], $courseName: String, $categoryName: String) {\n    claimcourse(id: $id, user_id: $user_id, course_id: $course_id, courseName: $courseName, categoryName:$categoryName) {\n      message\n      success\n    }\n  }\n"], ["\n  mutation claimcourse($id: String, $user_id: String, $course_id: [String], $courseName: String, $categoryName: String) {\n    claimcourse(id: $id, user_id: $user_id, course_id: $course_id, courseName: $courseName, categoryName:$categoryName) {\n      message\n      success\n    }\n  }\n"])));
var user_mstr_data = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_29 || (templateObject_29 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation  user_mstr_data {\n    user_mstr_data {\n      success\n        data {\n          _id\n          title\n        }\n    }\n  }\n"], ["\n  mutation  user_mstr_data {\n    user_mstr_data {\n      success\n        data {\n          _id\n          title\n        }\n    }\n  }\n"])));
var add_topic_reference = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_30 || (templateObject_30 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nmutation add_topic_reference($user_id: String!, $batch_id: String, $course_id:String!, $module_id:String!, $topic_id:String!, \n$reference_id: String,$ reference_status: Boolean, $created_by: String){\n  add_topic_reference(user_id: $user_id, batch_id : $batch_id, course_id:$course_id,module_id:$module_id,topic_id:$topic_id, reference_id:$reference_id,\n    reference_status: $reference_status, created_by:$created_by ) {\n      success\n      error_msg\n      message{\n          is_active\n          _id\n          user_id\n          batch_id\n          course_id\n          module_id\n          topic_id\n          reference_id\n          reference_status\n          created_by\n          created_on\n          updated_by\n          updated_on\n      }\n  }\n}"], ["\nmutation add_topic_reference($user_id: String!, $batch_id: String, $course_id:String!, $module_id:String!, $topic_id:String!, \n$reference_id: String,$ reference_status: Boolean, $created_by: String){\n  add_topic_reference(user_id: $user_id, batch_id : $batch_id, course_id:$course_id,module_id:$module_id,topic_id:$topic_id, reference_id:$reference_id,\n    reference_status: $reference_status, created_by:$created_by ) {\n      success\n      error_msg\n      message{\n          is_active\n          _id\n          user_id\n          batch_id\n          course_id\n          module_id\n          topic_id\n          reference_id\n          reference_status\n          created_by\n          created_on\n          updated_by\n          updated_on\n      }\n  }\n}"])));
var save_attendies = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_31 || (templateObject_31 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation  save_attendies(\n    $userid:String,\n    $activityid:String,\n    $activitynamne:String,\n    $username:String,\n    $mobile:String,\n    $email:String,\n    $status:String\n    ) {\n      save_attendies(userid:$userid,\n        activityid:$activityid,\n        activitynamne:$activitynamne,\n        username: $username,\n        mobile:$mobile,\n        email: $email,\n        status:$status){\n          success\n          message\n        }\n  }\n"], ["\n  mutation  save_attendies(\n    $userid:String,\n    $activityid:String,\n    $activitynamne:String,\n    $username:String,\n    $mobile:String,\n    $email:String,\n    $status:String\n    ) {\n      save_attendies(userid:$userid,\n        activityid:$activityid,\n        activitynamne:$activitynamne,\n        username: $username,\n        mobile:$mobile,\n        email: $email,\n        status:$status){\n          success\n          message\n        }\n  }\n"])));
var bulkclaimcourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_32 || (templateObject_32 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation bulkclaimcourse($id: String, $user_id: String, $category_id: String, $categoryName: String) {\n    bulkclaimcourse(id: $id, user_id: $user_id, category_id: $category_id, categoryName: $categoryName) {\n      message\n      success\n    }\n  }\n"], ["\n  mutation bulkclaimcourse($id: String, $user_id: String, $category_id: String, $categoryName: String) {\n    bulkclaimcourse(id: $id, user_id: $user_id, category_id: $category_id, categoryName: $categoryName) {\n      message\n      success\n    }\n  }\n"])));
var markAsRead = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_33 || (templateObject_33 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  mutation markAsRead($notifications:[String]) {\n    markAsRead(notifications : $notifications) {\n      message\n      success\n    }\n  }\n"], ["\n  mutation markAsRead($notifications:[String]) {\n    markAsRead(notifications : $notifications) {\n      message\n      success\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33;


/***/ }),

/***/ "./src/app/learner/services/operations/learner_query.ts":
/*!**************************************************************!*\
  !*** ./src/app/learner/services/operations/learner_query.ts ***!
  \**************************************************************/
/*! exports provided: login, getLoginUserDetail, get_country_details, get_course_by_user, get_qualification_details, get_board_university_details, get_discipline_details, get_specification_details, get_institute_details, get_language_details, get_user_detail, get_user_detail_username, list_content, syllabus_of_particular_scorm, getmoduleData, check_existing_user, get_all_category, get_sub_category, getsupersubcategory, get_course_by_subcategory, get_module_topic, getLevelCategoryData, getDetailsCount, getlearnertrack, getlearnerdashboarddetails, getLearnerenrolledCourses, get_trending_course, get_popular_course, getPopularcourse, getFeedbackQuestion, getCoursePlayerStatusForCourse, getAssignmentmoduleData, get_read_learner_activity, playerModuleAndTopic, ViewSingleTopicDiscussionData, ViewAllThreadDataBid, ViewAllThreadData, getReadLeanerActivity, get_organization_by_id, getCountForCategories, getCoureBasedOnCatalog, getcalenderactivity, singleBatchInfo, getCountForJobroleCategories, getprojectActivityData, getperformActivityData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoginUserDetail", function() { return getLoginUserDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_country_details", function() { return get_country_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_course_by_user", function() { return get_course_by_user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_qualification_details", function() { return get_qualification_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_board_university_details", function() { return get_board_university_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_discipline_details", function() { return get_discipline_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_specification_details", function() { return get_specification_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_institute_details", function() { return get_institute_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_language_details", function() { return get_language_details; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_user_detail", function() { return get_user_detail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_user_detail_username", function() { return get_user_detail_username; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "list_content", function() { return list_content; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syllabus_of_particular_scorm", function() { return syllabus_of_particular_scorm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getmoduleData", function() { return getmoduleData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "check_existing_user", function() { return check_existing_user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_all_category", function() { return get_all_category; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_sub_category", function() { return get_sub_category; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getsupersubcategory", function() { return getsupersubcategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_course_by_subcategory", function() { return get_course_by_subcategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_module_topic", function() { return get_module_topic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLevelCategoryData", function() { return getLevelCategoryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDetailsCount", function() { return getDetailsCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getlearnertrack", function() { return getlearnertrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getlearnerdashboarddetails", function() { return getlearnerdashboarddetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLearnerenrolledCourses", function() { return getLearnerenrolledCourses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_trending_course", function() { return get_trending_course; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_popular_course", function() { return get_popular_course; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPopularcourse", function() { return getPopularcourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFeedbackQuestion", function() { return getFeedbackQuestion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoursePlayerStatusForCourse", function() { return getCoursePlayerStatusForCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAssignmentmoduleData", function() { return getAssignmentmoduleData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_read_learner_activity", function() { return get_read_learner_activity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerModuleAndTopic", function() { return playerModuleAndTopic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewSingleTopicDiscussionData", function() { return ViewSingleTopicDiscussionData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewAllThreadDataBid", function() { return ViewAllThreadDataBid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewAllThreadData", function() { return ViewAllThreadData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReadLeanerActivity", function() { return getReadLeanerActivity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_organization_by_id", function() { return get_organization_by_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCountForCategories", function() { return getCountForCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoureBasedOnCatalog", function() { return getCoureBasedOnCatalog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getcalenderactivity", function() { return getcalenderactivity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleBatchInfo", function() { return singleBatchInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCountForJobroleCategories", function() { return getCountForJobroleCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getprojectActivityData", function() { return getprojectActivityData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getperformActivityData", function() { return getperformActivityData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


var login = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query login($username: String, $password: String, $is_admin: Boolean) {\n    login(username: $username, password: $password, is_admin: $is_admin) {\n      success\n      error_msg\n      message {\n        _id\n        full_name\n        profile_img\n        email\n        is_active\n        username\n        token\n        user_id\n        is_blocked\n        is_forum_config\n        is_thread_config\n        is_comment_config\n        is_profile_updated\n        group_id\n        message\n        bb_forum\n        nodebb_response {\n          uid\n        }\n      }\n    }\n  }\n"], ["\n  query login($username: String, $password: String, $is_admin: Boolean) {\n    login(username: $username, password: $password, is_admin: $is_admin) {\n      success\n      error_msg\n      message {\n        _id\n        full_name\n        profile_img\n        email\n        is_active\n        username\n        token\n        user_id\n        is_blocked\n        is_forum_config\n        is_thread_config\n        is_comment_config\n        is_profile_updated\n        group_id\n        message\n        bb_forum\n        nodebb_response {\n          uid\n        }\n      }\n    }\n  }\n"])));
var getLoginUserDetail = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_login_details($username: String!) {\n    get_login_details(username: $username) {\n      success\n      error_msg\n      message {\n        is_admin\n        is_active\n        is_blocked\n        is_profile_updated\n        _id\n        user_id\n        username\n        token\n        full_name\n        is_forum_config\n        is_comment_config\n        is_thread_config\n        message\n        profile_img\n        group_id\n        nodebb_response{\n            uid\n        }\n      }\n    }\n  }\n"], ["\n  query get_login_details($username: String!) {\n    get_login_details(username: $username) {\n      success\n      error_msg\n      message {\n        is_admin\n        is_active\n        is_blocked\n        is_profile_updated\n        _id\n        user_id\n        username\n        token\n        full_name\n        is_forum_config\n        is_comment_config\n        is_thread_config\n        message\n        profile_img\n        group_id\n        nodebb_response{\n            uid\n        }\n      }\n    }\n  }\n"])));
var get_country_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_country_details {\n    get_country_details {\n      message\n      success\n      data {\n        _id\n        countryname\n        countryshortcode\n        created_by\n        created_by_ip\n        updated_on\n        updated_by\n        updated_by_ip\n        is_active\n      }\n    }\n  }\n"], ["\n  query get_country_details {\n    get_country_details {\n      message\n      success\n      data {\n        _id\n        countryname\n        countryshortcode\n        created_by\n        created_by_ip\n        updated_on\n        updated_by\n        updated_by_ip\n        is_active\n      }\n    }\n  }\n"])));
var get_course_by_user = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_course_by_user($user_id: String) {\n    get_course_by_user(user_id: $user_id) {\n      success\n      error_msg\n      message {\n        feed_back\n        course_id\n        course_description\n        course_name\n        course_img_url\n        certificate_name\n        max_student_enrollments_allowed\n        short_description\n        rating\n        price\n        coursePlayerStatus {\n          status\n          location\n          course_id\n        }\n      }\n    }\n  }\n"], ["\n  query get_course_by_user($user_id: String) {\n    get_course_by_user(user_id: $user_id) {\n      success\n      error_msg\n      message {\n        feed_back\n        course_id\n        course_description\n        course_name\n        course_img_url\n        certificate_name\n        max_student_enrollments_allowed\n        short_description\n        rating\n        price\n        coursePlayerStatus {\n          status\n          location\n          course_id\n        }\n      }\n    }\n  }\n"])));
var get_qualification_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_qualification_details {\n    get_qualification_details {\n      message\n      success\n      data {\n        _id\n        level_name\n        level_code\n        level_id\n        is_active\n      }\n    }\n  }\n"], ["\n  query get_qualification_details {\n    get_qualification_details {\n      message\n      success\n      data {\n        _id\n        level_name\n        level_code\n        level_id\n        is_active\n      }\n    }\n  }\n"])));
var get_board_university_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_6 || (templateObject_6 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_board_university_details($_id: String!) {\n    get_board_university_details(_id: $_id) {\n      message\n      success\n      data {\n        board {\n          _id\n          Board_Id\n          Board_Name\n          created_on\n          created_by\n          created_by_ip\n          updated_on\n          updated_by\n          updated_by_ip\n          is_active\n        }\n        university {\n          _id\n          University_Id\n          University_Name\n          created_on\n          created_by\n          created_by_ip\n          updated_on\n          updated_by\n          updated_by_ip\n          is_active\n        }\n      }\n    }\n  }\n"], ["\n  query get_board_university_details($_id: String!) {\n    get_board_university_details(_id: $_id) {\n      message\n      success\n      data {\n        board {\n          _id\n          Board_Id\n          Board_Name\n          created_on\n          created_by\n          created_by_ip\n          updated_on\n          updated_by\n          updated_by_ip\n          is_active\n        }\n        university {\n          _id\n          University_Id\n          University_Name\n          created_on\n          created_by\n          created_by_ip\n          updated_on\n          updated_by\n          updated_by_ip\n          is_active\n        }\n      }\n    }\n  }\n"])));
var get_discipline_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_7 || (templateObject_7 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_discipline_details($_id: String!) {\n    get_discipline_details(_id: $_id) {\n      message\n      success\n      data {\n        _id\n        discipline_id\n        discipline_name\n        discipline_code\n        is_active\n      }\n    }\n  }\n"], ["\n  query get_discipline_details($_id: String!) {\n    get_discipline_details(_id: $_id) {\n      message\n      success\n      data {\n        _id\n        discipline_id\n        discipline_name\n        discipline_code\n        is_active\n      }\n    }\n  }\n"])));
var get_specification_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_8 || (templateObject_8 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_specification_details {\n    get_specification_details {\n      message\n      success\n      data {\n        _id\n        specification_id\n        specification_name\n        specification_code\n        is_active\n      }\n    }\n  }\n"], ["\n  query get_specification_details {\n    get_specification_details {\n      message\n      success\n      data {\n        _id\n        specification_id\n        specification_name\n        specification_code\n        is_active\n      }\n    }\n  }\n"])));
var get_institute_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_9 || (templateObject_9 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_institute_details {\n    get_institute_details {\n      message\n      success\n      data {\n        _id\n        institute_id\n        institute_name\n        institute_code\n        is_active\n      }\n    }\n  }\n"], ["\n  query get_institute_details {\n    get_institute_details {\n      message\n      success\n      data {\n        _id\n        institute_id\n        institute_name\n        institute_code\n        is_active\n      }\n    }\n  }\n"])));
var get_language_details = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_10 || (templateObject_10 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_language_details {\n    get_language_details {\n      message\n      success\n      data {\n        _id\n        is_active\n        languagecode\n        languagename\n      }\n    }\n  }\n"], ["\n  query get_language_details {\n    get_language_details {\n      message\n      success\n      data {\n        _id\n        is_active\n        languagecode\n        languagename\n      }\n    }\n  }\n"])));
var get_user_detail = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_11 || (templateObject_11 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_user_detail($email: String) {\n    get_user_detail(email: $email) {\n      message {\n        user_id\n        email\n        full_name\n        email_verify {\n          flag\n        }\n      }\n      success\n    }\n  }\n"], ["\n  query get_user_detail($email: String) {\n    get_user_detail(email: $email) {\n      message {\n        user_id\n        email\n        full_name\n        email_verify {\n          flag\n        }\n      }\n      success\n    }\n  }\n"])));
var get_user_detail_username = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_12 || (templateObject_12 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_user_detail_username($username: String) {\n    get_user_detail_username(username: $username) {\n      message\n      success\n    }\n  }\n"], ["\n  query get_user_detail_username($username: String) {\n    get_user_detail_username(username: $username) {\n      message\n      success\n    }\n  }\n"])));
var list_content = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_13 || (templateObject_13 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query list_content {\n    list_content {\n      message\n      success\n      data\n    }\n  }\n"], ["\n  query list_content {\n    list_content {\n      message\n      success\n      data\n    }\n  }\n"])));
var syllabus_of_particular_scorm = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_14 || (templateObject_14 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query syllabus_of_particular_scorm(\n    $contentid: String\n    $user_id: String\n    $course_id: String\n  ) {\n    syllabus_of_particular_scorm(\n      contentid: $contentid\n      user_id: $user_id\n      course_id: $course_id\n    ) {\n      message\n      success\n      data {\n        scorm_dtl_user_map {\n          title\n          children {\n            title\n            link\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query syllabus_of_particular_scorm(\n    $contentid: String\n    $user_id: String\n    $course_id: String\n  ) {\n    syllabus_of_particular_scorm(\n      contentid: $contentid\n      user_id: $user_id\n      course_id: $course_id\n    ) {\n      message\n      success\n      data {\n        scorm_dtl_user_map {\n          title\n          children {\n            title\n            link\n          }\n        }\n      }\n    }\n  }\n"])));
var getmoduleData = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_15 || (templateObject_15 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getmoduleData($courseid: String!, $user_id: String) {\n    getmoduleData(courseid: $courseid, user_id: $user_id) {\n      success\n      data {\n        playerstatusData {\n          success\n          playerstatus {\n            course_dtl {\n              module {\n                topic {\n                  topic_name\n                  status\n                }\n                module_name\n              }\n            }\n          }\n        }\n        courseid\n        _id\n        url\n        totalResourseCount\n        coursename\n        coursefile\n        coursestatus\n        coursetime\n        coursecreated_on\n        coursedetails {\n          modulename\n          modulestatus\n          modulecreated_on\n          moduledetails {\n            topicname\n            topicstatus\n            topiccreated_on\n            topicimages\n            url\n            resourse {\n              _id\n              type\n              files {\n                doc_status\n                _id\n                assignment\n                doc_type\n                path\n                type_name\n                size\n              }\n              doc_type\n              count\n            }\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query getmoduleData($courseid: String!, $user_id: String) {\n    getmoduleData(courseid: $courseid, user_id: $user_id) {\n      success\n      data {\n        playerstatusData {\n          success\n          playerstatus {\n            course_dtl {\n              module {\n                topic {\n                  topic_name\n                  status\n                }\n                module_name\n              }\n            }\n          }\n        }\n        courseid\n        _id\n        url\n        totalResourseCount\n        coursename\n        coursefile\n        coursestatus\n        coursetime\n        coursecreated_on\n        coursedetails {\n          modulename\n          modulestatus\n          modulecreated_on\n          moduledetails {\n            topicname\n            topicstatus\n            topiccreated_on\n            topicimages\n            url\n            resourse {\n              _id\n              type\n              files {\n                doc_status\n                _id\n                assignment\n                doc_type\n                path\n                type_name\n                size\n              }\n              doc_type\n              count\n            }\n          }\n        }\n      }\n    }\n  }\n"])));
var check_existing_user = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_16 || (templateObject_16 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query check_existing_user($username: String) {\n    check_existing_user(username: $username) {\n      message\n      success\n    }\n  }\n"], ["\n  query check_existing_user($username: String) {\n    check_existing_user(username: $username) {\n      message\n      success\n    }\n  }\n"])));
var get_all_category = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_17 || (templateObject_17 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_all_category($group_id: [String]!) {\n    get_all_category(group_id: $group_id) {\n      success\n      error_msg\n      message {\n        _id\n        category_name\n        category_id\n        category_description\n        language_code\n        created_on\n        updated_on\n        created_by\n        creator_id\n        is_active\n        category_image\n      }\n    }\n  }\n"], ["\n  query get_all_category($group_id: [String]!) {\n    get_all_category(group_id: $group_id) {\n      success\n      error_msg\n      message {\n        _id\n        category_name\n        category_id\n        category_description\n        language_code\n        created_on\n        updated_on\n        created_by\n        creator_id\n        is_active\n        category_image\n      }\n    }\n  }\n"])));
var get_sub_category = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_18 || (templateObject_18 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_sub_category($category_id: String!) {\n    get_sub_category(category_id: $category_id) {\n      success\n      message {\n        _id\n        sub_category_id\n        sub_category_name\n        sub_category_description\n        language_code\n        created_on\n        updated_on\n        created_by\n        creator_id\n        is_active\n        sub_category_image\n        parent_category_id\n        is_child\n      }\n      error_msg\n    }\n  }\n"], ["\n  query get_sub_category($category_id: String!) {\n    get_sub_category(category_id: $category_id) {\n      success\n      message {\n        _id\n        sub_category_id\n        sub_category_name\n        sub_category_description\n        language_code\n        created_on\n        updated_on\n        created_by\n        creator_id\n        is_active\n        sub_category_image\n        parent_category_id\n        is_child\n      }\n      error_msg\n    }\n  }\n"])));
var getsupersubcategory = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_19 || (templateObject_19 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getsupersubcategory($sub_category_id: String!) {\n    getsupersubcategory(sub_category_id: $sub_category_id) {\n      success\n      error_msg\n      message {\n        _id\n        creator_id\n        level\n        created_on\n        updated_on\n        created_by\n        language_code\n        is_active\n        super_sub_category_id\n        super_sub_category_name\n        super_sub_category_image\n        super_sub_category_description\n        parent_sub_category_id\n        parent_category_id\n      }\n    }\n  }\n"], ["\n  query getsupersubcategory($sub_category_id: String!) {\n    getsupersubcategory(sub_category_id: $sub_category_id) {\n      success\n      error_msg\n      message {\n        _id\n        creator_id\n        level\n        created_on\n        updated_on\n        created_by\n        language_code\n        is_active\n        super_sub_category_id\n        super_sub_category_name\n        super_sub_category_image\n        super_sub_category_description\n        parent_sub_category_id\n        parent_category_id\n      }\n    }\n  }\n"])));
var get_course_by_subcategory = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_20 || (templateObject_20 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_course_by_subcategory(\n    $input_id: String!\n    $input_type: String!\n    $pagenumber: Int!\n  ) {\n    get_course_by_subcategory(\n      input_id: $input_id\n      input_type: $input_type\n      pagenumber: $pagenumber\n    ) {\n      success\n      error_msg\n      total_count\n      message {\n        course_id\n        course_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        pre_requisite {\n          name\n          image\n        }\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        course_content_details {\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content {\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit {\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content {\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details {\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }\n"], ["\n  query get_course_by_subcategory(\n    $input_id: String!\n    $input_type: String!\n    $pagenumber: Int!\n  ) {\n    get_course_by_subcategory(\n      input_id: $input_id\n      input_type: $input_type\n      pagenumber: $pagenumber\n    ) {\n      success\n      error_msg\n      total_count\n      message {\n        course_id\n        course_description\n        course_name\n        created_at\n        updated_at\n        version\n        location\n        course_start_datetime\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificates_show_before_end\n        certificate_html_view_enabled\n        has_any_active_web_certificate\n        certificate_name\n        lowest_passing_grade\n        mobile_available\n        visible_to_staff_only\n        pre_requisite {\n          name\n          image\n        }\n        enrollment_start\n        enrollment_end\n        invitation_only\n        max_student_enrollments_allowed\n        announcement\n        catalog_visibility\n        course_video_url\n        short_description\n        self_paced\n        marketing_url\n        course_language\n        certificate_available_date\n        article_count\n        downloadable_resource_count\n        course_level\n        step_towards\n        rating\n        price\n        what_will_you_learn\n        course_category\n        course_type\n        course_content_details {\n          name\n          type\n          is_active\n          parent_id\n          description\n          sub_section_id\n          file_content {\n            video_url\n            image_url\n            audio_url\n            file_url\n          }\n          unit {\n            name\n            type\n            is_active\n            parent_id\n            description\n            sub_section_id\n            file_content {\n              video_url\n              image_url\n              audio_url\n              file_url\n            }\n          }\n        }\n        author_details {\n          author_name\n          description\n          image\n        }\n      }\n    }\n  }\n"])));
// export const get_all_course_by_usergroup = gql`
//   query get_all_course_by_usergroup($group_id: String!,$pagenumber: Int!,$sort_type:String!){
//     get_all_course_by_usergroup(group_id: $group_id,pagenumber: $pagenumber,sort_type: $sort_type){
//     success
//     error_msg
//     message{
//     course_id
//     course_description
//     course_name
//     enrollment_status
//     created_at
//     updated_at
//     version
//     location
//     course_start_datetime
//     course_end_datetime
//     advertised_start
//     course_img_url
//     social_sharing_url
//     certificate_display_behaviour
//     certificates_show_before_end
//     certificate_html_view_enabled
//     has_any_active_web_certificate
//     certificate_name
//     lowest_passing_grade
//     mobile_available
//     visible_to_staff_only
//     pre_requisite{
//       name
//       image
//   }
//     enrollment_start
//     enrollment_end
//     invitation_only
//     max_student_enrollments_allowed
//     announcement
//     catalog_visibility
//     course_video_url
//     short_description
//     self_paced
//     marketing_url
//     course_language
//     certificate_available_date
//     article_count
//     downloadable_resource_count
//     course_level
//     step_towards
//     rating
//     price
//     what_will_you_learn
//     course_category
//     course_type
//     course_content_details{
//     name
//     type
//     is_active
//     parent_id
//     description
//     sub_section_id
//     file_content{
//     video_url
//     image_url
//     audio_url
//     file_url
//     }
//     unit{
//     name
//     type
//     is_active
//     parent_id
//     description
//     sub_section_id
//     file_content{
//     video_url
//     image_url
//     audio_url
//     file_url
//     }
//     }
//     }
//     author_details{
//     author_name
//     description
//     image
//     }
//     }
//     }
//     }`;
var get_module_topic = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_21 || (templateObject_21 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_module_topic($course_id: String) {\n    get_module_topic(course_id: $course_id) {\n      data {\n        _id\n        modulename\n      }\n      success\n    }\n  }\n"], ["\n  query get_module_topic($course_id: String) {\n    get_module_topic(course_id: $course_id) {\n      data {\n        _id\n        modulename\n      }\n      success\n    }\n  }\n"])));
var getLevelCategoryData = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_22 || (templateObject_22 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getLevelCategoryData {\n    getLevelCategoryData {\n      success\n      message\n      data {\n        level1 {\n          _id\n          category_name\n          category_id\n          level\n        }\n        level2 {\n          _id\n          sub_category_id\n          sub_category_name\n          parent_category_id\n          level\n        }\n        level3 {\n          _id\n          parent_category_id\n          parent_sub_category_id\n          level\n          language_code\n          super_sub_category_id\n          super_sub_category_name\n        }\n      }\n    }\n  }\n"], ["\n  query getLevelCategoryData {\n    getLevelCategoryData {\n      success\n      message\n      data {\n        level1 {\n          _id\n          category_name\n          category_id\n          level\n        }\n        level2 {\n          _id\n          sub_category_id\n          sub_category_name\n          parent_category_id\n          level\n        }\n        level3 {\n          _id\n          parent_category_id\n          parent_sub_category_id\n          level\n          language_code\n          super_sub_category_id\n          super_sub_category_name\n        }\n      }\n    }\n  }\n"])));
// Guildline Search
var getDetailsCount = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_23 || (templateObject_23 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getDetailsCount {\n    getDetailsCount {\n      success\n      error_msg\n      message {\n        course_data {\n          course_language\n          count\n        }\n        author_data {\n          authordetails\n          count\n        }\n        coursepartner_data {\n          coursepartnerdetails\n          count\n        }\n        coursemode_data {\n          course_mode\n          count\n        }\n        other_data {\n          fieldCount\n          affectedRows\n          insertId\n          serverStatus\n          warningCount\n          message\n          protocol41\n          changedRows\n        }\n      }\n    }\n  }\n"], ["\n  query getDetailsCount {\n    getDetailsCount {\n      success\n      error_msg\n      message {\n        course_data {\n          course_language\n          count\n        }\n        author_data {\n          authordetails\n          count\n        }\n        coursepartner_data {\n          coursepartnerdetails\n          count\n        }\n        coursemode_data {\n          course_mode\n          count\n        }\n        other_data {\n          fieldCount\n          affectedRows\n          insertId\n          serverStatus\n          warningCount\n          message\n          protocol41\n          changedRows\n        }\n      }\n    }\n  }\n"])));
var getlearnertrack = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_24 || (templateObject_24 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_learner_track($user_id: String!, $_id: String!) {\n    get_learner_track(user_id: $user_id, _id: $_id) {\n      success\n      error_msg\n      message {\n        activities_and_enroll {\n          _id\n          last_logout\n          last_login\n          courseObjects {\n            course_id\n            course_active_time\n            status\n            course_description\n            course_name\n            course_start_datetime\n            course_end_datetime\n            enrollment_start\n            enrollment_end\n            author_details {\n              author_name\n              description\n              image\n            }\n          }\n        }\n        Enrolled_courses {\n          status\n          is_active\n          _id\n          user_id\n          group_id\n          course_id\n          created_at\n          updated_at\n          status_reason\n          course_description\n          course_name\n          course_start_datetime\n          course_end_datetime\n          enrollment_start\n          enrollment_end\n          author_details {\n            author_name\n            description\n            image\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query get_learner_track($user_id: String!, $_id: String!) {\n    get_learner_track(user_id: $user_id, _id: $_id) {\n      success\n      error_msg\n      message {\n        activities_and_enroll {\n          _id\n          last_logout\n          last_login\n          courseObjects {\n            course_id\n            course_active_time\n            status\n            course_description\n            course_name\n            course_start_datetime\n            course_end_datetime\n            enrollment_start\n            enrollment_end\n            author_details {\n              author_name\n              description\n              image\n            }\n          }\n        }\n        Enrolled_courses {\n          status\n          is_active\n          _id\n          user_id\n          group_id\n          course_id\n          created_at\n          updated_at\n          status_reason\n          course_description\n          course_name\n          course_start_datetime\n          course_end_datetime\n          enrollment_start\n          enrollment_end\n          author_details {\n            author_name\n            description\n            image\n          }\n        }\n      }\n    }\n  }\n"])));
var getlearnerdashboarddetails = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_25 || (templateObject_25 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getlearnerdashboarddetails($user_id: String) {\n    getlearnerdashboarddetails(user_id: $user_id) {\n      success\n      message\n      data {\n        courseEnrolled {\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        suspend {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        incomplete {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        completed {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        lastAccessedCourses {\n          course_id\n          course_name\n          course_description\n          course_img_url\n          coursePlayerStatus {\n            _id\n            course_id\n            course_percentage\n            location\n            status\n            updated_on\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query getlearnerdashboarddetails($user_id: String) {\n    getlearnerdashboarddetails(user_id: $user_id) {\n      success\n      message\n      data {\n        courseEnrolled {\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        suspend {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        incomplete {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        completed {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        lastAccessedCourses {\n          course_id\n          course_name\n          course_description\n          course_img_url\n          coursePlayerStatus {\n            _id\n            course_id\n            course_percentage\n            location\n            status\n            updated_on\n          }\n        }\n      }\n    }\n  }\n"])));
var getLearnerenrolledCourses = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_26 || (templateObject_26 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getLearnerenrolledCourses(\n    $user_id: String\n    $user_obj_id: String\n    $catalogue_id: String\n    $category_id: String\n    $jobRoleCategoryId: String\n    $searchString: String\n  ) {\n    getLearnerenrolledCourses(\n      user_id: $user_id\n      user_obj_id: $user_obj_id\n      catalogue_id: $catalogue_id\n      category_id: $category_id\n      jobRoleCategoryId: $jobRoleCategoryId\n      searchString: $searchString\n    ) {\n      success\n      message\n      data {\n        suspend {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        incomplete {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        courseEnrolled {\n          course_id\n          course_type\n          course_mode\n          course_start_datetime\n          course_end_datetime\n          course_name\n          course_description\n          short_description\n          author_details {\n            author_name\n            description\n            image\n          }\n          course_img_url\n          rating\n          price\n          totalLearners\n          assignmentCount\n          forumCount\n          categoryName\n          batchCourse\n          upComingLiveClassRoom{\n            courseid\n            link\n            activitytype\n            startdate\n            enddate\n            status\n          }\n          course_duration\n          coursePlayerStatus {\n            status\n            course_percentage\n            feedback_status\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query getLearnerenrolledCourses(\n    $user_id: String\n    $user_obj_id: String\n    $catalogue_id: String\n    $category_id: String\n    $jobRoleCategoryId: String\n    $searchString: String\n  ) {\n    getLearnerenrolledCourses(\n      user_id: $user_id\n      user_obj_id: $user_obj_id\n      catalogue_id: $catalogue_id\n      category_id: $category_id\n      jobRoleCategoryId: $jobRoleCategoryId\n      searchString: $searchString\n    ) {\n      success\n      message\n      data {\n        suspend {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        incomplete {\n          _id\n          totalCount\n          IncDecPec\n          valueIncDecPec\n        }\n        courseEnrolled {\n          course_id\n          course_type\n          course_mode\n          course_start_datetime\n          course_end_datetime\n          course_name\n          course_description\n          short_description\n          author_details {\n            author_name\n            description\n            image\n          }\n          course_img_url\n          rating\n          price\n          totalLearners\n          assignmentCount\n          forumCount\n          categoryName\n          batchCourse\n          upComingLiveClassRoom{\n            courseid\n            link\n            activitytype\n            startdate\n            enddate\n            status\n          }\n          course_duration\n          coursePlayerStatus {\n            status\n            course_percentage\n            feedback_status\n          }\n        }\n      }\n    }\n  }\n"])));
var get_trending_course = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_27 || (templateObject_27 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_trending_course {\n    get_trending_course {\n      success\n      error_msg\n      total_count\n      data {\n        course_id\n        course_description\n        course_name\n        course_start_datetime\n        course_end_datetime\n        enrollment_start\n        enrollment_end\n        course_img_url\n        short_description\n      }\n    }\n  }\n"], ["\n  query get_trending_course {\n    get_trending_course {\n      success\n      error_msg\n      total_count\n      data {\n        course_id\n        course_description\n        course_name\n        course_start_datetime\n        course_end_datetime\n        enrollment_start\n        enrollment_end\n        course_img_url\n        short_description\n      }\n    }\n  }\n"])));
var get_popular_course = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_28 || (templateObject_28 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_popular_course {\n    get_popular_course {\n      success\n      error_msg\n      total_count\n      data {\n        course_id\n        course_description\n        course_name\n        course_start_datetime\n        course_end_datetime\n        enrollment_start\n        enrollment_end\n        course_img_url\n        short_description\n      }\n    }\n  }\n"], ["\n  query get_popular_course {\n    get_popular_course {\n      success\n      error_msg\n      total_count\n      data {\n        course_id\n        course_description\n        course_name\n        course_start_datetime\n        course_end_datetime\n        enrollment_start\n        enrollment_end\n        course_img_url\n        short_description\n      }\n    }\n  }\n"])));
// getting popular course
var getPopularcourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_29 || (templateObject_29 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getPopularcourse {\n    getPopularcourse {\n      success\n      error_msg\n      data {\n        course_id\n        course_name\n        course_img_url\n        course_description\n        rating\n        price\n        learner_count\n        enrollment_end\n        enrollment_start\n      }\n    }\n  }\n"], ["\n  query getPopularcourse {\n    getPopularcourse {\n      success\n      error_msg\n      data {\n        course_id\n        course_name\n        course_img_url\n        course_description\n        rating\n        price\n        learner_count\n        enrollment_end\n        enrollment_start\n      }\n    }\n  }\n"])));
var getFeedbackQuestion = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_30 || (templateObject_30 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getFeedbackQuestion {\n    getFeedbackQuestion {\n      message\n      success\n      success\n      message\n      data {\n        _id\n        question\n      }\n    }\n  }\n"], ["\n  query getFeedbackQuestion {\n    getFeedbackQuestion {\n      message\n      success\n      success\n      message\n      data {\n        _id\n        question\n      }\n    }\n  }\n"])));
var getCoursePlayerStatusForCourse = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_31 || (templateObject_31 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getCoursePlayerStatusForCourse($user_id: String!, $course_id: String!) {\n    getCoursePlayerStatusForCourse(user_id: $user_id, course_id: $course_id) {\n      success\n      message {\n        _id\n        status\n        location\n        course_id\n        feedback_status\n        course_percentage\n      }\n    }\n  }\n"], ["\n  query getCoursePlayerStatusForCourse($user_id: String!, $course_id: String!) {\n    getCoursePlayerStatusForCourse(user_id: $user_id, course_id: $course_id) {\n      success\n      message {\n        _id\n        status\n        location\n        course_id\n        feedback_status\n        course_percentage\n      }\n    }\n  }\n"])));
var getAssignmentmoduleData = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_32 || (templateObject_32 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getAssignmentmoduleData($courseid: String, $user_id: String) {\n    getAssignmentmoduleData(courseid: $courseid, user_id: $user_id) {\n      success\n      message\n      data {\n        courseid\n        coursedetails {\n          modulename\n          moduledetails {\n            topicname\n            topicimages\n            url\n            resourse {\n              assignment_count\n              type\n              type_name\n              doc_type\n              _id\n              files {\n                _id\n                assignment\n                path\n                type_name\n                doc_status\n                grade_status\n                score_mark\n                resubmit\n                doc_type\n                score\n                startDate\n                endDate\n              }\n            }\n          }\n        }\n        courseEndDate\n        courseStartDate\n      }\n    }\n  }\n"], ["\n  query getAssignmentmoduleData($courseid: String, $user_id: String) {\n    getAssignmentmoduleData(courseid: $courseid, user_id: $user_id) {\n      success\n      message\n      data {\n        courseid\n        coursedetails {\n          modulename\n          moduledetails {\n            topicname\n            topicimages\n            url\n            resourse {\n              assignment_count\n              type\n              type_name\n              doc_type\n              _id\n              files {\n                _id\n                assignment\n                path\n                type_name\n                doc_status\n                grade_status\n                score_mark\n                resubmit\n                doc_type\n                score\n                startDate\n                endDate\n              }\n            }\n          }\n        }\n        courseEndDate\n        courseStartDate\n      }\n    }\n  }\n"])));
var get_read_learner_activity = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_33 || (templateObject_33 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_read_learner_activity($userid: String!, $date: String!) {\n    get_read_learner_activity(userid: $userid, date: $date) {\n      success\n      error_msg\n      message {\n        _id\n        status\n        activity_details {\n          topicname\n          status\n          courseid\n          coursename\n          modulename\n          startdate\n          enddate\n          activitytype\n          activityname\n          resourcefile {\n            assignment\n            checked\n            doc_type\n            filename\n            path\n            size\n            type_name\n            _id\n          }\n\n          score\n          link\n          created_on\n          createdby_name\n          createdby_role\n          createdby_id\n        }\n      }\n    }\n  }\n"], ["\n  query get_read_learner_activity($userid: String!, $date: String!) {\n    get_read_learner_activity(userid: $userid, date: $date) {\n      success\n      error_msg\n      message {\n        _id\n        status\n        activity_details {\n          topicname\n          status\n          courseid\n          coursename\n          modulename\n          startdate\n          enddate\n          activitytype\n          activityname\n          resourcefile {\n            assignment\n            checked\n            doc_type\n            filename\n            path\n            size\n            type_name\n            _id\n          }\n\n          score\n          link\n          created_on\n          createdby_name\n          createdby_role\n          createdby_id\n        }\n      }\n    }\n  }\n"])));
var playerModuleAndTopic = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_34 || (templateObject_34 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query playerModuleAndTopic($contentID: String, $user_id: String) {\n    playerModuleAndTopic(contentID: $contentID, user_id: $user_id) {\n      message {\n        _id\n        url\n        total_topic_len\n        course_id\n        childData {\n          title\n          _id\n          status\n          topic_len\n          moduletime\n          children {\n            _id\n            title\n            link\n            status\n            isVisible\n          }\n        }\n      }\n      success\n    }\n  }\n"], ["\n  query playerModuleAndTopic($contentID: String, $user_id: String) {\n    playerModuleAndTopic(contentID: $contentID, user_id: $user_id) {\n      message {\n        _id\n        url\n        total_topic_len\n        course_id\n        childData {\n          title\n          _id\n          status\n          topic_len\n          moduletime\n          children {\n            _id\n            title\n            link\n            status\n            isVisible\n          }\n        }\n      }\n      success\n    }\n  }\n"])));
var ViewSingleTopicDiscussionData = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_35 || (templateObject_35 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query ViewSingleTopicDiscussionData($topic_slug: String, $uid: Int!) {\n    ViewSingleTopicDiscussionData(topic_slug: $topic_slug, uid: $uid) {\n      success\n      message\n      data {\n        cid\n        mainPid\n        postcount\n        slug\n        tid\n        title\n        uid\n        viewcount\n        titleRaw\n        timestampISO\n        lastposttimeISO\n        bookmark\n        bookmarkThreshold\n        category {\n          cid\n          name\n          description\n          link\n          numRecentReplies\n          parentCid\n          post_count\n          slug\n          topic_count\n          totalPostCount\n          totalTopicCount\n        }\n        posts {\n          content\n          local_content\n          deleted\n          pid\n          tid\n          uid\n          a2i_lable\n          toPid\n          bookmarks\n          upvotes\n          downvotes\n          votes\n          timestampISO\n          user {\n            fullname\n            postcount\n            uid\n            username\n            userslug\n            lastonlineISO\n            picture\n          }\n          bookmarked\n          upvoted\n          downvoted\n          selfPost\n          index\n        }\n      }\n    }\n  }\n"], ["\n  query ViewSingleTopicDiscussionData($topic_slug: String, $uid: Int!) {\n    ViewSingleTopicDiscussionData(topic_slug: $topic_slug, uid: $uid) {\n      success\n      message\n      data {\n        cid\n        mainPid\n        postcount\n        slug\n        tid\n        title\n        uid\n        viewcount\n        titleRaw\n        timestampISO\n        lastposttimeISO\n        bookmark\n        bookmarkThreshold\n        category {\n          cid\n          name\n          description\n          link\n          numRecentReplies\n          parentCid\n          post_count\n          slug\n          topic_count\n          totalPostCount\n          totalTopicCount\n        }\n        posts {\n          content\n          local_content\n          deleted\n          pid\n          tid\n          uid\n          a2i_lable\n          toPid\n          bookmarks\n          upvotes\n          downvotes\n          votes\n          timestampISO\n          user {\n            fullname\n            postcount\n            uid\n            username\n            userslug\n            lastonlineISO\n            picture\n          }\n          bookmarked\n          upvoted\n          downvoted\n          selfPost\n          index\n        }\n      }\n    }\n  }\n"])));
var ViewAllThreadDataBid = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_36 || (templateObject_36 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query ViewAllThreadData($module_name: String, $course_id: String, $batch_id: String) {\n    ViewAllThreadData(module_name: $module_name, course_id: $course_id, batch_id: $batch_id) {\n      success\n      message\n      data {\n        cid\n        description\n        name\n        numRecentReplies\n        order\n        parentCid\n        post_count\n        slug\n        topic_count\n        totalPostCount\n        totalTopicCount\n        title\n        topics {\n          cid\n          thread_status\n          deleted\n          postcount\n          slug\n          tid\n          title\n          uid\n          viewcount\n          titleRaw\n          timestampISO\n          lastposttimeISO\n          category {\n            name\n            cid\n          }\n          user {\n            fullname\n            picture\n            postcount\n            status\n            uid\n            username\n            userslug\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query ViewAllThreadData($module_name: String, $course_id: String, $batch_id: String) {\n    ViewAllThreadData(module_name: $module_name, course_id: $course_id, batch_id: $batch_id) {\n      success\n      message\n      data {\n        cid\n        description\n        name\n        numRecentReplies\n        order\n        parentCid\n        post_count\n        slug\n        topic_count\n        totalPostCount\n        totalTopicCount\n        title\n        topics {\n          cid\n          thread_status\n          deleted\n          postcount\n          slug\n          tid\n          title\n          uid\n          viewcount\n          titleRaw\n          timestampISO\n          lastposttimeISO\n          category {\n            name\n            cid\n          }\n          user {\n            fullname\n            picture\n            postcount\n            status\n            uid\n            username\n            userslug\n          }\n        }\n      }\n    }\n  }\n"])));
var ViewAllThreadData = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_37 || (templateObject_37 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query ViewAllThreadData(\n    $module_name: String\n    $course_id: String\n    $batch_id: String\n  ) {\n    ViewAllThreadData(\n      module_name: $module_name\n      course_id: $course_id\n      batch_id: $batch_id\n    ) {\n      success\n      message\n      data {\n        cid\n        description\n        name\n        numRecentReplies\n        order\n        parentCid\n        post_count\n        slug\n        topic_count\n        totalPostCount\n        totalTopicCount\n        title\n        topics {\n          cid\n          thread_status\n          deleted\n          postcount\n          slug\n          tid\n          title\n          uid\n          viewcount\n          titleRaw\n          timestampISO\n          lastposttimeISO\n          category {\n            name\n            cid\n          }\n          user {\n            fullname\n            picture\n            postcount\n            status\n            uid\n            username\n            userslug\n          }\n        }\n      }\n    }\n  }\n"], ["\n  query ViewAllThreadData(\n    $module_name: String\n    $course_id: String\n    $batch_id: String\n  ) {\n    ViewAllThreadData(\n      module_name: $module_name\n      course_id: $course_id\n      batch_id: $batch_id\n    ) {\n      success\n      message\n      data {\n        cid\n        description\n        name\n        numRecentReplies\n        order\n        parentCid\n        post_count\n        slug\n        topic_count\n        totalPostCount\n        totalTopicCount\n        title\n        topics {\n          cid\n          thread_status\n          deleted\n          postcount\n          slug\n          tid\n          title\n          uid\n          viewcount\n          titleRaw\n          timestampISO\n          lastposttimeISO\n          category {\n            name\n            cid\n          }\n          user {\n            fullname\n            picture\n            postcount\n            status\n            uid\n            username\n            userslug\n          }\n        }\n      }\n    }\n  }\n"])));
var getReadLeanerActivity = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_38 || (templateObject_38 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_read_learner_activity($userid: String!, $date: String!) {\n    get_read_learner_activity(userid: $userid, date: $date) {\n      success\n      error_msg\n      message {\n        _id\n        status\n        activity_details {\n          topicname\n          status\n          courseid\n          coursename\n          modulename\n          startdate\n          enddate\n          activitytype\n          activityname\n          resourcefile {\n            assignment\n            checked\n            doc_type\n            filename\n            path\n            size\n            type_name\n            _id\n          }\n\n          score\n          link\n          created_on\n          createdby_name\n          createdby_role\n          createdby_id\n        }\n      }\n    }\n  }\n"], ["\n  query get_read_learner_activity($userid: String!, $date: String!) {\n    get_read_learner_activity(userid: $userid, date: $date) {\n      success\n      error_msg\n      message {\n        _id\n        status\n        activity_details {\n          topicname\n          status\n          courseid\n          coursename\n          modulename\n          startdate\n          enddate\n          activitytype\n          activityname\n          resourcefile {\n            assignment\n            checked\n            doc_type\n            filename\n            path\n            size\n            type_name\n            _id\n          }\n\n          score\n          link\n          created_on\n          createdby_name\n          createdby_role\n          createdby_id\n        }\n      }\n    }\n  }\n"])));
var get_organization_by_id = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_39 || (templateObject_39 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query get_organization_by_id($organization_id: String) {\n    get_organization_by_id(organization_id: $organization_id) {\n      success\n      error_msg\n      message {\n        _id\n        is_active\n        organization_name\n        organization_logo\n        organization_id\n        created_by\n        created_on\n        updated_on\n        updated_by\n        learner_login_image\n        role_details {\n          _id\n          role_id\n          role_name\n        }\n        admin_details {\n          _id\n          admin_email\n          admin_username\n        }\n        group_details {\n          _id\n          group_id\n          group_name\n        }\n      }\n    }\n  }\n"], ["\n  query get_organization_by_id($organization_id: String) {\n    get_organization_by_id(organization_id: $organization_id) {\n      success\n      error_msg\n      message {\n        _id\n        is_active\n        organization_name\n        organization_logo\n        organization_id\n        created_by\n        created_on\n        updated_on\n        updated_by\n        learner_login_image\n        role_details {\n          _id\n          role_id\n          role_name\n        }\n        admin_details {\n          _id\n          admin_email\n          admin_username\n        }\n        group_details {\n          _id\n          group_id\n          group_name\n        }\n      }\n    }\n  }\n"])));
var getCountForCategories = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_40 || (templateObject_40 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getCountForCategories($userObjId: String!) {\n    getCountForCategories(userObjId: $userObjId) {\n      message\n      success\n      data{\n        catalogueId\n        catalogueName\n        categories{\n          categoryId\n          categoryName\n          totalCount\n          enrollCount\n          subCategory{\n            subCategoryId\n            subCategoryName\n            totalCount\n            superSubCategory{\n              superSubCategoryId\n              superSubCategoryName\n              totalCount\n            }\n          }\n        }\n      }\n      }\n    }\n"], ["\n  query getCountForCategories($userObjId: String!) {\n    getCountForCategories(userObjId: $userObjId) {\n      message\n      success\n      data{\n        catalogueId\n        catalogueName\n        categories{\n          categoryId\n          categoryName\n          totalCount\n          enrollCount\n          subCategory{\n            subCategoryId\n            subCategoryName\n            totalCount\n            superSubCategory{\n              superSubCategoryId\n              superSubCategoryName\n              totalCount\n            }\n          }\n        }\n      }\n      }\n    }\n"])));
var getCoureBasedOnCatalog = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_41 || (templateObject_41 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getCoureBasedOnCatalog($catalogue_id: String!, $category_id: String!,\n    $userObjId: String!, $subCategoryId: String, $superSubCategoryId: String) {\n    getCoureBasedOnCatalog(catalogue_id: $catalogue_id,\n      category_id: $category_id, userObjId: $userObjId, subCategoryId: $subCategoryId,\n      superSubCategoryId: $superSubCategoryId) {\n      data{\n        course_id\n        clamaiedStatus\n        course_description\n        course_name\n        version\n        course_start_datetime\n        location\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificate_name\n        enrollment_start\n        mobile_available\n        short_description\n      }\n    }\n  }\n"], ["\n  query getCoureBasedOnCatalog($catalogue_id: String!, $category_id: String!,\n    $userObjId: String!, $subCategoryId: String, $superSubCategoryId: String) {\n    getCoureBasedOnCatalog(catalogue_id: $catalogue_id,\n      category_id: $category_id, userObjId: $userObjId, subCategoryId: $subCategoryId,\n      superSubCategoryId: $superSubCategoryId) {\n      data{\n        course_id\n        clamaiedStatus\n        course_description\n        course_name\n        version\n        course_start_datetime\n        location\n        course_end_datetime\n        advertised_start\n        course_img_url\n        social_sharing_url\n        certificate_display_behaviour\n        certificate_name\n        enrollment_start\n        mobile_available\n        short_description\n      }\n    }\n  }\n"])));
var getcalenderactivity = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_42 || (templateObject_42 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getcalenderactivity($userid: String!, $date: String!) {\n    getcalenderactivity(userid: $userid, date: $date) {\n      success\n      error_msg\n      message {\n        start\n        end\n        title\n      }\n    }\n  }\n"], ["\n  query getcalenderactivity($userid: String!, $date: String!) {\n    getcalenderactivity(userid: $userid, date: $date) {\n      success\n      error_msg\n      message {\n        start\n        end\n        title\n      }\n    }\n  }\n"])));
var singleBatchInfo = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_43 || (templateObject_43 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getbatchdetails($user_id: String!, $course_id: String!) {\n    getbatchdetails(user_id: $user_id, course_id: $course_id) {\n      success\n      message {\n        _id\n        batchname\n        batchdescription\n        batchstartdate\n        batchenddate\n        isTeams\n        created_on\n        batchid\n      }\n    }\n  }\n"], ["\n  query getbatchdetails($user_id: String!, $course_id: String!) {\n    getbatchdetails(user_id: $user_id, course_id: $course_id) {\n      success\n      message {\n        _id\n        batchname\n        batchdescription\n        batchstartdate\n        batchenddate\n        isTeams\n        created_on\n        batchid\n      }\n    }\n  }\n"])));
var getCountForJobroleCategories = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_44 || (templateObject_44 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getCountForJobroleCategories($userObjId: String!) {\n    getCountForJobroleCategories(userObjId: $userObjId) {\n      success\n      message\n      data {\n        jobroleCategoryId\n        jobroleCategoryName\n        jobroleEnrollCount\n      }\n    }\n  }\n      "], ["\n  query getCountForJobroleCategories($userObjId: String!) {\n    getCountForJobroleCategories(userObjId: $userObjId) {\n      success\n      message\n      data {\n        jobroleCategoryId\n        jobroleCategoryName\n        jobroleEnrollCount\n      }\n    }\n  }\n      "])));
var getprojectActivityData = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_45 || (templateObject_45 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      query getprojectActivityData($userId: String, $courseId: String){\n        getprojectActivityData(userId: $userId, courseId: $courseId){\n        success\n        data {\n        _id\n        projectActivity {\n        activitystartdate\n        activityenddate\n        submit_status\n        course_id\n        batchid\n        activityId\n        module_id\n        activityname\n        topic_id\n        evaluationmode\n        projecttype\n        total_mark\n        score_mark\n        submitted_on\n        submitted_date\n        grade_status\n        instructor_status\n        comments\n        groupname\n        groupcount\n        videodetails{\n        id\n        videourl\n        name\n        size\n        }\n        materialDetails{\n        id\n        materialurl\n        name\n        doctype\n        size\n        }\n        groupDetails{\n        id\n        name\n        username\n        email\n        }\n        }\n        }\n        }\n        }\n"], ["\n      query getprojectActivityData($userId: String, $courseId: String){\n        getprojectActivityData(userId: $userId, courseId: $courseId){\n        success\n        data {\n        _id\n        projectActivity {\n        activitystartdate\n        activityenddate\n        submit_status\n        course_id\n        batchid\n        activityId\n        module_id\n        activityname\n        topic_id\n        evaluationmode\n        projecttype\n        total_mark\n        score_mark\n        submitted_on\n        submitted_date\n        grade_status\n        instructor_status\n        comments\n        groupname\n        groupcount\n        videodetails{\n        id\n        videourl\n        name\n        size\n        }\n        materialDetails{\n        id\n        materialurl\n        name\n        doctype\n        size\n        }\n        groupDetails{\n        id\n        name\n        username\n        email\n        }\n        }\n        }\n        }\n        }\n"])));
var getperformActivityData = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_46 || (templateObject_46 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\nquery getperformActivityData($userId: String , $courseId: String) {\n  getperformActivityData(userId: $userId , courseId: $courseId ) {\n    success\n    data {\n    _id\n    performActivity {\n    activitystartdate\n    activityenddate\n    cardstatus\n    course_id\n    batchid\n    activityId\n    iterationTotal\n    modulename\n    activityname\n    topicname\n    evaluationmode\n    performtype\n    submittedTotal\n    materialDetails{\n    id\n    materialurl\n    name\n    doctype\n    size\n    }\n    iterationDetails{\n    iterationid\n    iterationcount\n    iterationstatus\n    totalmark\n    scoremark\n    submitted_on\n    submitted_date\n    grade_status\n    instructor_status\n    comments\n    videodetails{\n    id\n    videourl\n    name\n    size\n    }\n    assessmentreport{\n    id\n    imageurl\n    name\n    doctype\n    size\n    }\n    }\n    }\n    }\n  }\n}\n    "], ["\nquery getperformActivityData($userId: String , $courseId: String) {\n  getperformActivityData(userId: $userId , courseId: $courseId ) {\n    success\n    data {\n    _id\n    performActivity {\n    activitystartdate\n    activityenddate\n    cardstatus\n    course_id\n    batchid\n    activityId\n    iterationTotal\n    modulename\n    activityname\n    topicname\n    evaluationmode\n    performtype\n    submittedTotal\n    materialDetails{\n    id\n    materialurl\n    name\n    doctype\n    size\n    }\n    iterationDetails{\n    iterationid\n    iterationcount\n    iterationstatus\n    totalmark\n    scoremark\n    submitted_on\n    submitted_date\n    grade_status\n    instructor_status\n    comments\n    videodetails{\n    id\n    videourl\n    name\n    size\n    }\n    assessmentreport{\n    id\n    imageurl\n    name\n    doctype\n    size\n    }\n    }\n    }\n    }\n  }\n}\n    "])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46;


/***/ }),

/***/ "./src/app/not-found/not-found.component.html":
/*!****************************************************!*\
  !*** ./src/app/not-found/not-found.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  <main>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-6 align-self-center\">\n          <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            viewBox=\"0 0 800 600\">\n            <g>\n              <defs>\n                <clipPath id=\"GlassClip\">\n                  <path\n                    d=\"M380.857,346.164c-1.247,4.651-4.668,8.421-9.196,10.06c-9.332,3.377-26.2,7.817-42.301,3.5\n                  s-28.485-16.599-34.877-24.192c-3.101-3.684-4.177-8.66-2.93-13.311l7.453-27.798c0.756-2.82,3.181-4.868,6.088-5.13\n                  c6.755-0.61,20.546-0.608,41.785,5.087s33.181,12.591,38.725,16.498c2.387,1.682,3.461,4.668,2.705,7.488L380.857,346.164z\" />\n                </clipPath>\n                <clipPath id=\"cordClip\">\n                  <rect width=\"800\" height=\"600\" />\n                </clipPath>\n              </defs>\n  \n              <g id=\"planet\">\n                <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-miterlimit=\"10\" cx=\"572.859\" cy=\"108.803\"\n                  r=\"90.788\" />\n  \n                <circle id=\"craterBig\" fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-miterlimit=\"10\" cx=\"548.891\"\n                  cy=\"62.319\" r=\"13.074\" />\n  \n                <circle id=\"craterSmall\" fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-miterlimit=\"10\" cx=\"591.743\"\n                  cy=\"158.918\" r=\"7.989\" />\n                <path id=\"ring\" fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\"\n                  stroke-miterlimit=\"10\" d=\"\n              M476.562,101.461c-30.404,2.164-49.691,4.221-49.691,8.007c0,6.853,63.166,12.408,141.085,12.408s141.085-5.555,141.085-12.408\n              c0-3.378-15.347-4.988-40.243-7.225\" />\n  \n                <path id=\"ringShadow\" opacity=\"0.5\" fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\"\n                  stroke-miterlimit=\"10\" d=\"\n              M483.985,127.43c23.462,1.531,52.515,2.436,83.972,2.436c36.069,0,68.978-1.19,93.922-3.149\" />\n              </g>\n              <g id=\"stars\">\n                <g id=\"starsBig\">\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"518.07\" y1=\"245.375\" x2=\"518.07\" y2=\"266.581\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"508.129\" y1=\"255.978\" x2=\"528.01\" y2=\"255.978\" />\n                  </g>\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"154.55\" y1=\"231.391\" x2=\"154.55\" y2=\"252.598\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"144.609\" y1=\"241.995\" x2=\"164.49\" y2=\"241.995\" />\n                  </g>\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"320.135\" y1=\"132.746\" x2=\"320.135\" y2=\"153.952\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"310.194\" y1=\"143.349\" x2=\"330.075\" y2=\"143.349\" />\n                  </g>\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"200.67\" y1=\"483.11\" x2=\"200.67\" y2=\"504.316\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"210.611\" y1=\"493.713\" x2=\"190.73\" y2=\"493.713\" />\n                  </g>\n                </g>\n                <g id=\"starsSmall\">\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"432.173\" y1=\"380.52\" x2=\"432.173\" y2=\"391.83\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"426.871\" y1=\"386.175\" x2=\"437.474\" y2=\"386.175\" />\n                  </g>\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"489.555\" y1=\"299.765\" x2=\"489.555\" y2=\"308.124\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"485.636\" y1=\"303.945\" x2=\"493.473\" y2=\"303.945\" />\n                  </g>\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"231.468\" y1=\"291.009\" x2=\"231.468\" y2=\"299.369\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"227.55\" y1=\"295.189\" x2=\"235.387\" y2=\"295.189\" />\n                  </g>\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"244.032\" y1=\"547.539\" x2=\"244.032\" y2=\"555.898\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"247.95\" y1=\"551.719\" x2=\"240.113\" y2=\"551.719\" />\n                  </g>\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"186.359\" y1=\"406.967\" x2=\"186.359\" y2=\"415.326\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"190.277\" y1=\"411.146\" x2=\"182.44\" y2=\"411.146\" />\n                  </g>\n                  <g>\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"480.296\" y1=\"406.967\" x2=\"480.296\" y2=\"415.326\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                      x1=\"484.215\" y1=\"411.146\" x2=\"476.378\" y2=\"411.146\" />\n                  </g>\n                </g>\n                <g id=\"circlesBig\">\n  \n                  <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                    cx=\"588.977\" cy=\"255.978\" r=\"7.952\" />\n  \n                  <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                    cx=\"450.066\" cy=\"320.259\" r=\"7.952\" />\n  \n                  <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                    cx=\"168.303\" cy=\"353.753\" r=\"7.952\" />\n  \n                  <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                    cx=\"429.522\" cy=\"201.185\" r=\"7.952\" />\n  \n                  <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                    cx=\"200.67\" cy=\"176.313\" r=\"7.952\" />\n  \n                  <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                    cx=\"133.343\" cy=\"477.014\" r=\"7.952\" />\n  \n                  <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                    cx=\"283.521\" cy=\"568.033\" r=\"7.952\" />\n  \n                  <circle fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n                    cx=\"413.618\" cy=\"482.387\" r=\"7.952\" />\n                </g>\n                <g id=\"circlesSmall\">\n                  <circle fill=\"#0E0620\" cx=\"549.879\" cy=\"296.402\" r=\"2.651\" />\n                  <circle fill=\"#0E0620\" cx=\"253.29\" cy=\"229.24\" r=\"2.651\" />\n                  <circle fill=\"#0E0620\" cx=\"434.824\" cy=\"263.931\" r=\"2.651\" />\n                  <circle fill=\"#0E0620\" cx=\"183.708\" cy=\"544.176\" r=\"2.651\" />\n                  <circle fill=\"#0E0620\" cx=\"382.515\" cy=\"530.923\" r=\"2.651\" />\n                  <circle fill=\"#0E0620\" cx=\"130.693\" cy=\"305.608\" r=\"2.651\" />\n                  <circle fill=\"#0E0620\" cx=\"480.296\" cy=\"477.014\" r=\"2.651\" />\n                </g>\n              </g>\n              <g id=\"spaceman\" clip-path=\"url(cordClip)\">\n                <path id=\"cord\" fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\" stroke-miterlimit=\"10\"\n                  d=\"\n              M273.813,410.969c0,0-54.527,39.501-115.34,38.218c-2.28-0.048-4.926-0.241-7.841-0.548\n              c-68.038-7.178-134.288-43.963-167.33-103.87c-0.908-1.646-1.793-3.3-2.654-4.964c-18.395-35.511-37.259-83.385-32.075-118.817\" />\n  \n                <path id=\"backpack\" fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n              M338.164,454.689l-64.726-17.353c-11.086-2.972-17.664-14.369-14.692-25.455l15.694-58.537\n              c3.889-14.504,18.799-23.11,33.303-19.221l52.349,14.035c14.504,3.889,23.11,18.799,19.221,33.303l-15.694,58.537\n              C360.647,451.083,349.251,457.661,338.164,454.689z\" />\n                <g id=\"antenna\">\n                  <line fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" x1=\"323.396\" y1=\"236.625\" x2=\"295.285\" y2=\"353.753\" />\n                  <circle fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" cx=\"323.666\" cy=\"235.617\" r=\"6.375\" />\n                </g>\n                <g id=\"armR\">\n  \n                  <path fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" d=\"\n                  M360.633,363.039c1.352,1.061,4.91,5.056,5.824,6.634l27.874,47.634c3.855,6.649,1.59,15.164-5.059,19.02l0,0\n                  c-6.649,3.855-15.164,1.59-19.02-5.059l-5.603-9.663\" />\n  \n                  <path fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" d=\"\n                  M388.762,434.677c5.234-3.039,7.731-8.966,6.678-14.594c2.344,1.343,4.383,3.289,5.837,5.793\n                  c4.411,7.596,1.829,17.33-5.767,21.741c-7.596,4.411-17.33,1.829-21.741-5.767c-1.754-3.021-2.817-5.818-2.484-9.046\n                  C375.625,437.355,383.087,437.973,388.762,434.677z\" />\n                </g>\n                <g id=\"armL\">\n  \n                  <path fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" d=\"\n                  M301.301,347.66c-1.702,0.242-5.91,1.627-7.492,2.536l-47.965,27.301c-6.664,3.829-8.963,12.335-5.134,18.999h0\n                  c3.829,6.664,12.335,8.963,18.999,5.134l9.685-5.564\" />\n  \n                  <path fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" d=\"\n                  M241.978,395.324c-3.012-5.25-2.209-11.631,1.518-15.977c-2.701-0.009-5.44,0.656-7.952,2.096\n                  c-7.619,4.371-10.253,14.09-5.883,21.71c4.371,7.619,14.09,10.253,21.709,5.883c3.03-1.738,5.35-3.628,6.676-6.59\n                  C252.013,404.214,245.243,401.017,241.978,395.324z\" />\n                </g>\n                <g id=\"body\">\n  \n                  <path fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" d=\"\n                  M353.351,365.387c-7.948,1.263-16.249,0.929-24.48-1.278c-8.232-2.207-15.586-6.07-21.836-11.14\n                  c-17.004,4.207-31.269,17.289-36.128,35.411l-1.374,5.123c-7.112,26.525,8.617,53.791,35.13,60.899l0,0\n                  c26.513,7.108,53.771-8.632,60.883-35.158l1.374-5.123C371.778,395.999,365.971,377.536,353.351,365.387z\" />\n                  <path fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" d=\"\n                  M269.678,394.912L269.678,394.912c26.3,20.643,59.654,29.585,93.106,25.724l2.419-0.114\" />\n                </g>\n                <g id=\"legs\">\n                  <g id=\"legR\">\n  \n                    <path fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                      stroke-miterlimit=\"10\" d=\"\n                      M312.957,456.734l-14.315,53.395c-1.896,7.07,2.299,14.338,9.37,16.234l0,0c7.07,1.896,14.338-2.299,16.234-9.37l17.838-66.534\n                      C333.451,455.886,323.526,457.387,312.957,456.734z\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                      stroke-miterlimit=\"10\" x1=\"304.883\" y1=\"486.849\" x2=\"330.487\" y2=\"493.713\" />\n                  </g>\n                  <g id=\"legL\">\n  \n                    <path fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                      stroke-miterlimit=\"10\" d=\"\n                      M296.315,452.273L282,505.667c-1.896,7.07-9.164,11.265-16.234,9.37l0,0c-7.07-1.896-11.265-9.164-9.37-16.234l17.838-66.534\n                      C278.993,441.286,286.836,447.55,296.315,452.273z\" />\n  \n                    <line fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                      stroke-miterlimit=\"10\" x1=\"262.638\" y1=\"475.522\" x2=\"288.241\" y2=\"482.387\" />\n                  </g>\n                </g>\n                <g id=\"head\">\n  \n                  <ellipse transform=\"matrix(0.259 -0.9659 0.9659 0.259 -51.5445 563.2371)\" fill=\"#FFFFFF\"\n                    stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" cx=\"341.295\" cy=\"315.211\" rx=\"61.961\" ry=\"60.305\" />\n                  <path id=\"headStripe\" fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\"\n                    stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n                  M330.868,261.338c-7.929,1.72-15.381,5.246-21.799,10.246\" />\n  \n                  <path fill=\"#FFFFFF\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n                    stroke-miterlimit=\"10\" d=\"\n                  M380.857,346.164c-1.247,4.651-4.668,8.421-9.196,10.06c-9.332,3.377-26.2,7.817-42.301,3.5s-28.485-16.599-34.877-24.192\n                  c-3.101-3.684-4.177-8.66-2.93-13.311l7.453-27.798c0.756-2.82,3.181-4.868,6.088-5.13c6.755-0.61,20.546-0.608,41.785,5.087\n                  s33.181,12.591,38.725,16.498c2.387,1.682,3.461,4.668,2.705,7.488L380.857,346.164z\" />\n                  <g clip-path=\"url(#GlassClip)\">\n                    <polygon id=\"glassShine\" fill=\"none\" stroke=\"#0E0620\" stroke-width=\"3\" stroke-miterlimit=\"10\" points=\"\n                      278.436,375.599 383.003,264.076 364.393,251.618 264.807,364.928 \t\t\t\t\" />\n                  </g>\n                </g>\n              </g>\n            </g>\n          </svg>\n        </div>\n        <div class=\"col-md-6 align-self-center\">\n          <h1>404</h1>\n          <h2>UH OH! You're lost.</h2>\n          <p>The page you are looking for does not exist.\n            How you got here is a mystery. But you can click the button below\n            to go back to the homepage.\n          </p>\n         <button class=\"button\" (click)=\"goToHome()\">Home</button>\n        </div>\n      </div>\n    </div>\n  </main>"

/***/ }),

/***/ "./src/app/not-found/not-found.component.scss":
/*!****************************************************!*\
  !*** ./src/app/not-found/not-found.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  padding-top: 83px; }\n\nh1 {\n  font-size: 100px; }\n\n.button {\n  background-color: #C02222 !important;\n  /* Green */\n  border: none;\n  color: white;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2F2aW5hc2gvRG9jdW1lbnRzL2NpbnRhbmEvbHhwIHByb2plY3QvV2ViJTIwUG9ydGFsL3NyYy9hcHAvbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLGlCQUFpQixFQUFBOztBQUVsQjtFQUNDLGdCQUFlLEVBQUE7O0FBR2hCO0VBQ0Msb0NBQThDO0VBQUcsVUFBQTtFQUNqRCxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHFCQUFxQjtFQUNyQixlQUFlLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcInZhcmlhYmxlXCI7XG5cbi5jb250YWluZXIge1xuICAgIHBhZGRpbmctdG9wOiA4M3B4O1xufVxuICAgaDF7XG4gICAgZm9udC1zaXplOjEwMHB4O1xuICAgfVxuXG4gICAuYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgJGx4cC10aGVtZS1ncmVlbiAhaW1wb3J0YW50OzsgLyogR3JlZW4gKi9cbiAgICBib3JkZXI6IG5vbmU7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHBhZGRpbmc6IDE1cHggMzJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/not-found/not-found.component.ts":
/*!**************************************************!*\
  !*** ./src/app/not-found/not-found.component.ts ***!
  \**************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent(router) {
        this.router = router;
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent.prototype.goToHome = function () {
        this.router.navigate(['/Learner']);
    };
    NotFoundComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'not-found',
            template: __webpack_require__(/*! ./not-found.component.html */ "./src/app/not-found/not-found.component.html"),
            styles: [__webpack_require__(/*! ./not-found.component.scss */ "./src/app/not-found/not-found.component.scss")]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./src/app/router.animation.ts":
/*!*************************************!*\
  !*** ./src/app/router.animation.ts ***!
  \*************************************/
/*! exports provided: slideInAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideInAnimation", function() { return slideInAnimation; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");

var slideInAnimation = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routeAnimations', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('Learner => *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ position: 'fixed', width: '100%' }), { optional: true }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }))
            ], { optional: true }),
        ])
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('recover => *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ position: 'fixed', width: '100%' }), { optional: true }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(100%)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }))
            ], { optional: true }),
        ])
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('About => Contact', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ position: 'fixed', width: '100%' }), { optional: true }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(100%)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }))
            ], { optional: true }),
        ])
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('About => Home', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ position: 'fixed', width: '100%' }), { optional: true }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }))
            ], { optional: true }),
        ])
    ]),
]);


/***/ }),

/***/ "./src/app/wca/services/operations/wca_query.ts":
/*!******************************************************!*\
  !*** ./src/app/wca/services/operations/wca_query.ts ***!
  \******************************************************/
/*! exports provided: remove_doc_ref, getallrefdoc, get_module_topic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove_doc_ref", function() { return remove_doc_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getallrefdoc", function() { return getallrefdoc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_module_topic", function() { return get_module_topic; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);


var remove_doc_ref = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query remove_doc_ref($doc_id: String!){\n    remove_doc_ref(doc_id: $doc_id ) {\n        message\n        success\n    }\n  }"], ["\n  query remove_doc_ref($doc_id: String!){\n    remove_doc_ref(doc_id: $doc_id ) {\n        message\n        success\n    }\n  }"])));
var getallrefdoc = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query getallrefdoc($pagenumber:Int!, $course_id:String!){\n    getallrefdoc(pagenumber:$pagenumber,course_id:$course_id) {\n      data{\n      module_id\n      topic_id\n      _id\n      type\n      type_name\n      files{\n        path\n        doc_type\n      }\n      doc_type\n      created_on\n    }\n    success\n    count\n    message\n        }\n    \n  }"], ["\n  query getallrefdoc($pagenumber:Int!, $course_id:String!){\n    getallrefdoc(pagenumber:$pagenumber,course_id:$course_id) {\n      data{\n      module_id\n      topic_id\n      _id\n      type\n      type_name\n      files{\n        path\n        doc_type\n      }\n      doc_type\n      created_on\n    }\n    success\n    count\n    message\n        }\n    \n  }"])));
var get_module_topic = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n  query remove_doc_ref{\n    remove_doc_ref {\n      data{\n        data{\n          modulename\n        }\n      }\n    }\n  }"], ["\n  query remove_doc_ref{\n    remove_doc_ref {\n      data{\n        data{\n          modulename\n        }\n      }\n    }\n  }"])));
var templateObject_1, templateObject_2, templateObject_3;


/***/ }),

/***/ "./src/app/wca/services/wca.service.ts":
/*!*********************************************!*\
  !*** ./src/app/wca/services/wca.service.ts ***!
  \*********************************************/
/*! exports provided: WcaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WcaService", function() { return WcaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var apollo_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-angular */ "./node_modules/apollo-angular/fesm2015/ngApollo.js");
/* harmony import */ var _operations_wca_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./operations/wca_query */ "./src/app/wca/services/operations/wca_query.ts");





 // change rajesh ranjan



var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-type': 'application/json' })
        .append('Authorization', 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970')
};
// const headers = new HttpHeaders()
//       .set('Authorization', 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970');
// change rajesh ranjan
var WcaService = /** @class */ (function () {
    function WcaService(http, apollo) {
        this.http = http;
        this.apollo = apollo;
        this.url = 'http://localhost:9001/api/upload/uploadExcel';
        this.envWcaApi = _env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].wcaapiurl;
        this.envApi = _env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
        this.envCourseApi = _env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].createCourseApi;
        this.bSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]({});
        this.bSubject1 = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]({});
    }
    WcaService.prototype.getcourseDetails = function (courseID) {
        // var headers = new HttpHeaders()
        //   .set("Authorization", "Bearer 104150f8e66cae68b40203e1dbba7b4529231970");
        return this.http.post(this.envCourseApi + 'viewcourse', courseID, httpOptions);
    };
    WcaService.prototype.getPublishedCourse = function () {
        return this.http.get(this.envWcaApi + 'api/courses/getpublishedcourse');
    };
    WcaService.prototype.getCreatedCourse = function () {
        return this.http.get(this.envWcaApi + 'api/courses/getcreatedcourse');
    };
    WcaService.prototype.getDraftCourse = function () {
        return this.http.get(this.envWcaApi + 'api/courses/getdraftcourse');
    };
    WcaService.prototype.getAllTemplates = function () {
        return this.http.get(this.envWcaApi + 'api/template/getalltemplates');
    };
    WcaService.prototype.uploadImage = function (image) {
        return this.http.post(this.envWcaApi + 'api/upload/uploadimagefile', image);
    };
    WcaService.prototype.uploadScromCourse = function (file) {
        return this.http.post(this.envWcaApi + 'api/upload/uploadscromfile', file);
    };
    WcaService.prototype.createCourse = function (course) {
        // httpOptions.headers.append('Authorization', 'Bearer ' + this.token);
        // httpOptions.headers.append('Content-Type' , 'application/json');
        // console.log(httpOptions)
        return this.http.post(this.envCourseApi + 'coursecreation', course, httpOptions);
    };
    WcaService.prototype.updateCourse = function (course) {
        return this.http.post(this.envCourseApi + 'updatecourse', course, httpOptions);
    };
    WcaService.prototype.getAllInstructors = function () {
        return this.http.get(this.envWcaApi + 'api/lov/getinstructordetails');
    };
    WcaService.prototype.getAllTakeawayDetails = function () { return this.http.get(this.envWcaApi + 'api/lov/gettakewaydetails'); };
    WcaService.prototype.getAllPrerequisitDetails = function () { return this.http.get(this.envWcaApi + 'api/lov/getprerequisitdetails'); };
    WcaService.prototype.getAllCertifyDetails = function () { return this.http.get(this.envWcaApi + 'api/lov/getcertificationdetails'); };
    WcaService.prototype.createTemplate = function (arraydata) { return this.http.post(this.envWcaApi + 'api/template/savetemplate', arraydata); };
    WcaService.prototype.refDocUpload = function (fromdata) { return this.http.post(this.envApi + 'wca/refdocupload', fromdata); };
    WcaService.prototype.editrefdocupload = function (data) { return this.http.post(this.envApi + 'wca/editrefdocupload', data); };
    WcaService.prototype.uploadAssignments = function (fromdata) { return this.http.post(this.envApi + 'wca/learnerscorefile', fromdata); };
    WcaService.prototype.remove_doc_ref = function (id) {
        return this.apollo.query({
            query: _operations_wca_query__WEBPACK_IMPORTED_MODULE_7__["remove_doc_ref"],
            variables: {
                doc_id: id
            }
        });
    };
    WcaService.prototype.getallrefdoc = function (pagenumber, courseId) {
        return this.apollo.query({
            query: _operations_wca_query__WEBPACK_IMPORTED_MODULE_7__["getallrefdoc"],
            variables: {
                pagenumber: pagenumber,
                course_id: courseId
            }
        });
    };
    WcaService.prototype.getsingleTemplate = function (template) { return this.http.get(this.envWcaApi + 'api/template/getalltemplates?template_id=' + template); };
    WcaService.prototype.createDraft = function (draft) { return this.http.post(this.envWcaApi + 'api/courses/createscrom', draft); };
    WcaService.prototype.saveCourse = function (data) { return this.http.post(this.envWcaApi + 'api/courses/createcourse', data); };
    WcaService.prototype.getCourseDetails = function (id) { return this.http.get(this.envWcaApi + 'api/courses/getscrommodules?courseid=' + id); };
    WcaService.prototype.excelUpload = function (excel) { return this.http.post(this.envApi + 'wca/uploaddocument', excel); };
    WcaService.prototype.excelPpt = function (ppt) { return this.http.post(this.envWcaApi + 'api/template/pdftoimage', ppt); };
    WcaService.prototype.uploadKnowledgeCheck = function (fileData) { return this.http.post(this.envWcaApi + 'api/upload/uploadexcelfile', fileData); };
    WcaService.prototype.getPreviewData = function (path) { return this.http.post(this.envWcaApi + 'api/module/getquestions', { file: path }); };
    WcaService.prototype.repositoryModules = function () {
        return this.http.get(this.envWcaApi + 'api/module/viewrepomodules', {});
    };
    WcaService.prototype.postRepoModules = function (data) {
        return this.http.post(this.envWcaApi + 'api/module/savemodules', data);
    };
    WcaService.prototype.updatecoursetomudules = function (data) {
        return this.http.post(this.envWcaApi + 'api/module/updatecoursetomudules', data);
    };
    WcaService.prototype.deactivateModule = function (data) {
        return this.http.post(this.envWcaApi + 'api/module/updaterepomodulestatus', data);
    };
    WcaService.prototype.handleKeydown = function (event) {
        // tslint:disable-next-line: deprecation
        if (event.keyCode === 32) {
            // do not propagate spaces to MatSelect, as this would select the currently active option
            event.stopPropagation();
        }
        if (event.which === 32 && event.target.selectionStart === 0) {
            return false;
        }
    };
    WcaService.prototype.get_module_topic = function () {
        return this.apollo.query({
            query: _operations_wca_query__WEBPACK_IMPORTED_MODULE_7__["get_module_topic"]
        });
    };
    WcaService.prototype.checkCourseName_Availability = function (courseName) {
        return this.http.get(this.envCourseApi + 'checkcoursename?course_name=' + courseName, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])());
    };
    WcaService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            apollo_angular__WEBPACK_IMPORTED_MODULE_6__["Apollo"]])
    ], WcaService);
    return WcaService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiUrl: 'http://facade.southindia.cloudapp.azure.com:3000/',
    scormUrl: 'http://scorm.southindia.cloudapp.azure.com:8089/',
    apiUrlImg: 'http://facade.southindia.cloudapp.azure.com:3000/',
    createCourseApi: 'http://course.southindia.cloudapp.azure.com:3002/',
    wcaapiurl: 'http://wca.southindia.cloudapp.azure.com:9001/',
    domain: 'LXP',
    analytics: 'UA-171656647-1',
    systemIp: 'http://api.ipify.org/?format=json',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/avinash/Documents/cintana/lxp project/Web%20Portal/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map