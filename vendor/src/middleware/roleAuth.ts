// import { BadRequestError } from '@snackopedia/common';
// import { Request, Response, NextFunction } from 'express';
// import { currentUser} from "@snackopedia/common"; 

// interface AuthenticatedRequest extends Request {
//   user?: {
//     role: string;
//   };
// }

// function roleAuth(req: Request, res: Response, next: NextFunction) {
//   if (req.currentUser != 'admin') {
//     throw new BadRequestError('Invalid Credentials')
//   }

//   const allowedRoles = ['admin', 'user'];

//   if (!allowedRoles.includes(req.user.role)) {
//     return res.status(403).json({ error: 'Forbidden' });
//   }

//   next();
// }

// export default roleAuth;