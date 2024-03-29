import { Item } from "./order.model";
import { UserModel } from "./user.model";

export interface OrderModel {
  id:         string;
  items:      Item[];
  totalPrice: number;
  state:      'pending' | 'confirmed' | 'completed' | 'cancelled';
  created:    string;
  user:       UserModel | undefined;
}

export interface RemoteOrderModel extends OrderModel {
  deliveryAddress: string
}
