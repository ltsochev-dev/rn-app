import firestore from '@react-native-firebase/firestore';
import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api/categories',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Categories'],
  endpoints: build => ({
    getCategories: build.query<ICategory[], void>({
      async queryFn() {
        try {
          const res = await firestore().collection('product-categories').get();

          const data: ICategory[] = res.docs.map(snapshot => ({
            id: snapshot.id,
            ...(snapshot.data() as ICategory),
          }));

          return {data};
        } catch (e) {
          return {error: e};
        }
      },
      providesTags: ['Categories'],
    }),
    addCategory: build.mutation<ICategory, Pick<ICategory, 'name'>>({
      async queryFn(category) {
        try {
          const docRef = await firestore()
            .collection('product-categories')
            .add({
              ...category,
            });

          const data: ICategory = {
            id: docRef.id,
            ...category,
          };

          return {data};
        } catch (e) {
          return {error: e};
        }
      },
      invalidatesTags: ['Categories'],
    }),
    updateCategory: build.mutation<ICategory, Pick<ICategory, 'id' | 'name'>>({
      async queryFn(category) {
        try {
          await firestore()
            .collection('product-categories')
            .doc(category.id)
            .set({...category}, {merge: true});

          const data: ICategory = {
            ...category,
          };

          return {data};
        } catch (e) {
          return {error: e};
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useAddCategoryMutation,
} = api;

export default api;
