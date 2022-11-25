import { Response } from 'express';
export default abstract class BaseException extends Error {
	public message: string;
	constructor(message: string, public status: number, public code?: string) {
		super(message);
		this.message = message;
	}

	public async handle(res: Response) {
		return res.status(this.status).json({
			success: false,
			message: this.message,
			code: this.code,
		});
	}
}
