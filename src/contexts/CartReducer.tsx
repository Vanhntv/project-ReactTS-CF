export type QuantityAction = { type: "INCREASE" } | { type: "DECREASE" };

export const quantityReducer = (state: number, action: QuantityAction) => {
  switch (action.type) {
    case "INCREASE":
      return Math.min(state + 1, 99);

    case "DECREASE":
      return Math.max(state - 1, 1);

    default:
      return state;
  }
};
