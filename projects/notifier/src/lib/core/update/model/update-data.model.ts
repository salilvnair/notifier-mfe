import { DownloadStatus } from "./download-status.model";
import { AppUpadateStatus } from "./app-update-status.model";

export class UpdateNotifierData {
    downloadStatus?:DownloadStatus;
    appUpadateStatus:AppUpadateStatus
}