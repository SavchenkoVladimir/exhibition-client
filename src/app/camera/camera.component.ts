import { ViewChild, ViewChildren, Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './camera.html',
    styleUrls: ['./camera.css']
})
export class CameraComponent implements OnInit {
    @ViewChild('hardwareVideo') hardwareVideo: any;
    public nav: any;
    public mediaStream: any;
    public video: any;

    constructor() { }

    ngOnInit(): void {
        this.nav = navigator;
        this.nav.getUserMedia = (this.nav.getUserMedia || this.nav.webkitGetUserMedia ||
            this.nav.mozGetUserMedia || this.nav.msGetUserMedia);
        this.hardwareVideo.nativeElement;
    }

    cameraTurnOn() {
        var video = this.hardwareVideo.nativeElement;

        this.nav.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //            this.mediaStream = stream.getTracks()[0];
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }

    cameraTurnOff() {
        let video = this.hardwareVideo.nativeElement;
        
        this.nav.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            console.log(stream);
            video.src = null;
        });
    }

    makeSnapshot() {

    }

    switchDevice() {

    }
}

