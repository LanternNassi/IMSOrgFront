import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import TableTwo from '../components/Tables/TableTwo';
import { axios_instance } from '../hooks/RequestConfig';
import { BillStructure } from '../Interfaces';

import React from 'react';

const Bills = () => {

  const [bills , setbills] = React.useState<BillStructure[]>([])

  React.useEffect(()=>{
    axios_instance.get("/bills")
    .then((response)=>{
      if (response.status == 200){
        setbills(response.data)
      }
    })
  },[])

  if (bills.length < 0){
    return (
      <p>Loading info...</p>
    )
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bills" />

      <TableTwo TableName='ALL IMS BILLS' Bills={bills}/>
    </DefaultLayout>
  );
};

export default Bills;
