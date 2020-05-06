var admin = JSON.parse(localStorage.getItem('adminDetails')) || null;
// this.gs.getAdminName.subscribe(message =>
// 	admin = {
// 		username: message
// 	}
// )
export const ToolbarHelpers = {
	notifications: [
	
	],

	currentUser: {
		photoURL: 'assets/profile.jpg',
		currentUserName: admin && admin.username || 'rahulsaivishnu1'
	}
};