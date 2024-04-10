export interface UserModel {
  id:           string;
  name:         string;
  phone?:        string;
  email:        string;
  username:     string;
  avatar:       string;
  collectionId: string;
  verified:     boolean;
}
