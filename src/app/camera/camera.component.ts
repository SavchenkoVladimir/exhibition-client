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
    public videoBrightness: number;

    constructor(private _http: HttpService, public alertService: AlertService) { }

    public ngOnInit(): void {
        this.videoBrightness = 50;
        this.nav = navigator;
        this.nav.getUserMedia = (window.navigator.mozGetUserMedia ||
            window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.msGetUserMedia);
        this.video = this.hardwareVideo.nativeElement;
    }

    public cameraTurnOn() {
        let video = this.video;

        // switch bevices boilerplate
//         console.log(this.nav.mediaDevices.enumerateDevices());

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

        // Brightness configuration
        canvasContext.filter = this.video.style.filter;

        // el.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        canvasContext.drawImage(this.video, 0, 0);

        // Image that we can display
        let image = new Image();
        image.crossOrigin = 'anonymous';

        // TODO: throw error if app is being run in mozilla
        image.src = canvas.toDataURL("image/jpeg", 1.0);
     
        // Conversion image into bynary bitmap 
        const imageBuffer = new Buffer(image.src.replace(/^data:image\/(png|jpeg);base64,/, ''), 'base64');

        // Conversion bynary image into file
        // TODO: make image name meaningful
        const file = new File([imageBuffer], `${new Date().getTime()}.jpeg`);

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

    public changeVideoBrightness() {
        this.video.style.filter = `brightness(${this.videoBrightness + 50}%)`;
    }

    public switchDevice() {

    }
}

