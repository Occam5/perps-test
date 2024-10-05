'use client'

import React, { useState } from 'react';
import TradingViewWidget from "../../components/k-line";
import FormWithoutAntd from "../../components/form-without-antd";
import TableComponent from '@/components/tableDetail';
// import FormComponent from "../../components/form";
// import GoBack from '@/components/go-back';

// 首页组件
const HomePage = () => {
  const [chartHeight, setChartHeight] = useState(350); // 初始高度减小为350
  const minChartHeight = 100; // K线图最小高度
  const maxChartHeight = 600; // K线图最大高度

  const handleDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = chartHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newHeight = startHeight + (moveEvent.clientY - startY);
      if (newHeight >= minChartHeight && newHeight <= maxChartHeight) {
        setChartHeight(newHeight);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row h-full">
      <div className="flex flex-col w-full md:w-7/9">
        
        <div style={{ height: chartHeight}} className="flex-grow">
          <TradingViewWidget />
        </div>
        <div
          className="h-4 cursor-row-resize bg-gray-300 flex justify-center items-center"
          onMouseDown={handleDrag}
        >
          <span className="text-gray-600">⇕</span>
        </div>
        <div style={{ height: `calc(100% - ${chartHeight}px)`, overflowY: 'auto' }}>
          <TableComponent />
        </div>
      </div>
      <div className="md:w-2/9 h-full">
        <FormWithoutAntd />
        {/* <FormComponent/> */}
      </div>
    </div>
  );
};

export default HomePage;