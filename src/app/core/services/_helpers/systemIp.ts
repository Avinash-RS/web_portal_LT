
export function getIPAddress() {
    
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
        this.ipAddress = res.ip;
      });
}
  