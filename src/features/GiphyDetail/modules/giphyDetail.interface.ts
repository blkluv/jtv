export interface IGiphyDetailParams {
  id: string;
}

export interface IGiphyDetailState {
  id: string | null;
  detail: any;
  status?: 'idle' | 'loading' | 'failed';
}
