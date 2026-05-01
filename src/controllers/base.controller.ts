import { getLocalLeague } from "@/services/league.service";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function ok<T>(res: Response, data: T) {
  return res
    .status(StatusCodes.OK)
    .json(data);
}

export function created<T>(res: Response, data: T) {
  return res
    .status(StatusCodes.CREATED)
    .json(data);
}

export abstract class BaseController<TBriefData> {

  protected getId(req: Request): number {
    return +req.params.id;
  }

  protected getLeagueId(res: Response): number {
    return getLocalLeague(res).id;
  }

  protected abstract getBriefData(req: Request, res: Response): TBriefData;

}