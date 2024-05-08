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
const [lineDataExists, setLineDataExists] = useState(false);


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-1-dwdap/endpoint/lineLogCallUserLogin');
            setUserData(response.data);
            setLineDataExists(response.data.length > 0);
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

const handleGoLogin = async () => {
    try {
        window.location.href = '/login';
    } catch(err) {
        console.log(err);
    }
}

const handleLineLogin = (profile) => {
    setLineDataExists(!!profile);
}


return (
    <section className="bg-gray-50 dark:bg-gray-900 p-5">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen gap-3">
      <Line onLogin={handleLineLogin} />
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-auto scrollbar-hidden">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest login</h5>
                {lineDataExists && (
                                <button
                                    onClick={handleGoLogin}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Log in
                                </button>
                            )}
            </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {userData.slice().reverse().map(user => (
                <li key={user._id} className="pt-3 pb-3 sm:pt-4">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={user.userPic} alt={`${user.userName} image`} />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.userName}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
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
