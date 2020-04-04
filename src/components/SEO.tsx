import React from 'react';
import Helmet from "react-helmet";

type SEOProps = {
    title: string
}

const SEO = (props: SEOProps) => {
    return (
        <Helmet>
            <title>{props.title} | Outwork.</title>
        </Helmet>
    );
};

export default SEO;
