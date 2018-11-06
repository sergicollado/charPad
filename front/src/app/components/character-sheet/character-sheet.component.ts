import { Component, Input, EventEmitter, Output} from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { InputForm } from '../character-form/input-form';
import { PDFAnnotationData } from 'pdfjs-dist';


@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent {

    @Output() loadedPDF = new EventEmitter<any>();

    // screen DPI / PDF DPI
    readonly dpiRatio = 96 / 72;

    public pdfSrc = '/assets/pdfs/Eirendor.pdf';

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

    private addInput(form, annotation: any, rect: number[] = null): void {
        // add input to page
        form.addControl(annotation.fieldName, this.createInput(annotation, rect));
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
                const formControls = [];
                
                const annotations = (<any>ann) ;
                console.log('annotations', annotations);
                annotations
                    .filter(a => a.subtype === 'Widget') // get the form field annotation only
                    .forEach(annotation => {
                        console.log('InputData', annotation);
                        // get the rectangle that represent the single field
                        // and resize it according to the current DPI
                        const fieldRect = currentPage.getViewport(this.dpiRatio)
                            .convertToViewportRectangle(annotation.rect);

                        // add the corresponding input
                        formControls.push({name: annotation.fieldName,
                            formControl: this.createInput(annotation, fieldRect)
                        });

                    });
                this.loadedPDF.emit({formControls: formControls, inputs: this.inputList});
                    
            });
        }
}
  onError(error: any) {
    console.log('pdf error', error);
  }

}
