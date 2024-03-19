import SwitcherThree from '../Switchers/SwitcherThree';
import React from 'react'
import { IoIosAdd } from "react-icons/io";
import { ClientStructure } from '../../Interfaces';
import { NavLink, useLocation } from 'react-router-dom';





const getDate = (datestring : string) : string => {
  const date = new Date(datestring);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
}

const TableOne : React.FC<{AddClient : ()=>void , Clients : ClientStructure[]}> = ({AddClient , Clients}) => {

  const [checkbox , setcheckbox] = React.useState(false)

  const [clients] = React.useState<ClientStructure[]>(Clients);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      
      <div className='flex flex-row justify-between'>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Manage Clients
        </h4>

            <button onClick = {()=>AddClient()} className='flex flex-row items-center justify-around h-12 w-35 rounded-lg bg-lime-50 hover:bg-lime-100 active:text-sm dark:bg-boxdark'>
              <h5 className="text-black dark:text-white">
                ADD CLIENT 
              </h5>
              <IoIosAdd />
            </button>        
        
        
      </div>
      
      
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Client ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Names
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Business
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Valid Till
            </h5>
          </div>
        </div>

        {clients.map((client, key) => (

          <NavLink className={"flex flex-col"} to = {"/profile/" + client.ClientID}>
            <button
              className={`grid grid-cols-3 hover:bg-slate-100 active:text-sm sm:grid-cols-6 ${
                key === Clients.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              
              <p className="hidden text-black dark:text-white sm:block">
                {client.ClientID.slice(0,10)}...
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{client.FirstName + " " + client.LastName}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{client.Phone}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{client.BusinessName}</p>
            </div>

            <button onClick={()=>{alert(key)}} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <SwitcherThree status = {(client.Status == "connected")? true : false} setvalue = {setcheckbox}/>
              {/* <p className="text-black dark:text-white">{brand.sales}</p> */}
            </button>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{getDate(client.ValidTill)}</p>
            </div>
          </button>
          </NavLink>
          
        ))}
      </div>
    </div>
  );
};

export default TableOne;
