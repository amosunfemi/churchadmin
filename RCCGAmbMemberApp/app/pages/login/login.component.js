"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_service_1 = require("./shared/login.service");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("Slide", function () { return require("nativescript-slides").Slide; });
element_registry_1.registerElement("SlideContainer", function () { return require("nativescript-slides").SlideContainer; });
var LoginComponent = (function () {
    function LoginComponent(loginService) {
        this.loginService = loginService;
        this.user = [];
        this.images = [];
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.images.push({
            title: 'Sports',
            source: 'res://300x300.jpg'
        });
        this.images.push({
            title: 'Cats',
            source: 'res://Default.png'
        });
        this.images.push({
            title: 'Food',
            source: 'res://Icon.png'
        });
        /*this.loginService.getList().subscribe((res) => {
            this.user = res;
        });*/
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        var SlidesXml = this.slides.nativeElement;
        SlidesXml.constructView();
    };
    return LoginComponent;
}());
__decorate([
    core_1.ViewChild("slides"),
    __metadata("design:type", core_1.ElementRef)
], LoginComponent.prototype, "slides", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        moduleId: module.id,
        templateUrl: "./login.component.html",
        //styleUrls: ["./login.component.css"],
        providers: [login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBR3pFLHdEQUFzRDtBQUV0RCwwRUFBd0U7QUFFeEUsa0NBQWUsQ0FBQyxPQUFPLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO0FBQ3JFLGtDQUFlLENBQUMsZ0JBQWdCLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLGNBQWMsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDO0FBV3ZGLElBQWEsY0FBYztJQUcxQix3QkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGOUMsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUlYLFdBQU0sR0FBZSxFQUFFLENBQUM7SUFGbUIsQ0FBQztJQU1uRCxpQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2Y7WUFDQyxLQUFLLEVBQUUsUUFBUTtZQUNmLE1BQU0sRUFBRSxtQkFBbUI7U0FDM0IsQ0FDRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2Y7WUFDQyxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxtQkFBbUI7U0FDM0IsQ0FDRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2Y7WUFDQyxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxnQkFBZ0I7U0FDeEIsQ0FDRCxDQUFDO1FBQ0Y7O2FBRUs7SUFDTixDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUNDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0YscUJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBOUJxQjtJQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQzs4QkFBUyxpQkFBVTs4Q0FBQztBQVA1QixjQUFjO0lBUjFCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyx1Q0FBdUM7UUFDdkMsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztLQUN6QixDQUFDO3FDQUtpQyw0QkFBWTtHQUhsQyxjQUFjLENBcUMxQjtBQXJDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vc2hhcmVkL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbG9naW4uc2VydmljZSc7XG5cbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5cbnJlZ2lzdGVyRWxlbWVudChcIlNsaWRlXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc2xpZGVzXCIpLlNsaWRlKTtcbnJlZ2lzdGVyRWxlbWVudChcIlNsaWRlQ29udGFpbmVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc2xpZGVzXCIpLlNsaWRlQ29udGFpbmVyKTtcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdsb2dpbicsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBgLi9sb2dpbi5jb21wb25lbnQuaHRtbGAsXG5cdC8vc3R5bGVVcmxzOiBbXCIuL2xvZ2luLmNvbXBvbmVudC5jc3NcIl0sXG5cdHByb3ZpZGVyczogW0xvZ2luU2VydmljZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdHVzZXI6IFVzZXJbXSA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbG9naW5TZXJ2aWNlOiBMb2dpblNlcnZpY2UpIHsgfVxuXG5cdHB1YmxpYyBpbWFnZXM6IEFycmF5PGFueT4gPSBbXTtcblxuXHRAVmlld0NoaWxkKFwic2xpZGVzXCIpIHNsaWRlczogRWxlbWVudFJlZjtcblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmltYWdlcy5wdXNoKFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogJ1Nwb3J0cycsXG5cdFx0XHRcdHNvdXJjZTogJ3JlczovLzMwMHgzMDAuanBnJ1xuXHRcdFx0fVxuXHRcdCk7XG5cdFx0dGhpcy5pbWFnZXMucHVzaChcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6ICdDYXRzJyxcblx0XHRcdFx0c291cmNlOiAncmVzOi8vRGVmYXVsdC5wbmcnXG5cdFx0XHR9XG5cdFx0KTtcblx0XHR0aGlzLmltYWdlcy5wdXNoKFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogJ0Zvb2QnLFxuXHRcdFx0XHRzb3VyY2U6ICdyZXM6Ly9JY29uLnBuZydcblx0XHRcdH1cblx0XHQpO1xuXHRcdC8qdGhpcy5sb2dpblNlcnZpY2UuZ2V0TGlzdCgpLnN1YnNjcmliZSgocmVzKSA9PiB7XG5cdFx0XHR0aGlzLnVzZXIgPSByZXM7XG5cdFx0fSk7Ki9cblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRsZXQgU2xpZGVzWG1sID0gdGhpcy5zbGlkZXMubmF0aXZlRWxlbWVudDtcblx0XHRTbGlkZXNYbWwuY29uc3RydWN0VmlldygpO1xuXHR9XG59Il19