import { Layout, Sidebar } from 'react-admin';
import { useSelector } from 'react-redux';
import Routes from './Breadcrumbs'
import React from 'react';
import { darkTheme, lightTheme } from './themes';
import CustomAppBar from './CustomAppBar';
import Menu from './CustomMenu';

const CustomSidebar = (props) => <Sidebar {...props} size={200} />;
const MyLayout = ({ children, ...props }) =>
{
    const theme = useSelector((state) => state.theme === 'dark' ? darkTheme : lightTheme );
    return (
    <Layout
        {...props}
        theme={theme}
        appBar={CustomAppBar}
        sidebar={CustomSidebar}
        menu={Menu}
        >
        <Routes/>
        {children}
    </Layout>);
}

export default MyLayout;