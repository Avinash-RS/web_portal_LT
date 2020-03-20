import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

// import { AuthenticationService } from "../_services";
import { stat } from "fs";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    // private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authenticationService.currentUserValue;
    // console.log(state.url)
    // if (state.url == "/home") {
    //   this.guard("currentUserLMS");
    //   const currentUser = localStorage.getItem("currentUserLMS");
    //   if (currentUser == "true") {
    //     return true;
    //   } else {
    //     this.router.navigate(["/"]);
    //     return false;
    //   }
    // } else if ((state.url == "/courseCreation") || ( state.url == "/courseview")) {
    //   this.guard("currentUserLMS");
    //   const currentUser = localStorage.getItem("currentUserCMS");
    //   if (currentUser == "true") {
    //     return true;
    //   } else {
    //     this.router.navigate(["/"]);
    //     return false;
    //   }
    // } else if (state.url == "/adminDashboard") {
    //   const currentUser = localStorage.getItem("currentUser");
    //   this.guard("currentUserLMS");
    //   if (currentUser == "true") {
    //     return true;
    //   } else {
    //     this.router.navigate(["/"]);
    //     return false;
    //   }
    // }
    var userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    if (userDetailes != null) {
      if (state.url == '/Learner/login' || state.url == '/Admin/login') {
        this.router.navigate(["/Learner"]);
        return false;
      }
      else
        return true;
    }
    else if (userDetailes == null) {
      if (state.url == '/Learner/MyCourse') {
        this.router.navigate(["/Learner"])
        return false;
      } else
        return true;
    }
    else
      return true;
  }

  guard(user) { }
}
