import { TestBed, inject } from '@angular/core/testing';

import { FamilyComponent } from './family.component';

describe('a family component', () => {
	let component: FamilyComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FamilyComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([FamilyComponent], (FamilyComponent) => {
		component = FamilyComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});