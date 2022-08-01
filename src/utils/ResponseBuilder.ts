import { Response } from "express";

export class ResponseBuilder {
  public static successResponse(res: Response, data: object, status = 200) {
    return res.status(status).json({
      errors: null,
      success: true,
      data,
    });
  }
}
