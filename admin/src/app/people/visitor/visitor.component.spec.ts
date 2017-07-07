import { TestBed, inject } from '@angular/core/testing';

import { VisitorComponent } from './visitor.component';

describe('a visitor component', () => {
	let component: VisitorComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				VisitorComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([VisitorComponent], (VisitorComponent) => {
		component = VisitorComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});