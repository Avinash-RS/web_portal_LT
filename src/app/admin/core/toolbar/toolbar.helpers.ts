var admin = JSON.parse(localStorage.getItem('adminDetails')) || null;
export const ToolbarHelpers = {
	notifications: [
  		{
	        id: 'id',
	        title: 'Mail 5',
	        lastTime: '23 Minutes ago',
	        state: 'state'
	    },
	    {
	        id: 'id',
	        title: 'Mail 5',
	        lastTime: '23 Minutes ago',
	        state: 'state'
	    },
	    {
	        id: 'id',
	        title: 'Mail 5',
	        lastTime: '23 Minutes ago',
	        state: 'state'
	    },
	],

	currentUser: {
		photoURL: 'assets/profile.jpg',
		currentUserName: admin.username
	}
};