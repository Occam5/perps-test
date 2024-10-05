'use client'

import React, { useState } from 'react';
import { Modal, Button, Input, Select, Slider } from 'antd';
import { SettingOutlined, SyncOutlined } from '@ant-design/icons';

const { Option } = Select;

const FormComponent: React.FC = () => {
  const [isLong, setIsLong] = useState(true);
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [payingToken, setPayingToken] = useState('USDT'); // 修改：使用payingToken的值
  const [payingAmount, setPayingAmount] = useState(0);
  const [leverage, setLeverage] = useState(1.1);

  // 切换 Long 和 Short 状态
  const handleToggleLongShort = (isLong: boolean) => {
    setIsLong(isLong);
  };

  // 打开设置模态框
  const handleSettingModal = () => {
    setIsSettingModalVisible(true);
  };

  // 打开确认模态框
  const handleConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  // 处理杠杆值变化
  const handleLeverageChange = (value: number) => {
    setLeverage(value);
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5' }}>
      {/* 第一排：切换按钮 */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ backgroundColor: 'darkgray', padding: '5px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => handleToggleLongShort(true)}
            style={{ border: isLong ? '1px solid white' : 'none', backgroundColor: 'darkgray', borderRadius: '20px', marginRight: '5px', color: 'white' }}
          >
            Long
          </Button>
          <Button
            onClick={() => handleToggleLongShort(false)}
            style={{ border: !isLong ? '1px solid white' : 'none', backgroundColor: 'darkgray', borderRadius: '20px', marginLeft: '5px', color: 'white' }}
          >
            Short
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button icon={<SyncOutlined />} style={{ borderRadius: '50%', marginRight: '5px', backgroundColor: 'darkgray', color: 'white' }} />
          <Button icon={<SettingOutlined />} onClick={handleSettingModal} style={{ borderRadius: '50%', marginLeft: '5px', backgroundColor: 'darkgray', color: 'white' }} />
        </div>
      </div>

      {/* 第二排：支付输入框 */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ color: 'white' }}>You are paying</div>
        <Input
          addonBefore={
            <Select defaultValue="USDT" onChange={setPayingToken} style={{ margin: '0 10px', backgroundColor: '#f0f2f5', borderRadius: '20px' }}>
              <Option value="USDT">USDT</Option>
              <Option value="SOL">SOL</Option>
              <Option value="BTC">BTC</Option>
              <Option value="ETH">ETH</Option>
            </Select>
          }
          placeholder="0.00"
          type="number"
          onChange={(e) => setPayingAmount(Number(e.target.value))}
          style={{ height: '60px', backgroundColor: 'darkgrey', textAlign: 'right', paddingRight: '10px', borderRadius: '20px', color: 'white' }}
        />
      </div>

      {/* 第三排：大小显示框 */}
      <div style={{ marginTop: '20px' }}>
        <div>Size</div>
        <Input
          addonBefore={payingToken} // 修改：使用payingToken的值
          value={payingAmount * leverage}
          readOnly
          style={{ paddingRight: '5px' }}
        />
      </div>

      {/* 第四排：杠杆输入框和滑块 */}
      <div style={{ marginTop: '20px' }}>
        <div>Leverage</div>
        <Input
          addonBefore={<Button onClick={() => setLeverage(leverage - 0.1)} style={{ border: 'none', backgroundColor: 'transparent' }}>-</Button>}
          addonAfter={<Button onClick={() => setLeverage(leverage + 0.1)} style={{ border: 'none', backgroundColor: 'transparent' }}>+</Button>}
          value={`${leverage.toFixed(1)}×`}
          onChange={(e) => setLeverage(Number(e.target.value.replace('×', '')))}
          style={{ textAlign: 'center', border: 'none', backgroundColor: 'transparent' }}
        />
        <Slider
          min={1.1}
          max={100}
          step={0.1}
          marks={{ 1.1: '1.1×', 20: '20×', 40: '40×', 60: '60×', 80: '80×', 100: '100×' }}
          value={leverage}
          onChange={handleLeverageChange}
        />
      </div>

      {/* 第五排：抵押品和大小显示 */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>Collateral</div>
        <div>{payingAmount * 7} USD</div>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div>Size in USD</div>
        <div>{payingAmount ? payingAmount * leverage : '_'}</div>
      </div>

      {/* 确认按钮 */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button type="primary" onClick={handleConfirmModal} style={{ width: '100%' }}>Confirm</Button>
      </div>

      {/* 设置模态框 */}
      <Modal
        title="Settings"
        open={isSettingModalVisible}
        onCancel={() => setIsSettingModalVisible(false)}
        footer={null}
      >
        <Button onClick={() => setIsSettingModalVisible(false)}>Close</Button>
      </Modal>

      {/* 确认模态框 */}
      <Modal
        title="Confirm"
        open={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={null}
      >
        <Button onClick={() => setIsConfirmModalVisible(false)}>Close</Button>
      </Modal>
    </div>
  );
};

export default FormComponent;