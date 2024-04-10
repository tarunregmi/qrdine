import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const login_ = inject(LoginService);

  if (login_.validateAdmin()) {
    return true
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
};
