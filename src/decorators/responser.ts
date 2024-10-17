/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 15:32:21
 */

import { is } from 'ramda'
import { ResponseMessage } from '@/interfaces/response'
import { HttpStatus, SetMetadata } from '@nestjs/common'
import { HTTP_ERROR_SUFFIX, HTTP_SUCCESS_SUFFIX } from '@/constants/text'
import { UNDEFINED } from '@/constants/value'
import {
  HTTP_ERROR_CODE,
  HTTP_ERROR_MESSAGE,
  HTTP_RESPONSE_TRANSFORM,
  HTTP_RESPONSE_TRANSFORM_TO_PAGINATE,
  HTTP_SUCCESS_CODE,
  HTTP_SUCCESS_MESSAGE
} from '@/constants/meta'

interface DecoratorCreatorOption {
  errorCode?: HttpStatus
  successCode?: HttpStatus
  errorMessage?: ResponseMessage
  successMessage?: ResponseMessage
  usePaginate?: boolean
}

interface HandleOption {
  error?: HttpStatus
  success?: HttpStatus
  message: ResponseMessage
  usePaginate?: boolean
}

type HandleOptionConfig = ResponseMessage | HandleOption

const createDecorator = (options: DecoratorCreatorOption): MethodDecorator => {
  const { errorMessage, successMessage, errorCode, successCode, usePaginate } = options
  return (_, __, descriptor: PropertyDescriptor) => {
    SetMetadata(HTTP_RESPONSE_TRANSFORM, true)(descriptor.value)
    if (errorCode) {
      SetMetadata(HTTP_ERROR_CODE, errorCode)(descriptor.value)
    }
    if (successCode) {
      SetMetadata(HTTP_SUCCESS_CODE, successCode)(descriptor.value)
    }
    if (errorMessage) {
      SetMetadata(HTTP_ERROR_MESSAGE, errorMessage)(descriptor.value)
    }
    if (successMessage) {
      SetMetadata(HTTP_SUCCESS_MESSAGE, successMessage)(descriptor.value)
    }
    if (usePaginate) {
      SetMetadata(HTTP_RESPONSE_TRANSFORM_TO_PAGINATE, true)(descriptor.value)
    }
    return descriptor
  }
}

/**
 * @function handle
 * @example ```@HttpProcessor.handle('Some request')```
 * @example ```@HttpProcessor.handle({ message: 'Some request', error: error, success: 200, usePaginate: true })```
 */
export function handle(arg: HandleOptionConfig): MethodDecorator
export function handle(...args: any[]) {
  const option = args[0]
  const isOption = (value: HandleOptionConfig): value is HandleOption => is(Object, value)
  const message: ResponseMessage = isOption(option) ? option.message : option
  const errorMessage: ResponseMessage = message + HTTP_ERROR_SUFFIX
  const successMessage: ResponseMessage = message + HTTP_SUCCESS_SUFFIX
  const errorCode = isOption(option) ? option.error : UNDEFINED
  const successCode = isOption(option) ? option.success : UNDEFINED
  const usePaginate = isOption(option) ? option.usePaginate : false
  return createDecorator({
    errorCode,
    successCode,
    errorMessage,
    successMessage,
    usePaginate
  })
}

export const Responser = { handle }
