import { Component, Input, EventEmitter, Output} from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { FormControl, FormBuilder } from '@angular/forms';
import { InputList } from '../../models/inputList';


@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent {
    @Input() zoom = 1;
    @Output() loadedPDF = new EventEmitter<any>();

    // screen DPI / PDF DPI
    readonly dpiRatio = 96 / 72;

    public pdfSrc = '/assets/pdfs/Eirendor.pdf';

    constructor(private _fb: FormBuilder) {
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


        return {control:formControl, input: input};
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
                const inputList = new InputList;

                const annotations = (<any>ann) ;
                console.log('annotations', annotations);
                annotations
                    .filter(a => a.subtype === 'Widget') // get the form field annotation only
                    .forEach(annotation => {
                        // get the rectangle that represent the single field
                        // and resize it according to the current DPI
                        const fieldRect = currentPage.getViewport(this.dpiRatio)
                            .convertToViewportRectangle(annotation.rect);

                        const createdInput = this.createInput(annotation, fieldRect);
                        // add the corresponding input
                        formControls.push({name: annotation.fieldName,
                            formControl: createdInput.control
                        });
                        inputList.push(createdInput.input);

                    });
                this.loadedPDF.emit({formControls: formControls, inputs: inputList});
                    
            });
        }
}
  onError(error: any) {
    console.log('pdf error', error);
  }

}
