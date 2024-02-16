import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, RootDispatch } from "@/store";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => RootDispatch = useDispatch;
