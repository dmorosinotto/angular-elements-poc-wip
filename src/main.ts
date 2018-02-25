
import './polyfills';

import {CompilerFactory, NgModuleFactory, Type, destroyPlatform} from '@angular/core';
import {registerAsCustomElements} from './@angular/elements';
import {platformBrowser} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule, entryComponents} from './app/app.module';
import {doStuff} from './do-stuff';

// Run
destroyPlatform();


// Tweak the value to use one of two signatures.
const doRegister = true ?
  () => {
    const moduleFactory = getModuleFactory<AppModule>(AppModule);
    const platformRef = platformBrowser();
    return registerAsCustomElements(entryComponents, platformRef, moduleFactory);
  } :
  () => {
    const bootstrapFn = () => platformBrowserDynamic().bootstrapModule(AppModule);
    return registerAsCustomElements(entryComponents, bootstrapFn);
  };

doRegister().then(doStuff).catch(onError);

// Helpers
function getModuleFactory<T>(moduleType: Type<T>): NgModuleFactory<T> {
  const platformRef = platformBrowserDynamic();
  const compilerFactory = platformRef.injector.get(CompilerFactory) as CompilerFactory;
  const compiler = compilerFactory.createCompiler([]);

  platformRef.destroy();

  return compiler.compileModuleSync(moduleType);
}

function onError(err) {
  console.error(err);

  const redefineError =
    'Failed to execute \'define\' on \'CustomElementRegistry\': ' +
    'this name has already been used with this registry';

  if (err.message === redefineError) {
    console.log('Reloading to clear CustomElementRegistry...');
    window.location.reload();
  }
}
