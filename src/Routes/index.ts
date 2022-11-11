import { Express } from 'express'

import accountRoutes from './account.routes'
import studentRoutes from './student.routes'

const setRoutes = (app: Express) => {
  //Declare all routes
  accountRoutes(app)
  studentRoutes(app)
}

export { setRoutes }
