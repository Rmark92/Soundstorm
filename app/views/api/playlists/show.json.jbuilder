track_ids = []

json.set! :tracks do
  @playlist.tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :description
      json.artistId track.artist_id
      json.numPlays track.plays_count
      json.isLiked !!current_user && track.is_liked_by?(current_user.id)
      json.audioURL track.audio.url
      json.imageURL asset_path(track.image.url)
    end
    track_ids.push(track.id)
  end
end

json.set! :users do
  @playlist.tracks.each do |track|
    user = track.artist
    json.set! user.id do
      json.id user.id
      json.username user.username
    end
  end

  user = @playlist.user

  json.set! user.id do
    json.id user.id
    json.imageURL asset_path(user.image.url)
    json.username user.username
  end
end

json.set! :playlist do
  json.id @playlist.id
  json.title @playlist.title
  json.userId @playlist.user_id
  json.trackIds track_ids
end
