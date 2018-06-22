json.extract! track, :id, :title, :description
json.artistId track.artist_id
json.createdAt track.created_at
json.numLikes track.likes_count
json.numPlays track.plays_count
json.numComments track.comments_count
json.audioURL track.audio.url
json.imageURL asset_path(track.image.url)
