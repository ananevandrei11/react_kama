import React from "react";
import * as axios from "axios";
import userNoAvatar from "../../Asets/images/noavatar.svg";
import classes from './UsersClass.module.css';

class UsersClass extends React.Component {
  constructor(props) {
    super(props);
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.countPage}`)
      .then(response => {
        this.props.setUsers(response.data.items);
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.countPage}`)
      .then(response => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(
          (response.data.totalCount > 100) ? 100 : response.data.totalCount
        );
      })
      .catch(error => console.log(error));
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.countPage);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return <div>
      <div className={classes.pages}>
        {
          pages.map((page, index) =>
            <span
              key={index}
              className={((this.props.currentPage === page) ? classes.selectedPage : '') + ' ' + classes.numPage}
              onClick={() => { this.onPageChanged(page) }}
            >{page}</span>
          )
        }
      </div>
      {
        this.props.users.map((user) =>
          <article key={user.id.toString()}>
            <div>
              <figure>
                <img
                  width="40"
                  height="40"
                  src={
                    (user.photos.small != null) ? user.photos.small : userNoAvatar
                  }
                  alt=" "
                  style={{ backgroundColor: "#fff" }}
                />
              </figure>
              {user.followed
                ?
                <button
                  onClick={() => { this.props.unFollow(user.id) }}
                >Follow</button>
                :
                <button
                  onClick={() => { this.props.follow(user.id) }}
                >Unfollow</button>}

            </div>
            <div>
              <p>{user.name}</p>
              <p>{user.status}</p>
              <p>{"user.location.country"}</p>
              <p>{"user.location.city"}</p>
            </div>
          </article>
        )
      }
    </div>
  }
}

export default UsersClass;