export function userDataSuccess(data) {
    return {
        type : 'USER_DATA_SUCCESS',
        payload : data
    }
}

export default function dataUserFetch(url = '', config = {}) {
    return ( dispatch ) => {
        fetch(url, config)
            .then(res => {
                if(res.status !== 200) {
                    alert(res.statusText)
                }
                return res
            })
            .then( res => res.json() )
            .then( data => dispatch( userDataSuccess(data) ) )
            .catch( error => console.log( 'Eroooooooe' + error ) )
    }
}
