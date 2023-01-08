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

export default function Tables({id, name, startdate, enddate, booking}) {
    const [booked, setbooked] = useState(null)
    const [empty, setempty] = useState(null)
    const [prize, setprize] = useState(null)
var bookedslots = 0;
var emptyslots = 0;
var price = 0;
var d1 = new Date(startdate);
var d2 = new Date(enddate);
var daycount = 0;
var Difference_In_Time = d2.getTime() - d1.getTime();
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
console.log(parseInt(Difference_In_Days))

    const getData = async () => {




booking.map(val => {
    if(val.placeid == id)
    {
        bookedslots = bookedslots +1;
        price = 90 + price;
    }
})

setbooked(bookedslots)
setempty((parseInt(Difference_In_Days) * 23) - booked)
setprize(price)
 
        





        // const docRef = await getDocs(collection(db, "booking"), where("timestamp",">",Date(startdate)),where("timestamp","<",Date(enddate))).then(
        //   (querySnapshot) => {
        //     const newData = querySnapshot.docs.map((doc) => ({
        //       ...doc.data(),
        //       id: doc.id,
        //     }));
        // console.log(newData)
        //   }
        // );
      
      };
      
      
      
      
        useEffect(() => {
        getData();
        
          return () => {
            console.log("This will be logged on unmount");
          }
        }, [startdate, enddate]);

        

  return (
    <>



{/* data */}

<div className='grid grid-cols-4 text-center p-4 bg-gray-800 border-b dark:border-gray-700'>
        <div>
            {name}
        </div>
        <div>
            {booked}
        </div>
        <div>
            {empty}
        </div>
        <div>
        &#8377; {prize}
        </div>
    </div>


</>
  )
}




// <div className="grid grid-cols-3 m-4">
// <div className="col-span-2">
// <div class="overflow-x-auto relative">
//   <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//       <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//               <th scope="col" class="py-3 px-6">
//                   Product name
//               </th>
//               <th scope="col" class="py-3 px-6">
//                   Color
//               </th>
//               <th scope="col" class="py-3 px-6">
//                   Category
//               </th>
         
//           </tr>
//       </thead>
//       <tbody>
//           <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//               <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   Apple MacBook Pro 17"
//               </th>
//               <td class="py-4 px-6">
//                   Sliver
//               </td>
//               <td class="py-4 px-6">
//                   Laptop
//               </td>
        
//           </tr>
//           <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//               <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   Microsoft Surface Pro
//               </th>
//               <td class="py-4 px-6">
//                   White
//               </td>
//               <td class="py-4 px-6">
//                   Laptop PC
//               </td>
          
//           </tr>
//           <tr class="bg-white dark:bg-gray-800">
//               <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   Magic Mouse 2
//               </th>
//               <td class="py-4 px-6">
//                   Black
//               </td>
//               <td class="py-4 px-6">
//                   Accessories
//               </td>
        
//           </tr>
//       </tbody>
//   </table>
// </div>
// </div>

// </div>