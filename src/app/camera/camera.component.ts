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
    public video: any;

    constructor(private _http: HttpService, public alertService: AlertService) { }

    public ngOnInit(): void {
        this.nav = navigator;
        this.nav.getUserMedia = (navigator.mozGetUserMedia ||
            navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
        this.video = this.hardwareVideo.nativeElement;
    }

    public cameraTurnOn() {
        let video = this.video;

        // switch bevices boilerplate
        // console.log(this.nav.mediaDevices.enumerateDevices());
        this.nav.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            });
    }

    public cameraTurnOff() {
        this.video.src = null;
    }

    public makeSnapshot() {
        let canvas = this.canvas.nativeElement;

        // Set canvas size equal to video size
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;

        let canvasContext = canvas.getContext('2d');

        // el.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        canvasContext.drawImage(this.video, 0, 0);

        // Image that we can display
        let image = new Image();
        image.src = canvas.toDataURL("image/png");

        // Conversion image into bynary
        const imageBuffer = new Buffer(image.src.replace(/^data:image\/(png|jpg);base64,/, ''), 'base64')

        // Conversion bynary image into file
        // TODO: make image name meaningful
        const file = new File([imageBuffer], `${new Date().getTime()}.png`);

        this.sendImage(file);
    }

    public sendImage(image) {
        var formData: any = new FormData();
        formData.append("uploads[]", image);

        // TODO: implement onResolve and onReject methods
        this._http.sendImage(formData).subscribe(
            data => { console.log(data); },
            err => { console.log(err); }
        );
    }

    public switchDevice() {

    }
}

