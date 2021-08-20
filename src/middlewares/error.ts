import { Request, Response, NextFunction } from "express"

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: 'Something went wrong...'})
}