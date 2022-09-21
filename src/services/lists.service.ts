import firestore from '@react-native-firebase/firestore';
import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['ShoppingList'],
  endpoints: build => ({
    getUserLists: build.query({
      async queryFn(uid) {
        try {
          const res = await firestore()
            .collection('shopping-lists')
            .where('users', 'array-contains', uid)
            .get();

          const data: IList[] = res.docs.map(snapshot => ({
            ...(snapshot.data() as IList),
            id: snapshot.id,
          }));

          return {data};
        } catch (e) {
          return {error: e};
        }
      },
      providesTags: ['ShoppingList'],
    }),
    addList: build.mutation<IList, Omit<IList, 'id'>>({
      async queryFn(listData) {
        try {
          const docRef = await firestore()
            .collection('shopping-lists')
            .add(listData);

          return {
            data: {
              id: docRef.id,
              ...listData,
            } as IList,
          };
        } catch (e) {
          return {error: e};
        }
      },
      invalidatesTags: ['ShoppingList'],
    }),
  }),
});

export const {useGetUserListsQuery, useAddListMutation} = api;

export default api;
