import { ISidebarItems } from './sidebar-item.interface';

export interface ISidebarGroup {
  title: string;
  items: ISidebarItems[];
}
