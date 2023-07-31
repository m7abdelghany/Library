import { useState,useEffect } from "react"
import axios from "axios";
const useFetch=(url,keyData) => {
let [data , setData] =useState([]);
const [isLoading,setIsLoading]=useState(true);
const [error,setError] = useState(null);
async function getData() {
return await axios.get(`${url}${keyData}`);
  }
  useEffect(() => {
    getData().then(res =>{
      setIsLoading(false)
      setData(res.data)
    }).catch(err=>{
      setError(err)
    });
  }, [keyData]);
  return{
    data,
    isLoading,
    error
  }



}
export default useFetch ;