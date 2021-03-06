import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

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

	getState() {
		return this._state;
	},

	dispatch(action) { // action - это объект с действием
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
		this._callSubscriber(this._state); 
	},

	subscribe(observer) { // observer - callback function
		this._callSubscriber = observer;
	},
}

window.store = store;
export default store;