'use client';

import React, { useEffect, useState } from 'react'
import liff from "@line/liff"

const Line = () => {
useEffect(() => {
    liff.init({ liffId: '2004878671-5kGmazLb'})
    .then(() => {
        handleLogin()
    });
},[]);
 
const handleLogin = async() => {
    try{
        //code
        const profile = await liff.getProfile()
        console.log(profile)
    }catch(err){
        console.log(err)
    }
} 

    return(
        <>Line</>
    )
}

export default Line;