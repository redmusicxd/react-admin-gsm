/* eslint-disable import/no-anonymous-default-export */
import { Admin, Resource } from 'react-admin';
import {
  FirebaseDataProvider,
  FirebaseAuthProvider
} from "react-admin-firebase";
import { firebaseConfig as config } from './FIREBASE_CONFIG';
import { OrderList, OrderCreate, OrderEdit, OrderShow } from './orders/orders'
import LoginPage from './layout/CustomLoginPage'
import MyLayout from './layout/CustomLayout'
import dashboard from './dashboard/dashboard';
import themeReducer from './themeReducer';
import { SalesList, SalesShow } from './sales/sales';


const options = {
  logging: true,
  watch: ["orders"],
  persistence: 'session'
}
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

const myprovider = {
  ...dataProvider,
  update: async (resource, params) => {
    const customParams = {...params, data:{...params.data, lastPay: params.data.paid - params.previousData.paid}};
    if(params.data.paid && params.data.paid !== params.previousData.paid){
        dataProvider.getOne('sales', {
          id: new Date().toISOString().match("(.*)T")[1]
        }).then(saleDate => {
          dataProvider.update('sales', {
            data: {
              ...saleDate.data,
              // totalValue: params.data.paid > params.previousData.paid ? saleDate.data.totalValue + (params.data.paid - params.previousData.paid) : params.data.paid < params.previousData.paid ? saleDate.data.totalValue - (params.previousData.paid - params.data.paid) : saleDate.data.totalValue,
              // pendingSales: params.data.cost > params.previousData.cost ? saleDate.data.pendingSales + (params.data.cost - params.data.paid) : params.data.cost < params.previousData.cost ? saleDate.data.pendingSales - (params.previousData.cost - params.data.cost) : params.data.paid < params.previousData.paid ? saleDate.data.pendingSales + (params.previousData.paid - params.data.paid) : saleDate.data.pendingSales - (params.data.paid - params.previousData.paid),
              orders: saleDate.data.orders.includes(params.id) ? [...saleDate.data.orders] : [...saleDate.data.orders, {id: params.id, lastPay: params.data.paid - params.previousData.paid}]
            },
            id: saleDate.data.id,
            previousData: saleDate.data
          })
        }).catch((err) => {
          console.error(err);
          dataProvider.create('sales',{
            data:{
              date: new Date(),
              // pendingSales: params.data.cost - params.data.paid,
              // totalValue: params.data.paid > params.previousData.paid ? params.data.paid - params.previousData.paid : params.data.paid < params.previousData.paid ? params.previousData.paid - params.data.paid : 0,
              orders: [{id :params.id, lastPay: params.data.paid - params.previousData.paid}],
              id: new Date().toISOString().match("(.*)T")[1]
            }
          })
        })
    }
    if(resource === "orders" && params.data.paid !== params.previousData.paid){
      return dataProvider.update(resource, customParams);
    }else{
      return dataProvider.update(resource, params);
    }
  },
  create: async (resource, params) => {
    const customParams = {...params, data:{...params.data, lastPay: params.data.paid}};
    console.log(params);
    if(params.data.paid && params.data.cost){
      let saleDate = await dataProvider.getOne('sales', {
        id: new Date().toISOString().match("(.*)T")[1]
      })
      if(saleDate.data){
        dataProvider.update('sales', {
          data: {
            ...saleDate.data,
            // totalValue: saleDate.data.totalValue + params.data.paid,
            // pendingSales: saleDate.data.pendingSales + (params.data.cost - params.data.paid),
            orders: [...saleDate.data.orders, params.data.id]
          },
          id: saleDate.data.id,
          previousData: saleDate.data
        })
      }else{
        dataProvider.create('sales',{
          data:{
            date: new Date(),
            // pendingSales: params.data.cost - params.data.paid,
            // totalValue: params.data.paid,
            orders: [params.data.id],
            id: new Date().toISOString().match("(.*)T")[1]
          }
        })
      }
    }
    return dataProvider.create(resource, customParams);
  },
  delete: async (resource, params) => {
    console.log(params);
    let saleDate = await dataProvider.getOne('sales', {
      id: new Date().toISOString().match("(.*)T")[1]
    })
    saleDate.data.orders.forEach((a, index) => {if(a === params.id) {saleDate.data.orders.splice(index, 1)}})
    dataProvider.update('sales', {
      data: {
        ...saleDate.data,
        // totalValue: saleDate.data.totalValue - params.previousData.paid,
        // pendingSales: params.previousData.cost !== params.previousData.paid ? saleDate.data.pendingSales - (params.previousData.cost - params.previousData.paid) : saleDate.data.pendingSales,
        orders: [...saleDate.data.orders]
      },
      id: saleDate.data.id,
      previousData: saleDate.data
    })
    return dataProvider.delete(resource, params);
  }
}
const initialState = {
  theme: localStorage.getItem('currentTheme') ? localStorage.getItem('currentTheme') : 'light',
};
// function batchCreate() {
//   dataProvider.getList('orders', {
//     pagination:{
//       page:1,
//       perPage:50
//     }
//   }).then(res => {
//     dataProvider.update('sales', {
//       id: "2020-12-15",
//       data{
//         createdate: Tue Dec 15 2020 12:47:01 GMT+0200 (Eastern European Standard Time)
//         createdby: "dannegru40@gmail.com"
//         date: Tue Dec 15 2020 12:47:01 GMT+0200 (Eastern European Standard Time)
//         id: "2020-12-15"
//         lastupdate: Tue Dec 15 2020 14:05:15 GMT+0200 (Eastern European Standard Time)
//         orders:
//         [0: "IP2W6QI"
//         1: "0WRCKMW"
//         2: "BABASGV"
//         3: "XZL5ZDB"]
//         length: 4
//         __proto__: Array(0)
//         updatedby: "dannegru40@gmail.com"
//       }
//     })
//   })

// }
// setInterval(() => {
//   batchCreate()
// }, 5000);
export default () =>{
  return(
  <Admin customReducers={{theme: themeReducer}} initialState={initialState} dataProvider={myprovider} authProvider={authProvider} loginPage={LoginPage} layout={MyLayout} dashboard={dashboard} title="Service Orders Management">
    <Resource name="orders" list={OrderList} create={OrderCreate} edit={OrderEdit} show={OrderShow} />
    <Resource name="sales" list={SalesList} show={SalesShow} />
  </Admin>
  )}