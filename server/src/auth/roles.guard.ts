import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const userProfile = request.headers['x-user-profile'];

        if (!userProfile) {
            throw new UnauthorizedException({
                uuAppErrorMap: {
                    "todo-firstweek/auth/unauthorized": {
                        type: "error",
                        message: "Authentication failed. Missing 'x-user-profile' header."
                    }
                }
            });
        }

        if (userProfile !== 'Owner' && userProfile !== 'Member') {
            throw new ForbiddenException({
                uuAppErrorMap: {
                    "todo-firstweek/auth/forbidden": {
                        type: "error",
                        message: `Profile '${userProfile}' is not recognized.`
                    }
                }
            });
        }

        return true;
    }
}