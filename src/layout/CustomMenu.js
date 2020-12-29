import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery, Box } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { MenuItemLink, getResources, DashboardMenuItem } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';

const Menu = ({ onMenuClick, logout, dense = false }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <Box mt={1}>
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) ||
                        resource.name.charAt(0).toUpperCase() + resource.name.slice(1)
                    }
                    leftIcon={
                        resource.icon ? <resource.icon /> : <DefaultIcon />
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            ))}
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText="Configuration"
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </Box>
    );
};

export default Menu;