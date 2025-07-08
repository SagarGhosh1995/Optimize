import React from 'react'
import CategoryTemplate1 from './CategoryTemplate1/CategoryTemplate1';
import WFHTemplate1 from './WFHTemplate1/WFHTemplate1';
import HeroSection from './HeroSection/HeroSection';
import BrandTemplate1 from './BrandTemplate1/BrandTemplate1';
import HomepageBanner from './HomepageBanner/HomepageBanner';
import AwardTemplate1 from './AwardTemplate1/AwardTemplate1';
import UtilityTemplate1 from './UtilityTemplate1/UtilityTemplate1';
import CountryTemplate1 from './CountryTemplate1/CountryTemplate1';

const ComponentRenderer = ({ data }: { data: any }) => {
     switch (data?.component) {        
        case 'CategoryTemplate1':
            return <CategoryTemplate1 data={data} />

        case 'WFHTemplate1':
            return <WFHTemplate1 data={data} />

        case 'HeroSection':
            return <HeroSection data={data} />

        case 'BrandTemplate1':
            return <BrandTemplate1 data={data} />

        case 'HomepageBanner':
            return <HomepageBanner data={data} />

        case 'AwardTemplate1':
            return <AwardTemplate1 data={data} />

        case 'UtilityTemplate1':
            return <UtilityTemplate1 data={data} />

        case 'CountryTemplate1':
            return <CountryTemplate1 data={data} />

        default:
            break;
    }
}

export default ComponentRenderer