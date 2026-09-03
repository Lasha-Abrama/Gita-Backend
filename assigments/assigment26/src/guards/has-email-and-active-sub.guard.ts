import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const emailHeader = request.headers.email;
    const email = Array.isArray(emailHeader) ? emailHeader[0] : emailHeader;

    if (!email) {
      request.hasActiveSubscription = false;
      return true;
    }

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      request.hasActiveSubscription = false;
      return true;
    }

    request.hasActiveSubscription =
      new Date(user.subscriptionEndDate) > new Date();

    return true;
  }
}
