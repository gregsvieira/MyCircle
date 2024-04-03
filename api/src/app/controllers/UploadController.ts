import { Request, Response } from 'express';

class UploadController {
  async execute(request: Request, response: Response) {
    try {
      if (!request.file) return response.status(400).json({error: true, messsage: 'File is missing', success: false});

    } catch (error) {
      console.log('error', error);
      return response.json({ error: true }).status(400);
    }
  }
}

export default new UploadController();
