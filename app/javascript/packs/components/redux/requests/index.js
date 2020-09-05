import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = Cookies.get('Authorization');

var currentUser, currentUserId = null;

const setCurrentUser = () => {
    currentUser = Cookies.getJSON('currentUser');
    currentUserId = null;
    if(currentUser) currentUserId = currentUser.user_id;
}

export const deleteAccount = () => {
    setCurrentUser()
    axios.delete(`/users/${currentUserId}`, {}).then(() => {
        Cookies.remove('Authorization')
        Cookies.remove('currentUser')
        window.location.reload()
    })
}
