import React, { useState } from 'react';
import { Collapse, InputNumber, Slider, Checkbox, Radio, Menu } from 'antd';

const { Panel } = Collapse;

interface PositionFilterProps {
  onApply: (filters: {
    assetFilters: string[];
    typeFilter: string | null;
    sizeRange: [number, number];
    leverageRange: [number, number];
    pnlRange: [number, number];
    realizedPnlRange: [number, number]; // 添加 realizedPnl 范围
  }) => void;
  onClearAll: () => void;
}

const PositionFilter: React.FC<PositionFilterProps> = ({ onApply, onClearAll }) => {
  const [assetFilters, setAssetFilters] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 50000000]);
  const [leverageRange, setLeverageRange] = useState<[number, number]>([0, 200]);
  const [pnlRange, setPnlRange] = useState<[number, number]>([-20000000, 20000000]);
  const [realizedPnlRange, setRealizedPnlRange] = useState<[number, number]>([-20000000, 20000000]); // 添加 realizedPnl 范围

  const handleApply = () => {
    onApply({ assetFilters, typeFilter, sizeRange, leverageRange, pnlRange, realizedPnlRange });
  };

  return (
    <Menu>
      <Menu.Item key="clear-all" onClick={onClearAll}>
        Clear All
      </Menu.Item>
      <Menu.Item key="apply" onClick={handleApply}>
        Apply
      </Menu.Item>
      <Menu.Divider />
      <Collapse accordion>
        <Panel header="Asset" key="1">
          <Checkbox checked={assetFilters.includes('WBTC')} onChange={() => setAssetFilters(prev => prev.includes('WBTC') ? prev.filter(f => f !== 'WBTC') : [...prev, 'WBTC'])}>WBTC</Checkbox>
          <Checkbox checked={assetFilters.includes('WETH')} onChange={() => setAssetFilters(prev => prev.includes('WETH') ? prev.filter(f => f !== 'WETH') : [...prev, 'WETH'])}>WETH</Checkbox>
          <Checkbox checked={assetFilters.includes('SOL')} onChange={() => setAssetFilters(prev => prev.includes('SOL') ? prev.filter(f => f !== 'SOL') : [...prev, 'SOL'])}>SOL</Checkbox>
        </Panel>
        <Panel header="Type" key="2">
          <Radio.Group onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
            <Radio value="long">Long</Radio>
            <Radio value="short">Short</Radio>
          </Radio.Group>
        </Panel>
        <Panel header="Size" key="3">
          <InputNumber min={0} max={50000000} value={sizeRange[0]} onChange={(value) => setSizeRange([value || 0, sizeRange[1]])} />
          <InputNumber min={0} max={50000000} value={sizeRange[1]} onChange={(value) => setSizeRange([sizeRange[0], value || 50000000])} />
          <Slider range value={sizeRange} onChange={setSizeRange} min={0} max={50000000} />
        </Panel>
        <Panel header="Leverage" key="4">
          <InputNumber min={0} max={200} value={leverageRange[0]} onChange={(value) => setLeverageRange([value || 0, leverageRange[1]])} />
          <InputNumber min={0} max={200} value={leverageRange[1]} onChange={(value) => setLeverageRange([leverageRange[0], value || 200])} />
          <Slider range value={leverageRange} onChange={setLeverageRange} min={0} max={200} />
        </Panel>
        <Panel header="Unrealized PnL" key="5">
          <InputNumber min={-20000000} max={20000000} value={pnlRange[0]} onChange={(value) => setPnlRange([value || -20000000, pnlRange[1]])} />
          <InputNumber min={-20000000} max={20000000} value={pnlRange[1]} onChange={(value) => setPnlRange([pnlRange[0], value || 20000000])} />
          <Slider range value={pnlRange} onChange={setPnlRange} min={-20000000} max={20000000} />
        </Panel>
        <Panel header="Realized PnL" key="6">
          <InputNumber min={-20000000} max={20000000} value={realizedPnlRange[0]} onChange={(value) => setRealizedPnlRange([value || -20000000, realizedPnlRange[1]])} />
          <InputNumber min={-20000000} max={20000000} value={realizedPnlRange[1]} onChange={(value) => setRealizedPnlRange([realizedPnlRange[0], value || 20000000])} />
          <Slider range value={realizedPnlRange} onChange={setRealizedPnlRange} min={-20000000} max={20000000} />
        </Panel>
      </Collapse>
    </Menu>
  );
};

export default PositionFilter;