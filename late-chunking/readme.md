# Late Chunking Example

## Definitions

Traditional Embedding: Traditionally, documents are divided into smaller chunks before encoding. Each chunk is then embedded independently.

Late Chunking: This method involves encoding the entire document first using a large context window embedding model to capture comprehensive context. After encoding, the document is divided back into chunks.

## Testing Results

```
Chunks = [
  "Berlin is the capital and largest city of Germany, both by area and by population",
  "Its more than 3.85 million inhabitants make it the European Union's most populous city, as measured by population within city limits",
  "The city is also one of the states of Germany, and is the third smallest state in the country in terms of area.\r\n"
]

Query = "Berlin"

// Results
[ 0.75, 0.39, 0.39 ] // Traditional Embedding
[ 0.64, 0.62, 0.60 ] // Late Chunking
```

## Conclusion

Looking at the results, you can see that the Traditional Embedding method shows a high score for the first chunk due to the presence of the query word within the chunk. However, the scores drop significantly for the other chunks, indicating a loss of broader contextual information.

In contrast, Late Chunking maintains more consistent similarity scores across all chunks, demonstrating its ability to preserve contextual integrity and resolve coreferences, such as recognizing that *its* and *the city* refer to Berlin. This highlights Late Chunking’s effectiveness in retaining a broader contextual understanding, leading to improved vector search performance.

## Read more

https://jina.ai/news/late-chunking-in-long-context-embedding-models/

https://weaviate.io/blog/late-chunking