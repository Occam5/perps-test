'use client'
import React, { useState } from 'react';
import { Table, Button, message } from 'antd';
import type { TableProps } from 'antd';
import { tableDemoData } from '../lib/testData'; // 导入 testData
import { ellipsify, formatCurrency, formatDuration } from '../utils/tools';

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
}

const TableComponent: React.FC = () => {
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
  })));

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('Copied');
    });
  };

  const handleRowClick = (record: DataType) => {
    window.location.href = `/positions/${record.positionId}`;
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
      <Table <DataType>
        columns={columns}
        dataSource={filteredData}
        pagination={false} // 取消分页
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default TableComponent;