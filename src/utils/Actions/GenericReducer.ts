import { AnyAction } from "redux";

export type Matchable<AC extends () => AnyAction>= AC & {
    type: ReturnType<AC>["type"];
    match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => AnyAction & {type:string}> (actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args:any[]) => AnyAction & {type:string}> (actionCreator:AC): Matchable<AC>;

export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator,{
        type,
        match(action:AnyAction){
            return action.type === type;
        }
    })
}

export interface IActionWithPayload<T,P> {
    type: T,
    payload: P,
}

export interface IAction<T> {
    type:T
}

export function createAction<T extends string>(type:T,payload:void): IAction<T>;

export function createAction<T extends string,P>(type: T, payload:P): IActionWithPayload<T,P>{
    return {type,payload};
}

/* export const createAction = (type,payload) => ({type,payload});
 */
