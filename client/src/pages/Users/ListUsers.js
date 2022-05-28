// import api from '../../api'
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { TableContainer } from '../../components'


const ListUsers = () => {
    const [ data, setData ] = useState([])

    const getAllUsersReq = new Request('http://localhost:8080/api/getAllUsers', {
      method: 'GET',
      headers: new Headers({
        'Authentication': `Bearer ${JSON.parse(window.localStorage.getItem('token')).token}`,
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
      cache: 'default',
    });   

    useEffect(() => {
        fetch(getAllUsersReq)
          .then((res) => {
              setData(res.data);
          })
          .catch((err) => console.log(err))
    }, []);

    // console.log(data)

    const columns = [
      { title: 'Full Name', field: 'fullName'},
      { title: 'Email',     field: 'email'},
      { title: 'Roles',     field: 'roles'}
    ];

    // const data = [
    //     { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
    //     { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
    //   ];
      
    //   const columns = [
    //     { title: "Name", field: "name" },
    //     { title: "Surname", field: "surname" },
    //     { title: "Birth Year", field: "birthYear", type: "numeric" },
    //   ];
    

    
    return (
      // <MaterialTable title="Table" icons={tableIcons} columns={columns} data={data} />
      <TableContainer title="Users" columns={columns} data={data} />
    )
}

export default ListUsers