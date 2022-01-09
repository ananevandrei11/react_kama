let store = {
	_state: {
		dialogPage: {
			users: [
				{ id: 1, name: 'Petr' },
				{ id: 2, name: 'Vasiliy' },
				{ id: 3, name: 'Ivan' },
				{ id: 4, name: 'Valentina' },
				{ id: 5, name: 'Alina' },
				{ id: 6, name: 'Evgeniy' },
				{ id: 7, name: 'Andrei' },
			],
			messages: [
				{ id: 1, text: 'Hi!' },
				{ id: 2, text: 'Hello!' },
				{ id: 3, text: 'How are You?' },
				{ id: 4, text: 'Adabra-Kedavra' },
				{ id: 5, text: 'Are You kidding?' },
				{ id: 6, text: 'Yes!' },
				{ id: 7, text: 'Yoooo!' },
			],
			newMessage: 'New Message',
		},
		profilePage: {
			posts: [
				{ id: 1, message: 'I`m first Post!', likesСount: 3 },
				{ id: 2, message: 'I`m second Post!', likesСount: 12 },
				{ id: 3, message: 'I`m third Post!', likesСount: 0 },
				{ id: 4, message: 'I`m fourth Post!', likesСount: 2 },
			],
			newPostText: 'New Post Text',
		},
		sideBar: {
			friends: [
				{ id: 1, name: 'Anton', avatar: 'https://img.favpng.com/25/1/17/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg' },
				{ id: 2, name: 'Ravil', avatar: 'https://cdn-icons-png.flaticon.com/512/1184/1184457.png' },
				{ id: 3, name: 'Andrei', avatar: 'https://media.istockphoto.com/vectors/male-avatar-icon-or-portrait-handsome-young-man-face-with-beard-vector-id1143511824?k=20&m=1143511824&s=170667a&w=0&h=OjcgBMRpj82IXTItixtv6aIbeP9vny0lCqg0eY6ZONQ=' },
				{ id: 4, name: 'Dmitriy', avatar: 'https://cdn-icons-png.flaticon.com/512/1750/1750556.png' },
			]
		}
	},

	_callSubscriber() {
		console.log('Subscriber is undefined');
	},

	_addPost() {
		let newPost = {
			id: this._state.profilePage.posts.length + 1,
			message: this._state.profilePage.newPostText,
			likesСount: 0,
		};
		this._state.profilePage.posts.push(newPost);
		this._callSubscriber(this._state);
		this._state.profilePage.newPostText = 'New Post Text';
	},

	_updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText;
		this._callSubscriber(this._state);
	},

	_addMessage() {
		let newMessage = {
			id: this._state.dialogPage.messages.length + 1,
			text: this._state.dialogPage.newMessage
		};
		this._state.dialogPage.messages.push(newMessage);
		this._callSubscriber(this._state);
		this._state.dialogPage.newMessage = 'New Message';
	},

	_updateNewMessageText(newMessage) {
		this._state.dialogPage.newMessage = newMessage;
		this._callSubscriber(this._state);
	},

	getState() {
		return this._state;
	},

	dispatch(action) { // action - это объект с действием
		if (action.type === 'ADD-POST') {
			this._addPost();
		} else if (action.type === 'UPDATE-NEW-POST-TEXT') {
			this._updateNewPostText(action.newText);
		} else if (action.type === 'ADD-MESSAGE') {
			this._addMessage();
		} else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
			this._updateNewMessageText(action.newMessage);
		}
	},

	subscribe(observer) { // observer - callback function
		this._callSubscriber = observer;
	},
}

window.store = store;
export default store;