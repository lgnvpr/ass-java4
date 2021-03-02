import { createModel } from "@rematch/core";
import { createNewModel } from "./Type";

export interface ActionLoadingTop {
  showLoad:()=>void
  hiddenLoad:()=> void
}

export const loadingTop = createNewModel<boolean , ActionLoadingTop>({
  state: false,
  reducers: {
    update(state: any, data: boolean = false) {
      return data
      // return state;
    },
  },
  effects: (dispatch) => ({
    showLoad() {
      const loading: boolean = true;
      dispatch.loadingTop.update(loading)
    },
    hiddenLoad() {
      const loading: boolean = false;
      dispatch.loadingTop.update(loading)

    }

  }),
});
