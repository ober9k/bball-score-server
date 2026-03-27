/**
 * Borrowed with adjustments, see:
 * https://github.com/gothinkster/node-express-realworld-example-app/
 */
class HttpException extends Error {
  errorCode: number;
  errorType: string;

  constructor(
    errorCode: number,
    errorType: string,
    public readonly message: string,
  ) {
    super(message);
    this.errorCode = errorCode;
    this.errorType = errorType;
  }
}

export function isHttpException(error: Error | HttpException): error is HttpException {
  return (
    (error as HttpException).errorCode !== undefined &&
    (error as HttpException).errorType !== undefined
  );
}

export default HttpException;
