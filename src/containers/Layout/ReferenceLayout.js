import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '../../components/AppParts';
// sidebar nav config
import navigation_framework from '../../_nav_reference';
// routes config
import { routes_reference } from '../../routes_reference';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

class ReferenceLayout extends Component {
  constructor(props) {
    super(props);

    this.isRestricted = Object.is(this.props.isRestricted, undefined) ? true : this.props.isRestricted;
  }
  
  render() {
    return (            
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation_framework} {...this.props} isRestricted= {this.isRestricted} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes_reference}/>
            <Container fluid>
              <Switch>
                {
                 routes_reference.map((route, idx) => {
                  return route.component ? (
                    (route.restricted === undefined)? (
                      <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                        )} />
                      ): (
                      <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                        )} />
                      )
                    )
                    : (null);
                },
                )
               }
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

ReferenceLayout.propTypes = {
  isrestricted: PropTypes.bool,
}

ReferenceLayout.defaultProps = {
  isrestricted: false,
}


// export default connect(state => ({ templateStatus: getTemplateStatus(state) }))(FrameworkLayout);

// const mapStateToProps = state => state.templateVisibility;
// export default connect(mapStateToProps)(DefaultLayout);

export default ReferenceLayout;
