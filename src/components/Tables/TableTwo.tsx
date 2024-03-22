import { Product } from '../../types/product';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';
import { BillStructure } from '../../Interfaces';
import React from 'react';
import SwitcherThree from '../Switchers/SwitcherThree';
import { NavLink } from 'react-router-dom';

const productData: Product[] = [
  {
    image: ProductOne,
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: ProductTwo,
    name: 'Macbook Pro M1',
    category: 'Electronics',
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: ProductThree,
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: ProductFour,
    name: 'HP Probook 450',
    category: 'Electronics',
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const getDate = (datestring : string) : string => {
  const date = new Date(datestring);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
}

function formatCost(number : number) {
  // 1. Handle non-numeric input
  if (isNaN(number)) {
    return "Invalid number";
  }

  // 2. Round the number to the nearest integer (removes decimals)
  const roundedNumber = Math.round(number);

  // 3. Format the number with commas using Intl.NumberFormat
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SHS', // Set currency to SHS
    minimumFractionDigits: 0, // Remove decimals
  });

  return formatter.format(roundedNumber);
}

function convertBytesToMegs(bytes : number) {
  if (isNaN(bytes)) {
    throw new Error("Invalid input: bytes must be a number");
  }

  // 2. Perform the conversion (1 MB = 1024^2 bytes)
  const megabytes = bytes / Math.pow(1024, 2);
  const roundedmbs = Math.round(megabytes);
  // 3. Return the result
  return roundedmbs;
}


const TableTwo : React.FC<{TableName : string , Bills : BillStructure[]}> = ({TableName , Bills}) => {

  const [bills] = React.useState<BillStructure[]>(Bills)


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {TableName}
        </h4>
      </div>

      <div className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Created At</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Billed</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">BackUps</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Size</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Cost</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Last Update</p>
        </div>
      </div>

      {Bills.map((bill, key) => (
        <NavLink to = {"/backups/bill/" + bill.ID}>
        <button
          className="grid grid-cols-12 w-full border-t border-stroke py-4.5 px-4 dark:border-strokedark hover:bg-slate-100 active:text-sm sm:grid-cols-12 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <h3 className="text-sm text-black dark:text-white">
              {getDate(bill.CreatedAt)}
            </h3>
          </div>

          <div className="col-span-2 flex items-center">
            <h3 className="text-sm text-black dark:text-white">
              {bill.Billed}
              <SwitcherThree status = {bill.Billed} setvalue = {()=>{}}/>
            </h3>
          </div>

          <div className="col-span-2 flex items-center ">
            <h3 className="text-sm text-black dark:text-white">
              {bill.BackupCount.toString()}
            </h3>
          </div>

          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {convertBytesToMegs(bill.BackupSize).toString()} mbs
            </p>
          </div>

          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{formatCost(parseFloat(bill.TotalCost))}</p>
          </div>

          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{getDate(bill.UpdatedAt)}</p>
          </div>

        </button>   
        </NavLink>
        
        
      ))}
    </div>
  );
};

export default TableTwo;
