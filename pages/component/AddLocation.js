import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
import {
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import OpenTiming from "./OpenTiming";
import ShowDataPlaces from "./ShowDataPlaces";
import Map from "./Map";

export default function AddLocation({ todos, booking, book, setbook }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [edit, setedit] = useState(false);
  const [opentiming, setopentiming] = useState(false);
  const [GetLang, setGetLang] = useState(null)
  const [GetLat, setGetLat] = useState(null)
  const [spinner, setspinner] = useState(null)
  const nameRef = useRef();
  const desRef = useRef();
  const langRef = useRef();
  const latRef = useRef();
  const hiddenRef = useRef();

  const array1 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 0,
  ];

  const addlocation = async () => {
    setspinner(true)
    const docRef = await addDoc(collection(db, "Places"), {
      Loc_Name: nameRef.current.value,
      LDescription: desRef.current.value,
      lang: langRef.current.value,
      lat: latRef.current.value,
      hidden: hiddenRef.current.value,
      timestamp: serverTimestamp(),
    });

    for (var i = 1; i < array1.length; i++) {
      const docdocRef1 = await addDoc(
        collection(db, "Places", docRef.id, "Timing"),
        {
          start_time: array1[i - 1],
          end_time: array1[i],
          book: false,
          price: 90,
          timestamp: serverTimestamp(),
        }
      );

      const docdocRef2 = await addDoc(
        collection(db, "Places", docRef.id, "Repaire"),
        {
          start_time: array1[i - 1],
          end_time: array1[i],
          book: false,
          price: 90,
          timestamp: serverTimestamp(),
        }
      );
    }

    

    if (docRef) {
      setbook(!book);
      setOpen(false);
      setspinner(false)
    }
  };



  return (
    <div>
      {todos.map((val) => (
        <>
          <ShowDataPlaces
            id={val.id}
            name={val.Loc_Name}
            des={val.LDescription}
            available={val.lang}
            booking={booking}
            lang={val.lang}
            lat={val.lat}
          />
        </>
      ))}

      <div class="flex flex-row-reverse">
        <button
          className="bg-blue-500 hover:bg-sky-500 hover:ring-sky-500 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6 mx-4 my-5"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
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
                              Add
                            </Dialog.Title>

                            <Map 
                            todos={todos}
                            getlang={setGetLang}
                            getlat={setGetLat}
                            />
                            


                            <div className="mt-5">
                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-white"
                              >
                                Location Name
                              </label>
                              <input
                                type="text"
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96 "
                                placeholder="Location Name"
                                ref={nameRef}
                                required
                              />

                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-white mt-2"
                              >
                                Location Description
                              </label>
                              <input
                                type="text"
                                name="email"
                                id="email"
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96"
                                placeholder="Location Description"
                                ref={desRef}
                                required
                              />

                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-white mt-2"
                              >
                                lattitude
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={GetLat}
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96"
                                placeholder="lattitude"
                                ref={latRef}
                                required
                              />

                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-white mt-2"
                              >
                                longitude
                              </label>
                              <input
                                type="text"
                                name="email"
                                id="email"
                                value={GetLang}
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96"
                                placeholder="longitude"
                                ref={langRef}
                                required
                              />

                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-white mt-2"
                              >
                                hidden
                              </label>
                              <input
                                type="text"
                                name="email"
                                id="email"
                                value="false"
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96"
                                placeholder="hidden"
                                ref={hiddenRef}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        {spinner ? (
                          
<button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
</button>

                        ):(
                          <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={addlocation}
                        >
                          Add
                        </button>
                        )}

                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
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
