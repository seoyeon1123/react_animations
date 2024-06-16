export type Breakpoints = 'small' | 'medium' | 'large';

export const breakpoints: Record<Breakpoints, string> = {
  small: '@media (max-width: 639px)',
  medium: '@media (max-width: 1047px)',
  large: '@media (min-width: 1048px)',
};
