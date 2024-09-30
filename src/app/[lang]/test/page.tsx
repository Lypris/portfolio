// declare this component as client side only
'use client'
import React, { useEffect, useRef, useState } from 'react';
import "./style.css";
import SliderView from './components/SliderView';

export default function Testpage() {
    return (
      <div className="flex justify-center">
        <SliderView />
      </div>
    );
  }
