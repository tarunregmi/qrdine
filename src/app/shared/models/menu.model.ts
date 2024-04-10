export interface MenuItem {
  id:            string;
  title:         string;
  description:   string;
  veg:           boolean;
  price:         number;
  thumbnail:     string;
  collectionId?: string;
  quantity?:     number;
}
