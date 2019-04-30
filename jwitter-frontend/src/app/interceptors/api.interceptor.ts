import { Injectable } from '@angular/core';
import {  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class APIInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = localStorage.getItem('token');
        if(token) {
            req = req.clone({
                headers : req.headers.set('Authorization','Bearer ' + token)
            })
        }

        if(req.method === 'POST'){
            req = req.clone({
                headers : req.headers.set('Content-Type', 'application/json')
            });
        }
        
        return next.handle(req);            
        
    }
}