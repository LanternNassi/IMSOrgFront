import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useParams } from 'react-router-dom';
import React from 'react';
import { axios_instance } from '../hooks/RequestConfig';
import { ClientStructure , BillStructure } from '../Interfaces';
import TableTwo from '../components/Tables/TableTwo';

const Profile = () => {

  const [profile , setprofile] = React.useState<ClientStructure | null>(null)
  const [bills , setbills] = React.useState<BillStructure[]>([])

  let p = useParams()

  React.useEffect(()=>{
    axios_instance.get("/clients/" + p.profile_id)
    .then((response)=>{
        if (response.status == 200){
          setprofile(response.data)
        }
    })

    axios_instance.get("/bills/client/" + p.profile_id)
    .then((response)=>{
      if (response.status == 200){
        setbills(response.data)
      }
    })

  },[])

  const getDate = (datestring : string) : string => {
    const date = new Date(datestring);
  
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
  
    return day + "-" + month + "-" + year;
  }

  if (profile == null){
    return (
      <DefaultLayout>
        <Breadcrumb pageName='Profile'/>

      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          
          <div className="mt-4 my-7">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {profile.BusinessName}
            </h3>
            <p className="font-medium">{profile.FirstName + " " + profile.LastName}</p>
            
            <div className='flex flex-row justify-around items-center my-8 h-40 w-full'>
              <div className='flex flex-row justify-around items-center h-40 w-4/5'>
                <div className='flex flex-col justify-around items-center w-30 h-40'>
                    <div>
                      <h3 className='font-semibold'>Phone contact</h3>
                      <h3>{profile.Phone}</h3>
                    </div>
                    <div>
                      <h3 className='font-semibold'>Email</h3>
                      <h3>{profile.Email}</h3>
                    </div>
                </div>
                <div className='flex flex-col justify-around items-center w-30 h-40'>
                    <div>
                      <h3 className='font-semibold'>Status</h3>
                      <h3>{profile.Status}</h3>
                    </div>
                    <div>
                      <h3 className='font-semibold'>Address</h3>
                      <h3>{profile.Address}</h3>
                    </div>
                </div>
                <div className='flex flex-col justify-around items-center w-30 h-40'>
                    <div>
                      <h3 className='font-semibold'>Valid Till</h3>
                      <h3>{getDate(profile.ValidTill)}</h3>
                    </div>
                    <div>
                      <h3 className='font-semibold'>Client ID</h3>
                      <h3>{profile.ClientID}</h3>
                    </div>
                </div>
              </div>
              
            </div>

            <div className="w-full">
              <div>
                  <TableTwo TableName={'Bills for ' + profile.BusinessName} Bills={bills}/>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
