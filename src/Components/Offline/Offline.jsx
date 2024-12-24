
import useOnline from '../../Hooks/useOnline'

export default function Offline({children}) {
    let isOnline = useOnline()
    if(isOnline===false){
        return children 
    }
 
}
