export type SidebarRoute = {
  title: string;
  emoji: string;
  subroutes: {
    title: string;
    href: string;
  }[];
};

export const routes: SidebarRoute[] = [
  {
    title: 'Upper Body',
    emoji: '💪',
    subroutes: [
      {
        title: 'Arms',
        href: '/upper-body/arms',
      },
      {
        title: 'Core',
        href: '/upper-body/core',
      },
    ],
  },
  {
    title: 'Lower Body',
    emoji: '🦵',
    subroutes: [
      {
        title: 'Hamstrings',
        href: '/lower-body/hamstrings',
      },
      {
        title: 'Knees',
        href: '/lower-body/knees',
      },
      {
        title: 'Calves',
        href: '/lower-body/calves',
      },
      {
        title: 'Feet/Ankles',
        href: '/lower-body/feet-ankles',
      },
    ],
  },
  {
    title: 'Cardio',
    emoji: '🏃‍♂️',
    subroutes: [
      {
        title: 'Sports',
        href: '/cardio/sports',
      },
      {
        title: 'Running',
        href: '/cardio/running',
      },
      {
        title: 'Walking',
        href: '/cardio/walking',
      },
      {
        title: 'Cycling',
        href: '/cardio/cycling',
      },
    ],
  },
];
