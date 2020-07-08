import { probability } from "./probability";

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action: any) => probability(store)(next)(action);

  return { store, next, invoke };
};

it("when invoke LOADING action expect next called with action", () => {
  const { next, invoke } = create();
  const action = { type: "LOADING", isLoading: true };
  invoke(action);
  expect(next).toHaveBeenCalledWith(action);
});

it("when invoke ANALYTICS_CLICK action expect next called with action", () => {
  const { next, invoke } = create();
  const action = { type: "ANALYTICS_CLICK", probability: 0.5 };
  invoke(action);
  expect(next).toHaveBeenCalledWith(action);
});
