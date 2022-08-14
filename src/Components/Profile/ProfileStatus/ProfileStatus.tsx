import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import classes from "./ProfileStatus.module.css";

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};


const ProfileStatus = (props: PropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(props.status);

  const toggleEditMode = (action: boolean) : void => {
    setEditMode(action);
    if (action === false) {
      props.updateStatus(status);
    }
  };
  const inputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div>
      {!editMode && (
        <div>
          <span
            onDoubleClick={() => toggleEditMode(true)}
            className={classes.btn}
          >
            {props.status || "no status"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            name="status"
            type="text"
            id="status"
            value={status || ""}
            autoFocus
            onChange={(e) => inputValue(e)}
            onBlur={() => toggleEditMode(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
