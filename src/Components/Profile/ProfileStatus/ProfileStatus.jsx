import React from "react";

class ProfileStatus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
      status: this.props.status,
		};

		this.toggleEditMode = this.toggleEditMode.bind(this);
	}

	toggleEditMode = (action) => {
		this.setState({
			editMode: action
		});
	};

	inputValue = (e) => {
		this.setState({
			status: e.currentTarget.value
		});
	};

	render() {
		return (
			<div>
				{!this.state.editMode ?
					(<div>
						<span onDoubleClick={() => this.toggleEditMode(true)}>
							{this.state.status}
						</span>
					</div>)
					:
					(<div>
						<input
							type="text"
							name="status"
							id="status"
							autoFocus
							value={this.state.status}
							onChange={(e) => this.inputValue(e)}
							onBlur={() => this.toggleEditMode(false)}
						/>
					</div>)}
			</div>
		);
	}
}

export default ProfileStatus;
