import React from "react";
import classes from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            status: this.props.status,
        };
    }

    toggleEditMode = (action) => {
        debugger;
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
						<span className={classes.btn} onDoubleClick={() => this.toggleEditMode(true)}>
							{this.state.status}
						</span>
					</div>)
					:
					(<div>
						<input
							name="status"
							type="text"
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