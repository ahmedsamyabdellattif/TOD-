import type { MetadataRoute } from 'next';
import { routes } from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap {return routes.map(path=>({url:`${process.env.SITE_URL||'https://todarabia.com'}/en${path?'/'+path:''}`}));}
