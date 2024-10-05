'use client'
import { useEffect, useState } from 'react';
import GoBack from '@/components/go-back';
import { tableDemoData } from '@/lib/testData'; // 假设 testData 中包含所有数据
import TebleDetail from '@/components/tableComp-detail-feature'
import TableComponent from '@/components/tableDetail'

const PositionDetail = () => {
  const [positionId, setPositionId] = useState<string | undefined>(undefined);
  const [positionData, setPositionData] = useState<any>(null);

  useEffect(() => {
    // 从 URL 中提取 positionId
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    setPositionId(id);

    // 查找 positionId 对应的数据
    const data = tableDemoData.find(item => item.positionId === id);
    setPositionData(data);
  }, []);

  if (!positionData) {
    return <div>Loading...</div>;
  }
return <div>
    <div className="inline-flex items-center mb-4 text-gray-200">
        <GoBack />
        <h4 className="ml-4">Position ID: {positionId}</h4>
    </div>
    <div className='flex-col'>
        <TebleDetail/>
        <div className='mx-auto' style={{ width: '90%', maxHeight: '500px', overflowY: 'auto' }}>
        <TableComponent/>
        </div>
    </div>
</div>
};

export default PositionDetail;