import Filters from "./Filters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Time from "./Time";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function DashBord({ id, name, des, docs }) {
  const [startDate, setStartDate] = useState(new Date());
  const [charging, setcharging] = useState();
  const [array, setarray] = useState([]);
  const [model, setmodel] = useState(true);
  const [todos, settodos] = useState([]);
  const [images, setimages] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const uplodimageRef = useRef();
  const [showimage, setshowimage] = useState(null);
  const [spinner, setspinner] = useState(null)

  var dd;
  var sort;

  const Charging_Type = ["All", "Type-1", "Type-2", "Type-3"];

  const uplodimage = async () => {

    const docdocRef = await addDoc(collection(db, "Places",id,"images"),{
      url: uplodimageRef.current.value,
      timestamp: serverTimestamp()
    });

    if (docdocRef) {
      setshowimage(null);
      setOpen(false);
    }
  };

  const deltestation = async () => {
    setspinner(true)
    const docc = await deleteDoc(doc(db, "Places", id));
    setspinner(false)
  }

  const fetchPost = async () => {
    if (id) {
      const docRef = await getDocs(collection(db, "Places", id, "Timing")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          settodos(newData);
          sort = newData.slice(0);
          sort.sort(function (a, b) {
            return a.start_time - b.start_time;
          });
          settodos(sort);
        }
      );

      const docRef1 = await getDocs(
        collection(db, "Places", id, "images")
      ).then((querySnapshot) => {
        const newData1 = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        //  setdocss(newData);
        setimages(newData1);
      });
    }
  };

  useEffect(() => {
    fetchPost();

    return () => {
      console.log("This will be logged on unmount");
    }
  }, [db]);



  return (
    <div className='className=" bg-gradient-to-r from-slate-900 to-slate-700 mx-5 my-6 rounded-[12px]"'>
      <h1 className="font-medium leading-tight text-3xl mt-0 mb-2 mx-6 pt-3">
        {name}
      </h1>
      <h6 className="font-medium leading-tight text-medium mt-0 mb-2 mx-6">
        {des}
      </h6>

      <div class="grid lg:grid-cols-9 gap-2 items-center mx-6 my-3 grid-cols-3">
        {images.map((val) => (
          <div
            className="mb-4 hover:scale-110 transition transform duration-200 ease-out"
            // onClick={() => imgPreview(val.url)}
          >
            <img src={val.url} className="w-full h-auto rounded-lg" alt="fg" />
          </div>
        ))}
        <a
          href="#_"
          class="inline-block py-4 mb-3 text-xl text-white bg-gray-600 px-7 hover:bg-gray-700 rounded-xl"
          onClick={() => setOpen(true)}
        >
          <PlusIcon />
        </a>
      </div>

      <div className="justify-between bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex">
          <div
            className="text-center bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900 w-[50%] p-6 rounded-tl-[5px] cursor-default"
            onClick={() => setmodel(true)}
          >
            Charging Stations
          </div>
          <div
            className="text-center bg-gradient-to-tr from-slate-900 via-black to-slate-900 w-[50%] p-6 rounded-tr-[5px] cursor-default"
            onClick={() => setmodel(false)}
          >
            Repair & Service
          </div>
        </div>

        {model ? (
          <div className="p-6 bg-white rounded-b-[5px] bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900">
            <div class="flex flex-row-reverse gap-4">
              <Filters
                option="Charging Type"
                select={Charging_Type}
                item={charging}
                setitem={setcharging}
              />
              {/* date picker */}
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control block px-3 py-1.5 text-base font-normal text-white bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none"
                  placeholder="Select a date"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-9 md:grid-cols-5">
              {todos.map((post) => {
                var flag = 0;
                docs.map((val) => {
                  dd = new Date(val.date.seconds * 1000);
                  if (val.placeid == id) {
                    if (
                      dd.getFullYear() == startDate.getFullYear() &&
                      dd.getMonth() == startDate.getMonth() &&
                      dd.getDate() == startDate.getDate()
                    ) {
                      if (val.start_time == post.start_time) return (flag = 1);
                    }
                  }
                });
                if (flag == 1) {
                  return (
                    <>
                      <Time
                        key={post.id}
                        id={post.id}
                        ogid={id}
                        start={post.start_time}
                        end={post.end_time}
                        val={true}
                        array={array}
                        setarray={setarray}
                        name={name}
                        startDate={startDate}
                        docs={docs}
                      />
                    </>
                  );
                } else {
                  return (
                    <>
                      <Time
                        key={post.id}
                        id={post.id}
                        ogid={id}
                        start={post.start_time}
                        end={post.end_time}
                        val={false}
                        array={array}
                        setarray={setarray}
                        name={name}
                        startDate={startDate}
                        docs={docs}
                      />
                    </>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white rounded-b-[5px] bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Location Name
            </h5>

            <div class="flex flex-row-reverse gap-4">
              <Filters
                option="Charging Type"
                select={Charging_Type}
                item={charging}
                setitem={setcharging}
              />
              {/* date picker */}
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control block px-3 py-1.5 text-base font-normal text-white bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none"
                  placeholder="Select a date"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-9 md:grid-cols-5">
              {todos.map((post) => {
                var flag = 0;
                docs.map((val) => {
                  dd = new Date(val.date.seconds * 1000);
                  if (val.placeid == post.id) {
                    if (
                      dd.getFullYear() == startDate.getFullYear() &&
                      dd.getMonth() == startDate.getMonth() &&
                      dd.getDate() == startDate.getDate()
                    ) {
                      if (val.start_time == post.start_time) return (flag = 1);
                    }
                  }
                });
                if (flag == 1) {
                  return (
                    <>
                      <Time
                        key={post.id}
                        id={post.id}
                        ogid={id}
                        start={post.start_time}
                        end={post.end_time}
                        val={true}
                        array={array}
                        setarray={setarray}
                        name={name}
                        startDate={startDate}
                        docs={docs}
                      />
                    </>
                  );
                } else {
                  return (
                    <>
                      <Time
                        key={post.id}
                        id={post.id}
                        ogid={id}
                        start={post.start_time}
                        end={post.end_time}
                        val={false}
                        array={array}
                        setarray={setarray}
                        name={name}
                        startDate={startDate}
                        docs={docs}
                      />
                    </>
                  );
                }
              })}
            </div>
          </div>
        )}

{spinner ? (
  <div class="flex flex-row-reverse">
    <section className="flex">
                          
                          <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                              <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                              </svg>
                              Loading...
                          </button>
                          </section>

      </div>
                                                  ):(

<div class="flex flex-row-reverse">
        <div onClick={deltestation}>
          <section className="flex">
            <button
              className="bg-blue-500 hover:bg-sky-500 hover:ring-sky-500 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6 mx-4 my-5"
            >
              delete
            </button>
          </section>
        </div>
      </div>
       )}
      </div>
                                                 

      {/* model */}

      {open ? (
        <>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      {/* content */}
                      <div className="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-white"
                            >
                              Add images
                            </Dialog.Title>
                            <div className="mt-5">
                              {showimage ? (
                                <>
                                  <div className="mb-4">
                                    <img
                                      src={showimage}
                                      className="w-full h-auto rounded-lg"
                                      alt="fg"
                                    />
                                  </div>
                                </>
                              ) : null}

                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-white"
                              >
                                url
                              </label>
                              <input
                                type="text"
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96 "
                                placeholder="url"
                                ref={uplodimageRef}
                                onChange={(e) => setshowimage(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={uplodimage}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => {
                            setOpen(false);
                            setshowimage(null);
                          }}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      ) : null}
    </div>
  );
}
