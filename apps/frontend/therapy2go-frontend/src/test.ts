import 'zone.js'; // Required for Angular
import 'zone.js/testing'; // Required for Angular testing
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Dynamically load all `.spec.ts` files
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
