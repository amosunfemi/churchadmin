import { TestBed, inject } from '@angular/core/testing';

import { TaskComponent } from './task.component';

describe('a task component', () => {
	let component: TaskComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TaskComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TaskComponent], (TaskComponent) => {
		component = TaskComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});