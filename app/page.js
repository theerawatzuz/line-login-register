'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, {useEffect, useState } from 'react';
import liff from '@line/liff'


import Line from './line/page';

export default function Home() {
useEffect(() => {
  liff.init({ liffId: '2004878671-5kGmazLb'})
  .then(() => {
    //code
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


  return (
    <div >
     Home Work!
     <Line/>
    </div>
  );
}
