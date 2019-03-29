import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import {  Router, ActivatedRoute } from '@angular/router';
import {  take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryServie: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryServie.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if (this.id) {this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p); }
    }

  save(product) {
    // tslint:disable-next-line:curly
    if (this.id)  this.productService.update(this.id, product);
    // tslint:disable-next-line:curly
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(productId) {
    // tslint:disable-next-line:curly
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit() {
  }

}
