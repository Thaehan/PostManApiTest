import { Express } from 'express'

import accountRoutes from './account.routes'
import studentRoutes from './student.routes'
import teacherRoutes from './teacher.routes'
import classRoutes from './class.routes'

const setRoutes = (app: Express) => {
  //Declare all routes
  accountRoutes(app)
  studentRoutes(app)
  teacherRoutes(app)
  classRoutes(app)
}

export { setRoutes }
