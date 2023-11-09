import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShopingListService } from '../shoping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styles: [
    `
      input.ng-invalid.ng-touched,
      textarea.ng-invalid.ng-touched {
        @apply ring-red-600 bg-red-100;
      }
    `,
  ],
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscribtion!: Subscription;
  isOnEditMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private slService: ShopingListService) {}

  ngOnInit() {
    this.subscribtion = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.isOnEditMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const value = form.value;
    const newIngridient = new Ingredient(value.name, value.amount);
    if (this.isOnEditMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngridient);
      this.isOnEditMode = false;
    } else {
      this.slService.addIngredient(newIngridient);
    }
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.isOnEditMode = false;
  }

  onDelete() {
    this.isOnEditMode = false;
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
