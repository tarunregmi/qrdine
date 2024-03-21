import { CanDeactivateFn } from '@angular/router';

export const cartGuard: CanDeactivateFn<boolean> = (component, currentRoute, currentState, nextState) => {
  if (localStorage.getItem('bookedTable')) {
    // eslint-disable-next-line no-debugger
    // debugger;
    const conformation = confirm('You have pending bookings, your table booking is cancelled if you quit without making order.\n\nAre you sure you want to leave?');

    if (conformation) return true;
    else return false;
  }
  return true;
};
