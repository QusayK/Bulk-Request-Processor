import { Request, Response, NextFunction } from "express";

export default (handler: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await handler(req, res)
        } catch (ex) {
            next(ex)
        }
    }
}