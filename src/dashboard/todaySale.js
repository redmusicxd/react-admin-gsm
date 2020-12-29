
import * as React from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useGetOne, useGetMany, LinearProgress, NumberField } from 'react-admin';

import CardWithIcon from './CardWithIcon';
const TodayRevenue = ({record}) => {
    const {data, loading} = useGetMany('orders', record.orders)
    return(
        loading ? <div style={{padding:"1rem"}}><LinearProgress/></div>
         : (
            <NumberField style={{fontSize: "1.5rem"}} source="today" record={{today: !loading && data && data.map(a=> a.lastPay).reduce((a, b) => a + b, 0)}} locales="ro-RO" options={{style: 'currency', currency: 'RON'}}/>
           )
    )
}
const MonthlyRevenue = () => {
    const { data, loading } = useGetOne('sales', new Date().toISOString().match("(.*)T")[1])
    // console.log(data);
    return (
        <CardWithIcon
            to={!loading && data ? `/sales/${new Date().toISOString().match("(.*)T")[1]}/show` : `/sales`}
            icon={DollarIcon}
            title="Today's Revenue"
            subtitle={!loading && data ? <TodayRevenue record={data}/> : "0"}
        />
    );
};

export default MonthlyRevenue;