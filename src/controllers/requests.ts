import axios from 'axios';
import { Request, Response } from 'express';

import IRequest from '../models/IRequest';
import IResponse from '../models/IResponse';
 
const db: any = [];
 
const processRequests = async (req: Request, res: Response) => {
    const { commands }: { commands: [IRequest] } = req.body;
    let requests: any = [];
    let tempReqs = [];

    commands.forEach((cmd: IRequest) => {
        let url;
 
        cmd.params.forEach((params: any) => {
            let _params = '';
            const keys = Object.keys(params);

            keys.forEach((key, index) => {
                _params += index < keys.length - 1 ? `${params[key]}/` : `${params[key]}`;
            });

            const tempURL = cmd.url.split("/");
            tempURL[tempURL.length - 1] = _params;

            url = tempURL.join("/");

            requests.push({ url, method: cmd.verb });
        });
    });

    const interval = setInterval(async () => {
        tempReqs = requests.splice(0, 10)
                    .map((req: any) => axios.request({url: req.url, method: req.method}));

        try {
            const result: any = await Promise.allSettled(tempReqs);

            result.forEach((_res: any) => {
                if (_res.status === 'fulfilled') {
                    const reqResult: IResponse = {
                        requestURL: _res.value.config.url,
                        statusCode: _res.value.status,
                        status: 'Success'
                    }

                    db.push(reqResult);
                } else if (_res.status === 'rejected') {
                    const reqResult: IResponse = {
                        requestURL: _res.reason.config.url,
                        statusCode: _res.reason.response.status,
                        status: 'Failed'
                    }
                    
                    db.push(reqResult);
                }
            });

            if (!requests.length)
                res.status(200).send();
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Something went wrong...'});
        }

        if (!requests.length) {
            clearInterval(interval);
        }
    }, 1000*60);
}

const getRequests = (req: Request, res: Response) => {
    res.status(200).json(db);
}
 
export {
    processRequests,
    getRequests
}