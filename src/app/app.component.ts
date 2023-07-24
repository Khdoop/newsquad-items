import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, map, combineLatest, tap, of } from 'rxjs';
import { ExcOptionEnum, Item, ItemTypeDescriptions, ItemTypeEnum, itemTypes } from './models';

import items from './result.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    readonly selectedItemTypeAll = 100;

    itemTypeDescriptions = ItemTypeDescriptions;
    excOptionEnum = ExcOptionEnum;
    filteredOptions = of(<Item[]>[]);
    items: Item[] = <any>items;
    selectedItem: Item | undefined = undefined;
    itemTypesEnum = ItemTypeEnum;
    itemTypes = itemTypes;
    excOptionsCount = 0;

    itemNameControl = new FormControl<string>('');
    selectedItemTypeControl = new FormControl<number>(this.selectedItemTypeAll);
    skillControl = new FormControl<boolean>(false);
    luckControl = new FormControl<boolean>(false);
    itemLevelControl = new FormControl<number>(0);
    itemAddControl = new FormControl<number>(0);
    ancientControl = new FormControl<number | null>(null);

    zenManaControl = new FormControl<boolean>(false);
    dsrLifeControl = new FormControl<boolean>(false);
    refSpeedControl = new FormControl<boolean>(false);
    ddInc2Control = new FormControl<boolean>(false);
    manaLvl20Control = new FormControl<boolean>(false);
    hpEdrControl = new FormControl<boolean>(false);

    itemLevel = 0;
    itemAdd = 0;
    itemSockets = 0;

    itemFormGroup = new FormGroup({
        itemName: this.itemNameControl,
        selectedItemType: this.selectedItemTypeControl,
        skill: this.skillControl,
        luck: this.luckControl,
        itemLevelControl: this.itemLevelControl,
        itemAddControl: this.itemAddControl,
        ancientControl: this.ancientControl,
        zenManaControl: this.zenManaControl,
        dsrLifeControl: this.dsrLifeControl,
        refSpeedControl: this.refSpeedControl,
        ddInc2Control: this.ddInc2Control,
        manaLvl20Control: this.manaLvl20Control,
        hpEdrControl: this.hpEdrControl,
    });

    constructor(private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.filteredOptions = combineLatest([
            this.selectedItemTypeControl.valueChanges.pipe(startWith(this.selectedItemTypeAll), tap(() => {
                this.itemNameControl.reset('', { emitEvent: false });
                this.selectedItem = undefined;
            })),
            this.itemNameControl.valueChanges.pipe(startWith(''))
        ]).pipe(
            map(() => this.filterOptions())
        );
    }

    get itemString() {
        return `${this.itemSockets ? `/makesocket ${this.itemSockets}` : '/make'} ${this.selectedItem?.section} ${this.selectedItem?.number} ${this.itemLevel} ${+this.skillControl.value!} ${+this.luckControl.value!} ${this.itemAdd} ${this.excOptionsCount} ${this.ancientControl.value ?? ''}`;
    }

    formatItemAdd(value: number): string {
        return `${value * 4}`;
    }

    onItemSelect(event: MatOptionSelectionChange, item: Item) {
        if (event.isUserInput) {
            this.selectedItem = <Item>item;
        }
    }

    onExcOptionChange(optionType: ExcOptionEnum, isSelected: boolean): void {
        this.excOptionsCount = isSelected
            ? this.excOptionsCount + optionType
            : this.excOptionsCount - optionType
    }

    openSnackBar(message: string, duration: number) {
        this._snackBar.open(message, undefined, { duration });
    }

    onCopyText() {
        if (this.isInIframe()) {
            // console.log('execCommand')
            var copyTextarea = document.createElement("textarea");
            copyTextarea.style.position = "fixed";
            copyTextarea.style.opacity = "0";
            copyTextarea.textContent = this.itemString.trim();
            document.body.appendChild(copyTextarea);
            copyTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(copyTextarea);
        } else {
            navigator.clipboard.writeText(this.itemString.trim());
            // console.log('navigator.clipboard')
        }
        this.openSnackBar('Coppied!', 1000);
    }

    public isInIframe() {
        const result = window.location !== window.parent.location;
        return result;
    }

    private filterOptions(): Item[] {
        const filterValue = this.itemNameControl.value!.toLowerCase();
        return this.items.filter(option => option.name?.toLowerCase().includes(filterValue ? filterValue : '')
            && (this.selectedItemTypeControl.value !== this.selectedItemTypeAll ? +option.section === +this.selectedItemTypeControl.value! : true));
    }
}
