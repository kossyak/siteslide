export default {
	url: '/siteslide',
	navigation: {
		home: {
			path: 'index.html',
			title: 'home',
			navigate: {
				top: 'page',
				right: 'page',
				bottom: 'home',
				left: 'page'
			}
		},
		page: {
			path: 'page.html',
			title: 'page',
			navigate: {
				top: null,
				right: null,
				bottom: 'home',
				left: 'home'
			}
		}
	}
}