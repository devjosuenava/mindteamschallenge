// import api from '../../api'
import { useState, useEffect } from "react";
import { TableContainer } from '../../components'


const ListUsers = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getAllUsersReqHeaders = new Headers({
      'x-access-token': JSON.parse(window.localStorage.getItem('token')).token
    })
    const getAllUsersReq = new Request('http://localhost:8080/api/getAllUsers', {
      method: 'GET',
      headers: getAllUsersReqHeaders
    });
    fetch(getAllUsersReq)
      .then( response => response.json())
      .then( data => setData(data))
      .catch((err) => console.log(err))
  }, []);

  const columns = [
    { title: 'Full Name', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Roles', field: 'roles' }
  ];

  // const data = [
  //     { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  //     { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
  //     { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  //     { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
  //     { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  //     { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
  //     { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  //     { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
  //   ];

  //   const columns = [
  //     { title: "Name", field: "name" },
  //     { title: "Surname", field: "surname" },
  //     { title: "Birth Year", field: "birthYear", type: "numeric" },
  //   ];



  return (
    <TableContainer title="Users" columns={columns} data={data} />
  )
}

export default ListUsers