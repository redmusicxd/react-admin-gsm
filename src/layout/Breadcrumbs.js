import * as React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from "react-router-dom";

const LinkRouter = (props) => <Link {...props} component={RouterLink}/>

const Routes = ({ breadcrumbs }) => (
    <React.Fragment key="breadcrumbs-fragment">
        <Breadcrumbs aria-label="breadcrumb" {...breadcrumbs.key}>
            {breadcrumbs.map(({ breadcrumb, location }) => breadcrumb.key === location.pathname ? (<Typography color="textPrimary" key={breadcrumb.key} >{breadcrumb}</Typography>) : (<LinkRouter color="inherit" to={breadcrumb.key} key={breadcrumb.key}>{breadcrumb}</LinkRouter>))}
        </Breadcrumbs>
    </React.Fragment>
)

export default withBreadcrumbs()(Routes);