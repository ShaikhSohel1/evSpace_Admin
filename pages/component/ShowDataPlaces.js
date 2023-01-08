import { Fragment, useEffect, useRef, useState } from "react";
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
import { Dialog, Transition } from "@headlessui/react";
import {
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import OpenTiming from "./OpenTiming";

export default function ShowDataPlaces({ id, name, des, available, booking, lang, lat }) {
  const [opentiming, setopentiming] = useState(false);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [edit, setedit] = useState(false);
  const [todos, settodos] = useState([]);
  var sort;
  const bookingslot = async () => {
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
    }
  };

  useEffect(() => {
    bookingslot();
  }, []);

  return (
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mb-4">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Location name
            </th>
            <th scope="col" class="py-3 px-6">
              Description
            </th>
            <th scope="col" class="py-3 px-6">
              available
            </th>
            <th scope="col" class="py-3 px-6">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-slate-900 dark:border-gray-700 hover:bg-slate-900 dark:hover:bg-gray-600">
            <th
              scope="row"
              class=" w-64 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="w-64 truncate">
                <span>{name}</span>
              </div>
            </th>
            <td class="w-64 truncate">
              <div class="w-64 truncate">
                <span>{des}</span>
              </div>
            </td>
            <td class="py-4 px-6 truncate ">{available}</td>
            <td class="py-4 px-6 text-right flex gap-3">
              <div
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => setedit(true)}
              >
                Edit
              </div>
              <div>
                {opentiming ? (
                  <>
                    <ChevronDownIcon
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => setopentiming(!opentiming)}
                    />
                  </>
                ) : (
                  <>
                    <ChevronUpIcon
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => setopentiming(!opentiming)}
                    />
                  </>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {opentiming ? (
        <>
          <div className="text-lg font-medium leading-10 text-white mb-6">
            Charging stations
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-9 md:grid-cols-4 gap-4 pb-6">
            {todos.map((val) => (
              <>
                <OpenTiming
                  id={val.id}
                  opentiming={opentiming}
                  setopentiming={setopentiming}
                  start={val.start_time}
                  end={val.end_time}
                  charging={val.Charging_Type}
                />
              </>
            ))}
            <OpenTiming opentiming={opentiming} setopentiming={setopentiming} />
            <OpenTiming opentiming={opentiming} setopentiming={setopentiming} />
          </div>
        </>
      ) : null}

      {/* model */}

      {edit ? (
        <>
          <Transition.Root show={edit} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setedit}
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
                              Deactivate account
                            </Dialog.Title>
                            <div className="mt-5">
                              <label
                                for="email"
                                class="block mb-2 text-sm font-medium text-white"
                              >
                                Location Name
                              </label>
                              <input
                                type="text"
                                value={name}
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96 "
                                placeholder="Location Name"
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
                                value={des}
                                name="email"
                                id="email"
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96"
                                placeholder="Location Description"
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
                                value={lat}
                                name="email"
                                id="email"
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96"
                                placeholder="lattitude"
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
                                value={lang}
                                id="email"
                                class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-auto w-96"
                                placeholder="longitude"
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
                          onClick={() => setedit(false)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setedit(false)}
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
