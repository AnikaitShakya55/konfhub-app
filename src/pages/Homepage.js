'use client';
import React, { useEffect, useState } from 'react';
import FetchApi from '@/utils/FetchApi'; 

const Homepage = () => {
    const [data, setData] = useState(null); 
   
    useEffect(() => {
        const fetchData = async () => {
                const result = await FetchApi();
                setData(result); 
                console.log(result); 
        };

        fetchData(); 
    }, []);

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div>
           
            <img src={data.poster_thumbnail} />

            <h1>{data.additional_ticket_timer}</h1>
        </div>
    );
}

export default Homepage;
