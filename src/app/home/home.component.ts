import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    content!: string;
    /*centerTiles = [
        {text: 'One', cols: 2, rows: 1, color: '#142A5C', click: 'garage', image: 'https://i.stack.imgur.com/cDxxV.jpg?s=64&g=1'},
        {text: 'My garage', cols: 1, rows: 1, color: '#B7A0E8', click: 'garage', image: '../assets/img/mygarage.webp'},
        {text: 'Three', cols: 1, rows: 2, color: '#FF0000', click: 'garage', image: 'https://i.stack.imgur.com/cDxxV.jpg?s=64&g=1'},
        {text: 'Four', cols: 3, rows: 1, color: '#D9EDD9', click: 'garage', image: 'https://i.stack.imgur.com/cDxxV.jpg?s=64&g=1'},
       ];*/

    headerTiles = [
        {text: '20000', cols: 1, rows: 1, color: '#B711E8'},
        {text: '579', cols: 1, rows: 1, color: '#11A0E8'},
        {text: '69', cols: 1, rows: 1, color: '#B7A011'},
    ];

    footerTiles = [
        {text: '20000', cols: 1, rows: 1, color: '#B711E8', click: 'admin'},
        {text: '579', cols: 1, rows: 1, color: '#11A0E8', click: 'garage'},
        {text: '69', cols: 1, rows: 1, color: '#B7A011', click: 'garage'},
    ];

    listWidth = window.innerHeight * 0.8;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.getAll();
        //this.content = 'Login successful!';
        window.innerWidth

    }

    async getAll() {

        const token = sessionStorage.getItem('AuthToken')!;

        function parseJwt(token: string) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        };
        this.content += '\nnparsed JWT: '
            + JSON.stringify(parseJwt(token));

        console.log(this.content);

        return this.content;
    }

    navigate(page: string): void {
        const url = `/${page}`;
        this.router.navigate([url]);
    }
}
