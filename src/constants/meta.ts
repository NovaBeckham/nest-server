/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 15:49:22
 */

import { HTTP_CODE_METADATA } from '@nestjs/common/constants'

// responser
export const HTTP_ERROR_CODE = '__appHttpErrorCode__'
export const HTTP_ERROR_MESSAGE = '__appHttpErrorMessage__'

export const HTTP_SUCCESS_CODE = HTTP_CODE_METADATA
export const HTTP_SUCCESS_MESSAGE = '__appHttpSuccessMessage__'

export const HTTP_RESPONSE_TRANSFORM = '__appHttpResponseTransform__'
export const HTTP_RESPONSE_TRANSFORM_TO_PAGINATE = '__appHttpResponseTransformToPaginate__'
