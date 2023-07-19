import axios from 'axios';
import {createContext,useEffect,useState} from 'react';
export const usercontext= createContext({});
 export function Usercontextprovider({children}){
    const [user,setuser]=useState(null);
    const [ready,setReady] = useState(false);
    useEffect(() => {
      if (!user) {
        axios.get('/profile').then(({data}) => {
          setuser(data);
          setReady(true);
        });
      }
    }, []);
    return(<usercontext.Provider value={{user,setuser}}>{children}</usercontext.Provider>)
 }