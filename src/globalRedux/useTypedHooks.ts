// /store/useTypedHooks.ts
import {
  useSelector as useSelectorA,
  useDispatch as useDispatchA,
  TypedUseSelectorHook,
} from 'react-redux';
import type { GenxRootStoreType as GenRootStoreX  , GenxDispatchType as DispatchGenX } from '../stores/genx/redux/store'

import {
  useSelector as useSelectorB,
  useDispatch as useDispatchB,
} from 'react-redux';
import { useStoreId } from '../globalContext/hooks';
// import type { RootState as RootB, AppDispatch as DispatchB } from '../stores/storeB/store';


export const useAppDispatch = (): DispatchGenX => {
  const storeId = useStoreId();
  // return storeId === 'genx' ? useDispatchA<DispatchGenX>() : useDispatchB<DispatchB>();
  return useDispatchA<DispatchGenX>()
};

export const useAppSelector = <TSelected>(
  selector: (state: GenRootStoreX ) => TSelected
): TSelected => {
  const storeId = useStoreId();
  const typedSelectorA: TypedUseSelectorHook<GenRootStoreX> = useSelectorA;
  // const typedSelectorB: TypedUseSelectorHook<RootB> = useSelectorB;

  return typedSelectorA(selector as any)
  // return storeId === 'genx'
  //   ? typedSelectorA(selector as any)
  //   : typedSelectorB(selector as any);
};
