import { Response } from "express"
import { StatusCodes } from "http-status-codes"

export class BaseController {

    protected success = (response: Response, data: any) => {
        response.status(StatusCodes.OK).send(data);
    }

    protected error = (response: Response, error: Error | any) => {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error instanceof Error ? error.message : "Unknown Error");
    }

}
