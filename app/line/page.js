'use client';

import React, { useEffect, useState } from 'react';
import liff from "@line/liff";
// import { useHistory } from 'react-router-dom';

const Line = () => {
const [profile, setProfile] = useState(null);
// const history = useHistory();

useEffect(() => {
    liff.init({ liffId: '2004878671-5kGmazLb'})
    .then(() => {
        handleLogin()
    });
},[]);
 
const handleLogin = async() => {
    try{
        //code
        const profile = await liff.getProfile();
        setProfile(profile);
    }catch(err){
        console.log(err)
    }
} 

const handleLogout = async () => {
    try{
        liff.logout();
        setProfile(null);
        window.location.href = '/login';
        // history.push('/login');
    }catch(err){
        console.log(err)
    }
    
}

    return(
        <>
        {profile && (
            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-end px-4 pt-4">
            </div>
            <div class="flex flex-col items-center pb-10">
                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={profile.pictureUrl} alt="Pic Profile"/>
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{profile.displayName}</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">{profile.statusMessage}</span>
                <div class="flex mt-4 md:mt-6">
                    <button onClick={handleLogout} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Log out</button>
                </div>
            </div>
        </div>
        )}
    </>
    )
}

export default Line;