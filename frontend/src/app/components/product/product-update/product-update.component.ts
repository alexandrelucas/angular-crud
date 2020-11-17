import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }
  updateProduct():void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('O Produto foi atualizado com sucesso');
      this.router.navigate(['/products']);
    });
  }
  cancel():void {
    this.router.navigate(['/products']);
  }
}
