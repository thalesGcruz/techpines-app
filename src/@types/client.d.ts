export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document?: string | null;
  companyName?: string | null;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
