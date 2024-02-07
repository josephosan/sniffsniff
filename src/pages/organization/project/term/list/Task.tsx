import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../../../../store/app.store';
import { useMediaQuery } from 'react-responsive';
import { appConfig } from '../../../../../config/app.config';
import TermService from '../../../../../services/TermService';
import WrapperScroll from '../../../../../components/secondary/WrapperScroll';
import CustomSearch from '../../../../../components/primary/CustomSearch';
import ActionIconWrapper from '../../../../../components/secondary/ActionIconWrapper';
import { Badge, Button } from 'antd';
import CreateTermModal from '../../../../../components/secondary/CreateTermModal';
import FormSkeletonLoading from '../../../../../components/secondary/FormSkeletonLoading';
import WrapperData from '../../../../../components/secondary/WrapperData';
import TextItemWrapper from '../../../../../components/tiny/TextItemWrapper';
import NoData from '../../../../../components/tiny/NoData';
import Loading from '../../../../../components/secondary/Loading';
import Emitter from '../../../../../helpers/emitter.helper';

const TaskTermList: React.FC = () => {
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [termList, setTermList] = useState<never[] | null>(null);
    const navigate = useNavigate();
    const [page, setPage] = useState<number | null>(null);
    const [searchValue, setSearch] = useState<string | null>(null);
    const [createTermModal, setCreateTermModal] = useState(false);
    const param = useParams();
    const {
        theme,
        handleSetFilterMode,
        filterMode,
        handleSetSidebarCollapsed,
        filters,
    } = useApp();

    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        setTermList(() => []);
        fetchData();
    }, [filters]);

    const handleFetchMore = async (
        page: string | null = null,
        order: string = 'DESC',
        s: string = '',
    ) => {
        if (termList) setFetchMoreLoading(() => true);
        else setPageFirstLoading(() => true);

        if (filters && filters['order']) order = filters['order'];

        let params = {
            limit: appConfig.paginationLimit,
            order: order,
            page: page,
        };
        if (s !== '') params['s'] = s;
        if (filters) params = { ...params, ...filters };

        try {
            const res = await TermService.paginateAll({
                params: {
                    project: param.projectId,
                    ...params,
                },
            });
            setTermList((prevState) => {
                if (prevState)
                    return [...prevState, ...res.data.data.items] as any;
                return [...res.data.data.items];
            });
            setPage(() => res.data.data.cursor);
        } catch (e) {
            console.log(e);
        } finally {
            if (termList) setFetchMoreLoading(() => false);
            else setPageFirstLoading(() => false);
        }
    };

    const handleReachedBottom = async () => {
        if (!pageFirstLoading && !fetchMoreLoading && page) {
            await handleFetchMore(page, 'ASC', searchValue as string);
        }
    };

    const handleFilterButtonClick = () => {
        handleSetFilterMode(!filterMode);
        handleSetSidebarCollapsed(true);
    };

    const handleSearch = async (e: any) => {
        setTermList(() => []);
        setPage(() => null);
        setSearch(e.target.value);
        await handleFetchMore(null, 'ASC', e.target.value);
    };
    return (
        <WrapperScroll reachedBottom={handleReachedBottom} height="70vh">
            {!pageFirstLoading && (
                <div className={'row mb-5 mt-2'}>
                    <div className={'col-sm-7 col-md-4 col-xl-4 col-7'}>
                        <div
                            className={
                                'd-flex justify-content-between align-items-center'
                            }
                        >
                            <CustomSearch
                                inputMode={true}
                                asyncSearch={true}
                                onSearch={handleSearch}
                            />
                            <div
                                className={'h-100 me-2'}
                                style={{
                                    border: '1.5px solid ' + theme.primaryColor,
                                    borderRadius: appConfig.defaultBorderRadius,
                                    padding: '3px',
                                }}
                            >
                                <ActionIconWrapper
                                    icon={
                                        'bi bi-funnel d-flex justify-content-center align-items-center'
                                    }
                                    size={appConfig.defaultIconSize}
                                    iconClicked={handleFilterButtonClick}
                                />
                            </div>
                            <div
                                className={'h-100 me-2'}
                                style={{
                                    border: '1.5px solid ' + theme.primaryColor,
                                    borderRadius: appConfig.defaultBorderRadius,
                                    padding: '5px',
                                }}
                            >
                                <ActionIconWrapper
                                    icon={
                                        'bi bi-ui-checks-grid d-flex justify-content-center align-items-center'
                                    }
                                    size={appConfig.defaultIconSize - 3}
                                    iconClicked={() =>
                                        Emitter.emit('openTermTypeSelect')
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            'col-sm-5 col-md-8 col-xl-8 col-5 d-flex justify-content-end'
                        }
                    >
                        <Button
                            type={'primary'}
                            icon={<i className={'bi bi-plus'}></i>}
                            onClick={() => setCreateTermModal(true)}
                        >
                            افزودن
                        </Button>
                        <CreateTermModal
                            open={createTermModal}
                            setOpen={(value) => setCreateTermModal(value)}
                        />
                    </div>
                </div>
            )}

            {pageFirstLoading && (
                <div className={'w-100 d-flex flex-column '}>
                    <div className="d-flex justify-content-between">
                        <div style={{ width: '260px' }}>
                            <FormSkeletonLoading count={1} />
                        </div>
                        <div style={{ width: '260px' }}>
                            <FormSkeletonLoading count={1} />
                        </div>
                    </div>
                    <FormSkeletonLoading fillRow={true} count={10} />
                </div>
            )}
            {(termList && termList.length > 0) || fetchMoreLoading
                ? (termList as any[]).map((el: any, index) => {
                      return (
                          <div className="px-2" key={index}>
                              <Badge.Ribbon
                                  text={`${el.type}${
                                      el.task
                                          ? ' - ' + el.task.status
                                          : undefined
                                  }`}
                              >
                                  <WrapperData
                                      color={el.color}
                                      backgroundColor={(theme as any).cardBg}
                                      handleClick={() =>
                                          navigate(
                                              `${el.id}?type=${(
                                                  el.type as string
                                              ).toLowerCase()}`,
                                          )
                                      }
                                  >
                                      {isMobile ? (
                                          <div className="d-flex flex-column gap-5">
                                              <div className="d-flex justify-content-between align-items-center">
                                                  <TextItemWrapper
                                                      fontSize={
                                                          appConfig.defaultFontSize
                                                      }
                                                      text={el.title}
                                                  />
                                              </div>
                                              <div className="d-flex">
                                                  <TextItemWrapper
                                                      text={el.description}
                                                  />
                                              </div>
                                          </div>
                                      ) : (
                                          <div className="d-flex align-items-start gap-2 flex-column">
                                              <TextItemWrapper
                                                  fontSize={
                                                      appConfig.defaultFontSize
                                                  }
                                                  text={el.title}
                                              />
                                              <TextItemWrapper
                                                  text={el.description}
                                              />
                                          </div>
                                      )}
                                  </WrapperData>
                              </Badge.Ribbon>
                          </div>
                      );
                  })
                : !pageFirstLoading && <NoData />}

            {fetchMoreLoading && (
                <div
                    className={
                        'w-100 d-flex justify-content-center align-items-center'
                    }
                >
                    <Loading />
                </div>
            )}
        </WrapperScroll>
    );
};

export default TaskTermList;
