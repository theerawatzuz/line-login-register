'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import React, {useEffect, useState } from 'react';
// import liff from '@line/liff'

import React, { useState, useEffect } from 'react';
import Line from './line/page';
import axios from 'axios';

export default function Home() {
// useEffect(() => {
//   liff.init({ liffId: '2004878671-5kGmazLb'})
//   .then(() => {
//     //code
//     handleLogin()
//   });
// },[]);

// const handleLogin = async() => {
//   try{
//         //code
//         const profile = await liff.getProfile()
//         console.log(profile)
//   }catch(err){
//     console.log(err)
//   }
// }

const [userData, setUserData] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-1-dwdap/endpoint/lineLogCallUserLogin');
            setUserData(response.data);
        } catch(error) {
            console.log('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

const formatTimestamp = (timestamp) => {
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    };
    return new Date(timestamp).toLocaleString('en-GB', options);
};


  return (
    <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-3">
    
   <Line/>
     <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest login</h5>
        {/* <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a> */}
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        {userData.slice().reverse().map(user => (
            <li key={user._id} class="pt-3 pb-3 sm:pt-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={user.userPic} alt={`${user.userName} image`}/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.userName}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-sm text-gray-900 dark:text-white">
                    {formatTimestamp(user.timeStamp)}
                    </div>
                </div>
            </li>
            ))}
        </ul>
   </div>
</div>
    </div>
    </section>
  );
}
