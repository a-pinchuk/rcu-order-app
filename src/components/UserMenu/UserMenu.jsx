import { Button } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { clearContacts } from 'redux/contacts/contactsApi';
import { logout } from 'redux/users/userApi';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <Button
        variant="outlined"
        color="error"
        type="button"
        onClick={() => {
          dispatch(logout());
          dispatch(clearContacts());
        }}
      >
        Logout
      </Button>
    </div>
  );
};
