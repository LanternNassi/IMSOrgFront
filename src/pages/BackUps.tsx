import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React from 'react';
import TableThree from '../components/Tables/TableThree';
import { BackUpStructure } from '../Interfaces';
import { axios_instance } from '../hooks/RequestConfig';

const BackUps = () => {

  const [backups , setbackups] = React.useState<BackUpStructure[]>([])

  const params = useParams()


  React.useEffect(()=>{
    if ((params.clientId != undefined) || (params.bill != undefined)){
      axios_instance.get(
        (params.clientId != undefined) ? ("/backups/client/" + params.clientId) : ("backups/bill/" + params.bill)
      ).then((response)=>{
        if (response.status == 200){
          setbackups(response.data)
        }
      })
    } else{
      axios_instance.get("/backups")
      .then((response)=>{
          setbackups(response.data)
      })

    }
    

  },[])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="BackUps" />

      <TableThree Backups={backups}/>
    </DefaultLayout>
  );
};

export default BackUps;
