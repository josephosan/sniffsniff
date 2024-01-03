import React, {useEffect, useState} from "react";
import WrapperMessage from "./WrapperMessage";
import UnderlinedLink from "./UnderlinedLink";
import NotificationApiService from "../../services/NotificationApiService";
import NoData from "../tiny/NoData";
import Loading from "./Loading";

const NotificationModalMessages: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [notifList, setNotifList] = useState<unknown[] | null>(null);

    useEffect(() => {
        async function getData() {
            await fetchData();
        }

        getData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        try {
            const {data} = await NotificationApiService.getAll();
            setNotifList(() => data.data.items);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {
                !loading && (notifList?.length === 0 || !notifList) ? (
                    <NoData/>
                ) : loading ? (
                    <div className={"w-100 d-flex justify-content-center align-items-center p-2"}>
                        <Loading/>
                    </div>
                ) : (
                    <div className={"p-1 gap-1"}>
                        {
                            notifList && notifList.map(el => {
                                return (
                                    <WrapperMessage
                                        title={el.title}
                                        desc={el.description}
                                        type={
                                            el.type === 0 ? 'info' : 'warning'
                                        }
                                    />
                                );
                            })
                        }

                        <div className={"d-flex justify-content-center mt-3"}>
                            <UnderlinedLink
                                text={"بیشتر"}
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default NotificationModalMessages;