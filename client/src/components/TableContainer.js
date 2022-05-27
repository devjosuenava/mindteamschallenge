import React from "react";
import { useTable } from "react-table";
 
export default function Table({ columns, data }) {
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({
   columns,
   data,
 })
 
 return (
   <table {...getTableProps()}>
     <thead>
       {
        headerGroups.map(headerGroup => (
         <tr {...headerGroup.getHeaderGroupProps()} >
           {headerGroup.headers.map(column => (
             <th {...column.getHeaderProps()}>{column.render('Header')}</th>
           ))
       }
     </thead>

   </table>
 )
}