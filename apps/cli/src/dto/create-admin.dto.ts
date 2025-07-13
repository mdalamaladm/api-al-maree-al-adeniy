export class CreateAdminDto {
  username: string;
  password: string;
  salt: string;
  createdBy: string;
  updatedBy: string;
}