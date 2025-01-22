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

INSERT INTO Banner (
    id, 
    imageUrl, 
    title, 
    link, 
    productId, 
    createdAt, 
    updatedAt
)
VALUES (
    UUID(), -- Automatically generates a UUID for the ID
    '/Pokemon_banner.webp', -- Corrected path for next/image
    'Pokemon Banner', -- Title of the banner
    'https://example.com/pokemon', -- Link associated with the banner
    NULL, -- Assuming no productId is linked for now
    NOW(), -- Current timestamp for createdAt
    NOW() -- Current timestamp for updatedAt
);

DELETE FROM Banner WHERE title = 'Pokemon Banner';
