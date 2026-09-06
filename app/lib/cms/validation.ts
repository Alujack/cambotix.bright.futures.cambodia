import { z } from 'zod';
import { defaults, type Section } from './defaults';
export const localMedia = z.string().max(500).refine(v=>v === '' || (/^\/(?!\/)/.test(v) && !/[\\\s\x00-\x1f]/.test(v)), 'Use a local /images/... or uploaded /media/... URL.');
export const safeLink = z.string().max(1000).refine(v => /^(\/(?!\/)|#[a-zA-Z0-9_-]*$|https:\/\/[^/]|mailto:)/.test(v) && !/[\\\x00-\x20]/.test(v), 'Use a local path, #anchor, https:// link, or mailto: email link.');
const text = z.string().max(20000);
const slug = z.string().min(1).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and single hyphens.');
const reserved = new Set(['admin','api','articles','about','projects','impact','volunteers','contact','media','_next','images','videos','favicon','robots','sitemap']);
export const postSchema=z.object({
 id: z.union([z.literal('new'),z.uuid()]), revision:z.coerce.number().int().min(0),
 kind:z.enum(['article','page']),slug,title:z.string().trim().min(1).max(200),excerpt:text,
 body:z.string().trim().min(1,'Write some content before saving.').max(100000),image:localMedia,image_alt:z.string().max(300),
 status:z.enum(['draft','published']),placement:z.enum(['','home','about','projects','impact','volunteers','contact']),show_in_nav:z.boolean(),
}).superRefine((v,ctx)=>{
 if(v.kind==='page' && reserved.has(v.slug))ctx.addIssue({code:'custom',path:['slug'],message:'This URL is reserved for an existing website page.'});
 if(v.image && !v.image_alt.trim())ctx.addIssue({code:'custom',path:['image_alt'],message:'Describe the image for accessibility.'});
});
function shape(value: unknown, key=''): z.ZodType {
 if(typeof value==='string')return ['image','src','poster'].includes(key)?localMedia:text;
 if(typeof value==='number')return z.number().finite().min(0).max(100000000);
 if(Array.isArray(value))return z.array(value.length?shape(value[0]):text).max(200);
 if(value && typeof value==='object')return z.object(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,shape(v,k)]))).strict();
 return z.never();
}
const projectShape=shape(defaults.projects[0]) as z.ZodObject;
const projectSchema=projectShape.extend({slug, image:localMedia.optional(),imageAlt:text.optional(),emoji:text.optional(),feedingBudget:shape(defaults.projects[0].feedingBudget).optional()});
const activitySchema=z.object({id:slug,kind:z.enum(['photo','video']),category:text,title:z.string().min(1).max(300),description:text,src:localMedia.refine(Boolean,'Choose media.'),poster:localMedia.optional(),alt:text});
export function validateSection(section: Section, input: unknown) {
 let schema:z.ZodType;
 if(section==='projects')schema=z.array(projectSchema).max(100);
 else if(section==='activities')schema=z.array(activitySchema).max(200);
 else if(section==='heroSlides')schema=z.array(z.object({image:localMedia.refine(Boolean,'Choose an image.'),alt:text})).min(1,'Keep at least one slide.').max(100);
 else if(section==='copy')schema=z.object(Object.fromEntries(Object.entries(defaults.copy).map(([group,fields])=>[group,z.object(Object.fromEntries(Object.keys(fields).map(key=>[key,key.includes('href:')?safeLink:key.includes('src:')?localMedia.refine(Boolean):text]))).strict()]))).strict();
 else schema=shape(defaults[section]);
 const parsed=schema.parse(input);
 if(['projects','activities','impactUpdates'].includes(section)){
  const field=section==='projects'?'slug':'id';
  const keys=(parsed as Record<string,string>[]).map(item=>item[field]);
  if(new Set(keys).size!==keys.length)throw new Error(`Every ${field} must be unique.`);
 }
 return parsed;
}
export function errorMessage(error:unknown) {
 if(error instanceof z.ZodError)return error.issues.map(i=>`${i.path.join(' → ')}: ${i.message}`).slice(0,3).join('\n');
 return error instanceof Error?error.message:'Unable to save. Please try again.';
}
