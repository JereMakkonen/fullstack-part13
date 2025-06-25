CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs(author, url, title)
VALUES (
    'John Smith', 
    'https://blog-test.com/js/MongoDB',
    'MongoDB handles webscale. You turn it on and it scales right up'
);

INSERT INTO blogs(author, url, title)
VALUES (
    'John Smith', 
    'https://blog-test.com/js/shards', 
    'Shards are the secret ingredient in the webscale sauce you turn them on and they just work'
);

SELECT * FROM blogs;