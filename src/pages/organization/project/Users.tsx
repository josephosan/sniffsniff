import React from 'react';
import { useApp } from '../../../store/app.store';
import WrapperScroll from '../../../components/secondary/WrapperScroll';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import FormSkeletonLoading from '../../../components/secondary/FormSkeletonLoading';
import NoData from '../../../components/tiny/NoData';
import CustomSearch from '../../../components/primary/CustomSearch';
import WrapperUserData from '../../../components/secondary/WrapperUserData';
import { appConfig } from '../../../config/app.config';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectApiService from '../../../services/ProjectApiService';

const ProjectUsers: React.FC = React.memo(() => {
    const [pageFirstLoading, setPageFirstLoading] = useState(true); // todo: make this true
    const [userList, setUserList] = useState<never[]>([]);
    const { filters } = useApp();
    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        setUserList(() => []);
        fetchData();
    }, [filters]);

    const handleFetchMore = async (
        page: number = 1,
        order: string = 'DESC',
        s: string = '',
    ) => {
        setPageFirstLoading(() => true);

        let params = {
            limit: appConfig.paginationLimit,
            order: order,
            page: page,
        };
        if (s !== '') params['s'] = s;
        if (filters) params = { ...params, ...filters };

        try {
            const { data } = await ProjectApiService.getOne(param.projectId);
            setUserList(data.data.members);
        } catch (e) {
            console.log(e);
        } finally {
            setPageFirstLoading(() => false);
        }
    };

    const handleSearch = async (e) => {
        const input = e.target.value;
        setUserList((prevState) => {
            return prevState.map((el) => {
                if (el.name.includes(input) || el.email.includes(input)) {
                    return {
                        ...el,
                        show: true,
                    };
                } else {
                    return {
                        ...el,
                        show: false,
                    };
                }
            });
        });
    };
    return (
        <WrapperScroll /*reachedBottom={handleReachedBottom}*/ height="70vh">
            <div className={'row mb-3 mt-2'}>
                <div className={'col-sm-7 col-md-4 col-xl-4 col-7'}>
                    <div
                        className={
                            'd-flex justify-content-between align-items-center'
                        }
                    >
                        <CustomSearch
                            inputMode={true}
                            onSearch={handleSearch}
                        />
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
                        onClick={() =>
                            navigate(
                                `/organization/${param.organizationId}/project/${param.projectId}/invite`,
                            )
                        }
                    >
                        افزودن
                    </Button>
                </div>
            </div>
            {pageFirstLoading && (
                <div>
                    <FormSkeletonLoading fillRow={true} count={10} />
                </div>
            )}

            <br />

            {userList && userList.length > 0 ? (
                userList.map((el, index) => {
                    return (
                        el.show != false && (
                            <WrapperUserData
                                title={el.name}
                                desc={el.email}
                                imageUrl={'/public/vite.svg'}
                                key={index}
                            />
                        )
                    );
                })
            ) : (
                <NoData />
            )}
        </WrapperScroll>
    );
});

export default ProjectUsers;
