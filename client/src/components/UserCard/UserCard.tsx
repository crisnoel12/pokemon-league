import { Card, Typography, Button, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'
import React, { useState } from 'react'
import { USER_PROFILE_INITIAL_STATE } from '../../types'
import EditProfile from '../EditProfile/EditProfile'
import { USER } from '../../types/index';

interface PROPS extends Partial<USER_PROFILE_INITIAL_STATE> {
  doUpdateProfile: (user: USER) => void
}

const styles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative', 
    padding: '24px', 
    textAlign: 'left'
  },
  Name_Heading: {
    marginBottom: "32px",
    position: "relative",
    fontFamily: "'Do Hyeon', sans-serif",
    letterSpacing: ".1em",
    textAlign: "left",
    '&::after': {
      content: '""',
      position: "absolute",
      bottom: "-23px",
      left: "0",
      right: "0",
      height: "0.5em",
      width: "65px",
      borderTop: "5px solid red",
      zIindex: "-1",
    }
  },
  edit_profile_btn: {
    position: 'absolute', 
    top: '24px', 
    right: '24px'
  }
}))

const UserCard = ({ isAuthProfile, user , doUpdateProfile}: PROPS) => {
  const classes = styles();
  const [editProfile, setEditProfile] = useState<any>(null);
  return user ? (
    <>
      <Card className={classes.root}>
        <Typography variant={"h4"} className={classes.Name_Heading}>{`${user.first_name} ${user.last_name}`}</Typography>
        {isAuthProfile && (
            <Button 
              variant={"outlined"} 
              color={"primary"} 
              className={classes.edit_profile_btn}
              onClick={() => setEditProfile(
                <EditProfile
                  doUpdateProfile={doUpdateProfile}
                  close={() => setEditProfile(null)} 
                />)}
            >
              Edit Profile
            </Button>
        )}
        <Typography variant={"body1"}><strong>Username: </strong>{user.username}</Typography>
        <Typography variant={"body1"}><strong>Gender: </strong>{user.gender === "m" ? "Male" : "Female"}</Typography>
        <Typography variant={"body1"}><strong>Age: </strong>{moment().diff(user.birthdate, 'years')}</Typography>
      </Card>
      {editProfile}
    </>
  ) : null;
}

export default UserCard;