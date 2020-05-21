
export function userPrivatDirectMessagesSuccess(mess) {
    console.log(mess)
    return {
        type : 'USER_DIRECT_MESSAGES_SUCCESS',
        payload : mess,
    }
}


export default function messagesFetch(url = '', config = {}) {
    return ( dispatch ) => {
        fetch(url, config)
            .then(res => {
                if(res.status !== 200) {
                    alert(res.statusText)
                }
                return res
            })
            .then( res => res.json() )
            .then( mess => dispatch( userPrivatDirectMessagesSuccess(mess) ) )
            .catch( error => console.log( 'Eroooooooe' + error ) )
    }
}
