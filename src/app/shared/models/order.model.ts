import { MenuItem } from "./menu.model";

export interface OrderModel {
  id: string;
  date: string;
  items: MenuItem[];
  table: string;
  state: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}