import { useRouter } from 'next/router';
import React from 'react'

export default function SideBar() {
    const router = useRouter();
    
  return (
    <div>
        
        <div class="w-[17rem] h-full shadow-md bg-slate-900 px-1 fixed">
        <a href="https://flowbite.com/" class="flex items-center pl-2.5 mb-5 mt-7">
         <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-7" alt="Flowbite Logo" />
         <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">evSpace</span>
      </a>
  <ul class="relative">
    <li class="relative">
      <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark"
      onClick={() => router.push("/")}>Dashboard</a>
    </li>
    <li class="relative">
      <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark"
      onClick={() => router.push("/addplaces")}>Add Locations</a>
    </li>
    <li class="relative">
      <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark"
      onClick={() => router.push("/chart")}
      >reports</a>
    </li>
  </ul>
</div>
    </div>
  )
}
