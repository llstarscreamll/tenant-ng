/* tslint:disable:no-unused-variable */
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { THEME } from 'app/themes';
import { CoreModule } from './../../core/core.module';
import { DynamicFormModule } from './../../dynamic-form/dynamic-form.module';
import * as fromRoot from './../../reducers';
import { AuthGuard } from './../../auth/guards/auth.guard';
import { AuthService } from './../../auth/services/auth.service';

import { Tenant } from './../models/tenant';
import { EFFECTS } from './../effects/';
import { SERVICES } from './../services';

/**
 * Tenant Test Utils.
 *
 * @author  [name] <[<email address>]>
 */

export let translateKey: string = 'TENANT.';
export let tableColumns = [
  'tenants.id',
  'tenants.name',
  'tenants.driver',
  'tenants.host',
  'tenants.port',
  'tenants.database',
  'tenants.username',
  'tenants.password',
  'tenants.prefix',
  'tenants.meta',
  'tenants.created_at',
  'tenants.updated_at',
  'tenants.deleted_at',
];

// Testing Models
export let TenantOne: Tenant = {"id":"a1","name":"Nihil mollitia totam ut velit.","driver":"mysql","host":"10.155.60.165","port":"4249","database":"vitae","username":"numquam","password":"facilis","prefix":"dicta","meta":"Autem odit consectetur qui magnam. Aperiam ut ea voluptatem dolorem corporis tenetur.","created_at":"1999-08-16 21:02:18","updated_at":"1974-04-12 09:41:36","deleted_at":null};
export let TenantTwo: Tenant = {"id":"b2","name":"Qui unde excepturi adipisci.","driver":"mysql","host":"10.45.178.186","port":"859","database":"enim","username":"ut","password":"commodi","prefix":"molestias","meta":"Temporibus architecto voluptate deserunt id illo. Eos tempora dolorem eum eius cumque dolores vitae. Recusandae vero sequi eaque ipsam qui.","created_at":"2014-12-10 10:29:53","updated_at":"1992-02-04 17:51:33","deleted_at":null};
export let TenantList: Tenant[] = [
	TenantOne,
	TenantTwo,
];

export const FORM_MODEL = [{"name":"id","type":"text","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":true,"visibility":{"create":false,"details":true,"edit":false,"search":true}},{"name":"name","type":"text","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"driver","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"host","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"port","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"database","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"username","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"password","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"prefix","type":"text","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"meta","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true}},{"name":"created_at","type":"datetime-local","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":false,"details":true,"edit":false,"search":true},"validation":["date:Y-m-d H:i:s"]},{"name":"updated_at","type":"datetime-local","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":false,"details":true,"edit":false,"search":true},"validation":["date:Y-m-d H:i:s"]},{"name":"deleted_at","type":"datetime-local","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":false,"details":true,"edit":false,"search":true},"validation":["date:Y-m-d H:i:s"]}];
export const FORM_DATA = {
};

// Mockbackend settings
export function setupMockBackend(mockBackend: MockBackend) {
	mockBackend.connections.subscribe((connection: MockConnection) => {
		// POST create item request
		if (connection.request.method === 1 && connection.request.url.search(/tenants/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify({ data: JSON.parse(connection.request.getBody()) }),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }

	  // POST update 'a1' (TenantOne) item request
		if (connection.request.method === 1 && connection.request.url.search(/tenants\/a1/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify({ data: TenantOne }),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }

		// GET form model request
	  if (connection.request.url.search(/tenants\/form-model/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify(FORM_MODEL),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }

	  // GET form data request
	  if (connection.request.url.search(/tenants\/form-data/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify(FORM_DATA),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }

	  // GET 'a1' (TenantOne) item data request
	  if (connection.request.url.search(/tenants\/a1/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify({data: TenantOne}),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }

	  // GET 'b2' (TenantTwo) item data request
	  if (connection.request.url.search(/tenants\/b2/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify({data: TenantTwo}),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }
	});
}

// Containers Testbed Imports
export const IMPORTS = [
	RouterTestingModule,
  HttpModule,
  StoreModule.provideStore(fromRoot.reducer),
  ...EFFECTS,
  TranslateModule.forRoot(),
  CoreModule,
  THEME.default,
  ReactiveFormsModule,
  Ng2BootstrapModule.forRoot(),
  DynamicFormModule,
];

export const PROVIDERS = [
	MockBackend,
  BaseRequestOptions,
  AuthGuard,
  AuthService,
  {
    provide: Http,
    useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
    deps: [MockBackend, BaseRequestOptions]
  },
  { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': TenantOne.id }]) } },
  ...SERVICES,
];
