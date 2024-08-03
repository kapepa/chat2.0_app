import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { DndDirective } from '../../../../directives/dnd.directive';
import { FormsModule } from '@angular/forms';
import { ImgUrlPipe } from '../../../../pipes/img-url.pipe';
import { FormValuesDto } from '../../../../dto/form-values.dto';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [
    FormsModule,
    DndDirective,
  ],
  providers: [ImgUrlPipe],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent implements OnInit {
  @ViewChild('fileDrop') input!: ElementRef<HTMLImageElement>;
  @Input() currentAvatar?: string | null;
  @Output() onSetValues: EventEmitter<FormValuesDto> = new EventEmitter();

  imgUrl = inject(ImgUrlPipe)
  avatar = signal<string>("/assets/images/avatar-placeholder.jpg");

  ngOnInit(): void {
    if(!!this.currentAvatar) this.avatar.set(this.imgUrl.transform(this.currentAvatar) as string)
  }

  onOpenChoose(event: Event) {
    event.preventDefault();
    this.input.nativeElement.click();
  }

  processingFile(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;
      this.avatar.set(content);
      this.onSetValues.emit({filed: "avatarUrl", value: file})
    };
    reader.readAsDataURL(file)
  }

  onChangeAvatar (event: Event) {
    const file = (event.target as HTMLInputElement).files![0];

    if(!file || !file.type.startsWith('image')) return;
   
    this.processingFile(file)
  }

  onFileDrop (file: File) {
    this.processingFile(file)
  }
}
