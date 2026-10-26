import { useLenis } from './lib/useLenis';
import { Grain } from './components/Grain';
import { Nav } from './components/Nav';
import { Cursor } from './components/Cursor';
import { Preloader } from './components/Preloader';
import { ArtBackground } from './components/ArtBackground';
import { Hero } from './sections/01-Hero';
import { Who } from './sections/02-Who';
import { Stats } from './sections/03-Stats';
import { Honors } from './sections/04-Honors';
import { Gains } from './sections/05-Gains';
import { Process } from './sections/06-Process';
import { Tracks } from './sections/07-Tracks';
import { AIRules } from './sections/08-AIRules';
import { Scoring } from './sections/09-Scoring';
import { Apply } from './sections/10-Apply';
import { Footer } from './sections/11-Footer';

export default function App(){useLenis();return <><a className="skip-link" href="#main">跳到主要内容</a><Preloader/><ArtBackground/><Nav/><Grain/><Cursor/><main id="main"><Hero/><Who/><Stats/><Honors/><Gains/><Process/><Tracks/><AIRules/><Scoring/><Apply/></main><Footer/></>}
