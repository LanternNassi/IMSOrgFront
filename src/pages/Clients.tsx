import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import DefaultLayout from '../layout/DefaultLayout';
import { Modal } from '../components/ModalSettings';
import SwitcherThree from '../components/Switchers/SwitcherThree';
import DatePickerTwo from '../components/Forms/DatePicker/DatePickerTwo';
import { ClientStructure, ModalButtons } from '../Interfaces';
import { axios_instance } from '../hooks/RequestConfig';


import { Bounce } from "react-activity";
import "react-activity/dist/library.css";

const Clients = () => {

    // const inputDate = new Date('Feb 13, 2024');

    // // Get current date
    // const currentDate = new Date();
    
    // // Set the input date's year, month, and day to the current date's year, month, and day
    // inputDate.setFullYear(currentDate.getFullYear());
    // inputDate.setMonth(currentDate.getMonth());
    // inputDate.setDate(currentDate.getDate());
    
    // // Add 30 days to the input date
    // inputDate.setDate(inputDate.getDate() + 30);

    // const outputDate = inputDate.toISOString().split('T')[0];

    //alert(inputDate.toISOString())


    const [showModal, setShowModal] = React.useState(false);

    const [clients , setclients] = React.useState<ClientStructure[]>([])

    //Form fields
    const [firstName , setfirstname] = React.useState<string>("Nessim")
    const [lastname , setlastname] = React.useState<string>("")
    const [Email , setemail] = React.useState<string>("")
    const [business , setbusiness] = React.useState<string>("")
    const [phone , setphone] = React.useState<string>("")
    const [Address , setAddress] = React.useState<string>("")
    const [status , setstatus] = React.useState<boolean>(true)
    const [ValidTill , setValidTill] = React.useState("")
    

    React.useEffect(()=>{
      axios_instance.get('/clients')
        .then(function (response) {
          // handle success
          //alert(response.status);
          setclients(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });

    },[])

    //alert('ssjs')

    const submitClient = () =>{

      var data = new FormData();
      data.append('FirstName', firstName);
      data.append('LastName', lastname);
      data.append('Email', Email);
      data.append('Phone', phone);
      data.append('Address', Address);
      data.append('BusinessName', business);
      data.append('Status', status ? "connected" : "disconnected");

      data.append('ValidTill' , new Date(ValidTill).toISOString());

      axios_instance.post('/clients' , data).then((Response)=>{
        if (Response.status == 201){
          alert("Client created successfully");
          setShowModal(false)
        }
      })

    }

    const buttonsList : ModalButtons[] = [
        {
            name : "Save",
            color : "emerald",
            InAction : false,
            callback : ()=>{
                submitClient()
                //console.log("Saved successfully")
                //alert("Clickeds")
                //alert(firstName)
            }
        },

        {
            name : "Cancel",
            color : "emerald",
            InAction : false,
            callback : () =>{
              setShowModal(false)
            }
        }

    ]



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clients" />
        {showModal ? (
            <Modal title='ADD CLIENT' Close={()=>{setShowModal(false)}} buttons={buttonsList}>
                
                <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
                    </label>
                    <input
                      onChange={({target}) =>{
                        setfirstname(target.value);

                      }}
                      type="text"
                      placeholder="Enter first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      onChange={({target})=>{

                        setlastname(target.value);
                        
                      }}
                      type="text"
                      placeholder="Enter last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    onChange={({target})=>{

                      setemail(target.value);
                      
                    }}
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Business Name
                  </label>
                  <input
                    onChange={({target})=>{

                      setbusiness(target.value);
                      
                    }}
                    type="text"
                    placeholder="Enter the business name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone 
                    </label>
                    <input
                      onChange={({target})=>{

                        setphone(target.value);
                        
                      }}
                      type="text"
                      placeholder="Enter phone number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Address
                    </label>
                    <input
                      onChange={({target})=>{

                        setAddress(target.value);
                        
                      }}
                      type="text"
                      placeholder="Enter the address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Status of the app 
                    </label>
                    <SwitcherThree status = {true} setvalue = {setstatus}/>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <DatePickerTwo setvalue={setValidTill} label = {"Valid Till"}/>
                  </div>
                </div>

              </div>

            </Modal>
        ) : (null)}
      <div className="flex flex-col gap-10">
        {
          (clients.length >= 0)? (
            <TableOne Clients={clients} AddClient={()=>{setShowModal(true)}}/>
          ) : (
            <div className="flex flex-col items-center justify-center mx-auto h-screen">
              <Bounce/>
              <h3 className='py-3'>Loading clients data</h3>
            </div>
          ) 
        }
      </div>
    </DefaultLayout>
  );
};

export default Clients;
