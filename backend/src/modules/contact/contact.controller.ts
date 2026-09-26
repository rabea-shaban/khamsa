import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/async-handler';
import { ApiResponse } from '../../utils/api-response';
import { contactService } from './contact.service';

export const sendContactMessageController = asyncHandler(async (req: Request, res: Response) => {
  const result = await contactService.sendContactMessage(req.body);
  return ApiResponse.success(res, result, result.message, 200);
});
