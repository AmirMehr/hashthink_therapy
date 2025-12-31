import { FileValidator } from '@nestjs/common';

export class AudioFileValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file: Express.Multer.File): boolean {
    const allowedMimeTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/x-wav',
      'audio/x-m4a',
      'audio/mp4',
      'audio/webm',
    ];

    const allowedExtensions = ['.mp3', '.wav', '.m4a', '.mp4', '.webm'];
    const fileExt = file.originalname
      .toLowerCase()
      .slice(file.originalname.lastIndexOf('.'));

    return (
      allowedMimeTypes.includes(file.mimetype) ||
      allowedExtensions.includes(fileExt)
    );
  }

  buildErrorMessage(): string {
    return 'File must be an audio file (mp3, wav, m4a, mp4, webm)';
  }
}
