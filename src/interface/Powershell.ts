import { Readable } from 'stream';

export interface PowerShellFeedbackModel {
  stdout: Readable;
  stderr: Readable;
}