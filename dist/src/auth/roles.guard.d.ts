import { Reflector } from '@nestjs/core';
export declare class RolesGuard {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: import('@nestjs/common').ExecutionContext): boolean;
}
