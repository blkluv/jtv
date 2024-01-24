export interface IGiphyAPIParams {
  limit?: number;
  offset?: number;
  rating?: any;
  type?: any;
  text?: any;
}

export interface IDataItemType {
  id: any;
  title: string;
  images: any;
  user: any;
  username: string;
}

export interface IGiphyPaginationType {
  count?: number;
  offset?: number;
  totalCount?: number;
}

export interface IGiphyDataType {
  data: IDataItemType[];
  pagination?: IGiphyPaginationType;
}

export interface IGiphyTrendyState {
  currentOffset: number;
  data?: IDataItemType[];
  params?: IGiphyAPIParams;
  status?: 'idle' | 'loading' | 'failed';
  pagination?: IGiphyPaginationType;
}
