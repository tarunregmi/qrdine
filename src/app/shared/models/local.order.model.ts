import { TableModel } from "./table.model";
import { UserModel } from "./user.model";

export interface LocalOrderModel {
  id: string;
  items: Item[];
  total: number;
  table: TableModel;
  state: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created: string;
  user: UserModel | undefined;
}

export interface Item {
  id: string,
  title: string;
  veg: boolean;
  price: number;
  quantity: number;
}
