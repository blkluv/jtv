import React, { useEffect, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { styled } from '@mui/material/styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@mui/material/Grid';
import PreviewCard from 'components/PreviewCard';
import { GiphyDetailDialog } from 'features/GiphyDetail';
import Loader from 'components/Loader';
import SearchBar from 'components/SearchBar';
import { useGiphyTrendy } from './modules/giphyTrendy.hook';
import { IDataItemType } from './modules/giphyTrendy.interface';

const GiphyTrendyWrapper = styled(Grid)`
  padding: 48px 0 24px;
`;

interface IGiphyTrendyProps {
  type: string;
}

export default function GiphyTrendy(props: IGiphyTrendyProps) {
  const { type } = props;
  const [detailId, setDetailId] = useState<string | null>(null);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const { selectors, actions } = useGiphyTrendy();
  const data = useAppSelector(selectors.data);
  const dispatch = useAppDispatch();

  const loadData = useCallback(
    (params: any) => {
      dispatch(actions.fetchGiphyTrendyAsync({ ...params }));
    },
    [actions],
  );

  const handleSearch = useCallback(
    (text: string) => {
      dispatch(actions.stateReseting());
      loadData({ text });
    },
    [actions],
  );

  const handleLoadMore = useCallback(() => {
    dispatch(actions.offsetIncrement());
    loadData({});
  }, [actions]);

  const handleOpenDetail = useCallback((id: string) => {
    setDetailId(id);
    setIsOpenDetail(true);
  }, []);

  useEffect(() => {
    dispatch(actions.dataTypeUpdating({ type }));
    loadData({});
  }, [type]);

  const TrendyGrid = data?.map((item: IDataItemType) => {
    return (
      <Grid key={item.id} item xs={24} sm={8} lg={4}>
        <PreviewCard
          handleOpenDetail={() => {
            handleOpenDetail(item.id);
          }}
          title={item.title}
          image={item.images.downsized?.url}
        />
      </Grid>
    );
  });

  return (
    <>
      <InfiniteScroll
        next={() => handleLoadMore()}
        hasMore={true}
        loader={<Loader />}
        dataLength={data?.length || 0}
      >
        <SearchBar searchCallback={handleSearch} />
        <GiphyTrendyWrapper container spacing={2} columns={24}>
          {TrendyGrid}
        </GiphyTrendyWrapper>
        <GiphyDetailDialog id={detailId} isOpen={isOpenDetail} toggleOpen={setIsOpenDetail} />
      </InfiniteScroll>
    </>
  );
}
