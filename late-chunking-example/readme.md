# Late Chunking Example

## Definitions

Default Embedding: Traditionally, documents are divided into smaller chunks before encoding. Each chunk is then embedded independently, which might lead to a loss of broader contextual information.

Late Chunking: This method involves encoding the entire document first using a large context window embedding model to capture comprehensive context. After encoding, the document is divided into chunks. Each chunk's embedding benefits from the context of the entire document, leading to more contextually rich representations.

## Testing
Chunks: [
  "Berlin is the capital and largest city of Germany, both by area and by population",
  "Its more than 3.85 million inhabitants make it the European Union's most populous city, as measured by population within city limits",
  "The city is also one of the states of Germany, and is the third smallest state in the country in terms of area.\r\n"
]
Query: "Berlin"

### Cosin Distances

#### Late Chunking:
[ 0.6378392529602138, 0.6219952261041366, 0.6034588271776423 ]

#### Default Embedding:
[ 0.7514577786014511, 0.3936175035370424, 0.38889264531041695 ]

## Conclusion

Looking at the results, you can see that the Default Embedding method shows a high score for chunk 1 due to the presence of the query word within the chunk. However, the scores drop significantly for the other chunks, indicating a loss of broader contextual information.

In contrast, Late Chunking maintains more consistent similarity scores across all chunks, demonstrating its ability to preserve contextual integrity and resolve coreferences, such as recognizing that *its* and *the city* refer to Berlin. This highlights Late Chunking’s effectiveness in retaining a broader contextual understanding, ultimately leading to improved vector search performance.

## Read more

https://jina.ai/news/late-chunking-in-long-context-embedding-models/
https://weaviate.io/blog/late-chunking