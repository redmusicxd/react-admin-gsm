import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    Show,
    Create,
    Edit,
    SimpleShowLayout,
    SimpleForm,
    TextField,
    TextInput,
    EditButton,
    DeleteButton,
    RichTextField,
    SelectInput,
    DateField,
    SelectField,
    SimpleList,
    Filter,
    NumberField,
    NumberInput,
    useQuery,
    DateInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import { useMediaQuery } from '@material-ui/core';

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toUpperCase();
}
const OrderFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Search" source="id" alwaysOn />
      {/* <AutocompleteInput source="phone_number" /> */}
      <TextInput source="phone_number" />
      <TextInput source="product" />
  </Filter>
);
export const OrderList = (props) => {

    const isSmall = useMediaQuery(styl => styl.breakpoints.down('sm'));
    return (
    <List {...props} sort={{field: "createdate", order:"asc"}} filters={<OrderFilter />}>
     {!isSmall ? (
     <Datagrid rowClick="show" style={{overflowWrap: 'anywhere'}}>
        <TextField source="id"/>
        <SelectField source="status" choices={[
                {id: 1, name: "Finalizata"},
                {id: 2, name: "Diagnoza"},
                {id: 3, name: "Predata"},
                {id: 4, name: "Asteptare piese"},
                {id: 5, name: "In Lucru"},
            ]} />
        <TextField source="phone_number" />
        <TextField source="product" />
        {/* <RichTextField source="issue_description" /> */}
        <NumberField source="cost" locales="ro-RO" options={{ style: 'currency', currency: 'RON' }}/>
        <NumberField source="paid" locales="ro-RO" options={{ style: 'currency', currency: 'RON' }}/>
        {/* <DateField source="finished" /> */}
        <DateField source="createdate" label="Created"/>
        <DateField source="lastupdate" label="Updated"/>
        {/* <ShowButton label="" /> */}
        <EditButton label="" />
        <DeleteButton label="" redirect={false}/>
      </Datagrid>):(
          <SimpleList
          primaryText={record => record.product}
          secondaryText={record => record.phone_number}
          tertiaryText={record => `${record.paid}/${record.cost} Lei`}
          linkType="show"
          />
      )}
    </List>
  );
}
  export const OrderShow = (props) => (
      <Show {...props} >
          <SimpleShowLayout>
            {/* <RichTextField source="id" options={{disabled: true}}/>
            <RichTextField source="createdate" options={{ disabled: true }} />
            <RichTextField source="lastupdate" options={{ disabled: true }} /> */}
            <TextField source="phone_number" />
            <NumberField source="cost" locales="ro-RO" options={{ style: 'currency', currency: 'RON' }}/>
            <NumberField source="paid" locales="ro-RO" options={{ style: 'currency', currency: 'RON' }}/>
            <TextField source="product" />
            <RichTextField source="issue_description" />
            <RichTextField source="tech_obs" />
            <SelectField source="status" choices={[
                {id: 1, name: "Finalizata"},
                {id: 2, name: "Diagnoza"},
                {id: 3, name: "Predata"},
                {id: 4, name: "Asteptare piese"},
                {id: 5, name: "In Lucru"},
            ]} />
            <TextField source="imei" />
            <TextField source="sn" />
            <DateField source="createdate" />
            <DateField source="lastupdate" />
            {/* <DateField source="finished" /> */}
          </SimpleShowLayout>
      </Show>
  )

  export const OrderCreate = (props) => (
    <Create {...props} >
      <SimpleForm>
        <TextInput source="id" label="ID" defaultValue={makeid(7)} options={{disabled: true}}/>
        <TextInput source="phone_number" label="Phone Number"/>
        <TextInput source="product" label="Product" />
        <RichTextInput source="issue_description" label="Issue Description"/>
        <NumberInput source="cost" label="Repair Cost"/>
        <NumberInput source="paid" label="Paid Amount"/>
        <TextInput source="imei" label="IMEI"/>
        <TextInput source="sn" label="Serial Number"/>
        <RichTextInput source="tech_obs" label="Technician Observations" />
        <SelectInput source="status" label="Status" choices={[
            {id: 1, name: "Finalizata"},
            {id: 2, name: "Diagnoza"},
            {id: 3, name: "Predata"},
            {id: 4, name: "Asteptare piese"},
            {id: 5, name: "In Lucru"},
        ]}/>
      </SimpleForm>
    </Create>
  );
  export const OrderEdit = (props) => {
    return(
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" options={{disabled: true}}/>
        <TextInput source="imei" />
        <TextInput source="sn" />
        <TextInput source="product" />
        <TextInput source="phone_number" />
        <RichTextInput source="issue_description" />
        <RichTextInput source="tech_obs" />
        <SelectInput source="status" choices={[
            {id: 1, name: "Finalizata"},
            {id: 2, name: "Diagnoza"},
            {id: 3, name: "Predata"},
            {id: 4, name: "Asteptare piese"},
            {id: 5, name: "In Lucru"},
        ]}/>
        <NumberInput source="cost"/>
        <NumberInput source="paid"/>
        {/* {status === 3 ? (<DateInput variant="filled" source="finished" InputProps={{value: new Date().toISOString().match("(.*)T")[1]}} defaultValue={""} options={{disabled: true}}/>) : (<DateInput variant="filled" source="finished" InputProps={{value: new Date('1970-01-01').toISOString().match("(.*)T")[1]}} defaultValue={""} options={{disabled: true}}/>)} */}
      </SimpleForm>
    </Edit>
  );}
