const production = true;

const config = {
    apibaseurl: production
        ? 'https://api-prod.21genx.com/'
        : 'https://api.21genx.com:8000/',
    razorpaykey: production
        ? 'rzp_live_Yxb8Ijl5l49esI'
        : 'rzp_test_mjh9TSqUl1Zgn9',
    clevertapProjectID: production ? 'RKW-8WZ-RK7Z' : 'TEST-848-648-6K7Z',
    clevertapToken: production ? '10b-032' : 'TEST-b46-b4b',
    fireAnalyticsEvents: production,
    writable: false,
};

Object.seal(config);

export default config;
