import plannerMcp from './01-planner-mcp.js';
import calendarMcp from './02-calendar-mcp.js';
import codescan from './03-codescan.js';
import pipeline from './05-pipeline.js';
import clawpwn from './06-clawpwn.js';
import unityFoundation from './07-unity-foundation.js';
import kasif from './08-7kasif.js';
import babakcast from './09-babakcast.js';
import drpGen from './10-drp-gen.js';
import whisper from './11-whisper.js';
import browserToolsMcp from './12-browser-tools-mcp.js';
import rahimiTires from './01-rahimi-tires.js';
import nickAutoteknik from './02-nick-autoteknik.js';
import klinikVenus from './03-klinik-venus.js';

window.portfolioItems = [
  plannerMcp, calendarMcp, browserToolsMcp, pipeline, whisper,
  codescan, clawpwn, drpGen,
  unityFoundation, kasif,
  babakcast,
  rahimiTires, nickAutoteknik, klinikVenus
];

window.portfolioCategories = {
  all: { en: 'All', da: 'Alle' },
  ai: { en: 'AI & MCP', da: 'AI & MCP' },
  security: { en: 'Security', da: 'Sikkerhed' },
  web: { en: 'Web', da: 'Web' },
  mobile: { en: 'Mobile', da: 'Mobil' },
  client: { en: 'Client Work', da: 'Kundearbejde' }
};
