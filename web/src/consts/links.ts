import { v4 as uuid } from 'uuid';

export const navLinks = [
  { title: 'Sổ Thu', to: '/income', key: uuid() },
  { title: 'Sổ Chi', to: '/spending', key: uuid() },
  { title: 'Thống Kê', to: '/report', key: uuid() },
];
