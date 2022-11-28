import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Card, Typography, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApiManager } from '../../helpers/ApiManager';
import { AUTHUSER, USER } from '../../types';
import Loader from '../UI/Loader/Loader';

interface PROPS extends RouteComponentProps {
  authUser: AUTHUSER
}

function Trainers({ authUser, history }: PROPS) {
  const [trainers, setTrainers] = useState<USER[] | null>(null);

  useEffect(() => {
    const getTrainers = async () => {
      if (authUser) {
        try {
          const response = await ApiManager.getTrainers();
          setTrainers(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }

    getTrainers();
    
  }, [authUser])
  return trainers ? (
      <div style={{ padding: '30px' }}>
      <List component={Card}>
        {
          trainers.map((trainer: USER, i: number) => (
            <ListItem 
              key={trainer._id}
              divider
            >
              <ListItemAvatar>
                <Avatar>
                  {i + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant={"h5"}>{`${trainer.first_name} ${trainer.last_name}`}</Typography>}
                secondary={`@${trainer.username}`}
              />
              <Button variant={"outlined"} onClick={() => history.push(`/profile/${trainer._id}`)}>VIEW</Button>
            </ListItem>
          ))
        }
      </List>
    </div>
  ) : <Loader />
}

export default Trainers;
