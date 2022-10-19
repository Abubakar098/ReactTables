import React, {useMemo} from "react";
import { useTable,useColumnOrder,
    // useSortBy
    useRowSelect,
    // usePagination
} from "react-table";
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from "./columns";
import './Table.css';
import { Checkbox } from "./Checkbox";


export const ColumnOrder = ()=>{

    const columns = useMemo(()=> COLUMNS,[]);
    const data = useMemo(()=> MOCK_DATA,[]);

    // const tableInstance =  

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        //column hiding
        allColumns,
        getToggleHideAllColumnsProps,
        //row selection
        selectedFlatRows,
        // pagination
        // page,
        // nextPage,
        // previousPage,
        // canNextPage,
        // canPreviousPage,
        // pageOptions,
        // state,
        // gotoPage,
        // pageCount,
        // setPageSize,

        setColumnOrder,
        prepareRow} = useTable({
        columns:columns,
        data: data,  
        initialState:{pageIndex:2}

      },useColumnOrder,
    //   //sorting table 
    //   useSortBy
    // Row selection
      useRowSelect,
      //paginatioin
    //   usePagination,
      (hooks) => {
        hooks.visibleColumns.push((columns)=>{
            return [
                {
                    id:'selection',
                    Header:({getToggleAllRowsSelectedProps}) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell:({row}) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ]
        })
      }
// Row selection above this

      )


      const changeOrder =() =>{
        setColumnOrder([
            'id',
            'first_name',
            'last_name',
            'phone',
            'country',
            'date_of_birth'
        ])
      }


    // for row selection to reduce rows for checking  just 10 rows in the table 
    //  const firstPageRows = rows.slice(0,10)


    //for Pagination
    // const {pageIndex, pageSize }=state


    return(
        <>
        <div>
            <div>
                <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All 
            </div>
            {allColumns.map((column) => (
                <div key={column.id}>
                    <label>
                        <input type='checkbox' {...column.getToggleHiddenProps()} />
                        {column.Header}
                    </label>
                </div>
            ))}
        </div>


        <button onClick={changeOrder}>Change Column Order </button>


        <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                 <th {...column.getHeaderProps()}>{column.render('Header')}
                
                
                {/* // <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')} */}
                {/* <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        {/* <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody> */}
        {/* //column hide here */}
        <tfoot>
            {
                footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {
                            footerGroup.headers.map(column => (
                                <td {...column.getFooterProps}>{column.render("Footer")}</td>
                            ))}
                    </tr>
                ))
            }
        </tfoot>
      </table>
      {/* //row selection here  */}
      <pre>
            <code>
                {JSON.stringify(
                    {
                        selectedFlatRows: selectedFlatRows.map((row)=> row.original),
                        },
                        null,
                        2
                )}
            </code>
        </pre>
{/* // pagination here */}
                    
{/* <div>
        <span>
            Page{' '}
            <strong>
                {pageIndex+1} of {pageOptions.length}
            </strong>{' '}
        </span>
        <span>
            | Go to Page:{' '}
            <input type='number' defaultValue={pageIndex+1} 
            onChange={e =>{
              const pageNumber =  e.target.value ? Number(e.target.value)-1 : 0
                gotoPage(pageNumber)
            }} 
            style={{width:'50px'}} /> 
        </span>
        <select value={pageSize} onChange={e=> setPageSize(Number(e.target.value))}>
            {
            [10,25,50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
            ))
            } 
        </select>
        <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
        <button onClick={()=> previousPage()} disabled={!canPreviousPage}> PreviousPage</button>
        <button onClick={()=> nextPage()} disabled={!canNextPage}>  NextPage </button>
        <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{">>"}</button>

      </div> */}

      </>
    )
}






// without pagination final script include(Row selection, Column hide, Column Order, simple Table,)
// Backup Script

// import React, {useMemo} from "react";
// import { useTable,useColumnOrder,
//     // useSortBy
//     useRowSelect,
    
// } from "react-table";
// import MOCK_DATA from './MOCK_DATA.json';
// import { COLUMNS } from "./columns";
// import './Table.css';
// import { Checkbox } from "./Checkbox";


// export const ColumnOrder = ()=>{

//     const columns = useMemo(()=> COLUMNS,[]);
//     const data = useMemo(()=> MOCK_DATA,[]);

//     // const tableInstance =  

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         footerGroups,
//         rows,
//         //column hidding
//         allColumns,
//         getToggleHideAllColumnsProps,
//         //row selection
//         selectedFlatRows,
//         // pagination


//         setColumnOrder,
//         prepareRow} = useTable({
//         columns:columns,
//         data: data  
//       },useColumnOrder,
//     //   //sorting table 
//     //   useSortBy
//     // Row selection
//       useRowSelect,
//       (hooks) => {
//         hooks.visibleColumns.push((columns)=>{
//             return [
//                 {
//                     id:'selection',
//                     Header:({getToggleAllRowsSelectedProps}) => (
//                         <Checkbox {...getToggleAllRowsSelectedProps()} />
//                     ),
//                     Cell:({row}) => (
//                         <Checkbox {...row.getToggleRowSelectedProps()} />
//                     )
//                 },
//                 ...columns
//             ]
//         })
//       }
// // Row selection above this

//       )


//       const changeOrder =() =>{
//         setColumnOrder([
//             'id',
//             'first_name',
//             'last_name',
//             'phone',
//             'country',
//             'date_of_birth'
//         ])
//       }


//     // for row selection to reduce rows for checking  just 10 rows in the table 
//     //  const firstPageRows = rows.slice(0,10)


//     return(
//         <>
//         <div>
//             <div>
//                 <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All 
//             </div>
//             {allColumns.map((column) => (
//                 <div key={column.id}>
//                     <label>
//                         <input type='checkbox' {...column.getToggleHiddenProps()} />
//                         {column.Header}
//                     </label>
//                 </div>
//             ))}
//         </div>


//         <button onClick={changeOrder}>Change Column Order </button>
//         <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                  <th {...column.getHeaderProps()}>{column.render('Header')}
                
                
//                 {/* // <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')} */}
//                 {/* <span>
//                     {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//                     </span> */}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row, i) => {
//             prepareRow(row)
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 })}
//               </tr>
//             )
//           })}
//         </tbody>
//         <tfoot>
//             {
//                 footerGroups.map(footerGroup => (
//                     <tr {...footerGroup.getFooterGroupProps()}>
//                         {
//                             footerGroup.headers.map(column => (
//                                 <td {...column.getFooterProps}>{column.render("Footer")}</td>
//                             ))}
//                     </tr>
//                 ))
//             }
//         </tfoot>
//       </table>
//       <pre>
//             <code>
//                 {JSON.stringify(
//                     {
//                         selectedFlatRows: selectedFlatRows.map((row)=> row.original),
//                         },
//                         null,
//                         2
//                 )}
//             </code>
//         </pre>
//       </>
//     )
// }




// git remote add origin https://github.com/Abubakar098/ReactTables.git
// git branch -M main
// git push -u origin main