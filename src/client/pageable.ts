export interface IPageable {
  first: boolean;
  last: boolean;
  hasNext: boolean;
  page: number;
  totalPages: number;
  totalElements: number;
}
