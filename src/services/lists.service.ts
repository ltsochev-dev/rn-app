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
    removeList: build.mutation<void, string>({
      async queryFn(id) {
        try {
          const docRef = await firestore()
            .collection('shopping-lists')
            .doc(id)
            .get();

          if (!docRef.exists) {
            throw new Error(`Document "${id}" doesn't exist`);
          }
          if (docRef.exists) {
          }
          return {
            data: await firestore()
              .collection('shopping-lists')
              .doc(id)
              .delete(),
          };
        } catch (e) {
          return {error: e};
        }
      },
      invalidatesTags: ['ShoppingList'],
    }),
  }),
});

export const {useGetUserListsQuery, useAddListMutation, useRemoveListMutation} =
  api;

export default api;
