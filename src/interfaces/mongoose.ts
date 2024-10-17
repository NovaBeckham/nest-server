/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 17:33:30
 */

import { Model, Types } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { PaginateModel } from '@/utils/paginate'

export type MongooseDoc<T> = Omit<DocumentType<T>, '_id' | 'id'> & T & { _id: Types.ObjectId }
export type MongooseModel<T> = Model<MongooseDoc<T>> & PaginateModel<MongooseDoc<T>>
