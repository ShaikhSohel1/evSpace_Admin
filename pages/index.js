import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DashBord from './component/DashBord'
import SideBar from './component/SideBar'
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

export default function Home() {
  const [todos, settodos] = useState([]);
  const [booking, setbooking] = useState([]);


  const fetchPost = async () => {
    const docRef = await getDocs(collection(db, "Places")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        settodos(newData);
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
  }, []);

  
const array1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0];

const createchat = async  () => {

  const docRef = await addDoc(collection(db, "cart"),{
  Loc_name: inputref.current.value,
  LDescription: desref.current.value,
  timestamp: serverTimestamp()
})

array1.forEach(async element => {
  const docdocRef = await addDoc(collection(db, "places",docRef.id,"Timing"),{
    start_time: element-1,
    end_time: element,
    book: false,
    timestamp: serverTimestamp()
  })
});


};





  return (
    <div className='grid grid-cols-5 gap-0 bg-slate-800'>
      <SideBar />


<div className='col-span-4'>
      {todos.map(val => (
      <DashBord 
      id={val.id}
      name={val.Loc_Name}
      des={val.LDescription}
      docs={booking}
      />
      ))}
      </div>


    </div>
  )
}
