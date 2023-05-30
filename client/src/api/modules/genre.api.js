import publicClient from "../client/public.client";

const genreEndPoints = {
  list: ({mediaType}) => `${mediaType}/genres`
}

const genreApi = {
  getList: async ({mediaType}) => {
    try {
      const response = await publicClient.get(genreEndPoints.list({mediaType}));

      return { response };
    } catch (error) {
      return { error };
    }
  }
}

export default genreApi;