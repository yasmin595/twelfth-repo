import React from 'react';
import Navbar from './shared/Navbar';
import Banner from './Banner';
import PopularCamps from './PopularCamp';
import LatestFeedbacks from './LatestFeedBack';

const Home = () => {
    return (
        <div>
     <Banner></Banner>
     <PopularCamps></PopularCamps>
     <LatestFeedbacks></LatestFeedbacks>
        </div>
    );
};

export default Home;