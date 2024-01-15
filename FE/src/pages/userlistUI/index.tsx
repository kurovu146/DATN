import * as React from "react";
import { DEFAULT_AVATAR_USERLIST, LIST_IMAGE_USER } from "../../mocks";
import styles from "./UserUI.module.css";
import { useState, useEffect } from "react";
import { userApi } from "../../api";
import { IListUser, IListUserDetail } from "../../interfaces/user.interface";

function UserList() {
  const [checkButtonUserType, setCheckButtonUserType] = useState<number>(0);
  const [checkButtonUserTime, setCheckButtonUserTime] = useState<number>(0);
  const [check, setCheck] = useState<boolean>(false);
  const [listUser, setListUser] = useState<IListUserDetail[]>([]);
  const [filterUserByType, setFilterUserByType] =
    useState<string>("reputation");
  useEffect(() => {
    // getUserApi();
    getUserByType();
  }, [check,filterUserByType]);

  const getUserByType = () => {
    userApi
      .getUserByType(filterUserByType)
      .then((res) => setListUser(res.data))
      .catch((e) => console.log(e));
  };

  const handleUserType = (id: number, item: string) => {
    setCheckButtonUserType(id);
    setFilterUserByType(item)
  };
  const renderButtonUserType = (id: number, htmlfor: string, label: string) => {
    return (
      <>
        <button
          type="button"
          className={`btn border ${
            checkButtonUserType === id ? styles.activeBtn : ""
          } ${styles.containerButtonUserType}`}
          onClick={() => handleUserType(id,htmlfor)}
        >
          <div className="fs-6">{label}</div>
        </button>
      </>
    );
  };

  const renderButtonUserTime = (id: number, htmlfor: string, label: string) => {
    return (
      <>
        <button
          type="button"
          className={`btn  ${
            checkButtonUserTime === id ? styles.activeBtnUserTime : ""
          } ${styles.containerButtonUserTime}`}
          onClick={() => setCheckButtonUserTime(id)}
        >
          {label}
        </button>
      </>
    );
  };

  const renderUserDetail = () => {
    return listUser.map((user: IListUserDetail, index: number) => (
      <div
        className={`d-flex flex-row-reverse card mb-5 me-4  card-roll ${styles.cardBox}`}
        key={index}
      >
        <div className={`${styles.containUser} row g-0 d-flex`}>
          <div className={`${styles.imgSize} col-md-2 m-2`}>
            <img
              src={DEFAULT_AVATAR_USERLIST[Math.floor(Math.random() * 5)]}
              className="img-fluid rounded-start"
              alt="avatar"
            />
          </div>
          <div className="col-md-8">
            <div className="fs-6">
              <a href="">{user.user.username}</a>
              <div className={`${styles.techType}`}>{user.reputation}</div>
              <div className={`${styles.techType}`}>
                <b>-</b>
              </div>
              <div className={`${styles.techType}`}>
                <a href="">-</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="ms-2 mb-2">
        <p className="fs-3 my-4">Users</p>
        <div className={`${styles.container} my-4`}>
          <div className="input-group w-25">
            <div className="w-25 position-relative flex-fill">
              <i className={`${styles.searchIcon} bi bi-search`}></i>
              <input
                className={`${styles.searchInput} form-control form-control-sm`}
                type="text"
                placeholder="Filter by tag name..."
              />
            </div>
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            {renderButtonUserType(0, "reputation", "Reputation")}
            {renderButtonUserType(1, "new_users", "New users")}
            {renderButtonUserType(2, "voter", "Voters")}
            {renderButtonUserType(3, "editor", "Editors")}
            {renderButtonUserType(4, "moderator", "Moderators")}
            <br />
          </div>
        </div>
        <div
          className={`${styles.itemTimeContainer} btn-group`}
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <div></div>
          <div>
            {renderButtonUserTime(0, "btntime1", "week")}
            {renderButtonUserTime(1, "btntime2", "month")}
            {renderButtonUserTime(2, "btntime3", "quater")}
            {renderButtonUserTime(3, "btntime4", "year")}
            {renderButtonUserTime(4, "btntime5", "all")}
          </div>
        </div>
        <div className={`${styles.listUser} d-flex  flex-wrap mt-4 w-100`}>
          {renderUserDetail()}
        </div>
      </div>
    </>
  );
}

export default React.memo(UserList);
