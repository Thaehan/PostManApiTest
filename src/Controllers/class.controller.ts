import { Request, Response } from 'express'

import { hashSaltRound } from '../Config/config'
import { classes } from '../Models'
import { IClass } from '../Types'

const Class = classes

const createAsync = async (req: Request, res: Response) => {
  try {
    const classData: IClass = req.body

    const existClass = await Class.find({
      class_id: classData.class_id,
    })
    if (existClass.length != 0) {
      res.status(400).send({ message: 'Class Id is exist!' })
      return
    }

    const newClass = new Class(classData)
    const resData = await newClass.save()
    res.status(200).send({ result: resData.toJSON() })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing class information!' })
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const query = req.query
    console.log(query)
    const result = await Class.find(query)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const classId = req.params.id
    console.log('get by id')
    if (!classId) {
      res.status(400).send({ message: 'Cần nhập vào id của Class!' })
      return
    }
    const result = await Class.findById(classId)
    res.status(200).send({ result })
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
      return
    }
    const result = await Class.findByIdAndUpdate(id, data)
    if (result) {
      res.status(200).send({ message: 'Class updated' })
    } else {
      res.status(400).send({ error: 'Error when update class!' })
    }
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
