import { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'

import { hashSaltRound } from '../Config/config'
import db from '../Models'
import { IAccount } from '../Types'

const Account = db.accounts

const createAsync = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body
    if (!username || !password || !role) {
      return
    }

    const data: IAccount = {
      username: req.body.username,
      password: await hash(req.body.password, hashSaltRound),
      role: req.body.role,
    }
    const newAccount = new Account(data)

    await newAccount.save()
    res.status(200).send({ result: data })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const loginAsync = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.query

    console.log(username, password)

    if (username && password) {
      const hashedPassword = await hash(password.toString(), hashSaltRound)
      const result = await Account.findOne({
        username,
        password: hashedPassword,
      })
      res.status(200).send(result)
    } else {
      res
        .status(400)
        .send({ message: 'Fill the username and password please!' })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const findOneAsync = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const { username } = req.query
    console.log(username)
    const result = await Account.find({})
    res.status(200).send({ data: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    console.log('get by id')
    if (!userId) {
      res.status(400).send({ message: 'Cần nhập vào userId' })
    }
    const result = await Account.findById(userId)
    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const updateAsync = async (req: Request, res: Response) => {
  try {
    const { id, data } = req.body
    console.log('id, data', id, data)
    if (!id || !data) {
      res.status(400).send({ message: 'Please fill the id and data!' })
    }
    const result = await Account.findByIdAndUpdate(id, data)
    res.status(200).send({ message: 'Account updated' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  createAsync,
  getManyAsync,
  getByIdAsync,
  updateAsync,
  findOneAsync,
  loginAsync,
}
