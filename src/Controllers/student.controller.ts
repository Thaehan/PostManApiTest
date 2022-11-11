import { Request, Response } from 'express'

import { hashSaltRound } from '../Config/config'
import { students } from '../Models'
import { IStudent } from '../Types'

const Student = students

const createAsync = async (req: Request, res: Response) => {
  try {
    console.log('student1')
    const studentData: IStudent = req.body
    console.log('student2', studentData)

    const newStudent = new Student(studentData)
    const resData = await newStudent.save()
    res.status(200).send({ result: resData.toJSON() })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing student information!' })
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const query = req.query
    console.log(query)
    const result = await Student.find(query)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id
    console.log('get by id')
    if (!studentId) {
      res.status(400).send({ message: 'Cần nhập vào id của Student!' })
    }
    const result = await Student.findById(studentId)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const updateByIdAsync = async (req: Request, res: Response) => {
  try {
    const { id, data } = req.body
    console.log('data', id, data)
    if (!id || !data) {
      res.status(400).send({ message: 'Please fill the id and data!' })
    }
    const result = await Student.findByIdAndUpdate(id, data)
    res.status(200).send({ message: 'Student updated' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  createAsync,
  getByIdAsync,
  getManyAsync,
  updateByIdAsync,
}
