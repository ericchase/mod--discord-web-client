import { Processor_TypeScript_UserscriptBundler } from './lib-browser-userscript/processors/TypeScript-UserscriptBundler.js';
import { Builder } from './lib/Builder.js';
import { Processor_BasicWriter } from './lib/processors/FS-BasicWriter.js';
import { Processor_HTML_CustomComponent } from './lib/processors/HTML-CustomComponent.js';
import { Processor_HTML_ImportConverter } from './lib/processors/HTML-ImportConverter.js';
import { Processor_TypeScript_GenericBundlerImportRemapper } from './lib/processors/TypeScript-GenericBundler-ImportRemapper.js';
import { pattern, Processor_TypeScript_GenericBundler } from './lib/processors/TypeScript-GenericBundler.js';
import { Step_Bun_Run } from './lib/steps/Bun-Run.js';
// import { DEVSERVERHOST, Step_DevServer } from './lib/steps/Dev-Server.js';
import { Step_CleanDirectory } from './lib/steps/FS-CleanDirectory.js';
import { Step_Format } from './lib/steps/FS-Format.js';

const builder = new Builder(Bun.argv[2] === '--watch' ? 'watch' : 'build');

builder.setStartUpSteps(
  Step_Bun_Run({ cmd: ['bun', 'install'] }, 'quiet'),
  Step_CleanDirectory(builder.dir.out),
  Step_Format('quiet'),
  //
);

builder.setBeforeProcessingSteps();

builder.setProcessorModules(
  Processor_HTML_CustomComponent(),
  Processor_HTML_ImportConverter(),
  // Processor_TypeScript_UserscriptBundler({ define: () => ({ 'process.env.DEVSERVERHOST': JSON.stringify(DEVSERVERHOST) }) }),
  // Processor_TypeScript_GenericBundler({ define: () => ({ 'process.env.DEVSERVERHOST': JSON.stringify(DEVSERVERHOST) }) }),
  Processor_TypeScript_UserscriptBundler({}),
  Processor_TypeScript_GenericBundler({}),
  Processor_TypeScript_GenericBundlerImportRemapper(),
  Processor_BasicWriter([`**/*${pattern.moduleoriife}`, `**/*{.user}${pattern.tstsxjsjsx}`], []),
  //
);

builder.setAfterProcessingSteps(
  // Step_DevServer(),
  //
);

builder.setCleanUpSteps();

await builder.start();
