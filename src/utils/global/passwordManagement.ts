import * as bcrypt from "bcryptjs";

class PasswordManagement {
  hash(password: string): string {
    return bcrypt.hashSync(password, 6);
  }
  compare(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
export default PasswordManagement;
