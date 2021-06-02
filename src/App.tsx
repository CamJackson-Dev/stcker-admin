import React from "react";
import { Admin, Resource } from "react-admin";
import { Toaster } from "react-hot-toast";

import authProvider from "./auth-provider";
import DashboardPage from "./custom/dashboard";
import LoginPage from "./custom/login";
import dataProvider from "./data-provider";
import { CustomerIcon, CustomerList } from "./resources/customers";
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductIcon,
} from "./resources/products";
import { OrderEdit, OrderIcon, OrderList } from "./resources/orders";
import { RequestEdit, RequestIcon, RequestList } from "./resources/requests";
import { TOAST_OPTIONS } from "./utils/constants";

const App = () => (
  <>
    <Admin
      authProvider={authProvider}
      dashboard={DashboardPage}
      dataProvider={dataProvider}
      loginPage={LoginPage}
    >
      <Resource name="customers" icon={CustomerIcon} list={CustomerList} />
      <Resource
        name="orders"
        edit={OrderEdit}
        icon={OrderIcon}
        list={OrderList}
      />
      <Resource
        name="products"
        create={ProductCreate}
        edit={ProductEdit}
        icon={ProductIcon}
        list={ProductList}
      />
      <Resource
        name="requests"
        edit={RequestEdit}
        icon={RequestIcon}
        list={RequestList}
      />
    </Admin>
    <Toaster toastOptions={TOAST_OPTIONS} />
  </>
);

export default App;
