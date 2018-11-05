import { Component, Input} from '@angular/core';
import { Player } from '../models';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { InputForm } from './input-form';
import { PDFAnnotationData } from 'pdfjs-dist';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent {

  @Input() player: Player;

    // screen DPI / PDF DPI
    readonly dpiRatio = 96 / 72;

    public pdfSrc = './assets//FATE.pdf';

    public myForm: FormGroup;

    public inputList: InputForm[] = [];

    public zoom = 1;

    constructor(private _fb: FormBuilder) {
        this.myForm = this._fb.group({});
     }

    private createInput(annotation: any, rect: number[] = null) {
        let formControl = new FormControl(annotation.buttonValue || '');

        const input = new Input();
        input.name = annotation.fieldName;

        if (annotation.fieldType === 'Tx') {
            input.type = 'text';
            input.value = annotation.buttonValue || '';
        }

        if (annotation.fieldType === 'Btn' && !annotation.checkBox) {
            input.type = 'radio';
            input.value = annotation.buttonValue;
        }

        if (annotation.checkBox) {
            input.type = 'checkbox';
            input.value = true;
            formControl = new FormControl(annotation.buttonValue || false);
        }

        // Calculate all the positions and sizes
        if (rect) {
            input.top = rect[1] - (rect[1] - rect[3]);
            input.left = rect[0];
            input.height = (rect[1] - rect[3]) * .9;
            input.width = (rect[2] - rect[0]);
        }

        this.inputList.push(input);
        return formControl;
    }

    private addInput(annotation: any, rect: number[] = null): void {
        // add input to page
        this.myForm.addControl(annotation.fieldName, this.createInput(annotation, rect));
    }

    public getInputPosition(input: InputForm): any {
        return {
            top: `${input.top}px`,
            left: `${input.left}px`,
            height: `${input.height}px`,
            width: `${input.width}px`,
        };
    }

    public zoomIn(): void {
        this.inputList = this.inputList.map(i => {
            i.left *= (.25 / this.zoom) + 1;
            i.top *= (.25 / this.zoom) + 1;
            i.width *= (.25 / this.zoom) + 1;
            i.height *= (.25 / this.zoom) + 1;
            return i;
        });
        this.zoom += .25;
    }

    public zoomOut(): void {
        this.inputList = this.inputList.map(i => {
            i.left *= 1 - (.25 / this.zoom);
            i.top *= 1 - (.25 / this.zoom);
            i.width *= 1 - (.25 / this.zoom);
            i.height *= 1 - (.25 / this.zoom);
            return i;
        });
        this.zoom -= .25;
    }

    public loadComplete(pdf: PDFDocumentProxy): void {
      console.log('loadComplete', pdf);
        for (let i = 1; i <= pdf.numPages; i++) {

            // track the current page
            let currentPage = null;
            pdf.getPage(i).then(p => {
                currentPage = p;

                console.log('currentPage', currentPage);
                // get the annotations of the current page
                return p.getAnnotations();
            }).then(ann => {

                // ugly cast due to missing typescript definitions
                // please contribute to complete @types/pdfjs-dist
                const annotations = (<any>ann) as PDFAnnotationData[];
                console.log('annotations', annotations);
                annotations
                    .filter(a => a.subtype === 'Widget') // get the form field annotation only
                    .forEach(a => {
                        console.log('InputData', a);
                        // get the rectangle that represent the single field
                        // and resize it according to the current DPI
                        const fieldRect = currentPage.getViewport(this.dpiRatio)
                            .convertToViewportRectangle(a.rect);

                        // add the corresponding input
                        this.addInput(a, fieldRect);
                    });
            });
        }
}
  onError(error: any) {
    console.log('pdf error', error);
  }
}
