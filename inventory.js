export default class Inventory {
    constructor() {
        this._start = null;
        this._end = null;
        this._inventoryString = "";
    }

    get inventoryString() {
        return this._inventoryString;
    }

    registerProduct(product) {
        if (this._searchRegisteredProduct(product.code, this._start) == null) {
            if (this._start === null) {
                this._start = product;
            } else if (this._end === null) {
                if (product.code > this._start.code) {
                    this._start.next = product;
                    this._end = product;
                    this._end.previous = this._start;
                } else {
                    this._end = this._start;
                    this._start = product;
                    this._start.next = this._end;
                    this._end.previous = this._start;
                }
            } else {
                this._InsertProductInPosition(product);
            }
        } 
    }

    _InsertProductInPosition(product) {
        let previousProduct = this._searchForPlaceToInsert(product.code, this._start);
        if (previousProduct == this._start) {
            if (previousProduct.code < product.code) {
                this._InsertProductBetween(previousProduct, product);
            } else {
                this._start.previous = product;
                product.next = this._start;
                this._start = product;
            }
        } else if (previousProduct == this._end) {
            this._end.next = product;
            product.previous = this._end;
            this._end = product;
        } else {
            this._InsertProductBetween(previousProduct, product);
        }
    }

    _InsertProductBetween(previousProduct, product) {
        product.next = previousProduct.next;
        product.previous = previousProduct.next.previous;
        previousProduct.next.previous = product;
        previousProduct.next = product;
    }

    _searchForPlaceToInsert(code, start) {
        if (code < start.code) {
            return start;
        }
        while (start.next != null) {
            if (start.next.code > code) {
                return start;
            }
            start = start.next;
        }
        return this._end;
    }

    searchForInquiry(code) {
        let product = this._searchRegisteredProduct(code, this._start);
        if (product == null) {
            return "Not found";
        } else {
            return product.toString();
        }
    }

    _searchRegisteredProduct(code, start) {
        while ((start != null) && (start.code <= code)) {
            if (start.code == code) {
                return start;
            }
            start = start.next;
        }
        return null;
    }

    deleteProduct(code) {
        if (this._start.code == code) {
            this._start = this._start.next;
        } else {
            this._findProductToDelete(code);
        }
    }

    _findProductToDelete(code) {
        let product = this._searchRegisteredProduct(code, this._start);
        if (product == null) {
            return;
        } else {
            if (product == this._end) {
                if (product.previous == this._start) {
                    this._start.next = null;
                    this._end = null;
                } else {
                    this._end = product.previous;
                    this._end.next = null;
                }
            } else {
                product.next.previous = product.previous;
                product.previous.next = product.next;
            }
        }
    }

    printInventory() {
        this._inventoryString = "";
        this._getInventoryAsString(this._start);
    }

    _getInventoryAsString(start) {
        if (start != null) {
            this._inventoryString += start.toString() + "<br>";
            this._getInventoryAsString(start.next);
        }
    }

    printFlippedInventory() {
        this._inventoryString = "";
        this._getFlippedInventoryAsString(this._end);
    }

    _getFlippedInventoryAsString(start) {
        if (start != null) {
            this._inventoryString += start.toString() + "<br>";
            this._getFlippedInventoryAsString(start.previous);
        }
    }
}