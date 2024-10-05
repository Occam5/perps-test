'use client'

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { SyncOutlined, SettingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './form-without-antd.css'; // 引入自定义CSS文件
import { Slider } from 'antd';

const FormWithoutAntd: React.FC = () => {
  const [isLong, setIsLong] = useState(true);
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [payingToken, setPayingToken] = useState('USDT');
  const [payingAmount, setPayingAmount] = useState(0);
  const [leverage, setLeverage] = useState(1.1);

  const handleToggleLongShort = (isLong: boolean) => {
    setIsLong(isLong);
  };

  const handleSettingModal = () => {
    setIsSettingModalVisible(true);
  };

  const handleConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleLeverageChange = (value: number) => {
    setLeverage(value);
  };

  // 根据选择的状态设置颜色
  const sliderColors = isLong
    ? {
        dotBorderColor: '#4caf50',
        dotActiveBorderColor: '#4caf50',
        handleActiveColor: '#4caf50',
        trackBg: '#4caf50',
      }
    : {
        dotBorderColor: '#f44336',
        dotActiveBorderColor: '#f44336',
        handleActiveColor: '#f44336',
        trackBg: '#f44336',
      };

  return (
    <div className="bg-gray-800 p-4">
      {/* 第一排：切换按钮 */}
      <div className="flex justify-between mb-4">
        <div className="flex bg-gray-600 p-1 rounded-full">
          <button
            onClick={() => handleToggleLongShort(true)}
            className={classNames('px-2 py-1 rounded-full', {
              'bg-green-500 text-white': isLong,
              'bg-gray-600 text-white': !isLong,
            })}
          >
            Long
          </button>
          <button
            onClick={() => handleToggleLongShort(false)}
            className={classNames('px-2 py-1 rounded-full', {
              'bg-red-500 text-white': !isLong,
              'bg-gray-600 text-white': isLong,
            })}
          >
            Short
          </button>
        </div>
        <div className="flex items-center">
          <button className="bg-gray-400 text-white p-1 rounded-full mr-2">
            <SyncOutlined />
          </button>
          <button onClick={handleSettingModal} className="bg-gray-400 text-white p-1 rounded-full">
            <SettingOutlined />
          </button>
        </div>
      </div>

      {/* 第二排：支付输入框 */}
      <div className="mb-4">
        <div className="text-white mb-2">You are paying</div>
        <div className="flex items-center bg-gray-600 p-2 rounded-lg">
          <select
            value={payingToken}
            onChange={(e) => setPayingToken(e.target.value)}
            className="bg-gray-300 text-gray-800 p-2 rounded-lg mr-2"
          >
            <option value="USDT">USDT</option>
            <option value="SOL">SOL</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
          <input
            type="number"
            placeholder="0.00"
            value={payingAmount}
            onChange={(e) => setPayingAmount(Number(e.target.value))}
            className="bg-gray-600 text-white p-2 rounded-lg flex-grow text-right"
          />
        </div>
      </div>

      {/* 第三排：大小显示框 */}
      <div className="mb-4">
        <div className="text-white mb-2">Size of Long</div>
        <div className="flex items-center bg-gray-600 p-2 rounded-lg">
          <span className="text-white mr-2">SOL</span>
          <input
            type="text"
            value={(payingAmount * 140).toFixed(2)}
            readOnly
            className="bg-gray-600 text-white p-2 rounded-lg flex-grow text-right"
          />
        </div>
      </div>

      {/* 第四排：杠杆输入框和滑块 */}
      <div className="mb-4">
        <div className="text-white mb-2">Leverage</div>
        <div className={classNames('flex items-center p-2 rounded-lg mb-2 bg-gray-600')}>
          <button onClick={() => setLeverage(leverage - 0.1)} className="bg-transparent text-white p-2">-</button>
          <input
            type="text"
            value={`${leverage.toFixed(1)}×`}
            onChange={(e) => setLeverage(Number(e.target.value.replace('×', '')))}
            className="bg-transparent text-white p-2 text-center flex-grow"
          />
          <button onClick={() => setLeverage(leverage + 0.1)} className="bg-transparent text-white p-2">+</button>
        </div>
        <Slider
          min={1.1}
          max={100}
          step={0.1}
          marks={{ 1.1: '1.1×', 20: '20×', 40: '40×', 60: '60×', 80: '80×', 100: '100×' }}
          // className="text-white"
          value={leverage}
          onChange={handleLeverageChange}
          trackStyle={[{ backgroundColor: sliderColors.trackBg }]} // 设置滑块条颜色
          handleStyle={[{ borderColor: sliderColors.handleActiveColor }]} // 设置滑块按钮颜色
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }} className='text-white text-sm'>
        <div>Collateral</div>
        <div>{payingAmount * 7} USD</div>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }} className='text-white text-sm'>
        <div>Size in USD</div>
        <div>{payingAmount ? payingAmount * leverage : '_'}</div>
      </div>

      {/* 确认按钮 */}
      <div className="text-center mt-2">
        <button onClick={handleConfirmModal} className={classNames('text-white p-4 rounded-lg w-full', {
          'bg-green-500': isLong,
          'bg-red-500': !isLong,
        })}>Confirm</button>
      </div>

      {/* 设置模态框 */}
      {isSettingModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-800">Settings</h2>
              <button onClick={() => setIsSettingModalVisible(false)} className="text-gray-800">&times;</button>
            </div>
            <button onClick={() => setIsSettingModalVisible(false)} className="bg-blue-500 text-white p-2 rounded-lg">Close</button>
          </div>
        </div>
      )}

      {/* 确认模态框 */}
      {isConfirmModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-800">Confirm</h2>
              <button onClick={() => setIsConfirmModalVisible(false)} className="text-gray-800">&times;</button>
            </div>
            <button onClick={() => setIsConfirmModalVisible(false)} className="bg-blue-500 text-white p-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormWithoutAntd;