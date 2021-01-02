import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List as AdminList,
    Show,
    SimpleShowLayout,
    TextInput,
    DeleteButton,
    SimpleList,
    Filter,
    NumberField,
    DateField,
    useGetMany,
    ReferenceArrayField,
    TextField,
    LinearProgress
} from "react-admin";
import { useMediaQuery } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const ToPay = ({record}) => <Typography variant="body2">{record && new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON' }).format(record.cost - record.paid)}</Typography>
const TodayRevenue = ({record}) => {
    const {data, loading} = useGetMany('orders', record.orders)
    return(
        loading ? <div style={{padding:"1rem"}}><LinearProgress/></div> : (<div className="MuiFormControl-root MuiFormControl-marginDense">
        <label className="MuiFormLabel-root MuiInputLabel-shrink">
            <span>
            Today's Revenue
            </span>
        </label>
        <div className="RaLabeled-value-52">
            <NumberField source="today" record={{today: !loading && data && data.map(a=> a.lastPay).reduce((a, b) => a + b, 0)}} locales="ro-RO" options={{style: 'currency', currency: 'RON'}}/>
        </div>
    </div>)
    )
}
const PendingRevenue = ({record}) => {
    const {data, loading} = useGetMany('orders', record.orders);
    return (
        loading ? <div style={{padding:"1rem"}}><LinearProgress/></div> : (<div className="MuiFormControl-root MuiFormControl-marginDense">
            <label className="MuiFormLabel-root MuiInputLabel-shrink">
                <span>
                Pending Revenue
                </span>
            </label>
            <div className="RaLabeled-value-52">
                <NumberField source="pend" record={{pend: !loading && data && (data.map(a=> a.cost).reduce((a, b) => a + b, 0)) - (data.map(a=> a.paid).reduce((a, b) => a + b, 0))}} locales="ro-RO" options={{style: 'currency', currency: 'RON'}}/>
            </div>
        </div>)
    )
}
const SalesFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Search" source="date" />
      {/* <AutocompleteInput source="phone_number" /> */}
  </Filter>
);
export const SalesList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
    <AdminList {...props} filter={SalesFilter}>
     {!isSmall ? (

     <Datagrid optimized rowClick="show" style={{overflowWrap: 'anywhere'}}>
        <DateField source="date"/>
        <TodayRevenue/>
        <PendingRevenue/>
        <DeleteButton label="" redirect={false}/>
      </Datagrid>):(
          <SimpleList
          primaryText={record => <DateField source="date" record={record}/>}
          secondaryText={record => <PendingRevenue record={record}/>}
          tertiaryText={record => <TodayRevenue record={record}/>}
          linkType="show"
          />
      )}
    </AdminList>
  );
}



export const SalesShow = (props) => {
    // console.log(props);
    // console.log(data);
      return(
      <Show {...props} >
          <SimpleShowLayout>
            <DateField source="date"/>
            <TodayRevenue/>
            <PendingRevenue/>
            <ReferenceArrayField source="orders" reference="orders">
                <Datagrid rowClick="show">
                    <TextField source="phone_number"/>
                    <TextField source="product"/>
                    <NumberField source="lastPay" locales="ro-RO" options={{style: 'currency', currency: 'RON'}}/>
                    {/* <NumberField source="paid" locales="ro-RO" options={{style: 'currency', currency: 'RON'}}/> */}
                    <ToPay source="To Pay"/>
                    <NumberField source="cost" locales="ro-RO" options={{style: 'currency', currency: 'RON'}}/>
                </Datagrid>
            </ReferenceArrayField>
            {/* <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                Orders
                </ListSubheader>}>
                {!loading && data.orders.map((order) =>
                <ListItem key={order.toString()}>
                    <ListItemText>
                        <ReferenceField source="orders" reference="orders">
                            <TextField optionText="phone_number" />
                        </ReferenceField>
                    </ListItemText>
                </ListItem>
                )}
            </List> */}
          </SimpleShowLayout>
      </Show>
  )}

