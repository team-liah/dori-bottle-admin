import { useState } from 'react';

const useSelect = (data: any[]) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const handleSelectItem = (item: any) => {
    const index = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id,
    );
    if (index > -1) {
      setSelectedItems([
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1),
      ]);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSelectAllItems = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data);
    }
  };

  return {
    selectedItems,
    handleSelectItem,
    handleSelectAllItems,
  };
};

export default useSelect;
