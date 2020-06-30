MATCH (n)
set n:SpotifyArtist
return n
limit 5

MATCH (artist)
WITH artist, SIZE(()-[:Related]->(artist)) as incomingRelated
ORDER BY incomingRelated DESC
RETURN artist.artistId, incomingRelated
LIMIT 20


CALL gds.louvain.stream({
  nodeProjection: 'SpotifyArtist',
  relationshipProjection: 'Related'
})
YIELD nodeId, communityId
RETURN gds.util.asNode(nodeId).artistId as artist, communityId
ORDER BY communityId ASC, artist
LIMIT 20


CALL gds.alpha.betweenness.stream({
  nodeProjection: 'SpotifyArtist',
  relationshipProjection: 'Related'
})
YIELD nodeId, centrality
RETURN gds.util.asNode(nodeId).artistId AS artist, centrality
ORDER BY centrality DESC
LIMIT 20

MATCH (a), (b) WHERE id(a) > id(b)
MATCH p=shortestPath((a)-[:Related*]-(b))
WITH length(p) AS len, p
ORDER BY len DESC LIMIT 1
RETURN p



CALL gds.graph.create.cypher(
    'my-cypher-graph',
    'MATCH (n:SpotifyArtist) RETURN id(n) AS id',
    'MATCH (a:SpotifyArtist)-[:Related]->(b:SpotifyArtist) RETURN id(a) AS source, id(b) AS target'
)
YIELD graphName, nodeCount, relationshipCount, createMillis;


CALL gds.alpha.betweenness.stream({
  nodeProjection: 'SpotifyArtist',
  relationshipProjection: 'Related'
})
YIELD nodeId, centrality
RETURN gds.util.asNode(nodeId).artistId AS artist, centrality
ORDER BY centrality DESC
LIMIT 20


CALL gds.alpha.betweenness.sampled.stream({
  nodeProjection: 'SpotifyArtist',
  relationshipProjection: 'Related',
  strategy: 'random',
  probability: 1.0,
  maxDepth: 1
}) YIELD nodeId, centrality
RETURN gds.util.asNode(nodeId).name AS user, centrality
ORDER BY centrality DESC
LIMIT 20  


CALL gds.alpha.betweenness.sampled.estimate({
  nodeProjection: 'SpotifyArtist',
  relationshipProjection: 'Related',
  strategy: 'random',
  probability: 1.0,
  maxDepth: 1
})
YIELD requiredMemory, treeView, mapView, bytesMin, bytesMax, heapPercentageMin, heapPercentageMax, nodeCount, relationshipCount
RETURN requiredMemory, treeView, mapView, bytesMin, bytesMax, heapPercentageMin, heapPercentageMax, nodeCount, relationshipCount