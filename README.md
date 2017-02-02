This is a training project.
It can be used as a template for angular2 app.
This app can work offline. The service workers are used to achieve  this feature.
Basic information about angular2 offline apps can be reached by next link.
https://coryrylan.com/blog/fast-offline-angular-apps-with-service-workers

To be able to fire this app you have to have live-server installed globally.
If you have not install it by 'npm install -g live-server'.

Execute next commands from app-root directory:
    - ng build –prod
    - npm run sw
    - npm run static-serve
to compile and run the offline app.

Also you can fire it just by execute 'ng serve' from app-root directory. In this 
case it will not has offline feature.

In both cases the app will be available on http://localhost:4200/
You can change port by 'ng serve --port <port_number>'

The app makes requests to a server to get user info, auth-tokens,  table content and other.
So the app works with node-restfull app. How to deal with it read its readme.

There is a probably convenient library that could be used to simplify take snapshot feature:
https://github.com/jhuckaby/webcamjs
 
--------------------------------------------------------------------------------

# OfflineMoz

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



To enable production mode and thus disable debugging information
import { enableProdMode } from '@angular/core';
enableProdMode();


To get a component instance execute
ng.probe($0).componentInstance
ng.probe($0)._debugInfo._view.changeDetectorRef.detectChanges()

{ //... 
    "compilerOptions": { 
        "sourceMap": true, 
    } 
    //... 
}
And then put 'debugger;' in any place you of your code to get a breakpoint.
