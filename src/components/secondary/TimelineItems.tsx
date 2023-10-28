import WrapperData from './WrapperData';
import TimelineService from '../../services/TimelineService';
import { useEffect, useState } from 'react';

interface DataProps {
    title: string;
    type: string;
    tags: string;
    start: string;
    end: string;
    description: string;
}

export const TimelineItems: React.FC = () => {
    const [items, setItems] = useState<DataProps[]>();

    useEffect(() => {
        async function getList() {
            const result = await TimelineService.getATimeline(2);
            setItems(result.data);
        }

        getList();
    }, []);

    return (
        <div>
            {items?.map((item: DataProps) => {
                return (
                    <WrapperData color="pink">
                        <div className="d-flex justify-content-between">
                            <span>{item.title}</span>
                            <span>{item.type}</span>
                            <span>{item.tags}</span>
                            <span>{item.start}</span>
                            <span>{item.end}</span>
                            <span>{item.description}</span>
                        </div>
                    </WrapperData>
                );
            })}
        </div>
    );
};
