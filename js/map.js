export default {
	home:{
		path: 'index',
		title: 'home',
		navigate: {
			top: 'page',
			right: 'page',
			bottom: 'home',
			left: 'page'
		}
	},
	page: {
		path: 'page',
		title: 'page',
		navigate: {
			top: null,
			right: null,
			bottom: 'home',
			left: 'home'
		}
	},
}