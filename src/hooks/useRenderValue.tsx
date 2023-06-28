import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { ITableHeaderItem } from '@/types/table';

const useRenderValue = () => {
  const getRenderValue = (item: any, headerItem: ITableHeaderItem) => {
    switch (headerItem.type) {
      case 'boolean':
        return item[headerItem.key] ? 'Yes' : 'No';
      case 'date':
        return moment(item[headerItem.key]).format('DD/MM/YYYY');

      case 'datetime':
        return moment(item[headerItem.key]).format('DD/MM/YYYY HH:mm');
      case 'image':
        return item[headerItem.key] ? (
          <Image src={item[headerItem.key]} alt="" width={40} height={40} />
        ) : (
          <></>
        );
      default:
        return item[headerItem.key];
    }
  };

  return { getRenderValue };
};

export default useRenderValue;
