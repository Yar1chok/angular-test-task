import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import {
  provideHttpClient,
  withInterceptors,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const apiInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const cloned = req.clone({
    setHeaders: {
      'x-api-key': 'reqres-free-v1',
    },
  });
  return next(cloned);
};

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideEventPlugins(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([apiInterceptorFn])),
  ],
}).catch((err) => console.error(err));
