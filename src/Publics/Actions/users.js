import axios from 'axios';

export const userRegist = (data) => {
  return {
    type: 'REGIST_USER',
    payload: axios.post ('http://localhost:3030/bookrent/user',data),
  }
}
export const userLogin=(data)=>{
    return{
        type: 'USER_LOGIN',
        payload: axios.post('http://192.168.100.183:3030/bookrent/login',data)
    }
}
export const getUser=(token)=>{
  console.log(token)
  return{
    type: 'GET_USER',
    payload: axios.patch('http://localhost:3030/bookrent/user',{
      headers:{
        Authorization: `${token}`
      }
    })
  }

}