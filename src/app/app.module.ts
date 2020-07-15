import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './cts/public/publicrouting/public.module';
import { HomeModule } from './cts/home/homerouting/home.module';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SharedroutingModule } from './cts/shared/sharedrouting/sharedrouting.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingHttpInterceptor, LoadingHttpInterceptorFactoryProvider } from './core/loading-http-interceptor/loading-http-interceptor.component';
import { BranchesComponent } from './cts/home/components/branches/branches.component';
import { AddBranchComponent } from './cts/home/components/branches/add-branch/add-branch.component';
import { AuditlogsComponent } from './cts/home/components/auditlogs/auditlogs.component';
import { AddAuditlogComponent } from './cts/home/components/auditlogs/add-auditlog/add-auditlog.component';

const LoadingHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: LoadingHttpInterceptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    SpinnerComponent,
    BranchesComponent,
    AddBranchComponent,
    AuditlogsComponent,
    AddAuditlogComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PublicModule,
    HomeModule,
    SharedroutingModule,
    AppRoutingModule

  ],
  providers: [
    LoadingHttpInterceptorProvider,
    LoadingHttpInterceptorFactoryProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
