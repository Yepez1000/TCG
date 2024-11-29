-- @block
-- SELECT * FROM Cart;
SELECT * FROM Product;


-- @block
DELETE FROM CartItem;
DELETE FROM Product;
-- @block

SELECT 
    ci.id AS cartItemId,
    ci.cartId,
    c.userId,
    ci.productId,
    ci.quantity,
    p.name AS productName,
    p.description AS productDescription,
    p.price AS productPrice,
    p.stock AS productStock,
    c.status AS cartStatus
FROM 
    CartItem ci
JOIN 
    Product p ON ci.productId = p.id
JOIN 
    Cart c ON ci.cartId = c.id;

-- SELECT * FROM Cart;
-- SELECT * FROM User;
