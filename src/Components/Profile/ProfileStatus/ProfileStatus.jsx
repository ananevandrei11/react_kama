import React from "react";
import classes from "./ProfileStatus.module.css";

class ProfileStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      status: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      status: this.props.status,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  };

  toggleEditMode = (action) => {
    this.setState({
      editMode: action,
    });
    if (action === false) {
      this.props.updateStatus(this.state.status);
    }
  };

  inputValue = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div>
        {!this.state.editMode ? (
          <div>
            <span
              className={classes.btn}
              onDoubleClick={() => this.toggleEditMode(true)}
            >
              {this.state.status || "no status"}
            </span>
          </div>
        ) : (
          <div>
            <input
              name="status"
              type="text"
              id="status"
              autoFocus
              value={this.state.status || ""}
              onChange={(e) => this.inputValue(e)}
              onBlur={() => this.toggleEditMode(false)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
