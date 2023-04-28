export interface AppResponse<T> {
	message: string
	data: T
	statusCode: number
}

export const HTTP_STATUS_OK = 200
export const HTTP_STATUS_BAD_REQUEST = 400
export const HTTP_STATUS_UNAUTHORIZED = 401
export const HTTP_STATUS_NOT_FOUND = 404
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500
