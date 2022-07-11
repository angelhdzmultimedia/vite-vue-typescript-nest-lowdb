import { User } from '../users/entities/user.entity';
import { createModel } from '../angeldb';

const UserSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

export const UserModel = createModel<User>('User', UserSchema);
