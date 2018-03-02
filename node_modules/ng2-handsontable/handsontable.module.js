import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HotTableComponent } from './handsontable.component';
var HotTableModule = (function () {
    function HotTableModule() {
    }
    return HotTableModule;
}());
export { HotTableModule };
HotTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [HotTableComponent],
                exports: [HotTableComponent]
            },] },
];
/** @nocollapse */
HotTableModule.ctorParameters = function () { return []; };
//# sourceMappingURL=handsontable.module.js.map