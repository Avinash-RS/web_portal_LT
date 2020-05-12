import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockServiceService {

  constructor() { }

  login() {
    return {
      "data": {
        "login": {
          "success": true,
          "error_msg": null,
          "message": {
            "_id": "5e69f4ad139c79bbf14adc8a",
            "email": "rahul-sai@lntecc.com",
            "is_active": true,
            "username": "lxpadmin",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibHhwYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1ODkyNzU3NjksImV4cCI6MTU4OTI5NzM2OSwiaXNzIjoiaHR0cHM6Ly93d3cubGFyc2VudG91YnJvLmNvbS8ifQ.yXN-vzUQfs4OzzK5W1uT1EW4ow3vz9-6jRdgOzM0XB4",
            "user_id": "1234ab",
            "is_blocked": false,
            "is_profile_updated": true,
            "group_id": null,
            "message": "please update your profile details",
            "__typename": "login_content"
          },
          "__typename": "loginresponse"
        }
      }
    }
  }

}
