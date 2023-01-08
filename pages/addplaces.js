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
import { db, storage } from "../firebase/firebase";
import AddLocation from './component/AddLocation'
import SideBar from './component/SideBar'

export default function addplaces() {
  const [todos, settodos] = useState([]);
  const [booking, setbooking] = useState([])
  const [book, setbook] = useState(false);


  const fetchPost = async () => {
    const docRef = await getDocs(collection(db, "Places")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        settodos(newData);
        console.log(todos);
        console.log(newData);
      }
    );
  };

  const bookingslot = async () => {
    const docRef1 = await getDocs(collection(db, "booking")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setbooking(newData)
          console.log(newData)
        }
      );
  };


  useEffect(() => {
    fetchPost();
    bookingslot();
  
    return () => {
      console.log("This will be logged on unmount");
    }
  }, [book]);

  return (
    <div className='grid grid-cols-5 gap-0 bg-slate-800'>
      <SideBar />
      <div className='col-span-4 m-5'>
        <AddLocation 
        todos={todos}
        book={book}
        setbook={setbook}
        />
      </div>
    </div>
  )
}
