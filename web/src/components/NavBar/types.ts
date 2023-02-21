export interface LinkDetail {
  title: string;
  to: string;
  key: string;
}

export interface ActiveColor {
  bg: string;
  text: string;
}

export interface INavBar {
  isRound2Sides?: boolean;
  activeColor?: ActiveColor;
  links: LinkDetail[];
  row?: boolean;
  childClass?: string;
}
