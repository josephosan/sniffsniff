import React from 'react';
import CustomSelect from "../components/primary/CustomSelect";
import TagApiService from "../services/TagApiService";

export const Home: React.FC = () => {
    return (
        <>
            <CustomSelect
                className={"w-100"}
                select_url={TagApiService.selectUrl}
                mode={"tags"}
            />
        </>
    );
};
