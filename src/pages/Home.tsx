import React from 'react';
import CustomSelect from "../components/primary/CustomSelect";
import TagApiService from "../services/TagApiService";

export const Home: React.FC = () => {
    return (
        <>
            <CustomSelect
                className={"w-100"}
                select_url={TagApiService.selectUrl}
                tag_create_url={TagApiService.baseUrl}
                mode={"tags"}
            />
        </>
    );
};
