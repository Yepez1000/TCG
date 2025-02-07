-- Active: 1737331975059@@127.0.0.1@3306@tcgcardmasterdb
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


-- @block
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
    '/Pokemon_banner2.webp', -- Corrected path for next/image
    'Pokemon Banner2', -- Title of the banner
    'https://example.com/pokemon', -- Link associated with the banner
    NULL, -- Assuming no productId is linked for now
    NOW(), -- Current timestamp for createdAt
    NOW() -- Current timestamp for updatedAt
);

DELETE FROM Banner WHERE title = 'Pokemon Banner';


-- @block 
SELECT TABLE_NAME, CONSTRAINT_NAME 
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'Banner';

ALTER TABLE Banner DROP FOREIGN KEY Banner_productId_fkey;

ALTER TABLE Banner DROP INDEX Banner_productId_fkey;

