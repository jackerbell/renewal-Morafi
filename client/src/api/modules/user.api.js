import privateClient from '../client/private.client.js';
import publicClient from '../client/public.client.js';

const userEndPoints = {
  signin: 'user/signin',
  signup: 'user/signup',
  getInfo: 'user/info',
  passwordUpdate: 'user/update-password',
};

const userApi = {
  signin: async ({username,password}) => {
    try {
      const response = await publicClient.post(
        userEndPoints.signin,
        {username,password}
      );

      return { response };
    } catch (error) {
      return error;
    }
  },
  signup: async ({username,password,confirmPassword,displayName}) => {
    try {
      const response = await publicClient.post(
        userEndPoints.signup,
        {username,password,confirmPassword,displayName}
      );

      return { response };
    } catch (error) {
      return error;
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndPoints.getInfo);

      return { response };
    } catch (error) {
      return error;
    }
  },
  passwordUpdate: async ({password,newPassword,confirmNewPassword}) => {
    try {
      const response = await privateClient.put(
        userEndPoints.signup,
        {password,newPassword,confirmNewPassword}
      );

      return { response };
    } catch (error) {
      return error;
    }
  },
}

export default userApi