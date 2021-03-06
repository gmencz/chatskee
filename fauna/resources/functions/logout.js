import { CreateFunction, Lambda, Query, Var } from 'faunadb'
import { Logout } from '../../auth/logout'

export default CreateFunction({
  name: 'logout',
  body: Query(Lambda(['all'], Logout(Var('all')))),
  role: 'server',
})
