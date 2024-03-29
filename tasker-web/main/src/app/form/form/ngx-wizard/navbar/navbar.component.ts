import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,   } from '@angular/router';


@Component({
    selector: 'msw-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    constructor(private router: Router,
        private route: ActivatedRoute) {
    }
    page = 'Personal';
    ngOnInit() {
        this.router.events
            // .filter(event => event instanceof NavigationEnd)
            .pipe(takeUntil(this.destroy$)).subscribe(event => {
                let currentRoute = this.route.root;
                while (currentRoute.children[0] !== undefined) {
                    currentRoute = currentRoute.children[0];
                }
                this.page = currentRoute.snapshot.data['title'];
            });
    }

}
