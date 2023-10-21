import React from 'react';
import CustomSteps from '../components/secondary/CustomSteps';

export const Home: React.FC = () => {
    return (
        <>
            <div>
                <CustomSteps
                    currentStepIndex={3}
                    status={'wait'}
                    items={[
                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },
                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },

                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },
                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },
                        {
                            title: 'عنوان',
                            description: 'شرح',
                        },
                    ]}
                />
            </div>
        </>
    );
};
