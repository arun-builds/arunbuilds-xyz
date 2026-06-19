---
title: Cache Is More Than Redis
description: Caching is more than putting Redis in front of a database. Exploring lesser-known caching techniques and trade-offs.
pubDate: 2026-06-19
tags:
  - caching
  - redis
  - distributed-systems
---

People have a lot of misconceptions about caching.

Many think cache simply means Redis (which itself is a lot more than just a cache), or that cache must always be something stored in memory. What most people don't realize is that even the disk on your API server can be used as a cache, and in some cases even your database can act as a cache.

Most developers are familiar with caching using Redis. Let's look at some caching techniques that are often overlooked.

## Database Materialized Views

This is a concept that most junior backend developers (including me) either never stumble upon, don't know about, or simply ignore.

But it's such a powerful optimization technique.

A database query is often the result of multiple joins, and joins themselves are expensive operations. So what if you pre-compute those joins and store the result in a separate table?

That's exactly what materialized views do.

You can periodically refresh this data or define triggers based on your use case. Instead of repeatedly performing expensive joins, you're trading some freshness for significantly faster reads.

## Browser (Local Storage)

Most developers are already familiar with storing tokens or small pieces of data in local storage.

Consider a recommendation system like Amazon.

The backend returns 50 recommended products, but the user can only see 10 at a time. If implemented carefully with proper expiry and invalidation strategies, those 50 products could be stored in local storage and different subsets could be displayed without repeatedly hitting the backend.

This can make the experience feel significantly faster while also reducing unnecessary network requests.

Of course, this comes with trade-offs. Recommendations can become stale, products can go out of stock, and user preferences can change. But with thoughtful expiration and invalidation strategies, these issues can often be minimized. That's the essence of caching, trading some freshness and complexity for better performance.


## CDN

This topic deserves a separate blog on its own, but for now let's address a common misconception.

Many people think CDNs are only useful for caching images, CSS, JavaScript files, and other static assets.

That's not true.

CDNs can also cache API responses that don't change frequently.

For example:

- Top 10 search terms across your application
    
- Trending products
    
- Popular articles
    
- Public leaderboards
    

Instead of hitting your backend for every request, users can receive these responses directly from edge locations.

More on this in a future blog.

## Disk of Your API Server

Very few people even think about this.

When setting up a VM, most developers only think about application binaries and dependencies. The remaining disk space is often completely ignored.

But that disk can be used to save expensive network hops.

If strong consistency is not a strict business requirement, storing frequently accessed data on the local disk of your API server can be a surprisingly effective optimization.

It's not always the right solution, but it's another tool available in the caching toolbox.

## Conclusion

Anything that helps you avoid an expensive computation or an expensive I/O operation is a cache.


The important thing is not _where_ the data is stored. The important thing is that you're trading some resource (storage, freshness, complexity, etc.) to avoid a more expensive operation.

## References

- Concepts and ideas inspired by the content of [Arpit Bhayani](https://arpitbhayani.me/).
