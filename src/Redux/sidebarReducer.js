

let initialState = {
	friends: [
		{ id: 1, name: 'Anton', avatar: 'https://img.favpng.com/25/1/17/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg' },
		{ id: 2, name: 'Ravil', avatar: 'https://cdn-icons-png.flaticon.com/512/1184/1184457.png' },
		{ id: 3, name: 'Andrei', avatar: 'https://media.istockphoto.com/vectors/male-avatar-icon-or-portrait-handsome-young-man-face-with-beard-vector-id1143511824?k=20&m=1143511824&s=170667a&w=0&h=OjcgBMRpj82IXTItixtv6aIbeP9vny0lCqg0eY6ZONQ=' },
		{ id: 4, name: 'Dmitriy', avatar: 'https://cdn-icons-png.flaticon.com/512/1750/1750556.png' },
	]
}

const sidebarReducer = (state = initialState, action) => {
	return state;
}

export default sidebarReducer;