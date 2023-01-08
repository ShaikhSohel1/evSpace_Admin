import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDoc,
  where,
  query,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { Battery0Icon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Tables from "../Tables/Tables";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RevnueTable from "../Tables/RevnueTable";


export default function ChartData() {
  const [todos, settodos] = useState([]);
  const [booking, setbooking] = useState([])
  const [book, setbook] = useState(false);
  const [total, settotal] = useState(null)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
var sum = 0;
const d = new Date();


  const fetchPost = async () => {
    const docRef = await getDocs(collection(db, "booking")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setbooking(newData)
        console.log(newData)
            const sum = newData.reduce((accumulator, object) => {
      return accumulator + parseInt(object.prize);
    }, 0);
    settotal(sum)
      }
    );
  };


  const bookingslot = async () => {
    const docRef1 = await getDocs(collection(db, "Places")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          settodos(newData);
          // console.log(newData)
        }
      );
  };


  useEffect(() => {
    fetchPost();
    bookingslot();
  
    return () => {
      console.log("This will be logged on unmount");
    }
  }, [startDate, endDate]);


  // useEffect(() => {
  //   todos.map(val => {
  //     console.log(val.price)
  //   })
  //   // const sum = todos.reduce((accumulator, object) => {
  //   //   return accumulator + object.price;
  //   // }, 0);
  //   // settotal(sum)
  // }, [to]);






  return (
    <div>


    <div className="grid grid-flow-col">
      <div class="relative flex flex-col min-w-0 mb-6 break-words bg-gray-700 shadow-soft-xl rounded-2xl bg-clip-border m-4">
        <div class="flex-auto p-4">
          <div class="flex flex-wrap -mx-3">
            <div class="flex-none w-2/3 max-w-full px-3">
              <div>
                <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                  Revenue
                </p>
                <h5 class="mb-0 font-bold">
                  &#8377; {total}
                  {/* <span class="leading-normal text-sm font-weight-bolder text-lime-500">+55%</span> */}
                </h5>
              </div>
            </div>
            <div class="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
              <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                <CurrencyDollarIcon />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="relative flex flex-col min-w-0 mb-6 break-words bg-gray-700 shadow-soft-xl rounded-2xl bg-clip-border m-4">
  <div class="flex-auto p-4">
    <div class="flex flex-wrap -mx-3">
      <div class="flex-none w-2/3 max-w-full px-3">
        <div>
          <p class="mb-0 font-sans font-semibold leading-normal text-sm">Users</p>
          <h5 class="mb-0 font-bold">
            5
            {/* <span class="leading-normal text-sm font-weight-bolder text-lime-500">+55%</span> */}
          </h5>
        </div>
      </div>
      <div class="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
        <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
          <UserCircleIcon />
        </div>
      </div>
    </div>
  </div>
</div>


<div class="relative flex flex-col min-w-0 mb-6 break-words bg-gray-700 shadow-soft-xl rounded-2xl bg-clip-border m-4">
  <div class="flex-auto p-4">
    <div class="flex flex-wrap -mx-3">
      <div class="flex-none w-2/3 max-w-full px-3">
        <div>
          <p class="mb-0 font-sans font-semibold leading-normal text-sm">Stations</p>
          <h5 class="mb-0 font-bold">
            5
            {/* <span class="leading-normal text-sm font-weight-bolder text-lime-500">+55%</span> */}
          </h5>
        </div>
      </div>
      <div class="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
        <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
          <Battery0Icon />
        </div>
      </div>
    </div>
  </div>
</div>

</div>

{/* tables */}

{/* <h2 className="text-2xl font-semibold m-8">Revenue</h2>
<div className='m-4 col-span-2'>
    <div className='grid grid-cols-4 m-4 p-4 text-center  uppercase'>
        <div>
            Month
        </div>
        <div>
            Revenue
        </div>
 
    </div>

 <RevnueTable 
 month={d}
 />


</div> */}


<div class="flex flex-row-reverse gap-4">
              {/* date picker */}
              <div className="flex">
              <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control block px-3 py-1.5 text-base font-normal text-white bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none"
                  placeholder="Select a date"
                />
                <p className="mx-6">to</p>
                  <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="form-control block px-3 py-1.5 text-base font-normal text-white bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none"
                  placeholder="Select a date"
                />
              </div>
            </div>


            <div className='m-4'>
    <div className='grid grid-cols-4 m-4 p-4 text-center  uppercase'>
        <div>
            Location Name
        </div>
        <div>
            Booked slots
        </div>
        <div>
            Empty slots
        </div>
        <div>
            Revenue
        </div>
    </div>

    {todos.map(val => (
        <Tables 
        key={val.id}
        id={val.id}
        name={val.Loc_Name}
        startdate={startDate}
        enddate={endDate}
        booking={booking}
        />
    ))}

  
    </div>



{/* <div className="grid grid-cols-3 m-4">
  <div className="col-span-2">
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Product name
                </th>
                <th scope="col" class="py-3 px-6">
                    Color
                </th>
                <th scope="col" class="py-3 px-6">
                    Category
                </th>
           
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="py-4 px-6">
                    Sliver
                </td>
                <td class="py-4 px-6">
                    Laptop
                </td>
          
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="py-4 px-6">
                    White
                </td>
                <td class="py-4 px-6">
                    Laptop PC
                </td>
            
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="py-4 px-6">
                    Black
                </td>
                <td class="py-4 px-6">
                    Accessories
                </td>
          
            </tr>
        </tbody>
    </table>
</div>
  </div>

</div> */}



    </div>
  );
}
