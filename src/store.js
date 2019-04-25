import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store =  new Vuex.Store({
	state: {
		posts : [
		{
			id: 3,
			title: 'Nodejs',
			text: "Node.js is a server-side platform built on Google Chrome's JavaScript Engine (V8 Engine). Node.js was developed by Ryan Dahl in 2009. Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, and Linux. Node.js also provides a rich library of various JavaScript modules which simplifies the development of web applications using Node.js to a great extent."
		},
		{
			id: 2,
			title: 'Angularjs',
			text: 'AngularJS is a very powerful JavaScript Framework. It is used in Single Page Application (SPA) projects. It extends HTML DOM with additional attributes and makes it more responsive to user actions. AngularJS is open source, completely free, and used by thousands of developers around the world. AngularJS is a structural framework for dynamic web applications. It lets you use HTML as your template language and lets you extend HTML\'s syntax to express your application components clearly and succinctly. Its data binding and dependency injection eliminate much of the code you currently have to write. And it all happens within the browser, making it an ideal partner with any server technology. AngularJS is a structural framework for dynamic web applications. It lets you use HTML as your template language and lets you extend HTML\'s syntax to express your application components clearly and succinctly. Its data binding and dependency injection eliminate much of the code you currently have to write. And it all happens within the browser, making it an ideal partner with any server technology.'
		},
		{
			id: 1,
			title: 'Vuejs',
			text: 'VueJS is a progressive JavaScript framework used to develop interactive web interfaces. Focus is more on the view part, which is the front end. It is very easy to integrate with other projects and libraries. The installation of VueJS is fairly simple, and beginners can easily understand and start building their own user interfaces. VueJS makes the use of virtual DOM, which is also used by other frameworks such as React, Ember, etc. The changes are not made to the DOM, instead a replica of the DOM is created which is present in the form of JavaScript data structures. Whenever any changes are to be made, they are made to the JavaScript data structures and the latter is compared with the original data structure. The final changes are then updated to the real DOM, which the user will see changing. This is good in terms of optimization, it is less expensive and the changes can be made at a faster rate. The data binding feature helps manipulate or assign values to HTML attributes, change the style, assign classes with the help of binding directive called v-bind available with VueJS.'
		}
		],
		highlighted: [],
		foundPosts: []
	},

	mutations: {
		insertPost: (state,payload) => {
			const post = {
				id: state.posts.length + 1,
				title: payload.title,
				text: payload.text
			}
			state.posts.unshift(post);
		},

		deletePost: (state,id) => {
			const index = state.posts.findIndex(post => post.id === id);
			state.posts.splice(index,1)
		},

		updatePost: (state,payload) => {
			const index = state.posts.findIndex(post => post.id === payload.id);
			state.posts[index]['title'] = payload.title;
			state.posts[index]['text'] = payload.text;
		},

		getFoundPost: (state,payload) => {
			state.foundPosts = [];
			for(var j=0;j<state.highlighted.length;j++){
				if(state.highlighted[j].text === payload){
					for(var i=0;i<state.highlighted[j].id.length;i++){
						for(var k=0;k<state.posts.length;k++){
							if( state.posts[k].id === state.highlighted[j].id[i] ){
								var fp = {};
								fp['start'] = state.highlighted[j].pos[i].start;
								fp['end'] = state.highlighted[j].pos[i].end;
								fp['fposts'] = state.posts[k];
								state.foundPosts.unshift(fp);
							}
						}
					}
				}
			}	
		}
	},

	// actions: {
	// },
	getters:{
		posts: state => state.posts
	}
});