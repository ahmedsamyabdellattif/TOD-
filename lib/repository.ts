/** CMS boundary: replace these local reads with authenticated server-side CMS calls. */
import data from '@/content/editorial.json';
import clients from '@/content/clients.json';
import type { Insight, CaseStudy, TeamProfile } from './content';
export async function getInsights():Promise<Insight[]> { return (data.insights as Insight[]).filter(item=>item.approved); }
export async function getCaseStudies():Promise<CaseStudy[]> { return (data.caseStudies as CaseStudy[]).filter(item=>item.approved); }
export async function getTeamProfiles():Promise<TeamProfile[]> { return (data.teamProfiles as TeamProfile[]).filter(item=>item.approved); }
export async function getClientSlots() { return [...clients].sort((a,b)=>a.order-b.order); }
