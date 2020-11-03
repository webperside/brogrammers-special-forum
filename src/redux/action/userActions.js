import { AUTH } from '../../constants';

export function signUpUser(user){
    return fetch(AUTH.BASE_API_URL + 'sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fullName:user.fullName,
            username:user.username,
            password:user.password
        })
    })
        .then((response) => response.json())
        .then((response) => console.log(response)) 
        // burada handler olacaq, gelen responsu yoxlayib bildirim gosterecek
}