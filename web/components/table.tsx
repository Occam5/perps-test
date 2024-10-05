'use client'
import React, { useState } from 'react';
import { Table, Button, Dropdown, Menu, Checkbox, message, Collapse, InputNumber, Slider, Radio, Switch } from 'antd';
import type { TableProps } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import { tableDemoData } from '../lib/testData'; // 导入 testData
import { ellipsify, formatCurrency, formatDuration } from '../utils/tools';
import PositionFilter from './PositionFilter'; // 添加导入
import SearchPosition from './SearchPosition'; // 添加导入

const { Panel } = Collapse; // 添加 Collapse 组件

interface DataType {
  key: string;
  positionId: string;
  account: string;
  assetName: string;
  side: string;
  balanceUsd: number;
  leverage: number;
  timeOpened: number;
  unrealizedPnl: number;
  openPriceUsd: number;
  lastPriceUsd: number;
  realizedPnl: number; // 添加 realizedPnl 字段
}

const TableComponent: React.FC = () => {
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>(tableDemoData.map((item, index) => ({
    key: index.toString(),
    positionId: item.positionId,
    account: item.account,
    assetName: item.assetName,
    side: item.side,
    balanceUsd: item.balanceUsd,
    leverage: item.leverage,
    timeOpened: item.timeOpened,
    unrealizedPnl: item.unrealizedPnl,
    openPriceUsd: item.openPriceUsd,
    lastPriceUsd: item.lastPriceUsd,
    realizedPnl: item.realizedPnl, // 添加 realizedPnL 字段
  })));

  const [assetFilters, setAssetFilters] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 50000000]);
  const [leverageRange, setLeverageRange] = useState<[number, number]>([0, 200]);
  const [pnlRange, setPnlRange] = useState<[number, number]>([-20000000, 20000000]);
  const [selectedPositionType, setSelectedPositionType] = useState<'settled' | 'open'>('settled'); // 添加状态以跟踪选择的类型

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('Copied');
    });
  };


  const handleRowClick = (record: DataType) => {
    window.location.href = `/positions/${record.positionId}`;
  };

  const handleMenuClick = (e: any) => {
    const { key } = e;
    setSelectedMarkets((prev) => {
      if (prev.includes(key)) {
        return prev.filter((market) => market !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const handleApply = (filters: {
    assetFilters: string[];
    typeFilter: string | null;
    sizeRange: [number, number];
    leverageRange: [number, number];
    pnlRange: [number, number];
    realizedPnlRange: [number, number]; // 添加 realizedPnl 范围
  }) => {
    const { assetFilters, typeFilter, sizeRange, leverageRange, pnlRange, realizedPnlRange } = filters;
    setFilteredData(tableDemoData.filter((item) => {
      const matchesAsset = assetFilters.length === 0 || assetFilters.includes(item.assetName);
      const matchesType = typeFilter ? (typeFilter === 'long' ? item.side === 'Long' : item.side === 'Short') : true; // 更新为与 side 字段对照查找
      const matchesSize = item.balanceUsd >= sizeRange[0] && item.balanceUsd <= sizeRange[1]; // 更新为与 balanceUsd 字段对照查找
      const matchesLeverage = item.leverage >= leverageRange[0] && item.leverage <= leverageRange[1];
      const matchesPnl = item.unrealizedPnl >= pnlRange[0] && item.unrealizedPnl <= pnlRange[1];
      const matchesRealizedPnl = item.realizedPnl >= realizedPnlRange[0] && item.realizedPnl <= realizedPnlRange[1]; // 添加 realizedPnl 的匹配条件
      return matchesAsset && matchesType && matchesSize && matchesLeverage && matchesPnl && matchesRealizedPnl; // 更新返回条件
    }).map((item, index) => ({
      key: index.toString(),
      positionId: item.positionId,
      account: item.account,
      assetName: item.assetName,
      side: item.side,
      balanceUsd: item.balanceUsd,
      leverage: item.leverage,
      timeOpened: item.timeOpened,
      unrealizedPnl: item.unrealizedPnl,
      openPriceUsd: item.openPriceUsd,
      lastPriceUsd: item.lastPriceUsd,
      realizedPnl: item.realizedPnl, // 添加 realizedPnl 字段
    })));
  };

  const handleClearAll = () => {
    setAssetFilters([]);
    setTypeFilter(null);
    setSizeRange([0, 50000000]);
    setLeverageRange([0, 200]);
    setPnlRange([-20000000, 20000000]);
    setSelectedMarkets([]);
    setFilteredData(tableDemoData.map((item, index) => ({
      key: index.toString(),
      positionId: item.positionId,
      account: item.account,
      assetName: item.assetName,
      side: item.side,
      balanceUsd: item.balanceUsd,
      leverage: item.leverage,
      timeOpened: item.timeOpened,
      unrealizedPnl: item.unrealizedPnl,
      openPriceUsd: item.openPriceUsd,
      lastPriceUsd: item.lastPriceUsd,
      realizedPnl: item.realizedPnl, // 添加 realizedPnl 字段
    })));
  };

  const handleSearch = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    setFilteredData(tableDemoData.filter(item => 
      item.positionId.toLowerCase().includes(lowerCaseValue) ||
      item.account.toLowerCase().includes(lowerCaseValue) ||
      item.assetName.toLowerCase().includes(lowerCaseValue) ||
      item.side.toLowerCase().includes(lowerCaseValue) ||
      item.balanceUsd.toString().includes(lowerCaseValue) ||
      item.leverage.toString().includes(lowerCaseValue) ||
      item.unrealizedPnl.toString().includes(lowerCaseValue) ||
      item.realizedPnl.toString().includes(lowerCaseValue) // 添加 realizedPnl 的搜索条件
    ).map((item, index) => ({
      key: index.toString(),
      positionId: item.positionId,
      account: item.account,
      assetName: item.assetName,
      side: item.side,
      balanceUsd: item.balanceUsd,
      leverage: item.leverage,
      timeOpened: item.timeOpened,
      unrealizedPnl: item.unrealizedPnl,
      openPriceUsd: item.openPriceUsd,
      lastPriceUsd: item.lastPriceUsd,
      realizedPnl: item.realizedPnl, // 添加 realizedPnl 字段
    })));
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Position Key',
      dataIndex: 'positionId',
      render: (text) => (
        <div className="relative group">
          {ellipsify(text, 5)}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(text);
            }}
            size="small"
            className="absolute left-0 ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Copy
          </Button>
        </div>
      ),
    },
    {
      title: 'Account',
      dataIndex: 'account',
      render: (text) => (
        <div className="relative group">
          {ellipsify(text, 5)}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(text);
            }}
            size="small"
            className="absolute left-0 ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Copy
          </Button>
        </div>
      ),
    },
    {
      title: 'Market',
      dataIndex: 'assetName',
      key: 'assetName',
    },
    {
      title: 'Type',
      dataIndex: 'side',
      key: 'side',
    },
    {
      title: 'Size',
      dataIndex: 'balanceUsd',
      key: 'balanceUsd',
      render: (value) => formatCurrency(value),
      sorter: (a, b) => a.balanceUsd - b.balanceUsd,
    },
    {
      title: 'Leverage',
      dataIndex: 'leverage',
      key: 'leverage',
      render: (value) => value.toFixed(1),
    },
    {
      title: 'Duration',
      dataIndex: 'timeOpened',
      key: 'timeOpened',
      render: (value) => formatDuration(value),
    },
    {
      title: 'Unrealized PnL',
      dataIndex: 'unrealizedPnl',
      key: 'unrealizedPnl',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Open Price',
      dataIndex: 'openPriceUsd',
      key: 'openPriceUsd',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Current Price',
      dataIndex: 'lastPriceUsd',
      key: 'lastPriceUsd',
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mt-2 mb-2">
        <h3 className="text-lg font-bold">Positions</h3>
        <div className="flex items-center">
        <div className="flex items-center">
            <span className={`mr-2 ${selectedPositionType === 'settled' ? 'font-bold' : ''}`} onClick={() => setSelectedPositionType('settled')}>Settled Positions</span>
            <Switch checked={selectedPositionType === 'open'} onChange={() => setSelectedPositionType(selectedPositionType === 'settled' ? 'open' : 'settled')} />
            <span className={`ml-2 ${selectedPositionType === 'open' ? 'font-bold' : ''}`} onClick={() => setSelectedPositionType('open')}>Open Positions</span>
          </div>
          <div className="ml-4 mr-2"> {/* 增加间隙 */}
            <Dropdown overlay={<PositionFilter onApply={handleApply} onClearAll={handleClearAll} />} trigger={['click']}>
              <Button type="primary" className="bg-gray-600 text-white flex items-center">
                Filter <FilterFilled />
              </Button>
            </Dropdown>
          </div>
          <SearchPosition onSearch={handleSearch} /> {/* 添加搜索框 */}
        </div>
      </div>
      <Table <DataType>
        columns={columns}
        dataSource={filteredData}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName="bg-gray-200 hover:bg-gray-100 cursor-pointer" // 添加 hover 效果
      />
    </div>
  );
};


export default TableComponent;