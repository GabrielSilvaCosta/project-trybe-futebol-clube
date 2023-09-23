export type ServiceMessage = {
  message: string;
};

export type ServiceResponse<T> = {
  status: 'SUCCESSFUL' | 'CREATED' | 'INVALID_DATA' | 'UNAUTHORIZED' |
  'NOT_FOUND' | 'CONFLICT' | 'UNPROCESSABLE';
  data: T | ServiceMessage;
};
