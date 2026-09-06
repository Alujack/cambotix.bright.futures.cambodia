import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CMS_ENABLED } from '../lib/cms/flags';
import './admin.css';
export const metadata:Metadata={title:'Website admin',robots:{index:false,follow:false}};
export default function AdminLayout({children}:{children:React.ReactNode}) {if(!CMS_ENABLED)notFound();return <div className="admin">{children}</div>;}
