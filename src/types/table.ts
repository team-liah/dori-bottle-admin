export interface ITableHeaderItem {
  key: string;
  label: string;
  width: string;
  type?: string;
}

export interface ISort {
  key: string;
  order: 'asc' | 'desc';
}
