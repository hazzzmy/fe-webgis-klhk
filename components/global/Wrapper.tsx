import React, { ReactElement, ReactNode } from 'react';

type ParamsProps = {
    title?: string;
    children?: ReactNode; // Corrected prop name and type
};

const Wrapper = ({ title, children }: ParamsProps): ReactElement => {
    return (
        <section className='flex container mx-auto px-8'>
            <h1 className='text-center text-xl mb-8'>{title}</h1>
            {children}
        </section>
    );
};

export default Wrapper;