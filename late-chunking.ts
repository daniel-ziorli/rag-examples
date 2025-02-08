
export async function getEmbeddings(chunks: string[], late_chunking: boolean = true) {
    const data = {
        model: 'jina-embeddings-v3',
        task: 'text-matching',
        late_chunking: late_chunking,
        dimensions: 128,
        embedding_type: 'float',
        input: chunks
    }

    const url = 'https://api.jina.ai/v1/embeddings';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer jina_8784fb0d80cd45e9a3be5aed2aff202bVCg9qbwiPB5edPJx3wyTP4A1Kbq0'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options)
    const json = await response.json()
    return json
}

function cosinesim(a: number[], b: number[]) {
    let dot = 0;
    let mA = 0;
    let mB = 0;

    for(let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        mA += a[i] * a[i];
        mB += b[i] * b[i];
    }

    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    return dot / (mA * mB);
}

const input = "Berlin is the capital and largest city of Germany, both by area and by population. Its more than 3.85 million inhabitants make it the European Union's most populous city, as measured by population within city limits. The city is also one of the states of Germany, and is the third smallest state in the country in terms of area.";
const chunks = input.split(". ");

const embeddings_late = await getEmbeddings(chunks);
const embeddings = await getEmbeddings(chunks, false);

const query = "Berlin";
const queryEmbedding = await getEmbeddings([query]);

const similarities_late = embeddings_late.data.map((embedding: { embedding: number[] }) => cosinesim(embedding.embedding, queryEmbedding.data[0].embedding));
const similarities = embeddings.data.map((embedding: { embedding: number[] }) => cosinesim(embedding.embedding, queryEmbedding.data[0].embedding));

console.log(similarities_late);
console.log(similarities);
