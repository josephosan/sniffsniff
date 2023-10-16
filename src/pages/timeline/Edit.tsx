import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FormSkeletonLoading from "../../components/secondary/FormSkeletonLoading";
import BigBoxSkeletonLoading from "../../components/secondary/BigBoxSkeletonLoading";

const EditTimeLine: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            //todo: to send s request to get basic form data
        }
    }, []);

    return (
        <>
            {
                loading ? (
                    <>
                        <FormSkeletonLoading />
                        <br />
                        <BigBoxSkeletonLoading />
                    </>
                ) : (
                    <div>
                        timeline
                    </div>
                )
            }
        </>
    );
}

export default EditTimeLine;