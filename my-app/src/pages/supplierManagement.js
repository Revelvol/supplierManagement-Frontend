// import react table here 
import { useQuery } from "react-query"
import SupplierTables from "./tables/supplierTables"
import React from "react"

const supplierUrl ="http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/"


function SupplierManagement () {
    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            columns: [
              {
                Header: 'First Name',
                accessor: 'firstName',
              },
              {
                Header: 'Last Name',
                accessor: 'lastName',
              },
            ],
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Age',
                accessor: 'age',
              },
              {
                Header: 'Visits',
                accessor: 'visits',
              },
              {
                Header: 'Status',
                accessor: 'status',
              },
              {
                Header: 'Profile Progress',
                accessor: 'progress',
              },
            ],
          },
        ],
        []
      )
    const { isLoading, error, data } = useQuery('supplierData', () =>
     fetch(supplierUrl).then(res =>
       res.json()
     )
   )
 
   if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message

    // ok data itu adalah array dengan index 0 adalah data yang paling atas 
    
    
    return (
        <div>
            supplier Management
            <SupplierTables columns={NaN} data={NaN} /> 
        </div>
    )
}

export default SupplierManagement