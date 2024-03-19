import React, {ReactNode } from 'react';
import { ModalButtons } from '../Interfaces';

import { Spinner } from "react-activity";
import "react-activity/dist/library.css";


export const Modal : React.FC<{ children: ReactNode; Close : ()=>void; buttons :ModalButtons[]; title : string }> = ({ children , Close , buttons , title}) => {

  const [buttonsState , setbuttons] = React.useState<ModalButtons[]>(buttons)

  const change_action = (indexID : number , action : boolean) => {
    setbuttons(buttons.map((element , index)=>{
      if (index == indexID){
        return {
          ...element,
          InAction : action
        }
      }
      return element
    }))
  }
  

  const ButtonsList: React.FC = () => {
    return (
      <>
        {buttons.map((element , index) => (
          
          <button
              // className={"bg-" + element.color + "-500 text-white active:bg-" + element.color + "-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
              className={"flex flex-row justify-around items-center bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
              type="button"
              onClick={() => {
                //change_action(index , true);
                element.callback()
                //change_action(index , false);
              }}
            >
              {element.InAction ? (
                <Spinner className='right-4'/>
              ) : (null)}
              {element.name}
            </button> 
        ))}
      </>
    );
  };
  

  return (
    <>
    <div
      className="justify-center items-center z-999 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl w-200">
        {/*content*/}
        <div className="divide-y divide-slate-200 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5  rounded-t">
            <h3 className="text-xl font-semibold">
              {title}
            </h3>
            <button
              className="p-1 ml-auto bg-black-400 border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => Close()}
            >
              <span className="bg-black-400 text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto h-100 overflow-y-auto">
            {children}
          </div>
          {/*footer*/}


          <div className="flex items-center justify-end p-6  rounded-b">
            <ButtonsList/>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
    
  );
};