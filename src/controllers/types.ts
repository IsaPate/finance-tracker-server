export type ControllerResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ErrorsArray[];
};
export type ErrorsArray = {
  path: string;
  message: string;
};
