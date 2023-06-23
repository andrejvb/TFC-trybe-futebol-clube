type ErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'BAD_REQUEST';

export type ServiceResponseError = {
  status: ErrorType,
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'CREATED' | 'SUCCESSFUL',
  data: T
};

export type ServiceMessage = { message: string };

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;
