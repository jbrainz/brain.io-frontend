import { Route, Redirect } from 'react-router-dom'
import { getTokens } from '../../Helpers/Services'

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const token = getTokens()

  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoutes
