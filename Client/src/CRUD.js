import React,{useState, useEffect, Fragment} from "react";
import Table from "react-bootstrap/Table";
// import 'bootstrap/dist/css/bootstrap.css';

const CRUD = ()=>{
  const empdata =[
    {
      id:1,
      name:'Rinil',
      age:20,
      isActive:0
    },
    {
      id:2,
      name:'Het',
      age:20,
      isActive:1
    },
    {
      id:3,
      name:'Deep',
      age:20,
      isActive:0
    }
  ]

  const [data,setData] = useState([])

  useEffect(()=>{
    setData(empdata);
  },[]);

  return(
    <Fragment>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>IsActive</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.length > 0 ?
             data.map((item,index)=>{
              return(
                <tr key={index}>
                 <td>{index + 1}</td>
                 <td>{item.id}</td>
                 <td>{item.name}</td>
                 <td>{item.age}</td>
                 <td>{item.isActive}</td>
                </tr>
              )
             }) 
             :
             'Loading...'
        }
        
      </tbody>
    </Table>
    </Fragment>
  );
}

export default CRUD;