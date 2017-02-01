import { ViewChild, ViewChildren, Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AlertService } from '../helpers/alert.service';

@Component({
    selector: 'my-app',
    templateUrl: './camera.html',
    styleUrls: ['./camera.css']
})
export class CameraComponent implements OnInit {
    @ViewChild('hardwareVideo') hardwareVideo: any;
    @ViewChild('myCanvas') canvas;
    public nav: any;

    constructor(private _http: HttpService, public alertService: AlertService) {
        this.nav = navigator;
    }

    public ngOnInit(): void {
        this.nav.getUserMedia = (navigator.mozGetUserMedia ||
            navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
    }

    public cameraTurnOn() {
        let video = this.hardwareVideo.nativeElement;

        this.nav.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }

    public cameraTurnOff() {
        let video = this.hardwareVideo.nativeElement;

        this.nav.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = null;
        });
    }

    public makeSnapshot() {
        const video = this.hardwareVideo.nativeElement;
        const canvas = this.canvas.nativeElement;
        const canvasContext = canvas.getContext('2d');

        // el.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        canvasContext.drawImage(video, 0, 0);

        // Image that we can display
        let image = new Image();
        image.src = canvas.toDataURL("image/png");

        // Conversion image into bynary
        const imageBuffer = new Buffer(image.src.replace(/^data:image\/(png|jpg);base64,/, ''), 'base64')

        // Conversion bynary image into file
        const file = new File([imageBuffer], "foul.png");

        this.sendImage(file);
    }

    public sendImage(image) {
        var formData: any = new FormData();
        formData.append("uploads[]", image);

        this._http.sendImage(formData).subscribe(
            data => { console.log(data); },
            err => { console.log(err); }
        );
    }

    public switchDevice() {

    }
}

