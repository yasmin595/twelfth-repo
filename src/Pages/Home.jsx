import React from 'react';
import Navbar from './shared/Navbar';
import Banner from './Banner';
import PopularCamps from './PopularCamp';
import LatestFeedbacks from './LatestFeedBack';
import NewsletterSection from './NewsLetterSection';

const Home = () => {
    return (
        <div>
     <Banner></Banner>
     <PopularCamps></PopularCamps>
     <LatestFeedbacks></LatestFeedbacks>
     <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;