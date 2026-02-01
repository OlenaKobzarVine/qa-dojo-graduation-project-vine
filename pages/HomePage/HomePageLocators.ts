import { Locator } from '@playwright/test';
import { BasePageLocators } from '../BasePage/BasePageLocators';

export class HomePageLocators extends BasePageLocators {
  readonly signOutButton: Locator = this.baseLocator.locator(`a.logout.hidden-sm-down`);
  readonly userAccountLink: Locator = this.baseLocator.locator(`a.account`);
  
  readonly productItems: Locator = this.baseLocator.locator(`div.js-product.product`);
  readonly productRegularPrice: Locator = this.baseLocator.locator(`span.regular-price`);
  readonly productDiscount: Locator = this.baseLocator.locator(`span.discount-percentage`);

  readonly productName: string = `h3.product-title a`;
  readonly filteredProductName: string = `.product-title a`;
  
  readonly productTitleLink: Locator = this.baseLocator.locator('h3.product-title a');
  readonly productPrice: string = `span.price`;
  readonly quickViewButton: string = `a.quick-view`;
  readonly searchInput: Locator = this.baseLocator.locator(`input[name="s"]`);
  
  readonly autocompleteMenu: Locator = this.baseLocator.locator(`ul.searchbar-autocomplete`);
  readonly autocompleteItems: Locator = this.baseLocator.locator(`ul.searchbar-autocomplete li.ui-menu-item`);
  readonly autocompleteItemProduct: Locator = this.baseLocator.locator(`span.product`);
  
  readonly shoppingCart: Locator = this.baseLocator.locator(`#_desktop_cart`);

  readonly allProductsLink: Locator = this.baseLocator.locator('a.all-product-link:has-text("All products")');
  readonly searchFilters: Locator = this.baseLocator.locator('#search_filters');
  readonly availabilitySection: Locator = this.baseLocator.locator('section.facet[data-type="availability"]');
  readonly sizeFilterSection: Locator = this.baseLocator.locator('section.facet[data-type="attribute_group"]', { hasText: 'Size' });
  readonly productSizeElement: Locator = this.baseLocator.locator('[data-product-size], .product-size, [class*="size"]');
  
  readonly colorFilterSection: Locator = this.baseLocator.locator('section.facet[data-type="attribute_group"]', { hasText: "Color" });
    
}
