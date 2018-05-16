# Not sure if there's a better way to collect user info and track info
# in 2 separate objects with one pass...

users_hash = {}

json.set! :tracks do
  @tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :description
      json.artistId track.artist_id
      json.createdAt track.created_at
      json.numLikes track.likes_count
      json.numPlays track.plays_count
      json.numComments track.comments_count
      json.isLiked !!current_user && track.is_liked_by?(current_user.id)
      json.audioURL track.audio.url
      json.imageURL asset_path(track.image.url)
    end

    if users_hash[track.artist_id]
      users_hash[track.artist_id][:trackIds] << track.id
    else
      artist = track.artist
      users_hash[track.artist_id] = { username: artist.username, trackIds: [track.id] }
    end
  end
end

json.set! :users do
  json.merge! users_hash
end
