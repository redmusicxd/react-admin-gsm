
import * as React from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useGetOne, LinearProgress } from 'react-admin';

import CardWithIcon from './CardWithIcon';

const TodayOrders = () => {
    const { data, loading } = useGetOne('sales', new Date().toISOString().match("(.*)T")[1])
    // console.log(data);
    return (
        loading ?
        <LinearProgress/>
        :
        <CardWithIcon
            to={!loading && data ? `/sales/${new Date().toISOString().match("(.*)T")[1]}/show` : `/sales`}
            icon={DollarIcon}
            title="Today's Orders"
            subtitle={!loading && data ? String(data.orders.length) : '0'}
        />
    );
};

export default TodayOrders;