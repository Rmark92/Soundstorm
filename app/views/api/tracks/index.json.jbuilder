users_hash = {}

json.set! :tracks do
  @tracks.each do |track|
    json.set! track.id do
      json.partial! 'api/tracks/track', track: track
      json.isLiked @liked_tracks.include?(track.id)
    end

    if users_hash[track.artist_id]
      users_hash[track.artist_id][:trackIds] << track.id
    else
      artist = track.artist
      users_hash[track.artist_id] = { username: artist.username,
                                      trackIds: [track.id],
                                      id: artist.id,
                                      imageURL: asset_path(artist.image.url) }
    end
  end
end

json.set! :users do
  json.merge! users_hash
end
