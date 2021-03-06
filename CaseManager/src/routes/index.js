// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import TreeView from '../components/TreeView/TreeView'
import TableView from '../components/TableView/TableView'
import MyTreeView from '../components/MyTreeView/MyTreeView'

export const createRoutes = (store) => {
/*  Note: Instead of using JSX, we are using react-router PlainRoute,
    a simple javascript object to provide route definitions.
    When creating a new async route, pass the instantiated store!   */

  const routes = {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
      path: 'MyTreeView',
      component:MyTreeView,

    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./Counter').default(store),
          require('./NotFound').default
        ])
      })
    }
  }


  return routes
}

export default createRoutes
