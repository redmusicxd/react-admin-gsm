/* eslint-disable import/no-anonymous-default-export */
// in src/Dashboard.js

import * as React from 'react';
import TodayRevenue from './todaySale';
import TodayOrders from './noOrders';
import Welcome from './Welcome';
const Spacer = () => <span style={{ width: '1em' }} />;
export default () => (
    <>
    <Welcome />
    <div style={{"display":"flex"}}>
        <div style={{"flex": 1, "marginRight":"0.5em"}}>
            <div style={{"display": "flex"}}>
                <TodayRevenue />
                <Spacer />
                <TodayOrders />
            </div>
        </div>
    </div>
    </>
);