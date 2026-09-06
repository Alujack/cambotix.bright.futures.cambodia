'use client';
import { useActionState } from 'react';
import type { ActionState } from './actions';
export default function Form({action,children,submit='Save changes'}:{action:(state:ActionState,form:FormData)=>Promise<ActionState>;children:React.ReactNode;submit?:string}) {
 const [state,formAction,pending]=useActionState(action,{});
 return <form action={formAction} className="field-grid">
 {children}
 {state.error&&<p role="alert" className="notice error">{state.error}</p>}
 {state.success&&<p role="status" className="notice">{state.success}</p>}
 <div><button disabled={pending}>{pending?'Please wait…':submit}</button></div>
 </form>;
}
