import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface SearchPositionProps {
  onSearch: (value: string) => void;
}

const SearchPosition: React.FC<SearchPositionProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <Input 
      placeholder="Search positions"
      value={searchValue}
      onChange={handleSearch}
      style={{ width: 200, marginLeft: 16, backgroundColor: 'gray' }} // 设置宽度、左边距和背景颜色
      prefix={<SearchOutlined />}
      suffix={searchValue ? <CloseCircleOutlined onClick={handleClear} /> : null}
    />
  );
};

export default SearchPosition;