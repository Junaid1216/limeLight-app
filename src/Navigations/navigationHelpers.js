const APP_STACK_ROUTE_NAMES = new Set([
  'TargetAssignment',
  'BranchTargets',
  'BranchStaffComparison',
  'StaffComparison',
  'Announcement',
  'AnnouncementDetail',
  'Profile',
  'ChangePassword',
  'SurveyProgress',
  'SurveyResponse',
]);

export const navigateToProfile = navigation => {
  if (!navigation) {
    return;
  }

  let nav = navigation;

  while (nav) {
    const routeNames = nav.getState()?.routeNames ?? [];

    if (routeNames.includes('Profile')) {
      nav.navigate('Profile');
      return;
    }

    nav = nav.getParent();
  }
};

export const navigateToNotification = navigation => {
  if (!navigation) {
    return;
  }

  let nav = navigation;

  while (nav) {
    const routeNames = nav.getState()?.routeNames ?? [];

    if (routeNames.includes('Notification')) {
      nav.navigate('Notification');
      return;
    }

    if (routeNames.includes('BottomNavigation')) {
      const isAppStack = routeNames.some(name => APP_STACK_ROUTE_NAMES.has(name));

      if (isAppStack) {
        nav.navigate('BottomNavigation', {
          screen: 'BottomNavigation',
          params: { screen: 'Notification' },
        });
      } else {
        nav.navigate('BottomNavigation', { screen: 'Notification' });
      }
      return;
    }

    nav = nav.getParent();
  }
};
