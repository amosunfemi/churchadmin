import { TestBed, inject } from '@angular/core/testing';

import { MemberComponent } from './member.component';

describe('a member component', () => {
	let component: MemberComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MemberComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([MemberComponent], (MemberComponent) => {
		component = MemberComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});