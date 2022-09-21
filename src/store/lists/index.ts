import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IListAction {
  name: string;
  list: ShoppingList;
}

export interface IListMap {
  [key: string]: ShoppingList;
}

const initialState = {
  lists: {} as IListMap,
  activeList: '' as string,
} as const;

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setActiveList(state, action: PayloadAction<string>) {
      if (action.payload.length > 0) {
        state.activeList = action.payload;
      }
    },
    clearActiveList(state) {
      state.activeList = '';
    },
    setList(state, action: PayloadAction<IListAction>) {
      if (
        Object.prototype.hasOwnProperty.call(state.lists, action.payload.name)
      ) {
        let lists = {...state.lists};
        lists[action.payload.name] = action.payload.list;

        state.lists = {...lists};
      }
    },
    removeList(state, action: PayloadAction<string>) {
      delete state.lists[action.payload];
    },
    clearList(state) {
      state.lists = {} as IListMap;
    },
  },
});

export const {setActiveList, setList, removeList, clearList} =
  listsSlice.actions;

export default listsSlice.reducer;
