
export function getIPAddress() {
    
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
        this.ipAddress = res.ip;
      });
}
  