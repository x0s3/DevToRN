import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

type ActionCreator = (...args: any) => any;

export function useReduxAction<AC extends ActionCreator>(actionCreator: AC) {
  const dispatch = useDispatch();

  return (
    ...args: AC extends ((...args: infer Args) => any) ? Args : any[]
  ) => {
    dispatch(actionCreator(...(args as any[])));
  };
}

type Result<S> = S extends (...args: any[]) => infer R ? R : any;

export function useReduxState<
  S extends (state: RootState) => any,
  R extends Result<S>
>(selector: S, equalityFn?: (left: R, right: R) => boolean) {
  return useSelector(selector, equalityFn) as R;
}
