export function userdialogsSuccess(dialogs) {
    return {
        type : 'USER_DIALOGS_SUCCESS',
        payload : dialogs,
    }
}

export default function dialogsFetch(url = '', config = {}) {
    return ( dispatch ) => {
        fetch(url, config)
            .then(res => {
                if(res.status !== 200) {
                    alert(res.statusText)
                }
                return res
            })
            .then( res => res.json() )
            .then( dialogs => dispatch( userdialogsSuccess(dialogs) ) )
            .catch( error => console.log( 'Eroooooooe' + error ) )
    }
}
