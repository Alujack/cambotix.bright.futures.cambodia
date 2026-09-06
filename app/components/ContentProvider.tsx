'use client';
import { createContext, useContext } from 'react';
import type { SiteContent } from '../lib/cms/defaults';
const ContentContext = createContext<SiteContent | null>(null);
export default function ContentProvider({ content, children }: { content: SiteContent; children: React.ReactNode }) {
 return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
export function useSiteContent() {
 const content = useContext(ContentContext);
 if (!content) throw new Error('Missing site content provider');
 return content;
}
