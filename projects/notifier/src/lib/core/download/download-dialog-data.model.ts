import { ActionType } from "../update/type/update-action.enum";
import { DownloadStatus } from "../update/model/download-status.model";

export class DownloadDialogData {
    ActionType:ActionType;
    downloadStatus:DownloadStatus;
}