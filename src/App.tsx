import { useEffect, useState } from 'react';
import { useLenis } from './lib/useLenis';
import { Grain } from './components/Grain';
import { Cursor } from './components/Cursor';
import { Preloader } from './components/Preloader';
import { ArtBackground } from './components/ArtBackground';
import { ModuleDock, type RouteKey } from './components/ModuleDock';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { HonorsPage } from './pages/HonorsPage';
import { RecruitPage } from './pages/RecruitPage';

const routes: Record<RouteKey, () => React.JSX.Element> = { home:HomePage, about:AboutPage, activities:ActivitiesPage, honors:HonorsPage, recruit:RecruitPage };
const readRoute=():RouteKey=>{const key=location.hash.replace(/^#\/?/,'') as RouteKey;return key in routes?key:'home'};
export default function App(){useLenis();const[route,setRoute]=useState<RouteKey>('home');useEffect(()=>{history.replaceState(null,'','#/home');const update=()=>{setRoute(readRoute());scrollTo({top:0,behavior:'instant'})};addEventListener('hashchange',update);return()=>removeEventListener('hashchange',update)},[]);const Page=routes[route];return <><a className="skip-link" href="#page-main">跳到主要内容</a><Preloader/><ArtBackground/><Grain/><Cursor/><ModuleDock route={route}/><main id="page-main" className="page-stage" key={route}><Page/></main></>}
