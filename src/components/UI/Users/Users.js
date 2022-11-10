import React, { Fragment } from "react";
import classes from "./users.module.css";

export default function Users(props) {
  return (
    <Fragment>
      {props.users.map((user) => {
        return (
          <div className={classes["user-container"]} key={user.id}>
            <a href={user.links.html} className={classes["user-details"]}>
              <div className={classes["user-profile__image"]}>
                <img src={user.profile_image.medium} alt="" />
              </div>
              <div className={classes["user-name__container"]}>
                <h5 className={classes["user-name"]}>{user.name}</h5>
                <p className={classes["user-username"]}>{user.username}</p>
              </div>
            </a>
            {user.photos.length !== 0 && (
              <a href={user.links.html}>
                <div className={classes["user-images__preview"]}>
                  <div className={classes["preview-photo"]}>
                    <div className={classes["photo-wrapper"]}><img src={user.photos[0].urls.small} alt="" /><div style={{paddingBottom: "75%"}}></div></div>
                    <div className={classes["without-photo"]}></div>
                  </div>
                  <div className={classes["preview-photo"]}>
                    {user.photos[1] ? <div className={classes["photo-wrapper"]}><img src={user.photos[1].urls.small} alt="" /></div> :
                    <div className={classes["without-photo"]}></div>}
                  </div>
                  <div className={classes["preview-photo"]}>
                    {user.photos[2] ? <div className={classes["photo-wrapper"]}><img src={user.photos[2].urls.small} alt="" /></div> :
                    <div className={classes["without-photo"]}></div>}
                  </div>
                </div>
              </a>
            )}
            <a href={user.links.html} className={classes["user-profile__link"]}>
              View Profile
            </a>
          </div>
        );
      })}
    </Fragment>
  );
}
